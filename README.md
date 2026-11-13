# LUMORA EVENTS — Luxury Event & Birthday Party Planner

> **CELEBRATE EVERY MOMENT**  
> Premium UI/UX Frontend-Only Web Application & Dual Dashboards  
> Built with HTML5, Tailwind CSS, JavaScript (ES6+), Lucide Icons, and Chart.js.

---

## 🌟 Brand Identity & Design System

* **Brand Name**: Lumora Events (*"Plan • Celebrate • Cherish"*)
* **Primary Color**: Deep Plum (`#56334F` with shades `#472841`, `#381E33`, `#2A1526`, `#F9F4F8`)
* **Secondary Color**: Warm Champagne Gold (`#D6B887` with shades `#C29F68`, `#A88349`, `#FAF5ED`)
* **Light Theme Background**: `#FAF8F5`
* **Dark Theme Background**: `#17151A` (Card Dark: `#221E26`, Border Dark: `#352E3C`)
* **Typography**:
  * Headings & Editorial: **Playfair Display** (Serif)
  * Body & Controls: **Plus Jakarta Sans** / **Inter** (Sans-Serif)
* **Icons**: Lucide Icons
* **Charts**: Chart.js 4.x
* **Persistence**: Client-side `localStorage` with automated default seeding

---

## 🗂️ Complete Site Architecture (30+ Pages)

### 1. Public Experience
* [`index.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/index.html) — **Home Page 1 (Classic Event Planner)**: Milestone birthday party hero with balloon & floral arch, service highlights, trust indicators, package cards, and testimonials.
* [`home-premium.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/home-premium.html) — **Home Page 2 (Premium Event Experiences)**: Cinematic beach celebration gazebo hero at sunset, horizontal feature strip, destination showcases, and curated collections.
* [`about.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/about.html) — **About Atelier**: Company heritage, creative directors team, mission, 500+ stats, and floral imagery.
* [`services.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/services.html) — **All Services**: Full catalog of Indoor, Outdoor, Beach, Wedding, Corporate, and Baby Shower celebrations.
* [`service-details.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/service-details.html) — **Service Details**: In-depth specifications, hourly celebration itinerary, inclusions, and interactive FAQs.
* [`themes-packages.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/themes-packages.html) — **Themes & Packages**: 6 curated theme collections (*Pastel Dream, Royal Gold, Tropical Paradise, Enchanted Garden, Elegant White, Kids Fantasy*) + side-by-side package matrix.
* [`gallery.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/gallery.html) — **Signature Gallery**: Category filters (*Birthday, Beach, Wedding, Corporate, Baby Shower*) and interactive Lightbox modal.
* [`pricing.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/pricing.html) — **Pricing & Calculator**: Basic ($99), Premium ($199 Popular), Luxury ($299), plus a real-time interactive budget estimator.
* [`blog.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/blog.html) — **The Celebration Journal**: Event ideas, floral color psychology, and styling guides.
* [`blog-details.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/blog-details.html) — **Article Details**: Complete editorial article with pull quotes, author bio, and comment form.
* [`contact.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/contact.html) — **Contact Concierge**: Direct event inquiry form (persisting to local storage), atelier information, and stylized map.

### 2. Authentication System
* [`login.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/login.html) — **Sign In**: Social login mockups, password visibility toggle, and **1-Click Quick Demo Buttons** for Client & Admin.
* [`register.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/register.html) — **Sign Up**: Full registration form with role selection and client session bootstrap.
* [`forgot-password.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/forgot-password.html) — **Password Reset**: Simulated recovery link dispatch with status toast.

