"use client";

import {
  ArrowUpRight,
  BracketsCurly,
  Database,
  GithubLogo,
  GitBranch,
  Lightning,
  MapPin,
  RocketLaunch,
  ShieldCheck,
  Stack,
  TerminalWindow,
  VideoCamera,
  Sun,
  Moon,
  LinkedinLogo,
  EnvelopeSimple,
  FileText,
  Globe,
  Atom,
  Coffee,
  Leaf,
  Cpu,
  CreditCard,
  Cloud,
  Key,
  Radio,
} from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";

const icons = {
  // Navigation & General
  arrow: ArrowUpRight,
  backend: TerminalWindow,
  database: Database,
  github: GithubLogo,
  branch: GitBranch,
  lightning: Lightning,
  location: MapPin,
  rocket: RocketLaunch,
  shield: ShieldCheck,
  stack: Stack,
  code: BracketsCurly,
  video: VideoCamera,
  sun: Sun,
  moon: Moon,
  linkedin: LinkedinLogo,
  email: EnvelopeSimple,
  resume: FileText,
  globe: Globe,

  // Tech specific representations
  react: Atom,
  nextjs: Atom,
  java: Coffee,
  springboot: Leaf,
  springcloud: Leaf,
  nestjs: Cpu,
  nodejs: TerminalWindow,
  docker: TerminalWindow,
  dockercompose: TerminalWindow,
  database_generic: Database,
  stripe: CreditCard,
  aws: Cloud,
  clerk: Key,
  websocket: Radio,
  socketio: Radio,
  kafka: GitBranch,
};

export type IconName = keyof typeof icons;

type PortfolioIconProps = IconProps & {
  name: IconName;
};

export function PortfolioIcon({ name, weight = "regular", ...props }: PortfolioIconProps) {
  const Icon = icons[name] || BracketsCurly; // fallback to code brackets if icon not found
  return <Icon aria-hidden="true" weight={weight} {...props} />;
}

// Helper to map tech stack string to an icon key
export function getTechIconName(tech: string): IconName {
  const t = tech.toLowerCase().replace(/[\s\.\-\/]/g, "");
  
  if (t.includes("react") || t.includes("next")) return "react";
  if (t === "java") return "java";
  if (t.includes("springboot")) return "springboot";
  if (t.includes("springcloud")) return "springcloud";
  if (t.includes("nestjs")) return "nestjs";
  if (t.includes("node") || t.includes("express")) return "nodejs";
  if (t.includes("docker")) return "docker";
  if (t.includes("redis") || t.includes("sql") || t.includes("mongo") || t.includes("postgres") || t.includes("db") || t.includes("prisma")) return "database";
  if (t.includes("stripe")) return "stripe";
  if (t.includes("aws") || t.includes("cloud") || t.includes("vercel")) return "aws";
  if (t.includes("clerk")) return "clerk";
  if (t.includes("websocket") || t.includes("socket")) return "websocket";
  if (t.includes("kafka")) return "kafka";
  
  return "code";
}

// Helper to map tech stack string to thesvg.org slug
export function getTheSvgUrl(tech: string): string | null {
  const t = tech.toLowerCase().replace(/[\s\.\-\/\(\)]/g, "");
  
  const map: Record<string, string> = {
    java: "java",
    javascript: "javascript",
    typescript: "typescript",
    springboot: "spring-boot",
    springsecurity: "spring",
    springdatajpa: "spring",
    springai: "spring",
    redis: "redis",
    kafka: "kafka",
    nodejs: "nodedotjs",
    expressjs: "express",
    nestjs: "nestjs",
    reactjs: "react",
    reduxtoolkit: "redux",
    reactquery: "reactquery",
    tailwindcss: "tailwind-css",
    shadcnui: "shadcn-ui",
    html5: "html5",
    css3: "css3",
    mysql: "mysql",
    mariadb: "mariadb",
    postgresql: "postgresql",
    pgvector: "postgresql",
    mongodb: "mongodb",
    docker: "docker",
    git: "git",
    github: "github",
    githubactions: "github-actions",
    awsec2: "aws",
    nginx: "nginx",
    linux: "linux",
    jwt: "jwt",
    oauth2: "oauth",
    cloudinary: "cloudinary"
  };

  const slug = map[t];
  if (slug) {
    return `https://thesvg.org/icons/${slug}/default.svg`;
  }
  return null;
}
