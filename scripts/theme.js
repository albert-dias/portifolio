/**
 * Theme Management System
 * Handles dark/light mode switching and persistence
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);

        // Bind events
        this.bindEvents();

        // Update theme toggle UI
        this.updateThemeToggle();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    getStoredTheme() {
        return localStorage.getItem('portfolio-theme');
    }

    setTheme(theme) {
        if (!['light', 'dark'].includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);

        // Update theme toggle
        this.updateThemeToggle();

        // Update meta theme-color
        this.updateMetaThemeColor(theme);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');

        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        // Set theme color based on current theme
        const colors = {
            dark: '#0F172A',
            light: '#FFFFFF'
        };

        metaThemeColor.content = colors[theme];
    }

    updateThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        // Update aria-pressed state
        toggle.setAttribute('aria-pressed', this.currentTheme === 'dark');

        // Update visual state
        const sunIcon = toggle.querySelector('.theme-toggle__icon--sun');
        const moonIcon = toggle.querySelector('.theme-toggle__icon--moon');

        if (sunIcon && moonIcon) {
            sunIcon.style.opacity = this.currentTheme === 'dark' ? '1' : '0';
            moonIcon.style.opacity = this.currentTheme === 'light' ? '1' : '0';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    bindEvents() {
        // Theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        mediaQuery.addEventListener('change', (e) => {
            // Only update if user hasn't manually set a preference
            if (!localStorage.getItem('portfolio-theme')) {
                this.setTheme(e.matches ? 'light' : 'dark');
            }
        });

        // Keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    // Method to get current theme (useful for other scripts)
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Method to check if theme is dark
    isDark() {
        return this.currentTheme === 'dark';
    }

    // Method to check if theme is light
    isLight() {
        return this.currentTheme === 'light';
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Export for use in other scripts
window.ThemeManager = ThemeManager;

