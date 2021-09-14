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
    //CLEARS SAVE MESSAGE TIMER IF COMPONENT UNMOUNTED BEFORE TIMER RESOLVES
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
    //SHOULD ONLY BE ONE OBJECT KEY PER SECTION, USES THAT TO UPDATE CORRECT DATA
    //AND ALLOWS UPDATEPARENTSTATE PROP TO BE REUSED IN OTHER COMPONENTS
    updateParentState(data[Object.keys(data)[0]]);
    setSuccessMessage("changed saved successfully");
    updateCompletedSection(checkCompletedSections());
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
