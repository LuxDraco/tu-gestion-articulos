import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ArticleForm } from '../ArticleForm';
import { BrowserRouter } from 'react-router-dom';

// Función mock para simular la función onSubmit
const mockOnSubmit = vi.fn();

// Función para renderizar el formulario con un BrowserRouter (para manejar rutas, si es necesario)
const renderForm = (props = {}) => {
    return render(
        <BrowserRouter>
            <ArticleForm onSubmit={mockOnSubmit} isSubmitting={false} {...props} />
        </BrowserRouter>
    );
};

describe('ArticleForm', () => {
    beforeEach(() => {
        // Reinicia la función mock antes de cada prueba
        mockOnSubmit.mockReset();
    });

    it('validates required fields', async () => {
        renderForm();

        // Buscamos el botón de envío por su texto (asegúrate que el texto sea exactamente "Save Article")
        const submitButton = screen.getByText('Save Article');
        fireEvent.click(submitButton);

        // Esperamos a que aparezcan los mensajes de error correspondientes
        expect(await screen.findByText('Title is required')).toBeInTheDocument();
        expect(await screen.findByText('Content is required')).toBeInTheDocument();
        expect(await screen.findByText('Category is required')).toBeInTheDocument();
    });

    it('submits form with valid data', async () => {
        renderForm();

        // Simula el ingreso de datos en los campos del formulario
        fireEvent.change(screen.getByLabelText('Title'), {
            target: { value: 'Test Article' }
        });
        fireEvent.change(screen.getByLabelText('Content'), {
            target: { value: 'Test content' }
        });
        fireEvent.change(screen.getByLabelText('Category'), {
            target: { value: 'Frontend' }
        });

        // Hacemos clic en el botón para enviar el formulario
        const submitButton = screen.getByText('Save Article');
        fireEvent.click(submitButton);

        // Esperamos a que se llame a la función onSubmit
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
        });

        // Extraemos el primer argumento de la primera llamada (los datos enviados)
        const [submittedData] = mockOnSubmit.mock.calls[0];

        // Comparamos que los datos enviados sean los esperados
        expect(submittedData).toEqual({
            title: 'Test Article',
            content: 'Test content',
            category: 'Frontend',
            subcategory: ''
        });
    });
});