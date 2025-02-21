create table public.websites (
  id bigint generated always as identity not null,
  domain text not null,
  title text not null default ''::text,
  snippet text not null,
  image_url text not null,
  search_url text null,
  last_time_scraped timestamp with time zone null default now(),
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint websites_pkey primary key (id),
  constraint websites_domain_key unique (domain)
) TABLESPACE pg_default;

 create table public.webpages (
  id bigint generated always as identity not null,
  title text not null,
  snippet text null,
  website_id bigint not null,
  link text not null,
  updated_at timestamp with time zone null default now(),
  created_at timestamp with time zone null default now(),
  constraint website_id_fkey foreign KEY (website_id) references websites (id)
) TABLESPACE pg_default;

create index IF not exists idx_webpages_title on public.webpages using pgroonga (title) TABLESPACE pg_default;