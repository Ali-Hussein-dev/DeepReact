CREATE OR REPLACE FUNCTION count_search_webpages(search_term text)
RETURNS bigint AS $$
DECLARE
    result_count bigint;
BEGIN
    SELECT COUNT(DISTINCT wp.website_id) INTO result_count
    FROM public.webpages wp
    JOIN public.websites w ON wp.website_id = w.id
    WHERE to_tsvector(wp.title) @@ websearch_to_tsquery(search_term);
    RETURN result_count;
END;
$$ LANGUAGE plpgsql;
