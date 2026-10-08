import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  FaArrowUp,
  FaBriefcase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaGraduationCap,
  FaLinkedinIn,
  FaMoon,
  FaSun,
} from 'react-icons/fa'
import {
  SiBootstrap,
  SiCodeigniter,
  SiCss,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si'
import { Sparkles } from 'lucide-react'
import heroImage from './assets/hero.jpg'

const NAV_LINKS = [
  { label: 'Home', href: '/', sectionId: 'home' },
  { label: 'About', href: '/', sectionId: 'about' },
  { label: 'Skills', href: '/', sectionId: 'skills' },
  { label: 'Projects', href: '/projects', sectionId: 'projects' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
]

const ROLES = ['Web Developer', 'UI Developer', 'Backend Developer']

const SKILLS = [
  'HTML',
  'CSS',
  'JS',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Bootstrap',
  'PHP',
  'Laravel',
  'CodeIgniter',
  'MySQL',
  'Git & GitHub',
  'Python',
  'Postman',
]

const PROJECTS = [
  {
    title: 'Learn Track AI',
    description:
      'Created a productivity and interview preparation platform with smart tracking features. Includes dashboard, timer system, and interactive UI experience.',
    live: 'https://learn-track-ai.netlify.app/',
    source: 'https://github.com/nagalakshmi-kirushnan/learn-track-ai',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'E-commerce website',
    description:
      'Built a responsive e-commerce platform with product listing and cart features. Includes user-based actions like liking products and adding to cart.',
    live: 'https://shopnexte-commerce.netlify.app/',
    source: 'https://github.com/nagalakshmi-kirushnan/e-commerce',
    tech: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'Luxe Aura Salon',
    description:
      'Designed a premium beauty salon website with elegant UI and smooth user experience. Includes service sections, booking-style layout, and modern animations.',
    live: 'https://luxeaurasalon.netlify.app/',
    source: 'https://github.com/nagalakshmi-kirushnan/beauty-salon',
    tech: ['Next JS', 'Tailwind CSS', 'Laravel'],
  },
  {
    title: 'Typing Test',
    description:
      'Built an interactive typing test application for speed and accuracy practice. Includes real-time typing tracking and performance feedback.',
    live: 'https://dataentry-typing-test.netlify.app/',
    source: 'https://github.com/nagalakshmi-kirushnan/typing-test',
    tech: ['React', 'JavaScript', 'CSS'],
  },
  {
    title: 'Bug tracker',
    description:
      'A collaborative issue management system with status boards and release tracking.',
    live: 'https://example.com',
    source: 'https://github.com/',
    tech: ['React', 'Node.js', 'MySQL'],
  },
  {
    title: 'Tomoto food delivery website',
    description:
      'Developed a food delivery web app with modern UI and smooth navigation. Includes menu browsing, ordering flow, and responsive design.',
    live: 'https://food-delivery-website-home.netlify.app/',
    source: 'https://github.com/nagalakshmi-kirushnan/food-delivery-app',
    tech: ['React', 'Tailwind CSS', 'REST API'],
  },
  {
    title: 'Education website',
    description:
      'Developed a responsive educational website with modern UI for online learning access. Includes course sections, structured content, and clean navigation.',
    live: 'https://educational-website-home.netlify.app/',
    source: 'https://github.com/nagalakshmi-kirushnan/e-school-website',
    tech: ['React', 'Tailwind CSS', 'Laravel'],
  },

]

const EXPERIENCE_EDUCATION = [
  {
    type: 'Experience',
    year: '2026 – Present',
    title: 'Junior PHP Developer',
    institution: 'Hitasoft Technology Solutions Pvt. Ltd.',
    detail:
      'Contributing to the development and maintenance of PHP-based web applications, collaborating with the team to deliver scalable and efficient solutions.',
    icon: FaBriefcase,
  },
  {
    type: 'Experience',
    year: '2025 – 2026',
    title: 'Web Developer',
    institution: 'Ayantrix Solutions',
    detail:
      'Engineered responsive web applications and integrated complex REST APIs. Focused on building production-ready interfaces with a balance of clean architecture and optimized performance.',
    icon: FaBriefcase,
  },
  {
    type: 'Education',
    year: '2022 – 2025',
    title: 'B.Sc. Computer Science',
    institution: 'Pannaikadu Veerammal Paramasivam College',
    detail:
      'Developed a strong foundation in core CS principles, including algorithms, DBMS, and full-stack development methodologies through hands-on project work.',
    icon: FaGraduationCap,
  },
  {
    type: 'Education',
    year: '2021 – 2022',
    title: 'Higher Secondary Education (12th)',
    institution: 'HNUPR Girls Higher Secondary School',
    detail:
      'Completed secondary education with a focus on Mathematics and Computer Science fundamentals, sparking a passion for software engineering.',
    icon: FaGraduationCap,
  },
]

const THEME_KEY = 'theme'
const INFINITE_SKILLS = [...SKILLS, ...SKILLS]
const SKILL_ICON_MAP = {
  HTML: SiHtml5,
  CSS: SiCss,
  JS: SiJavascript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  Bootstrap: SiBootstrap,
  PHP: SiPhp,
  Laravel: SiLaravel,
  CodeIgniter: SiCodeigniter,
  MySQL: SiMysql,
  'Git & GitHub': SiGithub,
  Python: SiPython,
  Postman: SiPostman,
}

const sectionVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const getRouteHref = (link) => (link.href === '/' ? `#${link.sectionId}` : link.href)

const scrollToSection = (sectionId) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function HeroSection({ roleIndex }) {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[88vh] w-full max-w-6xl scroll-mt-20 flex-col justify-center px-4 pb-12 pt-16 sm:px-6 md:pt-20"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="w-full max-w-2xl">
          <motion.p
            className="mb-5 w-fit rounded-full border border-cyan-300/60 bg-cyan-300/20 px-4 py-2 font-display text-xs uppercase tracking-[0.22em] text-cyan-700 dark:border-cyan-200/30 dark:bg-cyan-300/10 dark:text-cyan-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Web Developer
          </motion.p>

          <motion.h1
            className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Nagalakshmi K
          </motion.h1>

          <motion.p
            className="mt-6 flex min-h-[52px] flex-wrap items-center gap-2 text-lg text-slate-700 sm:text-2xl dark:text-slate-200"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span>I build as a</span>
            <span className="inline-flex min-w-[164px] items-center font-semibold text-cyan-700 sm:min-w-[210px] dark:text-cyan-200">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIndex]}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="inline-block overflow-hidden whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
              <motion.span
                className="ml-1 inline-block"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              >
                |
              </motion.span>
            </span>
          </motion.p>

          <motion.p
            className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            I create futuristic interfaces and robust web applications with a
            balance of clean architecture, delightful motion, and pixel-perfect
            UI engineering.
          </motion.p>
        </div>

        <motion.div
          className="flex w-full justify-center md:w-auto md:justify-end"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={heroImage}
            alt="Nagalakshmi Kirushnan profile"
            className="h-64 w-64 rounded-2xl object-cover shadow-lg grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
          />
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <motion.section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-10 sm:px-6"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="glass-panel border-slate-900/10 bg-white/70 p-6 shadow-none sm:p-8 dark:border-white/10 dark:bg-slate-900/50 dark:shadow-glow">
        <h2 className="font-display text-2xl text-slate-900 sm:text-3xl dark:text-white">
          About
        </h2>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
          I am a passionate full-stack developer focused on building modern,
          high-performance experiences that feel premium on every device. I
          enjoy transforming complex problems into seamless products through
          thoughtful UI/UX, scalable frontend architecture, and dependable
          backend integration.
        </p>
      </div>
    </motion.section>
  )
}

