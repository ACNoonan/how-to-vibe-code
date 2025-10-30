# How to Use TinaCMS with Your Nextra Site

## ✅ What's Fixed

The issue was **two conflicting TinaCMS configurations**:
- Old: `/.tina/config.ts` with collection "course" 
- New: `/tina/config.ts` with collection "page" ✓

We removed the old config and rebuilt the schema. Everything should work now!

## 🚀 Quick Start

```bash
cd /Users/adamnoonan/Documents/how-to-vibe-code/site
pnpm run dev
```

Then open: **http://localhost:3000/admin**

## 📝 How to Edit Content

### Step 1: Access the Admin Panel
- Local: `http://localhost:3000/admin`
- Production: `https://acnoonan.github.io/how-to-vibe-code/admin`

### Step 2: Navigate to Your Content
1. You'll see "Course Pages" collection in the sidebar
2. Click on it to see all your `.mdx` files:
   - index.mdx
   - introduction.mdx
   - dev-environment-setup.mdx
   - planning-worksheet.mdx
   - build-with-ai-flow.mdx
   - troubleshooting.mdx
   - advanced/cli-services.mdx
   - advanced/self-hosting-101.mdx

### Step 3: Edit a Page
1. Click on any page (e.g., "index.mdx")
2. Edit the fields in the sidebar:
   - **Title**: Page title
   - **Description**: Meta description  
   - **Body**: Rich text editor (supports markdown)
3. Click **Save** to commit changes

## 🔍 Troubleshooting

### "Nothing to edit on this page"
This message appears when you're at `/admin` without selecting a document.

**Solution**: Click "Course Pages" → Select a specific page

### Alternative: Direct URL Access
Navigate directly to a page using this format:
```
http://localhost:3000/admin#/~/collections/page/index.mdx
```

Replace `index.mdx` with any page path:
- `introduction.mdx`
- `dev-environment-setup.mdx`
- `advanced/cli-services.mdx`

## 📋 Collection Structure

Your TinaCMS is configured with:

**Collection Name**: `page`
**Path**: `pages/`
**Format**: `.mdx`
**Includes**: All `*.mdx` files
**Excludes**: `_meta.js`, `_app.js`, etc.

**Fields**:
1. **title** (string, required) - The page title
2. **description** (string, optional) - Meta description
3. **body** (rich-text, required) - Main content

## 🌐 Why No Visual Editing?

**Nextra + TinaCMS Limitation**: Nextra compiles MDX statically at build time, which is incompatible with TinaCMS's visual editing that requires dynamic data fetching.

**What works**: The admin interface with full editing capabilities ✅
**What doesn't work**: Side-by-side visual editing ❌

## 📦 Current Setup

✅ TinaCMS Config: `/tina/config.ts`
✅ Generated Files: `/tina/__generated__/*`
✅ Admin Interface: `http://localhost:3000/admin`
✅ Environment Variables: `.env.local`
✅ Git Integration: Direct commits to repository

## 🔐 Environment Variables

Your `.env.local` contains:
```bash
NEXT_PUBLIC_TINA_CLIENT_ID=fb2ae322-6981-4c14-8d69-0de9917c5204
TINA_TOKEN=a26a176f776a5ae5525648c969fc9c0420e721b0
TINA_PUBLIC_IS_LOCAL=true
```

## 🎯 Next Steps

1. **Test Locally**:
   ```bash
   pnpm run dev
   ```
   Visit: http://localhost:3000/admin
   Click: "Course Pages" → Select a page → Edit → Save

2. **Deploy to Production**:
   - Your GitHub Pages site will have TinaCMS at `/admin`
   - Users can sign in with GitHub
   - Edits create commits/PRs based on permissions

3. **Enable Open Authoring** (Optional):
   - Go to TinaCloud dashboard: https://app.tina.io
   - Enable "Open Authoring" to allow contributors to edit via PRs

## 📚 Resources

- TinaCMS Docs: https://tina.io/docs/
- Your TinaCloud Project: https://app.tina.io
- Nextra Docs: https://nextra.site

