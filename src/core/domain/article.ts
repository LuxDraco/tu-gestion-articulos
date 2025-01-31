export interface Article {
    id: string;
    title: string;
    content: string;
    category: string;
    subcategory?: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateArticleDTO = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateArticleDTO = Partial<CreateArticleDTO>;