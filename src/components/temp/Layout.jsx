import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ children, user, sessionActive, logUserOut }) {
  return (
    <>
      <Header
        user={user}
        sessionActive={sessionActive}
        logUserOut={logUserOut}
      ></Header>
      <main className="main">{children}</main>
      <Footer sessionActive={sessionActive}></Footer>
    </>
  );
}
