# SocialCraft AI

Zero-install, AI-powered social media generator optimized for NGOs, small businesses, and community leaders in India.

## Tech Stack
- HTML5 (Structure & Semantic Markup)
- Vanilla CSS3 (Custom Responsive Layouts & Glassmorphic aesthetics)
- Pure Client-Side JavaScript (ESM imports, browser sandboxes)
- Gemini vision & multilingual engines (`@google/genai` via browser script import)

## Key Features
- **Client-Side Image Auto-Compression**: Scales down camera photo uploads to max 1200px and 85% quality JPEGs entirely in-browser, speeding up AI generation by 90% and bypassing strict API upload sizes.
- **13 Regional Languages Script Support**: Direct generation in native scripts (Hindi, Bengali, Tamil, Kannada, Marathi, etc.) with spoken local nuances.
- **Parallel Multi-Platform Campaign Drafts**: Generate tailored drafts for multiple checked platforms in a single click using staggered requests to avoid congestion.
- **Posting Assistant Deep Links & Web Share**: Direct intents for X, WhatsApp, Threads, and Telegram. Background clipboard copying + active tabs opening for Facebook, Instagram, LinkedIn, YouTube, and Pinterest. Native mobile share sheet support.
- **Grouped History Drafts**: Campaigns are saved and loaded in LocalStorage as unified groups, fully backward-compatible.

## Session Memory

### Log
#### 2026-05-27 — Multi-Platform Campaigns, Intents & Client-Side Compression
- Renamed project from `social-media-manager` to `social-craft-ai` everywhere (folders, remote URLs, and readme references).
- Upgraded the single dropdown platform select into a visual **multi-select checkbox grid** with dynamic stats.
- Refactored `generatePost()` to stagger parallel executions (350ms delays) across all checked platforms.
- Built a **staggered progress shield** in the loading container showing active models and status checklist.
- Refactored output panel into a **Tabbed Campaign Workspace** supporting active tab preview switching and live-edited background draft synchronization.
- Created `quickPost()` intent routing and clipboard-assist wrappers to open platform composers directly.
- Implemented `sharePostMobile()` invoking the browser's native `navigator.share` sheet.
- Restructured `saveToHistoryGrouped` and `loadHistoryItem` to sync history cards with the checkbox states and tabs dashboard, maintaining legacy single-post entries compatibility.
- Implemented Canvas-based client-side image compression downscaling high-res uploads to highly optimized JPEGs.
