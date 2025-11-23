// Image Lightbox - Click to zoom campaign images
(function() {
    'use strict';

    // Create lightbox HTML structure
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.id = 'imageLightbox';
        
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close" title="Đóng (ESC)">✕</button>
            <div class="lightbox-content">
                <img src="" alt="" id="lightboxImage">
            </div>
            <div class="lightbox-caption" id="lightboxCaption" style="display: none;"></div>
        `;
        
        document.body.appendChild(lightbox);
        return lightbox;
    }

    // Initialize lightbox
    function initLightbox() {
        const lightbox = createLightbox();
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        // Function to open lightbox
        function openLightbox(imageSrc, imageAlt) {
            lightboxImage.src = imageSrc;
            lightboxImage.alt = imageAlt;
            
            if (imageAlt && imageAlt.trim()) {
                lightboxCaption.textContent = imageAlt;
                lightboxCaption.style.display = 'block';
            } else {
                lightboxCaption.style.display = 'none';
            }
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Function to close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            
            // Clear image after animation
            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightboxImage.src = '';
                    lightboxImage.alt = '';
                }
            }, 300);
        }

        // Close button click
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        // Click outside image to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Prevent image click from closing
        lightboxImage.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Attach click handlers to campaign images
        function attachImageHandlers() {
            // Select all campaign images
            const campaignImages = document.querySelectorAll('.campaign-image, .campaign-header-image');
            
            campaignImages.forEach(container => {
                const img = container.querySelector('img');
                if (img) {
                    container.style.cursor = 'pointer';
                    
                    container.addEventListener('click', (e) => {
                        // Don't open if clicking on status badge or other elements
                        if (e.target === container || e.target === img) {
                            e.preventDefault();
                            openLightbox(img.src, img.alt);
                        }
                    });
                }
            });
        }

        // Initial attachment
        attachImageHandlers();

        // Re-attach when campaigns are loaded dynamically
        // Use MutationObserver to detect new images added to DOM
        const observer = new MutationObserver((mutations) => {
            let shouldReattach = false;
            
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && (node.classList.contains('campaign-card') || 
                            node.classList.contains('campaign-header'))) {
                            shouldReattach = true;
                        }
                    }
                });
            });
            
            if (shouldReattach) {
                attachImageHandlers();
            }
        });

        // Observe campaigns grid and detail content
        const campaignsGrid = document.getElementById('campaignsGrid');
        const detailContent = document.getElementById('campaignDetailContent');
        
        if (campaignsGrid) {
            observer.observe(campaignsGrid, { childList: true, subtree: true });
        }
        
        if (detailContent) {
            observer.observe(detailContent, { childList: true, subtree: true });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();
