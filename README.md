# 🎯 Sounak Sarkar | AI/ML Portfolio Website

Welcome to the official repository for Sounak Sarkar's portfolio website: **"Neural Cartographer"**. A deep obsidian dark mode, data-rich interface designed like an intelligence control dashboard.

🔗 **Live Website:** [https://sounakss7.github.io/AI_PORTFOLIO/](https://sounakss7.github.io/AI_PORTFOLIO/)

---

## 🚀 Tech Stack & Design Architecture

- **Core Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (with premium obsidian & electric cyan theme variables)
- **Animations:** Framer Motion (for smooth micro-interactions, page entries, and hover effects)
- **Background Simulation:** Custom HTML5 2D Canvas (`NeuralCanvas.jsx`) representing an interactive node-connection neural network graph with mouse proximity warp and click ripple wave effects.
- **Icons:** Lucide React & Custom Inline SVGs (for brand assets)

---

## 🛠️ GitHub Pages Deployment Guide

This project is configured to build and deploy automatically via **GitHub Actions** when code is pushed to the `main` branch. 

To make the live link run correctly, you **MUST** configure your repository settings to use GitHub Actions as the deployment source:

1. Open your repository on GitHub: `https://github.com/sounakss7/AI_PORTFOLIO`
2. Navigate to **Settings** (the gear icon on the top tab).
3. Under the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - Locate the **Source** dropdown.
   - Change it from **Deploy from a branch** to **GitHub Actions**.
5. Once selected, head over to the **Actions** tab in your repository. You will see a workflow run triggered by your latest push.
6. Once the workflow run completes (takes ~30 seconds), the live website at [https://sounakss7.github.io/AI_PORTFOLIO/](https://sounakss7.github.io/AI_PORTFOLIO/) will be fully running!

---

## 💻 Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/sounakss7/AI_PORTFOLIO.git
   cd AI_PORTFOLIO
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
