import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
                <BrowserRouter>
                    {component}
                </BrowserRouter>
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

    it('filters articles by category', async () => {
        renderWithProviders(<ArticleList />);

        const select = await screen.findByRole('combobox');
        fireEvent.change(select, { target: { value: 'Frontend' } });

        const articles = await screen.findAllByRole('article');
        articles.forEach(article => {
            expect(article).toHaveTextContent('Frontend');
        });
    });
});