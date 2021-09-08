import React, { useEffect, useState } from "react";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
export default function WorkExperience({ user, updateLayoutData }) {
  //variables from props  & storage
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_workExperienceData");

  //refs???

  useEffect(() => {
    const layoutData = {
      section: "work experience",
      headerText: "work experience",
      toolTip: "Work experience tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);
  //workExperienceData state
  const [tempWorkExperience, setTempPWorkExperience] = useState(null);
  const [userWorkExperience, setUserWorkExperience] = useState(
    storage ? storage.workExperience : null
  );
  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });
  return (
    <section className="create-section work-experience">
      <CreateSectionForm data={{ item: "new experience", save: "experience" }}>
        {/* inputbox, inputbox, dates, add job duty header + photo__icon */}
        <input
          placeholder="click to edit title"
          type="text"
          className="input--standard"
        />
        <input
          placeholder="click to edit company name"
          type="text"
          className="input--standard"
        />
        from
        <input placeholder="month" type="text" className="input--month" />
        <input placeholder="year" type="text" className="input--year" />
        to
        <input placeholder="month" type="text" className="input--month" />
        <input placeholder="year" type="text" className="input--year" />
        duties section
      </CreateSectionForm>
      <CreateSectionPreview>map array with jsx?</CreateSectionPreview>
    </section>
  );
}
