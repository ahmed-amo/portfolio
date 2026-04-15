"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectImages {
  laptop: string;
  phone: string;
  desktop: string;
}

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  images: ProjectImages;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  year: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 1,
    title: "PRIME-SHOP",
    tagline: "Multi-vendor e-commerce SaaS — Algeria",
    description:
      "A subscription-based SaaS platform where gaming hardware vendors and electronics shops launch and manage their own storefronts. Built with a multi-tenant Laravel backend, a fully typed Next.js storefront, and containerized CI/CD deployments on Railway.",
    highlights: [
      "Multi-tenant vendor onboarding & subscription billing",
      "Real-time inventory & order management dashboard",
      "Dockerized CI/CD pipeline — zero-downtime deploys",
    ],
    images: {
      laptop: "/images/projects/prime_shop/laptop.png",
      phone: "/images/projects/prime_shop/phone.png",
      desktop: "/images/projects/prime_shop/desktop.png",
    },
    tags: ["Laravel", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "CI/CD", "Tailwind"],
    demoUrl: "https://prime-shop.up.railway.app/",
    githubUrl: "https://github.com/ahmed-amo/PRIME-SHOP",
    year: "2025",
    color: "#ff7b00",
  },
  {
    id: 2,
    title: "Alkma Cars Company ",
    tagline: "Fleet & import operations platform — 20+ showrooms",
    description:
      "An internal operations platform used by over 20 car showrooms across Algeria. Handles live vehicle inventory, client management, and import pipeline tracking — all in one unified dashboard. Shipped with Inertia.js for a seamless SPA experience without a separate API layer.",
    highlights: [
      "Live vehicle arrival tracker across 20+ showrooms",
      "Inertia.js SPA — no API overhead, snappy transitions",
      "Role-based access for showroom staff vs. head office",
    ],
    images: {
      laptop: "/images/projects/Alkma-cars/laptop.png",
      phone: "/images/projects/Alkma-cars/phone.png",
      desktop: "/images/projects/Alkma-cars/desktop.png",
    },
    tags: ["Laravel", "Inertia.js", "TypeScript", "PostgreSQL", "Docker", "CI/CD", "Tailwind"],
    demoUrl: "https://alkma-cars-company.com/",
    githubUrl: "#",
    year: "2025",
    color: "#b07c04",
  },
  {
    id: 3,
    title: "Rentili",
    tagline: "Full-stack vacation rental marketplace — web + mobile",
    description:
      "An end-to-end Airbnb-style rental marketplace with a Laravel REST API, a server-side rendered Next.js web app, and a Flutter mobile app — all sharing the same backend. Features property search with map integration, availability calendars, a host dashboard, and real-time booking flows.",
    highlights: [
      "Single Laravel API powering both web (Next.js) and mobile (Flutter)",
      "Interactive map search with geo-filter & availability calendar",
      "Host dashboard — listing management, bookings, and payouts",
    ],
    images: {
      laptop: "/images/projects/rentili/laptop.png",
      phone: "/images/projects/rentili/phone.png",
      desktop: "/images/projects/rentili/desktop.png",
    },
    tags: ["Laravel", "Next.js", "Flutter", "TypeScript", "PostgreSQL", "REST API", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
    year: "2026",
    color: "#FFEA00",
  },
  {
    id: 4,
    title: "Ayadati",
    tagline: "Multi-tenant medical lab SaaS — AI-powered diagnostics",
    description:
      "A full-featured SaaS platform for blood testing laboratories. Four distinct role-based dashboards (Admin, Auditor, Receptionist, Nurse) run on a single multi-tenant Laravel backend. Integrates PayPal for payments, real-time result tracking, automated complaint resolution via email, and Python ML models for anemia and diabetes prediction.",
    highlights: [
      "Multi-tenant architecture — one instance, unlimited labs",
      "AI disease prediction (anemia & diabetes) via Python/Logistic Regression",
      "4-role RBAC — Nurse, Receptionist, Auditor, Admin each with scoped dashboards",
    ],
    images: {
      laptop: "/images/projects/Ayadati/laptop.png",
      phone: "/images/projects/Ayadati/phone.png",
      desktop: "/images/projects/Ayadati/desktop.png",
    },
    tags: ["Laravel", "React", "Next.js", "TypeScript", "PostgreSQL", "Python / ML", "REST API", "Tailwind"],
    demoUrl: "#",
    githubUrl: "https://github.com/ahmed-amo/Ayadati-lab",
    year: "2023",
    color: "#0EA5E9",
  },
  {
    id: 5,
    title: "BuildCorp",
    tagline: "Construction services platform — project showcase & CMS",
    description:
      "A content-managed showcase platform for a construction company — featuring project portfolios, service pages, team profiles, and a blog. Built with a Laravel REST API and a fully typed Next.js frontend with SSR for SEO performance.",
    highlights: [
      "Custom CMS — admins manage all content without touching code",
      "SSR-first Next.js for Core Web Vitals & SEO rankings",
      "PostgreSQL-backed project & team management",
    ],
    images: {
      laptop: "/images/projects/build_corp/laptop.png",
      phone: "/images/projects/build_corp/phone.png",
      desktop: "/images/projects/build_corp/desktop.png",
    },
    tags: ["Laravel", "Next.js", "TypeScript", "PostgreSQL", "REST API", "Tailwind"],
    demoUrl: "#",
    githubUrl: "https://github.com/ahmed-amo/BuildCorp",
    year: "2025",
    color: "#d6315a",
  },
];

