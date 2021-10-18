import React, { useState, useEffect } from "react";
import truncateString from "../../../../utilities/truncateString";

export default function WorkItem({
  obj,
  userWorkExperience,
  handleDeletedItem,
  openConfirm,
  layout,
}) {
  let workArray = userWorkExperience;

  useEffect(() => {
    if (userWorkExperience) {
      setObjInStorage(userWorkExperience.includes(obj));
    }
  }, [userWorkExperience, obj]);
  const [objInStorage, setObjInStorage] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const handleDeletedWorkItem = (e) => {
    setToRemove(workArray.find((obj) => obj.id === e.target.id));
    openConfirm(
      "are you sure you want to permanently delete this information?",
      () => confirmDelete,
      () => noop
    );
  };
  const confirmDelete = () => {
    const indexToRemove = workArray.indexOf(toRemove); //GETS ID OF THAT OBJECT
    workArray.splice(indexToRemove, 1); //RETURNS ARRAY WITH REMAINING OBJS
    handleDeletedItem(workArray);
  };

  const noop = () => {};
  return (
    <div className="work__item preview__item">
      <div className="work__item--heading">
        <p>
          {layout === 2 ? obj.title : truncateString(obj.title, 15, "...")}
          &nbsp;
        </p>
        <p>
          at{" "}
          {layout === 2 ? obj.company : truncateString(obj.company, 15, "...")}
        </p>
      </div>
      <div className="work__item--dates">
        <p>from&nbsp;{obj.startDate}&nbsp;</p>
        <p>to&nbsp;{obj.endDate}</p>
      </div>
      <ul className="duties__list">
        <li className="duty">
          {layout === 2 ? obj.dutyOne : truncateString(obj.dutyOne, 40, "...")}
        </li>
        <li className="duty">
          {layout === 2 ? obj.dutyTwo : truncateString(obj.dutyTwo, 40, "...")}
        </li>
        <li className="duty">
          {layout === 2
            ? obj.dutyThree
            : truncateString(obj.dutyThree, 40, "...")}
        </li>
      </ul>
      {objInStorage ? (
        <button
          className="btn btn--delete-item"
          id={obj.id}
          onClick={handleDeletedWorkItem}
        >
          delete
        </button>
      ) : (
        <p className="save__warning">not saved</p>
      )}
    </div>
  );
}
