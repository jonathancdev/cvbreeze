import React from "react";
import { Link } from "react-router-dom";
export default function Navbar({ user, sessionActive, logUserOut }) {
  return (
    <nav className="layout__nav">
      <Link className="layout__navlink" to="/#">
        logo
      </Link>

      <Link
        className="layout__navlink"
        to={sessionActive ? "/create" : "/signup"}
      >
        {sessionActive ? "edit CV" : "create CV"}
      </Link>

      {!sessionActive ? (
        <Link className="layout__navlink" to="/signup">
          sign up
        </Link>
      ) : null}

      {!sessionActive ? (
        <Link className="layout__navlink" to="/signin">
          sign in
        </Link>
      ) : null}

      {sessionActive ? <Link to="/account">{user.firstName}</Link> : null}
    </nav>
  );
}
