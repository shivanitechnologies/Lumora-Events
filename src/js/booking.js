/**
 * LUMORA EVENTS - Interactive Event Booking & Price Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('lumoraBookingForm');
  if (!bookingForm) return;

  let currentStep = 1;
  const totalSteps = 4;

  const stepIndicators = document.querySelectorAll('.wizard-step-indicator');
  const stepPanels = document.querySelectorAll('.wizard-step-panel');
  const nextBtn = document.getElementById('wizardNextBtn');
  const prevBtn = document.getElementById('wizardPrevBtn');
  const submitBtn = document.getElementById('wizardSubmitBtn');

  // Pricing summary fields
  const summaryPackage = document.getElementById('summaryPackage');
  const summaryGuests = document.getElementById('summaryGuests');
  const summaryVenue = document.getElementById('summaryVenue');
  const summaryDate = document.getElementById('summaryDate');
  const summaryEstimatedPrice = document.getElementById('summaryEstimatedPrice');

  function calculateEstimate() {
    const pkg = document.querySelector('input[name="package"]:checked')?.value || 'Premium';
    const guests = parseInt(document.getElementById('bookingGuests')?.value) || 50;
    const venue = document.getElementById('bookingVenueType')?.value || 'Indoor Ballroom';
    const date = document.getElementById('bookingDate')?.value || 'Not selected';

    let baseRate = 199;
    if (pkg === 'Essential') baseRate = 99;
    if (pkg === 'Luxury') baseRate = 299;

    let venueMultiplier = 1.0;
    if (venue.includes('Beach') || venue.includes('Resort')) venueMultiplier = 1.25;
    if (venue.includes('Rooftop')) venueMultiplier = 1.15;

    // Check add-ons
    let addOnsTotal = 0;
    document.querySelectorAll('input[name="addons"]:checked').forEach(cb => {
      addOnsTotal += parseInt(cb.getAttribute('data-price') || 0);
    });

    const total = Math.round(baseRate * (guests * 0.15) * 10 * venueMultiplier + addOnsTotal);

    if (summaryPackage) summaryPackage.textContent = pkg;
    if (summaryGuests) summaryGuests.textContent = `${guests} Guests`;
    if (summaryVenue) summaryVenue.textContent = venue;
    if (summaryDate) summaryDate.textContent = date;
    if (summaryEstimatedPrice) summaryEstimatedPrice.textContent = `$${total.toLocaleString()}`;

    return total;
  }

  // Update estimate on any input change
  bookingForm.addEventListener('change', calculateEstimate);
  bookingForm.addEventListener('input', calculateEstimate);

  function updateWizardUI() {
    // Show active panel
    stepPanels.forEach(panel => {
      const step = parseInt(panel.getAttribute('data-step'));
      if (step === currentStep) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    // Update step badges
    stepIndicators.forEach(indicator => {
      const step = parseInt(indicator.getAttribute('data-step'));
      const circle = indicator.querySelector('.step-circle');
      const text = indicator.querySelector('.step-text');

      if (step < currentStep) {
        // Completed
        circle.className = 'step-circle w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-[#56334F] text-white dark:bg-[#D6B887] dark:text-[#17151A]';
        circle.innerHTML = '✓';
      } else if (step === currentStep) {
        // Active
        circle.className = 'step-circle w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-[#D6B887]/40 bg-[#56334F] text-white dark:bg-[#D6B887] dark:text-[#17151A]';
        circle.innerHTML = step;
      } else {
        // Inactive
        circle.className = 'step-circle w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-gray-200 dark:bg-gray-700 text-gray-500';
        circle.innerHTML = step;
      }
    });

    // Control buttons visibility
    if (prevBtn) {
      if (currentStep === 1) {
        prevBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
      }
    }

    if (currentStep === totalSteps) {
      if (nextBtn) nextBtn.classList.add('hidden');
      if (submitBtn) submitBtn.classList.remove('hidden');
    } else {
      if (nextBtn) nextBtn.classList.remove('hidden');
      if (submitBtn) submitBtn.classList.add('hidden');
    }

    calculateEstimate();
  }

  function validateCurrentStep() {
    const currentPanel = document.querySelector(`.wizard-step-panel[data-step="${currentStep}"]`);
    if (!currentPanel) return true;

    const requiredFields = currentPanel.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('border-rose-500');
        field.focus();
      } else {
        field.classList.remove('border-rose-500');
      }
    });

    if (!isValid) {
      if (window.showToast) {
        window.showToast('Please fill out all required fields before proceeding.', 'error');
      }
    }
    return isValid;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
          currentStep++;
          updateWizardUI();
          window.scrollTo({ top: bookingForm.offsetTop - 80, behavior: 'smooth' });
        }
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
        window.scrollTo({ top: bookingForm.offsetTop - 80, behavior: 'smooth' });
      }
    });
  }

  // Allow clicking on step badges directly
  stepIndicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const targetStep = parseInt(indicator.getAttribute('data-step'));
      if (targetStep < currentStep || validateCurrentStep()) {
        currentStep = targetStep;
        updateWizardUI();
        window.scrollTo({ top: bookingForm.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // Handle Form Submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    const formData = new FormData(bookingForm);
    const estimatedTotal = calculateEstimate();

    const newBooking = {
      customerName: formData.get('fullName') || 'Sarah Johnson',
      customerEmail: formData.get('email') || 'sarah.j@example.com',
      customerPhone: formData.get('phone') || '+1 (555) 234-5678',
      eventType: formData.get('eventType') || 'Birthday Party',
      eventName: formData.get('eventName') || 'Celebration Event',
      venueType: formData.get('venueType') || 'Indoor Ballroom',
      location: formData.get('location') || 'Preferred City Venue',
      date: formData.get('date') || new Date().toISOString().split('T')[0],
      time: formData.get('time') || '18:00',
      guests: parseInt(formData.get('guests')) || 50,
      theme: formData.get('theme') || 'Royal Gold & Champagne',
      package: formData.get('package') || 'Premium',
      price: estimatedTotal,
      notes: formData.get('notes') || ''
    };

    if (window.Storage) {
      Storage.addBooking(newBooking);
    }

    if (window.showToast) {
      window.showToast('Your event has been successfully submitted! Redirecting to your dashboard...', 'success');
    }

    setTimeout(() => {
      window.location.href = 'my-bookings.html';
    }, 1200);
  });

  // Initial Calculation
  calculateEstimate();
  updateWizardUI();
});

