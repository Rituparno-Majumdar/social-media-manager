# 🎨 SocialCraft AI

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Gemini API](https://img.shields.io/badge/Gemini%20API-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

**The Ultimate Zero-Install, AI-Powered Social Media Manager for NGOs, Small Businesses, and Individuals in India.**

*Generate 100% human-sounding, SEO-optimized professional posts in seconds — in English and 12 Indian regional languages.*

[✨ Live Demo Instructions](#-how-to-host-100-free-on-github-pages) • [🚀 Features](#-features) • [📖 Quick Start](#-quick-start) • [🔒 Security & Key Privacy](#-security--api-key-privacy)

</div>

---

## 📌 Problem Statement

In today's digital landscape, small businesses, local individuals, and NGOs often struggle with establishing an active social presence. This is usually due to:
1. **No Social Presence**: Restraining completely from social media due to technical complexity.
2. **Inactive Accounts**: Lacking the time, expertise, or language capacity to write engaging copy regularly.

**SocialCraft AI** eliminates these barriers. It lets users describe what happened in simple, conversational language, upload optional event photos, and automatically drafts platform-specific, highly optimized, human-sounding posts.

---

## 🚀 Features

### 🖼️ Multimodal Photo Context Analysis
Upload up to **5 photos** (JPG, PNG, WEBP). The application sends the images to Gemini's vision engine which automatically describes the crowd, banners, and atmosphere, and seamlessly incorporates these visual elements to make the generated post feel authentic and grounded.

### 🌐 Indian Regional Language Native Writing
Supports writing in **13 major languages** using their native scripts (no clumsy English transliterations):
* English, Hindi (हिन्दी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼ିଆ), Assamese (অসমীয়া), Urdu (اردو)

### 🐦 Brevity & Character Limit Enforcement
Short-form platforms like **Twitter / X** and **Threads** trigger a specialized ultra-strict prompting engine. It enforces strict character boundaries, bypassing long storytelling prompts to deliver tight, concise, and highly effective short-form copy under the platform limit.

### 🛡️ Resilient Retry & Fallback Architecture
Handles transient server overloads or Gemini free-tier congestion gracefully:
* **Exponential Backoff**: Automatically retries failed requests after a brief delay.
* **Cascading Fallback Chain**: Automatically downgrades models if primary ones are busy:
  $$\text{Gemini 2.5 Flash} \longrightarrow \text{Gemini 2.0 Flash} \longrightarrow \text{Gemini 1.5 Flash}$$
* **Real-time UI Logs**: Displays active models and retries in the loading panel transparently.

### 🔒 100% Secure & Client-Side
* No databases, no external backend servers, and no trackers.
* API keys are kept safe in your browser's private `localStorage`.
* Direct browser-to-Google connections ensure maximum data privacy.

---

## 📱 Supported Platforms (Optimized for India)

Each platform is configured with custom, targeted prompt blueprints matching their real-world 2026 algorithms:

| Platform | Character Limit | Optimal Hashtags | SEO & Tone Focus |
|---|---|---|---|
| **Facebook** | 63,206 | 1–3 | Community-centric storytelling, paragraph layouts |
| **Instagram** | 2,200 | 3–5 (Hard max) | Visual hooks, emoji-heavy, late-2025 algorithm rules |
| **Twitter / X** | 280 | 1–2 | Ultra-concise, conversational, witty |
| **LinkedIn** | 3,000 | 3–5 | Professional insight, personal POV, bullet structures |
| **WhatsApp Status** | 700 | 0 | Highly direct, shareable, forwarding-friendly |
| **YouTube Community**| 1,000 | 3–5 | Poll-friendly engagement, descriptive hooks |
| **ShareChat** | Flexible | 5–10 | Casual, hyper-local culture, high regional reach |
| **Threads** | 500 | 1–3 tags | Discussion-oriented, casual, conversational |
| **Pinterest** | 500 | 2–5 | Inspirational, SEO keyword-loaded descriptions |
| **Telegram** | 4,096 | 3–5 | Rich markdown, structured announcement formats |

---

## 📖 Quick Start

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/social-media-manager.git
   cd social-media-manager
   ```
2. **Open the App**:
   Double click the `index.html` file to open it in Chrome, Edge, Safari, or Firefox. No local servers are required!
3. **Configure your API Key**:
   * Click the ⚙️ (Settings) icon.
   * Follow the 5-step guide to retrieve a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).
   * Paste it, hit **🧪 Test Key** to verify, and click **💾 Save Key**.
4. **Generate Posts**:
   * Drag & drop event photos.
   * Provide the date, time, venue, and a quick plain-English (or regional language) description of what occurred.
   * Select your target platform and click **Generate**!

---

## 🔒 Security & API Key Privacy

### ❌ Why this system does NOT use a `.env` file
Many developers think that storing an API key in a `.env` file is standard. However, **SocialCraft AI** is a pure **client-side static web application**. 

1. **Security Risk**: If you create a `.env` file and push it to GitHub, **your private API key will be fully exposed to the public**, allowing anyone to steal your key and usage quota.
2. **Browser Execution**: Browsers run entirely on the user's computer. They cannot read a `.env` file directly from a server without a backend.
3. **The Solution (`localStorage`)**: SocialCraft AI uses the browser's native `localStorage` sandbox. Your API key remains encrypted/secured entirely on your own local device. It is never committed to Git, never sent to our servers, and remains 100% private.

---

## 🌐 How to Host 100% Free on GitHub Pages

Because **SocialCraft AI** is a pure static page, you can host it for free on GitHub Pages in under **30 seconds**!

1. Create a new, blank repository on GitHub (e.g., `social-media-manager`).
2. Push your files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial release of SocialCraft AI"
   git remote add origin https://github.com/YOUR_USERNAME/social-media-manager.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repository on **GitHub.com** → click **Settings** (⚙️) → **Pages** (in the left menu).
4. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
5. Select **main** branch and **/** (root folder) and click **Save**.
6. **Congratulations!** In 10 seconds, your site will be live at `https://YOUR_USERNAME.github.io/social-media-manager/` for anyone in your organization to use from their phone!

---

## 📝 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">
Made with ❤️ for NGOs and Small Businesses in India.
</div>
