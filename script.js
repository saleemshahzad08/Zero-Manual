// ========================================
// PRODUCTS DATA
// ========================================

const products = [
    {
        id: "workflow1",
        name: "JobMatch Pro",
        shortDescription: "An AI-powered job-matching engine that finds the best tech jobs for you—instantly and personalized.",
        longDescription: "This intelligent job-matching system scans international job listings, including remote and on-premises opportunities, evaluates how well each role aligns with your skills, experience, and certifications, and delivers a beautifully formatted email digest tailored just for you. Instead of endlessly searching job boards, you receive curated, high-scoring opportunities matched to your unique profile—saving time, boosting accuracy, and accelerating your path to career growth.",
        category: "Healthcare",
        image: "images/jobSearch.png",
        tryUrl: "remote-job.html",
        features: [
            "Automatically pulls fresh job opportunities from global APIs, including both remote and on-premises roles",
            "Scores each job from 1–5 based on your skills, experience, and certifications",
            "Condenses job descriptions into clear, readable highlights without losing meaning",
            "Sends you a beautifully structured HTML email with curated job recommendations",
            "No manual searching; just submit your info and receive daily tailored job matches"
        ]
    },
    {
        id: "workflow2",
        name: "Smart Email Classifier",
        shortDescription: "Automatically categorize and prioritize your emails with AI.",
        longDescription: "Transform your inbox management with our Smart Email Classifier. This intelligent workflow uses machine learning to automatically sort, categorize, and prioritize your emails based on content, sender importance, and urgency. Never miss critical messages again and reduce email overload by 80%.",
        category: "Productivity",
        image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&h=600&fit=crop",
        tryUrl: "https://n8n.cloud/webhook/xyz789",
        features: [
            "Automatic email categorization and labeling",
            "Priority inbox based on importance",
            "Smart notifications for urgent messages",
            "Integration with Gmail, Outlook, and more",
            "Learns from your email behavior over time"
        ]
    },
    {
        id: "workflow3",
        name: "Document Intelligence",
        shortDescription: "Extract and analyze data from documents automatically.",
        longDescription: "Our Document Intelligence workflow leverages OCR and AI to extract, analyze, and structure data from any document format. Whether it's invoices, contracts, receipts, or forms, get instant insights and automated data entry into your systems. Perfect for businesses processing high volumes of documents.",
        category: "Business Automation",
        image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",
        tryUrl: "https://n8n.cloud/webhook/doc456",
        features: [
            "OCR technology for text extraction",
            "Support for PDFs, images, and scanned documents",
            "Automatic data structuring and validation",
            "Integration with popular CRM and ERP systems",
            "Batch processing for high-volume operations"
        ]
    },
    {
        id: "workflow4",
        name: "Social Media Manager",
        shortDescription: "Schedule, publish, and analyze social media content effortlessly.",
        longDescription: "Streamline your social media presence with our comprehensive Social Media Manager. This workflow automates posting across multiple platforms, analyzes engagement metrics, suggests optimal posting times, and even generates content ideas based on trending topics. Save hours of manual work while growing your audience.",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        tryUrl: "https://n8n.cloud/webhook/social789",
        features: [
            "Cross-platform posting (Instagram, Twitter, LinkedIn, Facebook)",
            "AI-powered content suggestions",
            "Detailed analytics and engagement tracking",
            "Optimal timing recommendations",
            "Content calendar and scheduling"
        ]
    },
    {
        id: "workflow5",
        name: "Customer Support Bot",
        shortDescription: "Provide instant customer support with AI-powered responses.",
        longDescription: "Enhance your customer service with our intelligent Customer Support Bot. This workflow handles common queries, provides instant responses, escalates complex issues to human agents, and learns from every interaction. Reduce response times by 90% while maintaining high customer satisfaction.",
        category: "Customer Service",
        image: "https://images.unsplash.com/photo-1553775282-20af80779df7?w=800&h=600&fit=crop",
        tryUrl: "https://n8n.cloud/webhook/support123",
        features: [
            "24/7 automated customer support",
            "Natural language understanding",
            "Seamless escalation to human agents",
            "Integration with helpdesk platforms",
            "Multi-channel support (chat, email, social)"
        ]
    },
    {
        id: "workflow6",
        name: "Invoice Automation",
        shortDescription: "Generate, send, and track invoices automatically.",
        longDescription: "Simplify your billing process with our Invoice Automation workflow. Automatically generate professional invoices based on project completion or time tracking data, send them to clients, track payment status, and send gentle reminders for overdue payments. Perfect for freelancers and small businesses.",
        category: "Finance",
        image: "https://images.unsplash.com/photo-1554224311-beee460201f9?w=800&h=600&fit=crop",
        tryUrl: "https://n8n.cloud/webhook/invoice456",
        features: [
            "Automatic invoice generation from time logs",
            "Professional customizable templates",
            "Payment tracking and reminders",
            "Integration with accounting software",
            "Multi-currency support"
        ]
    }
];

// ========================================
// CONFIGURATION
// ========================================

