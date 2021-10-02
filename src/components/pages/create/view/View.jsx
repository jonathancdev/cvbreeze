import React from "react";
import ViewContact from "./ViewContact";
import ViewEducation from "./ViewEducation";
import ViewPhoto from "./ViewPhoto";
import ViewProfile from "./ViewProfile";
import ViewSkills from "./ViewSkills";
import ViewWork from "./ViewWork";

export default function View({ user }) {
  return (
    <section className="view-container">
      <section className="view">
        <div className="view__header">
          <h1>hello bitches</h1>
        </div>
        <div className="view__main">
          <ViewContact />
          <ViewEducation />
          <ViewPhoto />
          <ViewProfile />
          <ViewSkills />
          <ViewWork />
        </div>
        <div className="view__footer">
          <h2>footer shit</h2>
        </div>
      </section>
    </section>
  );
}
