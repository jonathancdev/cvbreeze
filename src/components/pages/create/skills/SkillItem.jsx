import React from "react";

export default function SkillItem({
  obj,
  data,
  updateParentState,
  childSetUpdated,
}) {
  let skillArray = data.skills;
  const handleDeleteWorkItem = (e) => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      const toRemove = skillArray.find((obj) => obj.id === e.target.id); //isolates that object
      const indexToRemove = skillArray.indexOf(toRemove); //gets id of that object
      skillArray.splice(indexToRemove, 1); //returns array with remaining objs
      updateParentState(skillArray);
      childSetUpdated(true);
    }
  };
  return (
    <div>
      <div>
        <span>{obj.skill}</span>

        <button id={obj.id} onClick={handleDeleteWorkItem}>
          delete
        </button>
      </div>
    </div>
  );
}
