/* eslint-env jest */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../components/ContactForm';

describe('ContactForm', () => {
  it('shows validation errors for empty and invalid input', async () => {
    const mockFetch = jest.fn();
    (global as any).fetch = mockFetch;

    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Email is required.')).toBeInTheDocument();
    expect(await screen.findByText('Message is required.')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText('Enter a valid email.')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('resets form and shows confirmation on success', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Message sent!' }),
    });
    (global as any).fetch = mockFetch;

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.any(Object)));

    expect(await screen.findByText('Message sent!')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });
});
