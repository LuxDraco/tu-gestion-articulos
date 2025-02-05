import {useQuery, useMutation, useQueryClient, keepPreviousData} from '@tanstack/react-query';
import { articleRepository } from '@/core/infrastructure/repositories/articleRepository';
import { Article, CreateArticleDTO, UpdateArticleDTO } from '@/core/domain/article';

type ArticlesResponse = {
    data: Article[];
    total: number;
};

export const articleKeys = {
    all: ['articles'] as const,
    lists: () => [...articleKeys.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...articleKeys.lists(), { filters }] as const,
    details: () => [...articleKeys.all, 'detail'] as const,
    detail: (id: string) => [...articleKeys.details(), id] as const,
};

export const useArticles = (params: { page: number; limit: number; category?: string }) => {
    return useQuery<ArticlesResponse, Error>({
        queryKey: articleKeys.list(params),
        queryFn: () => articleRepository.getAll(params),
        placeholderData: keepPreviousData
    });
};

export const useArticle = (id: string) => {
    return useQuery<Article, Error>({
        queryKey: articleKeys.detail(id),
        queryFn: () => articleRepository.getById(id),
    });
};

export const useCreateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation<Article, Error, CreateArticleDTO>({
        mutationFn: (data: CreateArticleDTO) => articleRepository.create(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};

export const useUpdateArticle = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation<Article, Error, UpdateArticleDTO>({
        mutationFn: (data: UpdateArticleDTO) => articleRepository.update(id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: articleKeys.detail(id) });
            await queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};

export const useDeleteArticle = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => articleRepository.delete(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};