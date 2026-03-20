CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body_markdown TEXT NOT NULL,
  side TEXT NOT NULL,
  status TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  cover_image_url TEXT,
  cover_image_alt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT blog_posts_side_check CHECK (side IN ('engineering', 'production', 'bridge')),
  CONSTRAINT blog_posts_status_check CHECK (status IN ('draft', 'published')),
  CONSTRAINT blog_posts_published_at_check CHECK (
    status <> 'published' OR published_at IS NOT NULL
  )
);