'use client';

import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__brand gradient-text">JN</span>
          <span className="footer__copy">
            © {new Date().getFullYear()} Jatin Nath. All rights reserved.
          </span>
        </div>

        <div className="footer__socials">
          <a href="https://github.com/jatinnathh" target="_blank" rel="noopener noreferrer" title="GitHub">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/jatinnath1" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <i className="fab fa-linkedin" />
          </a>
          <a href="https://leetcode.com/u/Jatin_Nath/" target="_blank" rel="noopener noreferrer" title="LeetCode">
            <i className="fas fa-code" />
          </a>
          <a href="mailto:jatinnath1111@gmail.com" title="Email">
            <i className="fas fa-envelope" />
          </a>
        </div>

        <button className="footer__top-btn" onClick={scrollToTop} title="Back to top">
          <i className="fas fa-arrow-up" />
        </button>
      </div>
    </footer>
  );
}
