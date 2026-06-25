# Xperiia Niche Finder

A creator niche tool by Xperiia Digital AI LLP. A short quiz matches a creator
to three content niches, shows honest earning data, gives each niche a starter
plan, and captures the visitor as a lead. Built and owned by Xperiia.

Live: https://xperiia-niche-finder.vercel.app

## What is in here

```
xperiia-niche-finder/
├── index.html          The quiz tool (the main page)
├── admin.html          Password protected leads dashboard
├── overview.html       Product overview / dossier (Save as PDF built in)
├── vercel.json         Vercel config (clean URLs, no-index on admin)
├── .gitignore
├── README.md           This file
└── supabase/
    └── functions/
        └── niche-leads/   Backend function (deployed to Supabase, not Vercel)
            ├── index.ts
            ├── deno.json
            └── README.md
```

### Pages and routes (on Vercel)

| File           | URL           | What it is                          |
|----------------|---------------|-------------------------------------|
| `index.html`   | `/`           | The quiz tool                       |
| `overview.html`| `/overview`   | Product overview, linked in footer  |
| `admin.html`   | `/admin`      | Leads dashboard (password)          |

Clean URLs (`/overview`, `/admin`) come from `vercel.json`.

## Run it locally (VS Code)

The site is plain HTML, no build step.

1. Open this folder in VS Code (`File > Open Folder`).
2. Preview it with a local server (recommended so the Supabase calls work):
   - Easiest: install the **Live Server** extension, then right click
     `index.html` and choose "Open with Live Server".
   - Or from a terminal in this folder: `npx serve .` and open the URL it prints.
3. Edit any `.html` file and the page updates on refresh.

Opening `index.html` directly by double click also works for viewing, but a
local server is safer because some browsers block network calls from `file://`.

## Deploy (GitHub to Vercel)

This repo is already connected to Vercel and deploys on every push.

1. Commit and push the changed files to the `main` branch of
   `github.com/WizardlyChamp/xperiia-niche-finder` (or upload them in the GitHub
   web UI).
2. Vercel rebuilds automatically. Changes are live in under a minute.

Only the static files deploy with Vercel. The `supabase/` folder is reference
and is deployed separately (see its own README).

## Backend (Supabase)

Leads are stored in `public.xperiia_niche_leads`. Anonymous visitors can only
INSERT (the quiz does this with the public anon key). Reading and deleting goes
through the `niche-leads` Edge Function, which is password protected and uses
the service role key server side.

- Raw table: Supabase dashboard, project `nszoydpwmkslnhnsccox`, Table editor,
  table `xperiia_niche_leads`.
- Function source and deploy notes: `supabase/functions/niche-leads/README.md`.

The dashboard password is not stored in any file in this repo. You enter it on
the `/admin` login screen.

## To do

- The booking button in `index.html` is blank. Search for `BOOKING_URL` and set
  it to your Calendly, WhatsApp, or form link, then redeploy.

---

© 2026 Xperiia Digital AI LLP. All rights reserved.
