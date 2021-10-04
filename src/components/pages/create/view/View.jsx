import React, { useState } from "react";
import ViewContact from "./ViewContact";
import ViewEducation from "./ViewEducation";
import ViewPhoto from "./ViewPhoto";
import ViewProfile from "./ViewProfile";
import ViewSkills from "./ViewSkills";
import ViewWork from "./ViewWork";
import AutoTextFitter from "../../../AutoTextFitter";

export default function View({ user }) {
  const storageSections = {
    contact: "_contactData",
    education: "_educationHistoryData",
    photo: "_photoData",
    profile: "_profileData",
    skills: "_skillsData",
    work: "_workExperienceData",
  };
  //array lengths to set classes
  const [workClass, setWorkClass] = useState(null);
  const [educationClass, setEducationClass] = useState(null);
  const [skillsClass, setSkillsClass] = useState(null);

  const updateWorkClass = (str) => {
    setWorkClass(str);
  };
  const updateEducationClass = (str) => {
    setEducationClass(str);
  };
  const updateSkillsClass = (str) => {
    setSkillsClass(str);
  };
  console.log(workClass, educationClass, skillsClass);
  return (
    <section className="view-container">
      <section className="view">
        <div className="view__top"></div>
        <ViewPhoto user={user} section={storageSections.photo} />
        <div className="view__header">
          <AutoTextFitter
            className="fitter__name"
            type="single"
            min={20}
            max={60}
            input={user.firstName + " " + user.lastName}
          ></AutoTextFitter>
          <AutoTextFitter
            className="fitter__profession"
            type="single"
            min={20}
            max={48}
            input={user.profession.toUpperCase()}
          ></AutoTextFitter>
        </div>
        <div className="view__sidebar">
          <h1 className="heading-primary margin-top-medium">Skills</h1>
          <ViewSkills
            user={user}
            section={storageSections.skills}
            skillsClass={skillsClass}
            updateSkillsClass={updateSkillsClass}
          />
          <h1 className="heading-primary margin-top-medium">Contact</h1>
          <ViewContact user={user} section={storageSections.contact} />
        </div>
        <div className={"view__main " + workClass}>
          <h1 className="heading-primary">Profile</h1>
          <ViewProfile user={user} section={storageSections.profile} />
          <h1 className="heading-primary">Work Experience</h1>
          <ViewWork
            user={user}
            section={storageSections.work}
            workClass={workClass}
            updateWorkClass={updateWorkClass}
          />
          <h1 className="heading-primary">Education</h1>
          <ViewEducation
            user={user}
            section={storageSections.education}
            educationClass={educationClass}
            updateEducationClass={updateEducationClass}
          />
        </div>
        <div className="view__bottom"></div>
      </section>
    </section>
  );
}

{
  /* <div className="view__main">
          <ViewContact />
          <ViewEducation />
          <ViewPhoto />
          <ViewProfile />
          <ViewSkills />
          <ViewWork />
        </div> */
}
