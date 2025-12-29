import React, { useState } from 'react';
import { createPortal } from "react-dom";
import LeadForm from "../Components/LeadForm/LeadForm";

const AboutPage = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const values = [
    {
      icon: '🎯',
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative solutions to stay ahead of the curve and deliver exceptional results.'
    },
    {
      icon: '🤝',
      title: 'Reliability',
      description: 'Our commitment to timely delivery and quality assurance ensures that every project meets the highest standards.'
    },
    {
      icon: '💡',
      title: 'Client Success',
      description: 'Your success is our inspiration. We work closely with you to transform ideas into impactful products that exceed expectations.'
    },
    {
      icon: '🚀',
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our work, from design to development to deployment.'
    }
  ];

  const timeline = [
    { year: '2011', title: 'Founded', description: 'JKC Software LLP was established with a vision to deliver future-ready digital solutions.' },
    { year: '2015', title: 'Expansion', description: 'Grew our team and expanded services to include mobile app development and cloud solutions.' },
    { year: '2018', title: 'Recognition', description: 'Recognized as a leading software development partner by multiple industry awards.' },
    { year: '2024', title: 'Innovation', description: 'Continuing to push boundaries with AI integration and cutting-edge technologies.' }
  ];

  const stats = [
    { value: '13+', label: 'Years Experience' },
    { value: '500+', label: 'Projects Delivered' },
    { value: '200+', label: 'Happy Clients' },
    { value: '50+', label: 'Team Members' }
  ];

  const highlights = [
    { icon: '🌍', title: 'Global Reach', desc: 'Serving clients across multiple continents with localized solutions' },
    { icon: '🏆', title: 'Industry Recognition', desc: 'Award-winning solutions recognized for innovation and excellence' },
    { icon: '💼', title: 'Business Growth', desc: 'Helping clients achieve 3x average growth in digital capabilities' },
    { icon: '🔄', title: 'Long-term Partnerships', desc: '85% client retention rate through exceptional service delivery' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#050912', color: '#ffffff', fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .about-hero-section {
          position: relative;
          padding: 140px 24px 100px;
          overflow: hidden;
          background: radial-gradient(1200px 600px at 30% 20%, rgba(109, 108, 255, 0.15), transparent),
                      radial-gradient(800px 400px at 80% 80%, rgba(255, 211, 106, 0.08), transparent),
                      linear-gradient(180deg, #050912, #070d1f 80%);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .eyebrow-badge {
          display: inline-block;
          padding: 8px 18px;
          background: rgba(109, 108, 255, 0.15);
          color: #a5a4ff;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
          border: 1px solid rgba(109, 108, 255, 0.2);
        }

        .hero-headline {
          font-size: clamp(32px, 5.5vw, 58px);
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(200, 210, 240, 0.75);
          max-width: 620px;
          margin: 0 auto;
        }

        .stats-section {
          padding: 60px 0;
          background: linear-gradient(180deg, rgba(10, 16, 28, 0.9), rgba(6, 11, 20, 0.95));
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          text-align: center;
        }

        .stat-value {
          font-size: 42px;
          font-weight: 700;
          background: linear-gradient(135deg, #fff 0%, rgba(200, 210, 255, 0.9) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(180, 190, 220, 0.65);
          font-weight: 500;
        }

        .section-padding {
          padding: 100px 24px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-kicker {
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(109, 108, 255, 0.8);
          margin-bottom: 12px;
          display: block;
        }

        .section-title {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .section-subtitle {
          font-size: 17px;
          color: rgba(180, 190, 220, 0.7);
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .mission-text {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(200, 210, 240, 0.75);
          margin-bottom: 24px;
        }

        .card-base {
          background: linear-gradient(180deg, rgba(18, 28, 46, 0.7), rgba(12, 20, 36, 0.7));
          border-radius: 20px;
          padding: 32px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s ease;
        }

        .card-base:hover {
          transform: translateY(-4px);
          border-color: rgba(109, 108, 255, 0.3);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.25);
        }

        .card-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #fff;
        }

        .card-desc {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(180, 190, 220, 0.7);
          margin: 0;
        }

        .story-bg {
          background: linear-gradient(180deg, rgba(10, 16, 28, 0.5), rgba(6, 11, 20, 0.8));
        }

        .timeline-wrapper {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(109, 108, 255, 0.3), rgba(109, 108, 255, 0.05));
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          display: flex;
          margin-bottom: 60px;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        .timeline-item:nth-child(odd) {
          justify-content: flex-start;
        }

        .timeline-item:nth-child(even) {
          justify-content: flex-end;
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, rgba(109, 108, 255, 0.8), rgba(109, 108, 255, 0.4));
          border-radius: 50%;
          border: 4px solid #0a101c;
          z-index: 2;
        }

        .timeline-content {
          width: 45%;
        }

        .timeline-year {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, rgba(109, 108, 255, 0.8), rgba(109, 108, 255, 0.5));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }

        .timeline-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #fff;
        }

        .timeline-desc {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(180, 190, 220, 0.7);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .value-card {
          background: linear-gradient(180deg, rgba(18, 28, 46, 0.6), rgba(12, 20, 36, 0.6));
          border-radius: 20px;
          padding: 36px 28px;
          border: 1px solid rgba(255,255,255,0.04);
          transition: all 0.3s ease;
          text-align: center;
          cursor: pointer;
        }

        .value-card:hover,
        .value-card.active {
          transform: translateY(-8px);
          border-color: rgba(109, 108, 255, 0.4);
          background: linear-gradient(180deg, rgba(109, 108, 255, 0.1), rgba(109, 108, 255, 0.05));
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.3);
        }

        .value-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .value-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #fff;
        }

        .value-desc {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(180, 190, 220, 0.7);
        }

        .impact-bg {
          background: linear-gradient(135deg, rgba(109, 108, 255, 0.05) 0%, rgba(255, 211, 106, 0.03) 100%);
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .highlight-card {
          background: linear-gradient(180deg, rgba(18, 28, 46, 0.7), rgba(12, 20, 36, 0.7));
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s ease;
        }

        .highlight-card:hover {
          transform: translateY(-4px);
          border-color: rgba(109, 108, 255, 0.3);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
        }

        .highlight-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .highlight-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #fff;
        }

        .highlight-desc {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(180, 190, 220, 0.7);
        }

        .cta-bg {
          background: linear-gradient(135deg, rgba(109, 108, 255, 0.08) 0%, rgba(255, 211, 106, 0.05) 100%);
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-text {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(200, 210, 240, 0.75);
          margin-bottom: 32px;
        }

        .cta-button {
          background: linear-gradient(135deg, #4a5568, #343d4d);
          color: #fff;
          padding: 18px 40px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(35, 35, 73, 0.35);
        }

        @media (max-width: 1024px) {
          .two-col-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .timeline-line {
            left: 30px;
          }

          .timeline-dot {
            left: 30px;
          }

          .timeline-item {
            justify-content: flex-end !important;
            padding-left: 80px;
          }

          .timeline-content {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .about-hero-section {
            padding: 100px 20px 70px;
          }

          .hero-headline {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .stats-section {
            padding: 48px 0;
          }

          .stat-value {
            font-size: 32px;
          }

          .section-padding {
            padding: 70px 20px;
          }

          .section-title {
            font-size: 28px;
          }

          .section-subtitle {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .about-hero-section {
            padding: 80px 16px 60px;
          }

          .hero-headline {
            font-size: 28px;
          }

          .hero-subtitle {
            font-size: 15px;
          }

          .eyebrow-badge {
            font-size: 12px;
            padding: 6px 14px;
          }

          .stats-section {
            padding: 40px 0;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .stat-value {
            font-size: 36px;
          }

          .section-padding {
            padding: 56px 16px;
          }

          .section-title {
            font-size: 24px;
          }

          .timeline-line {
            left: 20px;
          }

          .timeline-dot {
            left: 20px;
            width: 16px;
            height: 16px;
            border-width: 3px;
          }

          .timeline-item {
            padding-left: 50px;
            margin-bottom: 40px;
          }

          .cta-title {
            font-size: 24px;
          }

          .cta-text {
            font-size: 14px;
          }

          .cta-button {
            padding: 14px 28px;
            font-size: 14px;
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">
            Driven by Creativity, Powered by Technology
          </h1>
          <p className="hero-subtitle">
            Since 2011, we've been transforming ideas into impactful digital solutions, 
            helping businesses innovate and grow in the digital age.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-section">
        <div className="about-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="about-container">
          <div className="two-col-grid">
            <div>
              <h2 className="section-title">Building Tomorrow's Solutions Today</h2>
              <p className="mission-text">
                At JKC Software LLP, our mission is to deliver high-quality, future-ready digital 
                solutions that empower businesses to thrive in an ever-evolving technological landscape. 
                We believe in the power of innovation, the importance of reliability, and the value of 
                lasting partnerships.
              </p>
              <p className="mission-text">
                Our passionate team of developers, designers, project managers, and strategists work 
                closely with clients to understand their unique challenges and transform their ideas 
                into impactful products that drive real business value.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card-base">
                <div className="card-icon">🎯</div>
                <h4 className="card-title">Our Focus</h4>
                <p className="card-desc">Creating scalable, intuitive, and cutting-edge solutions that exceed expectations</p>
              </div>
              <div className="card-base">
                <div className="card-icon">⚡</div>
                <h4 className="card-title">Our Approach</h4>
                <p className="card-desc">Agile methodologies ensuring timely delivery without compromising quality</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding story-bg">
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">Over a Decade of Excellence</h2>
          </div>
          <div className="timeline-wrapper">
            <div className="timeline-line"></div>
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="card-base">
                    <div className="timeline-year">{item.year}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">What Drives Us Forward</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className={`value-card ${activeValue === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding impact-bg">
        <div className="about-container">
          <div className="two-col-grid">
            <div>
              <h2 className="section-title">Making a Difference</h2>
              <p className="mission-text">
                We measure our success by the impact we create for our clients. From startups 
                finding their footing to enterprises scaling new heights, we've been privileged 
                to be part of countless success stories.
              </p>
              <p className="mission-text">
                Whether it's building scalable applications, designing intuitive interfaces, or 
                integrating cutting-edge technologies, we ensure every project not only meets 
                but exceeds expectations, delivering tangible business results.
              </p>
            </div>
            <div className="highlights-grid">
              {highlights.map((highlight, index) => (
                <div key={index} className="highlight-card">
                  <div className="highlight-icon">{highlight.icon}</div>
                  <h4 className="highlight-title">{highlight.title}</h4>
                  <p className="highlight-desc">{highlight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding cta-bg">
        <div className="about-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Ideas?</h2>
            <p className="cta-text">
              Let's collaborate to create something extraordinary. Our team is ready to 
              bring your vision to life with innovative, reliable, and scalable solutions.
            </p>
            <button className="cta-button" onClick={() => setModalOpen(true)}>
                Start a Project
              </button>
            
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {modalOpen && createPortal(
        <div className="lead-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lead-modal-close" onClick={() => setModalOpen(false)}>×</button>
            <LeadForm onSuccess={() => setModalOpen(false)} />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AboutPage;