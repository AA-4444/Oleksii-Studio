// Award-winning portfolio JavaScript - Smooth animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Progress bar animations
    initProgressBars();
    
    // Contact form
    initContactForm();
    
    // Particle animations
    initParticleAnimations();
});

// Navigation functionality
function initNavigation() {
    const nav = document.getElementById('navigation');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Handle scroll effect on navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Handle all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation delay to child elements
                const children = entry.target.querySelectorAll('.animate-on-scroll');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });
                
                // If the element itself should animate
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('animated');
                }
                
                // Handle progress bars specifically
                if (entry.target.classList.contains('skill-card')) {
                    animateProgressBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections and cards
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.project-card, .skill-card, .stat-item');
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));
    
    // Add animation classes to elements
    addAnimationClasses();
}

function addAnimationClasses() {
    // Add animation classes to various elements
    const fadeElements = document.querySelectorAll('.section-header, .project-card, .contact-item');
    const slideLeftElements = document.querySelectorAll('.about-content');
    const slideRightElements = document.querySelectorAll('.about-visual');
    
    fadeElements.forEach(el => el.classList.add('animate-on-scroll'));
    slideLeftElements.forEach(el => el.classList.add('animate-on-scroll', 'slide-left'));
    slideRightElements.forEach(el => el.classList.add('animate-on-scroll', 'slide-right'));
}

// Progress bar animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--target-width', width + '%');
    });
}

function animateProgressBar(skillCard) {
    const progressFill = skillCard.querySelector('.progress-fill');
    if (progressFill) {
        const targetWidth = progressFill.getAttribute('data-width');
        setTimeout(() => {
            progressFill.style.width = targetWidth + '%';
        }, 500);
    }
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.firstName || !data.lastName || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `
                <svg class="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Sending...
            `;
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-premium);
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
            background: hsl(142, 76%, 36%);
            color: white;
        }
        
        .notification-error {
            background: hsl(0, 84%, 60%);
            color: white;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: currentColor;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Handle close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Particle animations
function initParticleAnimations() {
    // Create floating particles in hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        createFloatingParticles(heroSection);
    }
    
    // Animate existing particles
    animateParticles();
}

function createFloatingParticles(container) {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent);
            border-radius: 50%;
            opacity: 0.4;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatRandom ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        container.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatRandom {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.4;
            }
            25% {
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(0.8);
                opacity: 0.7;
            }
            50% {
                transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.2);
                opacity: 0.3;
            }
            75% {
                transform: translate(${Math.random() * 15 - 7.5}px, ${Math.random() * 15 - 7.5}px) scale(0.9);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
}

function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Add random float animation
        particle.style.animation = `float ${3 + index}s ease-in-out infinite ${index * 0.5}s`;
        
        // Add interactive hover effect
        particle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(2)';
            this.style.opacity = '0.8';
        });
        
        particle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.3';
        });
    });
}

// Utility function for throttling scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add parallax effect to hero background
function initParallaxEffect() {
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBg.style.transform = `translateY(${rate}px)`;
        }, 10));
    }
}

// Initialize parallax effect
initParallaxEffect();

// Add mouse cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transition: opacity 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            const nextDot = trail[index + 1] || trail[0];
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    // Only show trail on non-touch devices
    if (!('ontouchstart' in window)) {
        animateTrail();
    }
}

// Initialize cursor trail effect
initCursorTrail();

// Handle active navigation state
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-item');
    
    window.addEventListener('scroll', throttle(function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Initialize active navigation
updateActiveNavigation();

// Add loading animation
function showLoadingAnimation() {
    const body = document.body;
    
    // Create loading overlay
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">Portfolio</div>
            <div class="loader-progress">
                <div class="loader-bar"></div>
            </div>
        </div>
    `;
    
    const loaderStyles = `
        #loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-logo {
            font-size: 2rem;
            font-weight: 700;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 2rem;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        .loader-progress {
            width: 200px;
            height: 2px;
            background: var(--secondary);
            border-radius: 1px;
            overflow: hidden;
        }
        
        .loader-bar {
            height: 100%;
            background: var(--gradient-primary);
            width: 0;
            animation: loadProgress 2s ease-out forwards;
        }
        
        @keyframes loadProgress {
            to {
                width: 100%;
            }
        }
        
        #loader.hidden {
            opacity: 0;
            visibility: hidden;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    
    body.appendChild(loader);
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1000);
    });
}

// Show loading animation
showLoadingAnimation();