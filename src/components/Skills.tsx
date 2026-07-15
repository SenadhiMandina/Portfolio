import { motion } from "framer-motion";
import { skills } from "../lib/data";

const categories = ["Frontend", "Backend", "Languages", "Tools"] as const;

const catMeta: Record<string, { color: string; ring: string; label: string }> = {
  Frontend: { color: "from-cyan-400 to-sky-500", ring: "ring-cyan-400/30", label: "Frontend" },
  Backend: { color: "from-violet-400 to-fuchsia-500", ring: "ring-violet-400/30", label: "Backend" },
  Languages: { color: "from-amber-400 to-orange-500", ring: "ring-amber-400/30", label: "Languages" },
  Tools: { color: "from-emerald-400 to-teal-500", ring: "ring-emerald-400/30", label: "Tools" },
};

function SkillBar({ skill, index }: { skill: (typeof skills)[number]; index: number }) {
  const meta = catMeta[skill.category];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-white/80">
          <span className="text-base">{skill.icon}</span>
          {skill.name}
        </span>
        <span className="font-mono text-xs text-white/40">{skill.level}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: index * 0.05 + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${meta.color}`}
        />
        <div
          className={`absolute inset-0 rounded-full opacity-0 ring-1 transition-opacity group-hover:opacity-100 ${meta.ring}`}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* glow accents */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="font-mono text-sm text-cyan-400">02.</span>
          <span className="font-mono text-sm uppercase tracking-widest text-white/40">Skills</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          A versatile toolkit for{" "}
          <span className="text-gradient">building the future.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 max-w-2xl text-white/55"
        >
          Fluent across the stack from pixel-perfect React interfaces to robust APIs and data pipelines.
        </motion.p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {categories.map((cat, ci) => {
            const meta = catMeta[cat];
            const items = skills.filter((s) => s.category === cat);
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: ci * 0.1 }}
                className="gradient-border p-6 sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-white">{meta.label}</h3>
                  <span
                    className={`rounded-full bg-gradient-to-r ${meta.color} px-3 py-0.5 text-[11px] font-bold text-black`}
                  >
                    {items.length} skills
                  </span>
                </div>
                <div className="space-y-4">
                  {items.map((s, i) => (
                    <SkillBar key={s.name} skill={s} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech marquee */}
        <div className="relative mt-12 overflow-hidden rounded-2xl glass py-4">
          <div className="flex w-max animate-marquee gap-8">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex shrink-0 gap-8">
                {["React", "Python", "FastAPI", "Java", "MySQL", "JavaScript", "JAX-RS", "Tailwind", "Git", "Figma", "Tkinter", "REST"].map((t) => (
                  <span
                    key={t + dup}
                    className="flex items-center gap-2 font-display text-lg font-medium text-white/30"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
