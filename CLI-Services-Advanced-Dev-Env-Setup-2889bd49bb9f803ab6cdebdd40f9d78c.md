
**Git Fundamentals, Supabase CLI, and Development Workflows**


---


## 📚 Part 1 — Git Basics for Beginners


Git helps you track changes, collaborate with others, and sync your code between your computer and GitHub.


### Core Git Workflow (The Essential Four)


**1. Pull** — Download latest changes from GitHub to your computer


`git pull`


Use this **before you start working** to make sure you have the newest code.


**2. Add** — Stage files you want to save (like adding items to a shopping cart)


_`# Add a specific file`_
`git add filename.js`

_`# Add all changed files`_
`git add .`


**3. Commit** — Save your changes with a descriptive message


`git commit -m "Add user login feature"`


Think of commits as save points in a video game — each one captures the state of your project.


**4. Push** — Upload your commits to GitHub


`git push`


### Complete Example Workflow


_`# Start your work session`_
`git pull`

_`# Make changes to your files...# (edit code, create new files, etc.)# Check what changed`_
`git status`

_`# Stage your changes`_
`git add .`

_`# Save with a message`_
`git commit -m "Fix navigation bug and add footer"`

_`# Upload to GitHub`_
`git push`


### Checking Your Status


_`# See what files changed`_
`git status`

_`# See detailed changes`_
`git diff`

_`# See commit history`_
`git log --oneline`


### First-Time Repository Setup


If you're starting a new project:


_`# In your project folder`_
`git init
git add .
git commit -m "Initial commit"`

_`# Connect to GitHub (replace with your repo URL)`_
`git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main`


### Common Issues & Fixes


**Merge conflicts?** This happens when GitHub has changes you don't have locally.


`git pull`  _`# Git will tell you about conflicts# Open conflicted files and choose which changes to keep`_
`git add .
git commit -m "Resolve merge conflicts"
git push`


**Made a mistake in your last commit message?**


`git commit --amend -m "Corrected commit message"`


**Want to undo changes before committing?**


`git restore filename.js`  _`# Undo changes to one file`_
`git restore .`            _`# Undo all changes`_


---


## 🗄️ Part 2 — Supabase CLI Deep Dive


The Supabase CLI lets you manage your database, run migrations, and develop locally.


### Initial Setup & Login


_`# Login to Supabase`_
`supabase login`

_`# Link your project (run this in your project folder)`_
`supabase link --project-ref your-project-ref`


**Finding your project ref:** Go to your Supabase dashboard → Project Settings → General → Reference ID


### Database Migrations


Migrations are version-controlled database changes — think of them as Git commits, but for your database structure.


### Creating a Migration


_`# Create a new migration file`_
`supabase migration new create_users_table`


This creates a file like `supabase/migrations/20240110123456_create_users_table.sql`


Edit this file to define your database changes:

- _`- Example migration`_
`create table users ( id uuid primary key default uuid_generate_v4(), email text unique not null, created_at timestamp with time zone default now()
);`

### Pushing Migrations to Your Database


_`# Apply migrations to your remote Supabase project`_
`supabase db push`


This runs any new migration files against your cloud database.


### Pulling Schema from Remote


_`# Download current database schema to local migration files`_
`supabase db pull`


Use this when someone else has made database changes, or to capture manual changes you made in the Supabase dashboard.


### Migration Workflow Example


_`# 1. Create migration`_
`supabase migration new add_profiles_table`

_`# 2. Edit the generated .sql file in supabase/migrations/# 3. Apply to remote database`_
`supabase db push`

_`# 4. Commit to Git`_
`git add supabase/migrations/
git commit -m "Add profiles table migration"
git push`


### Understanding the Migrations Folder


`your-project/
└── supabase/
    ├── migrations/
    │   ├── 20240101120000_initial_schema.sql
    │   ├── 20240105140000_add_profiles.sql
    │   └── 20240110160000_add_posts.sql
    └── config.toml`

- Each file is timestamped and runs in order
- Never edit old migration files — create new ones instead
- These files should be committed to Git
- Migrations are **one-way** — they describe what to add/change

### Viewing Your Database Schema


**Option 1: Inspect command (Requires Docker Desktop)**


