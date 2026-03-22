# v3.0.0 Deployment Troubleshooting Guide

**Last Updated**: 2026-03-21 after fixed Dockerfile commit 8052fbc  
**Issue**: Production returns 502 Bad Gateway on all routes  
**Status**: Dockerfile fixes applied; awaiting deployment completion or server-side diagnosis

## Fixed Issues

### 1. ✅ Docker Build Permission Error (EACCES)

**Problem**: `npm install -g pnpm` failed with permission denied in non-root context  
**Root Cause**: Dockerfile switched to non-root `node` user before running npm install  
**Fix**: Moved `USER node` directive to AFTER all package installation steps  
**Commit**: 4b9a302

### 2. ✅ Missing DATABASE_URL During Build

**Problem**: Build fails when prerendering blog routes (requires database query)  
**Root Cause**: DATABASE_URL not available as build argument  
**Fix**: Added DATABASE_URL as top-level build ARG and passed to build stage  
**Commit**: 8052fbc
**Required deploy.sh Change**:

```bash
docker build \
  --build-arg DATABASE_URL="$DATABASE_URL" \
  --build-arg NODE_ENV=production \
  --build-arg APP_ORIGIN=https://aldengillespy.com \
  ...
```

## What Still Needs Investigation

### Server-Side Diagnostics Checklist

**1. Check GitHub Actions Workflow Status**

```bash
# Visit: https://github.com/brazenest/website/actions
# Check the latest deploy-production run
# Look for:
# - Did SSH step succeed?
# - Did deploy.sh execute?
# - What was the exit code?
```

**2. Check if deploy.sh exists and is correct**

```bash
# SSH into server
ssh user@aldengillespy.com

# Find deploy script
ls -la $EC2_DEPLOY_ROOT_DIR/deploy.sh
cat $EC2_DEPLOY_ROOT_DIR/deploy.sh

# Critical checks:
# - Does deploy.sh export DATABASE_URL?
# - Does deploy.sh pass --build-arg DATABASE_URL?
# - Does deploy.sh load production .env before build?
# - What port does it configure for the app?
```

**3. Check Docker Build & Container Status**

```bash
# See if build succeeded
docker images | grep website
docker image history website:latest

# Check container status
docker ps -a | grep website

# View container logs
docker logs <container_id> --tail 50

# If old container still running, check why it wasn't replaced
docker inspect <container_id> | grep -A 5 State
```

**4. Check App Process Status**

```bash
# If using PM2
pm2 status
pm2 logs

# If using systemd
systemctl status app-name
journalctl -u app-name -n 50

# If Docker Compose
docker-compose ps
docker-compose logs app -n 50
```

**5. Verify Environment Variables**

```bash
# On server, check what env vars are set for the app process
# For Docker container:
docker inspect <container_id> | grep -A 100 ENV

# Looking for:
# - DATABASE_URL (needed at runtime for queries)
# - PORT (default 3000, but needs to match nginx upstream)
# - HOST (should be 0.0.0.0 to accept nginx traffic)
# - NODE_ENV=production
# - ORIGIN (should be https://aldengillespy.com)
# - ADMIN_BASIC_AUTH_* vars
```

**6. Check Port Wiring**

```bash
# Verify nginx is configured to proxy to the right port
grep -A 5 "upstream" /etc/nginx/sites-available/default
# or /etc/nginx/nginx.conf

# Verify app is listening on that port
netstat -tlnp | grep node
# or
docker exec <container_id> netstat -tlnp

# Try connecting directly
curl -v http://localhost:3000/
# Should not return 502 if app is running
```

**7. Check Nginx Error Logs**

```bash
# View recent nginx errors
tail -50 /var/log/nginx/error.log

# Look for patterns like:
# - "connect() failed" - app process not listening
# - "upstream timed out" - app not responding
# - "permission denied" - could indicate new app can't access something
```

**8. Application Startup Issues**

```bash
# Try running the app manually to see detailed errors
docker run -it --rm \
  -e DATABASE_URL="postgresql://..." \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e ORIGIN=https://aldengillespy.com \
  website:latest

# Watch for errors during startup like:
# - Database connection failures
# - Missing environment variables
# - Port binding failures
# - Module loading errors
```

## Expected Behavior After Fix

### Successful Deployment Sequence

1. ✅ Push to main triggers GitHub Actions deploy-production
2. ✅ GitHub Actions SSH to server and runs deploy.sh (should complete in seconds)
3. ✅ deploy.sh sets environment variables and exports DATABASE_URL
4. ✅ deploy.sh runs: `docker build --build-arg DATABASE_URL="$DATABASE_URL" ...`
   - Docker builds deps stage (installs pnpm and dependencies)
   - Docker builds build stage (runs pnpm build, pnpm build.server) - needs DATABASE_URL
   - Docker builds final stage (installs pnpm as root, then switches to node user)
5. ✅ deploy.sh stops old container and starts new container
6. ✅ nginx has healthy upstream → 502 resolves
7. ✅ All routes return 200 OK

### Expected Test Results

```bash
# After deployment succeeds, these should all return 200 OK:
curl -I https://aldengillespy.com/
curl -I https://aldengillespy.com/about
curl -I https://aldengillespy.com/blog
curl -I https://aldengillespy.com/robots.txt
curl -I https://aldengillespy.com/sitemap.xml

# Admin routes should require Basic Auth:
curl -I https://aldengillespy.com/admin
# Should return 401 Unauthorized or redirect to login

# With credentials:
curl -I \
  -H "Authorization: Basic $(echo -n 'admin:password' | base64)" \
  https://aldengillespy.com/admin/
```

## Known Constraints

1. **No versioned deploy.sh**: The deployment script lives on the server and is not in the repo
   - This makes it hard to diagnose deployment issues from repo alone
   - Consider adding a reference deploy.sh to the repo in the future
   - OR: Add deployment step validation to Dockerfile (health checks, etc.)

2. **build-time DATABASE_URL**: Blog prerendering requires database access during build
   - Build will fail with "DATABASE_URL must be set" if not provided
   - deploy.sh must export this before running docker build
   - This creates a build/runtime coupling that's fragile

3. **Port configuration**: APP_SERVER_PORT env var wires nginx to app
   - If nginx is configured for port 3000 but APP_SERVER_PORT exports 5000, 502 results
   - No validation layer in place to catch this mismatch

## Prevention for Future Deployments

**Recommended improvements** (for future sprints):

1. **Add Dockerfile health check**

   ```dockerfile
   HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
     CMD curl -f http://localhost:3000/ || exit 1
   ```

2. **Add deploy.sh to repo as reference**
   - Even if production uses the server-local version, having a reference helps with debugging
   - Can be called from CI/CD as template or documentation

3. **Move DATABASE_URL dependency out of build time**
   - Consider lazy-loading blog routes or using a separate pregeneration step
   - Or: Pre-populate routes.ts with static route list, fetch blog posts at runtime

4. **Add deployment validation step**
   - After container start, curl health checks before returning control to nginx
   - Fail the deploy script if app doesn't respond on expected port

5. **Environment variable schema validation**
   - Create a startup validation that checks all required env vars are present
   - Fail fast with clear error messages instead of 502

---

**Next Contact Point**: After server-side investigation, cross-reference findings with this checklist and [PRODUCTION_READINESS_AUDIT_v3.0.0.md](PRODUCTION_READINESS_AUDIT_v3.0.0.md) for context.
