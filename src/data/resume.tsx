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
  Brain,
  Eye,
  Target,
  Binary,
  Table,
  ScanText,
  Zap,
  Sparkles,
  Database,
  Flame,
  Layers,
  HardDrive,
  GitBranch,
  Terminal,
  Layout,
  Cloud,
  Boxes,
} from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Ashitosh Lavhate",
  initials: "AL",
  url: "https://ashitoshlavhate.dev",
  location: "Pune, India",
  locationLink: "https://www.google.com/maps/place/Pune,+Maharashtra",
  description:
    "Computer Science Undergraduate — Applied AI, Backend Systems & Automation",
  summary:
    "I am a Computer Science undergraduate based in Pune, India, passionate about building scalable backend architectures, high-performance APIs, and applied AI systems. My experience ranges from architecting REST APIs, database query optimization with PostgreSQL and Redis, to integrating computer vision and LLMs for production-ready solutions.\n\nCurrently, I lead engineering as CTO at E-Vakili and foster AI adoption on campus as a Google Student Ambassador (Ping). I enjoy tackling complex systems challenges and building tools that developers and users love.",
  avatarUrl: "/ashitosh.jpeg",
  skills: [
    {
      category: "Languages",
      skills: [
        { name: "Python", icon: Python },
        { name: "TypeScript", icon: Typescript },
        { name: "JavaScript", icon: Code2 },
        { name: "Java", icon: Java },
        { name: "C", icon: Csharp },
        { name: "C++", icon: Csharp },
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
        { name: "Framer Motion", icon: Icons.framermotion },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: Nodejs },
        { name: "Express.js", icon: Server },
        { name: "Django", icon: Server },
        { name: "Flask", icon: Server },
        { name: "REST APIs", icon: Server },
        { name: "JWT Authentication", icon: ShieldCheck },
        { name: "Socket.IO", icon: Radio },
      ],
    },
    {
      category: "AI / Machine Learning",
      skills: [
        { name: "ResNet50", icon: Brain },
        { name: "PaDiM", icon: Eye },
        { name: "OpenCV", icon: Eye },
        { name: "YOLOv8", icon: Target },
        { name: "NumPy", icon: Binary },
        { name: "Pandas", icon: Table },
        { name: "OCR", icon: ScanText },
        { name: "Groq API", icon: Zap },
        { name: "Gemini API", icon: Sparkles },
      ],
    },
    {
      category: "Databases & Infrastructure",
      skills: [
        { name: "PostgreSQL", icon: Postgresql },
        { name: "MySQL", icon: Database },
        { name: "MongoDB", icon: Database },
        { name: "SQLite", icon: Database },
        { name: "Firebase", icon: Flame },
        { name: "Supabase", icon: Database },
        { name: "Prisma ORM", icon: Layers },
        { name: "Redis", icon: HardDrive },
      ],
    },
    {
      category: "Tools & Platforms",
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "GitHub", icon: Icons.github },
        { name: "Docker", icon: Docker },
        { name: "Linux", icon: Terminal },
        { name: "Figma", icon: Layout },
        { name: "Vercel", icon: Cloud },
        { name: "Railway", icon: Cloud },
        { name: "Render", icon: Cloud },
        { name: "Cloudflare R2", icon: Cloud },
        { name: "BullMQ", icon: Boxes },
      ],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "ashitoshlavhate2@gmail.com",
    tel: "",
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
      email: {
        name: "Send Email",
        url: "mailto:ashitoshlavhate2@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "E-Vakili",
      href: "#",
      badges: [],
      location: "Pune, India",
      title: "Chief Technology Officer (CTO)",
      logoUrl: "",
      start: "December 2025",
      end: "Present",
      description:
        "Leading product architecture and engineering decisions. Designing scalable APIs, infrastructure, and backend systems. Optimizing database architecture and backend performance through indexing and multithreading to significantly reduce server load.",
    },
    {
      company: "Google Student Ambassador (Ping)",
      href: "https://developers.google.com",
      badges: [],
      location: "Pune, India",
      title: "Student Ambassador",
      logoUrl: "/google.svg",
      start: "June 2026",
      end: "Present",
      description:
        "Organizing AI workshops, hackathons, and technical events across campus. Promoting Google Gemini and Google AI technologies, collaborating with Google and the Ping Network to grow student developer communities and adoption.",
    },
    {
      company: "Erfinden",
      href: "#",
      badges: [],
      location: "Pune, India",
      title: "Full Stack Developer Intern",
      logoUrl: "",
      start: "June 2026",
      end: "Present",
      description:
        "Designing REST APIs, authentication systems, and scalable backend services. Building responsive React interfaces with reusable component architectures and real-time functionality across cross-functional teams.",
    },
    {
      company: "Admatix",
      href: "#",
      badges: [],
      location: "Pune, India",
      title: "Backend Developer Intern",
      logoUrl: "",
      start: "March 2026",
      end: "May 2026",
      description:
        "Designed and implemented scalable production REST APIs with JWT/session authentication and Role-Based Access Control (RBAC). Integrated secure third-party payment gateways and improved database query performance through structured indexing.",
    },
  ],
  education: [
    {
      school: "DES Pune University",
      href: "https://despu.edu.in",
      degree: "B.Tech — Computer Science Engineering (CGPA: 8.6)",
      logoUrl: "",
      start: "July 2024",
      end: "June 2028",
      location: "Pune, India",
    },
    {
      school: "KV AFS",
      href: "#",
      degree: "CBSE — Class XII (76.4%)",
      logoUrl: "",
      start: "April 2023",
      end: "June 2024",
      location: "Pune, India",
    },
  ],
  projects: [
    {
      title: "DoOrDue",
      href: "https://github.com/ashitoshh01",
      dates: "2025 - Present",
      active: true,
      description:
        "A psychology-driven productivity platform where users stake money on task completion. Features secure authentication, real-time task management, and user accountability mechanisms. Reached 180+ active users.",
      technologies: [
        "React",
        "Firebase",
        "JavaScript",
        "Tailwind CSS",
        "Authentication",
        "Realtime DB",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ashitoshh01",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/doordue.jpg",
      video: "",
    },
    {
      title: "DES Unified Platform",
      href: "https://github.com/ashitoshh01",
      dates: "2024 - 2025",
      active: true,
      description:
        "An all-in-one university campus ecosystem designed for DES Pune University. Brings together real-time messaging, academic discussion forums, project collaboration, study resource repositories, analytical dashboards, and campus marketplace functionality.",
      technologies: [
        "Next.js",
        "Express.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Redis",
        "Socket.IO",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ashitoshh01",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/des-platform.jpg",
      video: "",
    },
    {
      title: "FlowLens",
      href: "https://github.com/ashitoshh01",
      dates: "2025",
      active: true,
      description:
        "A developer debugging CLI that streams live Next.js UI interactions directly into an interactive terminal dashboard. Features click tracking, navigation monitoring, form submission tracking, component hierarchy visualization, and low-latency WebSocket communication.",
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
          href: "https://github.com/ashitoshh01",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/flowlens.jpg",
      video: "",
    },
    {
      title: "AI Visual Inspection SaaS",
      href: "https://github.com/ashitoshh01",
      dates: "2025",
      active: true,
      description:
        "An AI-powered manufacturing quality inspection platform leveraging ResNet50 feature extraction and PaDiM anomaly detection to identify surface defects. Generates CPU-based anomaly heatmaps and uses the Groq API to produce contextual inspection reports with actionable recommendations.",
      technologies: [
        "Python",
        "Flask",
        "React",
        "ResNet50",
        "PaDiM",
        "OpenCV",
        "Groq API",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ashitoshh01",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/ai-inspection.jpg",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Ignitia — MIT-WPU",
      dates: "2026",
      location: "MIT-WPU, Pune",
      win: "4th Place",
      description:
        "Ranked 4th among 270+ teams at a national-level hackathon.",
      image: "",
      links: [],
    },
    {
      title: "Navonmesh — IMCC",
      dates: "2026",
      location: "IMCC, Pune",
      win: "5th Place",
      description:
        "Delivered a competitive technical solution evaluated by an industry panel.",
      image: "",
      links: [],
    },
    {
      title: "InnoQuest — IEEE",
      dates: "2025",
      location: "Pune, India",
      win: "2nd Runner-Up",
      description:
        "Recognized for rapid prototyping and cross-functional collaboration.",
      image: "",
      links: [],
    },
    {
      title: "Smart India Hackathon",
      dates: "2025",
      location: "Pune, India",
      win: "Internal Qualifier",
      description:
        "Selected among approximately 150 teams to represent the college.",
      image: "",
      links: [],
    },
  ],
} as const;
