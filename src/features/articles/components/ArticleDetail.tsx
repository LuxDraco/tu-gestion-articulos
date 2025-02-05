import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticle, useDeleteArticle } from '../api/queries';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { setRating } from '@/store/slices/ratingsSlice';
import { StarRating } from './StarRating';
import { Pencil, Trash2, Star, Clock, Calendar, AlertTriangle, X } from 'lucide-react';

export const ArticleDetail = () => {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data: article, isPending } = useArticle(id);
    const { mutate: deleteArticle } = useDeleteArticle();

    const favorites = useAppSelector(state => state.favorites.articleIds);
    const ratings = useAppSelector(state => state.ratings.ratings);

    const isFavorite = favorites.includes(Number(id));
    const currentRating = ratings[Number(id)]?.rating || 0;

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowDeleteModal(false);
        };

        if (showDeleteModal) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showDeleteModal]);

    const handleDelete = () => {
        deleteArticle(id, {
            onSuccess: () => {
                setShowDeleteModal(false);
                navigate('/articles');
            }
        });
    };

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(Number(id)));
    };

    const handleRating = (rating: number) => {
        dispatch(setRating({
            articleId: Number(id),
            rating,
            timestamp: Date.now()
        }));
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-8 w-64 bg-muted rounded-md"></div>
                    <div className="h-4 w-48 bg-muted rounded-md"></div>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-semibold text-muted-foreground">Article not found</h2>
                <Link
                    to="/articles"
                    className="text-primary hover:text-primary/80 transition-colors"
                >
                    Return to articles
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                {/* Header Section */}
                <div className="relative space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
                        <div className="flex items-center gap-3">
                            <Link
                                to={`/articles/${id}/edit`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                            >
                                <Pencil className="w-4 h-4" />
                                <span>Edit</span>
                            </Link>

                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>

                    {/* Metadata Bar */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Created {new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Updated {new Date(article.updatedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                    {/* Actions Bar */}
                    <div className="border-b border-border/50 bg-muted/50 backdrop-blur-sm p-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={handleToggleFavorite}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                                    isFavorite
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                                }`}
                            >
                                <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
                            </button>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Rating:</span>
                                <StarRating rating={currentRating} onRate={handleRating} />
                            </div>

                            <div className="flex gap-2">
                                {article.category && (
                                    <span className="px-3 py-1 rounded-md bg-accent text-accent-foreground text-sm">
                                        {article.category}
                                    </span>
                                )}
                                {article.subcategory && (
                                    <span className="px-3 py-1 rounded-md bg-accent text-accent-foreground text-sm">
                                        {article.subcategory}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6 sm:p-8">
                        <div className="prose prose-stone max-w-none">
                            {article.content}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/30 bg-opacity-25 backdrop-blur-sm"
                        onClick={() => setShowDeleteModal(false)}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <div
                            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Header */}
                            <div className="flex items-start gap-3 mb-6">
                                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-500">
                                        Delete Article
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete "{article.title}"? This action cannot be undone.
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};