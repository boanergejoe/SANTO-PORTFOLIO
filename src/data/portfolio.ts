import {
  Atom,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Cloud,
  CodeXml,
  Cpu,
  Crown,
  Database,
  Earth,
  Globe,
  GraduationCap,
  HeartHandshake,
  Layers,
  Lightbulb,
  Palette,
  PanelsTopLeft,
  Server,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import reactIcon from "../assets/icons/react.svg";
import nextjsIcon from "../assets/icons/nextjs.svg";
import typescriptIcon from "../assets/icons/typescript.svg";
import nodejsIcon from "../assets/icons/nodejs.svg";
import graphqlIcon from "../assets/icons/graphql.svg";
import tailwindIcon from "../assets/icons/tailwindcss.svg";
import framerMotionIcon from "../assets/icons/framermotion.svg";
import mongodbIcon from "../assets/icons/mongodb.svg";
import postgresqlIcon from "../assets/icons/postgresql.svg";
import awsIcon from "../assets/icons/aws.svg";
import dockerIcon from "../assets/icons/docker.svg";
import kubernetesIcon from "../assets/icons/kubernetes.svg";
import redisIcon from "../assets/icons/redis.svg";
import figmaIcon from "../assets/icons/figma.svg";
import reduxIcon from "../assets/icons/redux.svg";

import projectOne from "../assets/projects/project-01.jpg";
import projectTwo from "../assets/projects/project-02.jpg";
import projectThree from "../assets/projects/project-03.jpg";
import projectFour from "../assets/projects/project-04.jpg";

import santoPortrait from "../assets/avatars/santo.jpg";
import justinAvatar from "../assets/avatars/Justin.jpg";
import ezabellaAvatar from "../assets/avatars/Ezabella.jpg";
import hassanAvatar from "../assets/avatars/Hassan.jpg";
import siteProfile from "./site.json";

export const site = {
  ...siteProfile,
  portrait: santoPortrait,
};

export const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Career", href: "#career" },
  { name: "Projects", href: "#projects" },
];

export const footerLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Career", href: "#career" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export const techStack = [
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextjsIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "Node.js", icon: nodejsIcon },
  { name: "GraphQL", icon: graphqlIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Framer Motion", icon: framerMotionIcon },
  { name: "MongoDB", icon: mongodbIcon },
  { name: "PostgreSQL", icon: postgresqlIcon },
  { name: "AWS", icon: awsIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "Kubernetes", icon: kubernetesIcon },
  { name: "Redis", icon: redisIcon },
  { name: "Figma", icon: figmaIcon },
  { name: "Redux", icon: reduxIcon },
];

export const heroStats = [
  {
    icon: PanelsTopLeft,
    label: "Years Experience",
    value: "10+",
  },
  {
    icon: CodeXml,
    label: "Projects Completed",
    value: "150+",
  },
  {
    icon: Users,
    label: "Happy Clients",
    value: "50+",
  },
  {
    icon: Earth,
    label: "Global Brands",
    value: "12",
  },
];

export const services: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: CodeXml,
    title: "Full-Stack Development",
    description:
      "End-to-end web applications built with modern frameworks and highly scalable backend architectures.",
  },
  {
    icon: Palette,
    title: "UI/UX Architecture",
    description:
      "Designing intuitive, accessible, and stunning interfaces that prioritize user experience and conversion.",
  },
  {
    icon: Cpu,
    title: "Performance Optimization",
    description:
      "Auditing and supercharging existing codebases for lighting-fast load times and seamless interactions.",
  },
  {
    icon: Layers,
    title: "Systems Architecture",
    description:
      "Designing complex microservices, API integrations, and robust database models for enterprise needs.",
  },
];

export const projects = [
  {
    id: 1,
    title: "AI-Powered Design Platform",
    subtitle: "Generative assets and automated scaling for e-commerce platforms",
    link: "#projects",
    image: projectOne,
    gridClass: "md:col-span-7 h-[420px]",
  },
  {
    id: 2,
    title: "Global E-Learning",
    subtitle: "Serving 1.2M+ active students worldwide",
    link: "#projects",
    image: projectTwo,
    gridClass: "md:col-span-5 h-[420px]",
  },
  {
    id: 3,
    title: "Modular ERP System",
    subtitle: "Enterprise logistics & supply chain manufacturing engine",
    link: "#projects",
    image: projectThree,
    gridClass: "md:col-span-5 h-[360px]",
  },
  {
    id: 4,
    title: "Fintech Predictive Dashboard",
    subtitle: "Real-time analytics, algorithmic trading & risk modeling",
    link: "#projects",
    image: projectFour,
    gridClass: "md:col-span-7 h-[360px]",
  },
];

