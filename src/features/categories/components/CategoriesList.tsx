import { Link } from 'react-router-dom';
import { useCategories } from '../api/queries';

export const CategoriesList = () => {
    const { data, isLoading } = useCategories();

    if (isLoading) return <div>Loading...</div>;
    if (!data) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Categories</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.categories.map((category) => (
                    <Link
                        key={category}
                        to={`/categories/${category}`}
                        className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-3">{category}</h2>
                        {data.subcategories[category] && (
                            <div className="space-y-1">
                                {data.subcategories[category].map((sub) => (
                                    <div key={sub} className="text-sm text-gray-600">
                                        • {sub}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};