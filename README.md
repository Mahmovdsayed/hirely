# 🚀 Hirely — AI-Powered Freelance & Portfolio Platform

**Hirely** is a state-of-the-art, AI-driven ecosystem designed to bridge the gap between world-class freelancers and forward-thinking companies. Built with a focus on premium aesthetics, seamless user experience, and cutting-edge technology, Hirely redefined how professionals showcase their work and how businesses find talent.

---

## ✨ Key Features

- **🤖 AI-Enhanced Matchmaking**: Smart algorithms that connect the right talent with the right opportunities.
- **🎨 Dynamic AI Portfolios**: Automatically generated and optimized portfolios for freelancers.
- **🔐 Multi-Role Authentication**: Dedicated onboarding flows for **Freelancers**, **Clients**, and **Companies**.
- **📊 Interactive Dashboard**: Real-time analytics, project tracking, and management tools.
- **🌐 Multilingual Support**: Fully localized interface for a global reach.
- **⚡ Ultra-Performance**: Built with Next.js 16 and Bun for lightning-fast load times.
- **🎭 Premium UI/UX**: Motion-rich interface using Framer Motion and GSAP for a world-class feel.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)

### State & Data

- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **API Client**: [Axios](https://axios-http.com/)
- **Backend Framework**: [Hono](https://hono.dev/)

### Tools & Others

- **Runtime**: [Bun](https://bun.sh/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.stevenly.me/)

---

## 📁 Project Structure

```bash
hirely-client/
├── app/                # Next.js App Router (Pages, Actions, API)
├── components/         # Atomic UI Components & Layouts
│   ├── forms/          # Specialized Form Components
│   ├── ui/             # Reusable Shadcn/Radix components
│   ├── pages/          # Page-specific complex components
│   └── motion/         # Animation wrappers
├── redux/              # Global State Management
├── hooks/              # Custom React Hooks
├── lib/                # Third-party library configurations
├── services/           # API Service layers
├── types/              # TypeScript Definitions
├── validations/        # Zod Schemas
└── public/             # Static Assets
```

---

## 🛡 License

Copyright (c) 2026 Hirely Team. All rights reserved.

This project is proprietary. Unauthorized use, reproduction, or distribution is strictly prohibited.
