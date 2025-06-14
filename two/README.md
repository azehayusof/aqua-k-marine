# Aqua K Marine Services Header

This is a detailed header section for the Aqua K Marine Services website, designed according to the brand's style guide and logo elements.

## Files included

- `index.html` - HTML structure for the header
- `styles.css` - CSS styling for the header
- `script.js` - JavaScript functionality for the header

## Image Resources

The header and content sections use images from the main directory of the project. The following images are used:

- `../main logo.jpeg` - Used as the logo in the header
- `../images/kota-kinabalu-port.jpeg` - Used as the hero section background
- Various staff/service images for the service cards

## Features

- Fixed position header that stays at top when scrolling
- Responsive design that adapts to all device sizes
- Logo with hover effect
- Navigation menu with dropdown functionality
- Call-to-action button with ripple effect
- Mobile-friendly hamburger menu
- Subtle wave animation at the bottom of the header
- Hero section with overlay and text
- Service preview cards with hover effects

## Header Components

### Logo Area (Left Side)
- Positioned top-left with proper padding
- Sized appropriately (75px height) with proper border radius
- Links back to homepage when clicked
- Has a slight pulse/glow effect on hover

### Navigation Menu (Center)
- Clean, sans-serif typography in navy blue
- Horizontally aligned menu items with appropriate spacing
- Current page indicator with anchor icon
- Dropdown functionality for Services menu
- Mobile version collapses to hamburger menu

### Right Side Elements
- Contact information with phone icon and number
- Vertical divider line
- "Request Pilot Services" CTA button in red
- Button has hover and ripple effects

## Color Palette

The header uses the following color palette:

- Navy blue (#001432) - For text and primary elements
- Light blue (#4B9CD3) - For secondary elements and accents
- Very light blue (#E6F2FA) - For backgrounds and subtle elements
- Red (#E63946) - For CTA buttons and highlights
- White (#FFFFFF) - For text on dark backgrounds and main background

## Responsive Behavior

- Desktop: Full layout with all elements visible
- Tablet (max-width: 1024px): Slightly reduced spacing, maintained structure
- Small Tablet (max-width: 900px): Navigation collapses to hamburger menu
- Mobile (max-width: 768px): Compact layout with essentials only
- Small Mobile (max-width: 480px): Further reduced sizing for small screens

## Browser Compatibility

Tested and compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Usage Notes

To add new menu items, simply add a new `<li>` element to the `.menu-items` list in the HTML. For dropdown menus, use the `.has-dropdown` class and include a nested `<ul>` with the `.dropdown-menu` class.

### Modifying the Hero Section

The hero section uses a background image from the images directory. To change the background image:

1. Select an appropriate image from the `/images` directory
2. Update the `background-image` URL in the hero section of the HTML

### Adding Service Cards

To add or modify service cards:

1. Follow the existing HTML structure in the service-preview section
2. Select images from the `/images` directory
3. Specify appropriate alt text and headings for each card 