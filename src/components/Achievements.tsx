"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: "+", label: "Projects Delivered", icon: "🚀" },
  { value: 5, suffix: "+", label: "Years Experience", icon: "⏳" },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
  { value: 3, suffix: "", label: "Languages : English, French, Arabic", icon: "🌍" },
];

const milestones = [
  {
    year: "2020",
    title: "Started Coding",
    subtitle: "The Beginning",
    description: "First lines of code and the start of an exciting journey",
    icon: "🌱",
    color: "#f59e0b",
  },
  {
    year: "2023",
    title: "Bachelor's Degree in Software Engineering",
    subtitle: "web-development",
    description: "Strong foundation in algorithms, data structures, and software engineering",
    icon: "📚",
    color: "#10b981",
  },
    {
    year: "2024-2026",
    title: "Building Web/Mobile Applications",
    subtitle: "Full Stack & AI",
    description: "Building production-ready applications for clients worldwide",
    icon: "💻",
    color: "#06b6d4",
  },  
  {
    year: "2026",
    title: "Master's Degree Artificial Intelligence/Data Science",
    subtitle: "Data Science & AI",
    description: "Advanced specialization in machine learning and deep learning.",
    icon: "🎓",
    color: "#3421ad",
  },
    {
    year: "2026-NOW",
    title: "Full Stack Developer | Sales Consultant",
    subtitle: "",
    description: "Designed and developed the official company website, now live and actively used by employees for daily operations and customer interactions.",
    icon: "Alkma Cars Company",
    color: "#8b5cf6",
  },



];

