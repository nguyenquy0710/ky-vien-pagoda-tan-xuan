// Load and display charity campaigns
let allCampaigns = [];
let currentFilter = 'all';

// Utility to get random color for placeholder images (if needed)
function getRandomColor() {
    // Tạo màu hex ngẫu nhiên (RRGGBB)
    const letters = "0123456789ABCDEF";
    let color = "";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Generate random placeholder image URL with random bg and fg colors and custom text
 * @param {*} text Text to display on the placeholder image
 * @returns {string} URL of the generated placeholder image
 */
function getRandomPlaceholdURL(text = "Demo") {
    let bg = getRandomColor();
    if (bg.toLowerCase() === '4CAF50'.toLowerCase()) {
        bg = getRandomColor();
    }
    const fg = getRandomColor();
    return `https://placehold.co/800x600/${bg}/${fg}?text=${encodeURIComponent(text)}`;
}

// HTML escape function to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Load campaigns from JSON file
 */
async function loadCampaigns() {
    try {
        const response = await fetch('./data/charity-campaigns.json');
        const data = await response.json();
        allCampaigns = data.campaigns;

        // Thứ tự ưu tiên trạng thái
        const statusOrder = {
            'active': 1,
            'pending': 2,
            'completed': 3
        };

        // Sắp xếp
        allCampaigns.sort((a, b) => {
            // Ưu tiên status trước
            const statusDiff = statusOrder[a.status] - statusOrder[b.status];
            if (statusDiff !== 0) return statusDiff;

            // Nếu status giống nhau, sắp theo startDate giảm dần
            return new Date(b.startDate) - new Date(a.startDate);
        });

        // Hiển thị tất cả chiến dịch ban đầu (lọc theo trạng thái "all")
        displayCampaigns(allCampaigns);
    } catch (error) {
        console.error('Error loading campaigns:', error);

        // Hiển thị thông báo không có chiến dịch nếu có lỗi
        showNoCampaignsMessage();
    }
}

/**
 * Display campaigns in the grid
 * @param {*} campaigns Array of campaign objects to display
 * @returns {void}
 */
function displayCampaigns(campaigns) {
    const grid = document.getElementById('campaignsGrid');
    const noCampaigns = document.getElementById('noCampaigns');

    if (!campaigns || campaigns.length === 0) {
        grid.innerHTML = '';
        noCampaigns.style.display = 'block';
        return;
    }

    // Hide no campaigns message if campaigns exist
    noCampaigns.style.display = 'none';

    // Generate HTML for each campaign and insert into grid container
    grid.innerHTML = campaigns.map(campaign => {
        const percentage = (campaign.currentAmount / campaign.targetAmount * 100).toFixed(0);
        const statusClass = campaign.status === 'active' ? 'status-active' : 'status-completed';
        const statusText = campaign.status === 'active' ? 'Đang diễn ra' : 'Đã hoàn thành';
        const safeCampaignId = encodeURIComponent(campaign.id);
        const safeImageUrl = `${(campaign.imageUrl || getRandomPlaceholdURL(campaign.title)).trim()}`;

        return `
            <div class="campaign-card" data-id="${escapeHtml(safeCampaignId)}" data-status="${escapeHtml(campaign.status)}">
                <div class="campaign-image">
                    <img src="${safeImageUrl}" alt="${escapeHtml(campaign.title)}" loading="lazy">
                    <div class="campaign-status ${statusClass}">
                        ${statusText}
                    </div>
                </div>
                <div class="campaign-info">
                    <h3 class="campaign-title"><a href="./charity-campaign-detail.html?id=${safeCampaignId}" style="text-decoration: none; color: var(--text-dark);">${escapeHtml(campaign.title)}</a></h3>
                    <p class="campaign-description">${escapeHtml(campaign.shortDescription)}</p>
                    
                    <div class="campaign-location">
                        <span class="icon">📍</span>
                        <span>${escapeHtml(campaign.location)}</span>
                    </div>
                    
                    <div class="campaign-stats">
                        <div class="stat">
                            <span class="stat-icon">👥</span>
                            <span class="stat-value">${campaign.beneficiaries.toLocaleString('vi-VN')}</span>
                            <span class="stat-label">người được hỗ trợ</span>
                        </div>
                    </div>
                    
                    <div class="campaign-progress">
                        <div class="progress-header">
                            <span class="progress-label">Đã đạt được</span>
                            <span class="progress-percentage">${percentage}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <div class="progress-details">
                            <span class="current-amount">${formatCurrency(campaign.currentAmount)}</span>
                            <span class="target-amount">/ ${formatCurrency(campaign.targetAmount)}</span>
                        </div>
                    </div>
                    
                    <div class="campaign-actions">
                        <a href="./charity-campaign-detail.html?id=${safeCampaignId}" class="btn btn-primary">Xem chi tiết</a>
                        ${campaign.status === 'active' ? `<button class="btn btn-secondary" onclick="openDonationModal('${escapeHtml(campaign.title)}')">Đóng góp</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Filter campaigns
function filterCampaigns(status) {
    currentFilter = status;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.status === status) {
            btn.classList.add('active');
        }
    });

    // Filter campaigns
    if (status === 'all') {
        displayCampaigns(allCampaigns);
    } else {
        const filtered = allCampaigns.filter(campaign => campaign.status === status);
        displayCampaigns(filtered);
    }
}

// Format currency in Vietnamese
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Show no campaigns message
function showNoCampaignsMessage() {
    const grid = document.getElementById('campaignsGrid');
    const noCampaigns = document.getElementById('noCampaigns');
    grid.innerHTML = '';
    noCampaigns.style.display = 'block';
}

// Open donation modal
function openDonationModal(campaignTitle) {
    const modal = document.getElementById('donationModal');
    const contentElement = document.getElementById('donationContent');
    const qrCodeElement = document.getElementById('donationQRCode');

    if (modal) {
        if (contentElement) {
            // Safely set text content (automatically escapes HTML)
            contentElement.textContent = escapeHtml(`${campaignTitle} - Chùa Kỳ Viên`);
        }

        if (qrCodeElement) {
            // Update QR code with campaign title in addInfo parameter to reflect the specific campaign being donated to
            qrCodeElement.src = `https://img.vietqr.io/image/VPB-0375595720-compact2.png?accountName=${encodeURIComponent('Nguyễn Minh Tín')}&addInfo=${encodeURIComponent(`${campaignTitle} - Chùa Kỳ Viên`)}`;
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load campaigns
    loadCampaigns();

    // Add filter button listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterCampaigns(btn.dataset.status);
        });
    });
});