// ─── GitHub Icon ──────────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ─── Laptop Mockup ────────────────────────────────────────────────────────────

function LaptopMockup({ image, color }: { image: string; color: string }) {
  const frame = `${color}55`;
  const glow = `0 0 35px ${color}35, 0 20px 50px rgba(0,0,0,0.9)`;
  return (
    <div className="w-full drop-shadow-2xl">
      <div
        className="rounded-t-[12px] overflow-hidden"
        style={{
          border: "2px solid",
          borderColor: frame,
          boxShadow: glow,
          background: `linear-gradient(180deg, ${color}12 0%, rgba(255,255,255,0.04) 30%, rgba(0,0,0,0.0) 100%)`,
        }}
      >
        <div
          className="h-2.5 sm:h-[11px] w-full flex items-center justify-center border-b border-zinc-800/80"
          style={{ background: "linear-gradient(180deg, #3f3f46 0%, #18181b 100%)" }}
        >
          <div className="w-8 h-1 rounded-full bg-zinc-700/90 ring-1 ring-zinc-600/50" />
        </div>
        <div className="relative w-full overflow-hidden" style={{ paddingTop: "60%" }}>
          <img
            src={image}
            alt="laptop view"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain object-center"
            style={{ filter: "brightness(1.08) contrast(1.06) saturate(1.08)" }}
          />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-zinc-700 ring-1 ring-zinc-600" />
        </div>
      </div>
      <div
        className="w-full h-[4px]"
        style={{
          background: `linear-gradient(90deg, #18181b, #3f3f46, ${color}50, #3f3f46, #18181b)`,
        }}
      />
      <div
        className="relative w-[110%] -ml-[5%] rounded-b-xl"
        style={{
          height: "22px",
          background: "linear-gradient(180deg, #27272a 0%, #1a1a1d 100%)",
          border: "2px solid",
          borderColor: `${color}55`,
          boxShadow: `0 8px 30px rgba(0,0,0,0.6)`,
        }}
      >
        <div
          className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[20%] h-[7px] rounded-sm"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}
        />
      </div>
    </div>
  );
}

// ─── Phone Mockup ─────────────────────────────────────────────────────────────

function PhoneMockup({ image, color }: { image: string; color: string }) {
  return (
    <div className="w-full drop-shadow-2xl">
      <div
        className="relative w-full rounded-[22px] overflow-hidden"
        style={{
          paddingTop: "218%",
          border: "2px solid",
          borderColor: `${color}55`,
          boxShadow: `0 0 35px ${color}35, 0 20px 50px rgba(0,0,0,0.9)`,
          background: `linear-gradient(180deg, ${color}14 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.0) 100%)`,
        }}
      >
        <img
          src={image}
          alt="phone view"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain object-center"
          style={{ filter: "brightness(1.08) contrast(1.06) saturate(1.08)" }}
        />
        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[32%] h-[3.5%] bg-zinc-950 rounded-full z-10" />
        <div className="absolute top-[20%] -right-[2px] w-[3px] h-[14%] rounded-r-sm" style={{ background: `${color}60` }} />
        <div className="absolute top-[16%] -left-[2px] w-[3px] h-[9%] rounded-l-sm" style={{ background: `${color}50` }} />
        <div className="absolute top-[27%] -left-[2px] w-[3px] h-[9%] rounded-l-sm" style={{ background: `${color}50` }} />
      </div>
      <div className="mx-auto mt-2 w-[36%] h-[3px] rounded-full bg-zinc-600" />
    </div>
  );
}