function SkillsSection() {
  return (
    <motion.section
      id="skills"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mb-5">
        <div>
          <h2 className="font-display text-2xl text-slate-900 sm:text-3xl dark:text-white">
            Skills
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            Creative stack scroller with smooth looping motion
          </p>
        </div>
      </div>

      <div className="skills-marquee glass-panel overflow-hidden border-slate-900/10 bg-white/75 p-4 shadow-[0_16px_38px_rgba(15,23,42,0.12)] sm:p-5 dark:border-white/10 dark:bg-slate-900/55 dark:shadow-[0_22px_54px_rgba(2,6,23,0.6)]">
        <div className="skills-track flex w-max gap-6 whitespace-nowrap motion-reduce:animate-none">
          {INFINITE_SKILLS.map((skill, index) => {
            const Icon = SKILL_ICON_MAP[skill] ?? Sparkles

            return (
              <div
                key={`${skill}-${index}`}
                className="inline-flex w-[108px] shrink-0 flex-col items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-100/90 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-300/45 hover:shadow-[0_0_22px_rgba(14,116,144,0.24)] dark:bg-slate-900/80 dark:hover:shadow-[0_0_22px_rgba(34,211,238,0.45)]"
              >
                <Icon className="text-2xl text-cyan-700 dark:text-cyan-200" />
                <span className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-100">
                  {skill}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

function ExperienceEducationSection() {
  return (
    <motion.section
      id="experience"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="font-display text-2xl text-slate-900 sm:text-3xl dark:text-white">
        Experience & Education
      </h2>
      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
        A compact timeline of practical work and learning milestones
      </p>

      <div className="relative mt-8">
        <div className="absolute left-6 top-0 h-full w-px bg-cyan-500/30 md:left-1/2 dark:bg-cyan-200/20" />
        <div className="space-y-6">
          {EXPERIENCE_EDUCATION.map((item, index) => {
            const Icon = item.icon
            const contentPlacement =
              index % 2 === 0
                ? 'md:col-start-1 md:row-start-1 md:text-right'
                : 'md:col-start-3 md:row-start-1 md:text-left'
            const spacerPlacement =
              index % 2 === 0
                ? 'md:col-start-3 md:row-start-1'
                : 'md:col-start-1 md:row-start-1'

            return (
              <motion.div
                key={`${item.type}-${item.year}-${item.title}`}
                className="relative grid gap-4 pl-16 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6 md:pl-0"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
              
<article
  className={`${contentPlacement} rounded-xl border border-slate-900/10 bg-white/80 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.1)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/45 hover:shadow-[0_22px_42px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-cyan-200/40 dark:hover:shadow-[0_22px_46px_rgba(2,6,23,0.62)]`}
>
  <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-300/15 dark:text-cyan-100">
    {item.year}
  </span>
  <p className="mt-3 text-xs uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400">
    {item.type}
  </p>
  <h3 className="mt-1 font-display text-lg text-slate-900 dark:text-white">
    {item.title}
  </h3>
  {/* ADD THIS LINE BELOW TO SHOW THE COLLEGE/COMPANY NAME */}
  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
    {item.institution}
  </p> 
  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
    {item.detail}
  </p>
</article>


                <div className="absolute left-0 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/50 bg-white text-cyan-700 shadow-[0_12px_26px_rgba(8,145,178,0.2)] md:static md:col-start-2 md:row-start-1 dark:border-cyan-100/25 dark:bg-slate-900 dark:text-cyan-100 dark:shadow-[0_0_22px_rgba(34,211,238,0.25)]">
                  <Icon size={18} />
                </div>

                <div className={`${spacerPlacement} hidden md:block`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

function ProjectCards({ projects }) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <motion.article
          key={project.title}
          className="group rounded-2xl border border-slate-900/10 bg-white/80 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/45 hover:shadow-[0_24px_45px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-gradient-to-b dark:from-slate-800/70 dark:to-slate-900/80 dark:hover:border-cyan-200/40 dark:hover:shadow-[0_24px_48px_rgba(3,7,18,0.62)]"
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ duration: 0.28 }}
        >
          <h3 className="font-display text-lg text-cyan-700 transition group-hover:text-slate-900 dark:text-cyan-100 dark:group-hover:text-white">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={`${project.title}-${tech}`}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700 transition-transform duration-200 hover:scale-105 dark:bg-slate-700 dark:text-slate-100"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-4 text-sm">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-cyan-700 transition-all duration-200 hover:-translate-y-0.5 hover:text-cyan-900 hover:underline dark:text-cyan-200 dark:hover:text-cyan-100"
            >
              Live Demo
              <FaExternalLinkAlt size={12} />
            </a>
            <a
              href={project.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-cyan-700 transition-all duration-200 hover:-translate-y-0.5 hover:text-cyan-900 hover:underline dark:text-cyan-200 dark:hover:text-cyan-100"
            >
              GitHub Source
              <FaGithub size={14} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function ProjectsPreview() {
  return (
    <motion.section
      id="projects"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl text-slate-900 sm:text-3xl dark:text-white">
            Projects
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            Selected work with interaction-first frontend and practical backend
            execution
          </p>
        </div>
        <Link
          to="/projects"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-[0_0_22px_rgba(8,145,178,0.32)] dark:bg-cyan-500 dark:hover:bg-cyan-400"
        >
          View All Projects
          <FaExternalLinkAlt size={12} />
        </Link>
      </div>

      <ProjectCards projects={PROJECTS.slice(0, 3)} />
    </motion.section>
  )
}

function ProjectsPage() {
  return (
    <motion.section
      id="projects"
      className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6"
      variants={sectionVariant}
      initial="hidden"
      animate="visible"
    >
      <h1 className="font-display text-3xl text-slate-900 sm:text-4xl dark:text-white">
        Projects
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
        Full project list with live demos, source links, and the stack used for each
        build.
      </p>

      <ProjectCards projects={PROJECTS} />
    </motion.section>
  )
}

function SocialLinks() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <a
        href="mailto:nagalakshmikirushnan@gmail.com"
        aria-label="Email"
        title="Send email"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/45 bg-white text-cyan-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-500 hover:text-cyan-900 hover:shadow-[0_0_20px_rgba(8,145,178,0.3)] dark:border-cyan-100/25 dark:bg-white/5 dark:text-cyan-100 dark:hover:border-cyan-100 dark:hover:bg-cyan-500/20 dark:hover:shadow-[0_0_24px_rgba(34,211,238,0.34)]"
      >
        <FaEnvelope size={16} />
      </a>
      <a
        href="https://www.linkedin.com/in/nagalakshmi-k-3b9031256/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/45 bg-white text-cyan-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-500 hover:text-cyan-900 hover:shadow-[0_0_20px_rgba(8,145,178,0.3)] dark:border-cyan-100/25 dark:bg-white/5 dark:text-cyan-100 dark:hover:border-cyan-100 dark:hover:bg-cyan-500/20 dark:hover:shadow-[0_0_24px_rgba(34,211,238,0.34)]"
      >
        <FaLinkedinIn size={16} />
      </a>
      <a
        href="https://github.com/nagalakshmi-kirushnan"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/45 bg-white text-cyan-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-500 hover:text-cyan-900 hover:shadow-[0_0_20px_rgba(8,145,178,0.3)] dark:border-cyan-100/25 dark:bg-white/5 dark:text-cyan-100 dark:hover:border-cyan-100 dark:hover:bg-cyan-500/20 dark:hover:shadow-[0_0_24px_rgba(34,211,238,0.34)]"
      >
        <FaGithub size={16} />
      </a>
    </div>
  )
}

function ContactForm() {
  return (
    <form className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none transition focus:ring-2 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-cyan-300"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none transition focus:ring-2 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-cyan-300"
        required
      />
      <textarea
        name="message"
        rows="5"
        placeholder="Message"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none transition focus:ring-2 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-cyan-300"
        required
      />
      <button
        type="submit"
        className="rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-cyan-700 hover:shadow-[0_0_24px_rgba(8,145,178,0.38)] dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:hover:shadow-[0_0_28px_rgba(34,211,238,0.42)]"
      >
        Send Message
      </button>
    </form>
  )
}

function ContactPreview() {
  return (
    <motion.section
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-6 shadow-[0_16px_38px_rgba(15,23,42,0.1)] backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/55 dark:shadow-[0_22px_54px_rgba(2,6,23,0.55)] sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl text-slate-900 dark:text-white">
              Contact
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Open to frontend roles, full-stack projects, and thoughtful product
              collaborations.
            </p>
            <SocialLinks />
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-[0_0_22px_rgba(8,145,178,0.32)] dark:bg-cyan-500 dark:hover:bg-cyan-400"
          >
            Open Contact Page
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

function ContactPage() {
  return (
    <motion.section
      id="contact"
      className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-5xl scroll-mt-20 px-4 py-12 sm:px-6"
      variants={sectionVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-6 shadow-[0_16px_38px_rgba(15,23,42,0.1)] backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/55 dark:shadow-[0_22px_54px_rgba(2,6,23,0.55)] sm:p-8">
        <div className="text-center">
          <h1 className="font-display text-3xl text-slate-900 sm:text-4xl dark:text-white">
            Contact
          </h1>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>

        <ContactForm />
        <p className="mt-6 text-center text-sm text-gray-500">
          Developed by Nagalakshmi
        </p>
      </div>
    </motion.section>
  )
}

function HomePage({ roleIndex }) {
  return (
    <>
      <HeroSection roleIndex={roleIndex} />
      <AboutSection />
      <SkillsSection />
      <ExperienceEducationSection />
      <ProjectsPreview />
      <ContactPreview />
    </>
  )
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [roleIndex, setRoleIndex] = useState(0)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (!savedTheme) return true
    return savedTheme === 'dark'
  })
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem(THEME_KEY, 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem(THEME_KEY, 'light')
    }
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length)
    }, 3000)

    return () => clearInterval(roleTimer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 280)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let loadTimer
    const handleLoaded = () => {
      loadTimer = window.setTimeout(() => setIsLoaded(true), 450)
    }

    if (document.readyState === 'complete') {
      handleLoaded()
    } else {
      window.addEventListener('load', handleLoaded, { once: true })
    }

    return () => {
      if (loadTimer) window.clearTimeout(loadTimer)
      window.removeEventListener('load', handleLoaded)
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/') return undefined

    window.scrollTo({ top: 0, behavior: 'smooth' })
    return undefined
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const sectionId =
      location.state?.scrollTo || location.hash.replace('#', '') || ''
    if (!sectionId) return undefined

    const scrollTimer = window.setTimeout(() => scrollToSection(sectionId), 80)
    return () => window.clearTimeout(scrollTimer)
  }, [location.hash, location.pathname, location.state])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const sectionIds = NAV_LINKS.map((link) => link.sectionId).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    )

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (event, link) => {
    event.preventDefault()

    if (link.href === '/') {
      if (location.pathname === '/') {
        scrollToSection(link.sectionId)
      } else {
        navigate('/', { state: { scrollTo: link.sectionId } })
      }
      return
    }

    navigate(link.href)
  }

  const isNavLinkActive = (link) => {
    if (link.href === '/') {
      return location.pathname === '/' && activeSection === link.sectionId
    }

    return (
      location.pathname === link.href ||
      (location.pathname === '/' && activeSection === link.sectionId)
    )
  }

  return (
    <motion.div
      className="relative flex min-h-screen w-full flex-col bg-transparent text-slate-900 transition-colors duration-500 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.82 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_52%,#020617_100%)] opacity-0 dark:opacity-100" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.2),transparent_42%),radial-gradient(circle_at_88%_8%,rgba(59,130,246,0.15),transparent_36%),radial-gradient(circle_at_80%_74%,rgba(14,165,233,0.12),transparent_38%)] opacity-0 dark:opacity-100" />

      <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-900/10 bg-white/80 shadow-[0_8px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/55 dark:shadow-[0_14px_36px_rgba(2,6,23,0.55)]">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#home"
            onClick={(event) => handleNavClick(event, NAV_LINKS[0])}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-cyan-400/10 px-4 py-2 font-display text-xs tracking-[0.35em] text-cyan-700 transition hover:border-cyan-500/80 dark:border-cyan-200/20 dark:bg-white/5 dark:text-cyan-200 dark:hover:border-cyan-300/70"
          >
            <Sparkles size={14} />
            NK
          </a>

          <div className="flex items-center gap-2">
            <ul className="flex flex-wrap justify-end gap-2 text-xs sm:text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={getRouteHref(link)}
                    onClick={(event) => handleNavClick(event, link)}
                    className={`rounded-full px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] ${
                      isNavLinkActive(link)
                        ? 'bg-cyan-400/15 text-cyan-800 shadow-[0_0_18px_rgba(8,145,178,0.2)] dark:bg-white/10 dark:text-cyan-100 dark:shadow-[0_0_18px_rgba(103,232,249,0.22)]'
                        : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-cyan-100 dark:hover:shadow-[0_0_18px_rgba(103,232,249,0.26)]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-cyan-400 hover:text-cyan-700 hover:shadow-[0_0_18px_rgba(8,145,178,0.32)] dark:border-cyan-100/25 dark:bg-white/5 dark:text-cyan-100 dark:hover:border-cyan-100 dark:hover:bg-cyan-500/20 dark:hover:shadow-[0_0_22px_rgba(34,211,238,0.34)]"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 flex-1 pt-20">
        <Routes>
          <Route path="/" element={<HomePage roleIndex={roleIndex} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-gray-800 p-3 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 hover:shadow-[0_0_22px_rgba(34,211,238,0.35)]"
          aria-label="Back to top"
          title="Back to top"
        >
          <FaArrowUp size={16} />
        </button>
      )}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-200/30 border-t-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.35)]" />
              <p className="font-display text-xs tracking-[0.28em] text-cyan-100/90">
                LOADING
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default App
