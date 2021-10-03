import React, { useState, useLayoutEffect } from "react";
import ViewWorkItem from "./ViewWorkItem";
export default function ViewWork({ user, section }) {
  const workArray = localStorage.getObject(user.userId + section);
  const [lengthClass, setLengthClass] = useState("");
  useLayoutEffect(() => {
    let length = "";
    switch (workArray.length) {
      case 1:
        length = "one-work-item";
        break;
      case 2:
        length = "two-work-item";
        break;
      case 3:
        length = "three-work-item";
        break;
      default:
        break;
    }
    setLengthClass(length);
  });
  console.log(lengthClass);
  console.log(workArray);

  return (
    <section className="view__work work margin-bottom-extra-small">
      {workArray.map((obj) => (
        <ViewWorkItem obj={obj} />
      ))}
    </section>
  );
}
//   <h1 className="work__heading-primary">Plumber at Plumbing Company</h1>;
{
  /* <AutoTextFitter
          className="fitter__profile"
          type="multi"
          min={10}
          max={24}
          input={profile}
        ></AutoTextFitter> */
}
