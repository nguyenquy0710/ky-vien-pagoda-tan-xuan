// Menu loader - Dynamically loads and renders menu from JSON
(function() {
    'use strict';

    // Determine if we're on the index page or external page
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                        window.location.pathname === '/' || 
                        window.location.pathname.endsWith('/ky-vien-pagoda-tan-xuan/');

    // Get current page for active state
    const currentPage = window.location.pathname;

    // Load and render menu
    async function loadMenu() {
        try {
            const response = await fetch('./data/menus.json');
            const menuData = await response.json();
            
            renderMainMenu(menuData.mainMenu);
            renderFooterMenus(menuData.footerMenu);
        } catch (error) {
            console.error('Error loading menu:', error);
            // Fallback to default menu if JSON fails to load
            renderDefaultMenu();
        }
    }

    // Render main navigation menu
    function renderMainMenu(menuItems) {
        const navMenu = document.getElementById('navMenu');
        if (!navMenu) return;

        navMenu.innerHTML = '';

        menuItems.forEach(item => {
            const li = document.createElement('li');
            
            if (item.hasDropdown) {
                li.className = 'nav-item-dropdown';
                
                // Create main link
                const link = document.createElement('a');
                link.href = isIndexPage ? item.url : item.urlExternal;
                link.className = 'nav-link';
                
                // Check if this menu or any submenu is active
                const isActive = checkIfMenuActive(item);
                if (isActive) {
                    link.classList.add('active');
                }
                
                link.textContent = item.label;
                li.appendChild(link);

                // Create dropdown menu
                const dropdown = document.createElement('ul');
                dropdown.className = 'dropdown-menu';

                item.submenu.forEach(subItem => {
                    const subLi = document.createElement('li');
                    const subLink = document.createElement('a');
                    subLink.href = isIndexPage ? subItem.url : subItem.urlExternal;
                    subLink.className = 'dropdown-link';
                    
                    // Check if this submenu item is active
                    if (checkIfSubmenuActive(subItem)) {
                        subLink.classList.add('active');
                    }
                    
                    subLink.textContent = subItem.label;
                    subLi.appendChild(subLink);
                    dropdown.appendChild(subLi);
                });

                li.appendChild(dropdown);
            } else {
                // Regular menu item without dropdown
                const link = document.createElement('a');
                link.href = isIndexPage ? item.url : item.urlExternal;
                link.className = 'nav-link';
                
                // Check if this menu is active
                if (checkIfMenuActive(item)) {
                    link.classList.add('active');
                }
                
                link.textContent = item.label;
                li.appendChild(link);
            }

            navMenu.appendChild(li);
        });
    }

    // Check if a menu item should be active
    function checkIfMenuActive(item) {
        // Check for gallery page
        if (item.id === 'gallery' && currentPage.includes('gallery.html')) {
            return true;
        }
        
        // Check for charity pages (campaigns list or detail)
        if (item.id === 'services' && 
            (currentPage.includes('charity-campaigns.html') || 
             currentPage.includes('charity-campaign-detail.html'))) {
            return true;
        }
        
        // Check for home/index page
        if (item.id === 'home' && (currentPage.endsWith('index.html') || 
                                    currentPage === '/' || 
                                    currentPage.endsWith('/ky-vien-pagoda-tan-xuan/'))) {
            return true;
        }
        
        return false;
    }

    // Check if a submenu item should be active
    function checkIfSubmenuActive(subItem) {
        // Check for charity pages
        if (subItem.id === 'charity' && 
            (currentPage.includes('charity-campaigns.html') || 
             currentPage.includes('charity-campaign-detail.html'))) {
            return true;
        }
        
        return false;
    }

    // Render footer menus
    function renderFooterMenus(footerData) {
        // Render footer links
        const footerLinksContainer = document.querySelector('.footer-links');
        if (footerLinksContainer) {
            renderFooterSection(footerLinksContainer, footerData.links);
        }

        // Render footer activities
        const footerActivitiesContainer = document.querySelectorAll('.footer-links')[1];
        if (footerActivitiesContainer) {
            renderFooterSection(footerActivitiesContainer, footerData.activities);
        }
    }

    // Render a footer section
    function renderFooterSection(container, items) {
        if (!container) return;
        
        container.innerHTML = '';
        
        items.forEach(item => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = isIndexPage ? item.url : item.urlExternal;
            link.textContent = item.label;
            li.appendChild(link);
            container.appendChild(li);
        });
    }

    // Fallback default menu if JSON fails
    function renderDefaultMenu() {
        console.warn('Using fallback default menu');
        // Keep existing static menu as fallback
    }

    // Initialize menu when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMenu);
    } else {
        loadMenu();
    }
})();
