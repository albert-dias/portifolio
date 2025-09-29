/**
 * Internationalization (i18n) System
 * Handles language switching and text translation
 */

class I18n {
    constructor() {
        this.currentLang = this.getStoredLanguage() || this.getBrowserLanguage() || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        try {
            // Load translations
            await this.loadTranslations();

            // Set initial language
            this.setLanguage(this.currentLang);

            // Bind events
            this.bindEvents();

            // Update language toggle UI
            this.updateLanguageToggle();
        } catch (error) {
            console.error('Failed to initialize i18n:', error);
        }
    }

    async loadTranslations() {
        try {
            const [enTranslations, ptTranslations] = await Promise.all([
                fetch('/i18n/en.json').then(res => res.json()),
                fetch('/i18n/pt.json').then(res => res.json())
            ]);

            this.translations = {
                en: enTranslations,
                pt: ptTranslations
            };
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Fallback to empty translations
            this.translations = { en: {}, pt: {} };
        }
    }

    getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        return lang.startsWith('pt') ? 'pt' : 'en';
    }

    getStoredLanguage() {
        return localStorage.getItem('portfolio-language');
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not available`);
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('portfolio-language', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';

        // Update meta hreflang
        this.updateHreflang(lang);

        // Translate all elements
        this.translateElements();

        // Update language toggle
        this.updateLanguageToggle();

        // Load projects for current language
        this.loadProjects(lang);
    }

    updateHreflang(lang) {
        const currentUrl = window.location.origin + window.location.pathname;
        const alternateUrl = lang === 'pt'
            ? `${currentUrl}?lang=pt`
            : currentUrl.replace('?lang=pt', '');

        // Update or create hreflang links
        let hreflangEn = document.querySelector('link[hreflang="en"]');
        let hreflangPt = document.querySelector('link[hreflang="pt"]');
        let hreflangDefault = document.querySelector('link[hreflang="x-default"]');

        if (!hreflangEn) {
            hreflangEn = document.createElement('link');
            hreflangEn.rel = 'alternate';
            hreflangEn.hreflang = 'en';
            document.head.appendChild(hreflangEn);
        }

        if (!hreflangPt) {
            hreflangPt = document.createElement('link');
            hreflangPt.rel = 'alternate';
            hreflangPt.hreflang = 'pt';
            document.head.appendChild(hreflangPt);
        }

        if (!hreflangDefault) {
            hreflangDefault = document.createElement('link');
            hreflangDefault.rel = 'alternate';
            hreflangDefault.hreflang = 'x-default';
            document.head.appendChild(hreflangDefault);
        }

        hreflangEn.href = currentUrl.replace('?lang=pt', '');
        hreflangPt.href = currentUrl.includes('?lang=pt') ? currentUrl : `${currentUrl}?lang=pt`;
        hreflangDefault.href = currentUrl.replace('?lang=pt', '');
    }

    translateElements() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);

            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];

        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }

        return translation;
    }

    updateLanguageToggle() {
        const toggle = document.getElementById('language-toggle');
        if (!toggle) return;

        const flags = toggle.querySelectorAll('.language-toggle__flag');
        flags.forEach(flag => {
            const lang = flag.getAttribute('data-lang');
            flag.classList.toggle('active', lang === this.currentLang);
        });
    }

    async loadProjects(lang) {
        try {
            console.log(`Loading projects for language: ${lang}`);
            const projects = await fetch(`/content/projects.${lang}.json`).then(res => {
                console.log(`Projects response status: ${res.status}`);
                return res.json();
            });
            console.log('Projects loaded:', projects);
            this.renderProjects(projects);
        } catch (error) {
            console.error('Failed to load projects:', error);
        }
    }

    renderProjects(projects) {
        const grid = document.getElementById('projects-grid');
        if (!grid) {
            console.error('Projects grid element not found');
            return;
        }

        console.log('Rendering projects:', projects);
        grid.innerHTML = '';

        projects.forEach(project => {
            console.log('Creating card for project:', project.title, 'Image:', project.images[0]);
            const projectCard = this.createProjectCard(project);
            grid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('article');
        card.className = 'project-card';

        card.innerHTML = `
      <div class="project-card__image-container">
        <img 
          src="${project.images[0]}" 
          alt="${project.title}" 
          class="project-card__image"
          loading="lazy"
        >
      </div>
      <div class="project-card__content">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__description">${project.description}</p>
        <div class="project-card__technologies">
          ${project.technologies.map(tech =>
            `<span class="project-card__tech">${tech}</span>`
        ).join('')}
        </div>
        <div class="project-card__actions">
          <a href="${project.liveUrl}" class="project-card__link" target="_blank" rel="noopener">
            ${this.getTranslation('projects.viewLive')}
          </a>
          <a href="${project.repoUrl}" class="project-card__link project-card__link--secondary" target="_blank" rel="noopener">
            ${this.getTranslation('projects.viewRepo')}
          </a>
        </div>
      </div>
    `;

        return card;
    }

    bindEvents() {
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                const newLang = this.currentLang === 'en' ? 'pt' : 'en';
                this.setLanguage(newLang);
            });
        }
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});

// Handle URL language parameter
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    if (langParam && ['en', 'pt'].includes(langParam) && window.i18n) {
        window.i18n.setLanguage(langParam);
    }
});

