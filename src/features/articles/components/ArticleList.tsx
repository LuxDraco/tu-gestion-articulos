import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../api/queries';
import { mockCategories } from '@/core/infrastructure/repositories/mockData';
import { useAppSelector } from '@/store/store';
import {
    PlusCircle,
    ChevronLeft,
    ChevronRight,
    Star,
    BookOpen,
    Filter
} from 'lucide-react';

const PAGE_SIZE = 5;

export const ArticleList = () => {
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const favorites = useAppSelector(state => state.favorites.articleIds);

    const { data, isLoading, error } = useArticles({
        page,
        limit: PAGE_SIZE,
        category: selectedCategory
    });

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-32 bg-muted rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-xl text-muted-foreground">Error loading articles</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-primary hover:text-primary/80 transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!data) return null;

    const { data: articles, total } = data;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Articles</h1>
                    <p className="text-muted-foreground mt-2">Browse and manage your articles</p>
                </div>
                <Link
                    to="/articles/new"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>New Article</span>
                </Link>
            </div>

            {/* Filters Section */}
            <div className="bg-card rounded-lg shadow-sm p-4 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filters</span>
                </div>
                <select
                    data-testid="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                    <option value="">All Categories</option>
                    {mockCategories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-4">
                {articles.map(article => (
                    <article
                        key={article.id}
                        className="group bg-card rounded-lg border border-border/50 hover:shadow-md transition-all duration-200"
                        data-testid="article-card"
                    >
                        <Link to={`/articles/${article.id}`} className="block p-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                    {article.title}
                                </h2>
                                {favorites.includes(Number(article.id)) && (
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                )}
                            </div>

                            <p className="mt-3 text-muted-foreground line-clamp-2">
                                {article.content.substring(0, 150)}...
                            </p>

                            <div className="mt-4 flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                                    <span className="px-2.5 py-0.5 rounded-md bg-accent text-accent-foreground">
                                        {article.category}
                                    </span>
                                </div>
                                {article.subcategory && (
                                    <span className="px-2.5 py-0.5 rounded-md bg-accent/50 text-accent-foreground">
                                        {article.subcategory}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:pointer-events-none transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </button>
                <div className="px-4 py-2 rounded-md bg-muted text-muted-foreground">
                    Page {page} of {totalPages}
                </div>
                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:pointer-events-none transition-colors"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};