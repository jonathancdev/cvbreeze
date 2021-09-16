import React, { useEffect, useState } from "react";
import PhotoInput from "./PhotoInput";
import SaveSection from "../create-layout/SaveSection";
import smile from "../../../../img/smile-emoticon.png";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import testUserPhoto from "../../../../img/AI_photo.jpg";

export default function Photo({
  user,
  updateLayoutData,
  updateCompletedSection,
}) {
  //VARIABLES FROM PROPS  & STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_photoData");

  //SEND SECTION INFORMATION TO LAYOUT
  useEffect(() => {
    const layoutData = {
      section: "photo",
      headerText: "photo",
      toolTip: "Photo tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  //PHOTODATA STATE
  const [tempPhoto, setTempPhoto] = useState(null);
  const [userPhoto, setUserPhoto] = useState(
    storage ? storage.userPhoto : null
  );
  const [filePath, setFilePath] = useState(storage ? storage.filePath : null);
  const [includeUserPhoto, setIncludeUserPhoto] = useState(true);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    //CHECKS IF USER WANTS TO INCLUDE PHOTO, USED TO MAINTAIN CHECKBOX CHECKED OR UNCHECKED
    filePath === "photo disabled"
      ? setIncludeUserPhoto(false)
      : setIncludeUserPhoto(true);
  }, [includeUserPhoto, filePath]);

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
      setIncludeUserPhoto(false);
      setUpdated(true);
    } else {
      setFilePath("click to browse files");
      setIncludeUserPhoto(true);
      setUpdated(true);
    }
  };
  const handleDelete = () => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      localStorage.setObject(userId + "_photoData", null);
      updateCompletedSection(checkCompletedSections());
      setFilePath(null);
      setUserPhoto(null);
    }
  };

  return (
    <section className="create-section photo">
      <PhotoInput
        filePath={filePath || "click to browse files"}
        updateFilePath={updateFilePath}
        updateUserPhoto={updateTempPhoto}
        includeUserPhoto={includeUserPhoto}
      />
      <img
        src={
          includeUserPhoto
            ? userPhoto !== "test user"
              ? userPhoto
              : testUserPhoto || tempPhoto || smile
            : smile
        }
        alt="user"
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
        updateParentState={saveUserPhoto}
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
