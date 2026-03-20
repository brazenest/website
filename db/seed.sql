-- Seed launch blog posts with local cover images
-- Run this after schema.sql to populate sample blog data

-- Engineering launch post
INSERT INTO blog_posts (
  slug,
  title,
  summary,
  body_markdown,
  side,
  status,
  published_at,
  cover_image_url,
  cover_image_alt
) VALUES (
  'postgres-schema-design-for-scale',
  'PostgreSQL Schema Design for Scalable Content Systems',
  'Designing a flexible schema that handles revisions, publishing state, and content metadata without sacrificing query performance requires deliberate boundary decisions early.',
  'When designing a content management system, the database schema forms the first constraint on what becomes possible later. A well-structured schema can handle publishing workflows, revisions, and metadata without performance penalties. A poorly designed one locks you into corners.

This post explores the decisions that went into the blog_posts table for this site: how to handle published vs draft state, why timestamps matter for sorting and filtering, when to normalize vs when to denormalize, and how to keep the schema open for future additions like categories or tags without migration chaos.

The key insight is that publishing state and temporal data are not optional—they shape every query you write. Getting them right from the start determines whether your system stays maintainable as requirements grow.',
  'engineering',
  'published',
  NOW(),
  '/media/blog/engineering-launch-cover.svg',
  'Grid pattern representing database schema design with blue gradient background'
);

-- Production launch post
INSERT INTO blog_posts (
  slug,
  title,
  summary,
  body_markdown,
  side,
  status,
  published_at,
  cover_image_url,
  cover_image_alt
) VALUES (
  'single-shoot-multiple-deliverables',
  'Planning One Shoot for Infinite Deliverables',
  'Modern production requires thinking in delivery formats before rolling camera. A single shoot can fuel social clips, promotional materials, case study footage, and archival—if you plan the coverage from the beginning.',
  'The most common mistake in production is treating the shoot as a singular output moment. You plan for one deliverable, roll whatever footage feels right in the moment, and then discover you have no usable material for the other formats that emerged during post-production.

Real production planning means specifying formats first, then designing coverage around those constraints. If you need 16:9 hero clips, 9:16 social cuts, tight detail shots, and establishing sequences, you need a shot list that guarantees all of it. You need to know which frames will be close-ups, which will be wide, and how they''ll intercut.

This post details the planning framework used for the production work shown on this site: how to structure a shot list for multiple outputs, how to protect against format drift during capture, and how to organize footage in post so that any deliverable feels intentional rather than compromised.',
  'production',
  'published',
  NOW(),
  '/media/blog/production-launch-cover.svg',
  'Film frame border design with filmstrip aesthetic and gradient background'
);

-- Bridge launch post
INSERT INTO blog_posts (
  slug,
  title,
  summary,
  body_markdown,
  side,
  status,
  published_at,
  cover_image_url,
  cover_image_alt
) VALUES (
  'revision-as-method',
  'Revision as a First-Class Design Concern',
  'Systems that treat revision as an afterthought become brittle. Whether you''re designing a content schema, a visual language, or a feature rollout, building revision capability into the foundation determines how far you can scale.',
  'Most design conversations focus on the happy path: the first publication, the launch moment, the initial release. But the real operating costs arrive during revision. What happens when you need to change a published post? Adjust a design system? Roll back a deployment?

Systems designed without revision in mind accumulate technical debt at an alarming rate. A schema that works for initial posts becomes a nightmare when you need to alter published data without losing history. A design system that works for the launch becomes a maze of one-off overrides once you need to change the rules.

This is a cross-disciplinary problem. Engineers face it with data migrations and backward compatibility. Designers face it with component library evolution. Producers face it with edit notes and color grading adjustments. But the working method is the same: build the revision model first, ensure your constraints allow for future flexibility, and treat the immutable state as a special case rather than the default.

This post examines how revision thinking applies across systems design, design systems, and production workflows—and why getting it right from the start is the only way to keep scaling.',
  'bridge',
  'published',
  NOW(),
  '/media/blog/bridge-launch-cover.svg',
  'Connection diagram showing bridges between engineering and production practice'
);
