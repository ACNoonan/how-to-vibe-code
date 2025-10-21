
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

