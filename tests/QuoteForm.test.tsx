/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import QuoteForm from '../components/QuoteForm';

describe('QuoteForm', () => {
  it('shows validation errors for empty fields', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    (global as any).fetch = mockFetch;

    render(<QuoteForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Email is required.')).toBeInTheDocument();
    expect(await screen.findByText('Book type is required.')).toBeInTheDocument();
    expect(await screen.findByText('Enter a valid quantity.')).toBeInTheDocument();
  });

  it('shows error for invalid email', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    (global as any).fetch = mockFetch;

    render(<QuoteForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/book type/i), { target: { value: 'hardcover' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText('Enter a valid email.')).toBeInTheDocument();
  });
});
