// Cross-browser browser API detection helper
const browserAPI = typeof chrome !== 'undefined' ? chrome : (typeof browser !== 'undefined' ? browser : null);

if (browserAPI) {
    const platformKey = getPlatformKey();
    if (platformKey) {
        console.log(`SocialCraft Copilot active on ${platformKey}. Checking for drafts...`);

        // Check if there are active campaign drafts in storage
        browserAPI.storage.local.get('socialcraft_drafts', (result) => {
            if (browserAPI.runtime.lastError) {
                console.error('Storage access error:', browserAPI.runtime.lastError);
                return;
            }

            const drafts = result.socialcraft_drafts;
            if (drafts && drafts[platformKey]) {
                const draftText = drafts[platformKey];
                console.log(`Found draft for ${platformKey}! Launching Copilot Overlay.`);
                
                // Inject the premium Copilot floating UI
                injectCopilotOverlay(platformKey, draftText);
            }
        });
    }
}

function getPlatformKey() {
    const host = window.location.hostname;
    if (host.includes('facebook.com')) return 'facebook';
    if (host.includes('instagram.com')) return 'instagram';
    if (host.includes('linkedin.com')) return 'linkedin';
    if (host.includes('twitter.com') || host.includes('x.com')) return 'twitter';
    if (host.includes('threads.net')) return 'threads';
    if (host.includes('telegram.org')) return 'telegram';
    if (host.includes('youtube.com')) return 'youtube';
    if (host.includes('pinterest.com')) return 'pinterest';
    if (host.includes('sharechat.com')) return 'sharechat';
    return null;
}

function getPlatformName(key) {
    const names = {
        facebook: 'Facebook',
        instagram: 'Instagram',
        linkedin: 'LinkedIn',
        twitter: 'Twitter / X',
        threads: 'Threads',
        telegram: 'Telegram',
        youtube: 'YouTube',
        pinterest: 'Pinterest',
        sharechat: 'ShareChat'
    };
    return names[key] || 'Social Media';
}

function injectCopilotOverlay(platformKey, draftText) {
    // Prevent duplicate overlays
    if (document.getElementById('socialcraft-copilot-container')) return;

    const overlay = document.createElement('div');
    overlay.id = 'socialcraft-copilot-container';
    overlay.className = 'socialcraft-copilot-panel';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-labelledby', 'socialcraft-title');

    const brandName = getPlatformName(platformKey);

    overlay.innerHTML = `
        <div class="socialcraft-header">
            <span class="socialcraft-logo">✨</span>
            <div style="flex:1;">
                <h3 id="socialcraft-title" class="socialcraft-title">SocialCraft AI</h3>
                <p class="socialcraft-subtitle">${brandName} Copilot</p>
            </div>
            <button class="socialcraft-close-btn" id="socialcraft-close" aria-label="Close SocialCraft overlay">✕</button>
        </div>
        <div class="socialcraft-body">
            <p class="socialcraft-label">Draft Preview:</p>
            <div class="socialcraft-preview-box" id="socialcraft-preview">${escapeHtml(draftText)}</div>
            <p class="socialcraft-hint">💡 Click <strong>⚡ Auto-Fill</strong> to paste immediately into the post composer.</p>
        </div>
        <div class="socialcraft-footer">
            <button class="socialcraft-btn secondary" id="socialcraft-copy">📋 Copy Draft</button>
            <button class="socialcraft-btn primary" id="socialcraft-autofill">⚡ Auto-Fill Post</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Event listeners
    document.getElementById('socialcraft-close').addEventListener('click', () => {
        overlay.classList.add('socialcraft-fade-out');
        setTimeout(() => overlay.remove(), 250);
    });

    document.getElementById('socialcraft-copy').addEventListener('click', async () => {
        const copyBtn = document.getElementById('socialcraft-copy');
        try {
            await navigator.clipboard.writeText(draftText);
            copyBtn.textContent = '✅ Copied!';
            copyBtn.classList.add('success-flash');
            setTimeout(() => {
                copyBtn.textContent = '📋 Copy Draft';
                copyBtn.classList.remove('success-flash');
            }, 2000);
        } catch (err) {
            console.error('Clipboard copy failed:', err);
        }
    });

    document.getElementById('socialcraft-autofill').addEventListener('click', () => {
        const fillBtn = document.getElementById('socialcraft-autofill');
        const success = executeAutoFill(draftText);
        
        if (success) {
            fillBtn.textContent = '✅ Filled!';
            fillBtn.classList.add('success-flash');
            setTimeout(() => {
                fillBtn.textContent = '⚡ Auto-Fill Post';
                fillBtn.classList.remove('success-flash');
            }, 2500);
        }
    });
}

function executeAutoFill(text) {
    const selectors = [
        'div[contenteditable="true"]',
        'textarea',
        '[role="textbox"]',
        'input[type="text"]'
    ];
    
    let target = null;
    
    // 1. Try currently focused element
    const active = document.activeElement;
    if (active && (active.tagName === 'TEXTAREA' || active.getAttribute('contenteditable') === 'true' || active.getAttribute('role') === 'textbox')) {
        target = active;
    }
    
    // 2. Search visible DOM textboxes
    if (!target) {
        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            for (const el of elements) {
                const rect = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);
                if (rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden') {
                    // Check if parent or container is hidden
                    target = el;
                    break;
                }
            }
            if (target) break;
        }
    }
    
    if (!target) {
        alert('⚠️ SocialCraft AI Copilot:\nCould not locate the post input box. Please click inside the platform\'s post composer and click "⚡ Auto-Fill Post" again!');
        return false;
    }
    
    // 3. Inject text using document.execCommand to support React/Vue data states natively
    target.focus();
    
    try {
        // Clear existing, select all, and drop in new text safely
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, text);
        
        // Trigger synthetic input events so framework states are updated immediately
        target.dispatchEvent(new Event('input', { bubbles: true }));
        target.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    } catch (err) {
        console.error('execCommand insertText failed, running manual injection fallback:', err);
        
        // Manual fallback for standard elements
        if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
            target.value = text;
        } else {
            target.innerText = text;
        }
        target.dispatchEvent(new Event('input', { bubbles: true }));
        target.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
