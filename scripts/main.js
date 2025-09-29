/**
 * Main Application Script
 * Handles navigation, form submissions, and overall app functionality
 */

class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Setup navigation
        this.setupNavigation();

        // Setup mobile menu
        this.setupMobileMenu();

        // Setup smooth scrolling
        this.setupSmoothScrolling();

        // Setup contact form
        this.setupContactForm();

        // Setup scroll spy
        this.setupScrollSpy();

        // Setup keyboard navigation
        this.setupKeyboardNavigation();

        // Setup performance optimizations
        this.setupPerformanceOptimizations();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    this.scrollToSection(targetElement);
                    this.updateActiveNavLink(link);
                }
            });
        });
    }

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('nav__menu--active');
                navToggle.classList.toggle('nav__toggle--active');

                // Update aria-expanded
                const isExpanded = navMenu.classList.contains('nav__menu--active');
                navToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav__link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('nav__menu--active');
                    navToggle.classList.remove('nav__toggle--active');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('nav__menu--active');
                    navToggle.classList.remove('nav__toggle--active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    this.scrollToSection(targetElement);
                }
            }
        });
    }

    scrollToSection(element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        activeLink.classList.add('active');
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -60% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.currentSection = sectionId;

                    // Update active nav link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const submitButton = form.querySelector('.form__submit');
                const originalText = submitButton.textContent;

                // Show loading state
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                try {
                    // Get form data
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);

                    // Simulate form submission (replace with actual endpoint)
                    await this.submitContactForm(data);

                    // Show success message
                    this.showFormMessage('success', 'Message sent successfully!');
                    form.reset();

                } catch (error) {
                    console.error('Form submission error:', error);
                    this.showFormMessage('error', 'Failed to send message. Please try again.');
                } finally {
                    // Reset button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
        }
    }

    async submitContactForm(data) {
        // This is a placeholder - replace with actual form submission
        // You can use Formspree, Netlify Forms, or your own backend

        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 1000);
        });

        // Example with Formspree:
        /*
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error('Form submission failed');
        }
        
        return response.json();
        */
    }

    showFormMessage(type, message) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message--${type}`;
        messageElement.textContent = message;

        // Style the message
        messageElement.style.cssText = `
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      text-align: center;
      background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
      color: white;
    `;

        // Insert after form
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(messageElement, form.nextSibling);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }

    setupKeyboardNavigation() {
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in a form
            if (e.target.matches('input, textarea')) return;

            switch (e.key) {
                case 'Home':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('home'));
                    break;
                case 'End':
                    e.preventDefault();
                    this.scrollToSection(document.getElementById('contact'));
                    break;
                case 'Escape':
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    const navToggle = document.getElementById('nav-toggle');
                    if (navMenu && navMenu.classList.contains('nav__menu--active')) {
                        navMenu.classList.remove('nav__menu--active');
                        navToggle.classList.remove('nav__toggle--active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                    break;
            }
        });
    }

    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();

        // Preload critical resources
        this.preloadCriticalResources();

        // Setup service worker (if available)
        this.setupServiceWorker();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Utility method to get current section
    getCurrentSection() {
        return this.currentSection;
    }

    // Method to scroll to specific section
    scrollToSectionById(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            this.scrollToSection(element);
        }
    }
}

// Initialize the app
window.portfolioApp = new PortfolioApp();

// Export for use in other scripts
window.PortfolioApp = PortfolioApp;

