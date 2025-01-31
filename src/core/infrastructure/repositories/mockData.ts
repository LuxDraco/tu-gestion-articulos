import { Article } from '@/core/domain/article';

export const mockCategories = ['Frontend', 'Backend', 'DevOps'] as const;
export type Category = typeof mockCategories[number];

export const mockSubcategories: Record<Category, string[]> = {
    Frontend: ['React', 'Vue', 'Angular'],
    Backend: ['Node.js', 'Python', 'Java'],
    DevOps: ['Docker', 'Kubernetes', 'AWS']
};

export const mockArticles: Article[] = [
    {
        id: '1',
        title: 'Getting Started with React',
        content: 'React is a JavaScript library for building user interfaces...',
        category: 'Frontend',
        subcategory: 'React',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        title: 'TypeScript Best Practices',
        content: 'TypeScript adds optional static types to JavaScript...',
        category: 'Frontend',
        subcategory: 'TypeScript',
        createdAt: '2024-01-16T10:00:00Z',
        updatedAt: '2024-01-16T10:00:00Z'
    },
    {
        id: '3',
        title: 'Node.js Fundamentals',
        content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine...',
        category: 'Backend',
        subcategory: 'Node.js',
        createdAt: '2024-01-17T10:00:00Z',
        updatedAt: '2024-01-17T10:00:00Z'
    }
];