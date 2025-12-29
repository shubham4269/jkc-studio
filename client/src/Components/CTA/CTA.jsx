import React, { useEffect, useState } from "react";
import LeadForm from "../LeadForm/LeadForm";
import "./cta.css";

const useCountUp = (end, { duration = 1500, decimals = 0 } = {}, start = true, trigger = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startVal = 0;
    const frames = Math.max(1, Math.round(duration / 16));
    const increment = end / frames;

    setCount(0);

    const counter = setInterval(() => {
      startVal += increment;

      if (startVal >= end) {
        setCount(end);
        clearInterval(counter);
        return;
      }

      if (decimals > 0) {
        setCount(Number(startVal.toFixed(decimals)));
      } else {
        setCount(Math.round(startVal));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration, decimals, start, trigger]);

  return count;
};

const Metric = ({ value, suffix, desc, decimals = 0 }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, { decimals }, visible, trigger);

  return (
    <div
      className="metric"
      ref={ref}
      onMouseEnter={() => setTrigger((t) => t + 1)}
      onFocus={() => setTrigger((t) => t + 1)}
      tabIndex={0}
      role="group"
      aria-label={desc}
    >
      <span className="metric-value">{decimals > 0 ? Number(count).toFixed(decimals) : count}{suffix}</span>
      <span className="metric-label">{desc}</span>
    </div>
  );
};

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-wrap">
          <div className="cta-body" data-aos="fade-right">
            <span className="eyebrow cta-eyebrow">Launch with confidence</span>

            <h3 className="title">Ready to build something outstanding?</h3>

            <p className="cta-lead">
              Share your brief and we'll respond with a road-map, milestone plan, and fixed quote in under a day. Every
              project includes a senior creative lead, battle-tested processes, and crystal-clear handoffs.
            </p>

            <ul className="cta-points">
              <li>
                <span className="cta-icon">✓</span>Week-1 deliverables to align stakeholders fast.
              </li>
              <li>
                <span className="cta-icon">✓</span>Production-grade assets for ads & socials.
              </li>
              <li>
                <span className="cta-icon">✓</span>Transparent pricing, no hidden scope.
              </li>
              <li>
                <span className="cta-icon">✓</span>Weekly pulse calls + async updates.
              </li>
            </ul>

            <div className="cta-metrics" data-aos="fade-up" data-aos-delay="200">
              <Metric value={24} suffix=" hrs" desc=" proposal turnaround" />
              <Metric value={50} suffix="+" desc="brand & launch kits shipped" />
              <Metric value={4.9} suffix="★" desc="average client rating" decimals={1} />
            </div>
          </div>

          <LeadForm />
        </div>
      </div>
    </section>
  );
}
