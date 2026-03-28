import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveMouse = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.left = `${mousePos.current.x}px`;
        cursorRef.current.style.top = `${mousePos.current.y}px`;

        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', moveMouse);
    const animationId = requestAnimationFrame(animateCursor);

    const handleEnter = () => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.width = '20px';
        cursorRef.current.style.height = '20px';
        ringRef.current.style.width = '54px';
        ringRef.current.style.height = '54px';
        ringRef.current.style.opacity = '0.9';
      }
    };

    const handleLeave = () => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.width = '12px';
        cursorRef.current.style.height = '12px';
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.opacity = '0.5';
      }
    };

    const interactiveSelectors = 'a, button, .soft-card, .timeline-item, .project-card';
    const elements = document.querySelectorAll(interactiveSelectors);
    elements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      cancelAnimationFrame(animationId);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={ringRef} className="cursor-ring"></div>
    </>
  );
};

const ProjectCard = ({ title, tech, image, github, live }) => {
  return (
    <div className="project-card reveal">
      <div className="project-image-wrapper">
        <img src={image} alt={title} className="project-image" />
        <div className="project-overlay">
          <div className="project-links">
            <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.65rem' }}>GitHub ↗</a>
            <a href={live} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.65rem' }}>Live ↗</a>
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <div className="project-tech">
          {tech.map((t, i) => (
            <span key={i} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#beyond">More</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

const App = () => {
  useReveal();

  const projects = [
    { title: 'BachatBuddy', tech: ['MERN', 'JWT', 'Nodemailer'], image: '/assets/bb.png', github: 'https://github.com/ksingla1885/Bachat_Buddy', live: 'https://bachatbuddy-puce.vercel.app/' },
    { title: 'IntelliMart', tech: ['PERN', 'Tailwind', 'Nodemailer', 'Cloudinary', 'JWT', 'Supabase'], image: '/assets/im.png', github: 'https://github.com/ksingla1885/IntelliMart', live: 'https://intelli-mart.vercel.app' },
    { title: 'Orvanta Health', tech: ['MERN', 'RBAC', 'JWT', 'Nodemailer', 'Cloudinary'], image: '/assets/oh.png', github: 'https://github.com/ksingla1885/Orvanta-Health', live: 'https://orvanta-health.vercel.app/' },
    { title: 'CodeSync', tech: ['MERN', 'Collaborative platform', 'Nodemailer'], image: '/assets/cs.png', github: 'https://github.com/ksingla1885/CodeSync', live: 'https://code-sync-chi-gold.vercel.app/' },
    { title: 'Minodra', tech: ['Next.js', 'RBAC', 'JWT', 'Nodemailer', 'Supabase', 'S3 storage',], image: '/assets/mindora.png', github: 'https://github.com/ksingla1885/Mindora', live: 'https://mind-ora.vercel.app/' },
  ];

  return (
    <div className="portfolio">
      <CustomCursor />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section id="home" className="hero">
        <div className="hero-bg-number">01</div>
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="eyebrow-line"></div>
            <span className="eyebrow-text">Full-Stack Developer</span>
          </div>
          <h1 className="hero-name">
            <span className="filled">Ketan</span>
            <span>Kumar</span>
          </h1>
          <p className="hero-tagline">
            Transforming ideas into scalable <strong>MERN</strong> applications by combining clean architecture with thoughtful design.
          </p>
          <div className="hero-cta">
            <a href="https://www.linkedin.com/in/ketan-kumar1885" target="_blank" className="btn btn-primary">LinkedIn ↗</a>
            <a href="mailto:ketansingla7988@gmail.com" className="btn btn-secondary">Get in touch</a>
          </div>
        </div>
        <div className="hero-card reveal">
          <div className="card-header">
            <div className="card-dot dot-red"></div>
            <div className="card-dot dot-yellow"></div>
            <div className="card-dot dot-green"></div>
            <span className="card-label">ketan1885 ~ %</span>
          </div>
          <div className="stat-grid">
            <div className="stat-item">
              <div className="stat-num">2+</div>
              <div className="stat-label">YEARS CODING</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">10+</div>
              <div className="stat-label">TECH TOOLS</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">5+</div>
              <div className="stat-label">DATABASES</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">∞</div>
              <div className="stat-label">CURIOSITY</div>
            </div>
          </div>
          <div className="skill-tags">
            {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'REST API', 'JAVA', 'Data Structures & Algorithms'].map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH MARQUEE ═══ */}
      <section className="tech-section" style={{ padding: 0 }}>
        <div className="tech-marquee">
          <div className="marquee-track">
            {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'JWT · REST APIs', 'Git · GitHub', 'JAVA'].map((item, i) => (
              <div key={i} className="marquee-item"><span className="dot"></span>{item}</div>
            ))}
            {/* repeat for loop */}
            {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'JWT · REST APIs', 'Git · GitHub', 'JAVA'].map((item, i) => (
              <div key={`dup-${i}`} className="marquee-item"><span className="dot"></span>{item}</div>
            ))}
          </div>
        </div>
        <div className="tech-marquee">
          <div className="marquee-track reverse">
            {['HTML5 · CSS3', 'JavaScript', 'Postman', 'VS Code', 'Vercel', 'Netlify', 'Prompt Engineering', 'CSE · Chitkara University', 'AWS'].map((item, i) => (
              <div key={i} className="marquee-item"><span className="dot"></span>{item}</div>
            ))}
            {/* repeat for loop */}
            {['HTML5 · CSS3', 'JavaScript', 'Postman', 'VS Code', 'Vercel', 'Netlify', 'Prompt Engineering', 'CSE · Chitkara University', 'AWS'].map((item, i) => (
              <div key={`dup-${i}`} className="marquee-item"><span className="dot"></span>{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT + SKILLS ═══ */}
      <section id="about">
        <div className="section-label reveal">
          <span className="section-num">// 02</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
        </div>
        <div className="about-grid">
          <div className="reveal">
            <blockquote className="about-quote">
              Curiosity drives growth, and passion fuels progress.
            </blockquote>
            <p className="about-body">
              I’m a pre-final-year Computer Science student at <strong style={{ color: 'var(--text)' }}>Chitkara University, Punjab</strong>, focused on building scalable and impactful web applications. I’m particularly driven by the intersection of clean architecture, efficient backend systems, and intuitive user experiences.
            </p>
            <p className="about-body">
              Currently, I’m advancing my database skills with <strong style={{ color: 'var(--accent2)' }}>MySQL and Oracle DB</strong> while diving deeper into relational design, optimization, and system performance. I enjoy continuously building, learning, and refining how I approach real-world problems.
            </p>
            <p className="about-body">
              I’m actively <strong style={{ color: 'var(--accent)' }}>open to internships, collaborations</strong>, and challenging opportunities that push me to grow as a developer and problem solver.
            </p>
          </div>
          <div className="skill-bars reveal" style={{ transitionDelay: '0.2s' }}>
            {[
              { name: 'FRONTEND ARCHITECTURE', pct: 90, delay: '0.3s' },
              { name: 'BACKEND SYSTEMS (Node/Express)', pct: 85, delay: '0.5s' },
              { name: 'DATABASE SCHEMA DESIGN', pct: 78, delay: '0.7s' },
              { name: 'RESTFUL API ENGINEERING', pct: 88, delay: '0.9s' },
              { name: 'JAVA CORE & ALGORITHMS', pct: 80, delay: '1.1s' },
            ].map((skill, i) => (
              <div key={i} className="skill-bar-item" style={{ marginBottom: '1.4rem' }}>
                <div className="skill-bar-header">
                  <span className="skill-bar-name">{skill.name}</span>
                  <span className="skill-bar-pct">{skill.pct}%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: `${skill.pct}%`, animationDelay: skill.delay }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS (NEW) ═══ */}
      <section id="projects">
        <div className="section-label reveal">
          <span className="section-num">// 03</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider"></div>
        </div>
        <div className="projects-grid">
          {projects.map((proj, i) => (
            <ProjectCard key={i} {...proj} />
          ))}
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section id="education" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-label reveal">
          <span className="section-num">// 04</span>
          <h2 className="section-title">Education</h2>
          <div className="section-divider"></div>
        </div>
        <div className="timeline">
          <div className="timeline-item reveal">
            <div className="timeline-date">2023 — 2027</div>
            <div className="timeline-title">B.E. in Computer Science Engineering</div>
            <div className="timeline-sub">Chitkara University, Punjab</div>
            <div className="timeline-desc">
              Pursuing a comprehensive program in Computer Science with specialisation in modern web technologies, databases, algorithms, and software engineering principles. Active participant in tech communities and collaborative projects.
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ENGINEERING MINDSET (REFINED) ═══ */}
      <section>
        <div className="section-label reveal">
          <span className="section-num">// 05</span>
          <h2 className="section-title">Engineering Mindset</h2>
          <div className="section-divider"></div>
        </div>

        <div className="philosophy-grid">
          {[
            {
              icon: '🧠',
              title: 'Structured Thinking',
              desc: 'Breaking down complex problems into clear, scalable and maintainable solutions.',
              delay: '0.0s'
            },
            {
              icon: '🤝',
              title: 'Collaborative Execution',
              desc: 'Working seamlessly with teams while maintaining clarity in communication and code.',
              delay: '0.1s'
            },
            {
              icon: '📈',
              title: 'Scalable Systems',
              desc: 'Designing solutions that perform reliably from small use cases to large-scale systems.',
              delay: '0.2s'
            },
            {
              icon: '⚙️',
              title: 'Engineering Craft',
              desc: 'Focusing on clean architecture, performance, and long-term maintainability.',
              delay: '0.3s'
            },
          ].map((philo, i) => (
            <div key={i} className="philosophy-item reveal" style={{ transitionDelay: philo.delay }}>

              <div className="philo-head">
                <div className="philo-icon">{philo.icon}</div>
                <h3 className="philo-title">{philo.title}</h3>
              </div>

              <p className="philo-desc">{philo.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ LIFE.SYSTEM (BEYOND CODE) ═══ */}
      <section id="beyond" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-label reveal">
          <span className="section-num">// 06</span>
          <h2 className="section-title">Beyond Code</h2>
          <div className="section-divider"></div>
        </div>

        <div className="lifestyle-grid">
          {[
            {
              cat: 'Exploring',
              text: 'Latest trends, new technologies, and digital architectures.',
              delay: '0s'
            },
            {
              cat: 'Watching',
              text: 'Sci-fi worlds, mind-bending plots, and human psychology.',
              delay: '0.1s'
            },
            {
              cat: 'Capturing',
              text: 'Real-life moments, raw emotions, and urban stories.',
              delay: '0.2s'
            },
            {
              cat: 'Listening',
              text: 'Lo-fi focus beats and timeless Hindi classics.',
              delay: '0.3s'
            },
          ].map((item, i) => (
            <div key={i} className="lifestyle-item reveal" style={{ transitionDelay: item.delay }}>

              <div className="life-header">
                <span className="life-cat">{item.cat}</span>
              </div>

              <div className="life-text">{item.text}</div>

              <div className="life-bar">
                <div className="life-bar-fill"></div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div className="reveal">
            <h2 className="contact-headline">
              Let's<br />
              <span className="outline">Build</span><br />
              Together.
            </h2>
            <p className="contact-sub">
              Open to internships, collaborations, and challenging opportunities that push me to grow as a developer and problem solver. If you have an idea or an opportunity, let's talk.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <a href="https://github.com/ksingla1885" target="_blank" className="btn btn-primary">GitHub ↗</a>
            </div>
          </div>
          <div className="contact-links reveal" style={{ transitionDelay: '0.2s' }}>
            {[
              { icon: '💼', label: 'LINKEDIN', value: 'ketan-kumar', link: 'https://www.linkedin.com/in/ketan-kumar1885' },
              { icon: '✉️', label: 'EMAIL', value: 'ketansingla7988@gmail.com', link: 'mailto:ketansingla7988@gmail.com' },
              { icon: '✉️', label: 'EMAIL (ALT)', value: 'heyketankumar@gmail.com', link: 'mailto:heyketankumar@gmail.com' },
              { icon: '🐙', label: 'GITHUB', value: 'ksingla1885', link: 'https://github.com/ksingla1885' },
            ].map((link, i) => (
              <a key={i} href={link.link} target="_blank" className="contact-link">
                <span className="link-icon">{link.icon}</span>
                <span>
                  <span className="link-label">{link.label}</span>
                  <span className="link-value">{link.value}</span>
                </span>
                <span className="link-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div className="footer-left">© 2026 Ketan Kumar · All rights reserved</div>
        <div className="footer-right">Built with <span>♥</span></div>
      </footer>
    </div>
  );
};

export default App;
