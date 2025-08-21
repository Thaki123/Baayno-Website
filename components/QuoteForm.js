import { useState } from 'react';

export default function QuoteForm() {
  const [form, setForm] = useState({ name: '', email: '', bookType: '', quantity: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
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
        const data = await res.json();
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
    <section id="quote" className="quote">
      <div className="container">
        <h2 className="heading-font">Request a Quote</h2>
        <form className="quote-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="quote-name">Name</label>
            <input type="text" id="quote-name" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="quote-email">Email</label>
            <input type="email" id="quote-email" name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="book-type">Book Type</label>
            <select id="book-type" name="bookType" value={form.bookType} onChange={handleChange}>
              <option value="">Select a type</option>
              <option value="hardcover">Hardcover</option>
              <option value="paperback">Paperback</option>
              <option value="leather">Leather</option>
            </select>
            {errors.bookType && <span className="error-message">{errors.bookType}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" min="1" value={form.quantity} onChange={handleChange} />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="quote-notes">Notes</label>
            <textarea id="quote-notes" name="notes" value={form.notes} onChange={handleChange}></textarea>
          </div>
          <button type="submit">Submit</button>
          {success && <span className="success-message">{success}</span>}
          {submitError && <span className="error-message">{submitError}</span>}
        </form>
      </div>
    </section>
  );
}

