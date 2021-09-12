import React, { useState, useEffect } from "react";
export default function SkillItem({
  obj,
  data,
  userSkills,
  updateParentState,
  childSetUpdated,
}) {
  let skillArray = data.skills;

  useEffect(() => {
    if (userSkills) {
      setObjInStorage(userSkills.includes(obj));
    }
  }, [userSkills]);
  const [objInStorage, setObjInStorage] = useState(false);
  const handleDeleteSkillItem = (e) => {
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

        {objInStorage ? (
          <button id={obj.id} onClick={handleDeleteSkillItem}>
            delete
          </button>
        ) : (
          "not saved"
        )}
      </div>
    </div>
  );
}
