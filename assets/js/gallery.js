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
                <p>Chùa Kỳ Viên - Tân Xuân</p>
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
                <p class="emoji">🛕</p>
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
