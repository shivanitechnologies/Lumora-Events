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

  window.setRTL = function (dir) {
    const newDir = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem(RTL_KEY, newDir);
    updateRTLButtons();
    window.dispatchEvent(new CustomEvent('rtlChanged', { detail: { dir: newDir } }));
  };

  window.toggleRTL = function () {
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

    // 1. Update Segmented Direction Controls (.rtl-segmented-toggle)
    document.querySelectorAll('.rtl-segmented-toggle').forEach(container => {
      const btnLtr = container.querySelector('.rtl-btn-ltr');
      const btnRtl = container.querySelector('.rtl-btn-rtl');
      
      const activeClasses = ['bg-[#56334F]', 'text-white', 'dark:bg-[#D6B887]', 'dark:text-[#17151A]', 'shadow-sm', 'font-bold'];
      const inactiveClasses = ['text-gray-500', 'dark:text-gray-400', 'hover:text-gray-800', 'dark:hover:text-gray-200', 'font-medium'];

      if (btnLtr && btnRtl) {
        if (isRTL) {
          // RTL is active
          btnRtl.classList.add(...activeClasses);
          btnRtl.classList.remove(...inactiveClasses);
          btnLtr.classList.remove(...activeClasses);
          btnLtr.classList.add(...inactiveClasses);
        } else {
          // LTR is active
          btnLtr.classList.add(...activeClasses);
          btnLtr.classList.remove(...inactiveClasses);
          btnRtl.classList.remove(...activeClasses);
          btnRtl.classList.add(...inactiveClasses);
        }
      }
    });

    // 2. Update Legacy Single-Button Labels (.rtl-toggle-btn with .rtl-label)
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      const label = btn.querySelector('.rtl-label');
      if (label) {
        label.textContent = isRTL ? 'RTL' : 'LTR';
      }
      if (isRTL) {
        btn.classList.add('bg-[#56334F]', 'text-white', 'dark:bg-[#D6B887]', 'dark:text-[#17151A]');
        btn.classList.remove('bg-gray-100', 'text-gray-700');
      } else {
        btn.classList.remove('bg-[#56334F]', 'text-white', 'dark:bg-[#D6B887]', 'dark:text-[#17151A]');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      }
    });
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
