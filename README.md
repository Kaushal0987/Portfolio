# Kaushal Joshi — Portfolio

Freelance web developer portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` for the contact form:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Inbox for form submissions |

The site builds and runs without these; the contact form returns an error until they are set.

## Edit content

All site copy, projects, and links live in [`data/site.ts`](data/site.ts).

## Deploy on Vercel

1. Push this repo to GitHub (`Kaushal0987/Portfolio`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add `RESEND_API_KEY` and `CONTACT_EMAIL` under **Environment Variables**.
4. Deploy — Vercel auto-detects Next.js; no extra build settings needed.

Custom domain: add it in the Vercel project **Settings → Domains**.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # run production build locally
npm run lint     # ESLint
```
