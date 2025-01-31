import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { mockCategories, mockSubcategories } from '@/core/infrastructure/repositories/mockData';
import { Article } from '@/core/domain/article';

const schema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    content: z.string().min(1, 'Content is required'),
    category: z.string().min(1, 'Category is required'),
    subcategory: z.string().optional()
});

type FormData = z.infer<typeof schema>;

interface ArticleFormProps {
    initialData?: Article;
    onSubmit: (data: FormData) => Promise<void>;
    isSubmitting: boolean;
}

export const ArticleForm = ({ initialData, onSubmit, isSubmitting }: ArticleFormProps) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: initialData
    });

    const selectedCategory = watch('category');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    {...register('title')}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    {...register('category')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Select category</option>
                    {mockCategories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
            </div>

            {selectedCategory && mockSubcategories[selectedCategory] && (
                <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                        Subcategory
                    </label>
                    <select
                        {...register('subcategory')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select subcategory</option>
                        {mockSubcategories[selectedCategory].map(sub => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                    {errors.subcategory && (
                        <p className="mt-1 text-sm text-red-600">{errors.subcategory.message}</p>
                    )}
                </div>
            )}

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    {...register('content')}
                    rows={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : 'Save Article'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};