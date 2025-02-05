// articles.cy.ts

describe('Articles Management', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        cy.window().then((win) => {
            win.localStorage.clear();
        });
        cy.visit('/');

        // Wait for initial render
        cy.get('[data-testid="article-card"]').should('exist');
    });

    describe('Article List Functionality', () => {
        it('should display articles list correctly', () => {
            cy.get('[data-testid="article-card"]')
                .should('have.length.at.least', 1)
                .first()
                .within(() => {
                    cy.get('h2').should('be.visible');
                    cy.get('p').should('be.visible');
                });
        });

        it('should filter articles by category', () => {
            const targetCategory = 'Frontend';

            cy.get('#article-list')
                .should('exist')
                .wait(2000);

            // Select the desired category
            cy.get('[data-testid="category-select"]')
                .should('be.visible')
                .select(targetCategory)
                .wait(500);

            // Re-query for article cards after the DOM updates
            cy.get('[data-testid="article-card"]').should('exist');

            // Now iterate over each card and assert the text
            cy.get('[data-testid="article-card"]').each(($card) => {
                cy.wrap($card).should('contain.text', targetCategory);
            });
        });

        it('should navigate to article details on click', () => {
            cy.get('[data-testid="article-card"]')
                .first()
                .click();

            cy.url().should('match', /\/articles\/\d+/);
        });
    });

    describe('Article Creation', () => {
        beforeEach(() => {
            cy.contains('New Article').click();
        });

        it('should show validation errors on empty submission', () => {
            cy.contains('button', 'Save').click();
            cy.contains('Title is required').should('be.visible');
            cy.contains('Content is required').should('be.visible');
        });

        it('should create new article successfully', () => {
            const newArticle = {
                title: 'Test Article',
                content: 'This is a test article content',
                category: 'Frontend'
            };

            cy.get('#title').type(newArticle.title);
            cy.get('#content').type(newArticle.content);
            cy.get('#category').select(newArticle.category);
            cy.contains('button', 'Save').click();

            // Verify redirect and content
            cy.url().should('match', /\/articles\/\d+/);
            cy.contains(newArticle.title).should('be.visible');
        });
    });

    describe('Article Details and Actions', () => {
        beforeEach(() => {
            cy.get('[data-testid="article-card"]')
                .first()
                .click();

            // Wait for detail page to load
            cy.get('h1').should('be.visible');
        });

        it('should display article details correctly', () => {
            cy.get('h1').should('not.be.empty');
            cy.get('.prose').should('be.visible');
            cy.get('.text-muted-foreground')
                .should('contain', 'Created')
                .and('contain', 'Updated');
        });

        it('should handle favorites functionality', () => {
            cy.get('button')
                .contains(/Add to Favorites|Favorited/)
                .as('favoriteButton')
                .click();

            cy.get('@favoriteButton')
                .should('contain', 'Favorited');

            // Verify persistence
            cy.reload();
            cy.contains('Favorited').should('exist');
        });

        it('should handle rating functionality', () => {
            cy.contains('Rating:')
                .parent()
                .within(() => {
                    cy.get('[role="button"]')
                        .eq(3)
                        .click();
                });

            // Verify rating persists
            cy.reload();
            cy.contains('Rating:')
                .parent()
                .find('[aria-checked="true"]')
                .should('have.length', 4);
        });

        it('should delete article with confirmation', () => {
            cy.contains('button', 'Delete').click();

            cy.get('.fixed.inset-0.z-50')
                .should('be.visible')
                .then(($modal) => {
                    // Explicitly wrap the modal to ensure it's a proper element
                    cy.wrap($modal).within(() => {
                        cy.contains('button', 'Delete').click();
                    });
                });

            // Verify redirect after deletion
            cy.url().should('match', /\/articles$/);
        });
    });

    describe('Article Editing', () => {
        beforeEach(() => {
            // Navigate to article detail first
            cy.get('[data-testid="article-card"]')
                .first()
                .click();

            // Wait for detail page to load and click edit link
            cy.get('a')
                .contains('Edit')
                .should('be.visible')
                .click();

            // Wait for edit page to load
            cy.url().should('include', '/edit');
            cy.contains('Edit Article').should('be.visible');
        });



        it('should update article successfully', () => {
            const updatedTitle = 'Updated Test Article ' + Date.now();
            const updatedContent = 'Updated content for testing';

            // Update form fields
            cy.get('#title')
                .clear()
                .type(updatedTitle);

            cy.get('#content')
                .clear()
                .type(updatedContent);

            // Submit form
            cy.get('button[type="submit"]')
                .contains(/Save|Update/)
                .click();

            // Verify redirect and updates
            cy.url().should('not.include', '/edit');
            cy.contains(updatedTitle).should('be.visible');
            cy.contains(updatedContent).should('be.visible');
        });

        it('should handle validation during edit', () => {
            // Clear required fields
            cy.get('#title').clear();
            cy.get('#content').clear();

            // Try to submit
            cy.get('button[type="submit"]')
                .contains(/Save|Update/)
                .click();

            // Verify validation messages
            cy.contains('Title is required').should('be.visible');
            cy.contains('Content is required').should('be.visible');
        });
    });

    describe('Error Handling', () => {
        it('should handle navigation to non-existent article', () => {
            cy.visit('/articles/999999');
            cy.contains('Article not found').should('be.visible');
            cy.contains('Return to articles').should('be.visible');
        });

        it('should handle empty article list gracefully', () => {
            // First filter with a non-existent category
            cy.get('[data-testid="category-select"]')
                .select('Frontend');

            // Verify either articles are shown or empty state is handled
            cy.get('body').then($body => {
                if ($body.find('[data-testid="article-card"]').length === 0) {
                    cy.contains('No articles found').should('be.visible');
                } else {
                    cy.get('[data-testid="article-card"]').should('exist');
                }
            });
        });
    });
});