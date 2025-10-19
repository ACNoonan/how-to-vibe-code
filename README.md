# Vibe Coding Course

**Master the art of building software with AI—learn a systematic workflow that works across any tool or platform.**

This course teaches the engineering mindset and systematic workflow that will keep you productive no matter how the toolset changes.

## 🌐 Live Site

[Visit the course website](https://ACNoonan.github.io/vibe-coding-course) (after deployment)

## 📚 Course Content

1. **Dev Environment Setup** - Tools and accounts setup
2. **CLI Services & Advanced Setup** - Git, Supabase, Vercel workflows
3. **Planning & Development** - Systematic approach to building MVPs
4. **Self-Hosting 101** - Deploy to your own infrastructure

## 🛠️ Technical Stack

- **Framework:** [Next.js](https://nextjs.org/) with [Nextra](https://nextra.site/) docs theme
- **Styling:** Tailwind CSS
- **CMS:** [Tina CMS](https://tina.io/) for visual editing
- **Deployment:** GitHub Pages via GitHub Actions
- **Package Manager:** pnpm

## 🚀 Quick Start

### For Students

Just visit the live site and start learning! You can contribute improvements via the "Edit this page" button (when Tina is configured).

### For Contributors

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to suggest improvements.

### For Developers

```bash
# Clone the repository
git clone https://github.com/ACNoonan/vibe-coding-course.git
cd vibe-coding-course/site

# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Visit http://localhost:3000
```

## 📖 Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute to the course
- **[MAINTENANCE.md](./MAINTENANCE.md)** - Guide for maintainers
- **[site/TINA_SETUP.md](./site/TINA_SETUP.md)** - Setting up Tina CMS

## 🎯 Features

- ✅ Interactive checkboxes that persist in browser storage
- ✅ Custom callout components for important information
- ✅ Download your progress as markdown
- ✅ Editable input fields for exercises
- ✅ Visual content editing via Tina CMS (when configured)
- ✅ Community-driven contributions via GitHub PRs
- ✅ Fully static site with no backend required

## 📝 Architecture

```
vibe-coding-course/
├── site/                # Next.js + Nextra application
│   ├── pages/          # Course content (MDX)
│   ├── components/     # React components
│   ├── .tina/         # Tina CMS config
│   └── public/        # Static assets
├── content/           # Source markdown files
└── .github/
    └── workflows/     # CI/CD configuration
```

## 🤝 Contributing

We welcome contributions! Whether it's:

- Fixing typos
- Improving explanations
- Adding examples
- Updating outdated information
- Suggesting new content

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📜 License

[Add your license here]

## 🙏 Acknowledgments

Built with the philosophy that AI tools should amplify human thinking, not replace it.

---

**Questions?** Open an issue on GitHub or reach out to the maintainers.
