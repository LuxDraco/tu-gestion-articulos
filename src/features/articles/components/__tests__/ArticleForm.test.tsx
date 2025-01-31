import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ArticleForm } from '../ArticleForm';
import { BrowserRouter } from 'react-router-dom';

const mockOnSubmit = vi.fn();

const renderForm = (props = {}) => {
    return render(
        <BrowserRouter>
            <ArticleForm
                onSubmit={mockOnSubmit}
                isSubmitting={false}
                {...props}
            />
        </BrowserRouter>
    );
};

describe('ArticleForm', () => {
    it('validates required fields', async () => {
        renderForm();

        const submitButton = screen.getByText('Save Article');
        fireEvent.click(submitButton);

        expect(await screen.findByText('Title is required')).toBeInTheDocument();
        expect(await screen.findByText('Content is required')).toBeInTheDocument();
        expect(await screen.findByText('Category is required')).toBeInTheDocument();
    });

    it('submits form with valid data', async () => {
        renderForm();

        fireEvent.change(screen.getByLabelText('Title'), {
            target: { value: 'Test Article' }
        });

        fireEvent.change(screen.getByLabelText('Content'), {
            target: { value: 'Test content' }
        });

        fireEvent.change(screen.getByLabelText('Category'), {
            target: { value: 'Frontend' }
        });

        const submitButton = screen.getByText('Save Article');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                title: 'Test Article',
                content: 'Test content',
                category: 'Frontend',
                subcategory: ''
            });
        });
    });
});