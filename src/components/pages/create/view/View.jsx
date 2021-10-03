import React from "react";
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
  console.log(user);
  return (
    <section className="view-container">
      <section className="view">
        <div className="view__top"></div>
        <ViewPhoto user={user} section={storageSections.photo} />
        <div className="view__header">
          <AutoTextFitter
            className="fitter__name margin-top-extra-small"
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
        <div className="view__sidebar"></div>
        <div className="view__main">
          <h1 className="heading-primary">Profile</h1>
          <ViewProfile user={user} section={storageSections.profile} />
          <h1 className="heading-primary">Work Experience</h1>
          <ViewWork user={user} section={storageSections.work} />
          <h1 className="heading-primary">Education</h1>
          <ViewEducation />
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
