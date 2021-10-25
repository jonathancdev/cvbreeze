import React from "react";
import CreateNavbar from "../CreateNavbar";

export default function CreateLayout({
  children,
  layoutData,
  user,
  completedSections,
  layout,
}) {
  return (
    <>
      {user ? (
        <>
          {layout === 2 ? (
            <>
              <CreateNavbar completedSections={completedSections} />
              <section className="create-body">{children}</section>
            </>
          ) : (
            <>
              <h2 className="heading-secondary create-heading margin-top-extra-small">
                {layoutData.headerText}
              </h2>
              <section className="create-body margin-top-extra-small">
                {children}
              </section>
              <CreateNavbar completedSections={completedSections} />
            </>
          )}
        </>
      ) : (
        "sign up or sign in to get started!"
      )}
    </>
  );
}
