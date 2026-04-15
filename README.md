# 🚀 Azzeddine Hani Benchalel - Portfolio

A modern, futuristic portfolio website built with Next.js, featuring smooth GSAP animations, a sleek dark theme, and a responsive design.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3.0-88ce02?style=flat-square)

## ✨ Features

- **Futuristic Design**: Gradient effects, glowing borders, and animated backgrounds
- **Smooth Animations**: GSAP ScrollTrigger animations that reverse on scroll
- **Fully Responsive**: Mobile-first design that works on all devices
- **Type-Safe**: Built with TypeScript for robust code
- **Performance Optimized**: Next.js 16 with Turbopack for fast builds
- **Interactive Sections**:
  - Hero with typewriter effect
  - About section with profile picture
  - Project showcase with image previews
  - Skills with animated progress bars
  - Achievements & timeline
  - Contact form
  - Downloadable resume

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) with ScrollTrigger
- **Build Tool**: [Turbopack](https://turbo.build/pack)
- **Deployment**: Ready for [Vercel](https://vercel.com) or [Cloudflare Pages](https://pages.cloudflare.com)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DCHani/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information

Update your personal details in these files:
- `src/components/Hero.tsx` - Name, roles, profile picture
- `src/components/About.tsx` - Bio and resume link
- `src/components/Contact.tsx` - Email, location, GitHub
- `src/components/Footer.tsx` - Social links

### Projects

Edit `src/components/Projects.tsx` to add your own projects:
```typescript
const projects = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    image: "/images/projects/project1.png",
    tags: ["React", "Node.js"],
    category: "WEB APP",
    demoUrl: "https://your-demo.com",
  },
];
```

### Skills

Modify `src/components/Skills.tsx` to update your skill set and proficiency levels.

### Colors & Theme

Adjust the theme in `src/app/globals.css` and Tailwind config if needed.

## 📁 Project Structure

```
temp-portfolio/
├── public/
│   ├── images/
│   │   ├── profile.jpg          # Your profile picture
│   │   └── projects/            # Project screenshots
│   └── Azzeddine Hani Benchalel.pdf  # Your resume
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   └── components/
│       ├── Navbar.tsx           # Navigation bar
│       ├── Hero.tsx             # Hero section
│       ├── About.tsx            # About section
│       ├── Projects.tsx         # Projects showcase
│       ├── Skills.tsx           # Skills section
│       ├── Achievements.tsx     # Achievements & timeline
│       ├── Contact.tsx          # Contact form
│       └── Footer.tsx           # Footer
├── package.json
└── README.md
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Cloudflare Pages

1. Push your code to GitHub
2. Go to Cloudflare Dashboard → Pages
3. Create a new project and connect your repository
4. Build settings:
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Build output directory: `.next`
5. Deploy

## 🎯 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Optimized Images**: Next.js Image component
- **Code Splitting**: Automatic with Next.js App Router
- **Fast Builds**: Turbopack for development

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Azzeddine Hani Benchalel**

- GitHub: [@DCHani](https://github.com/DCHani)
- LinkedIn: [Azzeddine Hani Benchalel](https://www.linkedin.com/in/azzeddine-hani-benchalel-2a2a45317/)
- Email: azzeddinehanibenchalel@gmail.com

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Made with 💜 using Next.js and Tailwind CSS

