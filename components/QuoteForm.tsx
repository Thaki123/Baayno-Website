import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetch('/api/quote')
      .then((res) => {
        if (!res.ok) {
          setDisabled(true);
          setSubmitError('Email service not configured.');
        }
      })
      .catch(() => {
        setDisabled(true);
        setSubmitError('Email service not configured.');
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (disabled) return;
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
            <label htmlFor="quote-name" className={styles.label}>Name</label>
            <input
              type="text"
              id="quote-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'quote-name-error' : undefined}
              className={styles.input}
              required
            />
            <AnimatePresence>
              {errors.name && (
                <motion.span
                  id="quote-name-error"
                  className={styles.errorMessage}
                  role="alert"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.name}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="form-group">
            <label htmlFor="quote-email" className={styles.label}>Email</label>
            <input
              type="email"
              id="quote-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'quote-email-error' : undefined}
              className={styles.input}
              required
            />
            <AnimatePresence>
              {errors.email && (
                <motion.span
                  id="quote-email-error"
                  className={styles.errorMessage}
                  role="alert"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="form-group">
            <label htmlFor="book-type" className={styles.label}>Book Type</label>
            <select
              id="book-type"
              name="bookType"
              value={form.bookType}
              onChange={handleChange}
              aria-invalid={!!errors.bookType}
              aria-describedby={errors.bookType ? 'book-type-error' : undefined}
              className={styles.select}
              required
            >
              <option value="">Select a type</option>
              <option value="hardcover">Hardcover</option>
              <option value="paperback">Paperback</option>
              <option value="leather">Leather</option>
            </select>
            <AnimatePresence>
              {errors.bookType && (
                <motion.span
                  id="book-type-error"
                  className={styles.errorMessage}
                  role="alert"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.bookType}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className={styles.label}>Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              aria-invalid={!!errors.quantity}
              aria-describedby={errors.quantity ? 'quantity-error' : undefined}
              className={styles.input}
              required
            />
            <AnimatePresence>
              {errors.quantity && (
                <motion.span
                  id="quantity-error"
                  className={styles.errorMessage}
                  role="alert"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.quantity}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="form-group">
            <label htmlFor="quote-notes" className={styles.label}>Notes</label>
            <textarea
              id="quote-notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className={styles.textarea}
            ></textarea>
          </div>
          <button type="submit" className={styles.button} aria-label="Submit quote request" disabled={disabled}>
            Submit
          </button>
          <AnimatePresence>
            {success && (
              <motion.span
                className={styles.successMessage}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {success}
              </motion.span>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {submitError && (
              <motion.span
                className={styles.errorMessage}
                role="alert"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {submitError}
              </motion.span>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