// ─── Desktop Mockup ───────────────────────────────────────────────────────────

function DesktopMockup({ image, color }: { image: string; color: string }) {
  return (
    <div className="w-full flex flex-col items-center drop-shadow-2xl">
      <div
        className="relative w-full rounded-t-xl overflow-hidden"
        style={{
          paddingTop: "54%",
          border: "2px solid",
          borderColor: `${color}55`,
          boxShadow: `0 0 35px ${color}35, 0 20px 50px rgba(0,0,0,0.9)`,
          background: `linear-gradient(180deg, ${color}12 0%, rgba(255,255,255,0.05) 35%, rgba(0,0,0,0.0) 100%)`,
        }}
      >
        <img
          src={image}
          alt="desktop view"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain object-center"
          style={{ filter: "brightness(1.08) contrast(1.06) saturate(1.08)", objectPosition: "50% 60%" }}
        />
        <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-800/60 flex items-center px-3 gap-2 z-10 backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <div
            className="ml-auto mr-auto w-[40%] h-3 rounded-full"
            style={{ background: `${color}18`, border: `1px solid ${color}25` }}
          />
        </div>
      </div>
      <div
        className="w-full h-5 flex items-center justify-center rounded-b-sm"
        style={{
          background: "linear-gradient(180deg, #27272a 0%, #1c1c1e 100%)",
          borderLeft: `2px solid ${color}55`,
          borderRight: `2px solid ${color}55`,
          borderBottom: `2px solid ${color}55`,
        }}
      >
        <div className="w-10 h-[3px] rounded-full bg-zinc-600" />
      </div>
      <div
        className="h-5 sm:h-6 md:h-7 w-3 min-w-[10px] sm:w-[8%] sm:min-w-0"
        style={{ background: "linear-gradient(180deg, #3f3f46 0%, #27272a 100%)" }}
      />
      <div
        className="h-1 sm:h-[5px] md:h-[6px] rounded-full w-[min(92%,280px)] sm:w-[40%] max-w-md"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, #52525b, ${color}40, transparent)`,
          boxShadow: `0 4px 20px ${color}25`,
        }}
      />
    </div>
  );
}

// ─── Device Cluster ───────────────────────────────────────────────────────────

