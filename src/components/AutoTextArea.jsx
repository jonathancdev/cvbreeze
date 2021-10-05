import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

export default function AutoTextArea({
  className,
  userText,
  placeholder,
  update,
  maxLength,
  errorMessage,
}) {
  const lineHeight = 18; //set a little below actual line height set in css to pad bottom a bit
  const textareaRef = useRef(null);
  const [rows, setRows] = useState(null);

  useLayoutEffect(() => {
    const newRows = Math.trunc(textareaRef.current.scrollHeight / lineHeight);
    setRows(newRows);
  }, []);
  useEffect(() => {
    if (textareaRef.current.value !== userText) {
      textareaRef.current.value = userText;
    }
  }, [userText]);
  const handleChange = (e) => {
    update(e.target.value);
    const oldRows = e.target.rows;
    e.target.rows = 1;
    const newRows = ~~(e.target.scrollHeight / lineHeight);
    if (newRows === oldRows) {
      e.target.rows = newRows;
    }
    setRows(newRows);
  };

  return (
    <div className="form__element">
      <textarea
        defaultValue={userText}
        className={className}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        ref={textareaRef}
        rows={rows}
        id="autotextarea"
      ></textarea>
      <label htmlFor="autotextarea" className="visuallyhidden">
        profile
      </label>
      <p className="form__error">
        &nbsp;
        {errorMessage}
      </p>
    </div>
  );
}
