import React from "react";
import { Link } from "react-router-dom";
export default function Navbar({ user, logUserOut }) {
  return (
    <nav className="layout__nav">
      <Link className="layout__navlink" to="/#">
        logo
      </Link>

      <Link className="layout__navlink" to="/create">
        create cv
      </Link>

      <Link className="layout__navlink" to="/signup">
        sign up
      </Link>

      <Link className="layout__navlink" to="/signin">
        sign in
      </Link>
    </nav>
  );
}
