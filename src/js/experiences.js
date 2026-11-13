/**
 * LUMORA EVENTS - Signature Experiences & Interactive Enhancements
 * Powers:
 * 1. Before & After Venue Transformation Drag Slider
 * 2. AI-Inspired Theme Customizer & Visual Moodboard Generator
 * 3. Interactive Venue Explorer
 * 4. Food & Decor Pairing Preview
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. BREATHTAKING HERO CAROUSEL CONTROLLER
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const sceneTabs = document.querySelectorAll('.scene-tab-btn');
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');

  let currentSlide = 0;
  let heroInterval = null;

  function showSlide(index) {
    if (heroSlides.length === 0) return;
    currentSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.remove('opacity-0', 'pointer-events-none');
        slide.classList.add('opacity-100');
      } else {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    heroDots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('w-8', 'bg-[#D6B887]');
        dot.classList.remove('w-2', 'bg-white/40');
      } else {
        dot.classList.remove('w-8', 'bg-[#D6B887]');
        dot.classList.add('w-2', 'bg-white/40');
      }
    });

    sceneTabs.forEach((tab, i) => {
      if (i === currentSlide) {
        tab.classList.add('border-[#D6B887]', 'bg-[#56334F]/70', 'shadow-[0_0_15px_rgba(214,184,135,0.25)]');
        tab.classList.remove('border-white/10', 'bg-black/50');
      } else {
        tab.classList.remove('border-[#D6B887]', 'bg-[#56334F]/70', 'shadow-[0_0_15px_rgba(214,184,135,0.25)]');
        tab.classList.add('border-white/10', 'bg-black/50');
      }
    });
  }

  // Expose global controller
  window.showHeroSlide = function(index) {
    showSlide(index);
    startHeroTimer();
  };

  function startHeroTimer() {
    stopHeroTimer();
    heroInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  function stopHeroTimer() {
    if (heroInterval) clearInterval(heroInterval);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startHeroTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startHeroTimer();
    });
  }

  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startHeroTimer();
    });
  });

  if (heroSlides.length > 0) {
    startHeroTimer();
  }

  // ==========================================
  // 1. 360° SPATIAL VENUE PANORAMA & DAY/NIGHT IMMERSION
  // ==========================================
  const panoramaData = {
    'ballroom': {
      title: 'Grand Imperial Ballroom & Royal Gallery',
      category: 'Luxury Gala & Milestone Celebrations',
      day: {
        image: 'assets/images/panorama-ballroom-day-360.jpg',
        badge: '2:30 PM • 5500K Natural Daylight',
        heading: 'Sunlit Architectural Splendor',
        description: 'Natural daylight streams through 18-foot Palladian arched windows, illuminating custom 14ft English garden rose arches, champagne silk tablecloths, and hand-cut Austrian crystal stemware with natural organic brilliance.',
        specs: [
          { label: 'Ambient Temperature', value: '21°C Micro-Climate Regulated' },
          { label: 'Floral Preservation', value: 'Automated Hydration Mist' },
          { label: 'Illumination Source', value: 'Natural High-Sky Windows + Soft Diffusers' },
          { label: 'Acoustic Tuning', value: 'Live Chamber Strings Calibrated' }
        ]
      },
      night: {
        image: 'assets/images/panorama-wedding-luxury-360.jpg',
        badge: '9:45 PM • 2700K Candlelit Starlight',
        heading: 'Grand Royal Wedding Ballroom Gala',
        description: 'An awe-inspiring 360-degree equirectangular panorama of our flagship 5-star luxury wedding ballroom. Features soaring coffered ceilings with massive cascading Austrian crystal chandeliers, an opulent royal floral wedding stage of white and champagne roses, polished marble floors with chandelier reflections, and elegant round banquet tables with gold cutlery and crystal candelabras.',
        specs: [
          { label: 'Ambient Lighting', value: '2700K Crystal Chandeliers + Candlelight' },
          { label: 'Stage Installation', value: 'Cascading White & Champagne Florals' },
          { label: 'Flooring Scenography', value: 'High-Gloss Polished Marble Mirror' },
          { label: 'Table Architecture', value: 'French Linen, 24k Gold & Crystal' }
        ]
      },
      hotspots: [
        { x: 18, y: 48, title: 'Haute Floral Arch', desc: '14ft bespoke arch woven with 800+ Ecuadorian roses and cascading white wisteria.' },
        { x: 42, y: 64, title: 'Imperial Banqueting Table', desc: 'Hand-loomed French linen with 24k gold flatware and personalized calligraphy menus.' },
        { x: 68, y: 32, title: 'Crystal Chandelier Canopy', desc: 'Austrian crystal chandeliers with automated twilight dimmer choreographies.' },
        { x: 88, y: 56, title: 'VIP Lounge & Champagne Bar', desc: 'Tufted velvet banquettes with vintage reserve champagne pairings.' }
      ]
    },
    'oceanfront': {
      title: 'Riviera Oceanfront Terrace & Dune Pavilion',
      category: 'Coastal Luxury & Sunset Banquets',
      day: {
        image: 'assets/images/panorama-oceanfront-day-360.jpg',
        badge: '3:15 PM • Golden Mediterranean Sun',
        heading: 'Sun-Drenched Coastal Elegance',
        description: 'Perched along private ocean bluffs, bleached bamboo pavilions and crisp white linen banquettes welcome guests with salt-tinged ocean breezes and vibrant citrus botanical table runners.',
        specs: [
          { label: 'Coastal Breeze Control', value: 'Aero-Deflection Glass Balustrades' },
          { label: 'Day Shading', value: 'UV-Shielded Organic Sail Canopies' },
          { label: 'Afternoon Refreshment', value: 'Spritz & Artisanal Gelato Cart' },
          { label: 'Soundscape', value: 'Acoustic Bossa Nova & Natural Surf' }
        ]
      },
      night: {
        image: 'assets/images/panorama-oceanfront-night-360.jpg',
        badge: '10:00 PM • Starlit Ocean Tide',
        heading: 'Ethereal Starlit Beach Soirée',
        description: 'Tiki torch avenues lead down to submerged sand firepit hearths, low bohemian floor pillows, hand-pierced Moroccan brass lanterns, and a seaside seafood grilling pavilion beneath the open Milky Way.',
        specs: [
          { label: 'Night Fire Architecture', value: '4 Custom Stone Firepit Hearths' },
          { label: 'Seaside Lanterns', value: 'Hand-Pierced Moroccan Brass Pendants' },
          { label: 'Night Temperature', value: 'Radiant Sand Heaters + Cashmere Throws' },
          { label: 'Late Night Finale', value: 'Low-Smoke Coastal Fireworks Display' }
        ]
      },
      hotspots: [
        { x: 22, y: 52, title: 'Panoramic Ocean Balcony', desc: 'Unobstructed 180° horizon views with private sunset cocktail stations.' },
        { x: 50, y: 68, title: 'Low Feasting Pavilion', desc: 'Bohemian lounge carpets, textured brass trays, and coastal pillow seating.' },
        { x: 78, y: 44, title: 'Bamboo Star Canopy', desc: 'Interwoven dried palm fronds and discreet micro-fairy lighting strands.' }
      ]
    },
    'orangery': {
      title: 'Tuscan Botanical Orangery & Glasshouse',
      category: 'Enchanted Garden & Private Estate Dinners',
      day: {
        image: 'assets/images/panorama-orangery-day-360.jpg',
        badge: '1:00 PM • Sun-Dappled Conservatory Light',
        heading: 'Verdant Botanical Sanctuary',
        description: 'Living ivy walls, century-old olive trees, and hanging glass terrariums create an organic glass cathedral where daylight dances through historic iron-framed greenhouse panes.',
        specs: [
          { label: 'Botanical Atmosphere', value: 'Live Mediterranean Flora & Vines' },
          { label: 'Natural Daylight', value: '360° Iron-Framed Glass Conservatory' },
          { label: 'Table Materials', value: 'Reclaimed Century-Old Tuscan Oak' },
          { label: 'Sensory Profile', value: 'Wild Rosemary & Fresh Orange Blossom' }
        ]
      },
      night: {
        image: 'assets/images/panorama-orangery-night-360.jpg',
        badge: '9:00 PM • Firefly Canopy Glow',
        heading: 'Nocturnal Fairy-Light Conservatory',
        description: 'Over 5,000 warm micro-fairy lights suspended throughout the vaulted glass ceiling create the sensation of dining beneath a private constellation, surrounded by dark botanical silhouettes.',
        specs: [
          { label: 'Ceiling Illumination', value: '5,000+ Warm Micro-Fairy Lights' },
          { label: 'Glass Reflections', value: 'Infinity Mirror Effect on Outer Panes' },
          { label: 'Table Centerpieces', value: 'Living Moss with Floating Glass Votives' },
          { label: 'Midnight Serenade', value: 'Baby Grand Piano in Living Flora' }
        ]
      },
      hotspots: [
        { x: 25, y: 40, title: 'Iron Conservatory Arch', desc: 'Historic 19th-century wrought iron framework with climbing jasmine.' },
        { x: 52, y: 60, title: 'Century Oak Long Table', desc: 'Continuous 40-foot banquet table seating up to 48 intimate guests.' },
        { x: 80, y: 45, title: 'Botanical Living Wall', desc: 'Subtropical living fern wall with automated micro-drip hydration.' }
      ]
    }
  };

  const panoramaContainers = document.querySelectorAll('.panorama-360-container');
  panoramaContainers.forEach(container => {
    let currentVenue = 'ballroom';
    let currentMode = 'night'; // default to opulent night view matching luxury brand
    let currentX = -320; // initial rotational offset
    let isDragging = false;
    let startX = 0;
    let zoomLevel = 1;

    const strip = container.querySelector('.panorama-strip');
    const tiles = container.querySelectorAll('.pano-tile');
    const tileImages = container.querySelectorAll('.pano-tile-img, .pano-img-1, .pano-img-2');
    const tileHotspotsContainers = container.querySelectorAll('.pano-tile-hotspots, .pano-hotspots');
    const dragHint = container.querySelector('.pano-drag-hint');
    const angleEl = container.querySelector('.pano-angle-readout');
    const compassNeedle = container.querySelector('.pano-compass-needle');
    const venueLabel = container.querySelector('.pano-venue-label');
    const badgeEl = container.querySelector('.pano-badge-readout');
    const rotateLeftBtn = container.querySelector('.pano-rotate-left');
    const rotateRightBtn = container.querySelector('.pano-rotate-right');
    const resetBtn = container.querySelector('.pano-reset-btn');
    const zoomInBtn = container.querySelector('.pano-zoom-in');
    const zoomOutBtn = container.querySelector('.pano-zoom-out');

    // Narrative elements
    const sceneHeading = document.getElementById('panoSceneHeading');
    const sceneDesc = document.getElementById('panoSceneDesc');
    const sceneSpecs = document.getElementById('panoSceneSpecs');
    const bookVenueBtn = document.getElementById('panoBookVenueBtn');

    function renderHotspots(venueKey) {
      const data = panoramaData[venueKey];
      if (!data) return;

      const html = data.hotspots.map((hs, idx) => `
        <div class="spatial-hotspot group" style="left: ${hs.x}%; top: ${hs.y}%;" data-hs-index="${idx}">
          <div class="hotspot-pulse">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
          </div>
          <div class="hotspot-popover p-3.5 rounded-2xl bg-[#17151A]/95 backdrop-blur-md border border-[#D6B887]/40 shadow-2xl text-left text-white">
            <span class="text-[10px] font-bold text-[#D6B887] uppercase tracking-wider block">Haute Spotlight</span>
            <h5 class="font-serif font-bold text-xs mt-0.5">${hs.title}</h5>
            <p class="text-[11px] text-gray-300 mt-1 leading-snug">${hs.desc}</p>
          </div>
        </div>
      `).join('');

      const allHotspotContainers = container.querySelectorAll('.pano-tile-hotspots, .pano-hotspots');
      allHotspotContainers.forEach(thc => {
        thc.innerHTML = html;
        if (window.lucide) {
          lucide.createIcons({ root: thc });
        }
      });
    }

    function getTileWidth() {
      const allTiles = container.querySelectorAll('.pano-tile');
      const firstTile = allTiles[0] || container.querySelector('.pano-tile-img');
      if (firstTile && firstTile.offsetWidth > 100) {
        return firstTile.offsetWidth;
      }
      const allImgs = container.querySelectorAll('.pano-tile-img');
      if (allImgs[0] && allImgs[0].offsetWidth > 100) {
        return allImgs[0].offsetWidth;
      }
      const h = strip ? (strip.offsetHeight || 560) : 560;
      return h * (16 / 9);
    }

    function updateTransform() {
      if (!strip) return;
      const width = getTileWidth();

      // Wrap currentX continuously within [-width, 0)
      if (width > 0) {
        currentX = ((currentX % width) - width) % width;
      }

      strip.style.transform = `translateX(${currentX}px) scale(${zoomLevel})`;

      // Calculate degrees 0 - 360
      const progress = width > 0 ? (Math.abs(currentX) / width) : 0;
      const angle = Math.round(progress * 360) % 360;

      if (angleEl) {
        angleEl.textContent = `${angle}° / 360° Panorama`;
      }
      if (compassNeedle) {
        compassNeedle.style.transform = `rotate(${angle}deg)`;
      }
    }

    function updateVenueAndMode(venueKey, modeKey) {
      currentVenue = venueKey;
      currentMode = modeKey;
      const venue = panoramaData[venueKey];
      if (!venue) return;

      const sceneData = venue[modeKey];
      const imageUrl = sceneData.image;

      // Smooth fade transition for images
      const allImages = container.querySelectorAll('.pano-tile-img, .pano-img-1, .pano-img-2');
      allImages.forEach(img => {
        img.style.transition = 'opacity 0.25s ease';
        img.style.opacity = '0.35';
      });

      setTimeout(() => {
        allImages.forEach((img, idx) => {
          img.src = imageUrl;
          if (idx === 0) {
            img.onload = () => updateTransform();
          }
          img.style.opacity = '1';
        });
        updateTransform();
      }, 100);

      if (venueLabel) {
        venueLabel.textContent = `${venue.title}`;
      }
      if (badgeEl) {
        badgeEl.textContent = sceneData.badge;
      }

      // Update editorial narratives
      if (sceneHeading) sceneHeading.textContent = sceneData.heading;
      if (sceneDesc) sceneDesc.textContent = sceneData.description;
      if (bookVenueBtn) {
        bookVenueBtn.href = `submit-event.html?venue=${encodeURIComponent(venue.title)}&atmosphere=${encodeURIComponent(modeKey)}`;
      }

      if (sceneSpecs) {
        sceneSpecs.innerHTML = sceneData.specs.map(spec => `
          <div class="p-4 rounded-2xl bg-white/5 dark:bg-[#1C1A22] border border-gray-200/40 dark:border-gray-800">
            <span class="text-[10px] uppercase font-bold text-[#D6B887] tracking-wider block">${spec.label}</span>
            <span class="text-xs sm:text-sm font-semibold text-[#17151A] dark:text-white mt-1 block">${spec.value}</span>
          </div>
        `).join('');
      }

      // Synchronize active states on venue and mode buttons
      document.querySelectorAll('.pano-venue-tab').forEach(t => {
        if (t.getAttribute('data-venue-key') === venueKey) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });

      document.querySelectorAll('.day-night-toggle-btn').forEach(b => {
        if (b.getAttribute('data-mode-key') === modeKey) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      renderHotspots(venueKey);
      setTimeout(updateTransform, 50);
    }

    // Direct drag interaction only (no automatic video playback)
    function onStart(x) {
      isDragging = true;
      startX = x;
      container.classList.add('grabbing');
      if (dragHint) {
        dragHint.style.opacity = '0';
        dragHint.style.pointerEvents = 'none';
      }
    }

    function onMove(x) {
      if (!isDragging) return;
      const dx = x - startX;
      startX = x;
      currentX += dx;
      updateTransform();
    }

    function onEnd() {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove('grabbing');
    }

    container.addEventListener('mousedown', (e) => {
      // Prevent drag initiation if clicking interactive hotspot popover
      if (e.target.closest('.hotspot-popover')) return;
      onStart(e.clientX);
    });
    window.addEventListener('mousemove', (e) => onMove(e.clientX));
    window.addEventListener('mouseup', onEnd);

    container.addEventListener('touchstart', (e) => {
      if (e.touches[0]) {
        if (e.target.closest('.hotspot-popover')) return;
        onStart(e.touches[0].clientX);
      }
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) onMove(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', onEnd);

    // Step Rotation & Reset Controls
    if (rotateLeftBtn) {
      rotateLeftBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentX += 160;
        updateTransform();
      });
    }

    if (rotateRightBtn) {
      rotateRightBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentX -= 160;
        updateTransform();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentX = -320;
        zoomLevel = 1;
        updateTransform();
      });
    }

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        zoomLevel = Math.min(zoomLevel + 0.15, 1.45);
        updateTransform();
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        zoomLevel = Math.max(zoomLevel - 0.15, 0.85);
        updateTransform();
      });
    }

    // Venue switcher buttons
    document.querySelectorAll('.pano-venue-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const venueKey = tab.getAttribute('data-venue-key');
        updateVenueAndMode(venueKey, currentMode);
      });
    });

    // Day / Night Switcher buttons
    document.querySelectorAll('.day-night-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modeKey = btn.getAttribute('data-mode-key');
        updateVenueAndMode(currentVenue, modeKey);
      });
    });

    // Window resize handler for perfect wrapping on any viewport change
    window.addEventListener('resize', () => {
      updateTransform();
    });

    // Initialize initial state (Drag only, NO auto-play video loop)
    updateVenueAndMode('ballroom', 'night');
    updateTransform();
  });

  // ==========================================
  // Legacy / Supplemental Sliders (if any)
  // ==========================================
  const baSliders = document.querySelectorAll('.ba-slider-container');
  baSliders.forEach(slider => {
    let isDragging = false;
    function setPosition(xPos) {
      const rect = slider.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const percentage = (offsetX / rect.width) * 100;
      slider.style.setProperty('--ba-position', `${percentage}%`);
    }
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      setPosition(e.clientX);
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  });

  // ==========================================
  // 2. AI-INSPIRED THEME MOODBOARD GENERATOR
  // ==========================================
  const moodboardPresets = {
    'royal-gold': {
      title: 'Royal Plum & Champagne Gold',
      subtitle: 'Opulent Gilded Elegance',
      description: 'Lavish deep plum drapery paired with brushed brass geometric arches, crystal candelabras, and ambient 2700K warm candle glow.',
      package: 'Luxury Tier ($299)',
      venue: 'Grand Ballrooms & Historic Private Estates',
      colors: ['#56334F', '#D6B887', '#17151A', '#ECD2B2'],
      colorNames: ['Deep Plum', 'Champagne Gold', 'Obsidian Charcoal', 'Soft Cream'],
      images: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80'
      ],
      elements: ['Gilded Candelabras', 'Velvet Chairs', '3-Tier Gold Foil Cake', 'Custom Acrylic Welcome Arch']
    },
    'pastel-dream': {
      title: 'Blush Rose & Celestial White',
      subtitle: 'Soft Whimsical Fairytale',
      description: 'Delicate clouds of organic balloon garlands woven with blush pink English roses, French macaron towers, and ethereal chiffon canopies.',
      package: 'Premium Tier ($199)',
      venue: 'Sunlit Atriums & Garden Pavilions',
      colors: ['#F7D6E0', '#B5838D', '#FAF8F5', '#E2ECE9'],
      colorNames: ['Blush Rose', 'Dusty Mauve', 'Warm White', 'Sage Fog'],
      images: [
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80'
      ],
      elements: ['Organic Balloon Garland', 'Custom Floral Wall', 'Macaron Cart', 'Pastel Dessert Plinths']
    },
    'tropical-sunset': {
      title: 'Sunset Amber & Coastal Palm',
      subtitle: 'Bohemian Seaside Glow',
      description: 'Sun-bleached bamboo pavilions with cascading pampas grass, glowing Moroccan lanterns, barefoot beach cabanas, and firepit lounges.',
      package: 'Luxury Tier ($299)',
      venue: 'Private Beaches & Oceanfront Resorts',
      colors: ['#D6B887', '#E07A5F', '#3D405B', '#81B29A'],
      colorNames: ['Champagne Sand', 'Sunset Terracotta', 'Deep Ocean', 'Palm Green'],
      images: [
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=80'
      ],
      elements: ['Draped Bamboo Gazebo', 'Moroccan Brass Lanterns', 'Seafood Barbecue Bar', 'Low Feasting Lounge']
    },
    'enchanted-garden': {
      title: 'Botanical Ivy & Fairy Light Canopy',
      subtitle: 'Starlight Forest Romance',
      description: 'Romantic wooden feasting tables nestled beneath thousands of warm twinkle lights, lush climbing vines, and hanging glass globes.',
      package: 'Premium Tier ($199)',
      venue: 'Historic Botanic Gardens & Vineyards',
      colors: ['#2D5A27', '#D6B887', '#56334F', '#FAF8F5'],
      colorNames: ['Forest Fern', 'Champagne Gold', 'Royal Plum', 'Dewdrop White'],
      images: [
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80'
      ],
      elements: ['Fairy Light Ceiling', 'Fresh Botanical Garlands', 'Acoustic String Stage', 'Live Moss Centerpieces']
    }
  };

  const themeSelector = document.getElementById('aiThemeSelect');
  if (themeSelector) {
    function updateMoodboard(presetKey) {
      const data = moodboardPresets[presetKey] || moodboardPresets['royal-gold'];
      
      const titleEl = document.getElementById('mbTitle');
      const subtitleEl = document.getElementById('mbSubtitle');
      const descEl = document.getElementById('mbDesc');
      const pkgEl = document.getElementById('mbPackage');
      const venueEl = document.getElementById('mbVenue');
      const img1 = document.getElementById('mbImg1');
      const img2 = document.getElementById('mbImg2');
      const img3 = document.getElementById('mbImg3');
      const swatchesContainer = document.getElementById('mbSwatches');
      const elementsContainer = document.getElementById('mbElements');
      const bookLink = document.getElementById('mbBookLink');

      if (titleEl) titleEl.textContent = data.title;
      if (subtitleEl) subtitleEl.textContent = data.subtitle;
      if (descEl) descEl.textContent = data.description;
      if (pkgEl) pkgEl.textContent = data.package;
      if (venueEl) venueEl.textContent = data.venue;

      if (img1 && data.images[0]) img1.src = data.images[0];
      if (img2 && data.images[1]) img2.src = data.images[1];
      if (img3 && data.images[2]) img3.src = data.images[2];

      if (bookLink) {
        bookLink.href = `submit-event.html?theme=${encodeURIComponent(data.title)}`;
      }

      if (swatchesContainer) {
        swatchesContainer.innerHTML = data.colors.map((c, i) => `
          <div class="flex items-center gap-2">
            <span class="color-swatch" style="background-color: ${c}"></span>
            <div class="text-[11px] leading-tight">
              <span class="font-bold block">${data.colorNames[i]}</span>
              <span class="text-gray-400 font-mono text-[9px]">${c}</span>
            </div>
          </div>
        `).join('');
      }

      if (elementsContainer) {
        elementsContainer.innerHTML = data.elements.map(el => `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#17151A] border border-[#D6B887]/30 text-gray-700 dark:text-gray-200">
            <i data-lucide="sparkles" class="w-3 h-3 text-[#D6B887]"></i> ${el}
          </span>
        `).join('');
        if (window.lucide) lucide.createIcons({ root: elementsContainer });
      }
    }

    themeSelector.addEventListener('change', (e) => {
      updateMoodboard(e.target.value);
    });

    // Theme preset pills
    document.querySelectorAll('.theme-preset-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.theme-preset-pill').forEach(p => p.classList.remove('ring-2', 'ring-[#56334F]', 'dark:ring-[#D6B887]'));
        pill.classList.add('ring-2', 'ring-[#56334F]', 'dark:ring-[#D6B887]');
        const key = pill.getAttribute('data-theme-key');
        if (themeSelector) themeSelector.value = key;
        updateMoodboard(key);
      });
    });

    // Initial render
    updateMoodboard(themeSelector.value);
  }

  // ==========================================
  // 3. INTERACTIVE VENUE EXPLORER TABS
  // ==========================================
  const venueTabs = document.querySelectorAll('.venue-explorer-tab');
  const venueCards = document.querySelectorAll('.venue-explorer-card');

  if (venueTabs.length > 0) {
    venueTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        venueTabs.forEach(t => {
          t.classList.remove('bg-[#56334F]', 'text-white', 'dark:bg-[#D6B887]', 'dark:text-[#17151A]');
          t.classList.add('bg-white', 'dark:bg-[#221E26]', 'text-gray-700', 'dark:text-gray-300');
        });
        tab.classList.remove('bg-white', 'dark:bg-[#221E26]', 'text-gray-700', 'dark:text-gray-300');
        tab.classList.add('bg-[#56334F]', 'text-white', 'dark:bg-[#D6B887]', 'dark:text-[#17151A]');

        const cat = tab.getAttribute('data-venue-cat');
        venueCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-venue-cat') === cat) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ==========================================
  // 4. FOOD & DECOR PREVIEW TABS
  // ==========================================
  const previewTabs = document.querySelectorAll('.preview-tab-btn');
  const previewPanels = document.querySelectorAll('.preview-tab-panel');

  if (previewTabs.length > 0) {
    previewTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        previewTabs.forEach(b => {
          b.classList.remove('border-[#56334F]', 'text-[#56334F]', 'dark:border-[#D6B887]', 'dark:text-[#D6B887]', 'font-bold');
          b.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700');
        });
        btn.classList.add('border-[#56334F]', 'text-[#56334F]', 'dark:border-[#D6B887]', 'dark:text-[#D6B887]', 'font-bold');
        btn.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700');

        const target = btn.getAttribute('data-preview-target');
        previewPanels.forEach(panel => {
          if (panel.id === target) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });
  }

});

