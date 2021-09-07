import React, { useEffect } from "react";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
export default function WorkExperience({ user, updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "work experience",
      headerText: "work experience",
      toolTip: "Work experience tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });
  return (
    <section className="create-section work-experience">
      <CreateSectionForm data={{ item: "new item", save: "item" }}>
        inputbox, inputbox, dates, add job duty header + photo__icon
      </CreateSectionForm>
      <CreateSectionPreview>map array with jsx?</CreateSectionPreview>
    </section>
  );
}
