# Backend: Supabase Edge Function (`niche-leads`)

This folder is the source of the function that powers the leads dashboard
(`admin.html`). It reads, lists, and deletes leads using the service role key,
behind a password.

## Important: this does NOT deploy with Vercel

Pushing this folder to GitHub does nothing on its own. Vercel only serves the
static HTML files. This function lives in Supabase and is deployed separately.

It is **already deployed and working**. This folder is here so the code is
version-controlled and you never lose it.

## Files

- `index.ts` ........ the function (password auth + list/delete leads)
- `deno.json` ....... import map (Supabase JS client via JSR)

## The password

The password is read from a secret named `ADMIN_KEY`. It is intentionally not
written in any file in this repo, because the repo is public.

If you redeploy this version, set the secret first or the dashboard will lock:

```bash
# set the password (use your real dashboard password)
supabase secrets set ADMIN_KEY=your-dashboard-password

# deploy the function
supabase functions deploy niche-leads --no-verify-jwt
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected by Supabase
automatically. You do not set those.

## Notes

- `verify_jwt` is off on purpose. The function does its own password check, so
  the dashboard can call it without a logged-in user.
- The table is `public.xperiia_niche_leads`. Anonymous visitors can only INSERT
  (handled in `index.html`). All reads and deletes go through this function.
- Project ref: `nszoydpwmkslnhnsccox` (region ap-south-1).
