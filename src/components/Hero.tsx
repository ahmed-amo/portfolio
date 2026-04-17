"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const roles = ["Full Stack Software Engineer", "DevOps/Cloud Practitioner", "AI/ML Specialist"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-content", { opacity: 0, y: 60 });
      gsap.set(".hero-visual", { opacity: 0, scale: 0.9 });
      gsap.set(".hero-stat", { opacity: 0, y: 30 });
      gsap.set(".hero-line-accent", { scaleX: 0 });
      gsap.set(".orbit-item", { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 1,
      })
      .to(".hero-line-accent", {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.6")
      .to(".hero-visual", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }, "-=0.8")
      .to(".orbit-item", {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.5")
      .to(".hero-stat", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      }, "-=0.4");

      // Floating animation
      gsap.to(".hero-float", {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Orbit rotation
      gsap.to(".orbit-ring", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // Counter-rotate items to keep them upright
      gsap.to(".orbit-item-inner", {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // Pulse animation for the glow
      gsap.to(".pulse-glow", {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-[#08080a]">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-175 h-175 bg-violet-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-150 h-150 bg-indigo-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[15%] w-100 h-100 bg-cyan-600/8 rounded-full blur-[100px]" />
      </div>

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08080a_75%)]" />

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 py-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="hero-content space-y-8">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-zinc-500">Available for projects</span>
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.9]">
                  <span className="block mt-2">
                    <span className="text-white">Ahmed</span>
                    <span className="text-zinc-600">  Amokrane</span>
                  </span>
                </h1>
                <div className="hero-line-accent h-1 w-20 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full origin-left mt-6" />
              </div>

              {/* Role - Enhanced Typewriter */}
              <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl h-8 sm:h-10">
                <span className="text-zinc-600">&lt;</span>
                <span className="text-violet-400 font-mono">{displayText}</span>
                <span className="relative w-[3px] h-7 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-b from-violet-400 to-cyan-400 animate-pulse" />
                </span>
                <span className="text-zinc-600">/&gt;</span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-zinc-500 max-w-xl leading-relaxed">
                Building  <span className="text-zinc-300">high-performance Saas and Web/mobile applications</span> and 
                <span className="text-zinc-300"> intelligent systems</span> that transform ideas into impactful digital experiences.
              </p>

              {/* Text Link CTAs */}
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 pt-4">
                <a href="#projects" className="group relative text-white font-medium text-base sm:text-lg">
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100" />
                  <svg className="inline-block ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <a href="#contact" className="group relative text-zinc-400 font-medium text-base sm:text-lg hover:text-white transition-colors duration-200">
                  <span>Get in Touch</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-zinc-400 group-hover:w-full transition-all duration-300" />
                </a>

                <a
                  href="/AHMED_AMOKRANE_SOFTWARE_ENGINEER.pdf"
                  download
                  className="group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold text-zinc-900 shadow-lg shadow-black/25 ring-1 ring-white/80 transition-all duration-200 hover:bg-zinc-100 hover:shadow-xl hover:shadow-black/30"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Resume</span>
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 sm:gap-10 pt-8 sm:pt-10 border-t border-zinc-800/60">
                {[
                  { value: "5+", label: "Years Exp." },
                  { value: "10+", label: "Projects" },
                  { value: "20+", label: "Technologies" },
                ].map((stat, index) => (
                  <div key={index} className="hero-stat">
                    <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-zinc-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - Enhanced Orbit System */}
            <div className="hero-visual relative flex items-center justify-center lg:justify-center">
              <div className="hero-float relative w-[300px] h-[300px] xs:w-[360px] xs:h-[360px] sm:w-[440px] sm:h-[440px] lg:w-[680px] lg:h-[680px] xl:w-[800px] xl:h-[800px] lg:-translate-x-24 xl:-translate-x-32">
                
                {/* Pulsing glow behind */}
                <div className="pulse-glow absolute inset-[-20%] rounded-full bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/20 blur-3xl" />

                {/* Outer orbit ring */}
                <div className="orbit-ring absolute inset-0">
                  {/* Orbit path */}
                  <div className="absolute inset-0 rounded-full border border-zinc-800/50" />
                  <div className="absolute inset-0 rounded-full border border-dashed border-violet-500/20 scale-[1.15] lg:scale-[1.28] xl:scale-[1.32]" />
                  
                  {/* Orbiting items */}
                  <div className="orbit-item absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="orbit-item-inner px-4 py-2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full shadow-lg shadow-violet-500/10">
                      <span className="text-sm font-medium text-zinc-300">PotsgresSQL/RestAPIs</span>
                    </div>
                  </div>
                  
                  <div className="orbit-item absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="orbit-item-inner px-4 py-2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full shadow-lg shadow-cyan-500/10">
                      <span className="text-sm font-medium text-zinc-300">Python AI/ML</span>
                    </div>
                  </div>
                  
                  <div className="orbit-item absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="orbit-item-inner px-4 py-2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full shadow-lg shadow-violet-500/10">
                      <span className="text-sm font-medium text-zinc-300">Next.js</span>
                    </div>
                  </div>
                  
                  <div className="orbit-item absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                    <div className="orbit-item-inner px-4 py-2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full shadow-lg shadow-cyan-500/10">
                      <span className="text-sm font-medium text-zinc-300">PHP Laravel</span>
                    </div>
                  </div>

                  {/* Diagonal items */}
                  <div className="orbit-item absolute top-[15%] right-[15%]">
                    <div className="orbit-item-inner px-3 py-1.5 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full">
                      <span className="text-xs font-medium text-zinc-400">TypeScript</span>
                    </div>
                  </div>
                  
                  <div className="orbit-item absolute bottom-[15%] left-[15%]">
                    <div className="orbit-item-inner px-3 py-1.5 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full">
                      <span className="text-xs font-medium text-zinc-400">React</span>
                    </div>
                  </div>

                  <div className="orbit-item absolute top-[22%] left-[6%] -translate-x-1/2 -translate-y-1/2">
                    <div className="orbit-item-inner px-4 py-2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full shadow-lg shadow-violet-500/10">
                      <span className="text-sm font-medium text-zinc-300">DevOps</span>
                    </div>
                  </div>

                  <div className="orbit-item absolute bottom-[22%] right-[6%] translate-x-1/2 translate-y-1/2">
                    <div className="orbit-item-inner px-4 py-2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full shadow-lg shadow-cyan-500/10">
                      <span className="text-sm font-medium text-zinc-300">AWS</span>
                    </div>
                  </div>
                </div>

                {/* Center container */}
                <div className="absolute inset-[15%] lg:inset-[23%] xl:inset-[24.625%] rounded-full bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 shadow-2xl shadow-black/50 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />
                  
                  {/* Inner border glow */}
                  <div className="absolute inset-[2px] rounded-full border border-violet-500/20" />
                  
                  {/* Profile image */}
                  <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-zinc-600/50 bg-zinc-900">
                    <img
                      src="/profile.png"
                      alt="Amokrane Ahmed"
                      className="w-full h-full object-contain scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
                  </div>
                </div>
                {/* Accent dots */}
                <div className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full bg-violet-500/60 animate-pulse" />
                <div className="absolute bottom-[10%] right-[10%] w-1.5 h-1.5 rounded-full bg-cyan-500/60 animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-[50%] right-[5%] w-1 h-1 rounded-full bg-violet-400/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#about" className="flex flex-col items-center gap-3 text-zinc-600 hover:text-zinc-400 transition-colors group">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent group-hover:from-violet-500 transition-colors" />
        </a>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}
