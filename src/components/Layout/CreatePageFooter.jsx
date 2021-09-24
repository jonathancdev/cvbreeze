import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

export default function CreatePageFooter() {
  const questionIcon = (
    <FontAwesomeIcon icon={faQuestionCircle} className="question__icon" />
  );
  return (
    <footer className="create-footer">
      <Link to="/contact" className="btn btn--icon-wrap">
        {questionIcon}
      </Link>
      <div className="create-footer__shape">
        <h2 className="heading-secondary">view cv</h2>
      </div>
    </footer>
  );
}
