import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function AlertModal({ message, closeAlert }) {
  const closeIcon = <FontAwesomeIcon icon={faTimes} className="close__icon" />;
  return (
    <div className="alert-modal">
      <div className="alert-modal__box">
        <p className="alert-modal__text">{message}</p>

        <button
          onClick={closeAlert}
          className="btn btn--alert icon-wrap--circle"
        >
          {closeIcon}
        </button>
      </div>
    </div>
  );
}
