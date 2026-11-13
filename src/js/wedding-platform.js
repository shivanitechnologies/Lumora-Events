/**
 * LUMORA EVENTS — LUXURY WEDDING EXPERIENCE PLATFORM
 * Interactive 360° Panorama Viewer (Pannellum / WebGL + Tactile Drag Fallback),
 * Theme Discovery, Live Decor Customizer, Package Tiers, Real-time Price Calculator & VIP Booking Enquiry
 */

(function () {
  'use strict';

  // Available Venues & Base Rates
  const VENUE_CATALOG = {
    'ballroom': {
      name: 'Grand Imperial Ballroom & Royal Gallery',
      baseFee: 3500,
      capacity: 'Up to 350 Guests',
      image: 'assets/images/panorama-wedding-luxury-360.jpg'
    },
    'oceanfront': {
      name: 'Riviera Oceanfront Terrace & Dune Pavilion',
      baseFee: 4200,
      capacity: 'Up to 250 Guests',
      image: 'assets/images/panorama-oceanfront-night-360.jpg'
    },
    'orangery': {
      name: 'Tuscan Botanical Orangery & Glasshouse',
      baseFee: 3800,
      capacity: 'Up to 200 Guests',
      image: 'assets/images/panorama-orangery-night-360.jpg'
    },
    'villa': {
      name: 'Bespoke Private Villa & Mediterranean Estate',
      baseFee: 5500,
      capacity: 'Up to 500 Guests',
      image: 'assets/images/panorama-ballroom-day-360.jpg'
    }
  };

  // Customizable Decor Upgrade Options Catalog
  const DECOR_CATALOG = {
    flowers: {
      'ecuadorian-roses': { name: 'Ecuadorian Grand White & Cream Roses', price: 0, tag: 'Included in Tier' },
      'orchids-wisteria': { name: 'Cascading Orchids, Wisteria & Hydrangeas', price: 800, tag: 'Haute Floral' },
      'blush-peonies': { name: 'Blush English Peonies & Sweet Peas', price: 650, tag: 'Romantic Chic' },
      'pampas-palms': { name: 'Sun-Bleached Pampas Grass & Dried Palms', price: 500, tag: 'Bohemian Luxe' }
    },
    chandeliers: {
      'austrian-crystal': { name: 'Cascading Austrian Multi-Tier Crystal', price: 0, tag: 'Included' },
      'gilded-geometric': { name: 'Architectural Brushed 24k Gold Geometric Pendants', price: 600, tag: 'Contemporary' },
      'fairy-canopy': { name: '5,000 Warm Micro-Fairy Light Starlight Canopy', price: 1200, tag: 'Showstopper' },
      'brass-candelabras': { name: 'Towering Imperial Brass Table Candelabras', price: 400, tag: 'Classic' }
    },
    stage: {
      'royal-arch': { name: '14ft Bespoke Floral Arch & Mirrored Platform', price: 0, tag: 'Signature' },
      'mirrored-runway': { name: 'Black Mirror Runway & Gilded Backdrop', price: 1100, tag: 'Runway Gala' },
      'roman-columns': { name: 'Classical Fluted Marble Columns & Drapes', price: 900, tag: 'Architectural' },
      'infinity-circle': { name: 'Water-Mirror Circular Infinity Arch', price: 1500, tag: 'Couture' }
    },
    arch: {
      'mirrored-monogram': { name: 'Mirrored Monogram Entrance Gate with Spotlights', price: 750, tag: 'Bespoke' },
      'floral-tunnel': { name: 'Grand 20ft Floral Tunnel Archway', price: 950, tag: 'Opulent' },
      'chiffon-curtain': { name: 'Draped Silk Organza with Fairy Light Cascades', price: 550, tag: 'Whimsical' },
      'bamboo-gate': { name: 'Bleached Bamboo Coastal Archway', price: 450, tag: 'Beachside' }
    },
    tables: {
      'duchess-satin': { name: 'Heavy Duchess Satin Silk Round Tables', price: 0, tag: 'Included' },
      'mirror-imperial': { name: 'Mirror-Gloss Imperial Banquet Tables', price: 400, tag: 'Reflective' },
      'tuscan-oak': { name: 'Reclaimed Century-Old Tuscan Oak Feasting Tables', price: 650, tag: 'Rustic Haute' }
    },
    chairs: {
      'velvet-louis': { name: 'Plum Velvet Cushioned Louis XVI Chairs', price: 350, tag: 'Regal' },
      'chiavari-gold': { name: '24k Gold Bamboo Chiavari Chairs', price: 0, tag: 'Included' },
      'ghost-acrylic': { name: 'Clear Monogrammed Ghost Acrylic Chairs', price: 450, tag: 'Modern' },
      'crossback-vineyard': { name: 'French Whitewashed Cross-Back Chairs', price: 250, tag: 'Garden' }
    },
    lighting: {
      'candle-uplighting': { name: 'Dynamic Intelligent Architectural Uplighting', price: 600, tag: 'Atmospheric' },
      'cold-sparks': { name: 'Indoor Cold Spark Fountain Grand Entrance & Cake Cut', price: 850, tag: 'Grand Finale' },
      'candle-dimmer': { name: '2700K Candlelight Votives & Chandelier Dimmers', price: 0, tag: 'Included' },
      'fog-cloud': { name: 'Low-Lying Dry Ice Cloud Dance Floor', price: 500, tag: 'First Dance' }
    }
  };

  // Curated theme decor presets
  const THEME_DECOR_PRESETS = {
    'royal-gold': {
      flowers: 'orchids-wisteria',
      chandeliers: 'austrian-crystal',
      stage: 'royal-arch',
      arch: 'mirrored-monogram',
      tables: 'duchess-satin',
      chairs: 'velvet-louis',
      lighting: 'candle-uplighting'
    },
    'pastel-whimsical': {
      flowers: 'blush-peonies',
      chandeliers: 'fairy-canopy',
      stage: 'infinity-circle',
      arch: 'chiffon-curtain',
      tables: 'duchess-satin',
      chairs: 'crossback-vineyard',
      lighting: 'candle-dimmer'
    },
    'tropical-sunset': {
      flowers: 'pampas-palms',
      chandeliers: 'brass-candelabras',
      stage: 'royal-arch',
      arch: 'bamboo-gate',
      tables: 'tuscan-oak',
      chairs: 'crossback-vineyard',
      lighting: 'cold-sparks'
    },
    'enchanted-garden': {
      flowers: 'ecuadorian-roses',
      chandeliers: 'fairy-canopy',
      stage: 'roman-columns',
      arch: 'floral-tunnel',
      tables: 'tuscan-oak',
      chairs: 'chiavari-gold',
      lighting: 'candle-dimmer'
    },
    'ivory-pearl': {
      flowers: 'ecuadorian-roses',
      chandeliers: 'austrian-crystal',
      stage: 'royal-arch',
      arch: 'floral-tunnel',
      tables: 'duchess-satin',
      chairs: 'ghost-acrylic',
      lighting: 'candle-uplighting'
    },
    'modern-blackgold': {
      flowers: 'pampas-palms',
      chandeliers: 'gilded-geometric',
      stage: 'mirrored-runway',
      arch: 'mirrored-monogram',
      tables: 'mirror-imperial',
      chairs: 'ghost-acrylic',
      lighting: 'cold-sparks'
    }
  };

  // Internal Platform State
  const WeddingPlatform = {
    state: {
      selectedTheme: 'royal-gold',
      selectedPackage: 'luxury',
      selectedVenue: 'ballroom',
      guestCount: 120,
      customOptions: {
        flowers: 'orchids-wisteria',
        chandeliers: 'austrian-crystal',
        stage: 'royal-arch',
        arch: 'mirrored-monogram',
        tables: 'duchess-satin',
        chairs: 'velvet-louis',
        lighting: 'candle-uplighting'
      },
      customColors: {
        primary: '#56334F',
        secondary: '#D6B887',
        accent: '#17151A',
        name: 'Royal Plum & Gold'
      }
    },

    panoViewer: null,
    isPannellumLoaded: false,
    tactileStrip: null,
    tactileCurrentX: -320,

    init() {
      const atelierSection = document.getElementById('theme-moodboard') || document.getElementById('weddingPanoViewer');
      if (!atelierSection) return;

      if (window.Storage) {
        Storage.init();
      }

      this.syncPackagesToUI();
      this.bindThemeCards();
      this.bindPackageCards();
      this.bindVenueSelect();
      this.bindGuestCountSlider();
      this.bindDecorOptions();
      this.bindViewpointNav();
      this.bindEnquiryForm();
      this.initModalDismissal();
      this.initPannellumViewer();
      this.calculatePricing();
      this.syncThemeToUI(this.state.selectedTheme);
    },

    // 0. Synchronize Stored Package Prices to Public UI Cards
    syncPackagesToUI() {
      const pkgs = (window.Storage ? Storage.getWeddingPackages() : null) || {};
      ['essential', 'luxury', 'royal', 'bespoke'].forEach(key => {
        if (pkgs[key]) {
          const card = document.querySelector(`.wedding-package-card[data-package-key="${key}"]`);
          if (card) {
            const priceSpan = card.querySelector('.font-serif.text-3xl.font-bold');
            if (priceSpan) {
              priceSpan.textContent = `$${pkgs[key].price.toLocaleString()}`;
            }
          }
        }
      });
    },

    // 1. Theme Discovery Card Binding
    bindThemeCards() {
      const themeCards = document.querySelectorAll('.wedding-theme-card');
      themeCards.forEach(card => {
        card.addEventListener('click', () => {
          const themeKey = card.getAttribute('data-theme-key');
          if (!themeKey) return;

          themeCards.forEach(c => {
            c.classList.remove('active', 'ring-2', 'ring-[#D6B887]', 'scale-[1.02]');
            const checkIcon = c.querySelector('.theme-active-check');
            if (checkIcon) checkIcon.classList.add('hidden');
          });

          card.classList.add('active', 'ring-2', 'ring-[#D6B887]', 'scale-[1.02]');
          const checkIcon = card.querySelector('.theme-active-check');
          if (checkIcon) checkIcon.classList.remove('hidden');

          this.selectTheme(themeKey);
        });
      });
    },

    selectTheme(themeKey) {
      this.state.selectedTheme = themeKey;
      const themes = (window.Storage ? Storage.getWeddingThemes() : null) || {};
      const theme = themes[themeKey];

      if (theme) {
        this.state.customColors.primary = theme.colors[0];
        this.state.customColors.secondary = theme.colors[1];
        this.state.customColors.accent = theme.colors[2];
        this.state.customColors.name = theme.name;

        // Apply theme's curated decor preset
        const preset = THEME_DECOR_PRESETS[themeKey];
        if (preset) {
          Object.keys(preset).forEach(cat => {
            this.state.customOptions[cat] = preset[cat];
            this.updateDecorButtonActive(cat, preset[cat]);
          });
        }

        // Switch 360 panorama scene
        this.loadPanoScene(theme.panorama, theme.name);

        // Update theme narrative badges
        this.syncThemeToUI(themeKey);
        this.calculatePricing();
      }
    },

    updateDecorButtonActive(category, optionKey) {
      const siblings = document.querySelectorAll(`.wedding-decor-option[data-decor-cat="${category}"]`);
      siblings.forEach(s => {
        s.classList.remove('active', 'border-[#D6B887]', 'bg-[#D6B887]/15', 'text-white');
        s.classList.add('border-white/10', 'text-gray-300');
        const pill = s.querySelector('.px-2.py-0.5');
        if (pill && pill.textContent.includes('+$')) {
          pill.classList.remove('bg-[#D6B887]', 'text-[#17151A]');
          pill.classList.add('bg-white/10', 'text-gray-300');
        }
      });

      const activeBtn = document.querySelector(`.wedding-decor-option[data-decor-cat="${category}"][data-decor-opt="${optionKey}"]`);
      if (activeBtn) {
        activeBtn.classList.add('active', 'border-[#D6B887]', 'bg-[#D6B887]/15', 'text-white');
        activeBtn.classList.remove('border-white/10', 'text-gray-300');
        const pill = activeBtn.querySelector('.px-2.py-0.5');
        if (pill && pill.textContent.includes('+$')) {
          pill.classList.add('bg-[#D6B887]', 'text-[#17151A]');
          pill.classList.remove('bg-white/10', 'text-gray-300');
        }
      }
    },

    syncThemeToUI(themeKey) {
      const themes = (window.Storage ? Storage.getWeddingThemes() : null) || {};
      const theme = themes[themeKey];
      if (!theme) return;

      const titleEl = document.getElementById('weddingStudioThemeTitle');
      const subtitleEl = document.getElementById('weddingStudioThemeSubtitle');
      const panoramaLabel = document.getElementById('weddingPanoSceneLabel');
      const themeInput = document.getElementById('enquiryThemeInput');
      const swatchesWrap = document.getElementById('weddingColorSwatches');

      if (titleEl) titleEl.textContent = theme.name;
      if (subtitleEl) subtitleEl.textContent = theme.subtitle;
      if (panoramaLabel) panoramaLabel.textContent = `${theme.name} • 360° Spatial Experience`;
      if (themeInput) themeInput.value = theme.name;

      if (swatchesWrap && theme.colors) {
        swatchesWrap.innerHTML = theme.colors.map((c, i) => `
          <div class="color-swatch-card group flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer ${i === 0 ? 'ring-2 ring-[#D6B887]' : ''}" data-color-val="${c}" data-color-label="${theme.colorNames[i] || 'Palette'}">
            <span class="w-6 h-6 rounded-full border border-[#D6B887]/60 shadow-inner shrink-0 group-hover:scale-110 transition-transform" style="background-color: ${c}"></span>
            <div class="text-[11px] leading-tight">
              <span class="font-bold text-white block">${theme.colorNames[i] || 'Palette Color'}</span>
              <span class="text-[#D6B887] font-mono text-[9px] uppercase">${c}</span>
            </div>
          </div>
        `).join('');

        // Make color swatches interactive
        swatchesWrap.querySelectorAll('.color-swatch-card').forEach(sc => {
          sc.addEventListener('click', () => {
            swatchesWrap.querySelectorAll('.color-swatch-card').forEach(s => s.classList.remove('ring-2', 'ring-[#D6B887]'));
            sc.classList.add('ring-2', 'ring-[#D6B887]');
            const col = sc.getAttribute('data-color-val');
            const label = sc.getAttribute('data-color-label');
            this.state.customColors.primary = col;
            if (window.showToast) {
              window.showToast(`Selected ${label} (${col}) as keynote celebration color accent.`, 'info');
            }
          });
        });
      }
    },

    // 2. Pannellum 360-Degree Panorama Viewer Controller
    initPannellumViewer() {
      const viewerContainer = document.getElementById('weddingPanoViewer');
      if (!viewerContainer) return;

      const themes = (window.Storage ? Storage.getWeddingThemes() : null) || {};
      const activeTheme = themes[this.state.selectedTheme] || {};
      const initialPano = activeTheme.panorama || 'assets/images/panorama-wedding-luxury-360.jpg';

      if (window.pannellum) {
        try {
          viewerContainer.innerHTML = '';
          this.panoViewer = pannellum.viewer('weddingPanoViewer', {
            type: 'equirectangular',
            panorama: initialPano,
            autoLoad: true,
            autoRotate: 0,
            showControls: true,
            showZoomCtrl: true,
            showFullscreenCtrl: true,
            mouseZoom: false,
            hfov: 105,
            minHfov: 50,
            maxHfov: 125,
            yaw: 0,
            pitch: 0,
            compass: true,
            hotSpots: [
              {
                pitch: -2,
                yaw: 12,
                type: 'info',
                text: 'Royal Ceremonial Stage & Haute Floral Arch',
                URL: 'javascript:void(0)'
              },
              {
                pitch: 24,
                yaw: -28,
                type: 'info',
                text: 'Austrian Cascading Crystal Chandeliers (2700K Warm Dimmer)',
                URL: 'javascript:void(0)'
              },
              {
                pitch: -16,
                yaw: 82,
                type: 'info',
                text: 'Imperial Banqueting Tables with 24k Gold Cutlery & Crystal',
                URL: 'javascript:void(0)'
              },
              {
                pitch: -6,
                yaw: -130,
                type: 'info',
                text: 'Grand Foyer & Mirrored Monogram Entrance Gate',
                URL: 'javascript:void(0)'
              }
            ]
          });

          // Graceful fallback listener on WebGL or cross-origin texture load notices
          if (this.panoViewer && this.panoViewer.on) {
            this.panoViewer.on('error', (err) => {
              console.warn('Pannellum texture notice, activating tactile engine:', err);
              this.isPannellumLoaded = false;
              this.initTactileFallback(viewerContainer, initialPano);
            });
          }

          this.isPannellumLoaded = true;
        } catch (e) {
          console.warn('Pannellum WebGL initialization notice, activating tactile engine:', e);
          this.isPannellumLoaded = false;
          this.initTactileFallback(viewerContainer, initialPano);
        }
      } else {
        this.isPannellumLoaded = false;
        this.initTactileFallback(viewerContainer, initialPano);
      }
    },

    loadPanoScene(imagePath, sceneTitle) {
      if (this.panoViewer && this.isPannellumLoaded) {
        try {
          this.panoViewer.destroy();
        } catch (err) {}
      }
      this.initPannellumViewer();
    },

    // Viewpoint Navigation (Stage, Dining, Entrance, Ballroom)
    bindViewpointNav() {
      const viewpointBtns = document.querySelectorAll('.pano-viewpoint-btn');
      viewpointBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = btn.getAttribute('data-viewpoint');
          
          viewpointBtns.forEach(b => {
            b.classList.remove('bg-[#D6B887]', 'text-[#17151A]', 'font-bold');
            b.classList.add('bg-black/60', 'text-white/80');
          });
          btn.classList.add('bg-[#D6B887]', 'text-[#17151A]', 'font-bold');
          btn.classList.remove('bg-black/60', 'text-white/80');

          if (this.panoViewer && this.isPannellumLoaded) {
            switch (target) {
              case 'ballroom':
                this.panoViewer.lookAt(0, 0, 105, 900);
                break;
              case 'stage':
                this.panoViewer.lookAt(-2, 12, 80, 900);
                break;
              case 'dining':
                this.panoViewer.lookAt(-16, 82, 85, 900);
                break;
              case 'entrance':
                this.panoViewer.lookAt(-6, -130, 85, 900);
                break;
            }
          } else if (this.tactileStrip) {
            // Viewpoint navigation support in tactile mode
            const container = document.getElementById('weddingPanoViewer');
            const h = container ? container.offsetHeight : 540;
            const tileW = h * (16 / 9);
            let targetOffset = 0;
            switch (target) {
              case 'ballroom': targetOffset = 0; break;
              case 'stage': targetOffset = -tileW * 0.35; break;
              case 'dining': targetOffset = -tileW * 0.70; break;
              case 'entrance': targetOffset = -tileW * 1.05; break;
            }
            this.tactileStrip.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            this.tactileStrip.style.transform = `translateX(${targetOffset}px)`;
            this.tactileCurrentX = targetOffset;
            setTimeout(() => {
              if (this.tactileStrip) this.tactileStrip.style.transition = '';
            }, 650);
          }
        });
      });
    },

    // Tactile Fallback Viewer (High-res smooth panoramic drag for mobile & touch)
    initTactileFallback(container, initialImage) {
      container.innerHTML = `
        <div class="relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[#17151A] touch-pan-y">
          <div class="tactile-pano-strip flex h-full will-change-transform">
            <img src="${initialImage}" class="h-full w-auto max-w-none block pointer-events-none" alt="360 Panorama Tile 1">
            <img src="${initialImage}" class="h-full w-auto max-w-none block pointer-events-none" alt="360 Panorama Tile 2">
            <img src="${initialImage}" class="h-full w-auto max-w-none block pointer-events-none" alt="360 Panorama Tile 3">
            <img src="${initialImage}" class="h-full w-auto max-w-none block pointer-events-none" alt="360 Panorama Tile 4">
          </div>
          <div class="absolute bottom-4 left-4 pointer-events-none px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#D6B887]/40 text-[#D6B887] text-xs font-semibold flex items-center gap-2 shadow-xl">
            <i data-lucide="hand" class="w-3.5 h-3.5 text-[#D6B887]"></i>
            <span>Drag horizontally to explore 360°</span>
          </div>
        </div>
      `;

      if (window.lucide) {
        lucide.createIcons({ root: container });
      }

      const strip = container.querySelector('.tactile-pano-strip');
      this.tactileStrip = strip;
      let isDragging = false;
      let startX = 0;
      let currentX = this.tactileCurrentX || -320;

      const getTileW = () => {
        const firstImg = strip?.querySelector('img');
        if (firstImg && firstImg.offsetWidth > 100) return firstImg.offsetWidth;
        return (container.offsetHeight || 540) * (16 / 9);
      };

      const onStart = (x) => {
        isDragging = true;
        startX = x;
        container.classList.add('cursor-grabbing');
        if (strip) strip.style.transition = '';
      };

      const onMove = (x) => {
        if (!isDragging) return;
        const dx = x - startX;
        startX = x;
        currentX += dx;
        const tileW = getTileW();
        if (tileW > 0) {
          currentX = ((currentX % tileW) - tileW) % tileW;
        }
        this.tactileCurrentX = currentX;
        if (strip) strip.style.transform = `translateX(${currentX}px)`;
      };

      const onEnd = () => {
        isDragging = false;
        container.classList.remove('cursor-grabbing');
      };

      // Mouse drag
      container.addEventListener('mousedown', (e) => onStart(e.clientX));
      window.addEventListener('mousemove', (e) => onMove(e.clientX));
      window.addEventListener('mouseup', onEnd);

      // Mobile touch drag
      container.addEventListener('touchstart', (e) => {
        if (e.touches[0]) onStart(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (e.touches[0]) onMove(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchend', onEnd);

      // Initial transform
      if (strip) strip.style.transform = `translateX(${currentX}px)`;
    },

    // 3. Package Card Binding
    bindPackageCards() {
      const packageCards = document.querySelectorAll('.wedding-package-card');
      packageCards.forEach(card => {
        card.addEventListener('click', () => {
          const pkgKey = card.getAttribute('data-package-key');
          if (!pkgKey) return;

          packageCards.forEach(c => {
            c.classList.remove('ring-2', 'ring-[#D6B887]', 'bg-white/10');
            const selectPill = c.querySelector('.pkg-select-pill');
            if (selectPill) {
              selectPill.textContent = 'Select Package';
              selectPill.classList.remove('bg-[#D6B887]', 'text-[#17151A]');
              selectPill.classList.add('border', 'border-[#D6B887]/50', 'text-[#D6B887]');
            }
          });

          card.classList.add('ring-2', 'ring-[#D6B887]', 'bg-white/10');
          const selectPill = card.querySelector('.pkg-select-pill');
          if (selectPill) {
            selectPill.textContent = 'Selected';
            selectPill.classList.add('bg-[#D6B887]', 'text-[#17151A]');
            selectPill.classList.remove('border', 'border-[#D6B887]/50', 'text-[#D6B887]');
          }

          this.state.selectedPackage = pkgKey;
          this.calculatePricing();
        });
      });
    },

    // 4. Venue Dropdown Selection
    bindVenueSelect() {
      const venueSelect = document.getElementById('weddingVenueSelect');
      if (venueSelect) {
        venueSelect.addEventListener('change', (e) => {
          this.state.selectedVenue = e.target.value;
          this.calculatePricing();
        });
      }
    },

    // 5. Guest Count Slider
    bindGuestCountSlider() {
      const slider = document.getElementById('weddingGuestCountSlider');
      const readout = document.getElementById('weddingGuestCountReadout');
      const enquiryGuestInput = document.getElementById('enquiryGuestInput');

      if (slider) {
        slider.addEventListener('input', (e) => {
          const count = parseInt(e.target.value, 10);
          this.state.guestCount = count;
          if (readout) readout.textContent = `${count} Guests`;
          if (enquiryGuestInput) enquiryGuestInput.value = count;
          this.calculatePricing();
        });
      }
    },

    // 6. Interactive Decor Options Customizer
    bindDecorOptions() {
      const decorBtns = document.querySelectorAll('.wedding-decor-option');
      decorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const category = btn.getAttribute('data-decor-cat');
          const optionKey = btn.getAttribute('data-decor-opt');
          if (!category || !optionKey) return;

          this.updateDecorButtonActive(category, optionKey);
          this.state.customOptions[category] = optionKey;
          this.calculatePricing();
        });
      });
    },

    // 7. Live Real-Time Price Calculator Engine
    calculatePricing() {
      const packages = (window.Storage ? Storage.getWeddingPackages() : null) || {};
      const activePackage = packages[this.state.selectedPackage] || { price: 5800, name: 'Luxury Wedding' };
      const activeVenue = VENUE_CATALOG[this.state.selectedVenue] || VENUE_CATALOG['ballroom'];

      const packageBase = activePackage.price;
      const venueFee = activeVenue.baseFee;
      const guestServiceRate = 35; // $35 per guest table, glassware, service fee
      const guestTotal = this.state.guestCount * guestServiceRate;

      // Calculate Custom Decor Upgrades
      let upgradesTotal = 0;
      const decorSummaryItems = [];

      Object.keys(this.state.customOptions).forEach(cat => {
        const selectedOptKey = this.state.customOptions[cat];
        if (DECOR_CATALOG[cat] && DECOR_CATALOG[cat][selectedOptKey]) {
          const item = DECOR_CATALOG[cat][selectedOptKey];
          upgradesTotal += item.price;
          if (item.price > 0) {
            decorSummaryItems.push(`${item.name} (+$${item.price.toLocaleString()})`);
          } else {
            decorSummaryItems.push(item.name);
          }
        }
      });

      const grandTotal = packageBase + venueFee + guestTotal + upgradesTotal;
      const depositAmount = Math.round(grandTotal * 0.3);

      // Update Calculator DOM Elements
      const pkgPriceEl = document.getElementById('calcPackagePrice');
      const venuePriceEl = document.getElementById('calcVenuePrice');
      const guestPriceEl = document.getElementById('calcGuestPrice');
      const upgradesPriceEl = document.getElementById('calcUpgradesPrice');
      const grandTotalEl = document.getElementById('calcGrandTotal');
      const depositEl = document.getElementById('calcDepositAmount');

      if (pkgPriceEl) pkgPriceEl.textContent = `$${packageBase.toLocaleString()}`;
      if (venuePriceEl) venuePriceEl.textContent = `$${venueFee.toLocaleString()}`;
      if (guestPriceEl) guestPriceEl.textContent = `$${guestTotal.toLocaleString()}`;
      if (upgradesPriceEl) upgradesPriceEl.textContent = `+$${upgradesTotal.toLocaleString()}`;
      if (grandTotalEl) grandTotalEl.textContent = `$${grandTotal.toLocaleString()}`;
      if (depositEl) depositEl.textContent = `$${depositAmount.toLocaleString()}`;

      // Update Enquiry Form Synced Inputs
      const enquiryPkgInput = document.getElementById('enquiryPackageInput');
      const enquiryPriceInput = document.getElementById('enquiryPriceInput');
      const enquiryDecorSummary = document.getElementById('enquiryDecorSummary');
      const enquiryThemeInput = document.getElementById('enquiryThemeInput');
      const enquiryGuestInput = document.getElementById('enquiryGuestInput');

      if (enquiryPkgInput) enquiryPkgInput.value = `${activePackage.name} ($${packageBase.toLocaleString()})`;
      if (enquiryPriceInput) enquiryPriceInput.value = `$${grandTotal.toLocaleString()}`;
      if (enquiryDecorSummary) enquiryDecorSummary.value = decorSummaryItems.join(' • ');
      if (enquiryThemeInput) enquiryThemeInput.value = this.state.customColors.name;
      if (enquiryGuestInput) enquiryGuestInput.value = this.state.guestCount;
    },

    // 8. Luxury Booking Enquiry Submission
    bindEnquiryForm() {
      const form = document.getElementById('weddingEnquiryForm');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span>Locking In Atelier Itinerary...</span>
          `;
        }

        setTimeout(() => {
          const clientName = document.getElementById('enquiryClientName')?.value || 'Discerning Couple';
          const clientEmail = document.getElementById('enquiryClientEmail')?.value || 'client@example.com';
          const clientPhone = document.getElementById('enquiryClientPhone')?.value || '+1 (555) 000-0000';
          const weddingDate = document.getElementById('enquiryWeddingDate')?.value || '2027-06-20';
          const notes = document.getElementById('enquiryNotes')?.value || 'Requested Bespoke 360 Consultation.';

          const packages = (window.Storage ? Storage.getWeddingPackages() : null) || {};
          const activePkg = packages[this.state.selectedPackage] || { name: 'Luxury Wedding' };
          const activeVenue = VENUE_CATALOG[this.state.selectedVenue] || VENUE_CATALOG['ballroom'];
          const grandTotal = document.getElementById('calcGrandTotal')?.textContent || '$16,400';

          const newBooking = {
            customerName: clientName,
            customerEmail: clientEmail,
            customerPhone: clientPhone,
            eventType: 'Luxury Wedding Reception',
            eventName: `${clientName} • ${this.state.customColors.name} Wedding`,
            venueType: activeVenue.name,
            location: activeVenue.name,
            date: weddingDate,
            time: '17:00',
            guests: this.state.guestCount,
            theme: this.state.customColors.name,
            package: activePkg.name,
            price: parseInt(grandTotal.replace(/[^0-9]/g, ''), 10) || 16400,
            notes: `Decor Customizations: ${document.getElementById('enquiryDecorSummary')?.value || 'Bespoke'}. Client Notes: ${notes}`
          };

          let savedBooking = newBooking;
          if (window.Storage) {
            savedBooking = Storage.addBooking(newBooking) || newBooking;
          }

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
          }

          this.showConfirmationModal(savedBooking);
          form.reset();

          // Re-sync readonly calculator values after reset
          this.calculatePricing();
          this.syncThemeToUI(this.state.selectedTheme);
        }, 750);
      });
    },

    // 9. Luxury Confirmation Modal
    showConfirmationModal(booking) {
      const modal = document.getElementById('weddingConfirmationModal');
      if (!modal) {
        alert(`Thank you, ${booking.customerName}! Your luxury wedding design consultation has been reserved.`);
        return;
      }

      const refIdEl = document.getElementById('confModalRefId');
      const coupleEl = document.getElementById('confModalCouple');
      const themeEl = document.getElementById('confModalTheme');
      const pkgEl = document.getElementById('confModalPackage');
      const priceEl = document.getElementById('confModalPrice');
      const dateEl = document.getElementById('confModalDate');

      if (refIdEl) refIdEl.textContent = booking.id || `WED-2026-${Math.floor(100 + Math.random() * 900)}`;
      if (coupleEl) coupleEl.textContent = booking.customerName;
      if (themeEl) themeEl.textContent = booking.theme;
      if (pkgEl) pkgEl.textContent = booking.package;
      if (priceEl) priceEl.textContent = `$${booking.price.toLocaleString()}`;
      if (dateEl) dateEl.textContent = booking.date;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    },

    initModalDismissal() {
      const modal = document.getElementById('weddingConfirmationModal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
          }
        });
      }
    }
  };

  // Expose globally and boot on DOM ready
  window.WeddingPlatform = WeddingPlatform;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WeddingPlatform.init());
  } else {
    WeddingPlatform.init();
  }

})();
