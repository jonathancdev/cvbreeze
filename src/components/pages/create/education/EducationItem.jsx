import React, { useState, useEffect } from "react";

export default function EducationItem({
  obj,
  userEducationHistory,
  handleDeletedItem,
}) {
  let educationArray = userEducationHistory;

  useEffect(() => {
    if (userEducationHistory) {
      setObjInStorage(userEducationHistory.includes(obj));
    }
  }, [userEducationHistory, obj]);
  const [objInStorage, setObjInStorage] = useState(false);
  const handleDeletedEducationItem = (e) => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      const toRemove = educationArray.find((obj) => obj.id === e.target.id); //ISOLATES THAT OBJECT
      const indexToRemove = educationArray.indexOf(toRemove); //GETS ID OF THAT OBJECT
      educationArray.splice(indexToRemove, 1); //RETURNS ARRAY WITH REMAINING OBJS
      handleDeletedItem(educationArray);
    }
  };
  return (
    <div>
      <div>
        <span>{obj.institution}</span>
        <span>{obj.degree}</span>
        <span>{obj.date}</span>
        {objInStorage ? (
          <button id={obj.id} onClick={handleDeletedEducationItem}>
            delete
          </button>
        ) : (
          "not saved"
        )}
      </div>
    </div>
  );
}
