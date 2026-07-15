import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Sparkles, MapPin } from "lucide-react";
import { profile } from "../lib/data";
import profilePhoto from "../assets/profile-photo.webp";

const ROLES = [
  "Software Engineer",
  "React Developer",
  "Python Developer",
  "API Architect",
  "AI Enthusiast",
];

function useTypewriter(words: string[], typeSpeed = 90, deleteSpeed = 45, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      {/* Hero image glow layer */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <img
          src="/images/hero-neural.jpg"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050c]/40 via-[#05050c]/70 to-[#05050c]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-[8%] top-[20%] h-72 w-72 animate-float rounded-full bg-cyan-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-[10%] top-[30%] h-80 w-80 animate-float rounded-full bg-violet-600/20 blur-[110px] [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-64 w-64 animate-float rounded-full bg-pink-500/10 blur-[90px] [animation-delay:3s]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Available for internships & collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hi, I'm{" "}
            <span className="text-gradient animate-gradient-pan">Senadhi</span>
            <br />
            Mandina
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 flex items-center gap-3 font-mono text-lg text-white/80 sm:text-xl"
          >
            <span className="text-cyan-400">&gt;</span>
            <span className="text-gradient-cyan font-semibold">{typed}</span>
            <span className="cursor-blink text-cyan-400">▋</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-7 py-3.5 font-semibold text-black transition-transform hover:scale-105"
            >
              <Sparkles size={18} className="transition-transform group-hover:rotate-12" />
              Explore my work
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full glass px-6 py-3.5 font-semibold text-white/80 transition-all hover:scale-105 hover:text-cyan-300"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full glass px-6 py-3.5 font-semibold text-white/80 transition-all hover:scale-105 hover:text-cyan-300"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-7 flex items-center gap-2 text-sm text-white/40"
          >
            <MapPin size={15} className="text-cyan-400" />
            {profile.location}
          </motion.div>
        </div>

        {/* Right: holographic card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="gradient-border hover-lift relative overflow-hidden p-1.5">
            <div className="relative overflow-hidden rounded-[1.1rem]">
              <img
                src={profilePhoto}
                alt="Senadhi Mandina professional portrait"
                className="aspect-[3/4] w-full object-cover object-[center_28%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050c] via-transparent to-transparent" />
              {/* HUD overlay */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full glass-strong px-3 py-1.5 text-[10px] font-mono text-cyan-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                NEURAL.LINK ACTIVE
              </div>
              <div className="absolute right-4 top-4 rounded-full glass-strong px-3 py-1.5 text-[10px] font-mono text-violet-300">
                v2.026
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-300/80">
                  // identity
                </p>
                <p className="font-display text-xl font-bold text-white">{profile.name}</p>
                <p className="text-sm text-white/60">{profile.role}</p>
                <div className="mt-3 flex gap-1.5">
                  {["React", "Python", "FastAPI", "Java", "MySQL"].map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50 ring-1 ring-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rotating ring decoration */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 animate-spin-slow rounded-full border border-dashed border-cyan-400/30" />
          <div className="pointer-events-none absolute -bottom-5 -left-5 h-16 w-16 animate-spin-slow rounded-full border border-dashed border-violet-400/30 [animation-direction:reverse]" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/40 hover:text-cyan-300"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
