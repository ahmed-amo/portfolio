"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  { 
    title: "FRONTEND", 
    desc: "Creating great, responsive UIs with React, Next.js & modern CSS",
    icon: "🎨",
    gradient: "from-violet-500 to-fuchsia-500",
    skills: ["React", "Next.js", "Flutter", "Tailwind"]
  },
  { 
    title: "BACKEND", 
    desc: "Building robust APIs and scalable server architectures",
    icon: "⚙️",
    gradient: "from-cyan-500 to-blue-500",
    skills: ["PHP","Laravel","Python", "PostgreSQL", "REST/GraphQL"]
  },
  { 
    title: "DevOps & Cloud", 
    desc: "Deploying and managing applications at scale",
    icon: "☁️",
    gradient: "from-orange-500 to-amber-500",
    skills: ["GithubActions","Docker", "AWS", "CI/CD", "Linux", "Git"]
  },
  { 
    title: "AI & Machine Learning", 
    desc: "Implementing intelligent solutions with ML frameworks",
    icon: "🧠",
    gradient: "from-emerald-500 to-teal-500",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP"]
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for 3D background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background continuous animations
      gsap.to(".float-slow", { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".float-fast", { y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // Scroll reveal animations for the cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Triggers when the top of the section hits 75% down the viewport
        }
      });

      tl.fromTo(".section-header",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(".expertise-card",
        { opacity: 0, y: 50, rotationY: 15 },
        { opacity: 1, y: 0, rotationY: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(".skill-tag",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.05, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.4"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="expertise" className="relative min-h-screen w-full bg-[#030305] overflow-hidden flex items-center justify-center py-20">
      
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-full h-full opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at ${50 + mousePos.x}% ${50 + mousePos.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at ${30 - mousePos.x}% ${70 - mousePos.y}%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at ${70 + mousePos.x}% ${30 + mousePos.y}%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
            `,
            transition: "background 0.3s ease-out"
          }}
        />
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px"
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-violet-500 float-slow opacity-60 pointer-events-none" />
      <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-cyan-500 float-fast opacity-50 pointer-events-none" />
      <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-fuchsia-500 float-slow opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 right-[8%] w-4 h-4 rounded-full bg-violet-400/30 float-fast pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ perspective: "1200px" }}>
        
        <div className="section-header text-center mb-12 sm:mb-16">
          <h3 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Areas of <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">Expertise</span>
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {expertise.map((item, index) => (
            <div 
              key={index}
              className="expertise-card group relative"
            >
              <div className="relative h-full p-5 sm:p-6 lg:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-violet-500/30 hover:bg-zinc-900/80 hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                
                <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-5">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px]`}>
                    <div className="w-full h-full rounded-xl bg-zinc-900 flex items-center justify-center text-xl lg:text-2xl">
                      {item.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col">
                    <h4 className="text-lg lg:text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm lg:text-base text-zinc-400 flex-grow">
                      {item.desc}
                    </p>
                    
                    {/* Skill tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="skill-tag px-2.5 py-1 text-xs rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 hover:border-violet-500/50 hover:text-white transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          ))}
        </div>
      </div>

      {/* Subtle section dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50" />
    </section>
  );
}