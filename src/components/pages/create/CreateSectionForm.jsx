import React, { useRef } from "react";
import useOutsideClickHandler from "../../../hooks/useOutsideClickHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

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
  const plusIcon = <FontAwesomeIcon icon={faPlus} className="plus__icon" />;
  const minusIcon = <FontAwesomeIcon icon={faMinus} className="plus__icon" />;

  const handleAddClick = () => {
    if (items.length >= limit) {
      alert(limitMessage);
    } else {
      updateFormHidden(!formHidden);
    }
  };
  const clickArea = useRef(null);
  useOutsideClickHandler(clickArea, () => updateFormHidden(true));

  return (
    <section
      className={
        formHidden ? "create-section__form" : "create-section__form open"
      }
      ref={clickArea}
    >
      <div className="form__header">
        <button
          onClick={handleAddClick}
          className="btn btn--add-item margin-bottom-extra-small"
        >
          {data.item}
          {formHidden ? plusIcon : minusIcon}
        </button>
      </div>
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
            className="btn btn--save-item"
          >
            save {data.save}
          </button>
        </>
      ) : null}
    </section>
  );
}
