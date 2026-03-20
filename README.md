# Personal Site v3

Full-featured Qwik + Fastify production site for alden.dev.

### Implementation Complete

- ✅ Qwik 1.19.2 + Qwik City with SSR/SSG
- ✅ TypeScript 5.4.5 + Vite 7.3.1 multi-stage build
- ✅ Tailwind CSS 4.2.1 with v4 engine
- ✅ Full routing: home, about, engineering, production, blog, contact, resume
- ✅ Dynamic routes for blog posts and project details
- ✅ Structured data (Person, WebSite, Article, CreativeWork schemas)
- ✅ Accessibility verified (skip links, landmarks, ARIA labels, motion preferences)
- ✅ Responsive design and mobile navigation
- ✅ Environment-based configuration with ORIGIN, PORT, HOST
- ✅ Production Docker build with multi-stage optimization

## Fastify Server

This app has a minimal [Fastify server](https://fastify.dev/) implementation. After running a full build, you can preview the build using the command:

```
npm run serve
```

Then visit [http://localhost:3000/](http://localhost:3000/)
