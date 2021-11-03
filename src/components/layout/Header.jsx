import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo-white.png";

export default function Header({ user, sessionActive, logUserOut }) {
  return (
    <section className="header">
      <div className="header__shape">
        <Link to="/" className="btn--icon-wrap logo__wrapper">
          {/* <img src={logo} alt="cvbreeze" className="logo" /> */}
          <div className="logo-a">cv</div>
          <div className="logo-b">breeze</div>
        </Link>
      </div>
    </section>
  );
}
