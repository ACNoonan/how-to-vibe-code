# How to Vibe Code · From Idea to App

> Flow-state development with AI: a public curriculum for shipping real products with Cursor, Supabase, GitHub, and Vercel.

[![Site](https://img.shields.io/badge/site-live-blue?style=flat-square)](https://ACNoonan.github.io/how-to-vibe-code)
[![License](https://img.shields.io/badge/license-MIT-lightgray?style=flat-square)](./LICENSE)
[![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)

This repository powers the public course materials that guide students from zero to a deployed MVP using an AI-assisted workflow. Everything here is open for improvement—typo fixes, new exercises, or fresh troubleshooting tips are all welcome.

## 🌐 Live Course

- **Site:** [ACNoonan.github.io/how-to-vibe-code](https://ACNoonan.github.io/how-to-vibe-code)
- **Focus:** Teaching an end-to-end AI development loop (plan → prompt → build → deploy)
- **Audience:** Developers, product folks, and entrepreneurs who want to build faster with AI copilots

## 📚 Course Modules

1. **[Introduction](./site/pages/introduction.mdx)** — Mindset and workflow overview  
2. **[Dev Environment Setup](./site/pages/dev-environment-setup.mdx)** — Accounts & installs  
3. **[CLI Services](./site/pages/advanced/cli-services.mdx)** — Daily Git, Supabase, and Vercel routines  
4. **[Planning & Development Worksheet](./site/pages/planning-worksheet.mdx)** — AI-ready planning templates  
5. **[Build with AI Flow](./site/pages/build-with-ai-flow.mdx)** — Cursor-first teaching script  
6. **[Self-Hosting 101](./site/pages/advanced/self-hosting-101.mdx)** — Advanced deployment to AWS EC2  
7. **[Troubleshooting & Logs](./site/pages/troubleshooting.mdx)** — Fast checks when something breaks

> The course ships as a static Next.js/Nextra site. Each module is a markdown/MDX page you can edit via pull request.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) + [Nextra](https://nextra.site/) docs theme
- [Tailwind CSS](https://tailwindcss.com/)
- [Tina CMS](https://tina.io/) (optional visual editor)
- Supabase, GitHub, Vercel, and Cursor as the primary teaching stack
- `pnpm` for dependency management

## 🚀 Local Development

```bash
git clone https://github.com/ACNoonan/how-to-vibe-code.git
cd how-to-vibe-code/site
pnpm install
pnpm run dev
# visit http://localhost:3000
```

The content lives in `site/pages/`. Update an `.mdx` file, preview locally, then open a pull request.

## 🤝 Contributing

We actively encourage public contributions:

- 📚 Improve explanations, fix typos, or clarify prompts  
- 🧪 Share new exercises, troubleshooting tips, or tool updates  
- 🧰 Extend the curriculum with companion guides or examples

Before you start:

1. Read the [Contributing guidelines](./CONTRIBUTING.md)  
2. Review the [Code of Conduct](./CODE_OF_CONDUCT.md)  
3. Open a [discussion or issue](https://github.com/ACNoonan/how-to-vibe-code/issues/new/choose) if you want to float an idea first

Pull requests from first-time contributors are welcome—maintainers will help you land the change.

## 🧭 Repository Layout

```
how-to-vibe-code/
├── README.md                # You are here
├── CONTRIBUTING.md          # How to contribute
├── CODE_OF_CONDUCT.md       # Community standards
├── LICENSE                  # MIT license
├── site/                    # Next.js + Nextra site
│   ├── pages/               # Course modules (MDX)
│   ├── components/          # Custom UI (callouts, inputs, etc.)
│   └── public/              # Static assets
└── .github/
    ├── ISSUE_TEMPLATE/      # Issue templates
    └── workflows/           # CI/CD configuration
```

## 📅 Roadmap

- [ ] Expand “Build with AI Flow” with video walkthroughs  
- [ ] Add companion exercises for Supabase RLS and Vercel environment management  
- [ ] Publish a gallery of student-built MVPs  
- [ ] Localize core modules (community help encouraged!)

Track or suggest new ideas in [GitHub issues](https://github.com/ACNoonan/how-to-vibe-code/issues).

## 🙋‍♀️ Maintainer

**Adam Noonan** · [x.com/_adamnoonan](https://x.com/_adamnoonan) · [LinkedIn](https://www.linkedin.com/in/adam-noonan/)  
Questions or ideas? Open an issue or reach out.

---

Built with the belief that AI should amplify human creativity. Let’s build together. 🚀
