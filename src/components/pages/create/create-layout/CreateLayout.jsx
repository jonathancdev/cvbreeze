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
          <h1 className="heading-secondary">{layoutData.headerText}</h1>
          <section className="create-body margin-top-small">{children}</section>
          <CreateNavbar completedSections={completedSections} />
        </>
      ) : (
        "sign up or sign in to get started!"
      )}
    </>
  );
}
