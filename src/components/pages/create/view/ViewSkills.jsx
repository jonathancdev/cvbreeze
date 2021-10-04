import React, { useLayoutEffect } from "react";

export default function ViewSkills({
  user,
  section,
  skillsClass,
  updateSkillsClass,
}) {
  const skillsArray = localStorage.getObject(user.userId + section);
  useLayoutEffect(() => {
    let length = "";
    if (skillsArray.length <= 3) {
      length = "three-skills";
    } else if (skillsArray.length > 3 && skillsArray.length < 7) {
      length = "six-skills";
    } else if (skillsArray.length >= 7) {
      length = "eight-skills";
    }
    updateSkillsClass(length);
  });
  return (
    <section className={"view__skills " + skillsClass}>
      <ul className="skill__list">
        {skillsArray.map((obj) => (
          <li className="skill__text">{obj.skill}</li>
        ))}
      </ul>
    </section>
  );
}
