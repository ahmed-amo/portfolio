"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techIcons = [
  { name: "TypeScript",  bg: "#3178C6", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript",  bg: "#F7DF1E", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python",      bg: "#3776AB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PHP",         bg: "#777BB4", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "C++",         bg: "#00599C", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Laravel",     bg: "#FF2D20", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "React",       bg: "#20232A", src: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "AWS", bg: "#FF9900", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Next.js",     bg: "#18181B", src: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "Bootstrap",   bg: "#7952B3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Tailwind",    bg: "#0EA5E9", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Flutter",     bg: "#02569B", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "PostgreSQL",  bg: "#4169E1", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL",       bg: "#4479A1", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "TensorFlow",  bg: "#FF6F00", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "Docker",      bg: "#2496ED", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Node.js",     bg: "#339933", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Redis",       bg: "#DC382D", src: "https://cdn.simpleicons.org/redis/ffffff" },
  { name: "Git",         bg: "#F05032", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub",      bg: "#18181B", src: "https://cdn.simpleicons.org/github/ffffff" },
  { name: "Figma",       bg: "#F24E1E", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "VS Code",     bg: "#007ACC", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Linux",       bg: "#27272A", src: "https://cdn.simpleicons.org/linux/FCC624" },
  { name: "MongoDB",     bg: "#47A248", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "GraphQL",     bg: "#E10098", src: "https://cdn.simpleicons.org/graphql/ffffff" },
  { name: "Prisma",      bg: "#2D3748", src: "https://cdn.simpleicons.org/prisma/ffffff" },
  { name: "Postman",     bg: "#FF6C37", src: "https://cdn.simpleicons.org/postman/ffffff" },
];

const marqueeRow1 = [
  { name: "Anthropic",   bg: "#CC785C", color: "#ffffff", src: "https://cdn.simpleicons.org/anthropic/ffffff" },
  { name: "Cursor",      bg: "#18181B", color: "#ffffff", src: "https://cdn.simpleicons.org/cursor/ffffff" },
  { name: "Railway",     bg: "#0B0D0E", color: "#ffffff", src: "https://cdn.simpleicons.org/railway/ffffff" },
  { name: "Cloudflare",  bg: "#F48120", color: "#ffffff", src: "https://cdn.simpleicons.org/cloudflare/ffffff" },
  { name: "Stripe",      bg: "#635BFF", color: "#ffffff", src: "https://cdn.simpleicons.org/stripe/ffffff" },
  { name: "PayPal",      bg: "#003087", color: "#ffffff", src: "https://cdn.simpleicons.org/paypal/ffffff" },
  { name: "Vercel",      bg: "#18181B", color: "#ffffff", src: "https://cdn.simpleicons.org/vercel/ffffff" },
  { name: "Supabase",    bg: "#1A3A2A", color: "#3ECF8E", src: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "CI/CD",       bg: "#27272A", color: "#60A5FA", src: "https://cdn.simpleicons.org/githubactions/60A5FA" },
];

const marqueeRow2 = [
  { name: "Jest",        bg: "#1A0005", color: "#C21325", src: "https://cdn.simpleicons.org/jest/C21325" },
  { name: "GraphQL",     bg: "#2A0020", color: "#E10098", src: "https://cdn.simpleicons.org/graphql/E10098" },
  { name: "Prisma",      bg: "#0A1020", color: "#ffffff", src: "https://cdn.simpleicons.org/prisma/ffffff" },
  { name: "Redis",       bg: "#3D0A08", color: "#DC382D", src: "https://cdn.simpleicons.org/redis/DC382D" },
  { name: "MongoDB",     bg: "#0A1F0A", color: "#47A248", src: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Postman",     bg: "#2A1500", color: "#FF6C37", src: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Linux",       bg: "#2A2000", color: "#FCC624", src: "https://cdn.simpleicons.org/linux/FCC624" },
  { name: "Figma",       bg: "#1A0A00", color: "#F24E1E", src: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Turborepo",   bg: "#18181B", color: "#ffffff", src: "https://cdn.simpleicons.org/turborepo/ffffff" },
  { name: "PlanetScale", bg: "#18181B", color: "#ffffff", src: "https://cdn.simpleicons.org/planetscale/ffffff" },
];

function MarqueeBadge({ item }: { item: typeof marqueeRow1[0] }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase whitespace-nowrap border border-white/10 select-none"
      style={{ background: item.bg, color: item.color }}
    >
      <img src={item.src} alt={item.name} width={18} height={18} className="object-contain shrink-0" />
      {item.name}
    </span>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen bg-[#030305] overflow-hidden flex flex-col items-center justify-start pt-24 pb-16"
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Section indicator */}
      <div className="absolute top-8 left-8 z-20 hidden lg:flex items-center gap-4">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800">
          03
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Section</span>
          <span className="text-sm text-zinc-800 font-bold">Tech Stack</span>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-10 px-4 sm:px-6 md:px-8">

        {/* Title */}
        <div className="text-center">
        <div className="section-header text-center mb-12 sm:mb-16">
          <h3 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            My Tech Stack <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent"></span>
          </h3>
        </div>
        </div>

        {/* Floating icons grid */}
<div className="grid grid-cols-7 sm:grid-cols-9 gap-3 sm:gap-5 w-full max-w-4xl">
  {techIcons.map((tech, i) => (
    <div
      key={tech.name}
      title={tech.name}
      className="group relative aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-125 hover:-translate-y-1"
      style={{
        background: `${tech.bg}22`,
        border: `1px solid ${tech.bg}55`,
        animation: `skillFloat ${2.5 + (i % 5) * 0.4}s ease-in-out -${(i * 0.27).toFixed(2)}s infinite`,
      }}
    >
      <img
        src={tech.src}
        alt={tech.name}
        className="object-contain w-8 h-8 sm:w-10 sm:h-10"
      />

      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {tech.name}
      </span>
    </div>
  ))}
</div>

        {/* Marquee rows */}
        <div className="flex flex-col gap-3 w-full overflow-hidden">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-3 animate-[marquee_25s_linear_infinite]">
              {[...marqueeRow1, ...marqueeRow1].map((item, i) => (
                <MarqueeBadge key={i} item={item} />
              ))}
            </div>
          </div>
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-3 animate-[marquee_35s_linear_infinite_reverse]">
              {[...marqueeRow2, ...marqueeRow2].map((item, i) => (
                <MarqueeBadge key={i} item={item} />
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes skillFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}