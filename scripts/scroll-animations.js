/**
 * Scroll Animations
 * Adiciona animações quando elementos entram na viewport
 */

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        // Criar Intersection Observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        // Observar elementos quando DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.observeElements());
        } else {
            this.observeElements();
        }
    }

    observeElements() {
        // Elementos para animar
        const elementsToAnimate = [
            '.section__title',
            '.about__content',
            '.timeline__item',
            '.project-card',
            '.skills__category',
            '.contact__info',
            '.tech-badges',
            '.hero__actions'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // Adicionar classe de animação inicial
                el.classList.add('animate-on-scroll');
                this.observer.observe(el);
            });
        });

        // Animar elementos de skills individualmente
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.classList.add('animate-on-scroll');
            item.style.setProperty('--animation-delay', `${index * 0.1}s`);
            this.observer.observe(item);
        });

        // Animar tech icons individualmente
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach((icon, index) => {
            icon.classList.add('animate-on-scroll');
            icon.style.setProperty('--animation-delay', `${index * 0.2}s`);
            this.observer.observe(icon);
        });
    }

    animateElement(element) {
        // Remover classe de animação inicial
        element.classList.remove('animate-on-scroll');

        // Adicionar classe de animação baseada no tipo de elemento
        if (element.classList.contains('section__title')) {
            element.classList.add('animate-fade-in-up');
        } else if (element.classList.contains('timeline__item')) {
            element.classList.add('animate-fade-in-left');
        } else if (element.classList.contains('project-card')) {
            element.classList.add('animate-fade-in-up');
        } else if (element.classList.contains('skill-item') || element.classList.contains('tech-icon')) {
            element.classList.add('animate-fade-in-up');
        } else if (element.classList.contains('skills__category')) {
            element.classList.add('animate-fade-in-up');
        } else if (element.classList.contains('contact__info')) {
            element.classList.add('animate-fade-in-up');
        } else if (element.classList.contains('about__content')) {
            element.classList.add('animate-fade-in-up');
        } else {
            element.classList.add('animate-fade-in-up');
        }

        // Parar de observar o elemento após animação
        this.observer.unobserve(element);
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ScrollAnimations());
} else {
    new ScrollAnimations();
}

// Adicionar estilos CSS para animações on-scroll
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .animate-on-scroll.animate-fade-in-up {
        opacity: 1;
        transform: translateY(0);
        animation-delay: var(--animation-delay, 0s);
    }

    .animate-on-scroll.animate-fade-in-left {
        opacity: 1;
        transform: translateX(0);
        animation-delay: var(--animation-delay, 0s);
    }

    .animate-on-scroll.animate-fade-in-right {
        opacity: 1;
        transform: translateX(0);
        animation-delay: var(--animation-delay, 0s);
    }
`;
document.head.appendChild(style);
