import React, { useLayoutEffect, useState, useRef } from "react";
import AutoTextArea from "../../../AutoTextArea";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";
export default function Profile({
  user,
  updateLayoutData,
  updateCompletedSection,
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

  const updateTempProfile = (value) => {
    setTempProfile(value);
    if (value.match(/^\s*\S[^]*$/)) {
      //can't be all white space
      setUpdated(true);
    } else if (!value.match(/^\s*\S[^]*$/) && !userProfile) {
      setUpdated(false);
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
    updateCompletedSection(checkCompletedSections());
  };
  const noop = () => {};
  console.log("render profile");
  return (
    <section className="create-section profile">
      <label htmlFor="profile__text-area" className="text-area__label"></label>
      <AutoTextArea
        className="profile__textarea margin-bottom-small"
        placeholder="click to add profile"
        update={updateTempProfile}
        userText={userProfile}
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
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
