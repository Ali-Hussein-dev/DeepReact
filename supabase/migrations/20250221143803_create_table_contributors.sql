create table public.contributors (
  id bigint generated always as identity not null,
  name text not null,
  role text null default ''::text,
  bio text null,
  youtube_username text null,
  twitter_username text null default ''::text,
  is_draft boolean not null default false,
  why text not null default ''::text,
  youtube_channel_id text null default ''::text,
  personal_website_url text null,
  avatar_url text null,
  updated_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  constraint contributors_pkey primary key (id)
) TABLESPACE pg_default;