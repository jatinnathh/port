// ==================== 
// Smooth Scrolling
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 968) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ==================== 
// Mobile Menu Toggle
// ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'none';
});

// ==================== 
// Navbar Scroll Effect
// ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    }
});

// ==================== 
// Active Link Highlighting
// ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// ==================== 
// Scroll Reveal Animation
// ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add fade-in class to elements
const elementsToAnimate = document.querySelectorAll(
    '.section-header, .about-text, .stat-item, .timeline-item, ' +
    '.project-card, .skill-category, .education-card, .certification-card, ' +
    '.contact-item'
);

elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ==================== 
// Typing Animation for Hero
// ====================
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
heroSubtitle.textContent = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// ==================== 
// Dynamic Stats Counter
// ====================
function animateCounter(element, target, duration = 2000) {
    let startTime = null;
    const startValue = 0;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const currentValue = Math.floor(progress * target);
        element.textContent = currentValue + (element.textContent.includes('%') ? '%' : '+');
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Trigger counters when stats section is visible
const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== 
// Floating Cards Interactive Animation with Cursor
// ====================
const floatingCards = document.querySelectorAll('.floating-card');
const heroImage = document.querySelector('.hero-image');

// Create custom cursor for hero area
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
customCursor.innerHTML = '<div class="cursor-inner"></div>';
document.body.appendChild(customCursor);

// Add styles for custom cursor
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.5);
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
        display: none;
    }
    .cursor-inner {
        width: 8px;
        height: 8px;
        background: #ffffff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .hero-image:hover ~ .custom-cursor,
    .hero-image .custom-cursor {
        display: block !important;
    }
`;
document.head.appendChild(style);

// Track mouse position
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Show/hide custom cursor in hero area
if (heroImage) {
    heroImage.addEventListener('mouseenter', () => {
        customCursor.style.display = 'block';
    });
    
    heroImage.addEventListener('mouseleave', () => {
        customCursor.style.display = 'none';
    });
}

floatingCards.forEach((card, index) => {
    // Enhanced hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.2)';
        card.style.zIndex = '10';
        card.style.boxShadow = '0 30px 60px rgba(255, 255, 255, 0.4)';
        customCursor.style.width = '60px';
        customCursor.style.height = '60px';
        customCursor.style.borderColor = 'rgba(255, 255, 255, 1)';
        customCursor.style.borderWidth = '3px';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.boxShadow = '';
        customCursor.style.width = '40px';
        customCursor.style.height = '40px';
        customCursor.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        customCursor.style.borderWidth = '2px';
    });

    // Mouse move effect - cards follow cursor with 3D tilt
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const angleX = (e.clientY - cardCenterY) / 15;
        const angleY = (cardCenterX - e.clientX) / 15;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${angleX}deg) 
            rotateY(${angleY}deg) 
            scale(1.25) 
            translateZ(30px)
        `;
        card.style.transition = 'transform 0.1s ease-out';
    });
});

// Make cards respond to cursor position in hero area - Magnetic/Repel effect
if (heroImage) {
    heroImage.addEventListener('mousemove', (e) => {
        const rect = heroImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        floatingCards.forEach((card, index) => {
            if (card.matches(':hover')) return; // Skip if directly hovering
            
            const cardRect = card.getBoundingClientRect();
            const cardX = cardRect.left + cardRect.width / 2 - rect.left;
            const cardY = cardRect.top + cardRect.height / 2 - rect.top;
            
            const distanceX = x - cardX;
            const distanceY = y - cardY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Magnetic attraction when close, repel when very close
            if (distance < 250) {
                const angle = Math.atan2(distanceY, distanceX);
                let force;
                
                if (distance < 100) {
                    // Repel effect when very close
                    force = (100 - distance) / 8;
                    const moveX = -Math.cos(angle) * force;
                    const moveY = -Math.sin(angle) * force;
                    card.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force / 40}) rotate(${force * 2}deg)`;
                } else {
                    // Magnetic attraction when at medium distance
                    force = (250 - distance) / 50;
                    const moveX = Math.cos(angle) * force;
                    const moveY = Math.sin(angle) * force;
                    card.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force / 100})`;
                }
                
                card.style.transition = 'transform 0.15s ease-out';
            } else {
                card.style.transform = '';
                card.style.transition = 'transform 0.4s ease-out';
            }
        });
    });
    
    heroImage.addEventListener('mouseleave', () => {
        floatingCards.forEach(card => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease-out';
        });
    });
}

// ==================== 
// Project Card Tilt Effect
// ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ==================== 
// Skill Items Pulse Effect
// ====================
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('i');
        icon.style.transform = '';
    });
});

// ==================== 
// Copy Email on Click
// ====================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    const tooltip = document.createElement('span');
    tooltip.textContent = 'Click to copy';
    tooltip.style.cssText = `
        position: absolute;
        background: var(--primary-color);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.8rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5px;
    `;
    
    link.parentElement.style.position = 'relative';
    link.parentElement.appendChild(tooltip);
    
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            tooltip.textContent = 'Copied!';
            tooltip.style.opacity = '1';
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.textContent = 'Click to copy';
                }, 300);
            }, 2000);
        });
    });
    
    link.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
    });
    
    link.addEventListener('mouseleave', () => {
        if (tooltip.textContent === 'Click to copy') {
            tooltip.style.opacity = '0';
        }
    });
});

// ==================== 
// Parallax Effect for Background Circles
// ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.5 + (index * 0.2);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== 
// Add Loading Animation
// ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== 
// Console Easter Egg
// ====================
console.log('%c👋 Hello there!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking at my code? I like your style! 🚀', 'color: #8b5cf6; font-size: 14px;');
console.log('%cFeel free to reach out: jatinnath1111@gmail.com', 'color: #ec4899; font-size: 12px;');

// ==================== 
// Performance Optimization
// ====================
// Lazy load images if any are added in the future
if ('IntersectionObserver' in window) {
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
// Reduce Motion for Accessibility
// ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}
