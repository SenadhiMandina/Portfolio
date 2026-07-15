// ============================================================
//  Senadhi Mandina — Portfolio Data Layer
//  Sourced from GitHub (github.com/SenadhiMandina) & LinkedIn
// ============================================================

export const profile = {
  name: "Senadhi Mandina",
  firstName: "Senadhi",
  role: "Computer Science Undergraduate",
  subRole: "Aspiring Software Engineer",
  tagline: "I build intelligent, human centered software at the intersection of code and curiosity.",
  location: "Colombo, Sri Lanka",
  education: "Informatics Institute of Technology (IIT)",
  email: "haksenadhimandina123@gmail.com",
  bio: "I'm a Computer Science undergraduate and aspiring software engineer who loves turning complex problems into elegant, scalable solutions. From crafting responsive React interfaces to designing REST APIs in Java and Python, I'm obsessed with the craft of building software that feels alive. My current obsession? Bringing AI-powered experiences into everything I ship.",
  longBio:
    "I'm currently pursuing my degree in Computer Science at the Informatics Institute of Technology. Along the way I've shipped full-stack web apps, REST APIs, data visualizers and even a few games, each one teaching me something new about clean architecture, thoughtful UX and the magic of a well placed algorithm. I work fluently across React, Python, FastAPI, Java and MySQL and I'm always exploring how AI can make products smarter, faster and more delightful to use.",
  github: "https://github.com/SenadhiMandina",
  linkedin: "https://www.linkedin.com/in/senadhi-mandina/",
  avatar: "https://avatars.githubusercontent.com/u/232007487?v=4",
  stats: [
    { label: "Projects Shipped", value: 10, suffix: "+" },
    { label: "Languages", value: 5, suffix: "" },
    { label: "GitHub Repos", value: 10, suffix: "" },
    { label: "Years Coding", value: 3, suffix: "+" },
  ],
};

export type Skill = {
  name: string;
  level: number; // 0-100
  category: "Frontend" | "Backend" | "Languages" | "Tools";
  icon: string; // emoji glyph
};

export const skills: Skill[] = [
  { name: "React.js", level: 88, category: "Frontend", icon: "⚛️" },
  { name: "Next.js", level: 90, category: "Frontend", icon: "⏭️" },
  { name: "HTML5", level: 92, category: "Frontend", icon: "🧩" },
  { name: "CSS / Tailwind", level: 84, category: "Frontend", icon: "🎨" },

  { name: "Python", level: 99, category: "Languages", icon: "🐍" },
  { name: "Java", level: 99, category: "Languages", icon: "☕" },
  { name: "JavaScript", level: 85, category: "Languages", icon: "🟨" },
  { name: "TypeScript", level: 85, category: "Languages", icon: "🟦" },


  { name: "FastAPI", level: 90, category: "Backend", icon: "⚡" },
  { name: "MySQL", level: 99, category: "Backend", icon: "🗄️" },
  { name: "REST / JAX-RS", level: 80, category: "Backend", icon: "🔗" },

  { name: "Git & GitHub", level: 99, category: "Tools", icon: "🔧" },
  { name: "Figma / UI-UX", level: 75, category: "Tools", icon: "🖌️" },
  { name: "Tkinter", level: 72, category: "Tools", icon: "🖥️" },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: string;
  year: string;
  featured: boolean;
  link: string;
  accent: string; // gradient classes
  icon: string; // emoji
  highlights: string[];
};

