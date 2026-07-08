'use client';

import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import './Projects.css';

const projects = [
  {
    id: 'dsagent',
    title: 'DSAgent — Autonomous Data Scientist',
    period: '2025 – Present',
    liveUrl: 'https://jatin-dsagent.vercel.app/',
    liveLabel: 'jatin-dsagent.vercel.app',
    githubUrl: 'https://github.com/jatinnathh/DSAgent',
    icon: 'fas fa-robot',
    description:
      'AI-powered data science platform that automates the full ML workflow — from raw CSV upload to trained, compared models. Combines a Next.js 16 frontend with a FastAPI + Python ML backend, connected through an LLM-powered ReAct agent that reasons about your data and calls 30+ real Python tools.',
    highlights: [
      'ReAct agent loop — Reasoning + Acting with Anthropic Claude',
      '30+ registered tools: cleaning, EDA, visualization, AutoML, preprocessing',
      'Visual drag-and-drop Pipeline Builder with AI-suggested steps',
      'Dark-themed server-side charts (matplotlib) returned as base64 PNGs',
      '3D landing page with React Three Fiber robot + Framer Motion animations',
      'Full persistence — chats, pipelines, runs stored in PostgreSQL via Prisma',
    ],
    tags: [
      'Next.js 16', 'FastAPI', 'Python', 'Anthropic Claude', 'ReAct Agent',
      'PostgreSQL', 'Prisma', 'scikit-learn', 'XGBoost', 'React Three Fiber',
      'Clerk Auth', 'TypeScript',
    ],
    flagship: true,
  },
  {
    id: 'mediflow',
    title: 'MediFlow — Hospital Workflow Automation',
    period: 'Winner, TetherX Hackathon — VIT Chennai (2026)',
    liveUrl: 'https://turbo-s-final.vercel.app/',
    githubUrl: 'https://github.com/jatinnathh/TurboS-Final',
    icon: 'fas fa-hospital',
    ribbon: '🏆 Hackathon Winner',
    description:
      'Full-stack Next.js/TypeScript platform automating patient workflows across hospital departments with dual-auth RBAC (Clerk + JWT), REST API routes, and PostgreSQL via Prisma ORM.',
    highlights: [
      'Real-time WebSocket chat with Socket.IO',
      'Inter-department workflow engine with audit logs',
      'Hugging Face ML + Google Gemini AI integration',
      'Razorpay automated billing & payments',
    ],
    tags: ['Next.js', 'TypeScript', 'Socket.IO', 'PostgreSQL', 'Prisma', 'Clerk', 'Gemini AI'],
  },
  {
    id: 'medifi',
    title: 'MediFi — AI Voice Intelligence Platform',
    period: '2026',
    liveUrl: 'https://turbo-s-medifi.vercel.app',
    githubUrl: 'https://github.com/jatinnathh/turbos-medifi',
    icon: 'fas fa-microphone-alt',
    description:
      'AI-powered multilingual voice consultation platform for Healthcare & Finance. Transforms live doctor–patient voice sessions into structured, color-coded clinical/financial reports with automated follow-up calls and multi-portal access.',
    highlights: [
      'Real-time STT + translation across 7 Indian languages (Sarvam AI)',
      'Hybrid NER — HuggingFace biomedical model + Groq LLaMA 3',
      'Automated Twilio voice/WhatsApp reminders & PDF delivery',
      'Visual report editor + multilingual PDF export',
    ],
    tags: ['Next.js 16', 'TypeScript', 'Prisma', 'NeonDB', 'Groq / LLaMA 3', 'Sarvam AI', 'HuggingFace', 'Twilio'],
  },
  {
    id: 'modelforge',
    title: 'ModelForge — AutoML Platform',
    period: 'July 2025 – August 2025',
    liveUrl: 'http://51.21.222.225:8501/',
    githubUrl: 'https://github.com/jatinnathh/MLGenie',
    icon: 'fas fa-cogs',
    description:
      'Full-stack AutoML platform deployed on AWS EC2 with modular OOP architecture. Implemented RESTful API endpoints for model training, evaluation, and retrieval; automated data preprocessing reducing manual effort by ~70%.',
    highlights: [
      'End-to-end automated ML workflows on AWS',
      'SOLID principles & maintainable codebase',
      'RESTful API for model management',
    ],
    tags: ['Python', 'AWS EC2', 'Streamlit', 'scikit-learn', 'OOP'],
  },
  {
    id: 'neurofusion',
    title: 'NeuroFusion — AI Text-to-Image',
    period: 'May 2025 – July 2025',
    liveUrl: 'http://51.21.222.225/',
    githubUrl: 'https://github.com/jatinnathh/NeuroFusion',
    icon: 'fas fa-magic',
    description:
      'Production-grade Dockerized ML application with custom diffusion models for text-to-image and image-to-image generation, featuring RBAC and async prompt queuing.',
    highlights: [
      '15+ concurrent request handling',
      '40% GPU idle time reduction',
      '20+ bugs resolved, Docker containerized',
    ],
    tags: ['React Native', 'FastAPI', 'Docker', 'MySQL', 'Diffusion Models'],
  },
];

function ProjectCard({ project, index }) {
  const isFlagship = project.flagship;

  return (
    <motion.div
      className={`proj__card glass-card ${isFlagship ? 'proj__card--flagship' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {project.ribbon && <div className="proj__ribbon">{project.ribbon}</div>}

      <div className="proj__header">
        <div className="proj__icon-wrap">
          <i className={project.icon} />
        </div>
        <div className="proj__links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj__link-btn" title="Live Demo">
              <i className="fas fa-external-link-alt" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj__link-btn" title="GitHub">
              <i className="fab fa-github" />
            </a>
          )}
        </div>
      </div>

      <h3 className="proj__title">{project.title}</h3>
      <p className="proj__period">
        {project.period}
        {project.liveLabel && (
          <>
            {' · '}
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj__live-link">
              {project.liveLabel} <i className="fas fa-arrow-up-right-from-square" />
            </a>
          </>
        )}
      </p>
      <p className="proj__description">{project.description}</p>

      {project.highlights && (
        <ul className="proj__highlights">
          {project.highlights.map((h, i) => (
            <li key={i}>
              <i className="fas fa-star" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="proj__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="glass-tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <SectionHeader title="Featured Projects" />

        <div className="proj__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
