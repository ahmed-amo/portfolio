"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "amokrane.ahmed10@gmail.com",
    href: "mailto:amokrane.ahmed10@gmail.com",
    color: "#8b5cf6",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Constantine, Algeria",
    href: null,
    color: "#06b6d4",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/ahmed-amo",
    href: "https://github.com/ahmed-amo",
    color: "#ffffff",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/ahmed-amokrane-95122334b/",
    color: "#0077b5",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // EmailJS credentials
  const EMAILJS_SERVICE_ID = "service_ewlbkvc";
  const EMAILJS_TEMPLATE_ID = "template_ulgvny1";
  const EMAILJS_PUBLIC_KEY = "Yt40-coOAgSuP14Ny";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate on scroll
      gsap.fromTo(".contact-left > *",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(".contact-right",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation for decorative elements
      gsap.to(".float-element", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-[#030305] py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="float-element absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="float-element absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Large background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden">
          <span className="text-[15vw] font-black text-white/[0.02] tracking-tighter whitespace-nowrap">
            CONTACT
          </span>
        </div>
      </div>

      {/* Section indicator - hidden on mobile */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 hidden sm:flex items-center gap-4">
        <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800">
          05
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Section</span>
          <span className="text-sm text-zinc-400 font-medium">Contact</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          
          {/* Left side - Info */}
          <div className="contact-left space-y-10">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-violet-500 to-transparent" />
                <span className="text-xs sm:text-sm text-violet-400 uppercase tracking-widest">Get In Touch</span>
              </div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6">
                Let&apos;s Work
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  Together
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed">
                Have a project in mind? I&apos;d love to hear about it. 
                Let&apos;s discuss how we can bring your ideas to life.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid gap-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href || undefined}
                  className={`group relative flex items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800/50 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/30 ${
                    item.href ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)`,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-white font-medium truncate">{item.value}</p>
                  </div>

                  {/* Arrow for links */}
                  {item.href && (
                    <svg 
                      className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}

                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 0% 50%, ${item.color}10 0%, transparent 50%)`,
                    }}
                  />
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-sm font-medium">Available for new projects</span>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="contact-right">
            <div className="relative p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              {/* Form header */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">Send a Message</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">Fill out the form below and I&apos;ll get back to you soon.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400 font-medium">Name</label>
                    <div className={`relative rounded-xl transition-all duration-300 ${
                      focusedField === "name" ? "ring-2 ring-violet-500/50" : ""
                    }`}>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400 font-medium">Email</label>
                    <div className={`relative rounded-xl transition-all duration-300 ${
                      focusedField === "email" ? "ring-2 ring-violet-500/50" : ""
                    }`}>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 font-medium">Subject</label>
                  <div className={`relative rounded-xl transition-all duration-300 ${
                    focusedField === "subject" ? "ring-2 ring-violet-500/50" : ""
                  }`}>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      placeholder="Project inquiry"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 font-medium">Message</label>
                  <div className={`relative rounded-xl transition-all duration-300 ${
                    focusedField === "message" ? "ring-2 ring-violet-500/50" : ""
                  }`}>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-emerald-400 text-sm font-medium">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-400 text-sm font-medium">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}
              </form>

              {/* Decorative corner */}
              <div className="absolute -top-px -right-px w-20 h-20 overflow-hidden rounded-tr-3xl">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-500/20 to-transparent" />
              </div>
              <div className="absolute -bottom-px -left-px w-20 h-20 overflow-hidden rounded-bl-3xl">
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-20 text-center">
          <p className="text-zinc-600 text-sm mb-4">Prefer a quick chat?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a 
              href="https://github.com/ahmed-amo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/ahmed-amokrane-95122334b/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
