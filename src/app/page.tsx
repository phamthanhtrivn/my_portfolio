"use client";

import Image from "next/image";
import { useState } from "react";
import { PortfolioIcon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { GlowingTracker } from "@/components/glowing-tracker";
import { CaseStudyDrawer } from "@/components/case-study-drawer";
import { DevTerminal } from "@/components/dev-terminal";
import { useTheme } from "@/components/theme-provider";
import {
  architectureHighlights,
  metrics,
  profile,
  projects,
  skillGroups,
} from "@/lib/portfolio-data";
import type { Project } from "@/lib/portfolio-data";

const navItems = [
  { label: "Về tôi", href: "#about" },
  { label: "Dự án", href: "#projects" },
  { label: "Tư duy hệ thống", href: "#systems" },
  { label: "Liên hệ", href: "#contact" },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "backend" | "fullstack" | "mobile">("all");

  // Filter projects based on tabs
  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    const lowerName = project.name.toLowerCase();
    const lowerStack = project.stack.map(s => s.toLowerCase());
    const lowerRole = project.role.toLowerCase();
    const status = project.status.toLowerCase();

    if (activeTab === "backend") {
      return (
        lowerRole.includes("backend") ||
        lowerStack.includes("java") ||
        lowerStack.includes("nestjs") ||
        lowerStack.includes("spring boot")
      );
    }
    if (activeTab === "fullstack") {
      return lowerRole.includes("full-stack") || lowerRole.includes("full stack");
    }
    if (activeTab === "mobile") {
      return lowerRole.includes("mobile") || lowerStack.includes("react native") || lowerStack.includes("expo");
    }
    return true;
  });

  const featuredProjects = filteredProjects.filter((project) => project.spotlight);
  const secondaryProjects = filteredProjects.filter((project) => !project.spotlight);

  return (
    <main className="min-h-[100dvh] bg-background text-foreground transition-colors duration-300 relative">
      {/* Background patterns */}
      <div className="portfolio-grid fixed inset-0 -z-10 opacity-70 dark:opacity-40" />
      <GlowingTracker />

      <Header onOpenTerminal={() => setIsTerminalOpen(true)} />
      
      <Hero />
      <About />
      
      {/* Skills matrix section */}
      <Skills />

      {/* Projects with filter tabs */}
      <section id="projects" className="py-24 border-y border-line transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="mono-label text-xs font-semibold text-accent uppercase tracking-wider">dự án tiêu biểu</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Các hệ thống phần mềm & Case studies chuyên sâu
            </h2>
            <p className="mt-3 text-muted">
              Nhấp chọn từng dự án để xem sơ đồ kiến trúc hệ thống, các bài toán thách thức và giải pháp xử lý.
            </p>
          </Reveal>

          {/* Categories Tab Selector */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-4">
            <FilterTab active={activeTab === "all"} onClick={() => setActiveTab("all")} label="Tất cả dự án" />
            <FilterTab active={activeTab === "backend"} onClick={() => setActiveTab("backend")} label="Backend / Microservices" />
            <FilterTab active={activeTab === "fullstack"} onClick={() => setActiveTab("fullstack")} label="Full-stack Products" />
            <FilterTab active={activeTab === "mobile"} onClick={() => setActiveTab("mobile")} label="Mobile Apps" />
          </div>

          {/* Featured grid */}
          <div className="mt-10 grid gap-6">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <Reveal key={project.name} delay={index * 0.05}>
                  <ProjectCard project={project} featured onSelect={() => setSelectedProject(project)} />
                </Reveal>
              ))
            ) : (
              <p className="text-muted text-sm italic py-4">Không có dự án nào khớp bộ lọc này.</p>
            )}
          </div>

          {/* Secondary projects grid */}
          {secondaryProjects.length > 0 && (
            <div className="mt-16">
              <h3 className="mono-label text-xs font-semibold text-muted uppercase tracking-wider mb-6">Các dự án khác</h3>
              <Reveal>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {secondaryProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} onSelect={() => setSelectedProject(project)} />
                  ))}
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      <Systems />
      <Contact />

      {/* Case Study Detailed Drawer */}
      <CaseStudyDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Developer Terminal Overlay */}
      <DevTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </main>
  );
}