const STORAGE_KEY = 'oneTimeAccess';
const GENERATE_TOKEN_URL = 'https://hussainsaleem.app.n8n.cloud/webhook/generate-token';
const VERIFY_TOKEN_URL = 'https://hussainsaleem.app.n8n.cloud/webhook/tokenVerification';

// ========================================
// AUTHENTICATION & SESSION MANAGEMENT
// ========================================

function isAuthenticated() {
    const session = localStorage.getItem(STORAGE_KEY);
    if (!session) return false;

    try {
        const data = JSON.parse(session);
        return data && data.token;
    } catch (e) {
        return false;
    }
}

function saveSession(token) {
    const sessionData = {
        token: token,
        timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
}

function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
}

function getSession() {
    const session = localStorage.getItem(STORAGE_KEY);
    if (!session) return null;

    try {
        return JSON.parse(session);
    } catch (e) {
        return null;
    }
}

async function verifyToken(token) {
    try {
        const response = await fetch(VERIFY_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token.trim() })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Token verification error:', error);
        throw error;
    }
}

async function requestAccessToken(email) {
    try {
        const response = await fetch(GENERATE_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email.trim() })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Token request error:', error);
        throw error;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// MODAL MANAGEMENT
// ========================================

const modalOverlay = document.getElementById('verifyTokenModal');
const tokenInput = document.getElementById('tokenInput');
const submitTokenBtn = document.getElementById('submitTokenBtn');
const closeVerifyModalBtn = document.getElementById('closeVerifyModalBtn');
const verifyButtonText = document.getElementById('verifyButtonText');
const verifyErrorDiv = document.getElementById('verifyError');

const requestEmailInput = document.getElementById('requestEmailInput');
const requestTokenBtn = document.getElementById('requestTokenBtn');
const requestButtonText = document.getElementById('requestButtonText');
const requestSuccessDiv = document.getElementById('requestSuccess');
const requestErrorDiv = document.getElementById('requestError');

let pendingWorkflowUrl = null;

function openVerifyModal(workflowUrl = null) {
    pendingWorkflowUrl = workflowUrl;
    modalOverlay.classList.add('active');
    tokenInput.value = '';
    requestEmailInput.value = '';
    tokenInput.focus();
    hideAllMessages();
}

function closeVerifyModal() {
    modalOverlay.classList.remove('active');
    tokenInput.value = '';
    requestEmailInput.value = '';
    hideAllMessages();
    enableVerifyButton();
    enableRequestButton();
}

function showVerifyError(message) {
    verifyErrorDiv.textContent = message;
    verifyErrorDiv.classList.add('show');
}

function hideVerifyError() {
    verifyErrorDiv.textContent = '';
    verifyErrorDiv.classList.remove('show');
}

function showRequestSuccess(message) {
    requestSuccessDiv.textContent = message;
    requestSuccessDiv.classList.add('show');
}

function hideRequestSuccess() {
    requestSuccessDiv.textContent = '';
    requestSuccessDiv.classList.remove('show');
}

function showRequestError(message) {
    requestErrorDiv.textContent = message;
    requestErrorDiv.classList.add('show');
}

function hideRequestError() {
    requestErrorDiv.textContent = '';
    requestErrorDiv.classList.remove('show');
}

function hideAllMessages() {
    hideVerifyError();
    hideRequestSuccess();
    hideRequestError();
}

function disableVerifyButton() {
    submitTokenBtn.disabled = true;
    verifyButtonText.textContent = 'Verifying...';
}

function enableVerifyButton() {
    submitTokenBtn.disabled = false;
    verifyButtonText.textContent = 'Verify Token';
}

function disableRequestButton() {
    requestTokenBtn.disabled = true;
    requestButtonText.textContent = 'Sending...';
}

function enableRequestButton() {
    requestTokenBtn.disabled = false;
    requestButtonText.textContent = 'Request Access Token';
}

// ========================================
// MODAL EVENT LISTENERS
// ========================================

closeVerifyModalBtn.addEventListener('click', closeVerifyModal);

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeVerifyModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeVerifyModal();
    }
});

tokenInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        submitTokenBtn.click();
    }
});

requestEmailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        requestTokenBtn.click();
    }
});

// FIX: Verify Token Button Click - Now redirects after modal closes
submitTokenBtn.addEventListener('click', async function() {
    const token = tokenInput.value.trim();

    if (!token) {
        showVerifyError('Please enter an access token');
        return;
    }

    disableVerifyButton();
    hideAllMessages();

    try {
        const result = await verifyToken(token);

        if (result.valid === true) {
            saveSession(token);
            
            // Store the URL BEFORE anything else
            const urlToRedirect = pendingWorkflowUrl;
            console.log('Token verified. Redirecting to:', urlToRedirect);
            
            // Close modal
            closeVerifyModal();
            
            // Redirect immediately (don't wait for modal animation)
            if (urlToRedirect) {
                window.location.href = urlToRedirect;
            }
        } else {
            showVerifyError(result.message || 'Invalid or expired token');
            enableVerifyButton();
        }
    } catch (error) {
        console.error('Verification error:', error);
        showVerifyError('Unable to verify token. Please try again.');
        enableVerifyButton();
    }
});

