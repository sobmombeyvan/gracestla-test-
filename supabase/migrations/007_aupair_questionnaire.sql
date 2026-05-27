-- Questionnaire Jeune Au Pair (dashboard → admin)

create table if not exists public.aupair_questionnaires (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists aupair_questionnaires_user_idx on public.aupair_questionnaires (user_id);
create index if not exists aupair_questionnaires_status_idx on public.aupair_questionnaires (status);

alter table public.aupair_questionnaires enable row level security;

drop policy if exists "aupair_questionnaires_select_own" on public.aupair_questionnaires;
create policy "aupair_questionnaires_select_own"
  on public.aupair_questionnaires for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "aupair_questionnaires_insert_own" on public.aupair_questionnaires;
create policy "aupair_questionnaires_insert_own"
  on public.aupair_questionnaires for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "aupair_questionnaires_update_own" on public.aupair_questionnaires;
create policy "aupair_questionnaires_update_own"
  on public.aupair_questionnaires for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "aupair_questionnaires_select_admin" on public.aupair_questionnaires;
create policy "aupair_questionnaires_select_admin"
  on public.aupair_questionnaires for select to authenticated
  using (public.is_admin());
