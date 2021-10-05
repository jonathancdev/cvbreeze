import React, { useLayoutEffect, useState, useRef } from "react";
import AutoTextArea from "../../../AutoTextArea";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";
export default function Profile({
  user,
  updateLayoutData,
  updateCompletedSections,
  openConfirm,
}) {
  //VARIABLES FROM PROPS  & STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_profileData");

  //SEND SECTION INFORMATION TO LAYOUT
  const layoutData = useRef({
    section: "profile",
    headerText: "Personal profile",
    toolTip: "Profile tooltip yo lorem ipsum fuckus duckus",
  });
  useLayoutEffect(() => {
    updateLayoutData(layoutData.current);
  });
  useLayoutUpdater(layoutData.current, updateLayoutData);

  //PROFILEDATA STATE
  const [tempProfile, setTempProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(storage ? storage : null);
  const [updated, setUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateTempProfile = (value) => {
    checkMinLength(value);
    setTempProfile(value);
    if (
      value.match(/^\s*\S[^]*$/) &&
      value.length >= 150 &&
      value.length <= 600
    ) {
      //can't be all white space
      setUpdated(true);
    } else if (!value.match(/^\s*\S[^]*$/) && !userProfile) {
      setUpdated(false);
    }
  };
  const checkMinLength = (str) => {
    if (str.length < 150) {
      const x = 150 - str.length;
      setErrorMessage(str.length + "/150 characters to minimum length");
    } else if (str.length >= 600) {
      setErrorMessage("600 characters maximium");
    } else {
      setErrorMessage("");
    }
  };
  const saveUserProfile = () => {
    setUserProfile(tempProfile);
    setTempProfile(null);
    setUpdated(false);
  };
  const handleDelete = () => {
    openConfirm(
      "are you sure you want to permanently delete this information?",
      () => confirmDelete,
      () => noop
    );
  };
  const confirmDelete = () => {
    localStorage.setObject(userId + "_profileData", null);
    setUserProfile(null);
    updateCompletedSections();
  };
  const noop = () => {};
  console.log(errorMessage);
  return (
    <section className="create-section profile">
      <label htmlFor="profile__text-area" className="text-area__label"></label>
      <AutoTextArea
        className="profile__textarea margin-bottom-small"
        placeholder="click to add profile"
        update={updateTempProfile}
        userText={userProfile}
        minLength={150}
        maxLength={600}
        errorMessage={errorMessage}
      />
      {userProfile ? (
        <button
          onClick={handleDelete}
          className="btn btn--delete margin-bottom-large"
        >
          delete
        </button>
      ) : null}
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_profileData"}
        data={tempProfile}
        updateParentState={saveUserProfile}
        updateCompletedSections={updateCompletedSections}
        disableButton={!updated}
      />
    </section>
  );
}
