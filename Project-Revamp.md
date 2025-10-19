# Nextra + Tina CMS Setup Guide for AI Agent

## Mission
Migrate existing Next.js course site to Nextra with Tina CMS for visual editing and GitHub-based student contributions.

---

## Phase 1: Inventory & Assessment

### 1.1 Content Inventory
**Task**: Analyze existing markdown files
**Location**: Root directory `./*.md` files

**Action Items**:
- [ ] List all `.md` files and their sizes
- [ ] Check frontmatter structure (if any)
- [ ] Identify content patterns:
  - Headers structure (H1, H2, H3 hierarchy)
  - Special elements (callouts, code blocks, todos)
  - Images/assets referenced
  - Links between documents
- [ ] Note any Notion-specific syntax that needs cleaning

**Expected Files**:
```
BUILD_-WITH-AI-Flow-of-Vibe-Coding-*.md
CLI-Services-Advanced-Dev-Env-Setup-*.md
Dev-Environment-Setup-*.md
Planning-Development-Worksheet-*.md
Self-Hosting-101-Infrastructure-Setup-*.md
```

### 1.2 Existing Code Assessment
**Task**: Review current Next.js implementation
**Location**: `./site/` directory

**Action Items**:
- [ ] Check `package.json` - note current dependencies
- [ ] Review custom components in `./site/components/`:
  - `TodoCheckbox.tsx` - can be reused
  - `Callout.tsx` - can be reused
  - `DownloadButton.tsx` - can be reused
  - Others - assess compatibility with Nextra
- [ ] Check `lib/docs.ts` and `lib/markdownProcessor.ts` for content processing logic
- [ ] Review `mdx-components.tsx` for custom MDX component mappings

**Key Question**: Can we preserve existing custom components? (Likely yes, Nextra is flexible)

---

## Phase 2: Content Preparation

### 2.1 Clean Markdown Files
**Task**: Prepare markdown for Nextra format

**Action Items**:
- [ ] **Add frontmatter** to each `.md` file:
```yaml
---
title: "Clean Title Here"
description: "Brief description"
---
```
- [ ] **Rename files** for better URLs:
  - Remove Notion UUID suffixes
  - Use kebab-case
  - Example: `Dev-Environment-Setup-*.md` → `dev-environment-setup.md`
- [ ] **Clean Notion artifacts**:
  - Remove Notion-specific syntax
  - Fix broken links
  - Verify code blocks are properly fenced
- [ ] **Organize content structure**:
```
content/
├── index.mdx (Introduction/Home)
├── dev-environment-setup.mdx
├── cli-services.mdx
├── build-with-ai-flow.mdx
├── planning-worksheet.mdx
└── self-hosting-101.mdx
```

### 2.2 Extract Reusable Components
**Task**: Prepare custom components for Nextra

**Action Items**:
- [ ] Copy `TodoCheckbox.tsx`, `Callout.tsx`, `DownloadButton.tsx` to new structure
- [ ] Update imports to work with Nextra
- [ ] Test each component in isolation

---

## Phase 3: Nextra Setup

### 3.1 Initialize Nextra
**Location**: Create new directory or work in `./site/`

**Commands**:
```bash
# Option A: Fresh start (recommended)
npx create-nextra-app@latest vibe-coding-course
cd vibe-coding-course

# Option B: Install in existing site
cd site
npm install nextra nextra-theme-docs
```

**Action Items**:
- [ ] Run initialization
- [ ] Choose "docs" theme when prompted
- [ ] Select TypeScript: Yes
- [ ] Select Tailwind CSS: Yes

### 3.2 Configure Nextra
**Task**: Set up theme and navigation

**File**: `theme.config.tsx`
```tsx
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Vibe Coding Course</span>,
  project: {
    link: 'https://github.com/[your-username]/[repo-name]',
  },
  docsRepositoryBase: 'https://github.com/[your-username]/[repo-name]/tree/main',
  footer: {
    text: 'Vibe Coding Course - Community Driven Learning',
  },
  editLink: {
    text: 'Edit this page →'
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  // Disable edit link for now (Tina will replace it)
  // editLink: {
  //   component: null
  // }
}

export default config
```

