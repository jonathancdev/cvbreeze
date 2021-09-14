import React, { useState, useEffect } from "react";

export default function WorkItem({
  obj,
  data,
  userWorkExperience,
  updateParentState,
  childSetUpdated,
}) {
  let workArray = data.workExperience;

  useEffect(() => {
    if (userWorkExperience) {
      setObjInStorage(userWorkExperience.includes(obj));
    }
  }, [userWorkExperience, obj]);
  const [objInStorage, setObjInStorage] = useState(false);
  const handleDeleteWorkItem = (e) => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      const toRemove = workArray.find((obj) => obj.id === e.target.id); //ISOLATES THAT OBJECT
      const indexToRemove = workArray.indexOf(toRemove); //GETS ID OF THAT OBJECT
      workArray.splice(indexToRemove, 1); //RETURNS ARRAY WITH REMAINING OBJS
      updateParentState(workArray);
      childSetUpdated(true);
    }
  };
  return (
    <div>
      <div>
        <span>{obj.companyName}</span>
        <span>{obj.title}</span>
        <span>{obj.date}</span>
        {objInStorage ? (
          <button id={obj.id} onClick={handleDeleteWorkItem}>
            delete
          </button>
        ) : (
          "not saved"
        )}
      </div>
    </div>
  );
}
