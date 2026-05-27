-- Grant admin access to soBmombeyvan@gmail.com
insert into public.admin_allowlist (email)
values ('sobmombeyvan@gmail.com')
on conflict (email) do nothing;

update public.profiles
set
  role = 'admin',
  onboarding_completed = true,
  updated_at = now()
where lower(email) = lower('soBmombeyvan@gmail.com');
