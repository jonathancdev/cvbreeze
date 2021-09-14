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
      const toRemove = skillArray.find((obj) => obj.id === e.target.id); //ISOLATES THAT OBJECT
      const indexToRemove = skillArray.indexOf(toRemove); //GETS ID OF THAT OBJECT
      skillArray.splice(indexToRemove, 1); //RETURNS ARRAY WITH REMAINING OBJS
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
