/**
 * LUMORA EVENTS - Theme & RTL Switcher
 */

(function () {
  const THEME_KEY = 'lumora_theme';
  const RTL_KEY = 'lumora_rtl';

  // Apply initial theme immediately to avoid FOUC
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply RTL (defaults to LTR)
    const savedRTL = localStorage.getItem(RTL_KEY);
    if (savedRTL === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }

  initTheme();

  window.toggleTheme = function () {
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, newTheme);
    updateThemeIcons();
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
  };

  let rtlDebounce = false;
  window.setRTL = function (dir) {
    const newDir = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem(RTL_KEY, newDir);
    updateRTLButtons();
    window.dispatchEvent(new CustomEvent('rtlChanged', { detail: { dir: newDir } }));
  };

  window.toggleRTL = function () {
    if (rtlDebounce) return;
    rtlDebounce = true;
    setTimeout(() => { rtlDebounce = false; }, 120);

    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    window.setRTL(newDir);
  };

  function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    });
  }

  function updateRTLButtons() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

    // 1. Update Circular RTL Buttons (.rtl-toggle-btn)
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.setAttribute('title', isRTL ? 'Switch to LTR Direction' : 'Switch to RTL Direction');
      btn.setAttribute('aria-label', isRTL ? 'Switch to LTR Direction' : 'Switch to RTL Direction');
      if (isRTL) {
        btn.classList.add('bg-[#D6B887]/20');
      } else {
        btn.classList.remove('bg-[#D6B887]/20');
      }
      const label = btn.querySelector('.rtl-label');
      if (label) {
        label.textContent = isRTL ? 'RTL' : 'LTR';
      }
    });

    // 2. Refresh Lucide Icons if available
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  window.updateThemeIcons = updateThemeIcons;
  window.updateRTLButtons = updateRTLButtons;

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeIcons();
    updateRTLButtons();

    // Attach listeners
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleTheme();
      });
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleRTL();
      });
    });
  });
})();
