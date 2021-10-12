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
      <h1 className="heading-primary">Skills</h1>
      {skillsArray.map((obj) => (
        <div className="skill__cont">
          <p className="skill__text">{obj.skill}</p>
          <p className="html__icon">&bull;</p>
        </div>
      ))}
    </section>
  );
}
