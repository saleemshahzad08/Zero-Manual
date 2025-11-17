// ========================================
// PRODUCTS DATA
// ========================================

const products = [
    {
        id: "workflow1",
        name: "AI Medical Assistant",
        shortDescription: "Instant AI-powered analysis of medical symptoms and health concerns.",
        longDescription: "Our AI Medical Assistant provides instant, intelligent analysis of medical symptoms using advanced natural language processing. Get preliminary health insights, understand potential conditions, and receive guidance on next steps. This workflow integrates with leading medical databases to provide accurate, up-to-date information while maintaining your privacy.",
        category: "Healthcare",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
        tryUrl: "ai-medical-assistant.html",
        features: [
            "Instant symptom analysis using advanced AI",
            "Privacy-focused and HIPAA-compliant",
            "Integration with trusted medical databases",
            "24/7 availability for health queries",
            "Multilingual support for global accessibility"
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
// AUTHENTICATION & SESSION MANAGEMENT
// ========================================

const STORAGE_KEY = 'oneTimeAccess';
const VERIFY_TOKEN_URL = 'https://n8n.cloud/webhook/verifyToken'; // Replace with your actual n8n webhook URL

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
function isAuthenticated() {
    const session = localStorage.getItem(STORAGE_KEY);
    if (!session) return false;
    
    try {
        const data = JSON.parse(session);
        // Check for email and token (new response format)
        return data && data.email && data.token;
    } catch (e) {
        return false;
    }
}

/**
 * Save authenticated session to localStorage
 * @param {string} email - User's email from n8n response
 * @param {string} token - The verified token
 */
function saveSession(email, token) {
    const sessionData = {
        email: email,
        token: token,
        timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
}

/**
 * Clear session from localStorage
 */
function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get current session data
 * @returns {object|null}
 */
function getSession() {
    const session = localStorage.getItem(STORAGE_KEY);
    if (!session) return null;
    
    try {
        return JSON.parse(session);
    } catch (e) {
        return null;
    }
}

/**
 * Authenticate with token via n8n webhook
 * @param {string} token 
 * @returns {Promise<object>}
 */
async function authenticateWithToken(token) {
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
        console.error('Authentication error:', error);
        throw error;
    }
}

// ========================================
// MODAL MANAGEMENT
// ========================================

const modalOverlay = document.getElementById('loginModal');
const tokenInput = document.getElementById('tokenInput');
const submitBtn = document.getElementById('submitTokenBtn');
const closeBtn = document.getElementById('closeModalBtn');
const buttonText = document.getElementById('buttonText');
const errorDiv = document.getElementById('loginError');

let pendingWorkflowId = null; // Store which workflow is waiting for auth

/**
 * Open the login modal
 * @param {string} workflowId - The workflow ID that triggered the modal
 */
function openLoginModal(workflowId = null) {
    pendingWorkflowId = workflowId;
    modalOverlay.classList.add('active');
    tokenInput.value = '';
    tokenInput.focus();
    hideLoginError();
}

/**
 * Close the login modal
 */
function closeLoginModal() {
    modalOverlay.classList.remove('active');
    tokenInput.value = '';
    pendingWorkflowId = null;
    hideLoginError();
    enableSubmitButton();
}

/**
 * Show error message in modal
 * @param {string} message 
 */
function showLoginError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

/**
 * Hide error message in modal
 */
function hideLoginError() {
    errorDiv.textContent = '';
    errorDiv.classList.remove('show');
}

/**
 * Disable submit button during verification
 */
function disableSubmitButton() {
    submitBtn.disabled = true;
    buttonText.textContent = 'Verifying...';
}

/**
 * Enable submit button
 */
function enableSubmitButton() {
    submitBtn.disabled = false;
    buttonText.textContent = 'Verify Token';
}

// ========================================
// MODAL EVENT LISTENERS
// ========================================

// Close modal on close button click
closeBtn.addEventListener('click', closeLoginModal);

// Close modal on overlay click (outside modal)
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeLoginModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeLoginModal();
    }
});

// Submit token on Enter key in input
tokenInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        submitBtn.click();
    }
});

// Submit token button click
submitBtn.addEventListener('click', async function() {
    const token = tokenInput.value.trim();
    
    if (!token) {
        showLoginError('Please enter an access token');
        return;
    }

    // Disable button and show loading state
    disableSubmitButton();
    hideLoginError();

    try {
        // Authenticate with n8n
        const result = await authenticateWithToken(token);

        // Check for new response format: { allowed, email, token } or { allowed, reason }
        if (result.allowed === true && result.email && result.token) {
            // Success - save session and close modal
            saveSession(result.email, result.token);
            closeLoginModal();

            // If there's a pending workflow, execute it
            if (pendingWorkflowId) {
                const workflowId = pendingWorkflowId;
                pendingWorkflowId = null;
                runWorkflow(workflowId);
            }
        } else {
            // Failed authentication
            let errorMessage = 'Invalid access token';
            
            if (result.reason === 'used') {
                errorMessage = 'This token has already been used';
            } else if (result.reason === 'invalid') {
                errorMessage = 'Invalid or expired token';
            }
            
            showLoginError(errorMessage);
            enableSubmitButton();
        }
    } catch (error) {
        showLoginError('Unable to verify token. Please try again.');
        enableSubmitButton();
    }
});

// ========================================
// PRODUCT RENDERING
// ========================================

/**
 * Render products grid on homepage
 */
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

/**
 * Show product detail (single page approach)
 * @param {string} id - Product ID
 */
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

/**
 * Go back to homepage
 */
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

/**
 * Run workflow with authentication check
 * @param {string} id - Product/Workflow ID
 */
async function runWorkflow(id) {
    const product = products.find(p => p.id === id);
    if (!product || !product.tryUrl) {
        alert('Workflow URL not configured for this product.');
        return;
    }

    // Check if user is authenticated
    if (!isAuthenticated()) {
        // Not authenticated - open login modal
        openLoginModal(id);
        return;
    }

    // User has a session - verify it's still valid before running workflow
    const session = getSession();
    
    try {
        // Re-verify token with n8n to ensure it's still valid
        const result = await authenticateWithToken(session.token);

        if (result.allowed === true) {
            // Token is valid - redirect to workflow
            window.location.href = product.tryUrl;
        } else {
            // Token is no longer valid (already used or expired)
            clearSession();
            
            let errorMessage = 'Your access token is no longer valid.';
            if (result.reason === 'used') {
                errorMessage = 'Your access token has already been used.';
            }
            
            alert(errorMessage + ' Please enter a new token.');
            openLoginModal(id);
        }
    } catch (error) {
        // Network error or other issue
        console.error('Token verification failed:', error);
        alert('Unable to verify your access. Please try again.');
        openLoginModal(id);
    }
}

// ========================================
// PAGE INITIALIZATION
// ========================================

/**
 * Initialize page based on current location
 */
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

// Run on page load
document.addEventListener('DOMContentLoaded', initializePage);

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        showProductDetail(productId);
    } else {
        goBackToHome();
    }
});
