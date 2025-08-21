import { useState } from 'react';
import styles from './ContactForm.module.css';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ErrorState {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<ErrorState>({});
  const [success, setSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newErrors: ErrorState = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!emailPattern.test(form.email.trim())) newErrors.email = 'Enter a valid email.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json() as { message?: string; error?: string };
        if (res.ok) {
          setSuccess(data.message || 'Thank you for your message!');
          setSubmitError('');
          setForm({ name: '', email: '', message: '' });
        } else {
          setSubmitError(data.error || 'Failed to send message.');
          setSuccess('');
        }
      } catch {
        setSubmitError('Failed to send message.');
        setSuccess('');
      }
    }
  };

  return (
    <form id="contact-form" className={styles.contactForm} onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange}></textarea>
        {errors.message && <span id="message-error" className="error-message">{errors.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary">Send</button>
      {success && <span className="success-message">{success}</span>}
      {submitError && <span className="error-message">{submitError}</span>}
    </form>
  );
}
