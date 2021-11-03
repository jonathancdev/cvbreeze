import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import logo from "../../img/logo-white.png";

export default function Header({ user, sessionActive, logUserOut }) {
  return (
    <section className="create-header">
      <Link to="/" className="btn--icon-wrap logo__wrapper">
        {/* <img src={logo} alt="cvbreeze" className="logo" /> */}
        <div className="logo-a">cv</div>
        <div className="logo-b">breeze</div>
      </Link>
      <Navigation
        navigationType="mobile-create"
        sessionActive={sessionActive}
      />
    </section>
  );
}
