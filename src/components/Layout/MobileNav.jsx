import React from "react";
import { Link } from "react-router-dom";

export default function MobileNav() {
  return (
    <div className="navigation__nav">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link to="/" className="navigation__link">
            home
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/create" className="navigation__link">
            create cv
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/signin" className="navigation__link">
            sign in
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/signup" className="navigation__link">
            sign up
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/contact" className="navigation__link">
            contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
