/**
 * Animation System
 * Handles scroll animations, micro-interactions, and performance optimizations
 */

class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
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
        // Setup intersection observer for scroll animations
        this.setupScrollAnimations();

        // Setup micro-interactions
        this.setupMicroInteractions();

        // Setup parallax effects
        this.setupParallaxEffects();

        // Setup loading animations
        this.setupLoadingAnimations();
    }

    setupScrollAnimations() {
        // Create intersection observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        this.observeAnimatedElements();
    }

    observeAnimatedElements() {
        const animatedSelectors = [
            '.hero__content',
            '.about__content',
            '.timeline__item',
            '.project-card',
            '.skills__category',
            '.contact__content'
        ];

        animatedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.scrollObserver.observe(element);
                this.animatedElements.add(element);
            });
        });
    }

    animateElement(element) {
        // Add animation class based on element type
        if (element.classList.contains('hero__content')) {
            element.classList.add('animate-fade-in-up');
        } else if (element.classList.contains('about__content')) {
            element.classList.add('animate-fade-in');
        } else if (element.classList.contains('timeline__item')) {
            element.classList.add('animate-slide-in-left');
        } else if (element.classList.contains('project-card')) {
            element.classList.add('animate-fade-in-up');
        } else if (element.classList.contains('skills__category')) {
            element.classList.add('animate-fade-in');
        } else if (element.classList.contains('contact__content')) {
            element.classList.add('animate-fade-in');
        }

        // Stop observing this element
        this.scrollObserver.unobserve(element);
    }

    setupMicroInteractions() {
        // Button hover effects
        this.setupButtonEffects();

        // Card hover effects
        this.setupCardEffects();

        // Link hover effects
        this.setupLinkEffects();

        // Form focus effects
        this.setupFormEffects();
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn, .social-link, .theme-toggle, .language-toggle');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.transition = 'transform 0.2s ease';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    setupCardEffects() {
        const cards = document.querySelectorAll('.project-card, .timeline__content, .skills__category');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = 'var(--shadow-lg)';
                card.style.transition = 'all 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--shadow-sm)';
            });
        });
    }

    setupLinkEffects() {
        const links = document.querySelectorAll('a:not(.btn)');

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.color = 'var(--color-primary)';
                link.style.transition = 'color 0.2s ease';
            });

            link.addEventListener('mouseleave', () => {
                link.style.color = '';
            });
        });
    }

    setupFormEffects() {
        const inputs = document.querySelectorAll('.form__input, .form__textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--color-primary)';
                input.style.boxShadow = '0 0 0 3px rgba(197, 168, 128, 0.1)';
                input.style.transition = 'all 0.2s ease';
            });

            input.addEventListener('blur', () => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            });
        });
    }

    setupParallaxEffects() {
        // Only enable parallax on desktop to avoid performance issues
        if (window.innerWidth < 1024) return;

        const parallaxElements = document.querySelectorAll('.hero__image');

        if (parallaxElements.length === 0) return;

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    setupLoadingAnimations() {
        // Hero section loading animation
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            // Stagger animation for hero elements
            const heroElements = heroContent.querySelectorAll('.hero__avatar, .hero__title, .hero__description, .hero__actions, .hero__social');

            heroElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }

        // Page load animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }

    // Method to animate element on demand
    animateElementOnDemand(element, animationClass) {
        element.classList.add(animationClass);

        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, 600);
    }

    // Method to setup custom scroll animations
    setupCustomScrollAnimation(selector, animationClass, threshold = 0.1) {
        const elements = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Method to cleanup animations
    cleanup() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }

        this.observers.forEach(observer => {
            observer.disconnect();
        });

        this.observers.clear();
        this.animatedElements.clear();
    }
}

// Initialize animation manager
window.animationManager = new AnimationManager();

// Export for use in other scripts
window.AnimationManager = AnimationManager;

