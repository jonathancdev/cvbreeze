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
    //PERSISTS PROFILE VALUE AFTER LEAVING PAGE BUT ALLOWS EDITING AFTER SAVE
    textareaRef.current.value = userText;
    //PERSISTS ROWHEIGHT SO TEXTAREA DOESN'T COLLAPSE WHEN LEAVE PAGE
    setRows(textareaRef.current.scrollHeight / lineHeight);
    //SETS HEIGHT BACK TO NORMAL IF TEXT DELETED
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
