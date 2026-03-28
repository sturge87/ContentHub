-- ============================================================
-- Katalon Content CMS — Supabase Schema
-- Run this first, then seed.sql
-- ============================================================

create extension if not exists "uuid-ossp";

-- ─── Articles ───────────────────────────────────────────────
create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  number        int  not null unique,
  title         text not null,
  pillar        text not null check (pillar in (
                  'ai_quality', 'unified', 'enterprise',
                  'competitive', 'practitioner')),
  funnel_stage  text not null check (funnel_stage in (
                  'tofu', 'mofu', 'bofu', 'implementation')),
  article_type  text not null,
  track         text check (track in ('track_1', 'track_2', 'both')),
  competitors   text[] not null default '{}',
  launch_wave   text check (launch_wave in (
                  'launch_day', 'displacement_wave', 'ongoing')),
  status        text not null default 'not_started' check (status in (
                  'not_started', 'in_draft', 'drafted',
                  'awaiting_proofread', 'published')),
  assignee      text,
  publish_by    date,
  published_url text,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── Comments ───────────────────────────────────────────────
create table if not exists public.article_comments (
  id          uuid primary key default gen_random_uuid(),
  article_id  uuid not null references public.articles(id) on delete cascade,
  author_name text not null,
  body        text not null,
  created_at  timestamptz not null default now()
);

-- ─── auto-update updated_at ─────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_updated_at
  before update on public.articles
  for each row execute function public.handle_updated_at();

-- ─── Row Level Security ─────────────────────────────────────
alter table public.articles         enable row level security;
alter table public.article_comments enable row level security;

-- Authenticated users get full read/write on articles
create policy "auth: read articles"
  on public.articles for select to authenticated using (true);

create policy "auth: update articles"
  on public.articles for update to authenticated using (true);

-- Authenticated users can read and write comments
create policy "auth: read comments"
  on public.article_comments for select to authenticated using (true);

create policy "auth: insert comments"
  on public.article_comments for insert to authenticated with check (true);

create policy "auth: delete comments"
  on public.article_comments for delete to authenticated using (true);
