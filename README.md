# MASTER AI — 7-Day Live AI Masterclass Platform

<div align="center">

![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br />

**A high-performance, responsive landing page and registration platform for the 7-Day Live AI Masterclass mentored by Harsh Lagwal.**

[Live Demo](#deployment) • [Features](#key-features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Project Structure](#project-structure)

</div>

---

## 🌟 Overview

**MASTER AI** is a production-grade web platform built to showcase a comprehensive 7-day live masterclass focused on practical, high-income AI tools and workflows. Designed with modern developer ergonomics, it delivers an editorial, dark-mode visual experience reminiscent of Vercel and Linear, featuring ambient video backgrounds, zero-overflow responsive grids, and an optimized conversion funnel.

---

## ✨ Key Features

- **⚡ Modern Dark Editorial Aesthetic:** Bespoke color palette, glassmorphism accents, subtle micro-animations, and ambient background video layers.
- **📱 100% Fully Responsive:** Tested with 0px horizontal overflow across iPhone, Android viewports, tablets, and wide monitors.
- **🗓️ Comprehensive 7-Day Syllabus:** Detailed breakdown of modules, practical projects, high-impact tool stacks (Cursor, Replit, Midjourney, ElevenLabs, Claude, etc.).
- **💳 Instant Registration & UPI Integration:** Interactive modal checkout with automatic UPI deep-linking and dynamic QR generation.
- **💬 Community Integration:** Direct WhatsApp Community links and interactive connection modals.
- **📌 Sticky Quick-Enroll Capsule:** Floating smart CTA on scroll for frictionless conversion.
- **⚖️ Why Choose Us & FAQs:** Structured comparison matrices and interactive accordion FAQ sections.
- **🛡️ Secure & Lightweight:** Zero telemetry, optimized production bundle size (`< 150kB` gzipped assets), and clean separation of concerns.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment Ready:** Vercel, Netlify, Cloudflare Pages, GitHub Pages

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshlagwal/Master-Ai.git
   cd Master-Ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables (Optional):**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```
   The production-optimized static files will be generated in the `dist/` directory.

---

## 📁 Project Structure

```text
├── public/                # Static assets (images, icons, video)
├── src/
│   ├── components/        # Modular UI components
│   │   ├── BackgroundVideo.tsx      # Ambient background video engine
│   │   ├── Footer.tsx               # Sleek, compact developer footer
│   │   ├── Header.tsx               # Floating pill navbar & drawer
│   │   ├── RegistrationModal.tsx    # Modal checkout & UPI flow
│   │   ├── SectionComparison.tsx    # Workshop comparison matrix
│   │   ├── SectionCurriculum.tsx    # 7-Day syllabus breakdown
│   │   ├── SectionDetails.tsx       # Workshop perks & highlights
│   │   ├── SectionFAQ.tsx           # Accordion FAQ
│   │   ├── SectionFinalCTA.tsx      # High-impact CTA banner
│   │   ├── SectionHero.tsx          # Hero section with live badges
│   │   ├── SectionMentor.tsx        # Mentor credentials & bio
│   │   ├── SectionRegistration.tsx  # Pricing & instant checkout
│   │   ├── StickyQuickEnrollBar.tsx # Floating bottom quick-enroll bar
│   │   └── WhatsAppModal.tsx        # Direct community modal
│   ├── data.ts            # Centralized brand, pricing & curriculum data
│   ├── App.tsx            # Main application layout & state
│   ├── index.css          # Custom styling tokens & Tailwind directives
│   └── main.tsx           # Application entry point
├── .gitignore             # Strict exclusion list (secrets, dist, node_modules)
├── index.html             # SEO & meta configuration
├── package.json           # Project manifest and scripts
├── tsconfig.json          # TypeScript compiler configuration
└── vite.config.ts         # Vite bundler configuration
```

---

## 🌐 Deployment

This application is ready for zero-config one-click deployments:

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework preset: **Vite**.
4. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with precision by <b>Harsh Lagwal</b> • AI Educator & Digital Creator</sub>
</div>
