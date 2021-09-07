import React, { useEffect } from "react";

export default function Profile({ user, updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "profile",
      headerText: "personal profile",
      toolTip: "Profile tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });
  return (
    <section className="create-section profile">
      <label htmlFor="profile__text-area" className="text-area__label"></label>
      <textarea
        name="profile"
        id="profile__text-area"
        cols="30"
        rows="10"
        className="profile__text-area"
      ></textarea>
      <button className="btn btn--delete">delete</button>
    </section>
  );
}
//make textarea increase/decrease depending on amount of input size