const expertise = [
  { name: "Full Stack Development", level: 92 },
  { name: "AI & Machine Learning", level: 88 },
  { name: "UI/UX Design", level: 85 },
  { name: "Database Architecture", level: 87 },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for scroll-based animations
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.5,
          onEnter: () => setHasAnimated(true),
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * milestones.length),
              milestones.length - 1
            );
            setActiveTimeline(newIndex);
          },
        },
      });

      // Animate header
      gsap.fromTo(".ach-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
            // Animate expertise bars
      gsap.fromTo(".expertise-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".expertise-section",
            start: "top 10%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate stats
      gsap.fromTo(".stat-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );



    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate counters
  useEffect(() => {
    if (!hasAnimated) return;

    const interval = setInterval(() => {
      setCounts(prev => prev.map((count, i) => {
        if (count < stats[i].value) {
          const increment = Math.ceil(stats[i].value / 50);
          return Math.min(count + increment, stats[i].value);
        }
        return count;
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative h-screen bg-[#030305] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Animated gradient */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${milestones[activeTimeline].color}15 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, ${milestones[activeTimeline].color}10 0%, transparent 40%)`,
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Section indicator - hidden on mobile, md, and lg */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 hidden xl:flex items-center gap-4">
        <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800">
          04
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Section</span>
          <span className="text-sm text-zinc-400 font-medium">Achievements</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center py-12 sm:py-8 md:py-0">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col h-full">
            {/* Mobile Header */}
            <div className="ach-header text-center mb-4">
              <span className="text-[10px] text-violet-400 uppercase tracking-widest">Track Record</span>
              <h2 className="text-xl font-bold text-white mt-1">
                Achievements
              </h2>
            </div>

            {/* Mobile Stats - 2x2 grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="stat-card p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-center"
                >
                  <span className="text-lg block mb-1">{stat.icon}</span>
                  <div className="text-xl font-bold text-white">
                    {counts[i]}{stat.suffix}
                  </div>
                  <div className="text-[10px] text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mobile Active Milestone Card */}
            <div 
              className="p-4 rounded-xl border mb-4 transition-all duration-500"
              style={{
                background: `${milestones[activeTimeline].color}10`,
                borderColor: `${milestones[activeTimeline].color}50`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{milestones[activeTimeline].icon}</span>
                <div>
                  <span 
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{
                      color: milestones[activeTimeline].color,
                      background: `${milestones[activeTimeline].color}20`,
                    }}
                  >
                    {milestones[activeTimeline].year}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">{milestones[activeTimeline].title}</h3>
              <p className="text-sm text-violet-400">{milestones[activeTimeline].subtitle}</p>
              <p className="text-xs text-zinc-400 mt-1">{milestones[activeTimeline].description}</p>
            </div>

            {/* Mobile Timeline Dots */}
            <div className="flex justify-center gap-3">
              {milestones.map((milestone, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTimeline(i)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${i === activeTimeline ? 'scale-110' : 'opacity-50'}`}
                >
                  <div 
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300`}
                    style={{
                      borderColor: milestone.color,
                      background: i === activeTimeline ? milestone.color : 'transparent',
                      boxShadow: i === activeTimeline ? `0 0 12px ${milestone.color}` : 'none',
                    }}
                  />
                  <span className="text-[8px] text-zinc-500">{milestone.year.slice(0, 4)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-4 lg:gap-16 xl:gap-20 items-center">

            {/* Left - Stats & Info (Desktop) */}
            <div className="space-y-2 lg:space-y-3 xl:space-y-6 2xl:space-y-10">
              {/* Header */}
              <div className="ach-header">
                <div className="flex items-center gap-2 mb-1 lg:mb-1 xl:mb-2">
                  <div className="h-px w-6 lg:w-8 bg-gradient-to-r from-violet-500 to-transparent" />
                  <span className="text-[10px] lg:text-xs text-violet-400 uppercase tracking-widest leading-normal">Track Record</span>
                </div>
                <h2 className="text-lg lg:text-2xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-1 lg:mb-1 xl:mb-2 leading-tight">
                  Achievements & Impact
                </h2>
                <p className="text-zinc-400 text-[10px] lg:text-xs xl:text-sm 2xl:text-lg max-w-md leading-snug">
                  A journey of continuous growth and delivering value through technology.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-1.5 lg:gap-2 xl:gap-3 2xl:gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="stat-card group relative p-2 lg:p-2.5 xl:p-4 2xl:p-5 rounded-lg lg:rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-1 lg:mb-1 xl:mb-2">
                      <span className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">{stat.icon}</span>
                      <div
                        className="w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ background: milestones[i % milestones.length].color }}
                      />
                    </div>
                    <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold text-white">
                      {counts[i]}{stat.suffix}
                    </div>
                    <div className="text-[9px] lg:text-[10px] xl:text-xs 2xl:text-sm text-zinc-500 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Expertise bars */}
              <div className="expertise-section space-y-1 lg:space-y-1 xl:space-y-2">
                <h3 className="text-xs lg:text-sm xl:text-base font-semibold text-white mb-1 lg:mb-1 xl:mb-2">Core Expertise</h3>
                {expertise.map((skill, i) => (
                  <div key={skill.name} className="space-y-0">
                    <div className="flex justify-between text-[9px] lg:text-[10px] xl:text-xs">
                      <span className="text-zinc-400">{skill.name}</span>
                      <span className="text-zinc-500 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-0.5 lg:h-1 xl:h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="expertise-bar h-full rounded-full origin-left"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${milestones[i % milestones.length].color}, ${milestones[(i + 1) % milestones.length].color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Timeline (Desktop only) */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1.5 md:left-2 lg:left-3 xl:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />

              {/* Timeline items */}
              <div className="space-y-1.5 md:space-y-1.5 lg:space-y-2 xl:space-y-4 2xl:space-y-6">
                {milestones.map((milestone, i) => (
                  <div
                    key={milestone.year}
                    className={`relative pl-6 md:pl-8 lg:pl-10 xl:pl-14 transition-all duration-500 ${i === activeTimeline
                        ? "opacity-100 translate-x-0"
                        : i < activeTimeline
                          ? "opacity-40 -translate-x-2"
                          : "opacity-40 translate-x-2"
                      }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-0.5 md:left-1 lg:left-1.5 xl:left-3 top-1 md:top-1.5 lg:top-2 w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 rounded-full border-2 transition-all duration-500 ${i === activeTimeline ? "scale-125" : "scale-100"
                        }`}
                      style={{
                        borderColor: milestone.color,
                        background: i === activeTimeline ? milestone.color : "transparent",
                        boxShadow: i === activeTimeline ? `0 0 20px ${milestone.color}` : "none",
                      }}
                    />

                    {/* Content card */}
                    <div
                      className={`p-1.5 md:p-2 lg:p-2.5 xl:p-4 2xl:p-5 rounded-lg md:rounded-lg lg:rounded-xl border transition-all duration-500 ${i === activeTimeline
                          ? "bg-zinc-800/50 border-zinc-700 scale-100"
                          : "bg-zinc-900/30 border-zinc-800/30 scale-95"
                        }`}
                    >
                      <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 mb-0.5">
                        <span className="text-xs md:text-sm lg:text-base xl:text-xl">{milestone.icon}</span>
                        <span
                          className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs font-mono px-1 md:px-1 lg:px-1.5 py-0.5 rounded-full"
                          style={{
                            color: milestone.color,
                            background: `${milestone.color}15`,
                          }}
                        >
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-xl font-bold text-white">{milestone.title}</h3>
                      <p className="text-[9px] md:text-[9px] lg:text-[10px] xl:text-xs text-violet-400">{milestone.subtitle}</p>
                      <p className={`text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs text-zinc-500 transition-all duration-500 ${i === activeTimeline ? "opacity-100 max-h-12 lg:max-h-16" : "opacity-0 max-h-0 overflow-hidden"
                        }`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress indicator - hidden on md, show on lg */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
                {milestones.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-8 rounded-full transition-all duration-300 ${i <= activeTimeline ? "bg-violet-500" : "bg-zinc-800"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator - Desktop only */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 text-zinc-600">
        <div className="flex gap-1.5">
          {milestones.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-1 rounded-full transition-all duration-300 ${i <= activeTimeline ? "bg-violet-500" : "bg-zinc-800"
                }`}
            />
          ))}
        </div>
        <span className="text-xs font-mono">
          {String(activeTimeline + 1).padStart(2, "0")}/{String(milestones.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
