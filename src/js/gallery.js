/**
 * LUMORA EVENTS - Gallery Filter & Lightbox Component
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentVisibleItems = [];
  let currentIndex = 0;

  function updateVisibleList() {
    currentVisibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
  }

  // Filter gallery items by a specific category key
  function filterByCategory(categoryKey) {
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (categoryKey === 'all' || category === categoryKey) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
    updateVisibleList();
  }

  // Category Filter Buttons
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button state
        filterButtons.forEach(b => {
          b.classList.remove('bg-[#56334F]', 'text-white', 'dark:bg-[#D6B887]', 'dark:text-[#17151A]', 'shadow-md');
          b.classList.add('bg-white', 'dark:bg-[#221E26]', 'text-gray-700', 'dark:text-gray-200');
        });
        btn.classList.remove('bg-white', 'dark:bg-[#221E26]', 'text-gray-700', 'dark:text-gray-200');
        btn.classList.add('bg-[#56334F]', 'text-white', 'dark:bg-[#D6B887]', 'dark:text-[#17151A]', 'shadow-md');

        const filter = btn.getAttribute('data-filter');
        filterByCategory(filter);
      });
    });

    // Run initial filter on page load using the first active button
    const initialActiveBtn = document.querySelector('.gallery-filter-btn.bg-\\[\\#56334F\\], .gallery-filter-btn.active') || filterButtons[0];
    if (initialActiveBtn) {
      const initialCategory = initialActiveBtn.getAttribute('data-filter');
      filterByCategory(initialCategory);
    } else {
      updateVisibleList();
    }
  } else {
    updateVisibleList();
  }

  // Open Lightbox
  function openLightbox(index) {
    if (!lightbox || !currentVisibleItems[index]) return;
    currentIndex = index;
    const item = currentVisibleItems[currentIndex];
    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || img.alt || 'Lumora Event Showcase';
    const cat = item.getAttribute('data-category-label') || 'Celebration';

    lightboxImg.src = img.src;
    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = cat;

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Close Lightbox
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Next / Prev
  function showNext() {
    if (currentVisibleItems.length === 0) return;
    currentIndex = (currentIndex + 1) % currentVisibleItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    if (currentVisibleItems.length === 0) return;
    currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    openLightbox(currentIndex);
  }

  // Attach click to gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const visibleIndex = currentVisibleItems.indexOf(item);
      if (visibleIndex !== -1) {
        openLightbox(visibleIndex);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
});

