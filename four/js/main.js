// Main JavaScript for Captain's Harbor Pilot Services

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initContactForm();
    initServiceCards();
    initParallaxEffects();
    initScrollAnimations();
    initFloatingElements();
    initHeroScrollAnimation();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');

                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="${activeId}"]`).classList.add('active');
}

// Scroll effects and animations
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Update active nav link
                const sectionId = entry.target.getAttribute('id');
                if (sectionId) {
                    updateActiveNavLink(`#${sectionId}`);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden');
        sectionObserver.observe(section);
    });
}

// Initialize service card interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'card-ripple';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('click', function () {
            const serviceType = this.querySelector('h3').textContent;
            showServiceInfo(serviceType);

            // Add click animation
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });

        // Add 3D tilt effect
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Show service information
function showServiceInfo(serviceType) {
    const serviceData = {
        'Port Entry & Exit': {
            description: 'Professional navigation services for vessels entering and leaving Kota Kinabalu port. Our experienced pilot ensures safe passage through challenging waters with expert local knowledge.',
            features: [
                'All vessel sizes welcome',
                '24/7 availability',
                'Weather monitoring and assessment',
                'Local port regulations compliance',
                'Emergency response capability'
            ]
        },
        'Berthing & Unberthing': {
            description: 'Expert assistance for safe docking and undocking operations in challenging port conditions. Precise positioning and current assessment for optimal safety.',
            features: [
                'Precise vessel positioning',
                'Current and tide assessment',
                'Safety protocols implementation',
                'Communication with port authorities',
                'Emergency procedures if needed'
            ]
        },
        'Emergency Response': {
            description: 'Immediate response for emergency situations and unexpected navigation challenges. Available 24/7 for urgent piloting needs.',
            features: [
                '24/7 emergency availability',
                'Quick response times',
                'Problem-solving expertise',
                'Coordination with authorities',
                'Safety-first approach'
            ]
        }
    };

    const service = serviceData[serviceType] || serviceData['Port Entry & Exit'];

    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${serviceType}</h2>
                <p>${service.description}</p>
                <h3>Service Features:</h3>
                <ul>
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <button class="cta-button" onclick="contactUs('${serviceType}')">Book This Service</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const modalStyles = `
        <style>
            .service-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                animation: modalFadeIn 0.3s ease;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .modal-content {
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                width: 100%;
                position: relative;
                animation: modalSlideIn 0.3s ease;
            }
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            }
            .modal-content h2 {
                color: #0D2A54;
                margin-bottom: 20px;
                font-size: 2rem;
            }
            .modal-content h3 {
                color: #0D2A54;
                margin: 25px 0 15px 0;
                font-size: 1.3rem;
            }
            .modal-content p {
                color: #2C3E50;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .modal-content ul {
                margin-bottom: 30px;
                padding-left: 20px;
            }
            .modal-content li {
                color: #2C3E50;
                margin-bottom: 8px;
                line-height: 1.5;
            }
            .cta-button {
                background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
            }
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalSlideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', modalStyles);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', () => removeModal(modal));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) removeModal(modal);
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') removeModal(modal);
    });
}

// Remove modal
function removeModal(modal) {
    modal.style.animation = 'modalFadeOut 0.3s ease';
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmission(this);
        });

        // Add floating label functionality
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function () {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// Handle form submission
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Pilot request sent successfully! We\'ll contact you soon to confirm details.', 'success');

        // Reset form
        form.reset();

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Remove focused classes
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    const notificationStyles = `
        <style>
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                animation: notificationSlideIn 0.3s ease;
            }
            .notification-content {
                background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
            }
            @keyframes notificationSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', notificationStyles);

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

// Remove notification
function removeNotification(notification) {
    notification.style.animation = 'notificationSlideOut 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 300);
}

// Contact us function
function contactUs(serviceType = '') {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Pre-fill form if service type is provided
        if (serviceType) {
            const messageField = document.querySelector('#message');
            if (messageField) {
                messageField.value = `I'm interested in your ${serviceType} service. Please provide more information and pricing.`;
            }
        }
    }
}

// Add CSS for additional functionality
const additionalStyles = `
    <style>
        .nav-open {
            overflow: hidden;
        }
        
        .form-group.focused label {
            top: -10px;
            font-size: 0.9rem;
            color: #D4AF37;
        }
        
        .cta-button {
            background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Parallax effects for background elements
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const imageMedia = hero.querySelector('.hero-image-media');
    if (!imageMedia) return;

    hero.addEventListener('mousemove', function (e) {
        const {
            clientX,
            clientY,
            currentTarget
        } = e;
        const {
            clientWidth,
            clientHeight
        } = currentTarget;

        const xPos = (clientX / clientWidth - 0.5) * 2;
        const yPos = (clientY / clientHeight - 0.5) * 2;

        const xOffset = xPos * 5;
        const yOffset = yPos * 5;

        imageMedia.style.transform = `scale(1.1) translate(${xOffset}px, ${yOffset}px)`;
    });

    hero.addEventListener('mouseleave', function () {
        imageMedia.style.transform = 'scale(1.1) translate(0, 0)';
    });
}

// Enhanced scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-data, .hero-visual');

    floatingElements.forEach(element => {
        element.addEventListener('mousemove', function (e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;

            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        element.addEventListener('mouseleave', function () {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

function initHeroScrollAnimation() {
    const heroContent = document.querySelector('.hero-content');
    const title = document.querySelector('.hero-title-main');
    const stats = document.querySelector('.hero-stats-container');
    const statItems = document.querySelectorAll('.stat-item');

    if (!heroContent) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero').clientHeight / 2;
        const progress = Math.min(scrollY / heroHeight, 1);

        // Fade out title
        if (title) {
            title.style.opacity = 1 - progress * 2;
            title.style.transform = `translateY(${progress * -50}px)`;
        }

        // Fade in stats container
        if (stats) {
            if (progress > 0.3) {
                stats.style.opacity = (progress - 0.3) * 2;
                statItems.forEach(item => {
                    item.style.opacity = (progress - 0.3) * 2;
                    item.style.transform = `translateY(${(1 - (progress - 0.3)) * 30}px)`;
                });
            } else {
                stats.style.opacity = 0;
            }
        }
    });
}