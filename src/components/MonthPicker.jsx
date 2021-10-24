import React, { useState, useRef } from "react";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";

export default function MonthPicker({
  id,
  className,
  placeholder,
  updateParent,
  showError,
  onSelect,
  value,
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [errorMessage, setErrorMessage] = useState("month required");
  const [listOpen, setListOpen] = useState(false);
  const handleClickList = () => {
    setListOpen(true);
  };
  const handleClickItem = (e) => {
    const value = e.target.innerText;
    updateParent(value);
    setListOpen(false);
    inputRef.current.value = value;
    inputRef.current.select();
  };
  const clickArea = useRef(null);
  useOutsideClickHandler(clickArea, () => setListOpen(false));
  const inputRef = useRef(null);
  return (
    <div className="month-picker">
      <input
        ref={inputRef}
        type="text"
        id={id}
        className={className + " month-picker__input"}
        placeholder={placeholder}
        value={value}
        onSelect={() => onSelect(value)}
      />
      <div className={"month-picker__button"} onClick={handleClickList}></div>
      {listOpen ? (
        <ul ref={clickArea} className="month-picker__list">
          {months.map((month) => {
            return (
              <li onClick={handleClickItem} className="month-picker__li">
                {month}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
