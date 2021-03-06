import React from "react";

export default function ViewEducationItem({ obj }) {
  const { month, year, degree, description, institution } = obj;
  return (
    <div className="view__item education__item">
      <div className="space-between">
        <h1 className="education__heading-primary">{degree.toUpperCase()}</h1>
        <div className="viewdate">
          <h3 className="education__heading-tertiary">{month + " " + year}</h3>
        </div>
      </div>

      <h2 className="education__heading-secondary">{institution}</h2>

      <p className="education__text">{description}</p>
    </div>
  );
}
