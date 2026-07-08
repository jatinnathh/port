'use client';

import { motion } from 'motion/react';
import RotatingText from './RotatingText';
import './Hero.css';

const socials = [
  { href: 'https://github.com/jatinnathh', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/jatinnath1', icon: 'fab fa-linkedin', label: 'LinkedIn' },
  { href: 'https://leetcode.com/u/Jatin_Nath/', icon: 'fas fa-code', label: 'LeetCode' },
  { href: 'mailto:jatinnath1111@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__container">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            className="hero__greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Hi there, I&apos;m
          </motion.p>

          <h1 className="hero__title">
            <span className="gradient-text">Jatin Nath</span>
          </h1>

          <div className="hero__subtitle">
            <RotatingText
              texts={['Software Engineer', 'AI Developer', 'Full-Stack Builder', 'Problem Solver']}
              mainClassName="hero__rotating"
              rotationInterval={2500}
              staggerDuration={0.03}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            />
          </div>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            CS (AI & Data Science) undergrad building scalable, production-grade systems.{' '}
            <strong>Hackathon winner</strong> at TetherX (VIT Chennai). Experienced in
            full-stack development, REST APIs, Docker, and cloud deployment on AWS.
          </motion.p>

          <motion.div
            className="hero__buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <a href="#projects" className="hero__btn hero__btn--primary">
              <span>View My Work</span>
              <i className="fas fa-arrow-right" />
            </a>
            <a href="#contact" className="hero__btn hero__btn--secondary">
              <span>Get In Touch</span>
              <i className="fas fa-paper-plane" />
            </a>
            <a
              href="/Jatin_Nath.pdf"
              download
              className="hero__btn hero__btn--outline"
            >
              <span>Resume</span>
              <i className="fas fa-download" />
            </a>
          </motion.div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="hero__social-link"
                title={social.label}
              >
                <i className={social.icon} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="hero__mouse">
            <div className="hero__mouse-wheel" />
          </div>
          <span>Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
}
