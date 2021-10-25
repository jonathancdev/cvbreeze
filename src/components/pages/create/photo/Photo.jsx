import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import PhotoInput from "./PhotoInput";
import SaveSection from "../create-layout/SaveSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import testUserPhoto from "../../../../img/AI_photo.jpg";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";

export default function Photo({
  user,
  updateLayoutData,
  updateCompletedSections,
  openConfirm,
}) {
  //FONTAWESOME
  const userIcon = <FontAwesomeIcon icon={faUserAlt} className="user__icon" />;
  const userIconDisabled = (
    <FontAwesomeIcon icon={faUserAltSlash} className="user__icon--disabled" />
  );
  //VARIABLES FROM PROPS  & STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_photoData");

  //SEND SECTION INFORMATION TO LAYOUT
  const layoutData = useRef({
    section: "photo",
    headerText: "Photo",
    toolTip: "Photo tooltip yo lorem ipsum fuckus duckus",
  });

  useLayoutEffect(() => {
    updateLayoutData(layoutData.current);
  });
  useLayoutUpdater(layoutData.current, updateLayoutData);

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
      setFilePath("click here to browse files");
      setIncludeUserPhoto(true);
      setUpdated(true);
    }
  };
  const handleDelete = () => {
    openConfirm(
      "are you sure you want to permanently delete this photo?",
      () => confirmDelete,
      () => noop
    );
  };
  const confirmDelete = () => {
    localStorage.setObject(userId + "_photoData", null);
    updateCompletedSections();
    setFilePath(null);
    setUserPhoto(null);
    setTempPhoto(null);
  };
  const noop = () => {};
  return (
    <section className="create-section photo">
      <div className="photo__container margin-top-extra-small margin-bottom-extra-small">
        {includeUserPhoto ? (
          userPhoto || tempPhoto ? (
            <img
              className="user-photo"
              alt="user"
              src={
                userPhoto === "test user"
                  ? testUserPhoto
                  : userPhoto || tempPhoto
              }
            />
          ) : (
            <div className="icon-wrap--largecircle">{userIcon}</div>
          )
        ) : (
          <div className="icon-wrap--largecircle">{userIconDisabled}</div>
        )}
        <PhotoInput
          filePath={filePath || "click here to browse files"}
          updateFilePath={updateFilePath}
          updateTempPhoto={updateTempPhoto}
          includeUserPhoto={includeUserPhoto}
          tempPhoto={tempPhoto}
        />
        {userPhoto ? (
          <button
            onClick={handleDelete}
            className="btn btn--delete margin-top-extra-small"
          >
            delete
          </button>
        ) : null}
      </div>

      <div className="checkbox__container">
        <input
          hidden
          onChange={handleCheckboxClick}
          type="checkbox"
          className="photo__checkbox"
          id="photo__checkbox"
          checked={!includeUserPhoto}
        />
        <label className="photo__checkbox--label" htmlFor="photo__checkbox">
          <div className="checkbox--custom"></div>
        </label>
        <p className="hidden-label__text">continue without photo</p>
      </div>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_photoData"}
        data={{ filePath: filePath, userPhoto: tempPhoto }}
        updateParentState={saveUserPhoto}
        updateCompletedSections={updateCompletedSections}
        disableButton={!updated}
      />
    </section>
  );
}
