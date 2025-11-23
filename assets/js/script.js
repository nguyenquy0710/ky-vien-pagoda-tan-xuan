// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.getElementById('navMenu').classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Add initial styles for animation (gallery-item excluded as they're loaded dynamically)
    const animatedElements = document.querySelectorAll('.service-card, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Load gallery and reviews when DOM is ready
    loadGallery();
    loadReviews();
});


// Active navigation link highlight
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveNavLink);
window.addEventListener('load', highlightActiveNavLink);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        // console.info(`scroll -> .hero -> transform: translateY(${scrolled * 0.5}px)`);
        // hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
}

// Service card hover effect enhancement
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Load and render gallery from JSON
async function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const flipbook = document.getElementById('flipbook');

    // Check if we're on the flipbook page
    if (flipbook) {
        await loadFlipbook();
        return;
    }

    if (!galleryGrid) {
        console.info('Gallery grid element not found');
        return;
    }

    try {
        const response = await fetch('/assets/images.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Clear existing content using replaceChildren for consistency
        galleryGrid.replaceChildren();

        // Create and append gallery items
        data.images.forEach(image => {
            const galleryItem = createGalleryItem(image);
            galleryGrid.appendChild(galleryItem);
        });

        // Re-apply intersection observer for new items
        applyGalleryAnimations();

    } catch (error) {
        console.error('Error loading gallery:', error);
        // Show user-friendly error message using DOM methods for security
        const errorMsg = document.createElement('p');
        errorMsg.className = 'gallery-error-message';
        errorMsg.textContent = 'Không thể tải thư viện hình ảnh. Vui lòng thử lại sau.';
        galleryGrid.replaceChildren(errorMsg);
    }
}

// Load and initialize flipbook with pure JavaScript
async function loadFlipbook() {
    const flipbook = document.getElementById('flipbook');

    if (!flipbook) {
        console.error('Flipbook element not found');
        return;
    }

    try {
        const response = await fetch('/assets/images.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let currentPage = 0;

        // Create cover page
        const coverPage = document.createElement('div');
        coverPage.className = 'page cover-page active';
        coverPage.innerHTML = `
            <div class="page-content">
                <h2>Thư Viện Hình Ảnh</h2>
                <p>Vườn Trái Cây Ông Sang</p>
                <p class="page-hint">← → để lật trang</p>
            </div>
        `;
        flipbook.appendChild(coverPage);

        // Create pages from images
        data.images.forEach((image, index) => {
            const page = document.createElement('div');
            page.className = 'page';
            const safeTitle = String(image.title || '').slice(0, 100);
            const safeAlt = String(image.alt || image.title || 'Gallery image').slice(0, 100);
            const safeSrc = String(image.src || '').slice(0, 500);
            const safeDescription = String(image.description || '').slice(0, 200);

            page.innerHTML = `
                <div class="page-content">
                    <img src="${safeSrc}" alt="${safeAlt}" loading="lazy" />
                    <div class="page-caption">
                        <h3>${safeTitle}</h3>
                        <p>${safeDescription}</p>
                    </div>
                </div>
            `;
            flipbook.appendChild(page);
        });

        // Add back cover
        const backCover = document.createElement('div');
        backCover.className = 'page back-cover-page';
        backCover.innerHTML = `
            <div class="page-content">
                <p>Cảm ơn bạn đã xem</p>
                <p class="emoji">🍊</p>
            </div>
        `;
        flipbook.appendChild(backCover);

        const pages = flipbook.querySelectorAll('.page');
        const totalPages = pages.length;

        // Show current page function
        function showPage(pageIndex) {
            pages.forEach((page, index) => {
                page.classList.remove('active', 'flipping-out', 'flipping-in');
                if (index === pageIndex) {
                    page.classList.add('active');
                } else if (index < pageIndex) {
                    page.classList.add('flipped');
                } else {
                    page.classList.remove('flipped');
                }
            });
            updatePageDisplay(pageIndex + 1, totalPages);
        }

        // Navigate to next page
        function nextPage() {
            if (currentPage < totalPages - 1) {
                pages[currentPage].classList.add('flipping-out');
                setTimeout(() => {
                    currentPage++;
                    showPage(currentPage);
                }, 300);
            }
        }

        // Navigate to previous page
        function prevPage() {
            if (currentPage > 0) {
                // Add animation class to current page before going back
                pages[currentPage].classList.add('flipping-in');
                setTimeout(() => {
                    currentPage--;
                    showPage(currentPage);
                    // Force removal of flipped class from the page we're going back to
                    pages[currentPage].classList.remove('flipped');
                }, 300);
            }
        }

        // Setup navigation
        document.getElementById('prevBtn').addEventListener('click', prevPage);
        document.getElementById('nextBtn').addEventListener('click', nextPage);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevPage();
            if (e.key === 'ArrowRight') nextPage();
        });

        // Initialize first page
        showPage(0);

    } catch (error) {
        console.error('Error loading flipbook:', error);
        flipbook.innerHTML = '<p class="gallery-error-message">Không thể tải thư viện hình ảnh. Vui lòng thử lại sau.</p>';
    }
}