// Subcomponents
function Header({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 glass-header">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 font-bold text-foreground">
          <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-sm font-semibold shadow-sm text-accent">
            PT
          </span>
          <span className="hidden sm:inline tracking-tight">{profile.name}</span>
        </a>
        
        {/* Navigation list */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* CLI Terminal Button */}
          <button
            onClick={onOpenTerminal}
            className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:bg-surface-soft hover:text-accent transition-all active:translate-y-px"
            title="Mở Terminal dòng lệnh CLI"
            aria-label="Open CLI Terminal"
          >
            <PortfolioIcon name="backend" size={18} weight="bold" />
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:bg-surface-soft hover:text-accent transition-all active:translate-y-px"
            title="Chuyển chế độ sáng/tối"
            aria-label="Toggle theme mode"
          >
            <PortfolioIcon name={theme === "light" ? "moon" : "sun"} size={18} weight="bold" />
          </button>

          {/* GitHub link */}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90 active:translate-y-px dark:bg-foreground dark:text-background"
          >
            <PortfolioIcon name="github" size={18} weight="fill" />
            <span className="hidden xs:inline">GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="max-w-4xl">
          <p className="mono-label mb-5 inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-bold text-accent shadow-sm">
            <PortfolioIcon name="location" size={14} weight="bold" />
            {profile.location} / {profile.role}
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Thiết kế hệ thống backend, xây dựng ứng dụng full-stack.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            {profile.headline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:opacity-90 active:translate-y-px shadow-lg shadow-accent/20"
            >
              Xem các dự án
              <PortfolioIcon name="arrow" size={16} weight="bold" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent active:translate-y-px"
            >
              <PortfolioIcon name="github" size={18} weight="fill" />
              Tài khoản GitHub
            </a>
          </div>
        </Reveal>

        {/* Profile Card */}
        <Reveal delay={0.1} className="technical-card rounded-2xl p-5">
          <div className="rounded-xl border border-line bg-surface-soft/50 p-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://github.com/phamthanhtrivn.png"
                alt="Avatar"
                width={72}
                height={72}
                priority
                className="rounded-xl border border-line bg-surface shadow-sm"
              />
              <div>
                <p className="text-xl font-bold tracking-tight">{profile.displayName}</p>
                <p className="mt-1 text-sm text-muted">{profile.availability}</p>
              </div>
            </div>
            
            {/* Quick Metrics */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-line bg-surface p-3 text-center">
                  <p className="text-xl font-bold text-accent">{metric.value}</p>
                  <p className="mt-1 text-[10px] leading-4 text-muted uppercase tracking-wider font-semibold">{metric.label.split(":")[0]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-line bg-foreground p-5 text-background dark:bg-surface dark:text-foreground">
            <p className="mono-label text-[10px] text-muted dark:text-accent uppercase tracking-wider font-bold">mục tiêu hiện tại</p>
            <p className="mt-2 text-base font-semibold leading-7">
              Biến các bài toán phức tạp thành các sơ đồ kiến trúc rõ ràng, hệ thống chịu tải tốt, code dễ đọc và triển khai Docker tự động.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <Reveal
      as="section"
      id="about"
      className="border-y border-line bg-surface-soft/40 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="mono-label text-xs font-semibold text-accent uppercase tracking-wider">giới thiệu</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Tư duy thiết kế sản phẩm qua góc nhìn kỹ thuật.
          </h2>
        </div>
        <div className="grid gap-6 text-base leading-8 text-muted md:grid-cols-2">
          <p>{profile.intro}</p>
          <p>
            Các hệ thống mình xây dựng chú trọng chiều sâu backend: phân chia Service boundary hợp lý, cấu hình bảo mật JWT/OAuth, quản lý dữ liệu lớn (PostgreSQL, MongoDB), caching lớp đệm Redis, xử lý bất đồng bộ qua Kafka và tự động hóa quy trình CI/CD.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function Skills() {
  return (
    <Reveal as="section" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="mono-label text-xs font-semibold text-accent uppercase tracking-wider">kỹ năng chuyên môn</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Bộ công cụ tối ưu hóa hiệu năng và quy trình phát triển
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <div key={group.title} className="technical-card rounded-2xl p-5 hover:border-accent/50">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <PortfolioIcon
                  name={index === 0 ? "backend" : index === 1 ? "database" : index === 2 ? "code" : "rocket"}
                  size={20}
                  weight="bold"
                />
              </span>
              <h3 className="font-bold text-foreground text-base tracking-tight">{group.title}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-line bg-surface/80 px-2.5 py-1.5 text-xs text-muted shadow-sm hover:border-accent/20 hover:text-foreground transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function FilterTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
        active
          ? "bg-accent text-white shadow-md shadow-accent/10"
          : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function ProjectCard({
  project,
  featured = false,
  onSelect,
}: {
  project: Project;
  featured?: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md ${
        featured ? "lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:p-7" : ""
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
              {project.status}
            </span>
            <span className="rounded-lg border border-line bg-surface-soft px-2.5 py-1 text-xs font-semibold text-muted">
              {project.role}
            </span>
          </div>
          <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted line-clamp-3">{project.summary}</p>
        </div>
        
        {/* View case study trigger */}
        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-accent">
          <span>Xem Case Study chi tiết</span>
          <PortfolioIcon name="arrow" size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>

      <div className={featured ? "mt-8 lg:mt-0" : "mt-6"}>
        <div className="rounded-xl border border-line bg-surface-soft/60 p-4">
          <p className="mono-label text-[10px] text-muted uppercase tracking-wider font-bold">Thách thức</p>
          <p className="mt-2 text-xs leading-5 text-muted line-clamp-2">{project.problem}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 7).map((item) => (
            <span key={item} className="rounded-lg bg-surface-soft border border-line/40 px-2 py-1 text-[11px] text-muted">
              {item}
            </span>
          ))}
          {project.stack.length > 7 && (
            <span className="rounded-lg bg-surface-soft px-2 py-1 text-[11px] text-muted font-mono">
              +{project.stack.length - 7}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Systems() {
  return (
    <Reveal
      as="section"
      id="systems"
      className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"
    >
      <div>
        <p className="mono-label text-xs font-semibold text-accent uppercase tracking-wider">kiến trúc hệ thống</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Minh chứng thiết kế & Luồng dữ liệu vận hành
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          Không chỉ phát triển tính năng bề nổi, các dự án được cấu trúc rõ ràng để kiểm định, tối ưu hóa băng thông, chống quá tải và duy trì trạng thái dữ liệu ổn định theo thời gian thực.
        </p>
      </div>
      <div className="grid gap-4">
        {architectureHighlights.map((item, index) => (
          <div key={item.title} className="technical-card rounded-2xl p-5 hover:border-accent/40">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <PortfolioIcon
                  name={index === 0 ? "lightning" : index === 1 ? "shield" : "stack"}
                  size={20}
                  weight="bold"
                />
              </span>
              <div>
                <h3 className="font-bold text-foreground text-base tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Contact() {
  return (
    <Reveal
      as="section"
      id="contact"
      className="border-t border-line bg-surface-soft/40 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="mono-label text-xs font-semibold text-accent uppercase tracking-wider">liên hệ</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Quan tâm sâu hơn về giải pháp thiết kế?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {profile.contactNote} Bạn có thể kiểm tra trực tiếp mã nguồn, cấu hình CI/CD và lịch sử commit của mình trên các repository GitHub phía trên.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-semibold text-background transition hover:opacity-90 active:translate-y-px dark:bg-foreground dark:text-background"
          >
            <PortfolioIcon name="github" size={18} weight="fill" />
            GitHub Profile
          </a>
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent active:translate-y-px"
          >
            Duyệt các dự án
            <PortfolioIcon name="arrow" size={16} weight="bold" />
          </a>
        </div>
      </div>
      <footer className="mx-auto mt-16 flex max-w-7xl flex-col gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium">{profile.displayName} / Backend and Full-Stack Developer</p>
        <p className="mono-label text-xs">github.com/phamthanhtrivn</p>
      </footer>
    </Reveal>
  );
}
