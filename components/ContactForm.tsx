import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`${router.basePath}/api/contact`)
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
  }, [router.basePath]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch(`${router.basePath}/api/contact`, {
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
    <form id="contact-form" className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={styles.input}
          required
        />
        <AnimatePresence>
          {errors.name && (
            <motion.span
              id="name-error"
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
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={styles.input}
          required
        />
        <AnimatePresence>
          {errors.email && (
            <motion.span
              id="email-error"
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
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={styles.textarea}
          required
        ></textarea>
        <AnimatePresence>
          {errors.message && (
            <motion.span
              id="message-error"
              className={styles.errorMessage}
              role="alert"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {errors.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <button type="submit" className={styles.button} aria-label="Send message" disabled={disabled}>
        Send
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
  );
}
