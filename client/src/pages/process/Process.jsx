import React, { useState } from "react";
import { createPortal } from "react-dom";
import LeadForm from "../../Components/LeadForm/LeadForm";
import "./process.css";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Understanding Your Vision",
    description: "We begin by diving deep into your brand, goals, and target audience. Through collaborative workshops and detailed briefs, we uncover the insights that will shape your project.",
    details: [
      "In-depth brand audit & competitor analysis",
      "Target audience research & personas",
      "Goal setting & KPI definition",
      "Moodboard & creative direction",
      "Project scope & timeline planning"
    ],
    duration: "3-5 days",
    icon: "🔍"
  },
  {
    number: "02",
    title: "Strategy",
    subtitle: "Crafting the Blueprint",
    description: "With insights in hand, we develop a comprehensive strategy that aligns creative vision with business objectives. Every decision is purposeful.",
    details: [
      "Creative concept development",
      "Content strategy & messaging framework",
      "Visual identity direction",
      "Platform-specific optimization plans",
      "Budget allocation & resource planning"
    ],
    duration: "4-7 days",
    icon: "📋"
  },
  {
    number: "03",
    title: "Creation",
    subtitle: "Bringing Ideas to Life",
    description: "Our team of designers, videographers, and content creators execute the vision with precision. Regular check-ins ensure we stay aligned with your expectations.",
    details: [
      "Storyboarding & scriptwriting",
      "Design mockups & prototypes",
      "Video production & editing",
      "Motion graphics & animations",
      "Iterative refinements with feedback"
    ],
    duration: "2-4 weeks",
    icon: "🎨"
  },
  {
    number: "04",
    title: "Review",
    subtitle: "Perfecting Every Detail",
    description: "We present the work for your review, incorporating your feedback to ensure the final output exceeds expectations. Quality is non-negotiable.",
    details: [
      "Comprehensive presentation & walkthrough",
      "Structured feedback collection",
      "Revision rounds (up to 3 included)",
      "Quality assurance & testing",
      "Stakeholder sign-off process"
    ],
    duration: "3-5 days",
    icon: "✅"
  },
  {
    number: "05",
    title: "Delivery",
    subtitle: "Launch-Ready Assets",
    description: "Final assets are delivered in all required formats, optimized for their intended platforms. We ensure you have everything needed for a successful launch.",
    details: [
      "Multi-format export (web, social, print)",
      "Asset organization & naming conventions",
      "Brand guidelines documentation",
      "Platform-specific optimization",
      "Launch support & guidance"
    ],
    duration: "1-2 days",
    icon: "🚀"
  }
];

const whyChooseUs = [
  {
    icon: "⚡",
    title: "Week-1 Deliverables",
    description: "Get stakeholders aligned fast with early-stage assets and progress updates."
  },
  {
    icon: "🎯",
    title: "Production-Grade Quality",
    description: "Assets ready for ads, launch pages, and social campaigns — no compromises."
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    description: "No surprise add-ons or hidden scope. What we quote is what you pay."
  },
  {
    icon: "📞",
    title: "Weekly Pulse Calls",
    description: "Regular check-ins plus async updates directly in your workspace."
  }
];

const stats = [
  { value: "24hrs", label: "Average Response Time" },
  { value: "50+", label: "Projects Delivered" },
  { value: "4.9★", label: "Client Satisfaction" },
  { value: "99%", label: "On-Time Delivery" }
];

export default function Process() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="process-page">
      {/* HERO SECTION */}
      <section className="process-hero">
        <div className="container">
          <div className="process-hero-content">
            <h1 className="headline" data-aos="fade-up" data-aos-delay="100">
              How We Bring Your<br />Vision to Life
            </h1>
            <p className="sub" data-aos="fade-up" data-aos-delay="200">
              A transparent, battle-tested workflow designed to deliver exceptional results 
              on time and within budget. No surprises, just outstanding work.
            </p>
            <div className="process-hero-cta" data-aos="fade-up" data-aos-delay="300">
              <button className="cta-btn" onClick={() => setModalOpen(true)}>
                Start a Project
              </button>
              <a href="#process-steps" className="btn-outline">
                See the Process
              </a>
            </div>
          </div>
        </div>
        <div className="process-hero-bg"></div>
      </section>

      {/* STATS BAR */}
      <section className="process-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="stat-item"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section id="process-steps" className="process-steps-section">
        <div className="container">
          <div className="section-header">
            <h2 className="title" data-aos="fade-up" data-aos-delay="100">
              Our Proven Workflow
            </h2>
          </div>

          {/* Timeline Navigation */}
          <div className="timeline-nav">
            {processSteps.map((step, i) => (
              <button
                key={i}
                className={`timeline-btn ${activeStep === i ? 'active' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <span className="timeline-number">{step.number}</span>
                <span className="timeline-title">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Detail */}
          <div className="step-detail">
            <div className="step-detail-grid">
              <div className="step-detail-content">
                <div className="step-icon">{processSteps[activeStep].icon}</div>
                <div className="step-number">{processSteps[activeStep].number}</div>
                <h3 className="step-title">{processSteps[activeStep].title}</h3>
                <span className="step-subtitle">{processSteps[activeStep].subtitle}</span>
                <p className="step-description">{processSteps[activeStep].description}</p>
                <div className="step-duration">
                  <span className="duration-icon">⏱</span>
                  <span>Typical Duration: <strong>{processSteps[activeStep].duration}</strong></span>
                </div>
              </div>
              <div className="step-detail-list">
                <h4>What's Included</h4>
                <ul>
                  {processSteps[activeStep].details.map((detail, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* All Steps Cards */}
          <div className="steps-cards">
            {processSteps.map((step, i) => (
              <div 
                key={i}
                className={`step-card ${activeStep === i ? 'active' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="step-card-header">
                  <span className="step-card-number">{step.number}</span>
                  <span className="step-card-icon">{step.icon}</span>
                </div>
                <h4 className="step-card-title">{step.title}</h4>
                <p className="step-card-desc">{step.subtitle}</p>
                <span className="step-card-duration">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            
            <h2 className="title" data-aos="fade-up" data-aos-delay="100">
              Built for Results
            </h2>
          </div>

          <div className="why-grid">
            {whyChooseUs.map((item, i) => (
              <div 
                key={i}
                className="why-card"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="why-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="process-faq">
        <div className="container">
          <div className="section-header">
           
            <h2 className="title" data-aos="fade-up" data-aos-delay="100">
              Frequently Asked
            </h2>
          </div>

          <div className="faq-grid">
            {[
              {
                q: "How long does a typical project take?",
                a: "Most projects are completed within 2-4 weeks, depending on scope. We'll provide a detailed timeline during our initial consultation."
              },
              {
                q: "What's included in the revision rounds?",
                a: "Each project includes up to 3 revision rounds. We gather structured feedback to ensure we address all your concerns efficiently."
              },
              {
                q: "Do you work with startups?",
                a: "Absolutely! We love working with startups and have flexible packages designed specifically for early-stage companies."
              },
              {
                q: "What formats will I receive?",
                a: "You'll receive all assets in multiple formats optimized for web, social media, and print as needed. We also provide source files upon request."
              },
              {
                q: "How do payments work?",
                a: "We typically work with a 50% upfront deposit and 50% upon completion. For larger projects, we can arrange milestone-based payments."
              },
              {
                q: "Can I request changes after delivery?",
                a: "Yes! We offer post-delivery support packages for ongoing adjustments and updates. Just reach out and we'll accommodate your needs."
              }
            ].map((faq, i) => (
              <div 
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => toggleFaq(i)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
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
    </main>
  );
}