export const projects: Project[] = [
  {
    title: "PerformEdge",
    tagline: "AI-Driven HR Analytics Dashboard",
    description:
      "An SDGP approved web platform for HR data analytics employee management, attendance tracking and performance analysis in one intelligent dashboard.",
    longDescription:
      "PerformEdge is my flagship SDGP project: a web based HR data analytics dashboard that transforms raw workforce data into actionable insight. It centralizes employee management, real time attendance tracking and multi dimensional performance analysis behind a clean, role based interface.",
    tech: ["React", "FastAPI", "Python", "MySQL", "Typescript"],
    category: "Full-Stack · SDGP",
    year: "2026",
    featured: true,
    link: "https://github.com/PerformEdge/PerformEdge",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
    icon: "📊",
    highlights: [
      "Real time attendance & performance analytics",
      "Role based access for HR teams",
      "Approved & showcased on SDGP.lk",
    ],
  },
  {
    title: "Smart Campus API",
    tagline: "IoT REST API in Java",
    description:
      "A Smart Campus REST API built with JAX-RS for managing rooms, sensors and sensor readings using in memory data structures.",
    longDescription:
      "A robust REST API engineered with JAX-RS that models a smart campus: rooms, sensors and their readings. It exposes clean endpoints for CRUD operations and sensor data retrieval, backed by efficient in memory data structures, a study in API design and domain modeling.",
    tech: ["Java", "JAX-RS", "REST"],
    category: "Backend / API",
    year: "2026",
    featured: true,
    link: "https://github.com/SenadhiMandina/smart-campus-api",
    accent: "from-violet-400 via-purple-500 to-fuchsia-600",
    icon: "🏛️",
    highlights: [
      "JAX-RS resource design",
      "Rooms, sensors & readings domain model",
      "Clean, documented REST endpoints",
    ],
  },
  {
    title: "Estate Finder",
    tagline: "React Real-Estate Web App",
    description:
      "A client side React estate agent web application for university coursework browse, filter and discover property listings.",
    longDescription:
      "Estate Finder is a fully client side React application that lets users browse, search and filter real estate listings. Built as university coursework, it focuses on component architecture, state management and a smooth, responsive browsing experience.",
    tech: ["React", "JavaScript", "CSS"],
    category: "Frontend",
    year: "2025",
    featured: true,
    link: "https://github.com/SenadhiMandina/Estate-Finder-react-app",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    icon: "🏡",
    highlights: [
      "Component-driven React architecture",
      "Live search & filtering",
      "Deployed via GitHub Pages",
    ],
  },
  {
    title: "Lion Light Website",
    tagline: "Business Web Presence",
    description:
      "A modern, responsive website built for Lion Light Company, showcasing their brand, services and offerings.",
    longDescription:
      "A complete business website for Lion Light Company, crafted to be fast, responsive and visually compelling. It highlights the company's services and brand identity with clean layout, smooth interactions and mobile first design.",
    tech: ["JavaScript", "HTML", "CSS"],
    category: "Web Development",
    year: "2026",
    featured: true,
    link: "https://github.com/SenadhiMandina/lion-light-website",
    accent: "from-amber-400 via-orange-500 to-rose-600",
    icon: "🦁",
    highlights: [
      "Responsive business landing page",
      "Brand-focused visual design",
      "Smooth scroll interactions",
    ],
  },
  {
    title: "Traffic CSV Analyzer",
    tagline: "Python Data Visualization",
    description:
      "A Python project that reads traffic CSV files, processes vehicle data and displays hourly histograms using Tkinter.",
    longDescription:
      "A desktop data tool that ingests traffic CSV files, processes vehicle records and renders interactive hourly histograms through a Tkinter GUI. It's a practical exercise in data parsing, aggregation and visualization and it earned a star on GitHub.",
    tech: ["Python", "Tkinter", "CSV"],
    category: "Data / Desktop",
    year: "2025",
    featured: true,
    link: "https://github.com/SenadhiMandina/Traffic-CSV-Analyzer",
    accent: "from-rose-400 via-pink-500 to-purple-600",
    icon: "🚦",
    highlights: [
      "CSV ingestion & vehicle data parsing",
      "Hourly histogram visualizations",
      "Tkinter desktop GUI",
    ],
  },
  {
    title: "Climate Change Awareness",
    tagline: "Interactive Awareness Web App",
    description:
      "A web application built to raise awareness about climate change multiple pages, interactive elements and responsive design.",
    longDescription:
      "A multi page web application dedicated to climate change awareness. It combines interactive elements, educational content and a fully responsive layout to make environmental data approachable and engaging for a broad audience.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Web Development",
    year: "2025",
    featured: false,
    link: "https://github.com/SenadhiMandina/Climate-Change-Awareness-Web-Application",
    accent: "from-green-400 via-emerald-500 to-teal-600",
    icon: "🌍",
    highlights: [
      "Multi-page responsive layout",
      "Interactive awareness elements",
      "Educational content design",
    ],
  },
];

export type JourneyItem = {
  year: string;
  title: string;
  org: string;
  description: string;
  type: "education" | "project" | "milestone";
};

export const journey: JourneyItem[] = [
  {
    year: "2024 — Now",
    title: "BSc (Hons) Computer Science",
    org: "Informatics Institute of Technology",
    description:
      "Pursuing my undergraduate degree, diving deep into algorithms, software architecture, databases and modern full-stack development.",
    type: "education",
  },
  {
    year: "2026",
    title: "PerformEdge — SDGP Project",
    org: "Software Development Group Project",
    description:
      "Led and contributed to an AI-driven HR analytics dashboard approved and showcased on the SDGP platform.",
    type: "project",
  },
  {
    year: "2026",
    title: "Smart Campus API",
    org: "Java / JAX-RS",
    description:
      "Designed and built a RESTful smart-campus API modeling rooms, sensors and readings with clean JAX-RS resources.",
    type: "project",
  },
  {
    year: "2025",
    title: "Full-Stack Web Projects",
    org: "React · Python · FastAPI",
    description:
      "Shipped Estate Finder, Lion Light and Climate Awareness apps sharpening React architecture and responsive UI craft.",
    type: "milestone",
  },
  {
    year: "2025",
    title: "Python Data Tooling",
    org: "Traffic Analyzer · Flight Routes",
    description:
      "Built data driven Python applications from CSV traffic visualizers to graph based and flight route solvers.",
    type: "project",
  },
];

export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

export const services: ServiceItem[] = [
  {
    title: "Full-Stack Web Apps",
    description:
      "End-to-end applications with React frontends and FastAPI / Java backends — fast, scalable and maintainable.",
    icon: "🚀",
  },
  {
    title: "REST API Design",
    description:
      "Clean, well documented APIs with thoughtful domain modeling, from JAX-RS services to Python frameworks.",
    icon: "🔌",
  },
  {
    title: "Data & Automation",
    description:
      "Python pipelines that ingest, process and visualize data turning raw CSVs into insight.",
    icon: "📈",
  },
  {
    title: "AI-Enhanced UX",
    description:
      "Weaving AI-powered features into products to make them smarter, faster and more delightful.",
    icon: "🧠",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];
