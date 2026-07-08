'use client';

import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import './Experience.css';

const achievements = [
  'Engineered <strong>NeuroFusion</strong>, a full-stack text-to-image application; resolved <strong>20+</strong> critical bugs through systematic debugging, improving stability and user experience across web and mobile.',
  'Designed and implemented a <strong>RESTful backend</strong> with <strong>RBAC</strong>, relational data modeling, and <strong>MySQL</strong>-backed storage supporting multi-user access control workflows.',
  'Built an asynchronous <strong>prompt queuing system</strong> handling <strong>15+ concurrent requests</strong> via sequential GPU execution, applying software engineering principles for reliability and throughput.',
  'Optimized GPU scheduling logic, achieving a <strong>40% reduction in GPU idle time</strong> — demonstrating performance profiling and systems-level thinking.',
  'Containerized the application using <strong>Docker</strong> and managed source control with <strong>Git</strong>, ensuring reproducible builds and streamlined team collaboration.',
];

const tags = ['FastAPI', 'Docker', 'MySQL', 'React Native', 'Git', 'REST API'];

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <SectionHeader title="Experience" />

        <motion.div
          className="exp__timeline"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Timeline line */}
          <div className="exp__line" />

          <div className="exp__item">
            <div className="exp__icon glass-icon-circle">
              <i className="fas fa-briefcase" />
            </div>

            <div className="exp__card glass-card">
              <div className="exp__header">
                <h3 className="exp__role">Software Engineering Intern</h3>
                <span className="exp__company">Innova Solutions</span>
                <div className="exp__meta">
                  <span className="exp__period">
                    <i className="fas fa-calendar-alt" /> May 2025 – July 2025
                  </span>
                  <span className="exp__location">
                    <i className="fas fa-map-marker-alt" /> On-site
                  </span>
                </div>
              </div>

              <ul className="exp__list">
                {achievements.map((item, i) => (
                  <motion.li
                    key={i}
                    className="exp__list-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <i className="fas fa-check-circle" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </motion.li>
                ))}
              </ul>

              <div className="exp__tags">
                {tags.map((tag) => (
                  <span key={tag} className="glass-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
