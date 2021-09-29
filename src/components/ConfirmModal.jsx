import React from "react";

export default function ConfirmModal({
  message,
  callback,
  closeConfirm,
  handleConfirm,
}) {
  const handleYes = () => {
    handleConfirm(true);
  };
  const handleNo = () => {
    handleConfirm(false);
  };
  return (
    <div className="confirm-modal">
      <div className="confirm-modal__box">
        <p className="confirm-modal__text">{message}</p>
        <div className="confirm-modal__buttons">
          <button onClick={handleYes} className="btn btn--square-blue">
            yes
          </button>
          <button onClick={handleNo} className="btn btn--square-blue">
            no
          </button>
        </div>
      </div>
    </div>
  );
}
