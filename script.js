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
    const servicesData = [
        { title: 'Web Development', description: 'Modern and responsive websites.' },
        { title: 'UI/UX Design', description: 'Intuitive and engaging designs.' },
        { title: 'Consulting', description: 'Expert guidance for your projects.' }
    ];
    const servicesSection = document.querySelector('.services');
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
});
