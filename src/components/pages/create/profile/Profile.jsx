import React, { useEffect, useState, useRef } from "react";
import AutoTextArea from "../../../AutoTextArea";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
export default function Profile({
  user,
  updateLayoutData,
  updateCompletedSection,
}) {
  //VARIABLES FROM PROPS  & STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_profileData");

  //SEND SECTION INFORMATION TO LAYOUT
  useEffect(() => {
    const layoutData = {
      section: "profile",
      headerText: "personal profile",
      toolTip: "Profile tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  //POFILEDATA STATE
  const [tempProfile, setTempProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(
    storage ? storage.profile : null
  );
  const [updated, setUpdated] = useState(false);

  const updateTempProfile = (value) => {
    setTempProfile(value);
    setUpdated(true);
  };
  const saveUserProfile = () => {
    setUserProfile(tempProfile);
    setTempProfile(null);
    setUpdated(false);
  };
  const handleDelete = () => {
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      localStorage.setObject(userId + "_profileData", null);
      setUserProfile(null);
      updateCompletedSection(checkCompletedSections());
    }
  };

  return (
    <section className="create-section profile">
      <label htmlFor="profile__text-area" className="text-area__label"></label>
      <AutoTextArea
        className="profile__textarea"
        placeholder="click to edit profile"
        update={updateTempProfile}
        userText={userProfile}
      />
      <button onClick={handleDelete} className="btn btn--delete">
        delete
      </button>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_profileData"}
        data={{ profile: tempProfile }}
        updateParentState={saveUserProfile}
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