// Update page display
function updatePageDisplay(page, total) {
    const display = document.getElementById('pageDisplay');
    if (display) {
        display.textContent = `Trang ${page} / ${total}`;
    }
}

// Create a gallery item element from image data
function createGalleryItem(image) {
    // Validate and sanitize input data
    const safeDescription = String(image.description || '').slice(0, 200);
    const safeTitle = String(image.title || '').slice(0, 100);
    const safeAlt = String(image.alt || image.title || 'Gallery image').slice(0, 100);
    const safeSrc = String(image.src || '').slice(0, 500);

    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('title', safeDescription);

    // Create image element
    const img = document.createElement('img');
    img.src = safeSrc;
    img.alt = safeAlt;
    img.loading = 'lazy'; // Enable lazy loading for performance

    // Add error handling for images that fail to load
    img.addEventListener('error', () => {
        img.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.textContent = '🖼️ Không thể tải ảnh';
        item.appendChild(placeholder);
    });

    // Create caption if title exists
    if (safeTitle) {
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = safeTitle;
        item.appendChild(img);
        item.appendChild(caption);
    } else {
        item.appendChild(img);
    }

    return item;
}

// Apply animations to gallery items
function applyGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);

        // Re-apply click event for zoom effect
        item.addEventListener('click', () => {
            const isZoomed = item.classList.contains('zoomed');

            // Reset all other items
            galleryItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('zoomed');
                }
            });

            // Toggle current item - add if not zoomed, remove if already zoomed
            if (isZoomed) {
                item.classList.remove('zoomed');
            } else {
                item.classList.add('zoomed');
            }
        });
    });
}

// Load and render reviews from JSON
async function loadReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');

    if (!reviewsGrid) {
        console.info('Reviews grid element not found');
        return;
    }

    try {
        const response = await fetch('/data/feedback-buddhist-followers.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Clear existing content
        reviewsGrid.replaceChildren();

        // Create and append review cards
        data.reviews.forEach(review => {
            const reviewCard = createReviewCard(review);
            reviewsGrid.appendChild(reviewCard);
        });

        // Re-apply intersection observer for new items
        applyReviewsAnimations();

    } catch (error) {
        console.error('Error loading reviews:', error);
        // Show user-friendly error message
        const errorMsg = document.createElement('p');
        errorMsg.className = 'gallery-error-message';
        errorMsg.textContent = 'Không thể tải phản hồi từ phật tử. Vui lòng thử lại sau.';
        reviewsGrid.replaceChildren(errorMsg);
    }
}

// Create a review card element from review data
function createReviewCard(review) {
    // Validate and sanitize input data
    const id = parseInt(review?.id ?? 0) || 0;
    const safeText = String(review.text || '').slice(0, 500);
    const safeAvatar = String(review.author?.avatar || '👤').slice(0, 10);
    const safeName = String(review.author?.info?.name || 'Anonymous').slice(0, 100);
    const safeAddress = String(review.author?.info?.address || '').slice(0, 100);
    const stars = Math.min(Math.max(parseInt(review.stars) || 5, 1), 5);

    const card = document.createElement('div');
    card.className = 'review-card';
    card.setAttribute('data-review-id', id);

    // Create stars element
    const starsDiv = document.createElement('div');
    starsDiv.className = 'review-stars';
    starsDiv.textContent = '⭐'.repeat(stars);

    // Create review text
    const textP = document.createElement('p');
    textP.className = 'review-text';
    textP.textContent = safeText;

    // Create author section
    const authorDiv = document.createElement('div');
    authorDiv.className = 'review-author';

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'author-avatar';
    avatarDiv.textContent = safeAvatar;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'author-info';

    const nameH4 = document.createElement('h4');
    nameH4.textContent = `Phật tử ${safeName}`;

    const addressP = document.createElement('p');
    addressP.textContent = safeAddress;

    infoDiv.appendChild(nameH4);
    infoDiv.appendChild(addressP);

    authorDiv.appendChild(avatarDiv);
    authorDiv.appendChild(infoDiv);

    card.appendChild(starsDiv);
    card.appendChild(textP);
    card.appendChild(authorDiv);

    return card;
}

// Apply animations to review cards
function applyReviewsAnimations() {
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Donation Modal functionality
const donationModal = document.getElementById('donationModal');
const donationBtn = document.getElementById('donationBtn');
const modalClose = document.querySelector('.modal-close');

// Open modal when donation button is clicked
if (donationBtn) {
    donationBtn.addEventListener('click', () => {
        donationModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
}

// Close modal when X is clicked
if (modalClose) {
    modalClose.addEventListener('click', () => {
        donationModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    });
}

// Close modal when clicking outside the modal content
if (donationModal) {
    donationModal.addEventListener('click', (e) => {
        if (e.target === donationModal) {
            donationModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && donationModal.classList.contains('show')) {
        donationModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Console message
console.log('%c🍊 Chùa Kỳ Viên - Xã Tân Xuân 🍊', 'color: #ff9800; font-size: 24px; font-weight: bold;');
console.log('%cChào mừng bạn đến với website của chúng tôi!', 'color: #2e7d32; font-size: 16px;');
console.log('%cTrải nghiệm thiên nhiên miệt vườn đích thực 🌳', 'color: #66bb6a; font-size: 14px;');
