import React from "react";
import "./Profile.css";

interface ServicesProps {
  service: string;
  idx: number;
}

const Services: React.FC<ServicesProps> = ({ service, idx }) => {
  return (
    <div key={service + idx}>
      <h3 className="serviceWrapper">{service}</h3>
    </div>
  );
};

export default Services;
