import React, { useEffect } from "react";

export default function Education({ updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "education",
      headerText: "education history",
      toolTip: "Education tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, []);
  return <div>education</div>;
}
