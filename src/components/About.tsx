import { motion } from "framer-motion";
import { GraduationCap, Code2, Cpu, Heart } from "lucide-react";
import { profile, services } from "../lib/data";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl font-bold text-white sm:text-4xl">
        <span className="text-gradient">{value}</span>
        {suffix && <span className="text-gradient">{suffix}</span>}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="font-mono text-sm text-cyan-400">01.</span>
          <span className="font-mono text-sm uppercase tracking-widest text-white/40">About</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left: narrative */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Turning complex problems into{" "}
              <span className="text-gradient">elegant, living software.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
              {profile.bio}
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              {profile.longBio}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: GraduationCap, label: "Education", value: "BSc Computer Science" },
                { icon: Code2, label: "Focus", value: "Full-Stack & APIs" },
                { icon: Cpu, label: "AI Mindset", value: "Smart, human-centered UX" },
                { icon: Heart, label: "Open to", value: "Internships & collabs" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-2xl glass p-4 hover-lift"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/40">{item.label}</div>
                    <div className="text-sm font-medium text-white/90">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: stats + services */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <div className="gradient-border p-6">
              <p className="mb-5 font-mono text-xs uppercase tracking-widest text-cyan-400">
                // by the numbers
              </p>
              <div className="grid grid-cols-2 gap-6">
                {profile.stats.map((s) => (
                  <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((srv, i) => (
                <motion.div
                  key={srv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl glass p-5 hover-lift"
                >
                  <span className="text-2xl">{srv.icon}</span>
                  <h3 className="mt-2 font-display text-sm font-semibold text-white">{srv.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">{srv.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
