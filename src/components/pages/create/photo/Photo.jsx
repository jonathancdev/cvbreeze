import React, { useEffect, useState } from "react";
import PhotoInput from "./PhotoInput";
import SaveSection from "../create-layout/SaveSection";
import smile from "../../../../img/smile-emoticon.png";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";

export default function Photo({ user, updateLayoutData }) {
  //variables from props  & storage
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_photoData");

  //send section information to layout
  useEffect(() => {
    const layoutData = {
      section: "photo",
      headerText: "photo",
      toolTip: "Photo tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  //photoData state
  const [tempPhoto, setTempPhoto] = useState(null);
  const [userPhoto, setUserPhoto] = useState(
    storage ? storage.userPhoto : null
  );
  const [filePath, setFilePath] = useState(storage ? storage.filePath : null);
  const [includeUserPhoto, setIncludeUsePhoto] = useState(true);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    //checks if user wants to include photo, used to maintain checkbox checked or unchecked
    filePath === "photo disabled"
      ? setIncludeUsePhoto(false)
      : setIncludeUsePhoto(true);
  });

  // useEffect(() => {
  //   console.log(checkCompletedSections(userId));
  //   //const completed = checkCompletedSections()
  //   //setAllSectionsCompleted(completed)
  // }, [userPhoto, filePath]);

  const updateFilePath = (path) => {
    setFilePath(path);
    setUpdated(true);
  };
  const updateTempPhoto = (file) => {
    setTempPhoto(file);
    setUpdated(true);
  };
  const saveUserPhoto = () => {
    if (includeUserPhoto) {
      setUserPhoto(tempPhoto);
      setTempPhoto(null);
      setUpdated(false);
    } else {
      setUserPhoto(null);
      setTempPhoto(null);
      setUpdated(false);
    }
  };
  const handleCheckboxClick = (e) => {
    if (e.target.checked) {
      setFilePath("photo disabled");
      setIncludeUsePhoto(false);
      setUpdated(true);
    } else {
      setFilePath("click to browse files");
      setIncludeUsePhoto(true);
      setUpdated(true);
    }
  };
  const handleDelete = () => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      localStorage.removeItem(userId + "_photoData");
      setFilePath(null);
      setUserPhoto(null);
      setUpdated(true);
    }
  };
  return (
    <section className="create-section photo">
      <PhotoInput
        filePath={filePath || "click to browse files"}
        updateFilePath={updateFilePath}
        updateUserPhoto={updateTempPhoto}
      />
      <img
        src={includeUserPhoto ? userPhoto || tempPhoto || smile : smile}
        alt="user photo"
      />
      <label className="photo__checkbox--label" htmlFor="photo__checkbox">
        Check this box if you prefer not to include a photo
      </label>
      <input
        onChange={handleCheckboxClick}
        type="checkbox"
        className="photo__checkbox"
        id="photo__checkbox"
        checked={!includeUserPhoto}
      />
      <button onClick={handleDelete} className="btn btn--delete">
        delete
      </button>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_photoData"}
        data={{ filePath: filePath, userPhoto: tempPhoto }}
        //may not always be needed, but might be good to have temp setting for all data
        updateParentState={saveUserPhoto}
        disableButton={!updated}
      />
    </section>
  );
}
