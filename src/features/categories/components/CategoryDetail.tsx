import { useParams } from 'react-router-dom';
import { useCategories, useCategoryArticles } from '@/features/categories/api/queries';
import { ArticleCard } from '@features/articles/components/ArticleCard';
import {Category, mockCategories} from '@/core/infrastructure/repositories/mockData';
import { Folder, Loader2 } from 'lucide-react';

export const CategoryDetail = () => {
    const { categoryId = '' } = useParams();
    const { data: categoryData } = useCategories();
    const { data: articlesData, isLoading } = useCategoryArticles(categoryId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading articles...</span>
                </div>
            </div>
        );
    }

    if (!articlesData || !categoryData || !isCategoryValid(categoryId)) return null;

    const subcategories = categoryData.subcategories[categoryId as Category] || [];
    const { data: articles } = articlesData;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Folder className="w-6 h-6 text-primary" />
                    <h1 className="text-4xl font-bold tracking-tight">{categoryId}</h1>
                </div>

                {subcategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {subcategories.map((sub) => (
                            <span
                                key={sub}
                                className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-sm
                                    border border-border/50 shadow-sm"
                            >
                                {sub}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Articles Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-muted-foreground">
                        Articles in this category
                    </h2>
                    <span className="text-sm text-muted-foreground">
                        {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                    </span>
                </div>

                <div className="grid gap-4">
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))
                    ) : (
                        <p className="text-center py-8 text-muted-foreground">
                            No articles found in this category
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Type guard helper
function isCategoryValid(category: string): category is Category {
    return mockCategories.includes(category as Category);
}