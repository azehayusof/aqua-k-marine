document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const mainContent = document.querySelector('.main-content');
    
    // Sticky Header on Scroll
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
            mainContent.style.paddingTop = getComputedStyle(document.documentElement).getPropertyValue('--header-height-sticky');
        } else {
            header.classList.remove('sticky');
            mainContent.style.paddingTop = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
        }
    }
    
    // Toggle Mobile Menu
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scrolling when mobile menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Toggle Mobile Dropdown Menus
    function toggleDropdown(event) {
        event.preventDefault();
        
        const dropdownToggle = this;
        const dropdownMenu = dropdownToggle.parentElement.querySelector('.mobile-dropdown-menu');
        
        // Toggle active class for the arrow icon
        dropdownToggle.classList.toggle('active');
        
        // Toggle the dropdown visibility
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    }
    
    // Add Ripple Effect to Buttons
    function createRipple(event) {
        const button = event.currentTarget;
        
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        // Remove existing ripple
        const ripple = button.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Close Mobile Menu on Window Resize (if open)
    function handleResize() {
        if (window.innerWidth > 900 && mobileNav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Add click event to all dropdown toggles
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleDropdown);
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .mobile-cta');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .cta-button, .mobile-cta {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize state (in case page is loaded scrolled down)
    handleScroll();
}); 