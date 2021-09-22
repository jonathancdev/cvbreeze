import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import Navigation from "./Navigation";

export default function Footer() {
  const questionIcon = (
    <FontAwesomeIcon icon={faQuestionCircle} className="question__icon" />
  );
  return (
    <footer className="footer">
      {questionIcon}
      <div className="footer__shape">
        <Navigation />
      </div>
    </footer>
  );
}
