import React from "react";

export default function CreateSectionPreview({ children }) {
  return (
    <div>
      <section className="create-section__preview">{children}</section>
    </div>
  );
}
