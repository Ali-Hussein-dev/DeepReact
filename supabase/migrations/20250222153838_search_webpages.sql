CREATE OR REPLACE FUNCTION search_webpages(search_term text)
RETURNS TABLE(title text, snippet text, link text, website jsonb) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (website_id) wp.title, wp.snippet, wp.link, wp.website_id,
           jsonb_build_object('title', w.title, 'image_url', w.image_url) AS website
    FROM public.webpages wp
    JOIN public.websites w ON wp.website_id = w.id
    WHERE to_tsvector(wp.title) @@ websearch_to_tsquery(search_term);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION search_youtube(search_term text)
RETURNS SETOF public.youtube AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM youtube
    WHERE to_tsvector('english', youtube.title) @@ websearch_to_tsquery(search_term);
END;
$$ LANGUAGE plpgsql;