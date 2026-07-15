import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, Copy, Check } from "lucide-react";
import { profile } from "../lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="font-mono text-sm text-cyan-400">05.</span>
          <span className="font-mono text-sm uppercase tracking-widest text-white/40">Contact</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Let's build something{" "}
              <span className="text-gradient">extraordinary.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/55">
              Open to internships, freelance projects and collaborations. Whether it's a full-stack app,
              an API or an AI-powered experience. I'd love to hear about it.
            </p>

            <div className="mt-8 space-y-3">
              <button
                onClick={copyEmail}
                className="flex w-full items-center gap-3 rounded-2xl glass p-4 text-left hover-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
                  <Mail size={18} />
                </span>
                <div className="flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-white/40">Email</div>
                  <div className="text-sm font-medium text-white/90">haksenadhimandina123@gmail.com</div>

                </div>
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-white/40" />}
              </button>

              <div className="flex w-full items-center gap-3 rounded-2xl glass p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
                  <MapPin size={18} />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40">Location</div>
                  <div className="text-sm font-medium text-white/90">{profile.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl glass p-4 hover-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
                    <Github size={18} />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/40">GitHub</div>
                    <div className="text-sm font-medium text-white/90">SenadhiMandina</div>
                  </div>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl glass p-4 hover-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
                    <Linkedin size={18} />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/40">LinkedIn</div>
                    <div className="text-sm font-medium text-white/90">SenadhiMandina</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="gradient-border space-y-4 p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">// send a message</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/50">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-cyan-400/50 focus:bg-white/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/50">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-cyan-400/50 focus:bg-white/10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, role, or idea..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-cyan-400/50 focus:bg-white/10"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-6 py-3.5 font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              {sent ? (
                <>
                  <Check size={18} /> Opening your mail app...
                </>
              ) : (
                <>
                  <Send size={18} /> Send message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
