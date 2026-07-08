'use client';

import { useEffect, useRef } from 'react';

const blobStyles = {
  blob1: {
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
    top: '-10%',
    left: '-5%',
    animation: 'float 20s ease-in-out infinite',
  },
  blob2: {
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
    top: '40%',
    right: '-10%',
    animation: 'float-delayed 25s ease-in-out infinite',
  },
  blob3: {
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
    bottom: '5%',
    left: '20%',
    animation: 'float 30s ease-in-out infinite',
  },
};

export default function AnimatedBackground() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMouseMove = (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Floating gradient blobs */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {Object.entries(blobStyles).map(([key, style]) => (
          <div
            key={key}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              filter: 'blur(80px)',
              ...style,
            }}
          />
        ))}
      </div>

      {/* Cursor glow */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  );
}
