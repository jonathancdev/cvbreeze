import React, { useState, useRef, useEffect } from "react";

export default function AutoTextArea({
  className,
  userText,
  placeholder,
  update,
}) {
  const lineHeight = 16;

  const textareaRef = useRef(null);
  const [rows, setRows] = useState(2);

  useEffect(() => {
    //persists profile value after leaving page but allows editing after save
    textareaRef.current.value = userText;
    //persists rowheight so textarea doesn't collapse when leave page
    setRows(textareaRef.current.scrollHeight / lineHeight);
    //sets height back to normal if text deleted
    if (!userText) {
      setRows(2);
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
    <textarea
      className={className}
      placeholder={placeholder}
      onChange={handleChange}
      ref={textareaRef}
      rows={rows}
    ></textarea>
  );
}
