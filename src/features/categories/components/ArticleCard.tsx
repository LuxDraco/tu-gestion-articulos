import { Link } from 'react-router-dom';
import { Article } from '@/core/domain/article';
import { useAppSelector } from '@/store/store';

interface ArticleCardProps {
    article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
    const favorites = useAppSelector(state => state.favorites.articleIds);
    const ratings = useAppSelector(state => state.ratings.ratings);

    const isFavorite = favorites.includes(Number(article.id));
    const rating = ratings[Number(article.id)]?.rating || 0;

    return (
        <article className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <Link to={`/articles/${article.id}`}>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-2">
                    {article.content.substring(0, 150)}...
                </p>
                <div className="flex gap-2 text-sm text-gray-500">
                    {article.subcategory && (
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full">
              {article.subcategory}
            </span>
                    )}
                    {isFavorite && (
                        <span className="text-yellow-500">★</span>
                    )}
                    {rating > 0 && (
                        <span className="flex items-center gap-1">
              {rating} <span className="text-yellow-400">★</span>
            </span>
                    )}
                </div>
            </Link>
        </article>
    );
};