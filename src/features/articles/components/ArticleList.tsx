import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useArticles} from '../api/queries';
import {mockCategories} from '@/core/infrastructure/repositories/mockData';
import {useAppSelector} from '@/store/store';

const PAGE_SIZE = 10;

export const ArticleList = () => {
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const favorites = useAppSelector(state => state.favorites.articleIds);

    const {data, isLoading, error} = useArticles({
        page,
        limit: PAGE_SIZE,
        category: selectedCategory
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading articles</div>;
    if (!data) return null;

    const {data: articles, total} = data;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div className="space-y-6" data-testid="articles-list">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Articles</h1>
                <Link
                    to="/articles/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                >
                    New Article
                </Link>
            </div>

            <div className="flex gap-4 mb-4">
                <select
                    data-testid="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-sm p-2"
                >
                    <option value="">All Categories</option>
                    {mockCategories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-4">
                {articles.map(article => (
                    <article
                        key={article.id}
                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        data-testid="article-card"
                    >
                        <Link to={`/articles/${article.id}`}>
                            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                            <p className="text-gray-600 mb-2">
                                {article.content.substring(0, 150)}...
                            </p>
                            <div className="flex gap-2 text-sm text-gray-500">
                                <span>{article.category}</span>
                                {article.subcategory && (
                                    <>
                                        <span>•</span>
                                        <span>{article.subcategory}</span>
                                    </>
                                )}
                                {favorites.includes(Number(article.id)) && (
                                    <>
                                        <span>•</span>
                                        <span className="text-yellow-500">Favorite</span>
                                    </>
                                )}
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-sm disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-sm disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};