import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/shared/components/Layout';
import {
    ArticleList,
    ArticleDetail,
    ArticleCreate,
    ArticleEdit
} from '@/features/articles/components';
import {
    CategoriesList,
    CategoryDetail
} from '@/features/categories/components';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Navigate to="/articles" replace />
            },
            {
                path: 'articles',
                children: [
                    {
                        index: true,
                        element: <ArticleList />,
                    },
                    {
                        path: 'new',
                        element: <ArticleCreate />,
                    },
                    {
                        path: ':id',
                        element: <ArticleDetail />,
                    },
                    {
                        path: ':id/edit',
                        element: <ArticleEdit />,
                    }
                ]
            },
            {
                path: 'categories',
                children: [
                    {
                        index: true,
                        element: <CategoriesList />,
                    },
                    {
                        path: ':categoryId',
                        element: <CategoryDetail />,
                    }
                ]
            }
        ]
    }
]);