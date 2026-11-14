/**
 * LUMORA EVENTS - Admin Dashboard Analytics, Charts & Management
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Chart.js charts if canvas elements exist
  const eventOverviewCtx = document.getElementById('eventOverviewChart');
  const eventTypesCtx = document.getElementById('eventTypesChart');
  const venuePopularityCtx = document.getElementById('venuePopularityChart');

  let overviewChart = null;
  let typesChart = null;
  let venueChart = null;

  function getThemeColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
      isDark,
      textColor: isDark ? '#FAF8F5' : '#1D1923',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      inquiryColor: isDark ? '#D6B887' : '#B88E44'
    };
  }

  const initialColors = getThemeColors();

  if (eventOverviewCtx && window.Chart) {
    overviewChart = new Chart(eventOverviewCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Bookings (2026)',
            data: [32, 45, 58, 62, 85, 96, 114, 128, 140, 165, 182, 210],
            borderColor: '#56334F',
            backgroundColor: 'rgba(86, 51, 79, 0.12)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#D6B887',
            pointRadius: 4
          },
          {
            label: 'Inquiries',
            data: [75, 92, 110, 130, 160, 195, 220, 240, 280, 310, 345, 410],
            borderColor: initialColors.inquiryColor,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 6, bottom: 2, left: 2, right: 8 }
        },
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: initialColors.gridColor },
            ticks: {
              color: initialColors.textColor,
              font: { weight: '500', size: 10 },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 7
            }
          },
          y: {
            grid: { color: initialColors.gridColor },
            ticks: {
              color: initialColors.textColor,
              font: { weight: '500', size: 10 },
              maxTicksLimit: 6
            }
          }
        }
      }
    });
  }

  if (eventTypesCtx && window.Chart) {
    typesChart = new Chart(eventTypesCtx, {
      type: 'doughnut',
      data: {
        labels: ['Birthday Parties', 'Weddings', 'Corporate Galas', 'Beach & Outdoor', 'Baby Showers'],
        datasets: [{
          data: [38, 25, 18, 12, 7],
          backgroundColor: [
            '#56334F', // Primary Plum
            '#D6B887', // Champagne Gold
            '#784B6F', // Lighter Plum
            '#ECD8BA', // Light Gold
            '#331A2F'  // Deep Plum
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 6, bottom: 6, left: 6, right: 6 }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: initialColors.textColor,
              boxWidth: 10,
              padding: 10,
              font: { family: 'Plus Jakarta Sans', size: 10, weight: '600' }
            }
          }
        },
        cutout: '68%'
      }
    });
  }

  if (venuePopularityCtx && window.Chart) {
    venueChart = new Chart(venuePopularityCtx, {
      type: 'bar',
      data: {
        labels: ['Indoor Ballrooms', 'Beach Resorts', 'Garden Pavilions', 'Rooftop Terraces', 'Private Estates'],
        datasets: [{
          label: 'Completed Celebrations',
          data: [142, 98, 86, 64, 45],
          backgroundColor: '#56334F',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 6, bottom: 2, left: 2, right: 6 }
        },
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: initialColors.textColor,
              font: { weight: '500', size: 10 },
              maxRotation: 25,
              autoSkip: true
            }
          },
          y: {
            grid: { color: initialColors.gridColor },
            ticks: {
              color: initialColors.textColor,
              font: { weight: '500', size: 10 },
              maxTicksLimit: 6
            }
          }
        }
      }
    });
  }

  // Force chart resize once layout settles
  setTimeout(() => {
    if (overviewChart) overviewChart.resize();
    if (typesChart) typesChart.resize();
    if (venueChart) venueChart.resize();
  }, 120);

  // Responsive chart resize listener
  let chartResizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(chartResizeTimer);
    chartResizeTimer = setTimeout(() => {
      if (overviewChart) overviewChart.resize();
      if (typesChart) typesChart.resize();
      if (venueChart) venueChart.resize();
    }, 100);
  });

  // Dynamic Theme Synchronization for Charts
  window.addEventListener('themeChanged', () => {
    const c = getThemeColors();
    if (overviewChart) {
      if (overviewChart.options.scales?.x) {
        overviewChart.options.scales.x.ticks.color = c.textColor;
        overviewChart.options.scales.x.grid.color = c.gridColor;
      }
      if (overviewChart.options.scales?.y) {
        overviewChart.options.scales.y.ticks.color = c.textColor;
        overviewChart.options.scales.y.grid.color = c.gridColor;
      }
      if (overviewChart.data.datasets[1]) {
        overviewChart.data.datasets[1].borderColor = c.inquiryColor;
      }
      overviewChart.update();
    }
    if (typesChart && typesChart.options.plugins?.legend?.labels) {
      typesChart.options.plugins.legend.labels.color = c.textColor;
      typesChart.update();
    }
    if (venueChart) {
      if (venueChart.options.scales?.x) {
        venueChart.options.scales.x.ticks.color = c.textColor;
      }
      if (venueChart.options.scales?.y) {
        venueChart.options.scales.y.ticks.color = c.textColor;
        venueChart.options.scales.y.grid.color = c.gridColor;
      }
      venueChart.update();
    }
  });

  // Populate Admin Bookings Table
  const adminBookingsTable = document.getElementById('adminBookingsTableBody');
  if (adminBookingsTable) {
    function renderBookings(list) {
      if (list.length === 0) {
        adminBookingsTable.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-gray-500">No events matched your search.</td></tr>`;
        return;
      }

      adminBookingsTable.innerHTML = list.map(b => {
        let badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
        if (b.status === 'Confirmed') badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
        if (b.status === 'Completed') badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';

        return `
          <tr class="border-b border-gray-100 dark:border-gray-800/60 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
            <td class="py-3 px-4 font-mono text-xs font-semibold text-[#D6B887] whitespace-nowrap">${b.id}</td>
            <td class="py-3 px-4 min-w-[200px]">
              <div class="font-bold text-sm text-gray-900 dark:text-gray-100">${b.eventName}</div>
              <div class="text-xs text-gray-500 whitespace-nowrap">${b.eventType} • ${b.guests} guests</div>
            </td>
            <td class="py-3 px-4 min-w-[170px]">
              <div class="text-xs font-semibold text-gray-800 dark:text-gray-200">${b.customerName}</div>
              <div class="text-[11px] text-gray-400 whitespace-nowrap">${b.customerEmail}</div>
            </td>
            <td class="py-3 px-4 text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
              <div>${b.date}</div>
              <div class="text-[11px] text-gray-400 truncate max-w-[150px]">${b.location}</div>
            </td>
            <td class="py-3 px-4 font-semibold text-xs text-[#56334F] dark:text-[#D6B887] whitespace-nowrap">
              $${b.price.toLocaleString()}
            </td>
            <td class="py-3 px-4 whitespace-nowrap">
              <span class="px-2.5 py-1 text-[11px] font-semibold rounded-full ${badgeColor}">${b.status}</span>
            </td>
            <td class="py-3 px-4 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-1.5">
                <button onclick="window.adminChangeStatus('${b.id}', 'Confirmed')" class="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600" title="Confirm Booking">
                  <i data-lucide="check" class="w-4 h-4"></i>
                </button>
                <button onclick="window.adminChangeStatus('${b.id}', 'In Progress')" class="p-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-600" title="Set In Planning">
                  <i data-lucide="clock" class="w-4 h-4"></i>
                </button>
                <button onclick="window.adminDeleteBooking('${b.id}')" class="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600" title="Delete Booking">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

    const allBookings = Storage.getBookings();
    renderBookings(allBookings);

    // Search and filter listeners
    const searchInput = document.getElementById('adminBookingSearch');
    const statusFilter = document.getElementById('adminStatusFilter');

    function applyFilter() {
      const q = (searchInput?.value || '').toLowerCase();
      const status = statusFilter?.value || 'all';

      const filtered = allBookings.filter(b => {
        const matchesQ = b.eventName.toLowerCase().includes(q) ||
          b.customerName.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.eventType.toLowerCase().includes(q);
        const matchesStatus = status === 'all' || b.status.toLowerCase() === status.toLowerCase();
        return matchesQ && matchesStatus;
      });

      renderBookings(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', applyFilter);
    if (statusFilter) statusFilter.addEventListener('change', applyFilter);
  }

  // Admin Change Status helper
  window.adminChangeStatus = function (id, status) {
    Storage.updateBookingStatus(id, status);
    if (window.showToast) {
      window.showToast(`Booking ${id} status updated to: ${status}`, 'success');
    }
    setTimeout(() => window.location.reload(), 600);
  };

  // Admin Delete Booking helper
  window.adminDeleteBooking = function (id) {
    if (confirm(`Are you sure you want to remove booking ${id}?`)) {
      Storage.deleteBooking(id);
      if (window.showToast) {
        window.showToast(`Booking ${id} removed.`, 'info');
      }
      setTimeout(() => window.location.reload(), 600);
    }
  };
});

