'use client';

import { motion } from 'motion/react';

export default function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ textAlign: 'center', marginBottom: '3.5rem' }}
    >
      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: '60px',
          height: '4px',
          borderRadius: '2px',
          background: '#ffffff',
          margin: '0 auto',
        }}
      />
      {subtitle && (
        <p
          style={{
            marginTop: '1.25rem',
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
