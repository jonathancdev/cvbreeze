import React, { useState } from "react";

export default function CreateSectionForm({ children, data, saveFunction }) {
  const [childrenHidden, setChildrenHidden] = useState(true);
  const handleAddClick = () => {
    setChildrenHidden(!childrenHidden);
  };
  const handleSaveClick = () => {
    saveFunction();
    setChildrenHidden(true);
  };

  return (
    <section className="create-section__form">
      <h1 className="create-section__header--primary">Add {data.item}</h1>
      <button onClick={handleAddClick} className="btn--add-item">
        +
      </button>
      <i className="create-section__icon">+</i>
      {!childrenHidden
        ? children.map((child, i) => {
            return child;
          })
        : null}
      <button onClick={handleSaveClick} className="btn btn--save">
        Save {data.save}
      </button>
    </section>
  );
}

//layout to be used by work experience, education, and skills components
