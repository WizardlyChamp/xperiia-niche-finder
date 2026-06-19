XPERIIA NICHE FINDER

index.html    The Niche Finder quiz (your public page)
admin.html    The leads dashboard (password protected)
vercel.json   Vercel config: clean URLs + keeps the dashboard out of Google

------------------------------------------------------------
YOUR BACKEND (already live, nothing to set up)
------------------------------------------------------------
Every completed quiz saves automatically to your Supabase database,
in a table called xperiia_niche_leads, isolated from your Zenspire CRM.
The quiz can only ADD leads, never read them, so the key inside
index.html is safe to ship publicly. You read leads in the dashboard.

Dashboard password:  xperiia-1xtFEOG1i9A8I8

------------------------------------------------------------
DEPLOY TO VERCEL (pick one)
------------------------------------------------------------
Option 1  Vercel CLI (fastest, needs Node on a computer)
  1. Open a terminal in this folder
  2. npm i -g vercel
  3. vercel          (log in when asked, accept the defaults)
  4. vercel --prod   (this prints your live link)

Option 2  GitHub + Vercel (best for ongoing edits)
  1. Put these files in a GitHub repo
  2. vercel.com  ->  Add New  ->  Project  ->  import the repo  ->  Deploy
  3. Future edits: push to GitHub and Vercel redeploys automatically

After deploy:
  Quiz       https://YOUR-PROJECT.vercel.app/
  Dashboard  https://YOUR-PROJECT.vercel.app/admin

------------------------------------------------------------
BEFORE YOU GO LIVE
------------------------------------------------------------
1. Open the dashboard, sign in, delete the "Test Lead (delete me)" row
2. Add your booking link: in index.html find   const BOOKING_URL = "";
   and paste your Calendly / WhatsApp / form link between the quotes
