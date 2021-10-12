import React, { useState, useLayoutEffect } from "react";
import ViewEducationItem from "./ViewEducationItem";
export default function ViewEducation({
  user,
  section,
  educationClass,
  updateEducationClass,
}) {
  const educationArray = localStorage.getObject(user.userId + section);
  useLayoutEffect(() => {
    let length = "";
    switch (educationArray.length) {
      case 1:
        length = "one-education-item";
        break;
      case 2:
        length = "two-education-item";
        break;
      default:
        break;
    }
    updateEducationClass(length);
  });

  return (
    <section className={"view__education " + educationClass}>
      <h1 className="heading-primary">Education</h1>
      {educationArray.map((obj) => (
        <ViewEducationItem obj={obj} />
      ))}
    </section>
  );
}
