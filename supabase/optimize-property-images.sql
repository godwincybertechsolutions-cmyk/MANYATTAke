-- Optimizes property listing queries without changing the existing images text[] design.
-- Run this manually in your Supabase SQL workflow; it is intentionally not applied by the app.

create index if not exists properties_available_type_created_at_idx
  on public.properties (is_available, type, created_at desc);

create unique index if not exists properties_slug_idx
  on public.properties (slug);

create or replace view public.property_catalog
with (security_invoker = true)
as
select
  id,
  type,
  name,
  slug,
  description,
  location,
  price_per_night,
  currency,
  capacity,
  bedrooms,
  bathrooms,
  amenities,
  coalesce(images, '{}'::text[]) as images,
  is_available,
  created_at
from public.properties;

comment on view public.property_catalog is
  'Minimal property projection for fast cards and detail pages; image URLs remain in properties.images.';

-- If your project does not expose new views automatically through the Data API,
-- grant only the read roles used by the frontend after reviewing your RLS policy.
-- grant select on public.property_catalog to anon, authenticated;

analyze public.properties;

-- Useful verification queries:
-- explain (analyze, buffers)
-- select id, type, name, images from public.property_catalog
-- where is_available = true and type = 'mountain'
-- order by created_at desc;
--
-- select indexname, indexdef
-- from pg_indexes
-- where schemaname = 'public' and tablename = 'properties';

-- Rollback:
-- drop view if exists public.property_catalog;
-- drop index if exists public.properties_available_type_created_at_idx;
-- drop index if exists public.properties_slug_idx;

