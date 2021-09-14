import React, { useState, useEffect } from "react";

export default function EducationItem({
  obj,
  data,
  userEducationHistory,
  updateParentState,
  childSetUpdated,
}) {
  let educationArray = data.educationHistory;

  useEffect(() => {
    if (userEducationHistory) {
      setObjInStorage(userEducationHistory.includes(obj));
    }
  }, [userEducationHistory]);
  const [objInStorage, setObjInStorage] = useState(false);
  const handleDeleteEducationItem = (e) => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      const toRemove = educationArray.find((obj) => obj.id === e.target.id); //ISOLATES THAT OBJECT
      const indexToRemove = educationArray.indexOf(toRemove); //GETS ID OF THAT OBJECT
      educationArray.splice(indexToRemove, 1); //RETURNS ARRAY WITH REMAINING OBJS
      updateParentState(educationArray);
      childSetUpdated(true);
    }
  };
  return (
    <div>
      <div>
        <span>{obj.institution}</span>
        <span>{obj.degree}</span>
        <span>{obj.date}</span>
        {objInStorage ? (
          <button id={obj.id} onClick={handleDeleteEducationItem}>
            delete
          </button>
        ) : (
          "not saved"
        )}
      </div>
    </div>
  );
}