export const career = [
  {
    year: "2024 – Present",
    title: "Director of Product Engineering",
    subtitle: "TechNova Global Solutions",
    description:
      "Leading a 200+ engineering team across 5 continents, overseeing full product lifecycle from ideation to global deployment. Introduced AI-driven development pipelines, reducing time-to-market by 38%. Established enterprise-wide accessibility and sustainability design standards.",
    icon: Globe,
  },
  {
    year: "2020 – 2024",
    title: "Senior Principal Engineer & Design Strategist",
    subtitle: "Innova Digital Labs",
    description:
      "Architected scalable microservices for financial and healthcare industries, serving 20M+ active users. Directed the adoption of a unified design system across 12 product lines, increasing brand consistency and dev speed by 50%. Mentored 40+ senior engineers into leadership positions.",
    icon: Layers,
  },
  {
    year: "2016 – 2020",
    title: "Lead Full-Stack Developer",
    subtitle: "Skyline Interactive",
    description:
      "Spearheaded the creation of immersive web applications using React, GraphQL, and Node.js for high-profile clients. Reduced application load times by 70% through advanced performance optimization. Introduced component-driven workflows that became the company's standard practice.",
    icon: Briefcase,
  },
  {
    year: "2012 – 2016",
    title: "Senior UI/UX Designer",
    subtitle: "PixelForge Studios",
    description:
      "Designed award-winning digital experiences for global brands, winning multiple Awwwards and Webby Awards. Championed user-centered design by integrating continuous feedback loops into every sprint. Collaborated with cross-functional teams to unify visual and interaction design.",
    icon: Award,
  },
  {
    year: "2008 – 2012",
    title: "Frontend Developer & Interaction Designer",
    subtitle: "CreativeSpark Agency",
    description:
      "Built responsive and interactive marketing websites during the rise of mobile-first design. Created high-conversion landing pages for major e-commerce campaigns. Developed custom animations that improved user engagement metrics by over 45%.",
    icon: Users,
  },
];

export const education: {
  degree: string;
  school: string;
  year: string;
  badge: string;
  badgeIcon: LucideIcon;
  badgeColor: string;
  icon: LucideIcon;
  details: string[];
}[] = [
  {
    degree: "M.Sc. in Computer Science",
    school: "Kigali Independent University",
    year: "2016 – 2018",
    badge: "IEEE Published Author",
    badgeIcon: Award,
    badgeColor:
      "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    icon: GraduationCap,
    details: [
      "Specialized in Software Architecture, Distributed Systems, and AI Applications",
      "Thesis on Machine Learning for Predictive Analytics & Neural Optimization",
      "Led enterprise research project on Cloud-Based ERP microservices",
      "Published 2 peer-reviewed research papers in IEEE international conferences",
    ],
  },
  {
    degree: "B.Sc. in Information Technology",
    school: "Chinese University Juba, South Sudan",
    year: "2013 – 2016",
    badge: "Top 5% Honors",
    badgeIcon: Sparkles,
    badgeColor: "text-primary bg-primary/10 border-primary/30",
    icon: BookOpen,
    details: [
      "Gained rigorous foundation in Systems Programming, Networking & DB Management",
      "Ranked in top 5% across Software Engineering & Algorithms coursework",
      "Architected campus-wide digital library management system",
      "Organized and chaired annual technical symposium for 3 consecutive years",
    ],
  },
];

export const technicalSkills = [
  {
    name: "React.js / Next.js",
    level: 95,
    icon: Atom,
    color: "text-cyan-400",
  },
  {
    name: "Node.js / Express",
    level: 90,
    icon: Server,
    color: "text-emerald-400",
  },
  {
    name: "TypeScript & JavaScript",
    level: 92,
    icon: CodeXml,
    color: "text-blue-400",
  },
  {
    name: "Database (MongoDB / PostgreSQL)",
    level: 88,
    icon: Database,
    color: "text-amber-400",
  },
  {
    name: "Cloud (AWS / Azure)",
    level: 85,
    icon: Cloud,
    color: "text-purple-400",
  },
];

export const professionalTraits = [
  {
    name: "Leadership",
    icon: Crown,
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    name: "Problem Solving",
    icon: Brain,
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
  {
    name: "Agile Methodologies",
    icon: Workflow,
    color: "text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
  {
    name: "Mentorship",
    icon: HeartHandshake,
    color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  },
  {
    name: "Strategic Thinking",
    icon: Lightbulb,
    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  },
  {
    name: "Cross-Team Collaboration",
    icon: Users,
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
];

export const testimonials = [
  {
    name: "Justin Abdallah",
    role: "CTO, E-Commerce Solutions",
    content:
      "Santo transformed our completely outdated e-commerce system into an incredibly fast, highly scalable architecture. Our conversion rate increased by 40% after the launch.",
    image: justinAvatar,
  },
  {
    name: "Ezabella M",
    role: "Founder, Peak Analytics",
    content:
      "One of the best engineering minds I've worked with. The dashboard interface was not only flawlessly built, but also incredibly intuitive for non-technical users.",
    image: ezabellaAvatar,
  },
  {
    name: "Hassan Lou",
    role: "Product Lead, Fintech Nexus",
    content:
      "Delivered complex fintech integrations reliably and on time. Santo's attention to detail regarding both security protocols and UX is unparalleled.",
    image: hassanAvatar,
  },
];

export const footerMorphTexts = [
  "Full-Stack Developer",
  "UI/UX Architect",
  "AI Systems Engineer",
  "Product Builder",
  "Software Engineer",
];
