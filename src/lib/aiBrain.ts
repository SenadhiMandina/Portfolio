// ============================================================
//  "NEXUS" — A lightweight rule-based AI assistant brain.
//  It pattern-matches visitor questions about Senadhi and
//  returns natural, on-brand responses. No external API.
// ============================================================

import { profile, projects, skills } from "./data";

export type AIMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  time: number;
};

const lower = (s: string) => s.toLowerCase().trim();

const projectByName = (q: string) =>
  projects.find((p) => q.includes(p.title.toLowerCase()));

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Suggested prompt chips shown in the assistant
export const suggestedPrompts = [
  "Who is Senadhi?",
  "What are your skills?",
  "Show me your projects",
  "How can I contact you?",
  "What is PerformEdge?",
];

export function generateAIResponse(rawInput: string): string {
  const q = lower(rawInput);

  // Greetings
  if (/\b(hi|hello|hey|yo|greetings|sup)\b/.test(q)) {
    return pick([
      `Hey there! 👋 I'm NEXUS, Senadhi's AI assistant. Ask me about his skills, projects, or how to get in touch!`,
      `Hello! 🤖 I can tell you all about Senadhi Mandina — his work, his stack, or his projects. What would you like to know?`,
    ]);
  }

  // Who is Senadhi / about
  if (q.includes("who is") || q.includes("about") || q.includes("tell me about") || q.includes("senadhi") || q.includes("introduce")) {
    return `${profile.name} is a ${profile.role} and ${profile.subRole} based in ${profile.location}. He's studying at ${profile.education} and builds software across React, Python, FastAPI, Java & MySQL. His passion? Bringing AI-powered experiences into everything he ships. 🚀`;
  }

  // Skills
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("what do you use") || q.includes("tools")) {
    const top = [...skills].sort((a, b) => b.level - a.level).slice(0, 5).map((s) => `${s.icon} ${s.name} (${s.level}%)`).join(", ");
    return `Senadhi's core stack spans frontend, backend and data. His strongest skills right now: ${top}. He's fluent in React, Python, Java, FastAPI & MySQL. ⚡`;
  }

  // Projects
  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("build") || q.includes("show me")) {
    const featured = projects.filter((p) => p.featured).map((p) => `• ${p.title} — ${p.tagline}`).join("\n");
    return `Here are Senadhi's featured projects:\n${featured}\n\nWant details on any specific one? Just ask! 🛠️`;
  }

  // Specific project lookup
  const found = projectByName(q);
  if (found) {
    return `${found.icon} ${found.title} — ${found.tagline}.\n${found.description}\n\nBuilt with: ${found.tech.join(", ")}.`;
  }

  // PerformEdge specific (common question)
  if (q.includes("performedge") || q.includes("hr") || q.includes("analytics")) {
    const pe = projects.find((p) => p.title === "PerformEdge")!;
    return `📊 ${pe.title} is Senadhi's flagship SDGP project — an AI-driven HR analytics dashboard for employee management, attendance tracking, and performance analysis. It was approved and showcased on SDGP.lk!`;
  }

  // Contact
  if (q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("hire") || q.includes("connect") || q.includes("linkedin") || q.includes("github")) {
    return `Let's connect! 📬\n• GitHub: github.com/SenadhiMandina\n• LinkedIn: linkedin.com/in/senadhi-mandina\n• Email: ${profile.email}\n\nHe's open to internships, collaborations, and interesting projects!`;
  }

  // Experience / journey
  if (q.includes("experience") || q.includes("journey") || q.includes("education") || q.includes("study") || q.includes("degree") || q.includes("university")) {
    return `Senadhi is pursuing his BSc (Hons) in Computer Science at ${profile.education} in ${profile.location}. Along the way he's shipped 10+ projects — from full-stack web apps and REST APIs to Python data tools. Check the Journey section for the full timeline! 🎓`;
  }

  // Location
  if (q.includes("where") || q.includes("location") || q.includes("based") || q.includes("live")) {
    return `Senadhi is based in ${profile.location} 🇱🇰 — but he collaborates remotely and is open to opportunities worldwide!`;
  }

  // AI / why AI theme
  if (q.includes("ai") || q.includes("artificial intelligence") || q.includes("machine learning") || q.includes("ml")) {
    return `Senadhi is fascinated by AI — not just using it, but weaving intelligent features into products. This very portfolio is AI-themed, and he's actively exploring how AI can make software smarter and more human. 🧠✨`;
  }

  // Availability
  if (q.includes("available") || q.includes("open") || q.includes("freelance") || q.includes("intern")) {
    return `Yes! Senadhi is open to internships, freelance work, and collaborations. The fastest way to reach him is via LinkedIn or email — both linked in the Contact section. 🤝`;
  }

  // Thanks
  if (q.includes("thank") || q.includes("thanks") || q.includes("cool") || q.includes("awesome") || q.includes("nice")) {
    return pick([
      `You're welcome! 😊 Anything else you'd like to know about Senadhi?`,
      `Glad I could help! 🤖 Feel free to explore the projects section too.`,
    ]);
  }

  // Bye
  if (q.includes("bye") || q.includes("goodbye") || q.includes("see you")) {
    return `Thanks for visiting Senadhi's portfolio! 🚀 Don't forget to connect on LinkedIn or GitHub. See you around!`;
  }

  // Fallback
  return pick([
    `Great question! I'm a focused assistant for Senadhi's portfolio. Try asking about his skills, projects, experience, or how to contact him. 💡`,
    `I can help with that! Ask me about Senadhi's projects, his tech stack, his journey, or how to reach him. 🤖`,
    `Hmm, I'm tuned to answer questions about Senadhi Mandina — his work, skills, projects and contact info. Give one of those a try! ✨`,
  ]);
}
