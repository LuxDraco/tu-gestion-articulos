import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticle, useDeleteArticle } from '../api/queries';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { setRating } from '@/store/slices/ratingsSlice';
import { StarRating } from './StarRating';
import { Pencil, Trash2, Star, Clock, Calendar } from 'lucide-react';

export const ArticleDetail = () => {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: article, isLoading } = useArticle(id);
    const { mutate: deleteArticle } = useDeleteArticle();

    const favorites = useAppSelector(state => state.favorites.articleIds);
    const ratings = useAppSelector(state => state.ratings.ratings);

    const isFavorite = favorites.includes(Number(id));
    const currentRating = ratings[Number(id)]?.rating || 0;

    if (isLoading) {
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

    const handleDelete = () => {
        deleteArticle(id, {
            onSuccess: () => navigate('/articles')
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

    return (
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
                            onClick={handleDelete}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
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
    );
};