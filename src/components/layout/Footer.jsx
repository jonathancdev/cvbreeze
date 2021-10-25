import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import Navigation from "./Navigation";

export default function Footer({ sessionActive }) {
  const questionIcon = (
    <FontAwesomeIcon icon={faQuestionCircle} className="question__icon" />
  );
  return (
    <footer className="footer">
      <Link to="/contact" className="btn btn--icon-wrap">
        {questionIcon}
      </Link>
      <div className="footer__shape">
        <Navigation
          navigationType={"mobile-home"}
          sessionActive={sessionActive}
        />
      </div>
    </footer>
  );
}
