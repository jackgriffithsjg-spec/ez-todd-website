-- EZ TODD by EZ Law production foundation schema.
-- Run this in Supabase SQL Editor or through the Supabase CLI before enabling the real portal.

create extension if not exists "pgcrypto";

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  owner_legal_name text not null,
  owner_prior_name text,
  owner_mailing_address text not null,
  owner_phone text not null,
  owner_email text not null,
  owner_marital_status text not null,
  spouse_legal_name text,
  property_county text not null,
  property_address text not null,
  property_type text not null,
  is_homestead boolean not null default false,
  legal_description_status text not null,
  legal_description text,
  deed_type_preliminary text not null,
  deed_type_selected text,
  recommendation_reason text,
  price_base integer not null,
  legal_description_addon boolean not null default false,
  price_total integer not null,
  status text not null,
  payment_status text not null default 'Not Started',
  agreement_status text not null default 'Not Started',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.submission_beneficiaries (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  beneficiary_type text not null,
  full_name text not null,
  relationship text,
  mailing_address text,
  share_percentage numeric,
  is_alternate boolean not null default false
);

create table if not exists public.submission_flags (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  tier text not null,
  label text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.submission_notes (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  note text not null,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.status_history (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by uuid,
  created_at timestamptz not null default now()
);

create index if not exists submissions_created_at_idx on public.submissions(created_at desc);
create index if not exists submissions_status_idx on public.submissions(status);
create index if not exists submission_beneficiaries_submission_id_idx on public.submission_beneficiaries(submission_id);
create index if not exists submission_flags_submission_id_idx on public.submission_flags(submission_id);
create index if not exists submission_notes_submission_id_idx on public.submission_notes(submission_id);
create index if not exists status_history_submission_id_idx on public.status_history(submission_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists submissions_set_updated_at on public.submissions;
create trigger submissions_set_updated_at
before update on public.submissions
for each row execute function public.set_updated_at();

alter table public.submissions enable row level security;
alter table public.submission_beneficiaries enable row level security;
alter table public.submission_flags enable row level security;
alter table public.submission_notes enable row level security;
alter table public.status_history enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.submissions to authenticated;
grant select, insert, update on public.submission_beneficiaries to authenticated;
grant select, insert, update on public.submission_flags to authenticated;
grant select, insert, update on public.submission_notes to authenticated;
grant select, insert on public.status_history to authenticated;
grant insert on public.submissions to anon;
grant insert on public.submission_beneficiaries to anon;
grant insert on public.submission_flags to anon;

drop policy if exists "Authenticated users can read submissions" on public.submissions;
create policy "Authenticated users can read submissions"
on public.submissions for select
to authenticated
using (true);

drop policy if exists "Authenticated users can update submissions" on public.submissions;
create policy "Authenticated users can update submissions"
on public.submissions for update
to authenticated
using (true)
with check (true);

drop policy if exists "Public users can create intake submissions" on public.submissions;
create policy "Public users can create intake submissions"
on public.submissions for insert
to anon
with check (true);

drop policy if exists "Authenticated users can read beneficiaries" on public.submission_beneficiaries;
create policy "Authenticated users can read beneficiaries"
on public.submission_beneficiaries for select
to authenticated
using (true);

drop policy if exists "Public users can create beneficiaries" on public.submission_beneficiaries;
create policy "Public users can create beneficiaries"
on public.submission_beneficiaries for insert
to anon
with check (true);

drop policy if exists "Authenticated users can read flags" on public.submission_flags;
create policy "Authenticated users can read flags"
on public.submission_flags for select
to authenticated
using (true);

drop policy if exists "Public users can create flags" on public.submission_flags;
create policy "Public users can create flags"
on public.submission_flags for insert
to anon
with check (true);

drop policy if exists "Authenticated users can read notes" on public.submission_notes;
create policy "Authenticated users can read notes"
on public.submission_notes for select
to authenticated
using (true);

drop policy if exists "Authenticated users can create notes" on public.submission_notes;
create policy "Authenticated users can create notes"
on public.submission_notes for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update notes" on public.submission_notes;
create policy "Authenticated users can update notes"
on public.submission_notes for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can read status history" on public.status_history;
create policy "Authenticated users can read status history"
on public.status_history for select
to authenticated
using (true);

drop policy if exists "Authenticated users can create status history" on public.status_history;
create policy "Authenticated users can create status history"
on public.status_history for insert
to authenticated
with check (true);

-- TODO before launch: tighten policies with role-based authorization, attorney/team membership,
-- least-privilege table grants, stricter intake validation, abuse/rate limiting, and audit review.
