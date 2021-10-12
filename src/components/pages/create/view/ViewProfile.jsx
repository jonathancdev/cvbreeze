import React from "react";
import AutoTextFitter from "../../../AutoTextFitter";

export default function ViewProfile({ user, section }) {
  const profile = localStorage.getObject(user.userId + section);
  return (
    <section className="view__profile">
      <h1 className="heading-primary">Profile</h1>
      <AutoTextFitter
        className="fitter__profile"
        type="multi"
        min={16}
        max={24}
        input={profile}
      ></AutoTextFitter>
    </section>
  );
}
