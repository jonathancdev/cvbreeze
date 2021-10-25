import React, { useLayoutEffect } from "react";
import ViewWorkItem from "./ViewWorkItem";
export default function ViewWork({
  user,
  section,
  workClass,
  updateWorkClass,
}) {
  const workArray = localStorage.getObject(user.userId + section);

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
    updateWorkClass(length);
  });

  return (
    <section className={"view__work work " + workClass}>
      <h1 className="heading-primary">Work Experience</h1>
      {workArray.map((obj) => (
        <ViewWorkItem obj={obj} key={obj.id} />
      ))}
    </section>
  );
}
