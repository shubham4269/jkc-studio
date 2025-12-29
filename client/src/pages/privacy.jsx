import React, { useState } from "react";

const PrivacyRefundPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: "🔐",
      items: [
        {
          id: 1,
          heading: "Data Collection",
          content: `We collect only necessary information to provide our services.

This may include:
• Name, email, phone number, company name
• Project briefs, brand assets, and files you provide
• Communication history and feedback
• Basic technical data such as IP address and browser type

We never sell your personal data to third parties.`
        },
        {
          id: 2,
          heading: "Cookies",
          content: `Our website uses cookies to improve functionality and experience.

• Essential cookies for security and sessions
• Analytics cookies to understand website usage
• Marketing cookies only with consent

You can control or disable cookies through your browser settings.`
        },
        {
          id: 3,
          heading: "Consent",
          content: `By using our website or submitting a form, you consent to our data practices.

• Marketing emails require explicit opt-in
• You can withdraw consent anytime
• Project-related communication is mandatory for service delivery`
        },
        {
          id: 4,
          heading: "Data Storage & Security",
          content: `We protect your data using industry-standard security practices.

• Secure servers and encrypted storage
• Restricted access to authorized team members
• Payment information handled by PCI-compliant providers

No system is 100% secure, but we take all reasonable precautions.`
        },
        {
          id: 5,
          heading: "Third-Party Tools",
          content: `We may use trusted third-party services such as:

• Payment processors (Stripe, Razorpay, PayPal)
• Analytics tools (Google Analytics)
• Communication tools (Email, Zoom)

These providers have their own privacy policies.`
        },
        {
          id: 6,
          heading: "User Rights",
          content: `You have the right to:

• Access your data
• Request corrections
• Request deletion (subject to legal obligations)
• Withdraw consent for marketing

Contact: privacy@jkcstudio.com`
        }
      ]
    },
    {
      id: "refund",
      title: "Refund & Revision Policy",
      icon: "💳",
      items: [
        {
          id: 1,
          heading: "Refund Eligibility",
          content: `Refunds may be considered only in limited situations:

• Project cancelled before work begins
• Failure to deliver agreed services
• Mutual written agreement

Refund requests must be emailed to billing@jkcstudio.com`
        },
        {
          id: 2,
          heading: "Non-Refundable Items",
          content: `The following are non-refundable:

• Advance or deposit payments once work starts
• Completed or approved work
• Third-party costs (fonts, stock images, tools)
• Time spent on research and strategy`
        },
        {
          id: 3,
          heading: "Revision Limits",
          content: `Each project includes limited revision rounds as agreed.

• Typically 2–3 revision rounds
• Minor edits included
• Major changes or new concepts billed separately
• Revisions must be requested within agreed timelines`
        },
        {
          id: 4,
          heading: "Dispute Resolution",
          content: `If any issue arises:

1. Contact support@jkcstudio.com
2. Attempt resolution through discussion
3. Mediation or arbitration if required

Governing law: India (Bangalore jurisdiction)`
        }
      ]
    }
  ];

  return (
    <div className="privacy-refund-page">
      <style>{`
        .privacy-refund-page {
          min-height: 100vh;
          background: #050912;
          color: #ffffff;
          font-family: 'Poppins', system-ui, sans-serif;
        }

        .policy-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 24px 80px;
        }

        .page-title {
          text-align: center;
          margin-bottom: 60px;
        }

        .page-title h1 {
          font-size: clamp(32px,5vw,48px);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .page-title p {
          color: rgba(200,210,240,.7);
        }

        .policy-block {
          margin-bottom: 80px;
        }

        .policy-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 32px;
        }

        .policy-card {
          background: rgba(18,28,46,.6);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,.06);
          cursor: pointer;
        }

        .policy-card h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .policy-content {
          margin-top: 14px;
          line-height: 1.7;
          color: rgba(200,210,240,.8);
          white-space: pre-line;
          display: none;
        }

        .policy-content.open {
          display: block;
        }

        @media (max-width: 768px) {
          .policy-container {
            padding-top: 100px;
          }
        }
      `}</style>

      <div className="policy-container">
        <div className="page-title">
          <h1>Privacy & Refund Policy</h1>
          <p>Transparency, trust, and clear expectations.</p>
        </div>

        {sections.map(section => (
          <div key={section.id} className="policy-block">
            <div className="policy-heading">
              <span>{section.icon}</span>
              {section.title}
            </div>

            {section.items.map(item => (
              <div
                key={item.id}
                className="policy-card"
                onClick={() =>
                  setActiveSection(
                    activeSection === `${section.id}-${item.id}`
                      ? null
                      : `${section.id}-${item.id}`
                  )
                }
              >
                <h4>{item.heading}</h4>
                <div
                  className={`policy-content ${
                    activeSection === `${section.id}-${item.id}` ? "open" : ""
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyRefundPage;
