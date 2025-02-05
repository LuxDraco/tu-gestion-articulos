// commands.ts
import { Article } from '@/core/domain/article';
import './types';

/**
 * Select element by data-testid attribute
 */
Cypress.Commands.add('getByTestId', (testId: string) => {
    return cy.get(`[data-testid="${testId}"]`);
});

/**
 * Create article through Redux store
 */
Cypress.Commands.add('createArticle', (article: Partial<Article>) => {
    return cy.window().then((win) => {
        const store = (win as any).store;
        store.dispatch({
            type: 'articles/create',
            payload: article
        });
    });
});

/**
 * Delete article through Redux store
 */
Cypress.Commands.add('deleteArticle', (id: string) => {
    return cy.window().then((win) => {
        const store = (win as any).store;
        store.dispatch({
            type: 'articles/delete',
            payload: id
        });
    });
});

/**
 * Set article rating
 */
Cypress.Commands.add('setRating', (articleId: string, rating: number) => {
    return cy.window().then((win) => {
        const store = (win as any).store;
        store.dispatch({
            type: 'ratings/setRating',
            payload: {
                articleId,
                rating,
                timestamp: Date.now()
            }
        });
    });
});

/**
 * Toggle article favorite status
 */
Cypress.Commands.add('toggleFavorite', (articleId: string) => {
    return cy.window().then((win) => {
        const store = (win as any).store;
        store.dispatch({
            type: 'favorites/toggle',
            payload: articleId
        });
    });
});