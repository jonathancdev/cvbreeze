import React from "react";
import MobileNav from "./MobileNav";

export default function Navigation() {
  return (
    <div class="navigation">
      <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />
      <label for="navi-toggle" class="navigation__button">
        <span class="navigation__icon">&nbsp;</span>
      </label>
      <div class="navigation__background">
        <MobileNav />
      </div>
    </div>
  );
}
