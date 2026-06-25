# 🍜 Tuổi Mới Eats — Restaurant Website

> A modern, responsive, single-page restaurant website for Tuổi Mới Eats — an authentic Vietnamese cafe in Humayunpur, Safdarjung, New Delhi.

---

## 📋 Project Overview

This is a **static single-page website** built for a newly opened Vietnamese restaurant. It showcases the brand, menu, ambiance, and customer reviews. The site is fully responsive, mobile-friendly, and includes smooth animations and an auto-scrolling reviews carousel.

**Live Demo:** [https://tuoimoieats.netlify.app](https://tuoimoieats.netlify.app)

---

## 🧰 Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Page structure |
| **Tailwind CSS** (via CDN) | Utility-first styling and responsive design |
| **Custom CSS** (`style.css`) | Animations, transitions, carousel styling |
| **Vanilla JavaScript** (`script.js`) | Mobile menu toggle, scroll animations, reviews carousel |
| **Google Fonts** | Quicksand (headers) + Inter (body text) |
| **SVG Icons** | Phone, Instagram, location, direction icons |
| **Netlify** (Free Hosting) | Deployment and hosting |

---

## 📁 Project Structure

---

## 🎨 Brand Colors (Tailwind Custom Colors)

These colors are defined in the Tailwind config inside `index.html`:

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| `tm-green` | `#0b7a3f` | Primary brand green |
| `tm-cream` | `#fdf5e6` | Page background |
| `tm-warm` | `#f5deb3` | Section backgrounds |
| `tm-red` | `#9b2c2c` | Headers, accents, buttons |
| `tm-wood` | `#8b5a2b` | Borders, dividers |
| `tm-dark` | `#2D2A26` | Body text |

---

## 📱 Features

### 1. Responsive Navigation
- Fixed navbar with brand logo
- Desktop menu (The Vibe, Menu, Reviews, Contact links)
- Mobile hamburger menu with smooth toggle

### 2. Hero Section
- Tagline: "A Little Slice of Hanoi in Delhi."
- Call-to-action buttons: View Menu, Call / WhatsApp
- Decorative floating elements
- Pet-friendly badge

### 3. About Section ("The Vibe")
- Interior photo
- Brand story and ambiance description

### 4. Digital Menu
- Categorized menu (Small Bites, Salads, Meals, Drinks, Desserts)
- Price display with dot leaders
- Vegetarian (▣) and Contains Egg (▤) indicators
- Interactive hover/click animation on menu items

### 5. Reviews Carousel (Auto-Scrolling)
- **Continuous smooth scroll** (pixel-by-pixel animation)
- **Infinite loop** with no jumps or cut-off reviews
- **Responsive**: 1 review (mobile), 2 (tablet), 3 (desktop)
- **Auto-play**: Starts on load, pauses on hover
- **Navigation**: Previous/Next buttons (snap to full cards)
- **Rounded carousel container** (rounded-2xl)

### 6. Footer
- Address, opening hours, phone number (clickable)
- Directions link (Google Maps)
- Instagram follow link

---

## 🧠 How the Reviews Carousel Works

### HTML Structure
- A single track (`#reviewTrack`) contains all reviews **duplicated twice** (Set A + Set B).
- This duplication creates a seamless infinite loop illusion.

### CSS
- `display: flex` with `gap-6` between cards.
- `transition: transform 1000ms linear` for smooth movement.
- `line-clamp-4` ensures consistent review height.

### JavaScript Logic
1. **Position Tracking**: `position` variable moves continuously at `speed = 1.2` pixels per frame.
2. **Reset Mechanism**: When `position` reaches `totalWidth` (width of one full set), it instantly resets to `0` without visual jump (using `transition: none` + force reflow).
3. **Auto-Play**: `setInterval(moveTrack, 30)` runs at ~33fps for smooth movement.
4. **Pause on Hover**: `mouseenter` stops auto-play, `mouseleave` resumes.
5. **Prev/Next Buttons**: Snap to the nearest full card using modulo calculation and smooth `800ms` transition.

---

## 🛠️ How to Customize

### Update Menu Items
- Edit the menu section inside `index.html` (search for `<!-- ===== MENU ===== -->`).
- Each dish is inside a `<div class="menu-item-card">`.
- Update dish name, description, price, and dietary icons (`▣` or `▤`).

### Update Reviews
- Find the reviews section (`<!-- ===== REVIEWS CAROUSEL ===== -->`).
- Each review is in a `<div class="review-card">`.
- To add a review, duplicate an existing card and update:
  - Name, date, rating (★★★★★), review text, and rating badges.

### Change Colors
- Open `index.html` and find the `tailwind.config` script.
- Update the hex codes in the `colors` object.

### Adjust Carousel Speed
- In `script.js`, find `const speed = 1.2;`
- Increase for faster scrolling, decrease for slower.

### Change Auto-Play Interval
- In `script.js`, find `setInterval(moveTrack, 30);`
- Change `30` to adjust frame rate (lower = faster, higher = slower).

---

## 🚀 Deployment

### Netlify (Free)
1. Drag and drop your project folder to [Netlify](https://app.netlify.com/drop).
2. Or connect your GitHub repository for automatic deploys.

### Custom Domain (Recommended)
1. Buy a domain from Namecheap or Hostinger (~₹1,000/year).
2. In Netlify, go to **Site Settings > Domain Management > Add custom domain**.
3. Update DNS records at your domain registrar to point to Netlify's nameservers.

---

## 📝 Maintenance Checklist

| Task | Frequency |
|------|-----------|
| Update menu prices | Monthly or as needed |
| Add new reviews | As they come in |
| Update opening hours | If changed |
| Check phone number | Verify correctness |
| Review/update images | Seasonal or as needed |
| Test responsiveness | After any change |

---

## 🧪 Testing

1. **Mobile Responsiveness**: Test on Chrome DevTools (iPhone, Android, iPad).
2. **Carousel**: Verify smooth scrolling, hover pause, button navigation.
3. **Menu Hover**: Ensure hover/click animations work on touch devices.
4. **Links**: Confirm phone, Instagram, and directions open correctly.

---

## 📞 Contact

For support, maintenance, or modifications:
- **Developer:** Manav Kumar
- **Email:** [manav.kumar@excitel.com](mailto:manav.kumar@excitel.com)
- **Phone:** [Add your number]

---

## 📄 License

This project is for the exclusive use of **Tuổi Mới Eats**.
All rights reserved. © 2026

---

## 🙌 Acknowledgments

- **Tuổi Mới Eats** team for the brand vision and content.
- **Google Fonts** for typography.
- **Tailwind CSS** for responsive utilities.
- **Netlify** for free hosting.

---

**Built with ❤️ and a lot of Vietnamese coffee.**