### 3. Client Dashboard (Dedicated SaaS Layout)
* [`client-dashboard.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/client-dashboard.html) — **Client Overview**: Active celebration cards, financial metrics, and upcoming event dossier.
* [`submit-event.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/submit-event.html) — **Submit Event Wizard**: 4-step interactive booking form with live pricing calculation, venue atmosphere, and theme selection.
* [`my-bookings.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/my-bookings.html) — **My Bookings**: Full historical and upcoming booking records, status badges, and event dossier modal.
* [`proposals.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/proposals.html) — **Decor & Menu Proposals**: Interactive proposal viewer with "Approve Concept" and "Switch Menu" triggers.
* [`payments.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/payments.html) — **Payment Installments**: 3-part milestone schedule with demonstration pay buttons and receipt downloads.
* [`notifications.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/notifications.html) — **Notifications**: Read/unread filters, dismiss actions, and "+ Trigger Test Notification".
* [`profile.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/profile.html) — **Host Profile**: Personal details and celebration preferences editor synced to storage.

### 4. Admin Dashboard (Dark Luxe Operations Portal)
* [`admin-dashboard.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-dashboard.html) — **Admin Overview**: Total Users (2,540), Total Events (1,280), Total Orders (980), Chart.js Event Trajectory line chart, and Event Types doughnut chart.
* [`admin-analytics.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-analytics.html) — **Deep Analytics**: Conversion rates, guest averages, and Venue Distribution bar chart.
* [`admin-users.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-users.html) — **Manage Users**: Search, filter, inspect profiles, and modal for adding new hosts.
* [`admin-events.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-events.html) — **Master Event Roster**: Scheduled celebration entries, venue tags, and "Create Event" modal.
* [`admin-bookings.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-bookings.html) — **Bookings & Orders**: Search, status filter, and 1-click status actions (Confirm, In Progress, Delete).
* [`admin-packages.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-packages.html) — **Packages & Themes**: Package price adjusters, catalog status tags, and theme editor.
* [`admin-messages.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-messages.html) — **Inquiries & Messages**: Contact inbox with reply modal and simulated email dispatch.
* [`admin-payments.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-payments.html) — **Payments Ledger**: Financial transaction ledger, margin audit, and CSV export.
* [`admin-settings.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/admin-settings.html) — **Admin Settings**: Brand tokens, currency, and LocalStorage data reset.

### 5. Utility Pages
* [`404.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/404.html) — **Page Not Found**: Luxury illustration and return navigation.
* [`coming-soon.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/coming-soon.html) — **Coming Soon**: Live ticking countdown timer and VIP pre-registration form.
* [`maintenance.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/maintenance.html) — **Maintenance Mode**: Operational status and emergency telephone contacts.

---

## 🚀 Key JavaScript Features & Interactions

1. **Light / Dark Mode**: Synced globally across all 30+ pages via `src/js/theme.js` with `localStorage` memory.
2. **RTL / LTR Mode**: Direction switcher updating `document.documentElement.dir` for multi-language readiness.
3. **Interactive Lightbox**: Fullscreen photo preview with zoom, captions, and Next/Previous navigation in `src/js/gallery.js`.
4. **4-Step Booking Wizard**: Step validation, dynamic price formula calculator, and `Storage.addBooking()` persistence.
5. **Demonstration Authentication**: Quick 1-click login buttons on [`login.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/login.html):
   * **Client Demo**: Loads `sarah.j@example.com` -> opens Client Dashboard.
   * **Admin Demo**: Loads `admin@lumora.events` -> opens Admin Dashboard.
6. **Chart.js Visualizations**: Line chart, Doughnut chart, and Bar chart in the admin panel.
7. **Simulated Installment Payments**: Interactive "Pay Now" actions that update outstanding balances and status badges.
8. **Toast Notifications**: Built-in non-intrusive toast alert system (`showToast(msg, type)`).

---

## 💻 How to View & Preview

Simply double-click or open [`index.html`](file:///d:/Stackly/Event%20&%20birthday%20planners/index.html) in any modern web browser (Chrome, Edge, Safari, Firefox).  
No build tools, Node.js server, or compilation is required.

# Lumora-Events

#   L u m o r a - E v e n t s  
 