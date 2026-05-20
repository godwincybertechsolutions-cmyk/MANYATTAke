-- Run in Supabase SQL Editor (fixes bookings_user_id_fkey)
-- PostgreSQL does NOT support: create policy if not exists ...

-- 1) Allow signed-in users to create their own profile (if the trigger missed them)
drop policy if exists "Users can insert own profile" on public.user_profiles;

create policy "Users can insert own profile"
  on public.user_profiles
  for insert
  with check (auth.uid() = id);

-- 2) Backfill profiles for everyone already in auth.users
insert into public.user_profiles (id, email, first_name, last_name)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data->>'first_name', ''),
  coalesce(u.raw_user_meta_data->>'last_name', '')
from auth.users u
where u.email is not null
on conflict (id) do update set
  email = excluded.email,
  first_name = coalesce(nullif(excluded.first_name, ''), user_profiles.first_name),
  last_name = coalesce(nullif(excluded.last_name, ''), user_profiles.last_name);
