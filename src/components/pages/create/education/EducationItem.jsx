import React, { useState, useEffect } from "react";
import truncateString from "../../../../utilities/truncateString";

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
  console.log(obj);
  return (
    <div className="education__item preview__item">
      <div className="work__item--heading">
        <p>
          {truncateString(obj.degree + " from " + obj.institution, 35, "...")}
          &nbsp;
        </p>
      </div>
      <div className="education__item--dates">
        <p>completed&nbsp;{obj.date}</p>
      </div>
      <p className="description">
        {truncateString(obj.description, 110, "...")}
      </p>
      {objInStorage ? (
        <button
          className="btn btn--delete-item"
          id={obj.id}
          onClick={handleDeletedEducationItem}
        >
          delete
        </button>
      ) : (
        <p className="save__warning">not saved</p>
      )}
    </div>
  );
}
