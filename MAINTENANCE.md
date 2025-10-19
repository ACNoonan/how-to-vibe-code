# Maintaining the Vibe Coding Course

## Repository Structure

```
vibe-coding-course/
├── site/                    # Next.js + Nextra site
│   ├── pages/              # Course content (MDX files)
│   ├── components/         # Custom React components
│   ├── .tina/             # Tina CMS configuration
│   └── public/            # Static assets
├── content/               # Cleaned content source (backup)
└── site-old/             # Previous implementation (backup)
```

## Daily Maintenance Tasks

### Reviewing Student Contributions

1. Go to the **Pull Requests** tab on GitHub
2. Review the proposed changes
3. Check for:
   - Accuracy of technical content
   - Clarity of explanations
   - Proper formatting
4. Merge approved PRs
5. Site will auto-deploy in ~2-5 minutes

### Handling Issues

- Respond to issues within 48 hours
- Label issues appropriately (`bug`, `enhancement`, `question`)
- Close resolved issues with a summary

## Content Updates

### Method 1: Visual Editor (Easy)

1. Go to `yoursite.com/admin` (after Tina is configured)
2. Log in with your GitHub account
3. Select the page to edit
4. Make changes
5. Save - commits directly to main or creates PR

### Method 2: Direct File Editing (Advanced)

1. Edit files in `site/pages/` directory
2. Commit and push to main branch
3. GitHub Actions will rebuild and deploy automatically

## Adding New Course Content

1. Create new `.mdx` file in `site/pages/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Page Title"
   description: "Brief description"
   ---
   ```
3. Update `site/pages/_meta.json` to add to navigation:
   ```json
   {
     "existing-page": "Existing Page",
     "your-new-page": "Your Page Title"
   }
   ```
4. Commit and push

## Site Configuration

### Theme & Branding
- Edit `site/theme.config.jsx`

### Navigation Order
- Edit `site/pages/_meta.json`

### Tina CMS Schema
- Edit `site/.tina/config.ts`
- Run `pnpm run build:tina` to regenerate schema

## Deployment

The site auto-deploys on push to `main` branch via GitHub Actions.

### Manual Deployment

```bash
cd site
pnpm run build
```

Output in `site/out/` directory can be deployed to any static host.

## Troubleshooting

### Build Failures

1. Check GitHub Actions logs
2. Common issues:
   - Missing frontmatter in MDX files
   - Invalid JSON in `_meta.json`
   - TypeScript errors in components

### Tina Not Working

1. Verify environment variables are set
2. Check Tina Cloud project is connected to correct repo
3. Ensure Open Authoring is enabled for public contributions

### Content Not Updating

1. Clear browser cache
2. Check if GitHub Actions deployment succeeded
3. Verify changes were pushed to main branch

## Updating Dependencies

```bash
cd site
pnpm update
pnpm run build  # Test that everything still works
```

## Backup Strategy

- Git history serves as primary backup
- `content/` directory contains cleaned source files
- `site-old/` preserved for reference

## Support Channels

- GitHub Issues: Technical problems
- GitHub Discussions: General questions
- Pull Requests: Content improvements

## Monitoring

Keep an eye on:
- GitHub Actions build status
- Open issues and PRs
- Community feedback in discussions

---

**Remember:** The goal is to maintain a high-quality, accessible learning resource. Quality over quantity!

