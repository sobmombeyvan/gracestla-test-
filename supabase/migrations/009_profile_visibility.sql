-- Publish/unpublish profiles for marketplace visibility

alter table public.profiles
  add column if not exists is_published boolean not null default false;

create index if not exists profiles_role_published_idx
  on public.profiles (role, is_published, created_at desc);

create or replace function public.admin_set_profile_visibility(target_user_id uuid, published boolean)
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

  update public.profiles
  set is_published = published,
      updated_at = now()
  where id = target_user_id
  returning * into result;

  return result;
end;
$$;

grant execute on function public.admin_set_profile_visibility(uuid, boolean) to authenticated;
