import React, { useState, useRef } from "react";

export default function InputEditable({
  inputType,
  userKey,
  userInfo,
  defaultValue,
  rules,
  errorMessage,
  updateUserInformation,
}) {
  const inputRef = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState(inputType);
  const handleEdit = () => {
    setEditing(true);
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
        alert(`change ${userInfo} to ${newValue}?`);
        updateUserInformation(userKey, newValue);
        setEditing(false);
        setError(false);
        setType(inputType);
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
  return (
    <div>
      <input
        type={type}
        onChange={handleChange}
        ref={inputRef}
        value={value}
        disabled={!editing}
      />
      <button onClick={!editing ? handleEdit : handleSave}>
        {!editing ? `edit ${userInfo}` : "save"}
      </button>
      {inputType === "password" ? (
        <button onClick={handlePasswordToggle}>
          {type === "password" ? "show password" : "hide password"}
        </button>
      ) : null}
      {error && editing ? <p>{errorMessage}</p> : null}
    </div>
  );
}
