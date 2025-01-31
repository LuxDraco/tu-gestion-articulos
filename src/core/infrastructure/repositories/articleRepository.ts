import { Article, CreateArticleDTO, UpdateArticleDTO } from '@/core/domain/article';
import { mockArticles } from './mockData';

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

class ArticleRepository {
    private articles: Article[] = [...mockArticles];

    async getAll(params: { page: number; limit: number; category?: string }): Promise<{
        data: Article[];
        total: number;
    }> {
        await delay();
        let filtered = [...this.articles];

        if (params.category) {
            filtered = filtered.filter(article => article.category === params.category);
        }

        const start = (params.page - 1) * params.limit;
        const end = start + params.limit;

        return {
            data: filtered.slice(start, end),
            total: filtered.length
        };
    }

    async getById(id: string): Promise<Article> {
        await delay();
        const article = this.articles.find(a => a.id === id);
        if (!article) throw new Error('Article not found');
        return article;
    }

    async create(data: CreateArticleDTO): Promise<Article> {
        await delay();
        const newArticle: Article = {
            ...data,
            id: String(this.articles.length + 1),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.articles.push(newArticle);
        return newArticle;
    }

    async update(id: string, data: UpdateArticleDTO): Promise<Article> {
        await delay();
        const index = this.articles.findIndex(a => a.id === id);
        if (index === -1) throw new Error('Article not found');

        this.articles[index] = {
            ...this.articles[index],
            ...data,
            updatedAt: new Date().toISOString()
        };

        return this.articles[index];
    }

    async delete(id: string): Promise<void> {
        await delay();
        const index = this.articles.findIndex(a => a.id === id);
        if (index === -1) throw new Error('Article not found');
        this.articles.splice(index, 1);
    }
}

export const articleRepository = new ArticleRepository();