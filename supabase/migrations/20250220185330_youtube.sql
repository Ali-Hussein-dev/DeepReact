create table public.youtube_channels (
  id bigint generated always as identity not null,
  channel_title text not null,
  channel_username text not null,
  channel_id text null,
  last_published_video_date timestamp with time zone null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint youtube_channels_pkey primary key (id)
) TABLESPACE pg_default;

create table public.youtube (
  id bigint generated always as identity not null,
  title text not null,
  channel_title text not null,
  youtube_channels_id bigint null,
  description text null,
  thumbnails jsonb not null,
  published_at timestamp with time zone null,
  video_id text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint youtube_pkey primary key (id),
  constraint youtube_youtube_channels_id_fkey foreign KEY (youtube_channels_id) references youtube_channels (id)
) TABLESPACE pg_default;

