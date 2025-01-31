import { useParams, useNavigate } from 'react-router-dom';
import { useArticle, useUpdateArticle } from '../api/queries';
import { ArticleForm } from './ArticleForm';

export const ArticleEdit = () => {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const { data: article, isLoading: isLoadingArticle } = useArticle(id);
    const { mutateAsync, isLoading: isUpdating } = useUpdateArticle(id);

    const handleSubmit = async (data) => {
        try {
            await mutateAsync(data);
            navigate(`/articles/${id}`);
        } catch (error) {
            console.error('Failed to update article:', error);
        }
    };

    if (isLoadingArticle) return <div>Loading...</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
            <ArticleForm
                initialData={article}
                onSubmit={handleSubmit}
                isSubmitting={isUpdating}
            />
        </div>
    );
};