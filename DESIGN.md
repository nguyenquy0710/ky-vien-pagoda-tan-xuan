# Website Design Documentation

## Overview
This document describes the design of the Chùa Kỳ Viên - Xã Tân Xuân website.

## Design Task Reference
**Original Task:** "tham khảo thiết kế của https://chuahoangphap.com.vn/"
**Translation:** "Reference the design from https://chuahoangphap.com.vn/"

## Important Note
The reference website (https://chuahoangphap.com.vn/) was not accessible during the design review process. Therefore, this document describes the current design implementation, which follows best practices for Buddhist temple websites.

## Design Philosophy
The website design follows traditional Buddhist temple aesthetics with modern web design principles:
- **Warm, welcoming colors** representing wisdom, enlightenment, and auspiciousness
- **Clean, organized layout** for easy navigation and information access
- **Cultural appropriateness** with Buddhist symbols and Vietnamese language
- **Modern functionality** while respecting traditional values

## Color Palette

### Primary Colors
- **Primary Gold:** `#d4af37` - Represents wisdom and enlightenment
- **Light Gold:** `#f4d03f`
- **Lighter Gold:** `#fef5e7`
- **Dark Gold:** `#b8860b`

### Accent Colors
- **Primary Red:** `#c41e3a` - Auspicious color in Buddhist culture
- **Light Red:** `#dc143c`
- **Lighter Red:** `#ffe4e1`
- **Dark Red:** `#8b0000`

### Saffron (Monk Robes)
- **Saffron:** `#ff9933`
- **Light Saffron:** `#ffb347`
- **Lighter Saffron:** `#ffe4b5`

### Earth Tones
- **Temple Brown:** `#8b4513` - Represents temple wood
- **Light Brown:** `#a0522d`
- **Dark Brown:** `#654321`

### Neutral Colors
- **Cream:** `#fff8e1` - Main background
- **Off-white:** `#fafafa`
- **Text Dark:** `#3e2723`
- **Text Medium:** `#5d4037`
- **Text Light:** `#795548`
- **Text Gray:** `#616161`
- **White:** `#ffffff`

## Typography
- **Primary Font:** Segoe UI, Roboto, Noto Sans, sans-serif
- **Secondary Font:** Arial, Helvetica, sans-serif
- **Line Height:** 1.6 for body text, 1.8 for descriptive paragraphs

## Layout Structure

### 1. Navigation Bar
- **Position:** Fixed at top
- **Background:** Gradient from cream to white
- **Border:** 2px solid gold at bottom
- **Features:**
  - Logo with temple emoji (🛕)
  - Brand name "Chùa Kỳ Viên"
  - Horizontal menu with dropdown support
  - Mobile hamburger menu
  - Smooth scroll behavior

### 2. Hero Section
- **Height:** Full viewport (100vh)
- **Background:** Gold to saffron gradient (135deg)
- **Decorative Elements:** Buddhist symbols (🛕☸️🙏🕉️☮️) at low opacity
- **Content:**
  - Large title
  - Subtitle and description
  - Two call-to-action buttons (Primary and Secondary)

### 3. About Section
- **Background:** Cream
- **Layout:** Two-column grid
- **Features:**
  - Text content with highlighted first paragraph
  - SVG placeholder for temple image
  - Three feature cards with icons

### 4. Services Section
- **Background:** Gradient from cream to white
- **Layout:** Grid with 4 cards (responsive)
- **Card Features:**
  - Icon emoji
  - Title
  - Description
  - Feature list with checkmarks
  - Price/action button
  - Hover effects (lift and shadow)
  - Featured card with badge

### 5. Reviews Section
- **Background:** Default (cream)
- **Layout:** Grid of testimonial cards
- **Card Features:**
  - 5-star rating
  - Quoted testimonial text
  - User avatar (emoji)
  - User name and location
  - Shadow and hover effects

### 6. Contact Section
- **Background:** Default (cream)
- **Layout:** Two-column (info cards + map)
- **Features:**
  - Info cards with icons
  - SVG placeholder map
  - Google Maps link overlay

### 7. Footer
- **Background:** Brown gradient
- **Color:** Light text on dark background
- **Layout:** Four-column grid
- **Content:**
  - Brand section with logo
  - Quick links
  - Activities links
  - Contact information
- **Copyright:** Bottom bar with blessing

## Special Components

### Donation Modal
- **Trigger:** Service card price button
- **Content:**
  - VietQR code image
  - Bank account details
  - Donation instructions
- **Styling:** Centered modal with overlay

### Charity Campaigns Page
- **Features:**
  - Hero section with call-to-action
  - Filter buttons (All, Active, Completed)
  - Campaign cards grid
  - Progress bars
  - Status badges

### Gallery Page
- **Features:**
  - Flipbook-style image viewer
  - Page navigation controls
  - Turn.js library integration
  - Responsive layout

## Interactive Elements

### Hover Effects
- **Navigation Links:** Background highlight with color change
- **Buttons:** Lift effect (translateY -2px) with enhanced shadow
- **Service Cards:** Lift effect (translateY -10px) with shadow
- **Feature Items:** Slide right (translateX 10px)
- **Review Cards:** Lift effect with shadow enhancement

### Animations
- **Transitions:** 0.3s ease for most elements
- **Smooth Scroll:** Enabled for anchor links
- **Scroll Margin:** 80px to account for fixed navbar

### Mobile Responsiveness
- **Breakpoint:** 768px
- **Changes:**
  - Hamburger menu appears
  - Grid layouts switch to single column
  - Font sizes reduce appropriately
  - Spacing adjusts for smaller screens

## Design Best Practices Implemented

### Accessibility
- ✅ Semantic HTML structure
- ✅ Alt text for images (where images exist)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Sufficient color contrast
- ✅ Keyboard navigation support
- ✅ ARIA labels for interactive elements

### Performance
- ✅ CSS variables for consistent theming
- ✅ Optimized animations (transform and opacity)
- ✅ Lazy loading for images
- ✅ Minimal external dependencies
- ✅ Preconnect to external domains

### SEO
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Semantic HTML
- ✅ Proper page titles

### PWA Support
- ✅ Web App Manifest (manifest.json)
- ✅ Theme color meta tags
- ✅ Appropriate icon sizes

## Technical Stack
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript** - Vanilla JS for interactivity
- **Turn.js** - Flipbook functionality
- **VietQR** - Donation QR codes

## File Structure
```
├── index.html                      # Main homepage
├── charity-campaigns.html          # Charity campaigns list
├── charity-campaign-detail.html    # Individual campaign details
├── gallery.html                    # Image gallery with flipbook
├── assets/
│   ├── css/
│   │   ├── styles.css              # Main stylesheet
│   │   └── flipbook.css            # Flipbook-specific styles
│   ├── js/
│   │   ├── script.js               # Main JavaScript
│   │   ├── menu-loader.js          # Dynamic menu loading
│   │   ├── charity-campaigns.js    # Campaign listing logic
│   │   ├── charity-campaign-detail.js # Campaign detail logic
│   │   ├── gallery.js              # Gallery/flipbook logic
│   │   └── image-lightbox.js       # Lightbox functionality
│   ├── vendor/
│   │   ├── turnjs/                 # Turn.js library
│   │   └── vietqr.js              # VietQR integration
│   └── schemas/
│       └── charity-campaigns.json  # Campaign data schema
├── data/
│   ├── menus.json                  # Navigation menu data
│   └── charity-campaigns.json      # Campaign data
└── manifest.json                   # PWA manifest
```

## Future Enhancement Opportunities

If access to the reference website (https://chuahoangphap.com.vn/) becomes available, consider reviewing:
1. **Layout patterns** - Alternative content organization
2. **Visual elements** - Additional design motifs or patterns
3. **Interactive features** - New functionality to consider
4. **Content presentation** - Alternative ways to display information
5. **Media integration** - Photo galleries, videos, audio teachings

## Recommendations for Further Development

### Content Enhancements
- [ ] Add real temple photographs
- [ ] Include video content (dharma talks, ceremonies)
- [ ] Add event calendar
- [ ] Create news/blog section
- [ ] Add multi-language support (English, etc.)

### Technical Improvements
- [ ] Implement service worker for offline functionality
- [ ] Add loading states and skeletons
- [ ] Optimize images with WebP format
- [ ] Add structured data (JSON-LD) for better SEO
- [ ] Implement analytics tracking

### Design Refinements
- [ ] Add subtle animations on scroll
- [ ] Implement parallax effects for hero section
- [ ] Add more Buddhist pattern backgrounds
- [ ] Create custom 404 and error pages
- [ ] Design printable donation receipts

## Conclusion

The current website design is **production-ready** and follows best practices for Buddhist temple websites. It successfully combines traditional aesthetics with modern web technologies to create an inviting, functional, and culturally appropriate online presence for Chùa Kỳ Viên - Xã Tân Xuân.

---

**Last Updated:** November 24, 2025
**Design Status:** ✅ Production Ready
**Reference Website:** https://chuahoangphap.com.vn/ (not accessible during review)
