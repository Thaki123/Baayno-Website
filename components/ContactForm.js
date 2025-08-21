import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!emailPattern.test(form.email.trim())) newErrors.email = 'Enter a valid email.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert('Thank you for your message!');
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
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
      <button type="submit">Send</button>
    </form>
  );
}
