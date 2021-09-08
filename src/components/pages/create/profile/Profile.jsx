import React, { useEffect, useState, useRef } from "react";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";

export default function Profile({ user, updateLayoutData }) {
  //variables from props  & storage
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_profileData");

  //refs
  const textareaRef = useRef(null);
  //send section information to layout
  useEffect(() => {
    const layoutData = {
      section: "profile",
      headerText: "personal profile",
      toolTip: "Profile tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  //pofileData state
  const [tempProfile, setTempProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(
    storage ? storage.profile : null
  );
  useEffect(() => {
    //persists profile value after leaving page but allows editing after save
    textareaRef.current.value = userProfile;
  }, [userProfile]);
  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });

  const updateTempProfile = (e) => {
    const value = e.target.value;
    setTempProfile(value);
  };
  const saveUserProfile = () => {
    setUserProfile(tempProfile);
    setTempProfile(null);
  };
  const handleDelete = () => {
    localStorage.removeItem(userId + "_profileData");
    setUserProfile(null);
  };
  console.log(tempProfile);
  console.log(userProfile);
  return (
    <section className="create-section profile">
      <label htmlFor="profile__text-area" className="text-area__label"></label>
      <textarea
        ref={textareaRef}
        name="profile"
        cols="30"
        rows="10"
        className="profile__text-area"
        placeholder="click to edit profile"
        onChange={updateTempProfile}
      ></textarea>
      <button onClick={handleDelete} className="btn btn--delete">
        delete
      </button>
      <SaveSection
        message="message"
        storageKey={userId + "_profileData"}
        data={{ profile: tempProfile }}
        //may not always be needed, but might be good to have temp setting for all data
        updateParentState={saveUserProfile}
      />
    </section>
  );
}
//make textarea increase/decrease depending on amount of input size
