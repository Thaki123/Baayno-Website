const getStartedBtn = document.getElementById('get-started');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
        const target = document.getElementById('services') || document.getElementById('contact');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('open');
    }
}

const navToggle = document.getElementById('nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
}

const navItems = document.querySelectorAll('.nav-links a');
if (navItems.length) {
    navItems.forEach(link => link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('open');
        }
    }));
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    const servicesData = [
        {
            title: 'Web Development',
            description: 'Modern and responsive websites.',
            image: 'https://via.placeholder.com/300x150?text=Web+Dev'
        },
        {
            title: 'UI/UX Design',
            description: 'Intuitive and engaging designs.',
            image: 'https://via.placeholder.com/300x150?text=UI+UX'
        },
        {
            title: 'Consulting',
            description: 'Expert guidance for your projects.'
        }
    ];
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesData.forEach(service => {
            const article = document.createElement('article');
            article.className = 'card';
            let content = '';
            if (service.image) {
                content += `<img src="${service.image}" alt="${service.title}">`;
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
