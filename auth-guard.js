// ========================================
// AUTHENTICATION GUARD
// Prevents direct access to protected pages
// ========================================

(function() {
    'use strict';

    const STORAGE_KEY = 'oneTimeAccess';
    const VERIFY_TOKEN_URL = 'https://hussainsaleem.app.n8n.cloud/webhook/tokenVerification';
    
    // List of protected pages that require authentication
    const PROTECTED_PAGES = ['remote-job.html'];
    
    // Check if current page is protected
    function isProtectedPage() {
        const currentPage = window.location.pathname.split('/').pop();
        return PROTECTED_PAGES.some(page => currentPage === page);
    }
    
    // Get session from localStorage
    function getSession() {
        const session = localStorage.getItem(STORAGE_KEY);
        if (!session) return null;
        
        try {
            return JSON.parse(session);
        } catch (e) {
            return null;
        }
    }
    
    // Verify token with server
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
            return { valid: false, message: 'Verification failed' };
        }
    }
    
    // Redirect to home page with error message
    function redirectToHome(reason = 'unauthorized') {
        // Store redirect reason for potential display on index page
        sessionStorage.setItem('redirectReason', reason);
        
        // Clear any invalid session data
        localStorage.removeItem(STORAGE_KEY);
        
        // Redirect to home page
        window.location.replace('index.html');
    }
    
    // Main authentication check
    async function checkAuthentication() {
        // Only run on protected pages
        if (!isProtectedPage()) {
            return;
        }
        
        // Show a loading overlay while checking
        showLoadingOverlay();
        
        const session = getSession();
        
        // No session found - redirect immediately
        if (!session || !session.token) {
            redirectToHome('no_token');
            return;
        }
        
        // Verify the token with the server
        const result = await verifyToken(session.token);
        
        if (result.valid === true) {
            // Token is valid - allow access and hide loading overlay
            hideLoadingOverlay();
        } else {
            // Token is invalid or expired - redirect
            redirectToHome('invalid_token');
        }
    }
    
    // Show loading overlay
    function showLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'auth-loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            text-align: center;
            color: #6366f1;
        `;
        content.innerHTML = `
            <div style="
                width: 48px;
                height: 48px;
                border: 4px solid #e5e7eb;
                border-top-color: #6366f1;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                margin: 0 auto 16px;
            "></div>
            <p style="font-size: 1rem; font-weight: 600;">Verifying access...</p>
            <style>
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }
    
    // Hide loading overlay
    function hideLoadingOverlay() {
        const overlay = document.getElementById('auth-loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }
    
    // Run authentication check when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuthentication);
    } else {
        checkAuthentication();
    }
    
    // Also check when page becomes visible (in case user switches tabs)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && isProtectedPage()) {
            checkAuthentication();
        }
    });
    
})();
