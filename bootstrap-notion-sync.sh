#!/usr/bin/env bash
# bootstrap-notion-sync.sh
# Create a repo, add workflow to sync Notion -> Markdown, set NOTION_TOKEN secret, push and trigger the workflow.
set -euo pipefail

REPO_NAME="${1:-vibe-coding-course}"
REPO_DESC="Vibe Coding course content (Notion → Markdown exported)"
MAIN_BRANCH="${MAIN_BRANCH:-main}"
WORKFLOW_FILENAME=".github/workflows/notion-sync.yml"

# 1) basic prereq checks
for cmd in git gh; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: required command not found: $cmd"
    exit 1
  fi
done

# 2) create minimal repo files
mkdir -p .github/workflows
cat > README.md <<'MD'
# Vibe Coding Course — Notion ↔ GitHub export

This repo stores Markdown exports of the Notion course pages.
The repository is automatically updated by a GitHub Actions workflow that exports pages accessible to a Notion integration.

See `.github/workflows/notion-sync.yml`.
MD

cat > .gitignore <<'GITIGNORE'
node_modules/
.env
.DS_Store
GITIGNORE

# 3) create the workflow file (safe, idempotent)
cat > "${WORKFLOW_FILENAME}" <<'YAML'
name: Notion → Markdown sync

on:
  schedule:
    - cron: '0 0 * * *'   # daily at 00:00 UTC (change if you want)
  workflow_dispatch:

permissions:
  contents: write

jobs:
  export-notion:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Clean old exports (optional)
        run: |
          # remove previous exported files if you want deterministic output:
          rm -rf notion-export || true

      - name: Export Notion workspace to Markdown
        # Exports any pages your integration can access into the current working dir.
        uses: Gabriella439/notion-to-markdown@main
        with:
          notion-token: ${{ secrets.NOTION_TOKEN }}

      - name: Show changed files (debug)
        run: git status --porcelain || true

      - name: Commit exported files back to repo
        uses: EndBug/add-and-commit@v9
        with:
          add: '.'                       # add everything changed (the action exports files into the workspace)
          message: 'chore: sync Notion → Markdown'
          author_name: 'notion-sync-bot'
          author_email: 'actions@users.noreply.github.com'
          default_author: github_actions
YAML

# 4) git init / initial commit if needed
if [ ! -d .git ]; then
  git init -b "${MAIN_BRANCH}"
fi

git add --all
if git diff --staged --quiet; then
  echo "No initial changes to commit"
else
  git -c user.name="you" -c user.email="you@example.com" commit -m "chore: initial commit (Notion sync setup)"
fi

# 5) create GitHub repo (non-interactive)
# If repo already exists in remote, gh will error; script will fail fast so you can inspect/choose.
echo "Creating remote repo ${REPO_NAME} (public)..."
gh repo create "${REPO_NAME}" --public --source=. --remote=origin --push --confirm

# 6) set NOTION_TOKEN in repo secrets
# Try to read from environment, otherwise prompt the user (hidden input)
if [ -z "${NOTION_TOKEN:-}" ]; then
  read -s -p "Paste your Notion Internal Integration Secret (NOTION_TOKEN). Press ENTER: " NOTION_TOKEN
  echo ""
fi

# set secret for current repository
printf '%s' "${NOTION_TOKEN}" | gh secret set NOTION_TOKEN

# 7) ensure everything is pushed
git push -u origin "${MAIN_BRANCH}" || true

# 8) kick off the workflow once (manual run)
echo "Triggering the workflow (may take a few seconds to register)..."
gh workflow run notion-sync.yml --ref "${MAIN_BRANCH}"

echo "Bootstrapping complete."
echo "Next steps:"
echo "  1) In Notion: create an internal integration and copy its 'Internal Integration Token'."
echo "     - Ensure the integration has 'Read content' capability only (recommended)."
echo "     - Share the Notion pages (or the parent page) with the integration (Add connections on the page)."
echo "  2) Confirm the workflow run result in GitHub Actions, and inspect the repo for exported Markdown files."
