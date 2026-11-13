/**
 * LUMORA EVENTS - Main Core Utilities & Interactions
 */

// Toast Notification System
window.showToast = function (message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium border backdrop-blur-md transition-all duration-300';

  let iconName = 'check-circle';
  let colorClasses = 'bg-white/95 dark:bg-[#221E26]/95 text-[#17151A] dark:text-[#FAF8F5] border-[#D6B887]/50';

  if (type === 'success') {
    colorClasses += ' border-l-4 border-l-[#56334F] dark:border-l-[#D6B887]';
    iconName = 'check-circle-2';
  } else if (type === 'error') {
    colorClasses += ' border-l-4 border-l-rose-500 text-rose-800 dark:text-rose-200';
    iconName = 'alert-triangle';
  } else if (type === 'info') {
    colorClasses += ' border-l-4 border-l-[#56334F] dark:border-l-[#D6B887]';
    iconName = 'info';
  }

  toast.className += ' ' + colorClasses;
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 flex-shrink-0 text-[#56334F] dark:text-[#D6B887]"></i>
    <span class="flex-1">${message}</span>
    <button class="opacity-60 hover:opacity-100 transition-opacity ml-2" onclick="this.parentElement.remove()">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  if (window.lucide) {
    lucide.createIcons({ root: toast });
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
};

// Global Logout Function (Available across all public, client, and admin pages)
window.logoutUser = function () {
  try {
    localStorage.removeItem('lumora_current_user');
  } catch (e) {}
  if (window.showToast) {
    window.showToast('You have been signed out successfully.', 'info');
  }
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 350);
};

// DOM Content Loaded Initializer
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Universal Dashboard Mobile Sidebar Controller (Client & Admin)
  function initDashboardSidebar(btnId, sidebarId, backdropId) {
    const btn = document.getElementById(btnId);
    const sidebar = document.getElementById(sidebarId);
    const backdrop = document.getElementById(backdropId);

    if (!sidebar) return;

    function openSidebar() {
      sidebar.classList.remove('-translate-x-full');
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      if (window.updateThemeIcons) window.updateThemeIcons();
      if (window.updateRTLButtons) window.updateRTLButtons();
      if (window.lucide) lucide.createIcons();
    }

    function closeSidebar() {
      sidebar.classList.add('-translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }

    // Attach open and close methods directly to the element
    sidebar.openSidebar = openSidebar;
    sidebar.closeSidebar = closeSidebar;

    // Hamburger Toggle Button
    if (btn) {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sidebar.classList.contains('-translate-x-full')) {
          openSidebar();
        } else {
          closeSidebar();
        }
      };
    }

    // Mobile Close 'X' Button inside sidebar header
    sidebar.querySelectorAll('.mobile-sidebar-close').forEach(closeBtn => {
      closeBtn.onclick = (e) => {
        e.preventDefault();
        closeSidebar();
      };
    });

    // Close when navigating via any menu link on mobile
    sidebar.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          closeSidebar();
        }
      });
    });

    // Close when tapping backdrop
    if (backdrop) {
      backdrop.onclick = (e) => {
        e.preventDefault();
        closeSidebar();
      };
    }

    // Keyboard support: Escape closes mobile drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
        closeSidebar();
      }
    });

    // Clean up body overflow when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        document.body.classList.remove('overflow-hidden');
        if (backdrop) backdrop.classList.add('hidden');
      }
    });

    return { open: openSidebar, close: closeSidebar };
  }

  const clientSidebarCtrl = initDashboardSidebar('sidebarToggleBtn', 'clientSidebar', 'sidebarBackdrop');
  const adminSidebarCtrl = initDashboardSidebar('adminSidebarToggleBtn', 'adminSidebar', 'adminSidebarBackdrop');

  if (clientSidebarCtrl) {
    window.openClientSidebar = clientSidebarCtrl.open;
    window.closeClientSidebar = clientSidebarCtrl.close;
  }
  if (adminSidebarCtrl) {
    window.openAdminSidebar = adminSidebarCtrl.open;
    window.closeAdminSidebar = adminSidebarCtrl.close;
  }

  // Header Scroll Effect (Theme-Aware & Context-Aware)
  const header = document.querySelector('header');
  if (header) {
    const isPublicDarkHeader = header.classList.contains('bg-[#17151A]') && header.classList.contains('text-white');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-md', 'backdrop-blur-md');
        if (isPublicDarkHeader) {
          header.classList.add('bg-[#17151A]/95');
        } else {
          header.classList.add('bg-white/95', 'dark:bg-[#221E26]/95');
          header.classList.remove('bg-[#17151A]/95', 'bg-[#17151A]');
        }
      } else {
        header.classList.remove('shadow-md', 'shadow-xl', 'bg-[#17151A]/95', 'bg-white/95');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.toggle('hidden');
      if (window.updateThemeIcons) window.updateThemeIcons();
      if (window.updateAuthUI) window.updateAuthUI();
      if (window.lucide) {
        lucide.createIcons();
      }
    });
  }

  if (mobileMenuClose && mobileMenuDrawer) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('hidden');
    });
  }

  if (mobileMenuDrawer) {
    mobileMenuDrawer.addEventListener('click', (e) => {
      if (e.target === mobileMenuDrawer) {
        mobileMenuDrawer.classList.add('hidden');
      }
    });
  }

  // Update mobile and desktop auth state
  function updateAuthUI() {
    const userStr = localStorage.getItem('lumora_current_user');
    let user = null;
    try {
      if (userStr) user = JSON.parse(userStr);
    } catch (e) {}

    const isLoggedIn = user && user.email;

    document.querySelectorAll('.mobile-auth-btn').forEach(btn => {
      const textSpan = btn.querySelector('.mobile-auth-text');
      const icon = btn.querySelector('.mobile-auth-icon');
      
      if (isLoggedIn) {
        if (textSpan) textSpan.textContent = 'Logout';
        if (icon) {
          icon.setAttribute('data-lucide', 'log-out');
        }
        btn.setAttribute('href', '#logout');
        btn.onclick = (e) => {
          e.preventDefault();
          localStorage.removeItem('lumora_current_user');
          if (window.showToast) window.showToast('You have been logged out.', 'info');
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 500);
        };
      } else {
        if (textSpan) textSpan.textContent = 'Sign In';
        if (icon) {
          icon.setAttribute('data-lucide', 'log-in');
        }
        btn.setAttribute('href', 'login.html');
        btn.onclick = null;
      }
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  window.updateAuthUI = updateAuthUI;
  updateAuthUI();

  // Mobile Menu Dropdown Accordions (Home & Dashboard)
  document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = btn.nextElementSibling;
      const chevron = btn.querySelector('.dropdown-chevron');
      if (content) {
        content.classList.toggle('hidden');
        if (chevron) {
          chevron.classList.toggle('rotate-180');
        }
      }
    });
  });

  // FAQ Accordion functionality
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      
      const isOpen = !content.classList.contains('hidden');
      
      // Close other FAQs in the same group if needed
      btn.closest('.faq-container')?.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      btn.closest('.faq-container')?.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Modal Backdrop Closer
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
      }
    });
  });

  // Active Navigation Link Highlighting (Matches Current Page)
  function initActiveNavLinks() {
    let currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    if (!currentPath || currentPath === '' || currentPath === '/') {
      currentPath = 'index.html';
    }

    // Map details/subpages to parent navigation category
    let activeKey = currentPath;
    if (currentPath === 'service-details.html') activeKey = 'services.html';
    if (currentPath === 'blog-details.html') activeKey = 'blog.html';

    const desktopNav = document.querySelector('header nav');
    if (!desktopNav) return;

    // Reset all top-level nav links in header
    desktopNav.querySelectorAll(':scope > a').forEach(a => {
      const glow = a.querySelector('.nav-indicator-glow');
      if (glow) glow.remove();
      a.classList.remove('text-[#D6B887]', 'font-bold');
      a.classList.add('text-white', 'hover:text-[#D6B887]');
    });

    const homeTrigger = desktopNav.querySelector('.group > a');
    if (homeTrigger) {
      const homeGlow = homeTrigger.querySelector('.nav-indicator-glow');
      if (homeGlow) homeGlow.remove();
      homeTrigger.classList.remove('text-[#D6B887]', 'font-bold');
      homeTrigger.classList.add('text-white', 'hover:text-[#D6B887]');
    }

    // Check if on Home 1 or Home 2
    const isHome = (activeKey === 'index.html' || activeKey === 'home-premium.html');
    
    if (isHome && homeTrigger) {
      homeTrigger.classList.remove('text-white');
      homeTrigger.classList.add('text-[#D6B887]', 'font-bold', 'relative');
      if (!homeTrigger.querySelector('.nav-indicator-glow')) {
        const span = document.createElement('span');
        span.className = 'nav-indicator-glow absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#D6B887] rounded-full shadow-[0_2px_10px_rgba(214,184,135,0.9)]';
        homeTrigger.appendChild(span);
      }
    } else {
      // Find matching top-level nav link
      desktopNav.querySelectorAll(':scope > a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && href.toLowerCase() === activeKey) {
          a.classList.remove('text-white');
          a.classList.add('text-[#D6B887]', 'font-bold', 'relative');
          if (!a.querySelector('.nav-indicator-glow')) {
            const span = document.createElement('span');
            span.className = 'nav-indicator-glow absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#D6B887] rounded-full shadow-[0_2px_10px_rgba(214,184,135,0.9)]';
            a.appendChild(span);
          }
        }
      });
    }
  }

  initActiveNavLinks();

  // ==========================================
  // UNIVERSAL LUXURY CUSTOM SELECT ENHANCER
  // Replaces native browser select with Haute Lumora Custom Dropdowns
  // ==========================================
  function initLuxurySelects() {
    if (!document.getElementById('lumora-select-injected-styles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'lumora-select-injected-styles';
      styleTag.textContent = `
        .lumora-custom-select {
          position: relative;
          width: 100%;
        }
        .lumora-select-menu {
          position: absolute;
          top: calc(100% + 0.35rem);
          left: 0;
          right: 0;
          z-index: 100;
          border-radius: 1.15rem;
          padding: 0.35rem 0;
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(214, 184, 135, 0.35);
          max-height: 16rem;
          overflow-y: auto;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          animation: lumoraMenuFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes lumoraMenuFadeIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .lumora-select-menu::-webkit-scrollbar {
          width: 5px;
        }
        .lumora-select-menu::-webkit-scrollbar-track {
          background: transparent;
        }
        .lumora-select-menu::-webkit-scrollbar-thumb {
          background: rgba(214, 184, 135, 0.3);
          border-radius: 10px;
        }
        .lumora-select-menu::-webkit-scrollbar-thumb:hover {
          background: rgba(214, 184, 135, 0.6);
        }
      `;
      document.head.appendChild(styleTag);
    }

    const selects = document.querySelectorAll('select:not([data-custom-select="true"])');

    selects.forEach(select => {
      select.setAttribute('data-custom-select', 'true');

      const wrapper = document.createElement('div');
      wrapper.className = 'lumora-custom-select relative w-full';

      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);

      select.style.position = 'absolute';
      select.style.opacity = '0';
      select.style.pointerEvents = 'none';
      select.style.width = '1px';
      select.style.height = '1px';
      select.style.overflow = 'hidden';
      select.style.clip = 'rect(0, 0, 0, 0)';
      select.tabIndex = -1;

      let selectedIdx = select.selectedIndex >= 0 ? select.selectedIndex : 0;
      let selectedOpt = select.options[selectedIdx] || select.options[0];
      let initialText = selectedOpt ? selectedOpt.text : 'Select an option';

      // Adaptive styling matching original field
      const isRoundedXl = select.className.includes('rounded-xl');
      const roundedClass = isRoundedXl ? 'rounded-xl' : 'rounded-2xl';
      const isCompact = select.className.includes('py-2') || select.className.includes('py-2.5');
      const paddingClass = isCompact ? 'px-4 py-2.5' : 'p-3.5';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = `lumora-select-trigger w-full ${paddingClass} ${roundedClass} bg-gray-50 dark:bg-[#17151A] border border-gray-200 dark:border-gray-700 hover:border-[#D6B887] dark:hover:border-[#D6B887] shadow-sm flex items-center justify-between text-xs text-gray-900 dark:text-gray-100 transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#D6B887]/30`;
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');

      trigger.innerHTML = `
        <span class="lumora-select-text font-medium truncate">${initialText}</span>
        <svg class="lumora-select-arrow w-4 h-4 text-[#D6B887] transition-transform duration-300 transform flex-shrink-0 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      `;

      const menu = document.createElement('div');
      menu.className = `lumora-select-menu hidden bg-white dark:bg-[#1E1A24] border border-[#D6B887]/40 dark:border-[#D6B887]/30 shadow-2xl shadow-black/40 divide-y divide-gray-100 dark:divide-gray-800/40 ${roundedClass}`;

      Array.from(select.options).forEach((opt, idx) => {
        const isCurrent = idx === selectedIdx;
        const optRow = document.createElement('div');
        optRow.className = `lumora-select-option px-4 py-3 flex items-center justify-between text-xs cursor-pointer transition-colors ${
          isCurrent 
            ? 'bg-[#56334F] text-white dark:bg-[#56334F] dark:text-[#D6B887] font-semibold' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-[#56334F]/10 hover:text-[#56334F] dark:hover:bg-[#56334F]/40 dark:hover:text-[#D6B887]'
        }`;
        optRow.setAttribute('data-value', opt.value);
        optRow.setAttribute('data-index', idx);

        optRow.innerHTML = `
          <span class="truncate">${opt.text}</span>
          <svg class="lumora-select-check w-4 h-4 text-[#D6B887] flex-shrink-0 ml-2 ${isCurrent ? 'block' : 'hidden'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        `;

        optRow.addEventListener('click', (e) => {
          e.stopPropagation();
          select.selectedIndex = idx;
          select.value = opt.value;

          trigger.querySelector('.lumora-select-text').textContent = opt.text;

          menu.querySelectorAll('.lumora-select-option').forEach((row, rIdx) => {
            const check = row.querySelector('.lumora-select-check');
            if (rIdx === idx) {
              row.className = 'lumora-select-option px-4 py-3 flex items-center justify-between text-xs cursor-pointer transition-colors bg-[#56334F] text-white dark:bg-[#56334F] dark:text-[#D6B887] font-semibold';
              if (check) check.classList.remove('hidden');
            } else {
              row.className = 'lumora-select-option px-4 py-3 flex items-center justify-between text-xs cursor-pointer transition-colors text-gray-700 dark:text-gray-300 hover:bg-[#56334F]/10 hover:text-[#56334F] dark:hover:bg-[#56334F]/40 dark:hover:text-[#D6B887]';
              if (check) check.classList.add('hidden');
            }
          });

          closeMenu();

          select.dispatchEvent(new Event('change', { bubbles: true }));
          select.dispatchEvent(new Event('input', { bubbles: true }));
        });

        menu.appendChild(optRow);
      });

      function openMenu() {
        document.querySelectorAll('.lumora-select-menu:not(.hidden)').forEach(m => {
          m.classList.add('hidden');
          const t = m.previousElementSibling;
          if (t) {
            t.querySelector('.lumora-select-arrow')?.classList.remove('rotate-180');
            t.setAttribute('aria-expanded', 'false');
            t.classList.remove('border-[#D6B887]', 'ring-2', 'ring-[#D6B887]/20');
          }
        });

        menu.classList.remove('hidden');
        trigger.querySelector('.lumora-select-arrow')?.classList.add('rotate-180');
        trigger.setAttribute('aria-expanded', 'true');
        trigger.classList.add('border-[#D6B887]', 'ring-2', 'ring-[#D6B887]/20');
      }

      function closeMenu() {
        menu.classList.add('hidden');
        trigger.querySelector('.lumora-select-arrow')?.classList.remove('rotate-180');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.classList.remove('border-[#D6B887]', 'ring-2', 'ring-[#D6B887]/20');
      }

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (menu.classList.contains('hidden')) {
          openMenu();
        } else {
          closeMenu();
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          if (menu.classList.contains('hidden')) {
            openMenu();
          } else if (e.key === 'ArrowDown') {
            const nextIdx = (select.selectedIndex + 1) % select.options.length;
            menu.querySelectorAll('.lumora-select-option')[nextIdx]?.click();
          }
        } else if (e.key === 'ArrowUp' && !menu.classList.contains('hidden')) {
          e.preventDefault();
          const prevIdx = (select.selectedIndex - 1 + select.options.length) % select.options.length;
          menu.querySelectorAll('.lumora-select-option')[prevIdx]?.click();
        } else if (e.key === 'Escape') {
          closeMenu();
        }
      });

      wrapper.appendChild(trigger);
      wrapper.appendChild(menu);

      select.addEventListener('change', () => {
        const curOpt = select.options[select.selectedIndex];
        if (curOpt) {
          trigger.querySelector('.lumora-select-text').textContent = curOpt.text;
          menu.querySelectorAll('.lumora-select-option').forEach((row, rIdx) => {
            const check = row.querySelector('.lumora-select-check');
            if (rIdx === select.selectedIndex) {
              row.className = 'lumora-select-option px-4 py-3 flex items-center justify-between text-xs cursor-pointer transition-colors bg-[#56334F] text-white dark:bg-[#56334F] dark:text-[#D6B887] font-semibold';
              if (check) check.classList.remove('hidden');
            } else {
              row.className = 'lumora-select-option px-4 py-3 flex items-center justify-between text-xs cursor-pointer transition-colors text-gray-700 dark:text-gray-300 hover:bg-[#56334F]/10 hover:text-[#56334F] dark:hover:bg-[#56334F]/40 dark:hover:text-[#D6B887]';
              if (check) check.classList.add('hidden');
            }
          });
        }
      });

      if (select.form) {
        select.form.addEventListener('reset', () => {
          setTimeout(() => {
            const opt = select.options[select.selectedIndex] || select.options[0];
            if (opt) {
              trigger.querySelector('.lumora-select-text').textContent = opt.text;
            }
          }, 10);
        });
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lumora-custom-select')) {
        document.querySelectorAll('.lumora-select-menu:not(.hidden)').forEach(m => {
          m.classList.add('hidden');
          const t = m.previousElementSibling;
          if (t) {
            t.querySelector('.lumora-select-arrow')?.classList.remove('rotate-180');
            t.setAttribute('aria-expanded', 'false');
            t.classList.remove('border-[#D6B887]', 'ring-2', 'ring-[#D6B887]/20');
          }
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.lumora-select-menu:not(.hidden)').forEach(m => {
          m.classList.add('hidden');
          const t = m.previousElementSibling;
          if (t) {
            t.querySelector('.lumora-select-arrow')?.classList.remove('rotate-180');
            t.setAttribute('aria-expanded', 'false');
            t.classList.remove('border-[#D6B887]', 'ring-2', 'ring-[#D6B887]/20');
          }
        });
      }
    });
  }

  window.initLuxurySelects = initLuxurySelects;
  initLuxurySelects();
});

