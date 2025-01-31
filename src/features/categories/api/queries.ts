import { useQuery } from '@tanstack/react-query';
import { mockCategories, mockSubcategories } from '@/core/infrastructure/repositories/mockData';
import { articleRepository } from '@/core/infrastructure/repositories/articleRepository';

export const categoryKeys = {
    all: ['categories'] as const,
    articles: (category: string) => ['categories', category, 'articles'] as const
};

export const useCategories = () => {
    return useQuery({
        queryKey: categoryKeys.all,
        queryFn: () => ({ categories: mockCategories, subcategories: mockSubcategories })
    });
};

export const useCategoryArticles = (category: string) => {
    return useQuery({
        queryKey: categoryKeys.articles(category),
        queryFn: () => articleRepository.getAll({ page: 1, limit: 100, category })
    });
};
