<details>
<summary>Internal</summary>
- [Version control public Notion site with GitHub](https://chatgpt.com/c/68e8ea4f-612c-8332-a1c2-57eb257a580e)

</details>


## Worksheets


### Setup & Infrastructure


## Dev Environment Setup

---


**Tools:** GitHub · Git · Node.js · Vercel · Supabase · Cursor IDE


**Goal:** Create accounts and install tools so you can develop, deploy, and collaborate using your GitHub identity.


---


## ✅ SECTION 1 — Create Your Core Account (GitHub)


All other tools will connect to GitHub, so start here.


### Steps

- [ ] Go to [**https://github.com/**](https://github.com/) → click **Sign up**
- [ ] Create a **username, email, password**
- [ ] Verify your email (check your inbox and click the GitHub link)
	- [ ] (Optional but helpful) Add a profile photo and full name
- [ ] Stay signed in — you’ll use GitHub to log into other tools

---


## ✅ SECTION 2 — Install Git (for local work)


### macOS

- [ ] Open **Terminal**
- [ ] If you don’t have Homebrew, install it from [brew.sh](https://brew.sh/)
- [ ] Run:

```bash
brew install git

```


Verify:

- [ ] 

```bash
git --version

```


### Windows

- [ ] Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
- [ ] Run the installer → accept defaults
- [ ] Open **Git Bash** or **PowerShell**
- [ ] Verify:

```bash
git --version

```


### Set Git Identity (same for both)


```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

```


---


## ✅ SECTION 3 — Install Node.js (needed for CLI tools)

- [ ] Go to [https://nodejs.org](https://nodejs.org/)
- [ ] Download **LTS version** (not Current)
- [ ] Run the installer → accept defaults
- [ ] Verify:

```bash
node --version
npm --version

```


---


## ✅ SECTION 4 — Register & Connect Vercel (Hosting & Deployments)

- [ ] Go to [https://vercel.com/signup](https://vercel.com/signup)
- [ ] Click **Continue with GitHub**
- [ ] Approve GitHub access (so Vercel can see your repos)
- [ ] In dashboard → **New Project → Import Git Repository** → choose your repo
- [ ] Click **Deploy**
- [ ] Once deployed, note your project URL

**Optional CLI Setup**


```bash
npm install -g vercel
vercel login

```


☐ Follow the login prompt in your browser


---


## ✅ SECTION 5 — Register & Connect Supabase (Database & Auth)

- [ ] Go to [https://supabase.com](https://supabase.com/)
- [ ] Click **Start your project / Sign in** → **Continue with GitHub**
- [ ] Approve GitHub access
- [ ] In your dashboard → **New Project** → give it a name
- [ ] Choose free tier and wait for project creation

**Optional CLI (mac)**


```bash
brew install supabase/tap/supabase

```


**Optional CLI (Windows)**


```bash
npm install -g supabase

```


☐ Verify:


```bash
supabase --version

```


**If you plan to run Supabase locally:**


→ Install **Docker Desktop** from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)


---


## ✅ SECTION 6 — Install Cursor IDE (AI-powered Code Editor)

- [ ] Go to [https://cursor.com](https://cursor.com/)
- [ ] Click **Download Cursor**
- [ ] Install app (mac `.dmg` or Windows `.exe`)
- [ ] Open Cursor → **Sign in with GitHub**
- [ ] Approve GitHub access to enable repo features
- [ ] Create or open a new project folder

---


## ✅ SECTION 7 — Verify Everything Works

- [ ] Open Terminal or Git Bash
- [ ] Run these one by one:

```bash
git --version
node --version
npm --version
vercel --version
supabase --version

```

- [ ] Open Cursor → confirm you’re logged in
- [ ] Log into Vercel & Supabase → confirm they use your GitHub profile

✅ **You’re ready to build!**


---


## CLI Services: Advanced Dev Env Setup

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


## Self-Hosting 101: Infrastructure Setup

# Self-Hosting 101 (Advanced Setup)


**Tools:** GitHub · Git · Node.js · pnpm · Supabase · Cursor IDE · AWS EC2


**Goal:** Move from managed hosting (Vercel) to self-hosting on your own EC2 instance.


You’ll run your Next.js app locally using `pnpm`, then deploy manually to AWS.


---


## ✅ SECTION 1 — Create or Verify Core Account (GitHub)


_(Same as before — all other tools still connect through GitHub)_


---


## ✅ SECTION 2 — Install Git


_(Same as before — required for version control)_


---


## ✅ SECTION 3 — Install Node.js (LTS)


_(Same as before — ensures_ _`npm`_ _and_ _`npx`_ _are available)_


---


## ✅ SECTION 4 — Install **pnpm** (Next-generation package manager)


pnpm is a faster, disk-efficient alternative to npm or yarn.


You’ll use it to run and build your Next.js app.


### macOS / Windows


Open your terminal and run:


```bash
npm install -g pnpm


```


Verify installation:


```bash
pnpm --version


```


**Why pnpm?**

- Faster installs (shared store instead of duplicating node_modules)
- More predictable dependency tree
- Used by professional Next.js teams for production builds

---


## ✅ SECTION 5 — Create & Run a Next.js App Locally


### 1️⃣ Create a New App


```bash
pnpm create next-app my-app


```


Choose TypeScript or JavaScript when prompted.


### 2️⃣ Navigate & Install


```bash
cd my-app
pnpm install


```


### 3️⃣ Run Locally


```bash
pnpm dev


```


Then open [http://localhost:3000](http://localhost:3000/)


### 4️⃣ Connect to GitHub


Initialize and push it to your GitHub repo:


```bash
git init
git add .
git commit -m "Initial Next.js app"
git branch -M main
git remote add origin https://github.com/yourusername/my-app.git
git push -u origin main


```


✅ You now have a working Next.js app **running locally**.


---


## ✅ SECTION 6 — Connect Supabase (Database & Auth)


_(Keep this similar to your previous Section 5, since Supabase remains the backend)_


```bash
brew install supabase/tap/supabase   # mac
npm install -g supabase              # windows
supabase login
supabase link --project-ref your-project-ref


```


Add your project URL and anon key to `.env.local` in your Next.js app:


```bash
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key


```


---


## ✅ SECTION 7 — Prepare for Self-Hosting (Build Locally)


Build the optimized production bundle:


```bash
pnpm build


```


Then test it:


```bash
pnpm start


```


Your app now runs in **production mode** locally at [http://localhost:3000](http://localhost:3000/)


---


## ✅ SECTION 8 — Create Your AWS Account


### Steps

- [ ] Go to **https://aws.amazon.com/**
- [ ] Click **Create an AWS Account**
- [ ] Enter email, password, and account name
- [ ] Add billing information (credit/debit card required)
- [ ] Verify identity (SMS or call)
- [ ] Choose **Free Tier** when possible
- [ ] After setup, log in to the **AWS Management Console**

### Verify


You should see the AWS Console dashboard with a search bar at the top.


---


## ✅ SECTION 9 — Launch an EC2 Instance (Ubuntu)


### 1️⃣ Open EC2 Dashboard


Search for **EC2** in the AWS Console → **Instances → Launch Instance**


### 2️⃣ Configure Instance

- Name: `nextjs-server`
- AMI: **Ubuntu Server 24.04 LTS**
- Instance type: `t2.micro` (Free Tier)
- Key pair: **Create new key pair** → download `.pem` file
- Network settings: allow **HTTP (80)** and **HTTPS (443)** traffic
- Click **Launch Instance**

### 3️⃣ Connect to Your Instance


From your local terminal (replace `key.pem` and public DNS):


```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@ec2-your-public-dns.amazonaws.com


```


✅ You’re now logged into your cloud server.


---


## ✅ SECTION 10 — Install Dependencies on EC2


Once connected to your EC2 terminal:


```bash
sudo apt update
sudo apt install -y git curl
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm


```


Verify:


```bash
node --version
pnpm --version


```


---


## ✅ SECTION 11 — Deploy Your App Manually


### 1️⃣ Clone Your Repo


```bash
git clone https://github.com/yourusername/my-app.git
cd my-app


```


### 2️⃣ Install & Build


```bash
pnpm install
pnpm build


```


### 3️⃣ Run in Production Mode


```bash
pnpm start


```


Then visit your EC2 public DNS in a browser — your app should be live!


(example: `http://ec2-12-34-56-78.compute-1.amazonaws.com`)


---


## ✅ SECTION 12 — Keep It Running (Optional: PM2)


When you close SSH, the app stops. Use **PM2** to keep it alive.


```bash
sudo npm install -g pm2
pm2 start "pnpm start" --name "nextjs-app"
pm2 save
pm2 startup


```


Now your app runs continuously in the background.


---


## ✅ SECTION 13 — Add a Custom Domain (Optional)

- Purchase a domain (e.g. from Namecheap)
- In AWS → open **Route 53**
- Create a Hosted Zone → add an **A record** pointing to your EC2’s public IP
- Update your domain registrar’s nameservers to AWS Route 53

---


## ✅ SECTION 14 — Verify Everything Works


Run this locally and remotely:


```bash
pnpm dev      # Local development
pnpm build
pnpm start    # Local production


```


Remote server:


```bash
pm2 status


```


Check your live app in browser — if you see your Next.js homepage, congrats 🎉


---


## 🧠 Key Concepts Learned


| Concept           | Description                                        |
| ----------------- | -------------------------------------------------- |
| **pnpm**          | Fast, efficient package manager replacing npm      |
| **Local hosting** | Run and test Next.js app directly on your computer |
| **Self-hosting**  | Deploy to your own EC2 instance instead of Vercel  |
| **SSH**           | Secure remote access to a Linux server             |
| **PM2**           | Keeps Node.js apps running 24/7                    |


---


## 🧩 Practice Challenge

1. Create a new Next.js project with `pnpm create next-app`
2. Connect it to Supabase and display a list of rows from a test table
3. Push it to GitHub
4. Deploy it manually to your EC2 instance
5. Visit your live IP or domain to confirm your full stack is self-hosted

✅ You’ve officially moved from **managed hosting → independent deployment**.


### Worksheets


## Planning & Development Worksheet

# PLANNING


## Step 1: Problem & Persona


### WHO HAS THE PROBLEM?


Be specific about the person, not just "users"


**Your Answer:**


```text
[Example: "Busy real estate investors who review 50+ properties per week"]



```


### WHAT'S THE PROBLEM?


One sentence. What pain are they experiencing?


**Your Answer:**


```text
[Example: "They waste hours reviewing listings that don't meet their criteria"]



```


### WHAT'S THE DESIRED OUTCOME?


What does success look like for them?


**Your Answer:**


```text
[Example: "Quickly identify the 3-5 properties worth scheduling a viewing"]



```


---


## Step 2: MVP User Journey


### MVP USER JOURNEY (The UX Flow)


Write 5-8 steps describing exactly what happens. Focus on the WHAT, not the HOW.


**Your Journey:**


```text
1.

2.

3.

4.

5.

6.

7.

8.


```


**Example Journey (Team Lunch Coordinator):**


```text
1. Person creates an event: "Friday Team Lunch"
2. They set the date and invite teammates via email
3. Teammates receive link and mark dietary restrictions (vegetarian, vegan, allergies)
4. Organizer sees a dashboard of all responses
5. AI suggests 3 restaurants that accommodate everyone's needs
6. Organizer picks one and clicks "Finalize"
7. Everyone gets notification with restaurant details and time

```


---


## Step 3: Data Requirements


### DATA REQUIREMENTS


For each entity, list: **Entity Name | Key Attributes | Relationships**


**Instructions:** Look at your user journey and extract the NOUNS (Person, Place, Thing). These become your data entities.


**Your Data Requirements:**


```text
ENTITY:
Attributes:
Why needed: (reference journey step #)
Relationships:

ENTITY:
Attributes:
Why needed: (reference journey step #)
Relationships:

ENTITY:
Attributes:
Why needed: (reference journey step #)
Relationships:

ENTITY:
Attributes:
Why needed: (reference journey step #)
Relationships:

```


**Example (Team Lunch Coordinator):**


```text
ENTITY: events
Attributes: id (uuid), organizer_name, organizer_email, event_name, event_date,
event_time, location, status (planning/finalized/cancelled),
selected_restaurant_id (fk, nullable), created_at, updated_at
Why needed: Core event information created by organizer (step 1)
Relationships: Has many invitations, has many restaurant_suggestions

ENTITY: invitations
Attributes: id (uuid), event_id (fk), invitee_email, invitee_name,
response_status (pending/accepted/declined), responded_at, created_at, updated_at
Why needed: Track who's invited and their RSVP status (steps 2, 3)
Relationships: Belongs to event, has one dietary_preference

ENTITY: dietary_preferences
Attributes: id (uuid), invitation_id (fk), is_vegetarian (boolean), is_vegan (boolean),
is_gluten_free (boolean), allergies (text, nullable), other_notes (text, nullable),
created_at, updated_at
Why needed: Store each attendee's dietary restrictions (step 2)
Relationships: Belongs to invitation

ENTITY: restaurant_suggestions
Attributes: id (uuid), event_id (fk), restaurant_name, cuisine_type, address,
price_range, phone, meets_all_restrictions (boolean), accommodates_notes (text),
menu_url (nullable), suggested_at, created_at
Why needed: Store AI-generated restaurant options (step 5)
Relationships: Belongs to event

```


---


# DEVELOPMENT


## Step 1: Database Schema Generation


### 🎯 PURPOSE


Generate complete SQL schema for Supabase that you can copy/paste into the SQL Editor.


### 📋 PROMPT TEMPLATE


Copy this template and fill in YOUR information from Planning Steps 1-3:


```text
You are a senior database architect specializing in PostgreSQL and Supabase.

CONTEXT:
I'm building an MVP for: [PASTE YOUR PROBLEM STATEMENT FROM STEP 1]

The core user journey is:
[PASTE YOUR MVP USER JOURNEY FROM STEP 2]

DATA REQUIREMENTS:
[PASTE YOUR DATA REQUIREMENTS FROM STEP 3]

TASK:
Generate a complete SQL schema for Supabase (PostgreSQL) that:

1. Creates all necessary tables with appropriate data types
2. Includes primary keys (UUID preferred for main entities)
3. Includes foreign keys with proper constraints:
   - Use ON DELETE CASCADE where child records should be deleted with parent
   - Use ON DELETE SET NULL where we just want to unset the reference
4. Includes indexes on columns that will be frequently queried or filtered
5. Includes created_at and updated_at timestamps (with automatic triggers for updated_at)
6. Uses Row Level Security (RLS) appropriate for an MVP (enable RLS but leave policies for later)
7. Follows PostgreSQL and Supabase best practices

SPECIFIC REQUIREMENTS:
[List any specific data types, constraints, or relationships you want]
Example:
- Use DATE for event_date, TIME for event_time
- Use VARCHAR(255) for names and emails
- Add CHECK constraints for status fields
- Expected load: <100 records per month

CONSTRAINTS:
- This is a free tier Supabase project (keep schema efficient)
- [Add any other constraints about authentication, user load, etc.]

OUTPUT FORMAT:
Provide a single, complete SQL script that I can copy and paste into the Supabase SQL Editor.
Include comments explaining each table's purpose.
Include the updated_at trigger function and triggers for all tables.

```


---


### ✅ COMPLETE EXAMPLE PROMPT


```text
You are a senior database architect specializing in PostgreSQL and Supabase.

CONTEXT:
I'm building an MVP for: Busy professionals who need to coordinate team lunches while accommodating everyone's dietary restrictions without endless email chains.

The core user journey is:
1. Person creates an event with name, date, and invites teammates via email
2. Teammates receive link and respond with their attendance and dietary restrictions (vegetarian, vegan, gluten-free, allergies)
3. Organizer sees a dashboard showing all responses and dietary requirements
4. AI analyzes restrictions and suggests 3 restaurants that accommodate everyone
5. Organizer reviews suggestions and picks one restaurant
6. System sends final notification to all attendees with restaurant details, time, and location
7. Attendees receive confirmation with restaurant name, address, time, and what dietary needs are accommodated

DATA REQUIREMENTS:

ENTITY: events
Attributes: id (uuid), organizer_name, organizer_email, event_name, event_date, event_time, location, status (planning/finalized/cancelled), selected_restaurant_id (fk, nullable), created_at, updated_at
Why needed: Core event information created by organizer (step 1)
Relationships: Has many invitations, has many restaurant_suggestions

ENTITY: invitations
Attributes: id (uuid), event_id (fk), invitee_email, invitee_name, response_status (pending/accepted/declined), responded_at, created_at, updated_at
Why needed: Track who's invited and their RSVP status (steps 2, 3)
Relationships: Belongs to event, has one dietary_preference

ENTITY: dietary_preferences
Attributes: id (uuid), invitation_id (fk), is_vegetarian (boolean), is_vegan (boolean), is_gluten_free (boolean), allergies (text, nullable), other_notes (text, nullable), created_at, updated_at
Why needed: Store each attendee's dietary restrictions (step 2)
Relationships: Belongs to invitation

ENTITY: restaurant_suggestions
Attributes: id (uuid), event_id (fk), restaurant_name, cuisine_type, address, price_range, phone, meets_all_restrictions (boolean), accommodates_notes (text), menu_url (nullable), suggested_at, created_at
Why needed: Store AI-generated restaurant options (step 5)
Relationships: Belongs to event

TASK:
Generate a complete SQL schema for Supabase (PostgreSQL) that:

1. Creates all necessary tables with appropriate data types
2. Includes primary keys (UUID preferred for main entities)
3. Includes foreign keys with proper constraints:
   - Use ON DELETE CASCADE for invitations → events (if event deleted, delete invitations)
   - Use ON DELETE CASCADE for dietary_preferences → invitations
   - Use ON DELETE CASCADE for restaurant_suggestions → events
   - Use ON DELETE SET NULL for events.selected_restaurant_id (if suggestion deleted, just unset selection)
4. Includes indexes on columns that will be frequently queried:
   - events will be queried by organizer_email and event_date
   - invitations will be queried by event_id and response_status
   - restaurant_suggestions will be queried by event_id and meets_all_restrictions
5. Includes created_at and updated_at timestamps (with automatic triggers for updated_at)
6. Uses appropriate data types:
   - Use DATE for event_date
   - Use TIME for event_time
   - Use VARCHAR(255) for names and emails
   - Use TEXT for longer fields (allergies, notes, address)
   - Use BOOLEAN for dietary flags
7. Add CHECK constraints where appropriate:
   - response_status should only be 'pending', 'accepted', or 'declined'
   - status should only be 'planning', 'finalized', or 'cancelled'
   - price_range should be '$', '$$', or '$$$'
8. Uses Row Level Security (RLS) appropriate for an MVP (enable RLS but leave policies for later)
9. Follows PostgreSQL and Supabase best practices

CONSTRAINTS:
- This is a free tier Supabase project (keep schema efficient)
- Expected MVP load: <100 events per month, ~10 invitations per event
- No authentication yet in MVP, but design schema to add auth later (organizer_email could become user_id)
- Events should support 2-50 people typically

OUTPUT FORMAT:
Provide a single, complete SQL script that I can copy and paste into the Supabase SQL Editor.
Include comments explaining each table's purpose.
Include the updated_at trigger function and triggers for all tables.

```


---


## Step 2: User Interface Generation


### 🎯 PURPOSE


Generate a complete Next.js application using V0 or Cursor that implements your user journey.


### 📋 PROMPT TEMPLATE


Copy this template and fill in YOUR information:


```text
You are an expert frontend engineer specializing in Next.js, React, TypeScript, and Tailwind CSS.

CONTEXT:
I'm building an MVP for: [PASTE YOUR PROBLEM STATEMENT]

The target user is: [PASTE WHO HAS THE PROBLEM]

MVP USER JOURNEY:
[PASTE YOUR USER JOURNEY]

DATA AVAILABLE:
I have a Supabase PostgreSQL database with the following tables:
[List your table names and key columns—don't paste entire SQL, just structure]

Example format:
- events (id, organizer_name, organizer_email, event_name, event_date, status)
- invitations (id, event_id, invitee_email, response_status)
- dietary_preferences (id, invitation_id, is_vegetarian, is_vegan, allergies)

TASK:
Generate a complete Next.js application that implements the above user journey.

REQUIREMENTS:

UI/UX:
- Modern, clean design using Tailwind CSS
- Mobile-first responsive design
- Clear visual hierarchy and intuitive navigation
- Loading states for data fetching
- Error states with helpful messages
- [Add design preference: "Minimalist" / "Playful and colorful" / "Professional SaaS"]

Technical:
- Next.js 14+ with App Router
- TypeScript for type safety
- Supabase client for database queries
- Server components where appropriate, client components for interactivity
- Form validation where needed
- Optimistic UI updates for better UX

Pages/Components Needed:
[Based on your user journey, list main pages]

Example:
1. Landing/Event Creation page (step 1)
2. Invitation Response page (steps 2-3)
3. Organizer Dashboard (step 4)
4. Restaurant Selection page (step 5)
5. Confirmation page (steps 6-7)

Key Features:
[Translate each journey step into feature requirements]

Example:
- Event creation form with date/time pickers and email input
- RSVP form with dietary restriction checkboxes
- Real-time dashboard showing all responses
- Restaurant card display with selection buttons
- Email notification triggers (can be placeholder for MVP)

STYLING PREFERENCES:
- Color scheme: [e.g., "Professional blues and grays" / "Warm earth tones"]
- Typography: [e.g., "Clean sans-serif, high readability"]
- Overall feel: [e.g., "Polished SaaS tool" / "Fun consumer app"]

CONSTRAINTS:
- This is an MVP—prioritize core functionality over polish
- Free tier Supabase (optimize queries)
- [Add any other constraints: "No authentication yet" / "Mobile-only" / etc.]

OUTPUT:
Generate the complete application code, including:
- All page components
- Reusable UI components
- Supabase client setup
- TypeScript types based on database schema
- Basic error handling

The code should be immediately deployable to Vercel and connectable to my Supabase project.

```


---


### ✅ COMPLETE EXAMPLE PROMPT


```text
You are an expert frontend engineer specializing in Next.js, React, TypeScript, and Tailwind CSS.

CONTEXT:
I'm building an MVP for: Busy professionals who need to coordinate team lunches while accommodating everyone's dietary restrictions without endless email chains.

The target user is: Team leaders and managers organizing lunch for 5-15 people

MVP USER JOURNEY:
1. Person creates an event with name, date, and invites teammates via email
2. Teammates receive link and respond with their attendance and dietary restrictions
3. Organizer sees a dashboard showing all responses and dietary requirements
4. AI analyzes restrictions and suggests 3 restaurants that accommodate everyone
5. Organizer reviews suggestions and picks one restaurant
6. System sends final notification to all attendees
7. Attendees receive confirmation with restaurant details

DATA AVAILABLE:
I have a Supabase PostgreSQL database with the following tables:
- events (id, organizer_name, organizer_email, event_name, event_date, event_time, location, status, selected_restaurant_id)
- invitations (id, event_id, invitee_email, invitee_name, response_status, responded_at)
- dietary_preferences (id, invitation_id, is_vegetarian, is_vegan, is_gluten_free, allergies, other_notes)
- restaurant_suggestions (id, event_id, restaurant_name, cuisine_type, address, price_range, meets_all_restrictions, accommodates_notes)

TASK:
Generate a complete Next.js application that implements the above user journey.

REQUIREMENTS:

UI/UX:
- Modern, clean design using Tailwind CSS
- Mobile-first responsive design
- Clear visual hierarchy and intuitive navigation
- Loading states for data fetching
- Error states with helpful messages
- Warm, friendly aesthetic that makes coordination feel easy

Technical:
- Next.js 14+ with App Router
- TypeScript for type safety
- Supabase client for database queries
- Server components where appropriate, client components for interactivity
- Form validation where needed
- Optimistic UI updates for better UX

Pages/Components Needed:
1. Landing/Event Creation page (step 1) - Form to create event and add invitees
2. Invitation Response page (steps 2-3) - Public link where invitees RSVP
3. Organizer Dashboard (step 4) - Shows all responses in real-time
4. Restaurant Selection page (step 5) - Displays AI suggestions as cards
5. Confirmation page (steps 6-7) - Final details for all attendees

Key Features:
- Event creation form with date/time pickers and multiple email inputs
- RSVP form with dietary restriction checkboxes (vegetarian, vegan, gluten-free) and allergy text field
- Real-time dashboard showing response count and dietary needs summary
- "Generate Recommendations" button that triggers AI analysis (can use placeholder AI for MVP)
- Restaurant cards showing name, cuisine, address, price range, and which restrictions it meets
- Email notification system (can be placeholder/console.log for MVP)
- Shareable links for invitations

STYLING PREFERENCES:
- Color scheme: Warm oranges and friendly greens with neutral grays
- Typography: Clean sans-serif (Inter or similar), high readability
- Overall feel: Friendly and approachable, reduces stress of coordination

CONSTRAINTS:
- This is an MVP—prioritize core functionality over polish
- Free tier Supabase (optimize queries, expect ~10-20 events per week)
- No authentication yet—events accessed via unique URLs
- AI recommendations can be hardcoded/placeholder for MVP (we'll add real AI later)
- Email notifications can log to console for now

OUTPUT:
Generate the complete application code, including:
- All page components
- Reusable UI components (EventCard, RestaurantCard, RSVPForm, etc.)
- Supabase client setup with connection instructions
- TypeScript types based on database schema
- Basic error handling and loading states
- README with setup instructions

The code should be immediately deployable to Vercel and connectable to my Supabase project.

```


---


## Step 3: Connecting Your Application


### After generating code, you need to connect it to your Supabase database:


**In Supabase:**

1. Go to Project Settings → API
2. Copy your Project URL
3. Copy your `anon/public` API key

**In your code:**

1. Create a `.env.local` file in your project root
2. Add these lines:

```text
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

```


**Deploy to Vercel:**

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

---


## Technical Constraints Checklist


Use this to inform your prompts:


**Free Tier Limitations:**

- [ ] Supabase: 500MB database, 2GB bandwidth/month
- [ ] Vercel: 100GB bandwidth/month
- [ ] Other API limits? _______________

**Required Integrations:**

- [ ] List external APIs needed: _______________
- [ ] API keys ready? Yes / No
- [ ] Authentication method known? Yes / No

**Performance Considerations:**

- [ ] Expected # of users for MVP: _______________
- [ ] Real-time requirements? Yes / No
- [ ] Mobile-first or desktop-first? _______________

**MVP Simplifications:**
What are we explicitly NOT building in v1?


```text
Example: "No user authentication yet—just unique URLs"
Example: "No payment processing—just contact forms"

Your simplifications:
-
-
-

```


---


## 🎯 Quick Reference: When to Move Fast vs Slow


### MOVE FAST ⚡

- Tweaking UI colors, spacing, layouts
- Implementing features you've done before
- Trying different approaches to the same problem
- Deploying changes to test

### MOVE SLOW 🐢

- Planning your data model
- Adding new features you haven't built before
- Debugging persistent errors
- Setting up authentication or payment systems
- Performance optimization

**Remember:** Things will break MORE than they work. That's normal. Flow comes from knowing when to trust the AI and when to slow down and think.


---


## Notes & Learnings


Use this space to capture what works for you:


```text
What went well:


What was frustrating:


What I'll do differently next time:


Questions to research later:



```


---


## Next Steps: Beyond MVP


Once your MVP is working, consider:

1. **Add Authentication** - Convert emails to user accounts
2. **Improve AI Features** - Replace placeholders with real AI
3. **Add Payment Processing** - If needed for your model
4. **Performance Optimization** - Database indexes, caching
5. **Error Handling** - Better user feedback
6. **Testing** - Automated tests for core flows
7. **Analytics** - Track how people use your app

---


**Remember the Flow State Formula:**

1. ✅ Clear Goals (your user journey)
2. ⚡ Fast Feedback (deploy early, test often)
3. 🎯 Challenge vs Skill (start simple, build complexity)
4. 🧘 Action = Awareness (stay present with the code)
5. 🎉 Intrinsically Rewarding (celebrate small wins!)

Good luck on your build! 🚀


# Flow of Vibe Coding: From Idea to MVP with AI


## Course Description


**Master the art of building software with AI—not just for today's tools, but for tomorrow's.**


This intensive 4-hour workshop transforms how you approach software development in the AI era. While tools like Cursor, v0, and ChatGPT evolve daily, the underlying principles of effective AI-assisted development remain constant. This course teaches you the **engineering mindset and systematic workflow** that will keep you productive no matter how the toolset changes.


You'll learn to think like a systems architect while moving at startup speed—planning deliberately, prompting precisely, and iterating intelligently. By the end of this session, you'll have built a complete MVP from scratch and internalized a repeatable process that scales from weekend projects to production applications.


**This isn't a tool tutorial. This is a new way of building.**


### What You'll Learn

- **Strategic Planning:** How to move slow to go fast - translating problems into structured requirements that AI can execute
- **Prompt Engineering for Developers:** Crafting system-level prompts that generate production-ready schemas, UI flows, and development plans
- **The Vibe Coding Workflow:** A six-phase process from concept to deployment that you'll practice hands-on
- **Integration Mastery:** Connecting Supabase, GitHub, and frontend builders into a coherent development stack
- **Intelligent Iteration:** Using Cursor IDE to refine, debug, and enhance AI-generated code without losing momentum
- **Tool-Agnostic Thinking:** Building mental models that transfer across platforms as AI tooling evolves

### Who This Is For

- Developers curious about AI-assisted development
- Product managers who want to prototype faster
- Entrepreneurs building their first technical MVP
- Technical professionals leveling up their AI workflow
- Anyone who's struggled to turn ChatGPT conversations into actual, working software

### What You'll Build


We'll develop a real MVP together, and you'll leave with:

- A deployed, functional application that’s accessible online
- A personal planning template for future projects
- Understanding and access to the tools you’ll need to be a developer
- Confidence to tackle your own ideas and start gaining experience on your own!

### Prerequisites

- Basic understanding of web applications (frontend/backend concepts)
- Comfort with using web-based tools and following technical instructions
- A laptop with modern browser and willingness to create free accounts
- No prior AI experience required—we'll build that together

---


# Module 0: Foundation & Mindset _(30 minutes)_


## Learning Objectives:

- Pragmatism: Learn to let go of the fear of not understanding & inadequacy in order to be effective

---


## Content:


### **Opening Hook: The AI Developer Paradox** _(7 minutes)_


**The Reality Check**

- **Video montage** _(2 min)_: Social media split-screen
	- Left side: Developers frustrated, "AI just makes bugs faster," "Spent 3 hours fixing what ChatGPT broke," "This is useless"
	- Right side: Engineers shipping, "Built my SaaS MVP in a weekend," "AI 10x'd my output," "This is a superpower"
	- **Freeze on the split screen**
- **The Question** _(1 min)_: "Same tools. Opposite results. What's the difference?"
	- Not the AI - it's the **approach**
	- Not talent - it's the **mindset**
	- Not luck - it's the **workflow**
- **The Stakes** _(4 min)_: Why this matters RIGHT NOW
	- **Metrics on screen**:
		- GPT-3 to GPT-4 to Claude Opus to GPT-4o to Claude Sonnet 4: 18 months of exponential capability growth
		- GitHub Copilot adoption: X million developers in Y months
		- VC funding in AI dev tools: $X billion in 2024 alone
	- **The window**: This is the **land grab moment** for AI-native developers
	- The gap between those who can harness AI and those who can't is widening **daily**
	- Your competition isn't other developers anymore—it's developers **with AI workflows**
	- "In 12 months, we'll have even more powerful tools. But the principles you learn today will still apply."

**Teaching Note**: Keep energy high, use dynamic slides, make it feel urgent but exciting. We're at a historical inflection point.


---


### **The Two Minds of Development** _(8 minutes)_


**Introducing Systems 1 & 2 Thinking**

- **Quick Psychology Lesson** _(2 min)_:
	- **Systems 1**: Fast, intuitive, automatic (like catching a ball or reading facial expressions)
	- **Systems 2**: Slow, deliberate, analytical (like solving a complex math problem or planning a chess move)
	- **Show visual**: Brain diagram with the two systems highlighted
	- "Both are essential. Neither is 'better.' The magic is knowing when to use each."
- **How This Shows Up in Traditional Coding** _(2 min)_:
	- **Systems 2**: Architecting database schemas, designing API structures, planning component hierarchy
	- **Systems 1**: Writing familiar syntax, debugging obvious typos, refactoring patterns you've done 100 times
	- Experienced developers switch automatically—that's the **Flow State**
- **How This Changes with AI** _(4 min)_:
	- **The Trap**: AI makes Systems 1 work feel productive
		- "Just ask ChatGPT to fix it" (no understanding)
		- "Generate another version" (no intentionality)
		- **Result**: Prompt whiplash, technical debt, projects that break mysteriously
	- **The Opportunity**: AI amplifies Systems 2 thinking
		- Plan deliberately (Systems 2) → Prompt precisely (Systems 2) → Generate rapidly (AI) → Evaluate critically (Systems 2) → Iterate automatically (Systems 1 flow)
		- **The goal today**: You'll practice consciously using Systems 2 until it becomes Systems 1
	- **Interactive Moment**: "Right now, raise your hand if you've ever asked ChatGPT to fix something and just pasted the result without fully understanding it."
		- (Hands go up)
		- "That's Systems 1 thinking. It **feels** fast, but it creates problems. Today, we slow down to go fast."

**Visual Aid**: Diagram showing the wrong path (Systems 1 → AI → Systems 1 → chaos) vs. the right path (Systems 2 → AI → Systems 2 → Flow State)


---


### **The Vibe Coding Manifesto** _(8 minutes)_


**The Core Principles**

1. **Slow Down to Speed Up** _(2 min)_
	- "Vibe Coding" isn't about vibes—it's about **flow**
	- 15 minutes of Systems 2 planning saves hours of Systems 1 firefighting
	- **Analogy**: A jazz musician practices scales slowly (Systems 2) to improvise brilliantly (Flow State)
	- You're learning the scales today
2. **Principles Over Platforms** _(2 min)_
	- **Show slide**: Same project, three different stacks
		- Stack A: v0 + Supabase + Cursor
		- Stack B: Lovable + Firebase + Windsurf
		- Stack C: Bolt.new + Pocketbase + GitHub Copilot
	- All use the **same Planning Sheet** → **same workflow** → **similar results**
	- "Tools will change monthly. Your thinking won't."
3. **The Engineering Mindset** _(2 min)_
	- **Formula on screen**: `Deliberate Planning × Intelligent Prompting × Rapid Iteration = Vibe Coding`
	- Not just code generation—**system generation**
	- You're architecting, not just asking
	- AI is your **reasoning partner**, not your replacement
4. **Why Most AI Coding Fails** _(2 min)_
	- ❌ No planning (jumping straight to "build me an app")
	- ❌ Vague prompts ("make it better")
	- ❌ No evaluation (accepting first output)
	- ❌ Tool dependency (only knows one AI, can't adapt)
	- ✅ **Today you'll avoid all of these**

---


### **Today's Journey** _(5 minutes)_


**The Six-Phase Workflow**

- **Visual**: Show the workflow diagram on screen with icons
	1. 📋 **Planning**: Fill the Planning Sheet (Systems 2)
	2. 🗄️ **Data**: Generate schema with AI, deploy to Supabase (Systems 2 → AI)
	3. 🎨 **UI**: Generate interface with AI (Systems 2 → AI)
	4. 🔗 **Integration**: Pull code, configure locally (Systems 2)
	5. ⚡ **Development**: Iterate with Cursor (Flow State)
	6. 🚀 **Deployment**: Push live (Systems 1)

**Our Example Project** _(2 min)_

- "We'll build together, but you have choices:"
	- **Option A**: [Project idea 1 - e.g., "Micro-SaaS: Team Lunch Coordinator"]
	- **Option B**: [Project idea 2 - e.g., "Personal Finance Tracker"]
	- **Option C**: [Project idea 3 - e.g., "Event RSVP Manager"]
- **Quick vote**: "Show of hands..." (pick the winner)
- "Or follow along with your own idea—I'll support both paths"

**Logistics** _(2 min)_

- Accounts you'll need (sent in pre-course email, but quick verification)
- How to ask for help: Raise hand, use chat, flag me down during work time
- Pair programming encouraged: "Stuck? Talk to your neighbor first"
- "This is high-intensity, but we'll take a real break halfway through"

---


### **Quick Win: Your First AI Generation** _(2 minutes)_


**Immediate Action**

- "Open ChatGPT, Claude, or Gemini right now on your phone or laptop"
- **Prompt on screen to copy**:

	```text
	Create 3 compelling landing page headlines for a web app that helps [X]. Each should be under 10 words and emphasize a key benefit. Format as: 1. [headline] 2. [headline] 3. [headline]
	
	```

- "Fill in [X] with our class project OR your own idea"
- "Hit enter. Read the results. Pick your favorite."

**Why We're Doing This**:

- Breaks the ice—everyone's generated something in 60 seconds
- Low stakes, immediate feedback
- Sets the tone: AI is a **tool you're already using**
- "See? You just used AI. Now let's learn to use it **strategically**."

---


## Teaching Notes for Module 0:


### Energy & Pacing

- Start with **high energy**—this sets the tone for 4 hours
- Use the social media montage to create emotional contrast
- Make the Systems 1/2 explanation feel like an "aha moment"
- The quick win at the end should feel effortless and fun

### Humor Opportunities

- Self-deprecate: "I've spent 3 hours arguing with ChatGPT when 5 minutes of planning would've worked"
- Relatable: "Who else has 47 tabs open of different AI outputs you're trying to merge?"
- The white kamikaze bus callback (if using your friend's material)

### Key Transitions

- Hook → Systems Thinking: "So what separates the frustrated developers from the productive ones? It's all in **how they think**."
- Systems Thinking → Manifesto: "Now that you understand the two modes, here's how we apply them."
- Manifesto → Journey: "Enough philosophy. Let's see exactly what we're building today."

### Success Signals


By the end of Module 0, students should:

- Feel excited and slightly intimidated (in a good way)
- Understand they're learning a **process**, not just tools
- Have used AI once already (confidence builder)
- Know what's coming and why it matters

---


**Module 0 Philosophy**: _"This isn't about typing faster—it's about thinking better. And thinking better means knowing when to slow down."_


---


### **Module 1: Strategic Planning - The Single Sheet That Changes Everything** _(45 minutes)_


**Learning Objectives:**

- Transform vague ideas into structured requirements
- Create the "Planning Sheet" that feeds all downstream prompts
- Understand problem → data → process → UX thinking

**Content:**

- **Why Planning Matters** _(5 min)_:
	- War stories: projects that failed from insufficient planning
	- The compounding ROI of 15 minutes of upfront thinking
- **The Planning Sheet Framework** _(15 min)_:
	- **Section 1:** Problem Statement (1-2 sentences—what pain are we solving?)
	- **Section 2:** User Stories (3-5 core actions users need to take)
	- **Section 3:** Data Requirements (what entities/relationships do we need?)
	- **Section 4:** Process Flow (key interactions and state changes)
	- **Section 5:** UX Priorities (mobile-first? dashboard? form-heavy?)
	- **Section 6:** Technical Constraints (free tier limitations, API keys needed)
- **Live Example** _(10 min)_:
	- Instructor fills out Planning Sheet for our class project in real-time
	- Narrates decision-making process
	- Shows how this prevents scope creep and prompt confusion
- **Your Turn** _(15 min)_:
	- Students fill out Planning Sheet for class project (follow-along) OR their own idea
	- Pair-share: review each other's sheets (5 min)
	- Quick gallery walk: instructor highlights 2-3 excellent examples

**Deliverable:** Completed Planning Sheet for your project


---


### **Module 2: Data Foundation—Supabase Schema from Your Planning Sheet** _(30 minutes)_


**Learning Objectives:**

- Translate Planning Sheet data requirements into database schemas
- Use AI to generate production-ready SQL
- Set up Supabase instance and validate schema

**Content:**

- **Database Design Principles** _(5 min)_:
	- Relational thinking for AI generation
	- Common pitfalls (over-normalization, missing indexes, poor naming)
- **Prompt Engineering for Data** _(10 min)_:
	- Live demonstration: turning Planning Sheet Section 3 into a schema prompt
	- The anatomy of a good schema prompt (context, requirements, constraints, output format)
	- Running the prompt, evaluating output, iterating
	- **Key teaching moment:** How to spot AI hallucinations in technical output
- **Supabase Setup Sprint** _(15 min)_:
	- Quick account creation (everyone follows along)
	- Paste AI-generated SQL into SQL editor
	- Run and verify tables created
	- Quick tour of Supabase UI (Table Editor, API docs)
	- **Checkpoint:** Everyone confirms their database is live

**Deliverable:** Live Supabase instance with your schema deployed


**Break** _(10 minutes)_ — Stretch, grab water, troubleshoot any setup issues


---


### **Module 3: User Interface—From Planning Sheet to Interactive Prototype** _(40 minutes)_


**Learning Objectives:**

- Generate production-quality UI from structured requirements
- Understand v0/Lovable workflow and capabilities
- Make intelligent tool choices based on project needs

**Content:**

- **UI Builders Landscape** _(5 min)_:
	- Quick comparison: v0 vs. Lovable vs. Bolt.new (when to use each)
	- Why we're using [v0/Lovable] today
	- The GitHub integration that makes everything possible
- **Prompt Engineering for UI** _(10 min)_:
	- Transforming Planning Sheet Sections 2, 4, 5 into UI prompts
	- Live demo: instructor generates initial UI for class project
	- Narrates what makes the prompt effective (specificity, component thinking, tech stack clarity)
	- Evaluates the output: what's good, what needs iteration
- **Your Build Sprint** _(20 min)_:
	- Students generate their own UI using provided prompt template
	- Instructor circulates, provides 1-on-1 guidance
	- **Iteration practice:** Everyone makes at least one refinement request to their AI
	- Connect to Supabase: add environment variables for database connection
- **Gallery Walk** _(5 min)_:
	- 3-4 students share their UI on screen (15 seconds each)
	- Quick peer feedback: what's working well?

**Deliverable:** Functional UI prototype connected to your database


---


### **Module 4: Code Integration—GitHub, Environment Variables, and Going Local** _(30 minutes)_


**Learning Objectives:**

- Pull AI-generated code into local development environment
- Configure integrations and environment variables
- Understand the bridge between AI builders and traditional IDEs

**Content:**

- **The GitHub Handoff** _(5 min)_:
	- Why version control matters (even for AI-generated code)
	- Pulling your v0/Lovable repo to local machine
	- Quick Git refresher if needed
- **Configuration Deep Dive** _(10 min)_:
	- Understanding .env files and secrets management
	- Supabase API keys: where to find them, how to use them
	- Other common integrations (auth, payments, APIs)
	- **Security moment:** What never goes in Git
- **Local Development Setup** _(15 min)_:
	- Clone repository
	- Install dependencies (npm/pnpm)
	- Configure .env file
	- Run dev server
	- **Checkpoint:** Everyone sees their app running on localhost
	- Quick troubleshooting common issues (port conflicts, missing dependencies)

**Deliverable:** Application running locally on your machine


---


### **Module 5: Intelligent Iteration—Cursor IDE and the Development Loop** _(50 minutes)_


**Learning Objectives:**

- Use Cursor's AI capabilities to enhance generated code
- Practice the prompt → test → refine cycle
- Understand when to use AI vs. manual coding
- Debug effectively with AI assistance

**Content:**

- **Introduction to Cursor** _(5 min)_:
	- What makes Cursor different from VS Code + Copilot
	- Key features: Cmd+K for inline edits, chat for context, composer for multi-file changes
	- When Cursor shines vs. when to code manually
- **The Development Workflow** _(10 min)_:
	- Live demonstration of enhancement cycle:
		1. Identify improvement (from Planning Sheet or new idea)
		2. Write clear Cursor prompt with context
		3. Review and test AI changes
		4. Iterate or accept
	- Example: Adding form validation, improving error handling, enhancing mobile responsiveness
	- **Teaching moment:** How to give Cursor useful context (highlight relevant code, reference specific files)
- **Hands-On Development Sprint** _(30 min)_:
	- Students implement 3-5 enhancements to their MVP:
		- **Enhancement 1** (Guided): Everyone adds the same feature (e.g., loading states)
		- **Enhancement 2-3** (Choice): Pick from a menu of options or their own ideas
		- **Enhancement 4-5** (Open): Personal customization time
	- Instructor circulates, demonstrates techniques 1-on-1
	- **Pair programming encouraged:** Partner up to solve challenges
- **Debug Party** _(5 min)_:
	- Common issues encountered and how AI helped (or didn't)
	- Building intuition for when AI suggestions are good vs. problematic
	- War stories: funniest AI mishaps from the room

**Deliverable:** Enhanced MVP with at least 3 meaningful improvements


---


### **Module 6: Deployment & The Path Forward** _(35 minutes)_


**Learning Objectives:**

- Deploy updated code back to v0/Lovable or alternative platforms
- Understand hosting options and their tradeoffs
- Create personal roadmap for continued learning

**Content:**

- **Deployment Options** _(10 min)_:
	- Push to v0/Lovable hosting (easiest path)
	- Alternative: Vercel, Netlify, or custom hosting
	- Live demonstration: Git push and watch deployment
	- **Checkpoint:** Everyone's app is live on a public URL
- **Share & Celebrate** _(10 min)_:
	- Students share their live URLs in chat
	- Quick demo round: 4-5 volunteers show their MVPs (30 seconds each)
	- Applause and recognition for specific achievements
- **The Road Ahead** _(15 min)_:
	- **What You Built Today**: Review the complete workflow
	- **What You Learned Beyond Tools**: The mindset, the process, the thinking
	- **Your Next Steps**:
		- Week 1 challenge: Build one feature you wish you'd added today
		- Month 1 goal: Ship a complete project using this workflow
		- Continuous learning: following AI dev communities, new tools to watch
	- **Resources Handout**:
		- Planning Sheet template (printable/digital)
		- Prompt library for common tasks
		- Tool comparison matrix
		- Community Discord/Slack for ongoing support
		- Office hours information
- **Q&A and Closing** _(Final 10 min after this module)_

**Deliverable:** Deployed, publicly-accessible MVP


---


### **Closing & Q&A** _(10 minutes)_

- Open floor for questions
- Final thoughts: "The best way to learn is to build. Start tonight."
- Post-course survey (2 minutes—helps improve future sessions)
- Instructor availability for 1-on-1 questions after class
- Group photo with "I shipped an MVP today" energy

---


## Teaching Methodology Notes


### Attention & Engagement Strategies

- **Rhythm variation**: Alternate between lecture (max 10 min), demos (5-10 min), and hands-on (15-30 min)
- **Humor integration**: Self-deprecating AI failures, relatable developer frustrations, celebration of bugs
- **Energy management**:
	- Break at natural midpoint (after Module 2)
	- "Stand up and stretch" moments between modules
	- Music during independent work time (optional)

### Progressive Complexity

- Early modules are more guided (fill-in-the-blank style)
- Later modules offer more autonomy and choice
- Final module is mostly independent with support available

### Safety Nets

- Backup project for students who get stuck (can clone working version)
- Instructor has pre-built version at each stage for troubleshooting
- Pair programming encouraged to reduce isolation/frustration

### Success Metrics


Students leave with:

1. ✅ A deployed application they built
2. ✅ A repeatable planning process
3. ✅ Confidence to build their next project independently
4. ✅ Understanding of when/how to use AI in development workflow

---


## Materials Needed


**Pre-Course Setup Email** (sent 48 hours before):

- Account creation checklist (Supabase, v0/Lovable, GitHub, Cursor)
- System requirements verification
- Optional pre-reading on Systems 2 thinking, Flow

**During Course**:

- Planning Sheet template (digital + printable)
- Prompt library document (for copy/paste)
- Example project repositories
- Troubleshooting guide (common issues + fixes)

**Post-Course**:

- Recording/slides access
- Resource library
- Community access information
- "Next Steps" roadmap

---


**Course Philosophy**: _"AI doesn't replace engineering thinking—it amplifies it. Today, you'll learn to think like an architect and build like a startup."_


### **Edit** 

- Needs time allowed for account setups
	- Github
	- Supabase
	- Lovable, v0
	- Cursor
- Include ending section for discussion on what might be needed to move an app into production, to start onboarding users
- Error handling: What to do when things go wrong
