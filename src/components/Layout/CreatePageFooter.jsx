import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

export default function CreatePageFooter({ user, incomplete, viewing }) {
  const questionIcon = (
    <FontAwesomeIcon icon={faQuestionCircle} className="question__icon" />
  );
  const [errorActive, setErrorActive] = useState(false);
  const handleIncompleteClick = () => {
    if (incomplete) {
      setErrorActive(true);
      setTimeout(() => {
        setErrorActive(false);
      }, 2000);
    }
  };
  return (
    <footer className="create-footer">
      <Link to="/contact" className="btn btn--icon-wrap">
        {questionIcon}
      </Link>
      {user ? (
        <div className="create-footer__shape">
          {!viewing ? (
            <Link to={!incomplete ? "/create/view" : "#"}>
              <h2 onClick={handleIncompleteClick} className="heading-secondary">
                view cv
              </h2>
            </Link>
          ) : (
            <Link to="/create">
              <h2 className="heading-secondary">edit cv</h2>
            </Link>
          )}
        </div>
      ) : null}
      <div className={!errorActive ? "view__error" : "view__error active"}>
        complete all sections!
      </div>
    </footer>
  );
}
