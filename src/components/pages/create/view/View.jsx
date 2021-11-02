import React, { useState, useEffect } from "react";
import ViewContact from "./ViewContact";
import ViewEducation from "./ViewEducation";
import ViewPhoto from "./ViewPhoto";
import ViewProfile from "./ViewProfile";
import ViewSkills from "./ViewSkills";
import ViewWork from "./ViewWork";
import AutoTextFitter from "../../../AutoTextFitter";
import { Link } from "react-router-dom";

export default function View({ user, updateViewing, mode, openAlert }) {
  const storageSections = {
    contact: "_contactData",
    education: "_educationHistoryData",
    photo: "_photoData",
    profile: "_profileData",
    skills: "_skillsData",
    work: "_workExperienceData",
  };
  useEffect(() => {
    updateViewing(true);
    return () => {
      updateViewing(false);
    };
  });
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
  const printHelp = () => {
    openAlert(
      "in your browser's printer settings, choose 'A4' as the paper size and select the 'background graphics' or 'print backgrounds' option for best results"
    );
  };
  const handlePrint = () => {
    setTimeout(window.print, 1500);
  };
  return (
    <section className={"view-container " + mode}>
      <div className="view__options">
        <Link
          onClick={handlePrint}
          className="view__print-link"
          to={mode === "preview" ? "/print" : "/create/view"}
        >
          {mode === "preview" ? "print CV" : "go back"}
        </Link>
        <button className="btn__print-help btn" onClick={printHelp}>
          print display problems?
        </button>
      </div>
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
        <div className={"view__main " + workClass}>
          <ViewProfile user={user} section={storageSections.profile} />
          <ViewWork
            user={user}
            section={storageSections.work}
            workClass={workClass}
            updateWorkClass={updateWorkClass}
          />
          <ViewEducation
            user={user}
            section={storageSections.education}
            educationClass={educationClass}
            updateEducationClass={updateEducationClass}
          />
          <div className="view__sidebar">
            <ViewSkills
              user={user}
              section={storageSections.skills}
              skillsClass={skillsClass}
              updateSkillsClass={updateSkillsClass}
            />
            <ViewContact user={user} section={storageSections.contact} />
          </div>
        </div>
        <div className="view__bottom"></div>
      </section>
    </section>
  );
}
