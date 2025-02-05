import { useParams, useNavigate } from 'react-router-dom';
import { useArticle, useUpdateArticle } from '../api/queries';
import { ArticleForm } from './ArticleForm';
import { UpdateArticleDTO } from '@/core/domain/article';
import { Edit, Loader2 } from 'lucide-react';

export const ArticleEdit = () => {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const { data: article, isPending: isLoadingArticle } = useArticle(id);
    const { mutateAsync, isPending: isUpdating } = useUpdateArticle(id);

    const handleSubmit = async (data: UpdateArticleDTO) => {
        try {
            await mutateAsync(data);
            navigate(`/articles/${id}`);
        } catch (error) {
            console.error('Failed to update article:', error);
        }
    };

    if (isLoadingArticle) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading article...</span>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-xl text-muted-foreground">Article not found</p>
                <button
                    onClick={() => navigate('/articles')}
                    className="text-primary hover:text-primary/80 transition-colors"
                >
                    Return to articles
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <Edit className="w-6 h-6 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
                </div>
                <p className="text-muted-foreground">
                    Edit your article by modifying the form below.
                </p>
            </div>

            <div className="bg-card rounded-lg border border-border/50 shadow-sm p-6">
                <ArticleForm
                    initialData={article}
                    onSubmit={handleSubmit}
                    isSubmitting={isUpdating}
                />
            </div>
        </div>
    );
};