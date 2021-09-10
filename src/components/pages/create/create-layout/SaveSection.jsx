import React, { useState } from "react";

export default function SaveSection({
  message,
  storageKey,
  data,
  disableButton,
  updateParentState,
}) {
  const [successMessage, setSuccessMessage] = useState(null);
  const handleClick = () => {
    localStorage.setObject(storageKey, data);
    //should only be one object key per section, uses that to update correct data
    //and allows updateParentState prop to be reused in other components
    updateParentState(data[Object.keys(data)[0]]);
    setSuccessMessage("changed saved successfully");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };
  return (
    <section className="save-section">
      <p className="save__text">{message || successMessage}</p>
      <button
        disabled={disableButton}
        onClick={handleClick}
        className="save__btn btn--square"
      >
        save
      </button>
    </section>
  );
}
