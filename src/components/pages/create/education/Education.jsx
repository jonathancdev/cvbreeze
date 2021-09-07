import React, { useEffect } from "react";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";

export default function Education({ user, updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "education",
      headerText: "education history",
      toolTip: "Education tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });

  return (
    <section className="create-section education">
      <CreateSectionForm data={{ item: "new item", save: "item" }}>
        inputbox, inputbox, inputbox, dates
      </CreateSectionForm>
      <CreateSectionPreview>map array with jsx?</CreateSectionPreview>
    </section>
  );
}
