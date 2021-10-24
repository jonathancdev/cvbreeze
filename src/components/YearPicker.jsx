import React, { useState, useRef } from "react";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";

export default function YearPicker({
  id,
  className,
  placeholder,
  updateParent,
  onSelect,
  value,
  maxYears,
}) {
  const currentYear = new Date().getFullYear();
  const firstYear = currentYear - maxYears;
  let years = [];
  for (let i = currentYear; i >= firstYear; i--) {
    years.push(i);
  }
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
    <div className="year-picker">
      <input
        ref={inputRef}
        type="text"
        id={id}
        className={className + " year-picker__input"}
        placeholder={placeholder}
        value={value}
        onSelect={() => onSelect(value)}
      />
      <div className={"year-picker__button"} onClick={handleClickList}></div>
      {listOpen ? (
        <ul ref={clickArea} className="year-picker__list">
          {years.map((year) => {
            return (
              <li onClick={handleClickItem} className="year-picker__li">
                {year}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
