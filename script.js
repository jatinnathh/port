// ====================
// DOM Content Loaded
// ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initCursorGlow();
    initCounterAnimation();
    initNavHighlight();
    initSmoothScrolling();
    initProjectCardTilt();
    initSkillItemPulse();
    initCopyEmail();
    initParallax();
    initAchievementCard();
    initMagneticButtons();
    initTitleUnderlineAnimation();
    initTagHover();
    initScrollProgress();
    initContactCardGlow();
    initKeyboardNavigation();
    initVisibilityChange();
    initConsoleEasterEgg();
    initLazyLoading();
    initReducedMotion();
});

// ====================
// Loading Animation
// ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ====================
// Navigation
// ====================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ====================
// Typing Effect
// ====================
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const titles = [
        'Software Engineer',
        'Full-Stack Developer',
        'AI & ML Engineer',
        'Hackathon Winner 🏆',
        'Backend Developer',
        'Data Scientist'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    typingElement.parentNode.insertBefore(cursor, typingElement.nextSibling);

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
}

// ====================
// Scroll Reveal Animations
// ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    const staggerElements = document.querySelectorAll(
        '.project-card, .skill-category, .certification-card, .education-card, ' +
        '.contact-item, .course-item, .stat-item, .achievement-card, ' +
        '.timeline-item, .language-item'
    );

    const sectionGroups = new Map();

    staggerElements.forEach(el => {
        const section = el.closest('section');
        if (!section) return;
        const sectionId = section.id || section.className;
        if (!sectionGroups.has(sectionId)) {
            sectionGroups.set(sectionId, []);
        }
        sectionGroups.get(sectionId).push(el);
    });

    sectionGroups.forEach((elements) => {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const index = elements.indexOf(el);
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 120);
                    staggerObserver.unobserve(el);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            staggerObserver.observe(el);
        });
    });
}

// ====================
// Cursor Glow Effect
// ====================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let isVisible = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
            glow.classList.add('active');
            isVisible = true;
        }
    });

    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
        isVisible = false;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();

    const interactiveElements = document.querySelectorAll(
        '.btn, .spline-social-icon, .project-link, .nav-link, .skill-item, .tag'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            glow.style.width = '400px';
            glow.style.height = '400px';
            glow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)';
        });
        el.addEventListener('mouseleave', () => {
            glow.style.width = '300px';
            glow.style.height = '300px';
            glow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)';
        });
    });
}

// ====================
// Counter Animation
// ====================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    let animated = false;
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach((counter, i) => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    setTimeout(() => {
                        animateCounter(counter, target);
                    }, i * 200);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(statsSection);
}

function animateCounter(element, target) {
    const duration = 1800;
    const startTime = performance.now();
    const label = element.parentElement.querySelector('.stat-label');
    const isPercentage = label && label.textContent.includes('%');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easedProgress * target);

        if (isPercentage) {
            element.textContent = current + '%';
        } else if (target > 1) {
            element.textContent = current + '+';
        } else {
            element.textContent = current;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isPercentage) {
                element.textContent = target + '%';
            } else if (target > 1) {
                element.textContent = target + '+';
            } else {
                element.textContent = target;
            }
        }
    }

    requestAnimationFrame(update);
}

// ====================
// Active Nav Highlight
// ====================
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// ====================
// Smooth Scrolling
// ====================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight - 10;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================
// Project Card 3D Tilt
// ====================
function initProjectCardTilt() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        let bounds;

        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
            if (!bounds) bounds = card.getBoundingClientRect();

            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-10px) 
                scale(1.02)
            `;
            card.style.transition = 'transform 0.1s ease-out';

            const shine = `radial-gradient(
                600px circle at ${x}px ${y}px,
                rgba(255,255,255,0.06),
                transparent 40%
            )`;
            card.style.background = `${shine}, var(--card-bg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.4s ease, background 0.4s ease';
            card.style.background = 'var(--card-bg)';
            bounds = null;
        });
    });
}

// ====================
// Skill Items Pulse
// ====================
function initSkillItemPulse() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }

            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%; left: 50%;
                width: 0; height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                transform: translate(-50%, -50%);
                animation: skill-ripple 0.6s ease-out forwards;
                pointer-events: none;
            `;
            item.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    if (!document.getElementById('skill-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'skill-ripple-style';
        style.textContent = `
            @keyframes skill-ripple {
                to { width: 200px; height: 200px; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ====================
// Copy Email on Click
// ====================
function initCopyEmail() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        const tooltip = document.createElement('span');
        tooltip.textContent = 'Click to copy';
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.95);
            color: #000;
            padding: 5px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            bottom: calc(100% + 8px);
            left: 50%;
            transform: translateX(-50%) translateY(5px);
            white-space: nowrap;
            z-index: 100;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        const parent = link.parentElement;
        if (parent) {
            parent.style.position = 'relative';
            parent.appendChild(tooltip);
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');

            navigator.clipboard.writeText(email).then(() => {
                tooltip.textContent = '✓ Copied!';
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
                tooltip.style.background = '#4ade80';

                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateX(-50%) translateY(5px)';
                    setTimeout(() => {
                        tooltip.textContent = 'Click to copy';
                        tooltip.style.background = 'rgba(255, 255, 255, 0.95)';
                    }, 300);
                }, 2000);
            }).catch(() => {
                window.location.href = link.getAttribute('href');
            });
        });

        link.addEventListener('mouseenter', () => {
            if (tooltip.textContent === 'Click to copy') {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }
        });

        link.addEventListener('mouseleave', () => {
            if (tooltip.textContent === 'Click to copy') {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(5px)';
            }
        });
    });
}

