import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputEditable({
  inputType,
  userKey,
  userInfo,
  defaultValue,
  rules,
  errorMessage,
  updateUserInformation,
  openConfirm,
}) {
  //fontawesomeicons
  const passwordIconShow = (
    <FontAwesomeIcon icon={faEye} className="passwordIcon" />
  );
  const passwordIconHide = (
    <FontAwesomeIcon icon={faEyeSlash} className="passwordIcon" />
  );
  const inputRef = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState(inputType);
  const handleEdit = () => {
    setEditing(true);
    setTimeout(() => inputRef.current.select(), 300);
  };
  const validate = (string, rulesObj) => {
    if (rulesObj) {
      if (rulesObj.type === "regex") {
        return string.match(rulesObj.rule);
      } else if (rulesObj.type === "minLength") {
        return string.length >= rulesObj.rule;
      }
    } else {
      return true;
    }
  };
  const handleSave = () => {
    const newValue = inputRef.current.value;
    if (newValue !== defaultValue) {
      if (!validate(newValue, rules)) {
        setError(true);
        return;
      } else {
        openConfirm(
          `change ${userInfo} to ${newValue}?`,
          () => confirmChange,
          () => denyChange
        );
      }
    } else {
      setEditing(false);
      setError(false);
      setType(inputType);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };
  const handlePasswordToggle = () => {
    type === "password" ? setType("text") : setType("password");
  };
  const confirmChange = () => {
    const newValue = inputRef.current.value;
    updateUserInformation(userKey, newValue);
    setEditing(false);
    setError(false);
    setType(inputType);
  };
  const denyChange = () => {
    setValue(defaultValue);
    setEditing(false);
  };
  return (
    <div className="account__element margin-top-extra-small margin-bottom-extra-small">
      <div className="account__input-pair">
        <div className="account__input-parent">
          <input
            className="input--standard"
            type={type}
            onChange={handleChange}
            ref={inputRef}
            value={value}
            disabled={!editing}
          />
          {inputType === "password" ? (
            <button
              onClick={handlePasswordToggle}
              className="btn btn--account-pw"
            >
              {type === "password" ? passwordIconShow : passwordIconHide}
            </button>
          ) : null}
        </div>

        <button
          className="btn btn--account-info"
          onClick={!editing ? handleEdit : handleSave}
        >
          {!editing ? "change" : "save"}
        </button>
      </div>
      {error && editing ? <p className="form__error">{errorMessage}</p> : null}
    </div>
  );
}
