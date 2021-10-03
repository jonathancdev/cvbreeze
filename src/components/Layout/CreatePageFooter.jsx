import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

export default function CreatePageFooter({ user }) {
  const questionIcon = (
    <FontAwesomeIcon icon={faQuestionCircle} className="question__icon" />
  );
  return (
    <footer className="create-footer">
      <Link to="/contact" className="btn btn--icon-wrap">
        {questionIcon}
      </Link>
      {user ? (
        <div className="create-footer__shape">
          <Link to="/create/view">
            <h2 className="heading-secondary">view cv</h2>
          </Link>
        </div>
      ) : null}
    </footer>
  );
}