requestTokenBtn.addEventListener('click', async function() {
    const email = requestEmailInput.value.trim();

    if (!email) {
        showRequestError('Please enter your email address');
        return;
    }

    if (!isValidEmail(email)) {
        showRequestError('Please enter a valid email address');
        return;
    }

    disableRequestButton();
    hideAllMessages();

    try {
        const result = await requestAccessToken(email);

        if (result.success === true) {
            showRequestSuccess(result.message || 'Your access token has been emailed to you. Please check your inbox.');
            requestEmailInput.value = '';
            enableRequestButton();
        } else if (result.success === false) {
            showRequestSuccess(result.message || 'Your already have used your one-time access token.');
            requestEmailInput.value = '';
            enableRequestButton();
        } else {
            showRequestError(result.message || 'Failed to request access token. Please try again.');
            enableRequestButton();
        }
    } catch (error) {
        showRequestError('Unable to request access token. Please try again.');
        enableRequestButton();
    }
});

// ========================================
// PRODUCT RENDERING
// ========================================

function renderProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) {
        return;
    }

    if (products.length === 0) {
        grid.innerHTML = '<p class="error">No products available at the moment.</p>';
        return;
    }

    grid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(product.name)}'">
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.shortDescription}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="runWorkflow('${product.id}')">Try Now</button>
                    <button class="btn btn-secondary" onclick="showProductDetail('${product.id}')">Know More</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function showProductDetail(id) {
    const product = products.find(p => p.id === id);
    if (!product) {
        alert('Product not found.');
        return;
    }

    const hero = document.querySelector('.hero');
    const grid = document.getElementById('products-grid');

    if (hero) {
        hero.style.display = 'none';
        hero.setAttribute('data-hidden', 'true');
    }
    if (grid) {
        grid.style.display = 'none';
        grid.setAttribute('data-hidden', 'true');
    }

    let detailContainer = document.getElementById('product-detail-container');
    if (!detailContainer) {
        detailContainer = document.createElement('div');
        detailContainer.id = 'product-detail-container';
        detailContainer.className = 'product-detail';
        const mainContainer = document.querySelector('.main .container');
        if (mainContainer) {
            mainContainer.appendChild(detailContainer);
        }
    }

    document.title = `${product.name} | AutoFlow`;
    window.history.pushState({ productId: id }, '', `?id=${id}`);

    detailContainer.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-detail-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-detail-content">
                ${product.category ? `<span class="product-category">${product.category}</span>` : ''}
                <h2 class="product-detail-title">${product.name}</h2>
                <div class="product-detail-description">
                    <p>${product.longDescription}</p>
                </div>
                <div class="product-features">
                    <h3>Key Features</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-detail-actions">
                    <button class="btn btn-primary" onclick="runWorkflow('${product.id}')">Try Now</button>
                    <button class="btn btn-back" onclick="goBackToHome()">Go Back</button>
                </div>
            </div>
        </div>
    `;

    detailContainer.style.display = 'block';
    window.scrollTo(0, 0);
}

function goBackToHome() {
    const hero = document.querySelector('.hero');
    const grid = document.getElementById('products-grid');
    const detailContainer = document.getElementById('product-detail-container');

    if (detailContainer) {
        detailContainer.style.display = 'none';
    }

    if (hero) {
        hero.style.display = 'block';
        hero.removeAttribute('data-hidden');
    }

    if (grid) {
        grid.style.display = 'grid';
        grid.removeAttribute('data-hidden');
        renderProductsGrid();
    }

    document.title = 'Automation Workflows | AI-Powered Solutions';
    window.history.pushState({}, '', 'index.html');
    window.scrollTo(0, 0);
}

// ========================================
// WORKFLOW EXECUTION
// ========================================

async function runWorkflow(id) {
    const product = products.find(p => p.id === id);
    if (!product || !product.tryUrl) {
        alert('Workflow URL not configured for this product.');
        return;
    }

    console.log('runWorkflow called for:', id);
    console.log('Product tryUrl:', product.tryUrl);

    if (!isAuthenticated()) {
        console.log('Not authenticated. Opening modal with URL:', product.tryUrl);
        openVerifyModal(product.tryUrl);
        return;
    }

    // User has a session - verify it's still valid
    const session = getSession();

    try {
        const result = await verifyToken(session.token);

        if (result.valid === true) {
            console.log('Token valid. Redirecting to:', product.tryUrl);
            window.location.href = product.tryUrl;
        } else {
            clearSession();
            alert(result.message || 'Your access token is no longer valid. Please verify again.');
            openVerifyModal(product.tryUrl);
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        alert('Unable to verify your access. Please try again.');
        openVerifyModal(product.tryUrl);
    }
}

// ========================================
// PAGE INITIALIZATION
// ========================================

function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        renderProductsGrid();
        setTimeout(() => showProductDetail(productId), 50);
    } else {
        renderProductsGrid();
    }
}

document.addEventListener('DOMContentLoaded', initializePage);

window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        showProductDetail(productId);
    } else {
        goBackToHome();
    }
});
