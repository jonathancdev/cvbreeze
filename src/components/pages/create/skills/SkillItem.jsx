import React, { useState, useEffect } from "react";
export default function SkillItem({ obj, userSkills, handleDeletedItem }) {
  let skillArray = userSkills;

  useEffect(() => {
    if (userSkills) {
      setObjInStorage(userSkills.includes(obj));
    }
  }, [userSkills, obj]);
  const [objInStorage, setObjInStorage] = useState(false);
  const handleDeletedSkillItem = (e) => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      const toRemove = skillArray.find((obj) => obj.id === e.target.id); //ISOLATES THAT OBJECT
      const indexToRemove = skillArray.indexOf(toRemove); //GETS ID OF THAT OBJECT
      skillArray.splice(indexToRemove, 1); //RETURNS ARRAY WITH REMAINING OBJS
      handleDeletedItem(skillArray);
    }
  };
  return (
    <div className="skill__item preview__item">
      <div className="skill__item--heading">
        <p>{obj.skill}&nbsp;</p>
      </div>

      {objInStorage ? (
        <button
          className="btn btn--delete-item"
          id={obj.id}
          onClick={handleDeletedSkillItem}
        >
          delete
        </button>
      ) : (
        <p className="save__warning">not saved</p>
      )}
    </div>
  );
}
