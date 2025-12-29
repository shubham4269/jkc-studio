import React from "react";
import { Link } from "react-router-dom";
import {
  FiPenTool,
  FiVideo,
  FiLayers,
  FiPrinter,
  FiChevronRight,
} from "react-icons/fi";

const iconMap = {
  branding: FiPenTool,
  video: FiVideo,
  digital: FiLayers,
  print: FiPrinter,
};

export default function ServiceCard({ service }) {
  const Icon = iconMap[service.category] || FiLayers;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="service-card"
      data-cat={service.category}
      data-gtm={service.slug}
    >
      {/* Icon */}
      <div className="icon">
        <Icon />
      </div>

      {/* Title */}
      <h3>{service.title}</h3>

      {/* Description */}
      <p>{service.shortDescription}</p>

      {/* Footer */}
      <div className="service-card-footer">
        <span className="btn-link">View Details</span>
        <FiChevronRight className="chevron" />
      </div>
    </Link>
  );
}

