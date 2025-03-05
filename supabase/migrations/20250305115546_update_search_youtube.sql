DROP FUNCTION IF EXISTS search_youtube(text);
DROP TYPE IF EXISTS youtube_with_channel_details;

CREATE TYPE youtube_with_channel_details AS (
    title text,
    video_id text,
    published_at timestamp with time zone,
    thumbnails jsonb,
    channel_details json
);

CREATE OR REPLACE FUNCTION search_youtube(search_term text)
RETURNS SETOF youtube_with_channel_details AS $$
BEGIN
    RETURN QUERY
    SELECT youtube.title,
           youtube.video_id,  
           youtube.published_at,
           youtube.thumbnails,
           json_build_object(
               'channel_title', youtube_channels.channel_title,
               'avatar_url', youtube_channels.avatar_url
           ) AS channel_details
    FROM youtube
    INNER JOIN youtube_channels ON youtube.youtube_channels_id = youtube_channels.id
    WHERE to_tsvector('english', youtube.title) @@ websearch_to_tsquery(search_term);
END;
$$ LANGUAGE plpgsql;