/**
 * LUMORA EVENTS - Authentication & Demo Access Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  // Password Visibility Toggle
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.previousElementSibling || btn.parentElement.querySelector('input[type="password"], input[type="text"]');
      if (!input) return;

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');

      const icon = btn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        if (window.lucide) lucide.createIcons();
      }
    });
  });

  // Quick Role Switcher & Demo Login Buttons
  const clientDemoBtn = document.getElementById('quickClientDemoBtn');
  const adminDemoBtn = document.getElementById('quickAdminDemoBtn');
  const submitBtnText = document.getElementById('submitBtnText');

  function setRole(role) {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (role === 'admin') {
      if (clientDemoBtn) {
        clientDemoBtn.className = 'flex-1 py-2.5 px-3 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#56334F] dark:hover:text-[#D6B887] font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all';
      }
      if (adminDemoBtn) {
        adminDemoBtn.className = 'flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#56334F] via-[#6F3D66] to-[#56334F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-[#D6B887]/40 shadow-md shadow-[#56334F]/30 transition-all';
      }
      if (emailInput) emailInput.value = 'admin@lumora.events';
      if (passwordInput) passwordInput.value = 'adminSecret2026';
      if (submitBtnText) submitBtnText.textContent = 'Sign In to Director Portal →';
    } else {
      if (clientDemoBtn) {
        clientDemoBtn.className = 'flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#56334F] via-[#6F3D66] to-[#56334F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-[#D6B887]/40 shadow-md shadow-[#56334F]/30 transition-all';
      }
      if (adminDemoBtn) {
        adminDemoBtn.className = 'flex-1 py-2.5 px-3 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#56334F] dark:hover:text-[#D6B887] font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all';
      }
      if (emailInput) emailInput.value = 'sarah.j@example.com';
      if (passwordInput) passwordInput.value = 'clientDemo2026';
      if (submitBtnText) submitBtnText.textContent = 'Sign In to Client Portal →';
    }
  }

  if (clientDemoBtn) {
    clientDemoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setRole('client');
    });
  }

  if (adminDemoBtn) {
    adminDemoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setRole('admin');
    });
  }

  // Handle Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();

      if (!email) {
        if (window.showToast) window.showToast('Please enter your email.', 'error');
        return;
      }

      if (email.includes('admin') || email.includes('director')) {
        Storage.setCurrentUser({
          name: 'Alexander Vance',
          email: 'admin@lumora.events',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          title: 'Managing Director'
        });
        if (window.showToast) window.showToast('Welcome back, Director Alexander! Redirecting to Admin Dashboard...', 'success');
        setTimeout(() => {
          window.location.href = 'admin-dashboard.html';
        }, 800);
      } else {
        Storage.setCurrentUser({
          name: 'Sarah Johnson',
          email: email,
          role: 'client',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          phone: '+1 (555) 234-5678',
          memberSince: 'March 2025'
        });
        if (window.showToast) window.showToast('Welcome back, Sarah! Redirecting to your celebration portal...', 'success');
        setTimeout(() => {
          window.location.href = 'client-dashboard.html';
        }, 800);
      }
    });
  }

  // Handle Register Form Submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim();

      if (!name || !email) {
        if (window.showToast) window.showToast('Please complete all required fields.', 'error');
        return;
      }

      Storage.setCurrentUser({
        name: name,
        email: email,
        role: 'client',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        phone: '+1 (555) 000-0000',
        memberSince: 'Today'
      });

      if (window.showToast) window.showToast('Account created successfully! Welcome to Lumora Events.', 'success');
      setTimeout(() => {
        window.location.href = 'client-dashboard.html';
      }, 1000);
    });
  }

  // Handle Forgot Password
  const forgotForm = document.getElementById('forgotForm');
  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('forgotEmail')?.value.trim();
      if (!email) {
        if (window.showToast) window.showToast('Please enter your email.', 'error');
        return;
      }
      if (window.showToast) {
        window.showToast(`A demo password reset link has been simulated for ${email}. Check your inbox!`, 'info');
      }
      const statusBox = document.getElementById('forgotSuccessMessage');
      if (statusBox) statusBox.classList.remove('hidden');
    });
  }
});

// Logout utility
window.logoutUser = function () {
  if (window.showToast) {
    window.showToast('You have been logged out.', 'info');
  }
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 500);
};

