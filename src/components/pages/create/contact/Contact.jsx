import React, { useEffect } from "react";

export default function Contact({ user, updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "contact",
      headerText: "contact information",
      toolTip: "Contact tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });

  return <div>contact</div>;
}
