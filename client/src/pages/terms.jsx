import React, { useState } from 'react';

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const termsContent = [
    {
      id: 1,
      title: 'Introduction',
      icon: '📋',
      content: `Welcome to JKC Studio ("Studio," "we," "us," or "our"). These Terms of Service ("Terms") govern your use of our design, branding, and creative services. By engaging our services, you ("Client," "you," or "your") agree to be bound by these Terms.

These Terms constitute a legally binding agreement between you and JKC Studio. Please read them carefully before engaging our services. If you do not agree with any part of these Terms, please do not use our services.

We reserve the right to modify these Terms at any time. Continued use of our services after any such changes constitutes your acceptance of the new Terms.

Last Updated: December 2024`
    },
    {
      id: 2,
      title: 'Engagement Scope & Responsibilities',
      icon: '🎯',
      content: `The scope of work will be defined in a separate project proposal or creative brief, which will include:
• Detailed project deliverables and design assets
• Timeline and delivery schedule
• Design specifications, style guidelines, and requirements
• Number of concepts and revision rounds included
• Communication protocols and points of contact

Client Responsibilities:
• Provide timely feedback and approvals within agreed timeframes
• Supply all necessary content, brand materials, and inspiration
• Designate authorized representatives for design decisions
• Ensure clear communication of brand vision and objectives
• Maintain open feedback throughout the creative process

Studio Responsibilities:
• Deliver creative work that meets professional design standards
• Communicate proactively about project progress
• Maintain confidentiality of client information
• Provide source files upon project completion and full payment
• Meet agreed-upon deadlines or communicate delays promptly`
    },
    {
      id: 3,
      title: 'Fees, Payments & Revisions',
      icon: '💰',
      content: `Payment Terms:
• Project fees specified in proposal or contract
• Payment schedule: 50% upfront, 50% upon completion
• Larger projects: 40% upfront, 30% midpoint, 30% completion
• Invoices due within 7-15 days unless otherwise specified
• Late payments may incur 1.5% monthly interest charges

Revisions & Modifications:
• Each project includes 2-3 revision rounds per design phase
• Minor revisions: color adjustments, text changes, layout tweaks
• Major revisions quoted separately
• Revisions requested within 7 days after concept delivery
• Additional rounds charged at hourly rate

Refund Policy:
• Deposits non-refundable once work has commenced
• Refunds calculated based on completed phases
• No refunds after final files delivered and accepted`
    },
    {
      id: 4,
      title: 'Copyright & Licensing',
      icon: '©️',
      content: `Ownership of Creative Work:
Upon full payment, copyright transfers to Client.

Client Rights (After Full Payment):
• Full ownership and copyright of final approved designs
• Unlimited usage rights for commercial and personal use
• Right to modify, reproduce, and distribute designs
• Source files in agreed formats (AI, PSD, PDF, etc.)

Studio Reserved Rights:
• Copyright to preliminary concepts and unused designs
• Rights to general design techniques and approaches
• Portfolio usage rights (see Section 5)

Before Full Payment:
• JKC Studio retains all rights to the work
• Client may not use, reproduce, or share designs
• Watermarked previews for review purposes only`
    },
    {
      id: 5,
      title: 'Attribution & Portfolio Usage',
      icon: '🎨',
      content: `Unless otherwise agreed in writing, JKC Studio reserves the right to:

Portfolio & Marketing Rights:
• Display completed projects in portfolio and website
• Use project images and case studies for promotion
• Mention client name and project details
• Share design process in blog posts and presentations
• Enter work into design competitions

Client May Request:
• Delayed publication until project launch
• Anonymization of sensitive information
• Removal of specific project details
• Complete non-disclosure (may affect pricing)

Confidential Projects:
• Must be specified in writing before commencement
• Non-portfolio projects may incur additional fees
• NDA available upon request`
    },
    {
      id: 6,
      title: 'Confidentiality & NDA Requests',
      icon: '🔒',
      content: `Standard Confidentiality:
JKC Studio maintains strict confidentiality for all projects.

Protected Information:
• Unreleased brand strategies and campaigns
• Proprietary business information
• Unpublished product launches
• Customer data and market research
• Financial information

Our Obligations:
• No disclosure to unauthorized third parties
• Restricted access to team members only
• Security measures for digital files
• Protection during and after project

Non-Disclosure Agreements:
• Willing to sign reasonable mutual or one-way NDAs
• Request before project commencement
• Standard template available upon request
• Review within 5 business days
• Terms typically 3-5 years`
    },
    {
      id: 7,
      title: 'Client-Provided Materials',
      icon: '📁',
      content: `Client Responsibilities:
• Provide all content, copy, and text
• High-resolution images (minimum 300 DPI for print)
• Brand guidelines, logos, color codes
• Product information and descriptions
• Reference materials and inspiration

Quality Standards:
• Images must be high resolution
• Text should be final and proofread
• Logos in vector format (AI, EPS, SVG)
• Content organized and clearly labeled

Copyright & Licensing:
• Client warrants legal rights to all materials
• Client confirms proper licensing
• Client responsible for model releases
• Client indemnifies Studio against claims

Timing:
• Materials provided per project timeline
• Delays will extend project deadlines
• Late materials may affect original deadlines`
    },
    {
      id: 8,
      title: 'Limitation of Liability',
      icon: '⚖️',
      content: `General Limitations:
• Total liability not to exceed total fees paid
• Not liable for indirect or consequential damages
• Not responsible for loss of profits or revenue

Specific Exclusions:
• Client misuse or modification of designs
• Issues from client-provided materials
• Print quality from client's printer choice
• Third-party platform changes
• SEO results or business outcomes
• Future software compatibility

Design Deliverables Warranty:
• Files delivered in agreed formats
• Files free from defects and suitable for use
• Corrections within 30 days of delivery
• Void if client modifies files

Professional Standards:
• Services performed using industry best practices
• Creative expertise applied to deliver quality
• Reasonable efforts to meet expectations`
    },
    {
      id: 9,
      title: 'Termination of Services',
      icon: '🚫',
      content: `Termination by Client:
• 7 days written notice required
• Payment for all work completed to date
• Fees calculated based on completed phases
• Deposits non-refundable
• Working files provided upon payment

Termination by Studio:
• Immediate if invoices unpaid for 15+ days
• If Client breaches Terms
• If Client fails to provide materials for 30+ days
• 14 days notice for other reasonable causes

Effect of Termination:
• All outstanding invoices immediately due
• Copyright remains with Studio until paid
• Client must cease using designs/concepts
• Confidentiality obligations continue
• Neither party liable for consequential damages`
    },
    {
      id: 10,
      title: 'Governing Law & Jurisdiction',
      icon: '⚖️',
      content: `Legal Framework:
• Governed by laws of India (Karnataka State)
• Exclusive jurisdiction: Courts of Bangalore, Karnataka

Dispute Resolution:
Step 1 - Good Faith Negotiation (30 days required)
Step 2 - Mediation (optional but encouraged)
Step 3 - Binding Arbitration in Bangalore

Legal Costs:
• Prevailing party may recover reasonable costs
• Includes legal fees and arbitration fees

Exceptions:
• Court action allowed for:
  - Copyright/trademark infringement
  - Breach of confidentiality
  - Emergency situations

Waiver:
• No class action lawsuits
• All disputes resolved individually`
    },
    {
      id: 11,
      title: 'Updates to These Terms',
      icon: '🔄',
      content: `JKC Studio may update these Terms at any time.

Notification:
• Material changes communicated via email
• Posted on website with "Last Updated" date
• 30 days notice for significant changes

Acceptance:
• Continued service use constitutes acceptance
• Existing projects continue under original Terms
• New projects subject to current Terms

Client Rights:
• May terminate if disagree with material changes
• Terms at project start govern that project
• Previous versions available upon request

Major Changes Requiring Consent:
• Significant fee increases
• Copyright or ownership term changes
• Liability limitation modifications
• Payment term changes

Contact: legal@jkcstudio.com`
    }
  ];

  return (
    <div className="terms-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        .terms-page {
          min-height: 100vh;
          background: #050912;
          color: #ffffff;
          font-family: 'Poppins', system-ui, sans-serif;
        }

        .terms-page .terms-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .terms-page .terms-hero {
          position: relative;
          padding: 140px 24px 80px;
          overflow: hidden;
          background: radial-gradient(1200px 600px at 30% 20%, rgba(109, 108, 255, 0.15), transparent),
                      radial-gradient(800px 400px at 80% 80%, rgba(255, 211, 106, 0.08), transparent),
                      linear-gradient(180deg, #050912, #070d1f 80%);
        }

        .terms-page .hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .terms-page .eyebrow {
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

        .terms-page .hero-headline {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .terms-page .hero-subtitle {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(200, 210, 240, 0.75);
          max-width: 580px;
          margin: 0 auto;
        }

        .terms-page .section-padding {
          padding: 80px 24px;
        }

        .terms-page .table-of-contents {
          background: linear-gradient(180deg, rgba(18, 28, 46, 0.6), rgba(12, 20, 36, 0.6));
          border-radius: 20px;
          padding: 32px;
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 60px;
        }

        .terms-page .toc-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #fff;
        }

        .terms-page .toc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }

        .terms-page .toc-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .terms-page .toc-item:hover {
          background: rgba(109, 108, 255, 0.1);
          border-color: rgba(109, 108, 255, 0.3);
          transform: translateX(4px);
        }

        .terms-page .toc-number {
          font-size: 14px;
          font-weight: 700;
          color: rgba(109, 108, 255, 0.7);
          min-width: 24px;
        }

        .terms-page .toc-icon {
          font-size: 20px;
        }

        .terms-page .toc-text {
          font-size: 14px;
          font-weight: 500;
          flex: 1;
        }

        .terms-page .terms-section {
          background: linear-gradient(180deg, rgba(18, 28, 46, 0.5), rgba(12, 20, 36, 0.5));
          border-radius: 24px;
          padding: 40px;
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }

        .terms-page .terms-section:hover {
          border-color: rgba(109, 108, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .terms-page .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          cursor: pointer;
        }

        .terms-page .section-icon {
          font-size: 36px;
          flex-shrink: 0;
        }

        .terms-page .section-title-wrapper {
          flex: 1;
        }

        .terms-page .section-number {
          font-size: 13px;
          font-weight: 600;
          color: rgba(109, 108, 255, 0.7);
          margin-bottom: 4px;
        }

        .terms-page .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .terms-page .expand-icon {
          font-size: 24px;
          color: rgba(109, 108, 255, 0.6);
          transition: transform 0.3s;
        }

        .terms-page .expand-icon.open {
          transform: rotate(180deg);
        }

        .terms-page .section-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .terms-page .section-content.open {
          max-height: 5000px;
        }

        .terms-page .section-text {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(200, 210, 240, 0.8);
          white-space: pre-line;
        }

        .terms-page .contact-cta {
          background: linear-gradient(135deg, rgba(109, 108, 255, 0.1), rgba(255, 211, 106, 0.05));
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          margin-top: 60px;
          border: 1px solid rgba(109, 108, 255, 0.2);
        }

        .terms-page .cta-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .terms-page .cta-text {
          font-size: 15px;
          color: rgba(180, 190, 220, 0.7);
          margin-bottom: 24px;
        }

        .terms-page .cta-button {
          background: linear-gradient(135deg, #4a5568, #343d4d);
          color: #fff;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .terms-page .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(35, 35, 73, 0.35);
        }

        .terms-page .last-updated {
          text-align: center;
          padding: 40px 24px 80px;
          color: rgba(180, 190, 220, 0.6);
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .terms-page .terms-hero {
            padding: 100px 20px 60px;
          }

          .terms-page .hero-headline {
            font-size: 32px;
          }

          .terms-page .section-padding {
            padding: 60px 20px;
          }

          .terms-page .table-of-contents {
            padding: 24px 20px;
          }

          .terms-page .toc-grid {
            grid-template-columns: 1fr;
          }

          .terms-page .terms-section {
            padding: 28px 20px;
          }

          .terms-page .section-icon {
            font-size: 28px;
          }

          .terms-page .section-title {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .terms-page .terms-hero {
            padding: 80px 16px 50px;
          }

          .terms-page .hero-headline {
            font-size: 28px;
          }

          .terms-page .section-padding {
            padding: 50px 16px;
          }

          .terms-page .terms-section {
            padding: 24px 16px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="terms-hero">
        <div className="hero-content">
          <h1 className="hero-headline">
            Terms of Service
          </h1>
          <p className="hero-subtitle">
            Please read these terms carefully before engaging our design and creative services. 
            These terms govern our professional relationship and protect both parties.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="terms-container">
          {/* Table of Contents */}
          <div className="table-of-contents">
            <h2 className="toc-title">Table of Contents</h2>
            <div className="toc-grid">
              {termsContent.map((section) => (
                <div
                  key={section.id}
                  className="toc-item"
                  onClick={() => {
                    const element = document.getElementById(`section-${section.id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setActiveSection(section.id);
                    }
                  }}
                >
                  <span className="toc-number">{section.id}.</span>
                  <span className="toc-icon">{section.icon}</span>
                  <span className="toc-text">{section.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terms Sections */}
          {termsContent.map((section) => (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="terms-section"
            >
              <div
                className="section-header"
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              >
                <span className="section-icon">{section.icon}</span>
                <div className="section-title-wrapper">
                  <div className="section-number">Section {section.id}</div>
                  <h3 className="section-title">{section.title}</h3>
                </div>
                <span className={`expand-icon ${activeSection === section.id ? 'open' : ''}`}>
                  ▼
                </span>
              </div>
              <div className={`section-content ${activeSection === section.id ? 'open' : ''}`}>
                <p className="section-text">{section.content}</p>
              </div>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="contact-cta">
            <h3 className="cta-title">Questions About These Terms?</h3>
            <p className="cta-text">
              If you have any questions or need clarification about our Terms of Service, 
              we're here to help.
            </p>
            <a href="/contact" className="cta-button">
                Contact Us
               </a>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <div className="last-updated">
        Last Updated: December 28, 2024 • Effective immediately for all new projects
      </div>
    </div>
  );
};

export default TermsPage;