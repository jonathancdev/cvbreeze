import React from "react";

export default function CreateLayout({ children, layoutData, user }) {
  return (
    <section className="create-body margin-top-small">
      <>
        {user ? (
          <>
            <h1 className="heading-secondary">{layoutData.headerText}</h1>
            <section className="create-content">{children}</section>
          </>
        ) : (
          "sign up or sign in to get started!"
        )}
      </>
    </section>
  );
}
