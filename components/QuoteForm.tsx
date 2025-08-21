import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation();
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
    if (!form.name.trim()) newErrors.name = t('quote.nameRequired');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) newErrors.email = t('quote.emailRequired');
    else if (!emailPattern.test(form.email.trim())) newErrors.email = t('quote.emailInvalid');
    if (!form.bookType.trim()) newErrors.bookType = t('quote.bookTypeRequired');
    if (!form.quantity.trim() || parseInt(form.quantity, 10) <= 0) newErrors.quantity = t('quote.quantityInvalid');
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
          setSuccess(data.message || t('quote.success'));
          setSubmitError('');
          setForm({ name: '', email: '', bookType: '', quantity: '', notes: '' });
          setTimeout(() => setSuccess(''), 5000);
        } else {
          setSubmitError(data.error || t('quote.error'));
          setSuccess('');
        }
      } catch {
        setSubmitError(t('quote.error'));
        setSuccess('');
      }
    }
  };

  return (
    <section id="quote" className="quote">
      <div className="container">
        <h2 className="heading-font">{t('quote.title')}</h2>
        <form className="quote-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="quote-name">{t('quote.name')}</label>
            <input type="text" id="quote-name" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="quote-email">{t('quote.email')}</label>
            <input type="email" id="quote-email" name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="book-type">{t('quote.bookType')}</label>
            <select id="book-type" name="bookType" value={form.bookType} onChange={handleChange}>
              <option value="">{t('quote.selectType')}</option>
              <option value="hardcover">{t('quote.hardcover')}</option>
              <option value="paperback">{t('quote.paperback')}</option>
              <option value="leather">{t('quote.leather')}</option>
            </select>
            {errors.bookType && <span className="error-message">{errors.bookType}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">{t('quote.quantity')}</label>
            <input type="number" id="quantity" name="quantity" min="1" value={form.quantity} onChange={handleChange} />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="quote-notes">{t('quote.notes')}</label>
            <textarea id="quote-notes" name="notes" value={form.notes} onChange={handleChange}></textarea>
          </div>
          <button type="submit">{t('quote.submit')}</button>
          {success && <span className="success-message">{success}</span>}
          {submitError && <span className="error-message">{submitError}</span>}
        </form>
      </div>
    </section>
  );
}
