# EZ TODD Production Foundation

Date: June 24, 2026

## What This Adds

This phase moves EZ TODD from mock-only portal data toward a real Supabase foundation:

- Supabase client utilities for browser, server, and middleware usage.
- Supabase email/password authentication for `/portal/login`.
- Protected `/portal` and `/portal/submissions/[id]` routes.
- SQL schema for intake submissions, beneficiaries, flags, notes, and status history.
- Intake submission creation through a server API route.
- Portal dashboard and detail pages reading real Supabase submission data.
- Portal notes and status updates persisted to Supabase.

## Environment Variables

Create these variables in local `.env.local` and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLIO_GROW_API_TOKEN=
CLIO_GROW_API_BASE_URL=
CLIO_GROW_INBOX_LEADS_URL=
NEXT_PUBLIC_SITE_URL=
```

Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used by the current implementation. `SUPABASE_SERVICE_ROLE_KEY` is listed for future server-only admin workflows and must never be exposed to browser code.

The Clio variables are server-side configuration for creating a Clio Grow Inbox Lead after a completed intake submission. Set `CLIO_GROW_INBOX_LEADS_URL` directly if the firm has a specific endpoint, or set `CLIO_GROW_API_BASE_URL` and the app will post to `/inbox_leads`. If Clio is not configured or the Clio request fails, the website still saves the intake submission and logs the sync issue for internal follow-up.

## Database Schema

Schema file:

```bash
supabase/schema.sql
```

Run the SQL in the Supabase SQL Editor or through the Supabase CLI after creating the project.

Tables created:

- `submissions`
- `submission_beneficiaries`
- `submission_flags`
- `submission_notes`
- `status_history`

The schema enables Row Level Security on each table. Current prototype policies allow:

- `anon` insert-only access for public intake creation.
- `authenticated` read access for portal submissions.
- `authenticated` status updates and note creation.
- No public read access to portal data.

Before launch, tighten these policies around attorney/team roles, rate limiting, validation, and least-privilege grants.

## Create The First Attorney User

1. Open Supabase Dashboard.
2. Go to Authentication.
3. Create a user with the attorney email address.
4. Set or invite the user to create a password.
5. Use that email/password on `/portal/login`.

Before production, add role-based authorization so only approved attorney/internal users can access portal records. Do not rely only on “authenticated” for final access control.

## Intake Submission Flow

The intake questionnaire posts to:

```bash
POST /api/intake-submissions
```

The route stores:

- Owner information.
- Property information.
- Beneficiary information.
- Preliminary deed recommendation.
- Tier 1 and Tier 2 flags.
- Legal description add-on status.
- Estimated price and matter status.

After the database save succeeds, the route attempts to create a Clio Grow Inbox Lead containing the client contact details, property summary, preliminary recommendation, review flags, and local submission ID.

The intake does not collect or store Social Security numbers, dates of birth, bank information, financial account numbers, or ID uploads.

## Portal Data Flow

Protected portal routes:

- `/portal`
- `/portal/submissions/[id]`

Middleware redirects unauthenticated users to:

```bash
/portal/login
```

The dashboard reads real submissions from Supabase. The submission detail page reads the selected submission by UUID. Mock data remains in the repository for development/reference but is not used by default by the portal.

## Notes And Status Updates

Portal notes persist through:

```bash
POST /api/portal/submissions/[id]/notes
```

Portal status changes persist through:

```bash
PATCH /api/portal/submissions/[id]/status
```

Each status change writes a `status_history` entry.

## Known Limitations

- No payment integration.
- Clio sync is best-effort and depends on production Clio API credentials.
- No e-signature.
- No document generation.
- No real file upload or file access control yet.
- RLS uses broad authenticated access for the prototype foundation.
- Public intake insert policies should be hardened with validation, abuse prevention, and role-specific server workflows before launch.
- Local build commands require dependencies to be installed.

## Recommended Next Production Steps

- Add role-based access for attorneys/internal staff.
- Add stricter RLS policies based on team membership or app metadata.
- Add validation and rate limiting to intake submission creation.
- Add secure file upload and file access controls.
- Add audit log review workflows.
- Add payment, engagement agreement, e-signature, and document generation in later phases.
- Add automated route tests for portal auth redirects and submission CRUD workflows.
