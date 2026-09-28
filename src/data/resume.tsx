import { Icons } from "@/components/icons";
import {
  HomeIcon,
  NotebookIcon,
  Code2,
  Globe,
  Palette,
  Server,
  ShieldCheck,
  Radio,
  Binary,
  Database,
  Layers,
  HardDrive,
  GitBranch,
  Terminal,
  Cloud,
  Brain,
  Scan,
  Crosshair,
  Trees,
  Zap,
} from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";
import { Opencv } from "@/components/ui/svgs/opencv";

export const DATA = {
  name: "Ashitosh Lavhate",
  initials: "AL",
  url: "https://ashitoshlavhate.site",
  location: "Pune, Maharashtra, India",
  locationLink: "https://www.google.com/maps/place/Pune,+Maharashtra",
  headline: "Computer Science Undergraduate — Software Engineer",
  description:
    "Building full-stack applications, backend systems, developer tools, and practical software products.",
  summary:
    "I'm a Computer Science undergraduate and software engineer who enjoys turning ideas into working products. My experience spans full-stack applications, backend systems, real-time platforms, and developer tools, with projects built through internships, hackathons, and independent work. I enjoy solving practical problems, learning by building, and taking products from an initial idea to deployment.",
  avatarUrl: "/ashitosh.jpeg",
  skills: [
    {
      category: "Languages",
      skills: [
        { name: "Python", icon: Python },
        { name: "TypeScript", icon: Typescript },
        { name: "JavaScript", icon: Code2 },
        { name: "Java", icon: Java },
        { name: "C++", icon: Binary },
        { name: "C", icon: Code2 },
      ],
    },
    {
      category: "Frontend",
      skills: [
        { name: "React.js", icon: ReactLight },
        { name: "Next.js", icon: NextjsIconDark },
        { name: "HTML5", icon: Globe },
        { name: "CSS3", icon: Palette },
        { name: "Tailwind CSS", icon: Icons.tailwindcss },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: Nodejs },
        { name: "Express.js", icon: Server },
        { name: "Django", icon: Server },
        { name: "Flask", icon: Server },
        { name: "REST APIs", icon: Globe },
        { name: "JWT", icon: ShieldCheck },
        { name: "Socket.IO", icon: Radio },
      ],
    },
    {
      category: "AI/ML",
      skills: [
        { name: "ResNet50", icon: Brain },
        { name: "PaDiM", icon: Scan },
        { name: "OpenCV", icon: Opencv },
        { name: "YOLO", icon: Crosshair },
        { name: "Randomforest", icon: Trees },
        { name: "Groq API", icon: Zap },
      ],
    },
    {
      category: "Databases",
      skills: [
        { name: "PostgreSQL", icon: Postgresql },
        { name: "MySQL", icon: Database },
        { name: "MongoDB", icon: Database },
        { name: "Redis", icon: HardDrive },
        { name: "Prisma", icon: Layers },
      ],
    },
    {
      category: "Tools",
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "GitHub", icon: Icons.github },
        { name: "Docker", icon: Docker },
        { name: "Linux", icon: Terminal },
        { name: "Vercel", icon: Cloud },
        { name: "Render", icon: Cloud },
      ],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "ashitoshlavhate2@gmail.com",
    tel: "+91 9518352166",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/ashitoshh01",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ashitosh01/",
        icon: Icons.linkedin,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "E-Vakili",
      href: "#",
      badges: [],
      location: "Remote / Pune, India",
      title: "Tech Lead",
      logoUrl: "/companies/evakili.png",
      start: "December 2025",
      end: "September 2026",
      description:
        "Built and deployed a full-stack legal platform with 30,000+ lawyer profiles, search, lawyer dashboards, chat, and social features. Integrated a RAG-based support chatbot and deployed the Next.js, Django, and PostgreSQL platform to production.",
    },
    {
      company: "Erfinden — BarterX",
      href: "#",
      badges: [],
      location: "Remote / Pune, India",
      title: "Full Stack Developer Intern",
      logoUrl: "/companies/erfinden.png",
      start: "June 2026",
      end: "August 2026",
      description:
        "Built core features for a product/service barter marketplace, including product scoring, recommendations, real-time chat, and JWT/OAuth2 authentication. Deployed the Next.js, Python, and PostgreSQL application across Vercel and Render.",
    },
    {
      company: "Admatix",
      href: "#",
      badges: [],
      location: "Remote / Pune, India",
      title: "Backend Developer Intern",
      logoUrl: "/companies/admatix.png",
      start: "March 2026",
      end: "May 2026",
      description:
        "Built an admin analytics panel and backend APIs for a WhatsApp automation platform. Integrated Razorpay for three-tier subscriptions, plan-based feature access, upgrades, payment verification, and recurring payments.",
    },
    {
      company: "Google Student Ambassador — Gemini",
      href: "https://developers.google.com",
      badges: [],
      location: "Pune, India",
      title: "Google Student Ambassador",
      logoUrl: "/companies/gemini.png",
      start: "2026",
      end: "2026",
      description:
        "Selected as a Google Student Ambassador, organizing technical workshops, hackathons, and student developer activities while promoting practical AI adoption on campus.",
    },
  ],
  education: [
    {
      school: "DES Pune University",
      href: "https://despu.edu.in",
      degree: "Third Year B.Tech — Computer Science Engineering",
      cgpa: "CGPA: 8.6 / 10",
      logoUrl: "/education/despu.png",
      start: "July 2024",
      end: "May 2028",
      period: "July 2024 – May 2028",
      location: "Pune, Maharashtra",
      reflection:
        "Living the typical engineering life — building things, meeting deadlines, and balancing work, life & CGPA.",
    },
    {
      school: "KV AFS 2",
      href: "",
      degree: "CBSE — Class XII | Computer Science",
      logoUrl: "/education/kv.png",
      start: "",
      end: "2024",
      period: "76.4% · 2024",
      location: "Pune, Maharashtra",
      reflection: "Where the curiosity for technology started.",
    },
  ],
  projects: [
    {
      title: "ReachFirst",
      subtitle: "Real-Time Academic Communication Platform",
      liveUrl: "",
      githubUrl: "https://github.com/ashitoshh01/reachfirst",
      href: "",
      dates: "2025",
      active: true,
      description:
        "Built to automatically route teacher announcements to the relevant classes or divisions, reducing delays in critical college communication. Supports real-time messaging, role-based access, and keyword-based message routing.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Express.js",
        "PostgreSQL",
        "Socket.IO",
        "JWT",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ashitoshh01/reachfirst",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/reachfirst.jpg",
      video: "",
    },
    {
      title: "FlowLens",
      subtitle: "Developer Debugging CLI",
      liveUrl: "",
      githubUrl: "https://github.com/ashitoshh01/Flowlens",
      href: "",
      dates: "2025",
      active: true,
      description:
        "Built a CLI tool that visualizes the runtime flow of Next.js applications, helping developers trace UI interactions, component activity, and navigation in real time. Streams application events to an interactive terminal dashboard using WebSockets.",
      technologies: [
        "TypeScript",
        "Node.js",
        "WebSockets",
        "Next.js",
        "CLI",
        "Developer Tools",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ashitoshh01/Flowlens",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/flowlens.jpg",
      video: "",
    },
    {
      title: "DoOrDue",
      subtitle: "Gamified Anti-Procrastination Platform",
      liveUrl: "",
      githubUrl: "https://github.com/ashitoshh01/do-or-due",
      href: "",
      dates: "2025",
      active: true,
      description:
        "Built around loss aversion, allowing users to stake money on tasks and recover it with rewards after completing them and submitting valid proof. Developed an AI-based proof verification pipeline using OCR, document analysis, and YOLO-based object detection, with streaks and social accountability features.",
      technologies: [
        "React",
        "Firebase",
        "Python",
        "YOLO",
        "OCR",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ashitoshh01/do-or-due",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/doordue.jpg",
      video: "",
    },
    {
      title: "AI Visual Inspection SaaS",
      subtitle: "Manufacturing Quality Inspection",
      liveUrl: "",
      githubUrl: "https://github.com/Suveer-Upasani/MindForge",
      href: "",
      dates: "2025",
      active: true,
      description:
        "Built an automated visual inspection platform using ResNet50 and PaDiM to detect manufacturing defects and generate anomaly heatmaps. Integrated Groq API to produce contextual inspection reports and recommendations.",
      technologies: [
        "Python",
        "Flask",
        "React",
        "ResNet50",
        "PaDiM",
        "Groq API",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Suveer-Upasani/MindForge",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/ai-inspection.jpg",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Google Student Ambassador — Gemini",
      dates: "2026",
      location: "Google / Gemini",
      win: "Top 1,000 Ambassador",
      description:
        "Recognized among the top 1,000 ambassadors from a community of 10,000+ ambassadors for contributions and engagement throughout the program.",
      image: "/hackathons/gemini.png",
      links: [],
    },
    {
      title: "Ignitia — MIT-WPU",
      dates: "2026",
      location: "MIT-WPU, Pune",
      win: "4th Place",
      description:
        "Ranked 4th in a competitive AI hackathon and presented the solution to the organizing panel.",
      image: "/hackathons/mit.png",
      links: [],
    },
    {
      title: "Navonmesh — IMCC",
      dates: "2026",
      location: "IMCC, Pune",
      win: "5th Place",
      description:
        "Placed 5th in the hackathon for developing and presenting a technical solution.",
      image: "/hackathons/imcc.png",
      links: [],
    },
    {
      title: "InnoQuest — IEEE",
      dates: "2025",
      location: "Pune, India",
      win: "2nd Runner-Up",
      description:
        "Recognized for rapid prototyping and collaborative problem solving.",
      image: "/hackathons/ieee.png",
      links: [],
    },
    {
      title: "Smart India Hackathon",
      dates: "2025",
      location: "Pune, India",
      win: "Internal Qualifier",
      description:
        "Selected through the college-level internal selection process to represent the institution.",
      image: "/hackathons/sih.png",
      links: [],
    },
  ],
} as const;
