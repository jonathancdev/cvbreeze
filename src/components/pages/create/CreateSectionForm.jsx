import React, { useState } from "react";

export default function CreateSectionForm({
  children,
  data,
  items,
  limit,
  limitMessage,
  saveFunction,
}) {
  const [childrenHidden, setChildrenHidden] = useState(true);

  const handleAddClick = () => {
    if (items.length >= limit) {
      alert(limitMessage);
    } else {
      setChildrenHidden(!childrenHidden);
    }
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
      {!childrenHidden ? (
        <>
          {children.map((child) => {
            return child;
          })}
          <button onClick={handleSaveClick} className="btn btn--save">
            Save {data.save}
          </button>
        </>
      ) : null}
    </section>
  );
}
