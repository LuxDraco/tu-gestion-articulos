/// <reference types="cypress" />

import { Article } from '@/core/domain/article';

declare global {
    namespace Cypress {
        interface Chainable {
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
            createArticle(article: Partial<Article>): Chainable<void>;
            deleteArticle(id: string): Chainable<void>;
            setRating(articleId: string, rating: number): Chainable<void>;
            toggleFavorite(articleId: string): Chainable<void>;
        }
    }
}