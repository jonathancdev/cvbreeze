import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../../img/logo-white.png";

export default function Header({ user, sessionActive, logUserOut }) {
  return (
    <section className="header">
      <Navbar
        user={user}
        sessionActive={sessionActive}
        logUserOut={logUserOut}
      ></Navbar>
      <div className="header__shape">
        <Link to="/" className="btn--icon-wrap">
          {" "}
          <img src={logo} alt="cvbreeze" className="logo" />
        </Link>
      </div>
    </section>
  );
}