**File**: `next.config.js`
```js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  flexsearch: {
    codeblocks: false
  }
})

module.exports = withNextra({
  output: 'export', // For static export to GitHub Pages
  images: {
    unoptimized: true // Required for static export
  },
  basePath: process.env.BASE_PATH || '',
  // ... other config
})
```

### 3.3 Migrate Content
**Task**: Move cleaned markdown to Nextra structure

**Action Items**:
- [ ] Create `pages/` directory (Nextra content folder)
- [ ] Move cleaned `.mdx` files to `pages/`
- [ ] Create `pages/_meta.json` for navigation:
```json
{
  "index": "Introduction",
  "dev-environment-setup": "Dev Environment Setup",
  "cli-services": "CLI Services & Advanced Setup",
  "build-with-ai-flow": "Build with AI Flow",
  "planning-worksheet": "Planning & Development",
  "self-hosting-101": "Self-Hosting 101"
}
```

### 3.4 Integrate Custom Components
**Task**: Wire up existing components

**Action Items**:
- [ ] Move component files to `components/` in Nextra root
- [ ] Create `mdx-components.tsx` (or update existing):
```tsx
import type { MDXComponents } from 'mdx/types'
import { TodoCheckbox } from './components/TodoCheckbox'
import { Callout } from './components/Callout'
import { DownloadButton } from './components/DownloadButton'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    TodoCheckbox,
    Callout,
    DownloadButton,
    ...components,
  }
}
```
- [ ] Test components in content files

---

## Phase 4: Tina CMS Integration

### 4.1 Install Tina
**Commands**:
```bash
npx @tinacms/cli@latest init
```

**What this does**:
- Adds Tina dependencies
- Creates `.tina/` config directory
- Sets up schema

### 4.2 Configure Tina Schema
**File**: `.tina/config.ts`

**Action Items**:
- [ ] Define content schema for course pages
```typescript
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.NEXT_PUBLIC_TINA_TOKEN,
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "public",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "course",
        label: "Course Pages",
        path: "pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "TodoCheckbox",
                label: "Todo Checkbox",
                fields: [
                  {
                    name: "children",
                    label: "Text",
                    type: "rich-text",
                  },
                ],
              },
              {
                name: "Callout",
                label: "Callout",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "error"],
                  },
                  {
                    name: "children",
                    label: "Content",
                    type: "rich-text",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
```

### 4.3 Set Up Tina Cloud (for GitHub PR workflow)
**Task**: Enable visual editing with GitHub integration

**Action Items**:
- [ ] Create account at https://app.tina.io/
- [ ] Create new project, connect to GitHub repo
- [ ] Get Client ID and Token from Tina dashboard
- [ ] Add to `.env.local`:
```bash
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
NEXT_PUBLIC_TINA_TOKEN=your_token
NEXT_PUBLIC_TINA_BRANCH=main
```
- [ ] Add `.env.local` to `.gitignore`

### 4.4 Add Edit Button to Nextra
**Task**: Replace default edit link with Tina editor

