import React, { useState, useEffect, useRef } from "react";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";

export default function SaveSection({
  message,
  storageKey,
  data,
  disableButton,
  updateParentState,
  updateCompletedSection,
}) {
  useEffect(() => {
    //clears save message timer if component unmounted before timer resolves
    const saveTimer = timerRef.current;
    return () => {
      clearTimeout(saveTimer);
    };
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const timerRef = useRef();

  const handleClick = () => {
    localStorage.setObject(storageKey, data);
    //should only be one object key per section, uses that to update correct data
    //and allows updateParentState prop to be reused in other components
    updateParentState(data[Object.keys(data)[0]]);
    setSuccessMessage("changed saved successfully");
    updateCompletedSection(checkCompletedSections(storageKey));
    const saveTimer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
    timerRef.current = saveTimer;
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
