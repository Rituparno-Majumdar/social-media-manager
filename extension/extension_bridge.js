// Cross-browser browser API detection helper
const browserAPI = typeof chrome !== 'undefined' ? chrome : (typeof browser !== 'undefined' ? browser : null);

if (browserAPI) {
    console.log('SocialCraft AI Copilot Extension Bridge active.');
    
    // 1. Set DOM attribute indicating the extension is installed and active
    document.documentElement.setAttribute('data-socialcraft-extension-active', 'true');

    // 2. Intercept window messages from the web app and relay to background service worker
    window.addEventListener('message', (event) => {
        // Accept messages only from our own window
        if (event.source !== window) return;

        if (event.data && event.data.type === 'SOCIALCRAFT_PUBLISH_ALL') {
            console.log('Relaying campaign drafts to background service worker...', event.data);
            
            browserAPI.runtime.sendMessage({
                type: 'PUBLISH_CAMPAIGN',
                posts: event.data.posts,
                platforms: event.data.platforms
            }, (response) => {
                if (browserAPI.runtime.lastError) {
                    console.error('Bridge communication error:', browserAPI.runtime.lastError);
                } else {
                    console.log('Bridge communication success:', response);
                }
            });
        }
    });
}
