import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../lib/data";

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    setTilt({
      ry: (px - 0.5) * 14,
      rx: -(py - 0.5) * 14,
      gx: px * 100,
      gy: py * 100,
    });
  };
  const reset = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group [perspective:1200px]"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.2s ease-out",
        }}
        className="relative h-full overflow-hidden rounded-3xl glass p-6 [transform-style:preserve-3d]"
      >
        {/* moving glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${tilt.gx}% ${tilt.gy}%, rgba(168,85,247,0.15), transparent 45%)`,
          }}
        />

        <div className="relative [transform:translateZ(40px)]">
          <div className="flex items-start justify-between">
            <div
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${project.accent} text-2xl shadow-lg`}
              style={{ transform: "translateZ(20px)" }}
            >
              {project.icon}
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full glass px-2.5 py-0.5 text-[10px] font-medium text-white/50">
                {project.year}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-300/70">
              {project.category}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-sm font-medium text-gradient-cyan">{project.tagline}</p>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/55">{project.description}</p>

          <ul className="mt-4 space-y-1.5">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-white/50">
                <span className={`mt-1 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r ${project.accent}`} />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/60 ring-1 ring-white/10"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-all hover:gap-2.5"
          >
            View on GitHub
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", "Full-Stack · SDGP", "Backend / API", "Frontend", "Web Development", "Data / Desktop"];
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="font-mono text-sm text-cyan-400">03.</span>
          <span className="font-mono text-sm uppercase tracking-widest text-white/40">Projects</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Things I've{" "}
            <span className="text-gradient">designed, built & shipped.</span>
          </motion.h2>
          <a
            href="https://github.com/SenadhiMandina?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:gap-2.5"
          >
            All repositories
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-black"
                  : "glass text-white/55 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
