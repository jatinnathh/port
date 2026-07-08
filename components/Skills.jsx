'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import SectionHeader from './SectionHeader';
import BorderGlow from './BorderGlow';
import './Skills.css';

const InfiniteMenu = dynamic(() => import('./InfiniteMenu'), { ssr: false });

const menuItems = [
  {
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=400&fit=crop',
    link: '#skills',
    title: 'Languages',
    description: 'Python · C++ · JavaScript · TypeScript · SQL · C',
  },
  {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop',
    link: '#skills',
    title: 'Backend & APIs',
    description: 'Node.js · Express · FastAPI · Flask · REST API · Socket.IO',
  },
  {
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=400&fit=crop',
    link: '#skills',
    title: 'DevOps & Tools',
    description: 'Docker · AWS · Git · Linux · Vercel · MLflow',
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    link: '#skills',
    title: 'Frontend',
    description: 'React · Next.js · TypeScript · Tailwind CSS',
  },
  {
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=400&fit=crop',
    link: '#skills',
    title: 'ML/AI',
    description: 'PyTorch · TensorFlow · scikit-learn · OpenCV · Hugging Face',
  },
  {
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop',
    link: '#skills',
    title: 'CS Fundamentals',
    description: 'DSA · OOP · OS · DBMS · Computer Networks',
  },
];

const skillCategories = [
  {
    title: 'Languages',
    icon: 'fas fa-code',
    skills: [
      { icon: 'fab fa-python', name: 'Python' },
      { icon: 'fas fa-file-code', name: 'C++' },
      { icon: 'fab fa-js', name: 'JavaScript' },
      { icon: 'fas fa-code', name: 'TypeScript' },
      { icon: 'fas fa-database', name: 'SQL' },
      { icon: 'fas fa-file-code', name: 'C' },
    ],
  },
  {
    title: 'CS Fundamentals',
    icon: 'fas fa-graduation-cap',
    skills: [
      { icon: 'fas fa-sitemap', name: 'DSA' },
      { icon: 'fas fa-cubes', name: 'OOP' },
      { icon: 'fas fa-server', name: 'Operating Systems' },
      { icon: 'fas fa-database', name: 'DBMS' },
      { icon: 'fas fa-network-wired', name: 'Computer Networks' },
      { icon: 'fas fa-drafting-compass', name: 'Software Engineering' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'fas fa-server',
    skills: [
      { icon: 'fab fa-node-js', name: 'Node.js' },
      { icon: 'fas fa-route', name: 'Express.js' },
      { icon: 'fas fa-bolt', name: 'FastAPI' },
      { icon: 'fas fa-flask', name: 'Flask' },
      { icon: 'fas fa-plug', name: 'REST API' },
      { icon: 'fas fa-broadcast-tower', name: 'Socket.IO' },
      { icon: 'fas fa-leaf', name: 'MongoDB' },
      { icon: 'fas fa-database', name: 'MySQL' },
      { icon: 'fas fa-database', name: 'PostgreSQL' },
      { icon: 'fas fa-gem', name: 'Prisma' },
      { icon: 'fas fa-memory', name: 'Redis' },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: 'fas fa-tools',
    skills: [
      { icon: 'fab fa-docker', name: 'Docker' },
      { icon: 'fab fa-aws', name: 'AWS (EC2, S3)' },
      { icon: 'fab fa-git-alt', name: 'Git' },
      { icon: 'fab fa-github', name: 'GitHub' },
      { icon: 'fab fa-linux', name: 'Linux' },
      { icon: 'fas fa-triangle-exclamation', name: 'Vercel' },
      { icon: 'fas fa-chart-line', name: 'MLflow' },
      { icon: 'fas fa-stream', name: 'Streamlit' },
    ],
  },
  {
    title: 'Frontend',
    icon: 'fas fa-palette',
    skills: [
      { icon: 'fab fa-react', name: 'React' },
      { icon: 'fas fa-n', name: 'Next.js' },
      { icon: 'fas fa-code', name: 'TypeScript' },
      { icon: 'fas fa-wind', name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'ML/AI Frameworks',
    icon: 'fas fa-brain',
    skills: [
      { icon: 'fas fa-fire', name: 'PyTorch' },
      { icon: 'fas fa-brain', name: 'TensorFlow' },
      { icon: 'fas fa-cogs', name: 'scikit-learn' },
      { icon: 'fas fa-eye', name: 'OpenCV' },
      { icon: 'fas fa-face-smile', name: 'Hugging Face' },
      { icon: 'fas fa-table', name: 'Pandas' },
      { icon: 'fas fa-calculator', name: 'NumPy' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <SectionHeader title="Skills & Technologies" />

        {/* InfiniteMenu 3D visualization */}
        <motion.div
          className="skills__menu-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <InfiniteMenu items={menuItems} />
        </motion.div>

        {/* Detailed skill grid */}
        <div className="skills__grid">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="0 0 100"
                backgroundColor="#0a0a0a"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={0.8}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
              >
                <div className="skills__category">
                  <h3 className="skills__cat-title">
                    <i className={cat.icon} />
                    {cat.title}
                  </h3>
                  <div className="skills__items">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="skills__item">
                        <i className={skill.icon} />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

