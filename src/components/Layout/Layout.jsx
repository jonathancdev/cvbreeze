import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children, user, sessionActive, logUserOut }) {
  return (
    <>
      <Navbar
        user={user}
        sessionActive={sessionActive}
        logUserOut={logUserOut}
      ></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}