// ====================
// Parallax Effect
// ====================
function initParallax() {
    const circles = document.querySelectorAll('.circle');
    const particles = document.querySelectorAll('.particle');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                circles.forEach((circle, index) => {
                    const speed = 0.3 + (index * 0.15);
                    circle.style.transform = `translateY(${scrolled * speed}px)`;
                });

                particles.forEach((particle, index) => {
                    const speed = 0.1 + (index * 0.05);
                    particle.style.marginTop = `${scrolled * speed}px`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// ====================
// Achievement Card Effects
// ====================
function initAchievementCard() {
    const trophyCard = document.querySelector('.trophy-card');
    if (!trophyCard) return;

    trophyCard.addEventListener('mousemove', (e) => {
        const rect = trophyCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = trophyCard.querySelector('.achievement-glow');
        if (glow) {
            glow.style.background = `radial-gradient(
                600px circle at ${x}px ${y}px,
                rgba(255, 215, 0, 0.06),
                transparent 40%
            )`;
        }

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        trophyCard.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-8px)
        `;
        trophyCard.style.transition = 'transform 0.1s ease-out';
    });

    trophyCard.addEventListener('mouseleave', () => {
        trophyCard.style.transform = '';
        trophyCard.style.transition = 'transform 0.4s ease';

        const glow = trophyCard.querySelector('.achievement-glow');
        if (glow) {
            glow.style.background = 'radial-gradient(circle at center, rgba(255, 215, 0, 0.03) 0%, transparent 50%)';
        }
    });
}

// ====================
// Magnetic Buttons
// ====================
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            btn.style.transition = 'transform 0.15s ease-out';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.4s ease';
        });
    });
}

// ====================
// Title Underline Animation
// ====================
function initTitleUnderlineAnimation() {
    const underlines = document.querySelectorAll('.title-underline');

    const underlineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '100px';
                entry.target.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                underlineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    underlines.forEach(line => {
        line.style.width = '0';
        underlineObserver.observe(line);
    });
}

// ====================
// Tag Hover Interaction
// ====================
function initTagHover() {
    const tags = document.querySelectorAll('.tag');

    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const parent = tag.parentElement;
            if (!parent) return;
            const siblings = parent.querySelectorAll('.tag');
            siblings.forEach(sibling => {
                if (sibling !== tag) {
                    sibling.style.opacity = '0.6';
                    sibling.style.transition = 'opacity 0.2s ease';
                }
            });
        });

        tag.addEventListener('mouseleave', () => {
            const parent = tag.parentElement;
            if (!parent) return;
            const siblings = parent.querySelectorAll('.tag');
            siblings.forEach(sibling => {
                sibling.style.opacity = '1';
            });
        });
    });
}

// ====================
// Scroll Progress Bar
// ====================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #ffffff 0%, #cccccc 50%, #888888 100%);
        z-index: 10001;
        transition: width 0.1s ease-out;
        width: 0%;
        box-shadow: 0 0 10px rgba(255,255,255,0.3);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ====================
// Contact Card Glow
// ====================
function initContactCardGlow() {
    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            item.style.background = `
                radial-gradient(
                    300px circle at ${x}px ${y}px,
                    rgba(255,255,255,0.04),
                    transparent 40%
                ),
                var(--card-bg)
            `;
        });

        item.addEventListener('mouseleave', () => {
            item.style.background = 'var(--card-bg)';
            item.style.transition = 'background 0.3s ease';
        });
    });
}

// ====================
// Keyboard Navigation
// ====================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    if (!document.getElementById('keyboard-nav-style')) {
        const style = document.createElement('style');
        style.id = 'keyboard-nav-style';
        style.textContent = `
            .keyboard-nav *:focus {
                outline: 2px solid rgba(255, 255, 255, 0.6) !important;
                outline-offset: 3px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ====================
// Tab Visibility Change
// ====================
function initVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = 'Come back! 👋 — Jatin Nath';
        } else {
            document.title = 'Jatin Nath — Software Engineer & AI Developer';
        }
    });
}

// ====================
// Console Easter Egg
// ====================
function initConsoleEasterEgg() {
    console.log(
        '%c👋 Hello there!',
        'color: #ffffff; font-size: 22px; font-weight: bold; text-shadow: 0 0 10px rgba(255,255,255,0.5);'
    );
    console.log(
        '%cLooking at my code? I like your style! 🚀',
        'color: #cccccc; font-size: 14px;'
    );
    console.log(
        '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'color: #555;'
    );
    console.log(
        '%c📧 jatinnath1111@gmail.com\n🔗 github.com/jatinnathh\n🏆 Hackathon Winner — TetherX, VIT Chennai',
        'color: #888; font-size: 12px; line-height: 1.8;'
    );
}

// ====================
// Lazy Loading
// ====================
function initLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================
// Reduced Motion
// ====================
function initReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');

        document.querySelectorAll('.circle, .particle, .badge-dot, .mouse-wheel').forEach(el => {
            el.style.animation = 'none';
        });

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.transition = 'none';
            el.classList.add('active');
        });
    }
}
window.addEventListener("load", () => {
    const spline = document.querySelector(".spline-scene");
    if (spline) {
        setTimeout(() => {
            spline.style.opacity = "1";
        }, 300);
    }
});