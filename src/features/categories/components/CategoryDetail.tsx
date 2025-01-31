import { useParams } from 'react-router-dom';
import { useCategories, useCategoryArticles } from '@/features/categories/api/queries';
import { ArticleCard } from '@/features/categories/components/ArticleCard';

export const CategoryDetail = () => {
    const { categoryId = '' } = useParams();
    const { data: categoryData } = useCategories();
    const { data: articlesData, isLoading } = useCategoryArticles(categoryId);

    if (isLoading) return <div>Loading...</div>;
    if (!articlesData || !categoryData) return null;

    const subcategories = categoryData.subcategories[categoryId] || [];
    const { data: articles } = articlesData;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{categoryId}</h1>
                {subcategories.length > 0 && (
                    <div className="mt-2 flex gap-2">
                        {subcategories.map((sub) => (
                            <span
                                key={sub}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                            >
                                {sub}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid gap-4">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};