_`# View all tables and their columns`_
`supabase db diff`


**Option 2: Generate schema documentation**


_`# Show current remote schema as SQL`_
`supabase db dump --schema public`

_`# Show specific table`_
`supabase db dump --schema public --table users`


**Option 3: Interactive PostgreSQL shell**


_`# Connect to remote database`_
`supabase db shell`

_`# Then run SQL queries:`_
`\dt           -- List all tables
\d users      -- Describe 'users' table structure
SELECT * FROM information_schema.columns WHERE table_name = 'users';
\q            -- Quit`


**Option 4: Use the dashboard**


Go to your Supabase project → Table Editor or SQL Editor for a visual interface.


### Local Development with Supabase


Run a complete local Supabase instance (requires Docker Desktop):


_`# Start local Supabase`_
`supabase start`

_`# This gives you:# - Local database (PostgreSQL)# - Local API# - Local Studio dashboard (usually http://localhost:54323)# Apply migrations locally`_
`supabase db reset`

_`# Stop local instance`_
`supabase stop`


### Useful Commands Summary


`supabase login`                    _`# Authenticate CLI`_
`supabase link`                     _`# Connect to cloud project`_
`supabase migration new <name>`     _`# Create migration file`_
`supabase db push`                  _`# Apply migrations to remote`_
`supabase db pull`                  _`# Download remote schema`_
`supabase db diff`                  _`# Compare local vs remote`_
`supabase db reset`                 _`# Reset local DB with migrations`_
`supabase db shell`                 _`# Open PostgreSQL shell`_
`supabase status`                   _`# Check local services`_


---


## ⚡ Part 3 — Vercel CLI Essentials


The Vercel CLI lets you deploy from your terminal and manage projects.


### Installation & Login


_`# Install globally`_
`npm install -g vercel`

_`# Login (opens browser)`_
`vercel login`


### Deploying Your Project


_`# First-time setup (run in project folder)`_
`vercel`

_`# Follow prompts to link project# This creates a vercel.json config file# Deploy to preview`_
`vercel`

_`# Deploy to production`_
`vercel --prod`


### Useful Commands


`vercel dev`           _`# Run local development server`_
`vercel logs`          _`# View deployment logs`_
`vercel ls`            _`# List your projects`_
`vercel inspect`       _`# Get deployment details`_
`vercel env`           _`# Manage environment variables`_
`vercel pull`          _`# Download project settings`_


---


## 💻 Part 4 — Cursor IDE Tips


Cursor doesn't have a traditional CLI, but here are useful terminal commands within Cursor:


### Opening Projects


_`# Open current folder in Cursor`_
`cursor .`

_`# Open specific folder`_
`cursor /path/to/project`


### Cursor Features to Know

- **Cmd/Ctrl + K**: AI chat inline
- **Cmd/Ctrl + L**: Open AI chat panel
- **Cmd/Ctrl + Shift + P**: Command palette
- **Cmd/Ctrl + `**: Open integrated terminal

---


## 🎯 Recommended Daily Workflow


_`# Morning: Get latest changes`_
`git pull`

_`# Work on features...`_


_`# Run local dev server`_
`npm run dev`  


_`# or: vercel dev# Test database changes`_
`supabase db diff`

_`# Save your work`_
`git add .
git commit -m "Descriptive message about what you built"
git push`

_`# Deploy (Vercel auto-deploys from GitHub, or use CLI)`_
`vercel --prod`


---


## 📖 Additional Resources

- **Git:** [GitHub Git Guide](https://docs.github.com/en/get-started/using-git)
- **Supabase CLI:** [Official CLI Docs](https://supabase.com/docs/guides/cli)
- **Vercel CLI:** [Vercel CLI Reference](https://vercel.com/docs/cli)
- **SQL Basics:** [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

---


## ✅ Practice Exercise


Try this end-to-end workflow:

1. Create a new migration: `supabase migration new add_tasks_table`
2. Add a simple table in the migration file
3. Push to database: `supabase db push`
4. Check it worked: `supabase db shell` → `\dt`
5. Commit to Git: `git add .` → `git commit -m "Add tasks table"` → `git push`
6. Deploy your app: `vercel --prod`

**You've now version-controlled both your code AND your database structure!**