**File**: `theme.config.tsx`
```tsx
editLink: {
  component: ({ filePath }) => {
    const editUrl = `/admin#/collections/course/${filePath.replace('.mdx', '')}`
    return (
      <a href={editUrl} target="_blank">
        Edit this page visually →
      </a>
    )
  }
}
```

### 4.5 Configure Tina for Open Source Contributions
**Task**: Enable anyone to edit with GitHub login

**Action Items**:
- [ ] In Tina Cloud dashboard, enable "Open Authoring"
- [ ] Configure GitHub OAuth app (Tina will guide you)
- [ ] Test flow:
  1. Student clicks "Edit this page visually"
  2. Tina prompts GitHub login
  3. Student edits in visual editor
  4. Click "Save" → Tina creates fork + PR automatically

---

## Phase 5: Local Development & Testing

### 5.1 Test Locally
**Commands**:
```bash
npm run dev
# Site runs on localhost:3000
# Tina admin at localhost:3000/admin
```

**Action Items**:
- [ ] Verify all pages load
- [ ] Test navigation
- [ ] Test custom components (TodoCheckbox, Callout, etc.)
- [ ] Test Tina editor:
  - Navigate to `/admin`
  - Edit a page
  - Verify changes appear in files
  - Verify visual editor works

### 5.2 Fix Issues
**Common issues to check**:
- [ ] Broken links between pages
- [ ] Missing images
- [ ] Component imports failing
- [ ] Styling conflicts
- [ ] TypeScript errors

---

## Phase 6: GitHub Actions Setup

### 6.1 Create Build & Deploy Workflow
**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with Next.js
        run: npm run build
        env:
          NEXT_PUBLIC_TINA_CLIENT_ID: ${{ secrets.NEXT_PUBLIC_TINA_CLIENT_ID }}
          NEXT_PUBLIC_TINA_TOKEN: ${{ secrets.NEXT_PUBLIC_TINA_TOKEN }}
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 6.2 Configure GitHub Repository
**Action Items**:
- [ ] Go to repo Settings → Secrets and variables → Actions
- [ ] Add secrets:
  - `NEXT_PUBLIC_TINA_CLIENT_ID`
  - `NEXT_PUBLIC_TINA_TOKEN`
- [ ] Go to Settings → Pages
- [ ] Source: GitHub Actions
- [ ] Save

### 6.3 Configure Base Path (if not using custom domain)
**File**: `next.config.js`
```js
module.exports = withNextra({
  output: 'export',
  images: { unoptimized: true },
  basePath: '/repo-name', // Only if using github.io/repo-name URL
})
```

**File**: `.env.production`
```bash
BASE_PATH=/repo-name
```

---

## Phase 7: First Deployment

### 7.1 Deploy
**Commands**:
```bash
git add .
git commit -m "Initial Nextra + Tina setup"
git push origin main
```

**Action Items**:
- [ ] Watch GitHub Actions run
- [ ] Fix any build errors
- [ ] Verify site is live at GitHub Pages URL
- [ ] Test all pages load
- [ ] Test Tina editor works on live site

### 7.2 Test Student Workflow
**Test the complete flow**:
- [ ] Browse to course page
- [ ] Click "Edit this page visually"
- [ ] Log in with GitHub (use test account)
- [ ] Make an edit
- [ ] Save (should create PR)
- [ ] Verify PR appears in repo
- [ ] Merge PR
- [ ] Verify site rebuilds
- [ ] Verify changes appear

---

## Phase 8: Documentation & Handoff

### 8.1 Create Student Guide
**File**: `CONTRIBUTING.md`

```markdown
# Contributing to Vibe Coding Course

## How to Suggest Edits

1. Navigate to any course page
2. Click "Edit this page visually" in the top right
3. Log in with your GitHub account
4. Make your changes in the visual editor
5. Click "Save" - this will create a pull request
6. Instructor will review and merge!

## Local Development

If you want to run the course site locally:

\`\`\`bash
git clone [repo-url]
cd [repo-name]
npm install
npm run dev
\`\`\`

Visit http://localhost:3000
```

### 8.2 Create Instructor Maintenance Guide
**File**: `MAINTENANCE.md`

```markdown
# Maintaining the Course Site

## Reviewing Student Contributions

1. Go to Pull Requests tab
2. Review the changes
3. Merge if approved
4. Site will auto-deploy in ~2 minutes

## Adding New Course Content

### Method 1: Visual Editor (Easy)
1. Go to yoursite.com/admin
2. Click "Create New"
3. Add content
4. Save & commit

### Method 2: Direct File Editing (Advanced)
1. Edit files in `pages/` directory
2. Commit and push
3. Site rebuilds automatically

## Updating Site Configuration

- Navigation: Edit `pages/_meta.json`
- Theme: Edit `theme.config.tsx`
- Tina schema: Edit `.tina/config.ts`
```

