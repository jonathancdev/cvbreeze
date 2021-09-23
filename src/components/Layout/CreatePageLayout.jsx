import React from "react";
import CreatePageHeader from "./CreatePageHeader";
import CreatePageFooter from "./CreatePageFooter";
export default function CreatePageLayout({
  children,
  user,
  sessionActive,
  logUserOut,
}) {
  return (
    <>
      <CreatePageHeader
        user={user}
        sessionActive={sessionActive}
        logUserOut={logUserOut}
      ></CreatePageHeader>
      <main className="main">{children}</main>
      <CreatePageFooter />
    </>
  );
}
