# Katalon Content Board

Internal content planning and status tracker for the Katalon True Platform blog launch.

**Stack:** Next.js 14 (App Router) · Supabase (Postgres + Auth) · Tailwind CSS · Vercel

---

## Setup — step by step

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project
2. Name it `katalon-content` (or anything you like)
3. Pick a region close to you (e.g. `ap-southeast-1` for Asia)
4. Save the database password somewhere safe

### 2. Run the schema + seed

In the Supabase dashboard → **SQL Editor**:

1. Paste and run `supabase/schema.sql` — creates tables and RLS policies
2. Paste and run `supabase/seed.sql` — populates all 50 articles

### 3. Invite users

In Supabase → **Authentication → Users → Invite user**:

- Add your email
- Add Huyen's email

Both will receive a magic link email to set their password. (Or leave passwordless — magic link works fine for a 2-person team.)

### 4. Scaffold the Next.js project

```bash
npx create-next-app@latest katalon-cms \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd katalon-cms
npm install @supabase/ssr @supabase/supabase-js
```

### 5. Copy the project files

Copy these files into your new project:

```
types/index.ts
utils/supabase/client.ts
utils/supabase/server.ts
middleware.ts
app/layout.tsx
app/page.tsx
app/login/page.tsx
app/actions.ts
components/ArticleBoard.tsx
components/StatusBadge.tsx
```

### 6. Set environment variables

```bash
cp .env.local.example .env.local
```

Fill in your values from Supabase → **Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 7. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/login`. Enter your email, click the magic link, and you're in.

### 8. Deploy to Vercel

1. Push to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import project
3. Connect your repo
4. In Vercel project settings → **Integrations** → search for **Supabase** → Connect
   - This automatically injects `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as env vars — no manual copy needed
5. Deploy

Share the Vercel URL with Huyen.

---

## Project structure

```
katalon-cms/
├── app/
│   ├── actions.ts          # Server actions (status, assignee, notes updates)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home — fetches articles, renders board
│   └── login/
│       └── page.tsx        # Magic link login
├── components/
│   ├── ArticleBoard.tsx    # Main interactive board (tabs, filters, updates)
│   └── StatusBadge.tsx     # Status pill component
├── types/
│   └── index.ts            # TypeScript types + display label maps
├── utils/
│   └── supabase/
│       ├── client.ts       # Browser Supabase client
│       └── server.ts       # Server component Supabase client
├── middleware.ts            # Auth route protection
└── supabase/
    ├── schema.sql           # Tables, RLS, triggers
    └── seed.sql             # All 50 articles pre-populated
```

---

## Article statuses

| Status | Meaning |
|---|---|
| `not_started` | Not yet assigned or started |
| `in_draft` | Writer is working on it |
| `drafted` | First draft complete, ready for review |
| `awaiting_proofread` | In the proofread queue |
| `published` | Live on the blog |

---

## Content plan reference

All 50 articles are grouped by:

- **Funnel stage:** TOFU (12) · MOFU (20) · BOFU (10) · Implementation (8)
- **Pillar:** AI quality platform · Unified platform · Enterprise scale · Competitive · Practitioner
- **Launch wave:**
  - `launch_day` → publish by **April 7** (articles 05, 13, 14, 16, 33)
  - `displacement_wave` → publish by **April 14** (articles 17, 18, 21, 22, 24, 25, 36, 37, 38)
  - `ongoing` → rolling monthly cadence

---

## Future additions (backlog)

- [ ] `/article/[id]` detail page with full notes editor + comment thread
- [ ] Email notifications when status changes (Supabase webhooks → Resend)
- [ ] Progress bar / sprint view grouped by launch wave
- [ ] Export to CSV for offline review
- [ ] Brief doc upload per article
