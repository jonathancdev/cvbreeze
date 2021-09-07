import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children, user, logUserOut }) {
  return (
    <>
      <Navbar user={user} logUserOut={logUserOut}></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}
