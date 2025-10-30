# Tina CMS Setup Guide

## Step 1: Create Tina Cloud Account

1. Go to [app.tina.io](https://app.tina.io/)
2. Sign in with GitHub
3. Click "Create a project"
4. Choose **"Custom project"** (not starter project)

## Step 2: Connect Your Repository

1. In Tina Cloud dashboard, select your GitHub repository: `ACNoonan/how-to-vibe-code`
2. Set the root directory to: `/site`
3. Click "Continue"

## Step 3: Get Your Credentials

1. In your Tina project dashboard, go to **"Tokens"**
2. Copy your **Client ID** and **Read-only Token**

## Step 4: Configure Environment Variables

Create `.env.local` in the site directory:

```bash

```

## Step 5: Test Locally

```bash
cd site
pnpm run dev:tina
```

Visit `http://localhost:3000/admin` to access the Tina CMS admin panel.

## Step 6: Enable Open Authoring (for student contributions)

1. In Tina Cloud dashboard, go to **"Settings"**
2. Enable **"Open Authoring"**
3. This allows anyone with a GitHub account to edit and create pull requests

##  Step 7: Test the Edit Workflow

1. Browse to any course page
2. Add `/admin` to the URL (e.g., `http://localhost:3000/admin`)
3. Make an edit
4. Save - this will create a commit or PR depending on permissions

## Deployment Notes

For production deployment (GitHub Pages/Vercel):

1. Add the environment variables to your deployment platform
2. Use `pnpm run build:tina` in the build command
3. Tina will work on the live site, allowing visual editing with automatic PR creation

