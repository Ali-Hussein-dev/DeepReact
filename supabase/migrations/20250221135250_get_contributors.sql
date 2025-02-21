CREATE OR REPLACE FUNCTION get_contributors(limit_count integer)
RETURNS TABLE(name text, role text, bio text, avatar_url text) AS $$
BEGIN
    RETURN QUERY
    SELECT a.name, a.role, a.bio, a.avatar_url
    FROM public.contributors a
    WHERE a.is_draft = false
    ORDER BY RANDOM()
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;