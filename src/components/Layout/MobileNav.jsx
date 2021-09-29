import React from "react";
import { history, NavLink } from "react-router-dom";

export default function MobileNav({ sessionActive, uncheck }) {
  return (
    <div className="mobilenav">
      <ul className="mobilenav__list">
        <li className="mobilenav__item">
          <NavLink
            exact
            to="/"
            className="mobilenav__link"
            activeClassName="active-link"
            onClick={uncheck}
          >
            home
          </NavLink>
        </li>

        {sessionActive ? (
          <li className="mobilenav__item">
            <NavLink
              exact
              to="/create"
              className="mobilenav__link"
              activeClassName="active-link"
              onClick={uncheck}
            >
              edit CV
            </NavLink>
          </li>
        ) : null}

        {!sessionActive ? (
          <li className="mobilenav__item">
            <NavLink
              to="/signin"
              className="mobilenav__link"
              activeClassName="active-link"
              onClick={uncheck}
            >
              sign in
            </NavLink>
          </li>
        ) : null}
        {!sessionActive ? (
          <li className="mobilenav__item">
            <NavLink
              to="/signup"
              className="mobilenav__link"
              activeClassName="active-link"
              onClick={uncheck}
            >
              sign up
            </NavLink>
          </li>
        ) : null}
        {sessionActive ? (
          <li className="mobilenav__item">
            <NavLink
              to="/account"
              className="mobilenav__link"
              activeClassName="active-link"
              onClick={uncheck}
            >
              account
            </NavLink>
          </li>
        ) : null}
        <li className="mobilenav__item">
          <NavLink
            to="/contact"
            className="mobilenav__link"
            activeClassName="active-link"
            onClick={uncheck}
          >
            contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