### 8.3 Archive Old Setup
**Action Items**:
- [ ] Move old `site/` directory to `site-old/` or delete if no longer needed
- [ ] Update README.md with new setup instructions
- [ ] Document any Notion sync process for future updates

---

## Phase 9: Post-Launch Checklist

### 9.1 Verify Everything Works
- [ ] All course pages accessible
- [ ] Search works (Nextra has built-in search)
- [ ] Mobile responsive
- [ ] Todo checkboxes persist in browser
- [ ] Custom components render correctly
- [ ] Edit workflow: Browse → Click Edit → Make change → PR created → Merge → Redeploy

### 9.2 Optional Enhancements
Consider adding later:
- [ ] Custom domain (instead of github.io)
- [ ] Analytics (Google Analytics, Plausible, etc.)
- [ ] Comments system (giscus, utterances)
- [ ] Progress tracking across devices (would need auth + database)
- [ ] Certificate of completion
- [ ] Dark mode toggle (Nextra has this built-in)

---

## Quick Reference: Key Commands

```bash
# Development
npm run dev              # Start local dev server
npm run build           # Build for production
npm run start           # Preview production build

# Tina
npx tinacms dev         # Start Tina in development mode
npx tinacms build       # Build Tina for production

# Deployment (automatic via GitHub Actions)
git push origin main    # Triggers deploy
```

---

## Troubleshooting

### Build Fails
- Check all MDX files have valid frontmatter
- Verify all imports are correct
- Check Tina schema matches content structure

### Tina Editor Not Loading
- Verify environment variables are set
- Check Tina Cloud project is connected to correct repo
- Verify GitHub OAuth is configured

### GitHub Pages Not Updating
- Check GitHub Actions tab for errors
- Verify Pages is enabled in repo settings
- Confirm source is set to "GitHub Actions"

### Student PR Workflow Broken
- Verify "Open Authoring" is enabled in Tina Cloud
- Check GitHub OAuth app is configured
- Test with a fresh GitHub account

---

## Success Criteria

✅ Course content is live on GitHub Pages  
✅ Students can browse course material  
✅ Students can check off todos (persists in browser)  
✅ Students can click "Edit" and use visual editor  
✅ Student edits create PRs automatically  
✅ Instructor can merge PRs  
✅ Site rebuilds and deploys automatically after merge  
✅ Custom components work (TodoCheckbox, Callout, etc.)  
✅ Navigation and search work  

---

## Estimated Timeline

- Phase 1-2 (Inventory & Prep): 1-2 hours
- Phase 3 (Nextra Setup): 2-3 hours
- Phase 4 (Tina Integration): 2-4 hours
- Phase 5 (Testing): 1-2 hours
- Phase 6-7 (Deployment): 1-2 hours
- Phase 8-9 (Documentation): 1 hour

**Total: 8-14 hours** (for AI agent, likely faster)

---

## Notes for AI Agent

- **Preserve all existing custom components** - they're valuable
- **The Notion markdown files need cleaning** - focus on this in Phase 2
- **Test frequently** - run `npm run dev` after each major change
- **Tina schema is critical** - spend time getting it right in Phase 4.2
- **Document as you go** - add comments explaining decisions
- **Ask for clarification** if Notion markdown has unusual syntax
- **Commit frequently** - make it easy to roll back if needed

---

## Resources

- Nextra Docs: https://nextra.site
- Tina CMS Docs: https://tina.io/docs
- Nextra Theme Docs: https://nextra.site/docs/docs-theme/start
- Tina + Nextra Guide: https://tina.io/guides/tinacms/nextra/guide/
- GitHub Pages: https://docs.github.com/pages