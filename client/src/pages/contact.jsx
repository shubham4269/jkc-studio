import React, { useState } from "react";
import LeadForm from "../Components/LeadForm/LeadForm";

const ContactPage = () => {
  const [activeService, setActiveService] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const services = [
    { icon: "🎨", title: "Brand Identity", desc: "Logos, brand kits & visual systems" },
    { icon: "📦", title: "Packaging Design", desc: "Product packaging & label design" },
    { icon: "📱", title: "Social Media Creatives", desc: "Posts, ads & carousel designs" },
    { icon: "🎬", title: "Video Production", desc: "Brand films, ads & product videos" },
    { icon: "🖥️", title: "Business Card Design", desc: "Business cards & visiting cards" },
    { icon: "🚀", title: "Creative Retainers", desc: "Monthly design & marketing support" }
  ];

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["JKC Studio", "Innovation Hub", "Bangalore, India"]
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+91 98765 43210", "Mon–Fri: 10:00 AM – 6:00 PM"]
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["hello@jkcstudio.com", "projects@jkcstudio.com"]
    }
  ];

  const faqs = [
    {
      q: "How quickly can we start?",
      a: "Most projects begin within 2–5 working days after final scope confirmation."
    },
    {
      q: "Do you work with startups?",
      a: "Yes. Startups and growing brands are a core focus for us."
    },
    {
      q: "Will I get a dedicated point of contact?",
      a: "Absolutely. Every project is handled by a dedicated project manager."
    }
  ];

  return (
    <div className="contact-page">
      <style>{`
        /* ================= CONTACT PAGE ONLY ================= */

        .contact-page {
          background: #050912;
          color: #ffffff;
          min-height: 100vh;
          font-family: 'Poppins', system-ui, sans-serif;
        }

        .contact-page * {
          box-sizing: border-box;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* HERO */
        .contact-hero {
          padding: 140px 24px 80px;
          background:
            radial-gradient(1200px 600px at 30% 20%, rgba(109,108,255,.15), transparent),
            radial-gradient(800px 400px at 80% 80%, rgba(255,211,106,.08), transparent),
            linear-gradient(180deg,#050912,#070d1f 80%);
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-headline {
          font-size: clamp(32px,5.5vw,52px);
          font-weight: 700;
          margin-bottom: 20px;
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(200,210,240,.75);
        }

        /* SERVICES */
        .section-padding {
          padding: 80px 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
          gap: 20px;
        }

        .service-card {
          background: rgba(18,28,46,.6);
          padding: 24px;
          border-radius: 16px;
          text-align: center;
          cursor: pointer;
          transition: .3s;
        }

        .service-card:hover,
        .service-card.active {
          background: rgba(109,108,255,.15);
          transform: translateY(-4px);
        }

        .service-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 12px;
        }

        /* CONTACT WRAPPER */
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 56px;
          background: linear-gradient(
            180deg,
            rgba(18,28,46,.85),
            rgba(10,16,30,.85)
          );
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: 0 12px 40px rgba(0,0,0,.35);
          align-items: flex-start;
        }

        .contact-left {
          display: flex;
          flex-direction: column;
        }

        .contact-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-page .info-card {
          background: rgba(255,255,255,.04);
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,.06);
        }

        .info-icon {
          font-size: 32px;
          margin-bottom: 12px;
          display: block;
        }

        .info-card h3 {
          margin-bottom: 12px;
          font-size: 20px;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .info-card li {
          color: rgba(200,210,240,.8);
          margin-bottom: 8px;
        }

        /* FAQ */
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(350px,1fr));
          gap: 20px;
        }

        .faq-card {
          background: rgba(18,28,46,.6);
          padding: 24px;
          border-radius: 16px;
          cursor: pointer;
        }

        .faq-question {
          font-size: 18px;
          font-weight: 600;
          color: #ffd56a;
        }

        .faq-answer {
          color: rgba(200,210,240,.75);
          margin-top: 12px;
        }
          .faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.faq-toggle {
  font-size: 24px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.faq-toggle.open {
  transform: rotate(45deg); /* + becomes × */
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.35s ease, opacity 0.25s ease;
}

.faq-answer.open {
  max-height: 200px;
  opacity: 1;
  margin-top: 12px;
}


        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
            padding: 40px 28px;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-headline">Let's Build Something Amazing Together</h1>
          <p className="hero-subtitle">
            Have a project in mind? Our team is ready to turn your vision into reality.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding">
        <div className="contact-container">
           <h2 style={{ textAlign: "center", marginBottom: 32, fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700 }}>
            What can we help you with?
          </h2>

          <div className="services-grid">
            {services.map((s, i) => (
              <div
                key={i}
                className={`service-card ${activeService === i ? "active" : ""}`}
                onClick={() => setActiveService(i)}
              >
                <span className="service-icon">{s.icon}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section-padding">
        <div className="contact-container">
          <h2 style={{ textAlign: "center", marginBottom: 32, fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700 }}>
            Get in Touch
          </h2>
          <div className="contact-wrapper">
            <div className="contact-left">
              <LeadForm />
            </div>
            <div className="contact-right">
              {contactInfo.map((c, i) => (
                <div key={i} className="info-card">
                  <span className="info-icon">{c.icon}</span>
                  <h3>{c.title}</h3>
                  <ul>
                    {c.details.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* FAQ */}
<section className="section-padding">
  <div className="contact-container">
    <div className="faq-grid">
      {faqs.map((f, i) => (
        <div
          key={i}
          className="faq-card"
          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
        >
          <div className="faq-header">
            <div className="faq-question">{f.q}</div>
            <span className={`faq-toggle ${activeFaq === i ? "open" : ""}`}>
              +
            </span>
          </div>

          <div className={`faq-answer ${activeFaq === i ? "open" : ""}`}>
            {f.a}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default ContactPage;