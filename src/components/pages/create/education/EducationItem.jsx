import React from "react";

export default function EducationItem({
  obj,
  data,
  updateParentState,
  childSetUpdated,
}) {
  let educationArray = data.educationHistory;
  const handleDeleteEducationItem = (e) => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      const toRemove = educationArray.find((obj) => obj.id === e.target.id); //isolates that object
      const indexToRemove = educationArray.indexOf(toRemove); //gets id of that object
      educationArray.splice(indexToRemove, 1); //returns array with remaining objs
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
        <button id={obj.id} onClick={handleDeleteEducationItem}>
          delete
        </button>
      </div>
    </div>
  );
}
