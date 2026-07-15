import { motion } from "framer-motion";
import { GraduationCap, FolderGit2, Sparkles } from "lucide-react";
import { journey } from "../lib/data";

const typeIcon = {
  education: GraduationCap,
  project: FolderGit2,
  milestone: Sparkles,
} as const;

const typeColor = {
  education: "from-cyan-400 to-sky-500",
  project: "from-violet-400 to-fuchsia-500",
  milestone: "from-amber-400 to-orange-500",
} as const;

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="font-mono text-sm text-cyan-400">04.</span>
          <span className="font-mono text-sm uppercase tracking-widest text-white/40">Journey</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          The road so <span className="text-gradient">far.</span>
        </motion.h2>

        <div className="relative mt-14 pl-8 sm:pl-0">
          {/* vertical line */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10">
            {journey.map((item, i) => {
              const Icon = typeIcon[item.type];
              const color = typeColor[item.type];
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={item.title + i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative sm:flex sm:items-center ${
                    left ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* node dot */}
                  <div
                    className={`absolute -left-[29px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br ${color} ring-4 ring-[#05050c] sm:left-1/2 sm:-translate-x-1/2`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  {/* card */}
                  <div className={`sm:w-1/2 ${left ? "sm:pr-12" : "sm:pl-12"}`}>
                    <div className="gradient-border hover-lift p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${color} px-2.5 py-0.5 text-[10px] font-bold text-black`}
                        >
                          <Icon size={11} />
                          {item.type}
                        </span>
                        <span className="font-mono text-xs text-white/40">{item.year}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm font-medium text-cyan-300/80">{item.org}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
