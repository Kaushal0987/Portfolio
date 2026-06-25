export type ProjectCategory = "simple" | "cms" | "fullstack";

export type Service = {
  title: string;
  description: string;
  icon: "globe" | "layout" | "layers";
};

export type Project = {
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const site = {
  name: "Kaushal Joshi",
  tagline: "Freelance Web Developer",
  location: "Kathmandu, Nepal",
  timezone: "GMT+5:45",
  heroHeadline:
    "BCA student & dev intern building websites, APIs, and secure fullstack apps from Nepal. Freelancing on the side — landing pages to production-ready platforms.",
  bio: "Final-year BCA student at Nepal Mega College and software development intern at Nuptse Technology. I ship clean, reliable web products — from static sites to Laravel and Next.js fullstack apps with real auth, databases, and security baked in.",
  aboutDetail:
    "Stack leans JavaScript and TypeScript on the frontend with Next.js and React, PHP and Laravel on the backend, plus Python for tooling. Databases are mostly PostgreSQL and MySQL. I care about responsive UI, readable code, and systems that don't break under real use.",
  whatIBuild: [
    "Business landing pages and portfolio sites",
    "CMS-backed websites with admin panels",
    "Fullstack web apps with REST APIs and auth",
    "Security-focused platforms with encryption & MFA",
  ],
  interests: [
    "Web Dev",
    "Cybersecurity",
    "Open Source",
    "Music",
    "Gaming",
    "Learning",
  ],
  email: "kaushaljoshi0987@gmail.com",
  social: {
    linkedin: "",
    github: "https://github.com/Kaushal0987",
    whatsapp: "https://wa.me/9779742388025",
  },
  experience: [
    {
      role: "Software Development Intern",
      company: "Nuptse Technology Pvt. Ltd.",
      period: "Dec 2025 — Present",
      bullets: [
        "Develop and maintain web application features across frontend and backend",
        "Write test cases, debug issues, and document fixes for production modules",
        "Assist with deployments, code reviews, and REST API documentation",
      ],
    },
  ] satisfies Experience[],
  services: [
    {
      title: "Simple Websites",
      description:
        "Fast static sites and landing pages with HTML, CSS, and JavaScript — optimized for mobile, SEO, and quick turnaround.",
      icon: "globe",
    },
    {
      title: "CMS Websites",
      description:
        "Content-managed sites with admin panels so you can update pages and media without touching code. Built with Laravel or Django.",
      icon: "layout",
    },
    {
      title: "Fullstack Applications",
      description:
        "End-to-end web apps with modern frontends, REST APIs, authentication, and database integration using Next.js, Laravel, and more.",
      icon: "layers",
    },
  ] satisfies Service[],
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "React"],
    backend: ["PHP", "Laravel", "Python", "Django"],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  projects: [
    {
      title: "To-Do WebApp",
      description:
        "Full-stack task manager with a Next.js 15 frontend and Laravel 12 API — user auth via Sanctum, CRUD for tasks, and status tracking (ongoing, due, complete).",
      category: "fullstack",
      tags: ["Next.js", "Laravel", "PostgreSQL"],
      githubUrl: "https://github.com/Kaushal0987/To-Do-WebApp",
    },
    {
      title: "Online Food Ordering System",
      description:
        "Full-stack e-commerce platform for restaurants with menu management, order processing, and a customer checkout flow.",
      category: "fullstack",
      tags: ["PHP", "MySQL"],
      githubUrl: "https://github.com/Kaushal0987/Online_Food_Ordering_System",
    },
    {
      title: "Safeware",
      description:
        "Desktop endpoint security app with YARA-based malware scanning, real-time folder monitoring, and live system metrics (CPU, RAM, disk, network).",
      category: "fullstack",
      tags: ["Python", "Tkinter", "YARA"],
      githubUrl: "https://github.com/Kaushal0987/safeware",
    },
    {
      title: "Laravel CMS",
      description:
        "Laravel + MySQL + Filament CMS starter for blog posts and static pages — public site with an admin panel at /admin for content management.",
      category: "cms",
      tags: ["PHP", "Laravel", "MySQL", "Filament"],
      githubUrl: "https://github.com/Kaushal0987/laravel-cms",
    },
  ] as Project[],
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
};
