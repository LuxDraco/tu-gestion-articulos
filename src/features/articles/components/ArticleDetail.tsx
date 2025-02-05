import {useParams, useNavigate, Link} from 'react-router-dom';
import {useArticle, useDeleteArticle} from '../api/queries';
import {useAppDispatch, useAppSelector} from '@/store/store';
import {toggleFavorite} from '@/store/slices/favoritesSlice';
import {setRating} from '@/store/slices/ratingsSlice';
import {StarRating} from './StarRating';

export const ArticleDetail = () => {
    const {id = ''} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {data: article, isLoading} = useArticle(id);
    const {mutate: deleteArticle} = useDeleteArticle();

    const favorites = useAppSelector(state => state.favorites.articleIds);
    const ratings = useAppSelector(state => state.ratings.ratings);

    const isFavorite = favorites.includes(Number(id));
    const currentRating = ratings[Number(id)]?.rating || 0;

    if (isLoading) return <div>Loading...</div>;
    if (!article) return <div>Article not found</div>;

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
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                <div className="flex gap-4">
                    <Link
                        to={`/articles/${id}/edit`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={handleToggleFavorite}
                        className={`flex items-center gap-2 px-4 py-2 rounded ${
                            isFavorite
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
            <span className="material-icons">
              {isFavorite ? 'star' : 'star_border'}
            </span>
                        {isFavorite ? 'Favorited' : 'Add to Favorites'}
                    </button>

                    <StarRating
                        rating={currentRating}
                        onRate={handleRating}
                    />
                </div>

                <div className="mb-4">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-sm">
            {article.category}
          </span>
                    {article.subcategory && (
                        <span className="ml-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-sm">
              {article.subcategory}
            </span>
                    )}
                </div>

                <div className="prose max-w-none">
                    {article.content}
                </div>

                <div className="mt-6 text-sm text-gray-500">
                    <p>Created: {new Date(article.createdAt).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(article.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};
