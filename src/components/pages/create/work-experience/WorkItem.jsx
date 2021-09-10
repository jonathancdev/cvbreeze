import React from "react";

export default function WorkItem({ obj, data, updateParentState }) {
  let workArray = data.workExperience;
  const handleDeleteWorkItem = (e) => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      const toRemove = workArray.find((obj) => obj.id === e.target.id); //isolates that object
      const indexToRemove = workArray.indexOf(toRemove); //gets id of that object
      updateParentState(workArray.splice(indexToRemove, 1)); //updated without deleted object
    }
  };
  return (
    <div>
      <div>
        <span>{obj.companyName}</span>
        <span>{obj.title}</span>
        <span>{obj.date}</span>
        <button id={obj.id} onClick={handleDeleteWorkItem}>
          delete
        </button>
      </div>
    </div>
  );
}
