import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articleRepository } from '@/core/infrastructure/repositories/articleRepository';

export const articleKeys = {
    all: ['articles'] as const,
    lists: () => [...articleKeys.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...articleKeys.lists(), { filters }] as const,
    details: () => [...articleKeys.all, 'detail'] as const,
    detail: (id: string) => [...articleKeys.details(), id] as const,
};

export const useArticles = (params: { page: number; limit: number; category?: string }) => {
    return useQuery({
        queryKey: articleKeys.list(params),
        queryFn: () => articleRepository.getAll(params),
        keepPreviousData: true
    });
};

export const useArticle = (id: string) => {
    return useQuery({
        queryKey: articleKeys.detail(id),
        queryFn: () => articleRepository.getById(id),
    });
};

export const useCreateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: articleRepository.create.bind(articleRepository),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};

export const useUpdateArticle = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => articleRepository.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: articleKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};

export const useDeleteArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: articleRepository.delete.bind(articleRepository),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};