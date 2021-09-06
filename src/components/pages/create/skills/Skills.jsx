import React, { useEffect } from "react";

export default function Skills({ updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "skills",
      headerText: "relevant skills",
      toolTip: "Skills tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, []);
  return <div>skills</div>;
}
