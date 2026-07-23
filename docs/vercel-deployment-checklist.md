# Vercel Soft-Launch Deployment Checklist

## Project

- Framework: Next.js App Router
- Build command: `npm run build`
- Output directory: leave blank / Vercel default
- Install command: `npm install`
- Node version: Vercel default is acceptable

## Before Deploying

1. Install Node.js locally if it is not already installed.
2. From the project folder, run:

   ```bash
   npm install
   npm run build
   npm run typecheck
   ```

3. If the build passes, commit the project to Git.
4. Push the repository to GitHub.
5. Import the repository in Vercel.

## Vercel Settings

- Framework Preset: `Next.js`
- Root Directory: project root
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave empty
- Environment Variables: required for live intake collection

## Required Environment Variables

Add these in Vercel before the production deployment:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://www.transferondeathdeedtexas.com
```

Add these only if Clio Manage is being connected during launch:

```bash
CLIO_CLIENT_ID=
CLIO_CLIENT_SECRET=
CLIO_REDIRECT_URI=https://www.transferondeathdeedtexas.com/api/clio/callback
CLIO_CONNECT_SECRET=
CLIO_REFRESH_TOKEN=
CLIO_MANAGE_BASE_URL=https://app.clio.com
```

## Soft-Launch Notes

- This launch version collects intake submissions through Supabase.
- Payment, e-signature, document generation, and online file uploads are not connected.
- Submitted intake records should be reviewed in the internal portal before any engagement or payment instructions are sent.
- Static `.html` files are local preview artifacts. The deployed Vercel site should use the Next.js routes.
- Footer contact details `(806) 777-6249` and `contact@getezlaw.com` should be confirmed before launch.

## Final Smoke Test

After deployment:

1. Submit one test intake from `/intake`.
2. Confirm the user lands on `/intake/confirmation`.
3. Confirm the submission appears in Supabase.
4. Sign in at `/portal/login`.
5. Confirm the submission appears in `/portal`.
6. Confirm logged-out visitors cannot access `/portal`.
7. Confirm `/sitemap.xml` and `/robots.txt` load.
8. Test the Clio booking link on `/contact`.
