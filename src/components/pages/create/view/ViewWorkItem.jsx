import React from "react";

export default function ViewWorkItem({ obj }) {
  console.log(obj);
  const {
    company,
    dutyOne,
    dutyThree,
    dutyTwo,
    endDate,
    id,
    startDate,
    title,
  } = obj;
  return (
    <div className="view__item work__item">
      <div className="space-between">
        <h1 className="work__heading-primary">{title.toUpperCase()}</h1>
        <h3 className="work__heading-tertiary">
          {startDate} - {endDate}
        </h3>
      </div>

      <h2 className="work__heading-secondary">{company}</h2>

      <p className="work__text">{dutyOne}</p>
      <p className="work__text">{dutyTwo}</p>
      <p className="work__text">{dutyThree}</p>
    </div>
  );
}
