import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {Category, mockCategories, mockSubcategories} from '@core/infrastructure/repositories/mockData';

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    id="content"
                    {...register('content')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    id="category"
                    {...register('category')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select a category</option>
                    {mockCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
            </div>

            {selectedCategory && availableSubcategories && availableSubcategories.length > 0 && (
                <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                        Subcategory
                    </label>
                    <select
                        id="subcategory"
                        {...register('subcategory')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select a subcategory</option>
                        {availableSubcategories.map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                    </select>A
                    {errors.subcategory && (
                        <p className="mt-1 text-sm text-red-600">{errors.subcategory.message}</p>
                    )}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : 'Save Article'}
                </button>
            </div>
        </form>
    );
};