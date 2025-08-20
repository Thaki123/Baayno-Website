const getStartedBtn = document.getElementById('get-started');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
        const target = document.getElementById('services') || document.getElementById('contact');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

const requestQuoteBtn = document.getElementById('request-quote');
if (requestQuoteBtn) {
    requestQuoteBtn.addEventListener('click', () => {
        const target = document.getElementById('quote');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

const navToggle = document.getElementById('nav-toggle');
function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (navLinks) {
        navLinks.classList.toggle('open');
    }
}

if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
}

const navItems = document.querySelectorAll('.nav-links a');
if (navItems.length) {
    navItems.forEach(link => link.addEventListener('click', () => {
        const navLinks = document.getElementById('nav-links');
        if (navLinks) {
            navLinks.classList.remove('open');
        }
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
        navItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }));
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length && navItems.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navItems.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                    });
                }
            });
        }, { threshold: 0.6 });
        sections.forEach(section => sectionObserver.observe(section));
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    const servicesData = [
        {
            icon: '📚',
            title: 'Hardcover Binding',
            description: 'Durable covers for premium books.'
        },
        {
            icon: '📘',
            title: 'Perfect/PUR Binding',
            description: 'Clean, professional softcover books.'
        },
        {
            icon: '🛠️',
            title: 'Restoration & Repair',
            description: 'Give cherished books a new life.'
        },
        {
            icon: '✨',
            title: 'Foil & Embossing',
            description: 'Custom finishes that stand out.'
        },
        {
            icon: '🧪',
            title: 'Short-Run Prototyping',
            description: 'Test editions without large commitments.'
        },
        {
            icon: '🏭',
            title: 'Industrial Finishing',
            description: 'High-volume finishing for publishers.'
        }
    ];
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesData.forEach(service => {
            const article = document.createElement('article');
            article.className = 'card';
            let content = '';
            if (service.icon) {
                content += `<div class="icon">${service.icon}</div>`;
            }
            content += `<h3>${service.title}</h3><p>${service.description}</p>`;
            article.innerHTML = content;
            servicesSection.appendChild(article);
        });
    }

    const testimonials = document.querySelectorAll('#testimonials .testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    let currentIndex = 0;
    const intervalTime = 5000;
    let intervalId;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function startInterval() {
        intervalId = setInterval(nextTestimonial, intervalTime);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetInterval();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetInterval();
        });
    }

    if (testimonials.length) {
        showTestimonial(currentIndex);
        startInterval();
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');

            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';

            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required.';
                valid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required.';
                valid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = 'Enter a valid email.';
                valid = false;
            }

            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required.';
                valid = false;
            }

            if (valid) {
                contactForm.reset();
                alert('Thank you for your message!');
            }
        });
    }

    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            const nameInput = document.getElementById('quote-name');
            const emailInput = document.getElementById('quote-email');
            const bookTypeInput = document.getElementById('book-type');
            const quantityInput = document.getElementById('quantity');
            const nameError = document.getElementById('quote-name-error');
            const emailError = document.getElementById('quote-email-error');
            const bookTypeError = document.getElementById('book-type-error');
            const quantityError = document.getElementById('quantity-error');
            const successMessage = document.getElementById('quote-success');

            nameError.textContent = '';
            emailError.textContent = '';
            bookTypeError.textContent = '';
            quantityError.textContent = '';
            if (successMessage) {
                successMessage.textContent = '';
            }

            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required.';
                valid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required.';
                valid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = 'Enter a valid email.';
                valid = false;
            }

            if (!bookTypeInput.value.trim()) {
                bookTypeError.textContent = 'Book type is required.';
                valid = false;
            }

            if (!quantityInput.value.trim() || parseInt(quantityInput.value, 10) <= 0) {
                quantityError.textContent = 'Enter a valid quantity.';
                valid = false;
            }

            if (valid) {
                quoteForm.reset();
                if (successMessage) {
                    successMessage.textContent = 'Quote request sent!';
                    setTimeout(() => {
                        successMessage.textContent = '';
                    }, 5000);
                }
            }
        });
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    document.querySelectorAll('#gallery img').forEach(img => {
        img.addEventListener('click', () => {
            if (lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                if (lightboxCaption) {
                    const figure = img.closest('figure');
                    const caption = figure ? figure.querySelector('figcaption') : null;
                    lightboxCaption.textContent = caption ? caption.textContent : '';
                }
                lightbox.classList.add('open');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('open');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('open');
            }
        });
    }
});
