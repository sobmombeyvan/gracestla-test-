-- Profils utilisateurs Mon Espace (liés à Supabase Auth)

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'aupair' check (role in ('aupair', 'family', 'admin')),
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_email_idx on public.profiles (lower(email));

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

-- Création / mise à jour du profil à l'inscription Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  chosen_role text;
  user_is_admin boolean;
begin
  chosen_role := coalesce(
    nullif(trim(new.raw_user_meta_data->>'role'), ''),
    'aupair'
  );

  if chosen_role not in ('aupair', 'family', 'admin') then
    chosen_role := 'aupair';
  end if;

  select exists (
    select 1 from public.admin_allowlist a
    where lower(a.email) = lower(new.email)
  ) into user_is_admin;

  if user_is_admin then
    chosen_role := 'admin';
  end if;

  insert into public.profiles (id, email, role, full_name, avatar_url)
  values (
    new.id,
    new.email,
    chosen_role,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(coalesce(new.email, ''), '@', 1)
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Rôle effectif (admin allowlist prioritaire)
create or replace function public.get_my_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when public.is_admin() then 'admin'
    else coalesce(
      (select p.role from public.profiles p where p.id = auth.uid()),
      'aupair'
    )
  end;
$$;

grant execute on function public.get_my_role() to authenticated;
