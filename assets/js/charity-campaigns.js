// Load and display charity campaigns
let allCampaigns = [];
let currentFilter = 'all';

// Load campaigns from JSON
async function loadCampaigns() {
    try {
        const response = await fetch('./data/charity-campaigns.json');
        const data = await response.json();
        allCampaigns = data.campaigns;
        displayCampaigns(allCampaigns);
    } catch (error) {
        console.error('Error loading campaigns:', error);
        showNoCampaignsMessage();
    }
}

// Display campaigns based on filter
function displayCampaigns(campaigns) {
    const grid = document.getElementById('campaignsGrid');
    const noCampaigns = document.getElementById('noCampaigns');
    
    if (!campaigns || campaigns.length === 0) {
        grid.innerHTML = '';
        noCampaigns.style.display = 'block';
        return;
    }
    
    noCampaigns.style.display = 'none';
    
    grid.innerHTML = campaigns.map(campaign => {
        const percentage = (campaign.currentAmount / campaign.targetAmount * 100).toFixed(0);
        const statusClass = campaign.status === 'active' ? 'status-active' : 'status-completed';
        const statusText = campaign.status === 'active' ? 'Đang diễn ra' : 'Đã hoàn thành';
        
        return `
            <div class="campaign-card" data-status="${campaign.status}">
                <div class="campaign-image">
                    <img src="${campaign.image}" alt="${campaign.title}" loading="lazy">
                    <div class="campaign-status ${statusClass}">
                        ${statusText}
                    </div>
                </div>
                <div class="campaign-info">
                    <h3 class="campaign-title">${campaign.title}</h3>
                    <p class="campaign-description">${campaign.shortDescription}</p>
                    
                    <div class="campaign-location">
                        <span class="icon">📍</span>
                        <span>${campaign.location}</span>
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
                        <a href="./charity-campaign-detail.html?id=${campaign.id}" class="btn btn-primary">Xem chi tiết</a>
                        ${campaign.status === 'active' ? '<button class="btn btn-secondary" onclick="openDonationModal()">Đóng góp</button>' : ''}
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
function openDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) {
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
