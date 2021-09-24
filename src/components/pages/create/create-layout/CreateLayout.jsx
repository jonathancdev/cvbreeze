import React from "react";
import CreateNavbar from "../CreateNavbar";

export default function CreateLayout({
  children,
  layoutData,
  user,
  completedSections,
}) {
  return (
    <>
      {user ? (
        <>
          <h2 className="heading-secondary margin-top-extra-small">
            {layoutData.headerText}
          </h2>
          <section className="create-body margin-top-extra-small">
            {children}
          </section>
          <CreateNavbar completedSections={completedSections} />
        </>
      ) : (
        "sign up or sign in to get started!"
      )}
    </>
  );
}
