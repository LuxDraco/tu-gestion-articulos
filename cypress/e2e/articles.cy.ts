describe('Article Management', () => {
    beforeEach(() => {
        cy.visit('/articles');
    });

    it('creates and deletes an article', () => {
        // Create article
        cy.get('a').contains('New Article').click();
        cy.get('input[name="title"]').type('Test Article');
        cy.get('select[name="category"]').select('Frontend');
        cy.get('textarea[name="content"]').type('Test content');
        cy.get('button').contains('Save Article').click();

        // Verify article was created
        cy.get('h1').contains('Test Article');

        // Delete article
        cy.get('button').contains('Delete').click();
        cy.url().should('include', '/articles');
    });

    it('filters articles by category', () => {
        cy.get('select').first().select('Frontend');
        cy.get('article').should('have.length.at.least', 1);
        cy.get('article').each(($article) => {
            cy.wrap($article).should('contain.text', 'Frontend');
        });
    });
});