'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import PixelTransition from './PixelTransition';
import MusicPlayer from './ui/music-player';
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
  const handlePixelHover = async () => {
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'Pixel Card Hover',
          scenario: 'User Interaction',
          result: 'Hovered over the pixel card',
          details: 'A user hovered over the pixel transition card in the About Me section.',
        }),
      });
    } catch (error) {
      console.error('Failed to notify hover:', error);
    }
  };

  return (
    <section id="about">
      <div className="container">
        <SectionHeader title="About Me" />

        <div className="about__content">
          <motion.div 
            className="about__image-container"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <PixelTransition
              firstContent={
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src="./cat.jpg"
                    alt="default pixel transition content, a cat!"
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </div>
              }
              secondContent={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#111",
                    padding: "20px",
                    boxSizing: "border-box"
                  }}
                >
                  <div style={{ flex: 1, display: "grid", placeItems: "center" }}>
                    <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
                  </div>
                  <div style={{ width: "100%", padding: "0 10px", display: "flex", justifyContent: "center" }}>
                    <MusicPlayer
                      tracks={[{ title: "chipi chipi chapa chapa", artist: "The Cat", src: "/audio.mp3", artwork: "/cat1.jpg" }]}
                      accentColor="#ff6a00"
                      className="w-full"
                    />
                  </div>
                </div>
              }
              gridSize={8}
              pixelColor="#ffffff"
              once={false}
              animationStepDuration={0.4}
              className="custom-pixel-card"
              onHover={handlePixelHover}
              style={{ flex: 1, height: '100%', minHeight: '350px' }}
            />
            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#a1a1aa', fontSize: '0.9rem' }}>
              Psst, hover the card!
            </p>
          </motion.div>

          <motion.div
            className="about__card glass-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >          <p className="about__text">
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
      </div>

    </section>
  );
}
