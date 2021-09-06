import React from "react";

export default function CreateSectionForm({ children, data }) {
  return (
    <section className="create-section__form">
      <h1 className="create-section__header--primary">Add {data.item}</h1>
      <i className="create-section__icon">+</i>
      {children}
      <button className="btn btn--save">Save {data.save}</button>
    </section>
  );
}

//layout to be used by work experience, education, and skills components
