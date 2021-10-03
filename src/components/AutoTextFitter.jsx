import React from "react";
import { Textfit } from "react-textfit";

export default function AutoTextFitter({ input, className, type, min, max }) {
  return (
    <div>
      <Textfit
        className={className + " fitter"}
        mode={type}
        min={min}
        max={max}
      >
        {input}
      </Textfit>
    </div>
  );
}
