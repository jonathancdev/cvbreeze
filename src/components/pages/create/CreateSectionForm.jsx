import React, { useRef } from "react";
import useOutsideClickHandler from "../../../hooks/useOutsideClickHandler";

export default function CreateSectionForm({
  children,
  data,
  items,
  limit,
  limitMessage,
  formId,
  formHidden,
  updateFormHidden,
}) {
  const handleAddClick = () => {
    if (items.length >= limit) {
      alert(limitMessage);
    } else {
      updateFormHidden(false);
    }
  };
  const clickArea = useRef(null);
  useOutsideClickHandler(clickArea, () => updateFormHidden(true));

  return (
    <section className="create-section__form" ref={clickArea}>
      <h1 className="create-section__header--primary">Add {data.item}</h1>
      <button onClick={handleAddClick} className="btn--add-item">
        +
      </button>
      {!formHidden ? (
        <>
          {children}
          {/* {children.map((child) => {
            return child;
          })} */}
          <button
            type="submit"
            form={formId}
            //onClick={handleSaveClick}
            className="btn btn--save"
          >
            Save {data.save}
          </button>
        </>
      ) : null}
    </section>
  );
}
