// Cross-browser browser API detection helper
const browserAPI = typeof chrome !== 'undefined' ? chrome : (typeof browser !== 'undefined' ? browser : null);

if (browserAPI) {
    browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'PUBLISH_CAMPAIGN') {
            const { posts, platforms } = message;

            console.log('Received campaign payload:', posts, platforms);

            // 1. Save drafts in local storage
            browserAPI.storage.local.set({ socialcraft_drafts: posts }, () => {
                console.log('Campaign drafts saved in local storage.');

                // 2. Open platforms composer tabs in the browser
                platforms.forEach(pKey => {
                    const url = getPlatformComposerUrl(pKey);
                    if (url) {
                        browserAPI.tabs.create({ url: url });
                    }
                });

                sendResponse({ success: true, message: 'Tabs opened and drafts stored successfully.' });
            });

            return true; // Keep message channel open for asynchronous response
        }
    });
}

function getPlatformComposerUrl(platformKey) {
    const urls = {
        facebook: 'https://www.facebook.com/',
        instagram: 'https://www.instagram.com/',
        linkedin: 'https://www.linkedin.com/feed/',
        twitter: 'https://twitter.com/intent/tweet',
        threads: 'https://threads.net/intent/post',
        telegram: 'https://web.telegram.org/',
        youtube: 'https://www.youtube.com/',
        pinterest: 'https://pinterest.com/pin-builder/',
        sharechat: 'https://sharechat.com/'
    };
    return urls[platformKey] || null;
}
