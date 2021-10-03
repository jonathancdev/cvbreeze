import React from "react";
import AutoTextFitter from "../../../AutoTextFitter";

export default function ViewProfile({ user, section }) {
  const profile = localStorage.getObject(user.userId + section);
  return (
    <section className="view__profile margin-bottom-extra-small">
      <AutoTextFitter
        className="fitter__profile"
        type="multi"
        min={10}
        max={24}
        input={profile}
      ></AutoTextFitter>
    </section>
  );
}
