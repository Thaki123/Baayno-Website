import { useState } from 'react';
import styles from './QuoteForm.module.css';

interface QuoteFormState {
  name: string;
  email: string;
  bookType: string;
  quantity: string;
  notes: string;
}

interface ErrorState {
  name?: string;
  email?: string;
  bookType?: string;
  quantity?: string;
  notes?: string;
}

export default function QuoteForm() {
  const [form, setForm] = useState<QuoteFormState>({ name: '', email: '', bookType: '', quantity: '', notes: '' });
  const [errors, setErrors] = useState<ErrorState>({});
  const [success, setSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newErrors: ErrorState = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!emailPattern.test(form.email.trim())) newErrors.email = 'Enter a valid email.';
    if (!form.bookType.trim()) newErrors.bookType = 'Book type is required.';
    if (!form.quantity.trim() || parseInt(form.quantity, 10) <= 0) newErrors.quantity = 'Enter a valid quantity.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json() as { message?: string; error?: string };
        if (res.ok) {
          setSuccess(data.message || 'Quote request sent!');
          setSubmitError('');
          setForm({ name: '', email: '', bookType: '', quantity: '', notes: '' });
          setTimeout(() => setSuccess(''), 5000);
        } else {
          setSubmitError(data.error || 'Failed to send quote request.');
          setSuccess('');
        }
      } catch {
        setSubmitError('Failed to send quote request.');
        setSuccess('');
      }
    }
  };

  return (
    <section id="quote" className={styles.quote}>
      <div className="container">
        <h2 className="heading-font">Request a Quote</h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="quote-name">Name</label>
            <input
              type="text"
              id="quote-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'quote-name-error' : undefined}
              required
            />
            {errors.name && (
              <span id="quote-name-error" className="error-message" role="alert">
                {errors.name}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="quote-email">Email</label>
            <input
              type="email"
              id="quote-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'quote-email-error' : undefined}
              required
            />
            {errors.email && (
              <span id="quote-email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="book-type">Book Type</label>
            <select
              id="book-type"
              name="bookType"
              value={form.bookType}
              onChange={handleChange}
              aria-invalid={!!errors.bookType}
              aria-describedby={errors.bookType ? 'book-type-error' : undefined}
              required
            >
              <option value="">Select a type</option>
              <option value="hardcover">Hardcover</option>
              <option value="paperback">Paperback</option>
              <option value="leather">Leather</option>
            </select>
            {errors.bookType && (
              <span id="book-type-error" className="error-message" role="alert">
                {errors.bookType}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              aria-invalid={!!errors.quantity}
              aria-describedby={errors.quantity ? 'quantity-error' : undefined}
              required
            />
            {errors.quantity && (
              <span id="quantity-error" className="error-message" role="alert">
                {errors.quantity}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="quote-notes">Notes</label>
            <textarea id="quote-notes" name="notes" value={form.notes} onChange={handleChange}></textarea>
          </div>
          <button type="submit" aria-label="Submit quote request">Submit</button>
          {success && (
            <span className="success-message" role="status" aria-live="polite">
              {success}
            </span>
          )}
          {submitError && (
            <span className="error-message" role="alert">
              {submitError}
            </span>
          )}
        </form>
      </div>
    </section>
  );
}
