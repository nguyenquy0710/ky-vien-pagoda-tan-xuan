// Load and display campaign detail
let currentCampaign = null;

// HTML escape function to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Get campaign ID from URL
function getCampaignIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load campaign detail
async function loadCampaignDetail() {
    const campaignId = getCampaignIdFromUrl();
    
    if (!campaignId) {
        showCampaignNotFound();
        return;
    }
    
    try {
        const response = await fetch('./data/charity-campaigns.json');
        const data = await response.json();
        const campaign = data.campaigns.find(c => c.id === campaignId);
        
        if (!campaign) {
            showCampaignNotFound();
            return;
        }
        
        currentCampaign = campaign;
        displayCampaignDetail(campaign);
        updateMetaTags(campaign);
    } catch (error) {
        console.error('Error loading campaign detail:', error);
        showCampaignNotFound();
    }
}

// Display campaign detail
function displayCampaignDetail(campaign) {
    const content = document.getElementById('campaignContent');
    const percentage = (campaign.currentAmount / campaign.targetAmount * 100).toFixed(0);
    const statusClass = campaign.status === 'active' ? 'status-active' : 'status-completed';
    const statusText = campaign.status === 'active' ? 'Đang diễn ra' : 'Đã hoàn thành';
    
    // Format dates
    const startDate = new Date(campaign.startDate).toLocaleDateString('vi-VN');
    const endDate = new Date(campaign.endDate).toLocaleDateString('vi-VN');
    
    content.innerHTML = `
        <div class="campaign-header">
            <div class="campaign-header-image">
                <img src="${escapeHtml(campaign.image)}" alt="${escapeHtml(campaign.title)}" loading="lazy">
                <div class="campaign-status-badge ${statusClass}">
                    ${statusText}
                </div>
            </div>
            <div class="campaign-header-info">
                <h1 class="campaign-detail-title">${escapeHtml(campaign.title)}</h1>
                <p class="campaign-detail-description">${escapeHtml(campaign.description)}</p>
                
                <div class="campaign-meta">
                    <div class="meta-item">
                        <span class="meta-icon">📍</span>
                        <div class="meta-content">
                            <span class="meta-label">Địa điểm</span>
                            <span class="meta-value">${escapeHtml(campaign.location)}</span>
                        </div>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">📅</span>
                        <div class="meta-content">
                            <span class="meta-label">Thời gian</span>
                            <span class="meta-value">${startDate} - ${endDate}</span>
                        </div>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">👥</span>
                        <div class="meta-content">
                            <span class="meta-label">Người thụ hưởng</span>
                            <span class="meta-value">${campaign.beneficiaries.toLocaleString('vi-VN')} người</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="campaign-body">
            <div class="campaign-main">
                <div class="campaign-section">
                    <h2 class="section-heading">Các hoạt động trong chiến dịch</h2>
                    <ul class="activity-list">
                        ${campaign.activities.map(activity => `
                            <li class="activity-item">
                                <span class="activity-icon">✓</span>
                                <span class="activity-text">${escapeHtml(activity)}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="campaign-section">
                    <h2 class="section-heading">Điểm nổi bật</h2>
                    <div class="highlights-grid">
                        ${campaign.highlights.map(highlight => `
                            <div class="highlight-card">
                                <span class="highlight-icon">⭐</span>
                                <p class="highlight-text">${escapeHtml(highlight)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="campaign-sidebar">
                <div class="donation-card">
                    <h3 class="donation-card-title">Tiến độ quyên góp</h3>
                    
                    <div class="campaign-progress-detail">
                        <div class="progress-circle">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" class="progress-circle-bg" />
                                <circle cx="50" cy="50" r="40" class="progress-circle-fill" 
                                    style="stroke-dasharray: ${percentage * 2.51327}, 251.327" />
                            </svg>
                            <div class="progress-circle-text">
                                <span class="progress-circle-percentage">${percentage}%</span>
                            </div>
                        </div>
                        
                        <div class="progress-amounts">
                            <div class="amount-item">
                                <span class="amount-label">Đã quyên góp</span>
                                <span class="amount-value current">${formatCurrency(campaign.currentAmount)}</span>
                            </div>
                            <div class="amount-item">
                                <span class="amount-label">Mục tiêu</span>
                                <span class="amount-value target">${formatCurrency(campaign.targetAmount)}</span>
                            </div>
                            ${campaign.status === 'active' ? `
                                <div class="amount-item">
                                    <span class="amount-label">Còn thiếu</span>
                                    <span class="amount-value remaining">${formatCurrency(campaign.targetAmount - campaign.currentAmount)}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${campaign.status === 'active' ? `
                        <button class="btn btn-primary btn-block" id="donateButton" data-campaign-title="${escapeHtml(campaign.title)}">
                            💝 Đóng góp ngay
                        </button>
                        <p class="donation-note">Mọi đóng góp đều có ý nghĩa và được trân trọng</p>
                    ` : `
                        <div class="completed-badge">
                            <span class="completed-icon">✓</span>
                            <span class="completed-text">Chiến dịch đã hoàn thành</span>
                        </div>
                    `}
                </div>
                
                <div class="share-card">
                    <h3 class="share-card-title">Chia sẻ chiến dịch</h3>
                    <p class="share-card-description">Hãy chia sẻ để nhiều người biết đến và cùng chung tay</p>
                    <div class="share-buttons">
                        <button class="share-btn facebook" onclick="shareOnFacebook()">
                            <span class="share-icon">f</span>
                            Facebook
                        </button>
                        <button class="share-btn copy" onclick="copyLink()">
                            <span class="share-icon">🔗</span>
                            Sao chép link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Update breadcrumb
    document.getElementById('breadcrumbTitle').textContent = campaign.title;
    
    // Add event listener for donate button if it exists
    const donateButton = document.getElementById('donateButton');
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            const campaignTitle = this.getAttribute('data-campaign-title');
            openDonationModalWithCampaign(campaignTitle);
        });
    }
}

// Show campaign not found
function showCampaignNotFound() {
    document.getElementById('campaignContent').style.display = 'none';
    document.getElementById('campaignNotFound').style.display = 'block';
    document.querySelector('.back-to-list').style.display = 'none';
}

// Update meta tags for SEO
function updateMetaTags(campaign) {
    document.getElementById('pageTitle').textContent = `${campaign.title} | Chùa Kỳ Viên - Xã Tân Xuân`;
    document.getElementById('metaDescription').setAttribute('content', campaign.description);
    document.getElementById('ogTitle').setAttribute('content', campaign.title);
    document.getElementById('ogDescription').setAttribute('content', campaign.description);
    document.getElementById('twitterTitle').setAttribute('content', campaign.title);
    document.getElementById('twitterDescription').setAttribute('content', campaign.description);
}

// Format currency in Vietnamese
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Open donation modal with campaign name
function openDonationModalWithCampaign(campaignTitle) {
    const modal = document.getElementById('donationModal');
    const contentElement = document.getElementById('donationContent');
    
    if (modal) {
        if (contentElement) {
            // Safely set text content (automatically escapes HTML)
            contentElement.textContent = `${campaignTitle} - Chùa Kỳ Viên`;
        }
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Share on Facebook
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

// Copy link to clipboard
function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast('Đã sao chép link vào clipboard!');
    }).catch(err => {
        console.error('Error copying link:', err);
        showToast('Không thể sao chép link. Vui lòng thử lại.');
    });
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCampaignDetail();
});
