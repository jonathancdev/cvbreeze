import React, { useEffect } from "react";
import PhotoInput from "./PhotoInput";

export default function Photo({ user, updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "photo",
      headerText: "photo",
      toolTip: "Photo tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });

  return (
    <section className="create-section photo">
      <PhotoInput />
      <i className="photo__icon">:)</i>
      <label className="photo__checkbox--label" htmlFor="photo__checkbox">
        Check this box if you prefer not to include a photo
      </label>
      <input type="checkbox" className="photo__checkbox" id="photo__checkbox" />
      <button className="btn btn--delete">delete</button>
    </section>
  );
}
