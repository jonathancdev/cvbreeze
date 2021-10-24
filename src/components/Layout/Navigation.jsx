import React, { useRef, useEffect } from "react";
import MobileNav from "./MobileNav";

export default function Navigation({ navigationType, sessionActive }) {
  const checkboxRef = useRef(null);

  const uncheck = () => {
    checkboxRef.current.checked = false;
  };
  return (
    <div className={navigationType}>
      <input
        ref={checkboxRef}
        type="checkbox"
        className={navigationType + "__checkbox"}
        id="navi-toggle"
      />
      <label htmlFor="navi-toggle" className={navigationType + "__button"}>
        <span className={navigationType + "__icon"}>&nbsp;</span>
      </label>
      <div className={navigationType + "__background"}>
        <MobileNav sessionActive={sessionActive} uncheck={uncheck} />
      </div>
    </div>
  );
}
