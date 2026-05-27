alter table public.profiles
  add column if not exists onboarding_completed boolean not null default false;

-- Comptes existants : considérés comme configurés
update public.profiles set onboarding_completed = true where onboarding_completed = false;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  chosen_role text;
  user_is_admin boolean;
  has_role_in_meta boolean;
begin
  has_role_in_meta := nullif(trim(new.raw_user_meta_data->>'role'), '') is not null
    and (new.raw_user_meta_data->>'role') in ('aupair', 'family');

  chosen_role := coalesce(nullif(trim(new.raw_user_meta_data->>'role'), ''), 'aupair');
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

  insert into public.profiles (id, email, role, full_name, avatar_url, onboarding_completed)
  values (
    new.id,
    new.email,
    chosen_role,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(coalesce(new.email, ''), '@', 1)
    ),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    user_is_admin or has_role_in_meta
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    updated_at = now();

  return new;
end;
$$;
