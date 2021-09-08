import React from "react";
import objectStorage from "../../../../utilities/objectStorage";

export default function SaveSection({
  message,
  storageKey,
  data,
  updateParentState,
}) {
  const handleClick = () => {
    localStorage.setObject(storageKey, data);
    updateParentState();
  };
  return (
    <section className="save-section">
      <p className="save__text">{message}</p>
      <button onClick={handleClick} className="save__btn btn--square">
        save
      </button>
    </section>
  );
}
