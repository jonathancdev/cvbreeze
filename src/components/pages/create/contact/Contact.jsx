import React, { useEffect } from "react";

export default function Contact({ updateLayoutData }) {
  useEffect(() => {
    const layoutData = {
      section: "contact",
      headerText: "contact information",
      toolTip: "Contact tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, []);
  return <div>contact</div>;
}
