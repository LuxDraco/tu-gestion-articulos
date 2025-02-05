import { describe, it, expect } from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ArticleList } from '../ArticleList';
import { store } from '@/store/store';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>{component}</BrowserRouter>
            </QueryClientProvider>
        </Provider>
    );
};

describe('ArticleList', () => {
    it('renders the article list with pagination', async () => {
        renderWithProviders(<ArticleList />);

        expect(await screen.findByText('Articles')).toBeInTheDocument();
        expect(screen.getByText('New Article')).toBeInTheDocument();

        const articles = await screen.findAllByRole('article');
        expect(articles.length).toBeGreaterThan(0);
    });

    describe('ArticleList', () => {
        it('filters articles by category', async () => {
            renderWithProviders(<ArticleList />);

            // Espera a que se renderice la lista de artículos (usando data-testid)
            await screen.findByTestId('articles-list');

            const targetCategory = 'Frontend';

            // Localiza el select de categoría por data-testid y simula el cambio
            const select = await screen.findByTestId('category-select');
            fireEvent.change(select, { target: { value: targetCategory } });

            // Espera a que se actualicen los artículos filtrados y verifica que cada tarjeta contenga el texto de la categoría seleccionada
            await waitFor(() => {
                const articleCards = screen.getAllByTestId('article-card');
                articleCards.forEach((card) => {
                    expect(card).toHaveTextContent(targetCategory);
                });
            }, { timeout: 3000 });
        });
    });
});