function DeviceCluster({ images, color }: { images: ProjectImages; color: string }) {
  return (
    <div className="absolute inset-y-0 right-0 w-[56%] min-[480px]:w-[54%] md:w-[55%] flex flex-col justify-center items-center px-2 sm:px-4 md:px-6 pointer-events-none select-none">
      <div className="device-cluster-parallax w-full max-h-[82vh] max-w-[min(100%,22rem)] sm:max-h-[84vh] sm:max-w-[min(100%,25rem)] md:max-h-[86vh] md:max-w-[min(100%,28rem)] lg:max-h-none lg:max-w-[min(100%,32rem)] xl:max-w-[min(100%,36rem)] flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 mx-auto">
        <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-5 w-full min-w-0">
          <div className="laptop-wrapper min-w-0 flex-1 basis-0 max-w-[min(100%,18rem)] sm:max-w-[min(100%,20rem)] md:max-w-[min(100%,22rem)] lg:max-w-[min(100%,24rem)] xl:max-w-[min(100%,26rem)]">
            <LaptopMockup image={images.laptop} color={color} />
          </div>
          <div className="phone-wrapper shrink-0 w-[clamp(4.25rem,19vw,6.75rem)] sm:w-[clamp(4.5rem,17vw,7rem)] lg:w-[clamp(5rem,16%,7.5rem)] xl:flex-[0_0_18%] xl:w-auto xl:max-w-[7.5rem] mb-1 sm:mb-2 md:mb-3">
            <PhoneMockup image={images.phone} color={color} />
          </div>
        </div>
        <div className="desktop-wrapper w-full min-w-0 mt-0.5 sm:mt-1 max-w-[min(100%,20rem)] sm:max-w-[min(100%,23rem)] md:max-w-[min(100%,26rem)] lg:max-w-[min(100%,29rem)] xl:max-w-[min(100%,32rem)]">
          <DesktopMockup image={images.desktop} color={color} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInSection, setIsInSection] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setIsInSection(true),
        onLeave: () => setIsInSection(false),
        onEnterBack: () => setIsInSection(true),
        onLeaveBack: () => setIsInSection(false),
      });

      const cards = gsap.utils.toArray<HTMLElement>(".project-slide");

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: i === cards.length - 1 ? "bottom bottom" : "bottom top",
          pin: i !== cards.length - 1,
          pinSpacing: false,
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        const content = card.querySelector(".project-content");
        if (content) {
          gsap.fromTo(content,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: card, start: "top 80%", end: "top 30%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        const tags = card.querySelectorAll(".project-tag");
        if (tags.length) {
          gsap.fromTo(tags,
            { opacity: 0, y: 16, scale: 0.85 },
            {
              opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.45,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card, start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        const laptop = card.querySelector(".laptop-wrapper");
        if (laptop) {
          gsap.fromTo(laptop,
            { opacity: 0, y: -70, x: -30, rotateX: 12, scale: 0.9 },
            {
              opacity: 1, y: 0, x: 0, rotateX: 0, scale: 1,
              duration: 1.2, ease: "power3.out",
              scrollTrigger: {
                trigger: card, start: "top 78%", end: "top 25%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        const phone = card.querySelector(".phone-wrapper");
        if (phone) {
          gsap.fromTo(phone,
            { opacity: 0, y: -90, x: 30, rotateY: -10, scale: 0.82 },
            {
              opacity: 1, y: 0, x: 0, rotateY: 0, scale: 1,
              duration: 1.25, delay: 0.12, ease: "power3.out",
              scrollTrigger: {
                trigger: card, start: "top 78%", end: "top 25%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        const desktop = card.querySelector(".desktop-wrapper");
        if (desktop) {
          gsap.fromTo(desktop,
            { opacity: 0, y: 90, scale: 0.88 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 1.35, delay: 0.06, ease: "power3.out",
              scrollTrigger: {
                trigger: card, start: "top 78%", end: "top 25%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        const clusterMotion = card.querySelector(".device-cluster-parallax");
        if (clusterMotion) {
          gsap.to(clusterMotion, {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: 1.6,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-[#030305]">

      {/* ── Section label — fixed far left ── */}
      <div
        className={`fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 pointer-events-none transition-all duration-500 ${
          isInSection ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
        }`}
      >
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800 leading-none">
          02
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-700 to-transparent" />
        <span className="text-[10px] text-zinc-700 uppercase tracking-widest [writing-mode:vertical-lr]">
          Projects
        </span>
      </div>

      {/* ── Progress dots — right edge ── */}
      <div
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 transition-all duration-500 ${
          isInSection ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"
        }`}
      >
        {projects.map((project, i) => (
          <button
            key={i}
            className={`group relative transition-all duration-500 ${
              i === activeIndex ? "scale-100" : "scale-75 opacity-40"
            }`}
            onClick={() =>
              document.querySelectorAll(".project-slide")[i]?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div
              className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
              style={{
                borderColor: i === activeIndex ? project.color : "#52525b",
                background: i === activeIndex ? project.color : "transparent",
                boxShadow: i === activeIndex ? `0 0 14px ${project.color}70` : "none",
              }}
            />
            <span className="absolute right-7 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-zinc-900/95 text-xs text-zinc-300 whitespace-nowrap border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {project.title.split(" ").slice(0, 2).join(" ")}
            </span>
          </button>
        ))}
        <div className="mt-3 flex flex-col items-center gap-1">
          <span className="text-[11px] font-mono text-zinc-500">{String(activeIndex + 1).padStart(2, "0")}</span>
          <div className="w-3 h-px bg-zinc-700" />
          <span className="text-[11px] font-mono text-zinc-700">{String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* ── Slides ── */}
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="project-slide relative h-screen w-full overflow-hidden"
        >
          {/* Dark base */}
          <div className="absolute inset-0 bg-[#030305]" />

          {/* Ambient glow */}
          <div
            className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[56%] h-[76%] rounded-full blur-[140px] opacity-40 pointer-events-none"
            style={{ background: project.color }}
          />

          <DeviceCluster images={project.images} color={project.color} />

          {/* Left-side gradient so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030305] from-[42%] via-[#030305]/60 via-[55%] to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305]/80 via-transparent to-[#030305]/40 pointer-events-none" />

          {/* ── Text content ── */}
          <div className="project-content relative z-10 h-full flex items-center">
            <div className="w-full max-w-7xl mr-auto ml-0 pl-6 pr-8 sm:pl-8 sm:pr-10 lg:pl-28 xl:pl-32 2xl:pl-36 lg:pr-16">
              <div className="w-full max-w-[45%]">

                {/* Badge row */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl border-2 shrink-0"
                    style={{
                      borderColor: `${project.color}50`,
                      background: `${project.color}12`,
                    }}
                  >
                    <span className="text-lg font-black" style={{ color: project.color }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none mb-1">
                      Featured Project · {project.year}
                    </p>
                    <p className="text-xs text-zinc-400 font-medium">{project.tagline}</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-3 leading-[1.05]">
                  {project.title.split(" ").map((word, i) => (
                    <span key={i} className="inline-block mr-3">
                      {i === 0
                        ? <span style={{ color: project.color }}>{word}</span>
                        : word}
                    </span>
                  ))}
                </h3>

                {/* Description */}
                <p className="text-sm xl:text-base text-zinc-400 mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* ── Highlights — the hireability engine ── */}
                <ul className="mb-6 flex flex-col gap-2">
                  {project.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="mt-[5px] shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: project.color }}
                      />
                      <span className="text-sm text-zinc-300 leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="project-tag px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900/80 text-zinc-300 border border-zinc-700/70 backdrop-blur-sm hover:border-zinc-500 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ── CTA row — Live + GitHub ── */}
                <div className="flex items-center gap-3 flex-wrap">

                  {/* Live demo button */}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3"
                    >
                      <span
                        className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:brightness-110 inline-flex items-center gap-2"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
                          boxShadow: `0 6px 28px ${project.color}45`,
                        }}
                      >
                        View Live
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </span>
                    </a>
                  )}

                  {/* GitHub button */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105"
                      style={{
                        borderColor: `${project.color}40`,
                        color: "rgb(161 161 170)",
                        background: `${project.color}08`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${project.color}90`;
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                        (e.currentTarget as HTMLElement).style.background = `${project.color}18`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${project.color}40`;
                        (e.currentTarget as HTMLElement).style.color = "rgb(161 161 170)";
                        (e.currentTarget as HTMLElement).style.background = `${project.color}08`;
                      }}
                    >
                      <GitHubIcon className="w-4 h-4" />
                      Source Code
                    </a>
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Ghost number */}
          <div className="absolute bottom-0 right-[2%] pointer-events-none overflow-hidden leading-none">
            <span
              className="text-[20vw] font-black opacity-[0.025]"
              style={{ color: project.color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Corner accents */}
          <div
            className="absolute top-14 right-14 w-20 h-20 border-t-2 border-r-2 rounded-tr-2xl opacity-20 hidden lg:block"
            style={{ borderColor: project.color }}
          />
          <div
            className="absolute bottom-14 left-14 w-20 h-20 border-b-2 border-l-2 rounded-bl-2xl opacity-20 hidden lg:block"
            style={{ borderColor: project.color }}
          />

          {/* Scroll hint — first slide only */}
          {index === 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Scroll to explore</span>
              <div className="w-5 h-8 rounded-full border-2 border-zinc-700 flex items-start justify-center pt-1.5">
                <div className="w-1 h-1.5 rounded-full bg-zinc-500 animate-bounce" />
              </div>
            </div>
          )}

        </div>
      ))}
    </section>
  );
}