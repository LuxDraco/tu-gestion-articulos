import {Link} from 'react-router-dom';
import {useCategories} from '@/features/categories/api/queries';
import {Folder, ChevronRight, Loader2, FolderTree} from 'lucide-react';

export const CategoriesList = () => {
    const {data, isLoading} = useCategories();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin"/>
                    <span>Loading categories...</span>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <FolderTree className="w-6 h-6 text-primary"/>
                    <h1 className="text-4xl font-bold tracking-tight">Categories</h1>
                </div>
                <p className="text-muted-foreground">
                    Browse articles by category and subcategory
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.categories.map((category) => (
                    <Link
                        key={category}
                        to={`/categories/${category}`}
                        className="group relative block p-6 bg-card rounded-lg border border-border/50
                            hover:shadow-lg hover:border-primary/20 transition-all duration-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Folder className="w-5 h-5 text-primary"/>
                                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                    {category}
                                </h2>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary
                                transform group-hover:translate-x-1 transition-all"/>
                        </div>

                        {data.subcategories[category] && (
                            <div className="space-y-2">
                                {data.subcategories[category].map((sub) => (
                                    <div
                                        key={sub}
                                        className="flex items-center gap-2 text-sm text-muted-foreground
                                            group-hover:text-foreground transition-colors"
                                    >
                                        <div
                                            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60
                                                group-hover:bg-primary/60 transition-colors"/>
                                        {sub}
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