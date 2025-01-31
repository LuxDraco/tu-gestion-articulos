import { useNavigate } from 'react-router-dom';
import { useCreateArticle } from '../api/queries';
import { ArticleForm } from './ArticleForm';

export const ArticleCreate = () => {
    const navigate = useNavigate();
    const { mutateAsync, isLoading } = useCreateArticle();

    const handleSubmit = async (data) => {
        try {
            const article = await mutateAsync(data);
            navigate(`/articles/${article.id}`);
        } catch (error) {
            console.error('Failed to create article:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
            <ArticleForm onSubmit={handleSubmit} isSubmitting={isLoading} />
        </div>
    );
};