import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Sparkles } from "lucide-react";
import { navLinks, profile } from "../lib/data";
import profilePhoto from "../assets/profile-photo.webp";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navLinks.map((l) => l.href);
      for (const id of sections) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
          <a
            href="#home"
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
              scrolled ? "glass-strong" : ""
            }`}
          >
            <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.3)]">
              <img
                src={profilePhoto}
                alt="Senadhi Mandina"
                className="h-full w-full object-cover object-[center_24%]"
              />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-wide text-white/90 sm:block">
              Senadhi<span className="text-gradient">.dev</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 rounded-full glass-strong px-2 py-1.5 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === link.href
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-500/30 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full glass text-white/70 transition-all hover:scale-110 hover:text-cyan-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full glass text-white/70 transition-all hover:scale-110 hover:text-cyan-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 sm:flex"
            >
              <Sparkles size={15} />
              Let's talk
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full glass text-white md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between p-5">
              <span className="font-display font-semibold text-white">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full glass text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl glass px-5 py-4 font-display text-lg font-medium text-white/80 hover:text-cyan-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-4 font-semibold text-black"
              >
                <Github size={18} /> GitHub
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
