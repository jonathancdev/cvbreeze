import React from "react";

export default function PhotoInput() {
  return (
    <>
      <label htmlFor="" className="input__label"></label>
      <input type="text" className="input--standard" />
      <input
        type="file"
        accept="img/png, image/gif, image/jpeg"
        className="input--hidden-browse"
      />
    </>
  );
}

//input--hidden-browse will have hidden attribute
