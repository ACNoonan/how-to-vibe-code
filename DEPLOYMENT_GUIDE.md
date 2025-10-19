# Deployment Guide

## Your Site is Ready! 🎉

The migration to Nextra + Tina CMS is complete and tested locally:
- ✅ Main site works at `http://localhost:3000`
- ✅ Tina admin works at `http://localhost:3000/admin`  
- ✅ Production build successful
- ✅ GitHub Actions workflow configured

## Next Steps to Deploy

### 1. Commit and Push Your Changes

```bash
cd /Users/adamnoonan/Documents/vibe-coding-course

# Add all files
git add .

# Commit
git commit -m "Complete migration to Nextra + Tina CMS

- Migrated from custom Next.js App Router to Nextra (Pages Router)
- Downgraded to Nextra 3.2.0 for stability
- Integrated Tina CMS for visual editing
- Configured GitHub Actions for deployment
- Added documentation for contributors and maintainers"

# Push to GitHub
git push origin main
```

### 2. Configure GitHub Pages

1. Go to: **https://github.com/ACNoonan/vibe-coding-course/settings/pages**

2. Under **Build and deployment**:
   - **Source:** Select "GitHub Actions"
   
3. Wait for the workflow to run (check: **https://github.com/ACNoonan/vibe-coding-course/actions**)

### 3. Add Tina Cloud Secrets

Your workflow needs these secrets to enable the visual editor in production:

1. Go to: **https://github.com/ACNoonan/vibe-coding-course/settings/secrets/actions**

2. Click **New repository secret** and add:
   - **Name:** `NEXT_PUBLIC_TINA_CLIENT_ID`
   - **Value:** `fb2ae322-6981-4c14-8d69-0de9917c5204`

3. Add another secret:
   - **Name:** `NEXT_PUBLIC_TINA_TOKEN`  
   - **Value:** `a26a176f776a5ae5525648c969fc9c0420e721b0`

### 4. Verify Deployment

After the GitHub Action completes (~2-3 minutes):

- **Live Site:** https://acnoonan.github.io/vibe-coding-course
- **Admin:** https://acnoonan.github.io/vibe-coding-course/admin/index.html

## Local Development

### Running the Site

```bash
cd /Users/adamnoonan/Documents/vibe-coding-course/site

# Regular development (no Tina)
pnpm run dev

# With Tina CMS visual editor
pnpm run dev:tina
```

### Making Content Changes

1. **Visual Editor:** Run `pnpm run dev:tina`, then go to `/admin`
2. **Direct Edit:** Edit MDX files in `/site/pages/`
3. **Navigation:** Edit `/site/pages/_meta.js`

## Important Notes

### Nextra Version
- Using **Nextra 3.2.0** (not 4.6.0)
- Version 4.x had compatibility issues with Pages Router
- Version 3.2.0 requires `_meta.js` (not `_meta.json`)

### Tina CMS Access
- In production, admin is at: `/admin/index.html` (not `/admin`)
- The redirect only works in development mode
- Update edit link in `theme.config.js` if needed

### GitHub Pages URL
- Uses `/vibe-coding-course` base path
- Configured in `next.config.mjs` for production only
- Development runs at root path for simplicity

## Troubleshooting

### Build Fails
- Check GitHub Actions logs
- Verify secrets are set correctly
- Ensure pnpm-lock.yaml is committed

### 404 on GitHub Pages
- Wait 2-3 minutes after first deploy
- Verify GitHub Pages source is "GitHub Actions"
- Check that `.nojekyll` file exists in `site/public/`

### Tina Admin Not Loading
- Verify secrets are set in GitHub
- Check that `/admin/index.html` exists in deployment
- Try accessing `/admin/index.html` directly

## What Was Changed

### Key Technical Decisions

1. **Nextra 3.2.0 vs 4.6.0**
   - 4.6.0 had issues with Pages Router requiring `app` directory
   - 3.2.0 is more stable and better documented
   - Trade-off: Some newer features not available

2. **Pages Router vs App Router**
   - Nextra works best with Pages Router
   - Simpler integration with Tina CMS
   - Existing components reused successfully

3. **Tina CMS Integration**
   - Optional: Use `dev:tina` vs `dev`  
   - Separate build command: `build:tina`
   - GitHub-based content workflow ready

### Files Changed/Added

**Configuration:**
- `next.config.mjs` - Nextra + GitHub Pages config
- `theme.config.js` - Nextra theme customization
- `pages/_meta.js` - Navigation structure
- `.tina/config.ts` - Tina CMS schema

**Content:**
- Converted all `.md` to `.mdx` in `pages/`
- Added frontmatter to each page
- Cleaned up Notion export artifacts

**Components:**
- Reused: `TodoCheckbox`, `Callout`, `DownloadButton`, `EditableInput`
- Added: `mdx-components.js` for MDX integration

**Deployment:**
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `public/.nojekyll` - GitHub Pages compatibility

**Documentation:**
- `CONTRIBUTING.md` - Student contribution guide
- `MAINTENANCE.md` - Instructor guide
- `MIGRATION_COMPLETE.md` - Technical migration details

## Success Criteria

- [x] Local site loads without errors
- [x] Tina admin accessible and functional
- [x] Production build completes successfully
- [ ] GitHub Actions workflow runs
- [ ] Site accessible at GitHub Pages URL
- [ ] Visual editor works in production

You're ready to deploy! 🚀

