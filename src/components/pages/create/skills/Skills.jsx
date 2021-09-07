import React, { useEffect } from "react";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
export default function Skills({ user, updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "skills",
      headerText: "relevant skills",
      toolTip: "Skills tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });

  return (
    <section className="create-section education">
      <CreateSectionForm data={{ item: "skill", save: "skill" }}>
        inputbox
      </CreateSectionForm>
      <CreateSectionPreview>map array with jsx?</CreateSectionPreview>
    </section>
  );
}
