# OKR Generator + Tracker — by Xavi Marín

Generate well-structured OKRs from your product mission and track progress across the quarter.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Groq API (Llama 3.3) for OKR generation
- localStorage for progress persistence

## Setup

```bash
npm install
cp .env.example .env.local
# Add your GROQ_API_KEY
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add `GROQ_API_KEY` in Environment Variables
4. Deploy

## Part of PO Toolkit by Xavi Marín — xavimarin.net
