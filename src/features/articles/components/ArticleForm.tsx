import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, mockCategories, mockSubcategories } from '@core/infrastructure/repositories/mockData';
import { Save, AlertCircle } from 'lucide-react';

const articleSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().optional()
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
    onSubmit: (data: ArticleFormData) => void;
    isSubmitting: boolean;
    initialData?: Partial<ArticleFormData>;
}

export const ArticleForm = ({ initialData, onSubmit, isSubmitting }: ArticleFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: initialData
    });

    const selectedCategory = watch('category') as Category;
    const availableSubcategories = selectedCategory ? mockSubcategories[selectedCategory] : [];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-1">
                <label htmlFor="title" className="text-sm font-medium text-foreground">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all"
                    placeholder="Enter article title..."
                />
                {errors.title && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.title.message}</span>
                    </div>
                )}
            </div>

            {/* Content Field */}
            <div className="space-y-1">
                <label htmlFor="content" className="text-sm font-medium text-foreground">
                    Content
                </label>
                <textarea
                    id="content"
                    {...register('content')}
                    rows={8}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all resize-y"
                    placeholder="Write your article content..."
                />
                {errors.content && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.content.message}</span>
                    </div>
                )}
            </div>

            {/* Categories Section */}
            <div className="grid gap-6 sm:grid-cols-2">
                {/* Category Field */}
                <div className="space-y-1">
                    <label htmlFor="category" className="text-sm font-medium text-foreground">
                        Category
                    </label>
                    <select
                        id="category"
                        {...register('category')}
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground
                                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all"
                    >
                        <option value="">Select a category</option>
                        {mockCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.category.message}</span>
                        </div>
                    )}
                </div>

                {/* Subcategory Field */}
                {selectedCategory && availableSubcategories.length > 0 && (
                    <div className="space-y-1">
                        <label htmlFor="subcategory" className="text-sm font-medium text-foreground">
                            Subcategory
                        </label>
                        <select
                            id="subcategory"
                            {...register('subcategory')}
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground
                                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                                     disabled:opacity-50 disabled:cursor-not-allowed
                                     transition-all"
                        >
                            <option value="">Select a subcategory</option>
                            {availableSubcategories.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                    {subcategory}
                                </option>
                            ))}
                        </select>
                        {errors.subcategory && (
                            <div className="flex items-center gap-2 text-destructive text-sm">
                                <AlertCircle className="w-4 h-4" />
                                <span>{errors.subcategory.message}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground
                             hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors"
                >
                    <Save className="w-4 h-4" />
                    {isSubmitting ? 'Saving...' : 'Save Article'}
                </button>
            </div>
        </form>
    );
};