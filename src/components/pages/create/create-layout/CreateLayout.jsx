import React from "react";

export default function CreateLayout({ children, layoutData, user }) {
  return (
    <section className="create-body">
      <>
        {user ? (
          <>
            <h1 className="create-body__header--primary">
              Add {layoutData.headerText}
            </h1>
            <section className="create-content">{children}</section>
          </>
        ) : (
          "sign up or sign in to get started!"
        )}
      </>
    </section>
  );
}
