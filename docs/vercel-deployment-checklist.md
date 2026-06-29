# Vercel Deployment Checklist

## Project

- Framework: Next.js App Router
- Build command: `npm run build`
- Output directory: leave blank / Vercel default
- Install command: `npm install`
- Node version: Vercel default is acceptable for this mockup

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
- Environment Variables: none required for this prototype

## Prototype Notes

- This project does not connect payment, e-signature, database, or backend submission.
- Static `.html` files are local preview artifacts. The deployed Vercel site should use the Next.js routes.
- Footer placeholders `(806) 777-6249` and `Edzafrani@gmail.com` should be confirmed before launch.
