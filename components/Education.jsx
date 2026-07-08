'use client';

import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import './Education.css';

const coursework = [
  'Data Structures and Algorithms',
  'Database Management Systems',
  'Operating Systems',
  'Object-Oriented Programming',
  'Computer Networks',
  'Probability, Statistics & Random Processes',
  'Discrete Mathematics',
  'Calculus and Linear Algebra',
];

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <SectionHeader title="Education & Certifications" />

        {/* Degree */}
        <motion.div
          className="edu__card glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-icon-circle edu__degree-icon">
            <i className="fas fa-graduation-cap" />
          </div>
          <div>
            <h3 className="edu__degree">B.Tech, Computer Science</h3>
            <p className="edu__spec">AI and Data Science</p>
            <p className="edu__institution">Indian Institute of Information Technology Kottayam</p>
            <p className="edu__meta">Kottayam, India · 2023 – 2027 (Expected)</p>
          </div>
        </motion.div>

        {/* Certifications */}
        <h3 className="edu__subtitle">Professional Certifications</h3>
        <div className="edu__certs-grid">
          <motion.div
            className="edu__cert glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-icon-circle edu__cert-icon">
              <i className="fas fa-certificate" />
            </div>
            <div>
              <h4 className="edu__cert-title">Post Graduate Program in AI and Machine Learning</h4>
              <p className="edu__cert-issuer">Caltech CTME · 2024</p>
              <p className="edu__cert-desc">
                Project-based curriculum covering AI, ML, DL, Data Science, and Generative AI.
                Capstone guided by Dr. Rick Hefner; certificate endorsed by Caltech CTME.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="edu__cert glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-icon-circle edu__cert-icon">
              <i className="fas fa-certificate" />
            </div>
            <div>
              <h4 className="edu__cert-title">IBM Data Science Professional Certificate</h4>
              <p className="edu__cert-issuer">IBM · 2024</p>
              <p className="edu__cert-desc">
                Mastered Python for data manipulation, analysis, and visualization. Issued: June 5, 2024.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Coursework */}
        <h3 className="edu__subtitle">Relevant Coursework</h3>
        <motion.div
          className="edu__coursework"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {coursework.map((course) => (
            <span key={course} className="edu__course-pill glass-card">
              <i className="fas fa-book" />
              {course}
            </span>
          ))}
        </motion.div>

        {/* Languages */}
        <h3 className="edu__subtitle">Languages</h3>
        <motion.div
          className="edu__languages"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="edu__lang glass-card">
            <span className="edu__lang-name">English</span>
            <span className="edu__lang-level">Fluent</span>
          </div>
          <div className="edu__lang glass-card">
            <span className="edu__lang-name">Hindi</span>
            <span className="edu__lang-level">Fluent</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
