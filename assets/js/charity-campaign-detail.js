// Load and display campaign detail
let currentCampaign = null;

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

// Generate detailed info sections
function generateDetailedInfoSections(detailedInfo) {
    let html = '';
    
    // General Information Section
    if (detailedInfo.generalInfo) {
        const info = detailedInfo.generalInfo;
        html += `
            <div class="campaign-section detailed-info-section">
                <h2 class="section-heading">📋 Thông tin chung về chiến dịch</h2>
                <div class="info-table">
                    <div class="info-row">
                        <span class="info-label">Đơn vị tổ chức:</span>
                        <span class="info-value">${escapeHtml(info.organizer)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Địa chỉ chùa:</span>
                        <span class="info-value">${escapeHtml(info.templeAddress)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Người đại diện:</span>
                        <span class="info-value">${escapeHtml(info.representative)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Thời gian gây quỹ:</span>
                        <span class="info-value">${escapeHtml(info.fundraisingPeriod)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Thời gian dự kiến đi cứu trợ:</span>
                        <span class="info-value">${escapeHtml(info.reliefTripDate)}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Purpose and Context Section
    if (detailedInfo.purposeAndContext) {
        const purpose = detailedInfo.purposeAndContext;
        html += `
            <div class="campaign-section detailed-info-section">
                <h2 class="section-heading">🎯 Mục đích và Bối cảnh</h2>
                <div class="purpose-context">
                    <div class="context-block">
                        <h3 class="block-title">Bối cảnh</h3>
                        <p class="block-content">${escapeHtml(purpose.context)}</p>
                    </div>
                    <div class="context-block">
                        <h3 class="block-title">Mục tiêu</h3>
                        <p class="block-content">${escapeHtml(purpose.objective)}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gift Package Details Section
    if (detailedInfo.giftPackageDetails && detailedInfo.giftPackageDetails.length > 0) {
        html += `
            <div class="campaign-section detailed-info-section">
                <h2 class="section-heading">🎁 Chi tiết các vật phẩm kêu gọi (Cho 1 phần quà)</h2>
                <p class="section-description">Chùa Kỳ Viên kêu gọi các nhà hảo tâm chung tay đóng góp tịnh tài và phẩm vật. Một phần quà dự kiến bao gồm:</p>
                <div class="gift-package-table">
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>Vật phẩm</th>
                                <th>Số lượng/phần</th>
                                <th>Tổng cộng</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${detailedInfo.giftPackageDetails.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.item)}</strong></td>
                                    <td>${escapeHtml(item.quantity)}</td>
                                    <td>${escapeHtml(item.total)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    // Contact Information Section
    if (detailedInfo.contactInfo) {
        const contact = detailedInfo.contactInfo;
        html += `
            <div class="campaign-section detailed-info-section">
                <h2 class="section-heading">📞 Phương thức đóng góp & Liên hệ</h2>
                <p class="section-description">Để ủng hộ cho chiến dịch, quý mạnh thường quân có thể liên hệ qua các kênh sau:</p>
                <div class="contact-methods">
        `;
        
        // Bank Transfer Info
        if (contact.bankTransfer) {
            const bank = contact.bankTransfer;
            html += `
                <div class="contact-block">
                    <h3 class="block-title">💳 Chuyển khoản ngân hàng</h3>
                    <div class="bank-details">
                        <div class="bank-detail-item">
                            <span class="detail-label">Số tài khoản:</span>
                            <span class="detail-value">${escapeHtml(bank.accountNumber)}</span>
                        </div>
                        <div class="bank-detail-item">
                            <span class="detail-label">Ngân hàng:</span>
                            <span class="detail-value">${escapeHtml(bank.bank)}</span>
                        </div>
                        <div class="bank-detail-item">
                            <span class="detail-label">Chủ tài khoản:</span>
                            <span class="detail-value">${escapeHtml(bank.accountHolder)}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Phone Numbers
        if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            html += `
                <div class="contact-block">
                    <h3 class="block-title">📱 Số điện thoại liên hệ trực tiếp</h3>
                    <div class="phone-list">
                        ${contact.phoneNumbers.map(phone => `
                            <div class="phone-item">
                                <span class="phone-name">${escapeHtml(phone.name)}:</span>
                                <a href="tel:${phone.number.replace(/[^\d]/g, '')}" class="phone-number">${escapeHtml(phone.number)}</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    return html;
}

// Display campaign detail
function displayCampaignDetail(campaign) {
    const content = document.getElementById('campaignContent');
    const percentage = (campaign.currentAmount / campaign.targetAmount * 100).toFixed(0);
    const statusClass = campaign.status === 'active' ? 'status-active' : 'status-completed';
    const statusText = campaign.status === 'active' ? 'Đang diễn ra' : 'Đã hoàn thành';
    const safeCampaignId = encodeURIComponent(campaign.id);
    const safeImageUrl = `${(campaign.imageUrl || getRandomPlaceholdURL(campaign.title)).trim()}`;

    // Format dates
    const startDate = new Date(campaign.startDate).toLocaleDateString('vi-VN');
    const endDate = new Date(campaign.endDate).toLocaleDateString('vi-VN');

    content.innerHTML = `
        <div class="campaign-header">
            <div class="campaign-header-image">
                <img src="${safeImageUrl}" alt="${escapeHtml(campaign.title)}" loading="lazy">
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
                
                ${campaign.detailedInfo ? generateDetailedInfoSections(campaign.detailedInfo) : ''}
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
        donateButton.addEventListener('click', function () {
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
    const qrCodeElement = document.getElementById('donationQRCode');

    if (modal) {
        if (contentElement) {
            // Safely set text content (automatically escapes HTML)
            contentElement.textContent = `${campaignTitle} - Chùa Kỳ Viên`;
        }

        if (qrCodeElement) {
            // Update QR code with campaign title in addInfo parameter to reflect the specific campaign being donated to
            qrCodeElement.src = `https://img.vietqr.io/image/VPB-0375595720-compact2.png?accountName=${encodeURIComponent('Nguyễn Minh Tín')}&addInfo=${encodeURIComponent(`${campaignTitle} - Chùa Kỳ Viên`)}`;
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
