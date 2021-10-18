import React, { useState, useEffect } from "react";
export default function SkillItem({
  obj,
  userSkills,
  handleDeletedItem,
  openConfirm,
}) {
  let skillArray = userSkills;

  useEffect(() => {
    if (userSkills) {
      setObjInStorage(userSkills.includes(obj));
    }
  }, [userSkills, obj]);
  const [objInStorage, setObjInStorage] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const handleDeletedSkillItem = (e) => {
    setToRemove(skillArray.find((obj) => obj.id === e.target.id)); //sets object in state so can be accessed from callback in openConfirm
    openConfirm(
      "are you sure you want to permanently delete this information?",
      () => confirmDelete,
      () => noop
    );
  };
  const confirmDelete = () => {
    const indexToRemove = skillArray.indexOf(toRemove); //GETS ID OF THAT OBJECT
    skillArray.splice(indexToRemove, 1); //RETURNS ARRAY WITH REMAINING OBJS
    handleDeletedItem(skillArray);
  };

  const noop = () => {};
  return (
    <div className="skill__item preview__item">
      <div className="skill__item--heading">
        <p>{obj.skill}&nbsp;</p>
      </div>

      {objInStorage ? (
        <button
          className="btn btn--delete-item delete-skill"
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
