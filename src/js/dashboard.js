/**
 * LUMORA EVENTS - Client Dashboard Interactions & Actions
 */

document.addEventListener('DOMContentLoaded', () => {
  const user = Storage.getCurrentUser();

  // Populate client header & profile name
  document.querySelectorAll('.client-name-display').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.client-email-display').forEach(el => el.textContent = user.email);
  document.querySelectorAll('.client-avatar-display').forEach(el => {
    if (el.tagName === 'IMG' && user.avatar) el.src = user.avatar;
  });

  // Render Client Bookings in Overview & My Bookings
  const bookingsListContainer = document.getElementById('clientBookingsList');
  if (bookingsListContainer) {
    const bookings = Storage.getBookings().filter(b => b.customerEmail === user.email || !b.customerEmail);
    
    if (bookings.length === 0) {
      bookingsListContainer.innerHTML = `
        <div class="text-center py-12 bg-white dark:bg-[#221E26] rounded-3xl border border-[#D6B887]/20 p-8">
          <i data-lucide="calendar-x" class="w-12 h-12 mx-auto text-[#D6B887] mb-3"></i>
          <h3 class="font-serif text-xl font-bold mb-2">No Event Bookings Found</h3>
          <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">You haven't requested any events yet. Let our celebration designers create your unforgettable experience.</p>
          <a href="submit-event.html" class="btn-primary">Plan Your First Event</a>
        </div>
      `;
    } else {
      bookingsListContainer.innerHTML = bookings.map(b => {
        let statusBadge = '';
        if (b.status === 'Confirmed') {
          statusBadge = '<span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">Confirmed</span>';
        } else if (b.status === 'In Progress') {
          statusBadge = '<span class="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">In Planning</span>';
        } else {
          statusBadge = '<span class="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">Review Pending</span>';
        }

        return `
          <div class="bg-white dark:bg-[#221E26] rounded-2xl border border-gray-100 dark:border-[#352E3C] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-[#352E3C]">
              <div>
                <div class="flex items-center gap-3">
                  <span class="text-xs font-mono font-medium text-[#D6B887]">${b.id}</span>
                  ${statusBadge}
                </div>
                <h3 class="font-serif text-xl font-bold mt-1 text-[#17151A] dark:text-[#FAF8F5]">${b.eventName}</h3>
                <p class="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#56334F] dark:text-[#D6B887]"></i> ${b.location}
                </p>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Total Investment</div>
                <div class="text-2xl font-bold text-[#56334F] dark:text-[#D6B887] font-serif">$${b.price.toLocaleString()}</div>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
              <div>
                <span class="text-gray-400 block mb-0.5">Event Date</span>
                <span class="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                  <i data-lucide="calendar" class="w-3.5 h-3.5 text-[#D6B887]"></i> ${b.date}
                </span>
              </div>
              <div>
                <span class="text-gray-400 block mb-0.5">Guests</span>
                <span class="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                  <i data-lucide="users" class="w-3.5 h-3.5 text-[#D6B887]"></i> ${b.guests} Attendees
                </span>
              </div>
              <div>
                <span class="text-gray-400 block mb-0.5">Theme</span>
                <span class="font-semibold text-gray-800 dark:text-gray-200">${b.theme}</span>
              </div>
              <div>
                <span class="text-gray-400 block mb-0.5">Package</span>
                <span class="font-semibold text-gray-800 dark:text-gray-200">${b.package} Tier</span>
              </div>
            </div>

            <div class="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 dark:border-[#352E3C]">
              <div class="flex items-center gap-2">
                <a href="proposals.html" class="inline-flex items-center gap-1 text-xs font-semibold text-[#56334F] dark:text-[#D6B887] hover:underline">
                  <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> View Proposals
                </a>
                <span class="text-gray-300 dark:text-gray-700">•</span>
                <a href="payments.html" class="inline-flex items-center gap-1 text-xs font-semibold text-[#56334F] dark:text-[#D6B887] hover:underline">
                  <i data-lucide="credit-card" class="w-3.5 h-3.5"></i> Payment Schedule
                </a>
              </div>
              <button onclick="window.viewBookingDetails('${b.id}')" class="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:border-[#56334F] dark:hover:border-[#D6B887] transition-colors">
                Event Dossier
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  // Handle Proposal Approval Actions
  document.querySelectorAll('.proposal-approve-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const propId = btn.getAttribute('data-id') || 'Proposal';
      btn.textContent = 'Approved ✓';
      btn.classList.remove('btn-primary', 'bg-[#56334F]');
      btn.classList.add('bg-emerald-600', 'text-white');
      btn.disabled = true;

      if (window.showToast) {
        window.showToast(`${propId} has been successfully approved! Notification dispatched to your celebration coordinator.`, 'success');
      }
    });
  });

  // Simulated Installment Payment Action
  window.payInstallment = function (amount, installmentName) {
    if (confirm(`Simulate payment installment of $${amount} for ${installmentName}? (Demo transaction)`)) {
      if (window.showToast) {
        window.showToast(`Processing payment of $${amount} via secure demonstration portal...`, 'info');
      }
      setTimeout(() => {
        if (window.showToast) {
          window.showToast(`Payment of $${amount} successful! Receipt #REC-2026-${Math.floor(1000 + Math.random() * 9000)} generated.`, 'success');
        }
        const row = document.getElementById(`installment-${installmentName.replace(/\s+/g, '-').toLowerCase()}`);
        if (row) {
          const badge = row.querySelector('.payment-status-badge');
          if (badge) {
            badge.className = 'payment-status-badge px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
            badge.textContent = 'Paid ✓';
          }
          const payBtn = row.querySelector('.pay-now-action');
          if (payBtn) {
            payBtn.outerHTML = '<span class="text-xs text-gray-400 font-medium">Completed</span>';
          }
        }
      }, 1000);
    }
  };

  // Booking details modal
  window.viewBookingDetails = function (bookingId) {
    const b = Storage.getBookings().find(item => item.id === bookingId);
    if (!b) return;

    const modal = document.getElementById('bookingDetailsModal');
    if (!modal) {
      alert(`Booking ${b.id}\n${b.eventName}\nDate: ${b.date}\nVenue: ${b.location}\nGuests: ${b.guests}\nStatus: ${b.status}`);
      return;
    }

    document.getElementById('modalEventId').textContent = b.id;
    document.getElementById('modalEventName').textContent = b.eventName;
    document.getElementById('modalEventType').textContent = b.eventType;
    document.getElementById('modalEventDate').textContent = `${b.date} at ${b.time || '18:00'}`;
    document.getElementById('modalEventVenue').textContent = `${b.venueType} - ${b.location}`;
    document.getElementById('modalEventGuests').textContent = `${b.guests} Guests`;
    document.getElementById('modalEventPackage').textContent = `${b.package} Plan ($${b.price.toLocaleString()})`;
    document.getElementById('modalEventTheme').textContent = b.theme;
    document.getElementById('modalEventNotes').textContent = b.notes || 'Standard coordination guidelines applied.';

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };
});

