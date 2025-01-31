/// <reference types="cypress" />

describe('Articles Management', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display articles list', () => {
        // Using data-testid attributes for more reliable selection
        cy.get('[data-testid="articles-list"]').should('exist');
    });

    it('should navigate to article details', () => {
        cy.get('[data-testid="article-card"]').first().click();
        cy.url().should('include', '/articles/');
    });

    it('should filter articles by category', () => {
        cy.get('[data-testid="category-select"]').select('Frontend');
        cy.get('[data-testid="article-card"]').should('have.length.at.least', 1);
        cy.get('[data-testid="article-card"]').each(($article) => {
            cy.wrap($article).should('contain.text', 'Frontend');
        });
    });
});