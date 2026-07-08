'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import './About.css';

const stats = [
  { count: 6, label: 'Major Projects' },
  { count: 70, label: '% Time Reduction', suffix: '%' },
  { count: 1, label: 'Hackathon Win' },
  { count: 2, label: 'Certifications' },
];

function AnimatedCounter({ target, suffix }) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current + (suffix || '');
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>0</span>;
}

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <SectionHeader title="About Me" />

        <motion.div
          className="about__card glass-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="about__text">
            <strong>Computer Science (AI & Data Science)</strong> undergraduate with strong foundations in{' '}
            <strong>Data Structures & Algorithms</strong>, <strong>Object-Oriented Programming</strong>, and{' '}
            <strong>backend engineering</strong>.
          </p>
          <p className="about__text">
            <strong>Hackathon winner (TetherX, VIT Chennai)</strong> for building a real-time hospital
            workflow automation platform. Experienced in building and deploying scalable, Dockerized
            applications with <strong>REST APIs</strong>, <strong>FastAPI</strong>, and{' '}
            <strong>Node.js/Express</strong>.
          </p>
          <p className="about__text">
            Built <strong>NeuroFusion</strong>, a production-grade Dockerized ML application,{' '}
            <strong>MediFlow</strong>, a hackathon-winning hospital automation platform, and{' '}
            <strong>ModelForge</strong>, an AutoML platform deployed on <strong>AWS</strong>.
            Proficient in <strong>Python</strong>, <strong>C++</strong>, <strong>JavaScript</strong>,{' '}
            <strong>SQL</strong>, with hands-on experience in software engineering principles,
            version control (Git), and CI/CD workflows.
          </p>

          <div className="about__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="about__stat">
                <h3 className="about__stat-number">
                  <AnimatedCounter target={stat.count} suffix={stat.suffix} />
                </h3>
                <p className="about__stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
