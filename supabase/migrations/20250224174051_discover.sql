create table public.categories (
  id bigint generated always as identity not null,
  name text not null,
  synonyms text[] null,
  string_synonyms text not null default ''::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint categories_pkey primary key (id)
) TABLESPACE pg_default;

create table public.github (
  id bigint generated always as identity not null,
  profile_url text null,
  homepage text null,
  description text null,
  stars numeric not null,
  last_commit timestamp with time zone null,
  avatar_url text not null default ''::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint github_pkey primary key (id)
) TABLESPACE pg_default;

create table public.resources (
  id bigint generated always as identity not null,
  name text not null,
  snippet text null,
  homepage text null,
  tags text[] null,
  github_id bigint null,
  contributor_id bigint null,
  og_image_url text null,
  logo_url text null,
  updated_at timestamp with time zone null default now(),
  created_at timestamp with time zone null default now(),
  constraint resources_pkey primary key (id),
  constraint resources_contributor_id_fkey foreign KEY (contributor_id) references contributors (id),
  constraint resources_github_id_fkey foreign KEY (github_id) references github (id)
) TABLESPACE pg_default;

create table public.resource_categories (
  id bigint generated always as identity not null,
  resource_id bigint not null,
  category_id bigint not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint resource_categories_pkey primary key (id),
  constraint resource_categories_category_id_fkey foreign KEY (category_id) references categories (id),
  constraint resource_categories_resource_id_fkey foreign KEY (resource_id) references resources (id)
) TABLESPACE pg_default;

create index IF not exists idx_resource_categories_resource_id on public.resource_categories using btree (resource_id) TABLESPACE pg_default;

create index IF not exists idx_resource_categories_category_id on public.resource_categories using btree (category_id) TABLESPACE pg_default;
