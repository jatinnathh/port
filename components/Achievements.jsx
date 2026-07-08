'use client';

import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import './Achievements.css';

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="container">
        <SectionHeader title="Achievements" />

        <motion.div
          className="ach__card glass-card ach__card--gold"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="ach__glow" />

          <div className="ach__icon">
            <i className="fas fa-trophy" />
          </div>

          <div className="ach__content">
            <h3 className="ach__title">🥇 Winner (1st Place)</h3>
            <p className="ach__event">TetherX Hackathon — VIT Chennai</p>
            <p className="ach__year">2026</p>
            <p className="ach__description">
              Built <strong>MediFlow</strong>, a real-time hospital inter-department workflow
              automation system featuring dual-auth RBAC, WebSocket chat, AI diagnostics,
              and automated billing.
            </p>
            <div className="ach__tags">
              <span className="glass-tag ach__tag--gold">1st Place</span>
              <span className="glass-tag">Next.js</span>
              <span className="glass-tag">TypeScript</span>
              <span className="glass-tag">Socket.IO</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
