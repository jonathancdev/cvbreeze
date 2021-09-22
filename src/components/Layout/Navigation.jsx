import React from "react";
import Navbar from "./Navbar";

export default function Navigation() {
  return (
    <div class="navigation">
      <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />
      <label for="navi-toggle" class="navigation__button">
        <span class="navigation__icon">&nbsp;</span>
      </label>
      <div class="navigation__background">
        <Navbar />
      </div>
    </div>
  );
}
