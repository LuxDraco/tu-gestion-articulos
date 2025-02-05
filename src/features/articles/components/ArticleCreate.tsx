import {useNavigate} from 'react-router-dom';
import {useCreateArticle} from '../api/queries';
import {ArticleForm} from './ArticleForm';
import {CreateArticleDTO} from '@/core/domain/article';
import {FileText} from 'lucide-react';

export const ArticleCreate = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useCreateArticle();

    const handleSubmit = async (data: CreateArticleDTO) => {
        try {
            const article = await mutateAsync(data);
            navigate(`/articles/${article.id}`);
        } catch (error) {
            console.error('Failed to create article:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Create New Article</h1>
                </div>
                <p className="text-muted-foreground">
                    Create a new article by filling out the form below.
                </p>
            </div>

            <div className="bg-card rounded-lg border border-border/50 shadow-sm p-6">
                <ArticleForm onSubmit={handleSubmit} isSubmitting={isPending} />
            </div>
        </div>
    );
};