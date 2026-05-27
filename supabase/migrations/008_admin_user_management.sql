-- Admin: rôles, KYC, allowlist

alter table public.profiles add column if not exists kyc_status text not null default 'none';
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists country text;

alter table public.profiles drop constraint if exists profiles_kyc_status_check;
alter table public.profiles add constraint profiles_kyc_status_check
  check (kyc_status in ('none', 'pending', 'verified', 'rejected'));

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Liste emails admin (lecture admin uniquement)
create or replace function public.admin_get_allowlist()
returns table (email text, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Accès refusé';
  end if;
  return query select a.email, a.created_at from public.admin_allowlist a;
end;
$$;

grant execute on function public.admin_get_allowlist() to authenticated;

-- Changer le rôle profil
create or replace function public.admin_set_profile_role(target_user_id uuid, new_role text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.profiles;
  user_email text;
begin
  if not public.is_admin() then
    raise exception 'Accès refusé';
  end if;
  if new_role not in ('aupair', 'family', 'admin') then
    raise exception 'Rôle invalide';
  end if;

  update public.profiles
  set role = new_role, updated_at = now()
  where id = target_user_id
  returning * into result;

  select email into user_email from public.profiles where id = target_user_id;

  if new_role = 'admin' and user_email is not null then
    insert into public.admin_allowlist (email)
    values (lower(user_email))
    on conflict (email) do nothing;
  end if;

  return result;
end;
$$;

grant execute on function public.admin_set_profile_role(uuid, text) to authenticated;

-- KYC
create or replace function public.admin_set_kyc_status(target_user_id uuid, new_status text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.profiles;
begin
  if not public.is_admin() then
    raise exception 'Accès refusé';
  end if;
  if new_status not in ('none', 'pending', 'verified', 'rejected') then
    raise exception 'Statut KYC invalide';
  end if;

  update public.profiles
  set kyc_status = new_status, updated_at = now()
  where id = target_user_id
  returning * into result;

  return result;
end;
$$;

grant execute on function public.admin_set_kyc_status(uuid, text) to authenticated;

-- Donner / retirer accès admin (allowlist)
create or replace function public.admin_grant_admin_access(target_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Accès refusé';
  end if;
  insert into public.admin_allowlist (email)
  values (lower(trim(target_email)))
  on conflict (email) do nothing;

  update public.profiles
  set role = 'admin', updated_at = now()
  where lower(email) = lower(trim(target_email));
end;
$$;

grant execute on function public.admin_grant_admin_access(text) to authenticated;

create or replace function public.admin_revoke_admin_access(target_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Accès refusé';
  end if;
  delete from public.admin_allowlist
  where lower(email) = lower(trim(target_email));

  update public.profiles
  set role = 'aupair', updated_at = now()
  where lower(email) = lower(trim(target_email)) and role = 'admin';
end;
$$;

grant execute on function public.admin_revoke_admin_access(text) to authenticated;
