# MASTER AI — 7-Day Live AI + Career Masterclass

<div align="center">

![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br />

**A high-performance, ultra-luxury live masterclass platform empowering students, developers, and creators to master 9 in-demand AI skills with tangible GitHub build proof.**

Mentored by **Harsh Lagwal** (IIT Patna MBA in Generative AI & Data Science, IIT Roorkee Android App Development).

[Live Platform](#getting-started) • [Curriculum](#-9-core-ai-skills) • [Pricing & Passes](#-pricing-tracks) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## 🌟 Overview

**MASTER AI** is an edtech platform engineered with modern developer ergonomics. Designed with a luxury dark/light mode aesthetic reminiscent of Vercel and Linear, it features:
- **Zero Perceived Latency:** Instant data presentation with GPU-accelerated entrance animations.
- **Multilingual Indian Welcome Intro:** Authentic Indian language greetings cycling rhythmically and culminating in an electrified Hindi **नमस्ते ⚡** before seamlessly sliding up.
- **Interactive 3D Spline Scene:** Real-time 3D interactive robot with orbiting official AI tool logos (ChatGPT, Claude, Cursor, Midjourney, Hugging Face, Gemini) tracking user mouse movements.
- **Professional Smooth Scrolling:** Standardized scroll physics, custom 6px unobtrusive scrollbars, and header offset management.
- **Direct UPI Checkout:** Zero-commission direct UPI payments with instant dynamic QR generation, one-tap mobile app triggers (GPay, PhonePe, Paytm), and instant ticket confirmation.

---

## ✨ 9 Core AI Skills

1. **Foundations of Modern AI & Prompt Engineering** (ChatGPT, Claude 3.5 Sonnet, DeepSeek)
2. **AI-Powered Rapid Coding** (Cursor IDE, GitHub Copilot, v0.dev)
3. **Generative Visuals & Graphic Production** (Midjourney v6, Flux.1, Magnific AI)
4. **Voice Cloning, Podcasting & Audio AI** (ElevenLabs, Suno, Whisper)
5. **No-Code AI Automation & Agentic Workflows** (Make.com, n8n, Zapier)
6. **AI Prototyping & MVP Building** (Bolt.new, Replit Agent, Lovable)
7. **Open-Source LLMs & Custom RAG Pipelines** (Hugging Face, Ollama, LangChain)
8. **Smart India Hackathon (SIH) Winning Blueprint** (Problem Breakdown, Architecture & Pitch Defense)
9. **AI Freelancing & Career Acceleration** (High-Ticket Client Acquisition, ATS Resumes, Portfolio Deployment)

---

## 💰 Pricing Tracks

| Pass Tier | Price | Access / Duration | Key Inclusions |
| :--- | :---: | :--- | :--- |
| **7-Day Master Pass** *(Most Popular)* | **₹89** | 7 Days All-Inclusive (8:00 PM IST) | All 9 skills, daily recordings, code templates, Skill India verified certificate |
| **1-Week VIP Pass** | **₹299** | Priority 1-on-1 Mentorship | Everything in Master Pass + 1-on-1 GitHub/Portfolio review, SIH blueprint, direct WhatsApp with Harsh |
| **30-Min Live Demo** | **₹0 Free** | 2 Days Live Preview | 30-min live Google Meet session, LLM foundations, live Q&A |
| **SIH 2-Hr Masterclass** | **₹199** | Intensive Hackathon Sprint | Problem statement breakdown, system architecture, winning jury pitch decks |

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom Design Tokens
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Headings) & [Inter](https://fonts.google.com/specimen/Inter) (Body) via Google Fonts
- **3D Engine:** [@splinetool/react-spline](https://spline.design/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Lead Capture & Verification:** Formspree Webhook Dispatch + Direct UPI Deep-linking

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation & Local Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshlagwal/Master-Ai.git
   cd Master-Ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Verify TypeScript build:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
master-ai/
├── public/                     # Static assets & vectors
├── src/
│   ├── components/             # Modular UI components
│   │   ├── ui/
│   │   │   └── splite.tsx              # 3D Spline interactive scene wrapper
│   │   ├── Footer.tsx                  # Minimalist developer footer
│   │   ├── HeroSection.tsx             # 3D interactive hero + orbiting AI tools + dynamic typewriter
│   │   ├── MultilingualWelcome.tsx     # Authentic Indian greetings preloader with lightning finale
│   │   ├── Navbar.tsx                  # Floating navigation pill + theme toggle + mobile drawer
│   │   ├── RegistrationModal.tsx       # 2x2 luxury card pass checkout + direct UPI QR + confirmation
│   │   ├── SectionBuildProof.tsx       # 6 tangible GitHub portfolio deliverables with interactive stepper
│   │   ├── SectionCurriculumGrid.tsx   # 9 in-demand AI skills with interactive numeric stepper
│   │   ├── SectionFAQAccordion.tsx     # Frequently asked questions accordion
│   │   ├── SectionFinalBanner.tsx      # High-conversion closing banner with glowing CTA
│   │   ├── SectionJourneyTimeline.tsx  # 7-day evening curriculum roadmap
│   │   ├── SectionMentorProfile.tsx    # Harsh Lagwal (IIT Patna / IIT Roorkee) credentials & verified badges
│   │   ├── SectionPricingCards.tsx     # Honest pricing grid (₹89 Master Pass, ₹299 VIP, ₹0 Demo, ₹199 SIH)
│   │   ├── SectionStatsBar.tsx         # Interactive metric cards with hover micro-rotations
│   │   └── WhatsAppModal.tsx           # Direct community access modal
│   ├── hooks/
│   │   ├── useTheme.ts                 # Light/Dark mode state with persistence
│   │   └── useTypewriter.ts            # Dynamic typewriter hook with delayed-start support
│   ├── data.ts                         # Centralized brand, pricing, curriculum & UPI configuration
│   ├── types.ts                        # TypeScript interfaces & domain models
│   ├── index.css                       # Subpixel antialiasing, custom scrollbar & animation keyframes
│   ├── App.tsx                         # Root application orchestration
│   └── main.tsx                        # Application mount point
├── index.html                          # SEO meta tags, Google Search Console, Google Fonts
├── package.json                        # Dependencies and build scripts
├── tsconfig.json                       # TypeScript compiler configuration
└── vite.config.ts                      # Vite build configuration with alias support
```

---

## 🌐 Deployment

Ready for zero-config one-click deployments on **Vercel**, **Netlify**, or **Cloudflare Pages**:

### Vercel Deployment
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Click **Deploy**.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with precision by <b>Harsh Lagwal</b> • AI Educator & Digital Creator</sub>
</div>
