import React from "react";

export default function CreateLayout({ children, layoutData }) {
  console.log(layoutData);
  return (
    <section className="create-body">
      <h1 className="create-body__header--primary">
        Add {layoutData.headerText}
      </h1>
      <section className="create-content">{children}</section>
    </section>
  );
}
