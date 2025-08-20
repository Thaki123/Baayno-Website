function showMessage() {
    alert("Hello from Baayno Website!");
}

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
        { title: 'Web Development', description: 'Modern and responsive websites.' },
        { title: 'UI/UX Design', description: 'Intuitive and engaging designs.' },
        { title: 'Consulting', description: 'Expert guidance for your projects.' }
    ];
    const servicesSection = document.querySelector('.services .container');
    if (servicesSection) {
        servicesData.forEach(service => {
            const article = document.createElement('article');
            article.className = 'card';
            article.innerHTML = `<h3>${service.title}</h3><p>${service.description}</p>`;
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
});
