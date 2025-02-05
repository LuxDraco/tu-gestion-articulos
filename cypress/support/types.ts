// types.ts
/// <reference types="cypress" />
import { Article } from '@/core/domain/article';

export {};

declare global {
    interface Window {
        store: never;
    }
}

declare module 'cypress' {
    interface Chainable<Subject = any> {
        /**
         * Custom command to select DOM element by data-testid attribute
         * @param testId - The value of data-testid attribute
         * @example cy.getByTestId('submit-button')
         */
        getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

        /**
         * Creates a new article through the Redux store
         * @param article - Article data to create
         * @example cy.createArticle({ title: 'Test Article', content: 'Content' })
         */
        createArticle(article: Partial<Article>): Chainable<void>;

        /**
         * Deletes an article by ID through the Redux store
         * @param id - Article ID to delete
         * @example cy.deleteArticle('123')
         */
        deleteArticle(id: string): Chainable<void>;

        /**
         * Sets the rating for an article
         * @param articleId - Article ID to rate
         * @param rating - Rating value (1-5)
         * @example cy.setRating('123', 4)
         */
        setRating(articleId: string, rating: number): Chainable<void>;

        /**
         * Toggles the favorite status of an article
         * @param articleId - Article ID to toggle favorite status
         * @example cy.toggleFavorite('123')
         */
        toggleFavorite(articleId: string): Chainable<void>;
    }
}