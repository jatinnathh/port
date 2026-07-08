'use client';

import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import './Contact.css';

const contactInfo = [
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    value: 'jatinnath1111@gmail.com',
    href: 'mailto:jatinnath1111@gmail.com',
  },
  {
    icon: 'fas fa-phone',
    title: 'Phone',
    value: '+91 96430 07622',
    href: 'tel:+919643007622',
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Location',
    value: 'New Delhi, Delhi, India',
  },
  {
    icon: 'fas fa-globe',
    title: 'Portfolio',
    value: 'jatinport.vercel.app',
    href: 'https://jatinport.vercel.app/',
    external: true,
  },
];

const socials = [
  { href: 'https://github.com/jatinnathh', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/jatinnath1', icon: 'fab fa-linkedin', label: 'LinkedIn' },
  { href: 'https://leetcode.com/u/Jatin_Nath/', icon: 'fas fa-code', label: 'LeetCode' },
  { href: 'mailto:jatinnath1111@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <SectionHeader
          title="Get In Touch"
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
        />

        <div className="contact__grid">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              className="contact__card glass-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="glass-icon-circle">
                <i className={item.icon} />
              </div>
              <div className="contact__info">
                <h4 className="contact__label">{item.title}</h4>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="contact__value contact__value--link"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="contact__value">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="contact__socials"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="contact__social-btn"
              title={s.label}
            >
              <i className={s.icon} />
              <span>{s.label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
