import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function CreateNavbar({ completedSections }) {
  return (
    <>
      <NavLink className="create__navlink" to="/create">
        <h1 className="nav__heading-primary">create</h1>
      </NavLink>
      <nav className="create__nav">
        <NavLink
          className={
            !completedSections.photo
              ? "create__navlink "
              : "create__navlink finished"
          }
          activeClassName="active"
          to="/create/photo"
        >
          photo
        </NavLink>

        <NavLink
          className={
            !completedSections.profile
              ? "create__navlink"
              : "create__navlink finished"
          }
          activeClassName="active"
          to="/create/profile"
        >
          profile
        </NavLink>

        <NavLink
          className={
            !completedSections.workExperience
              ? "create__navlink"
              : "create__navlink finished"
          }
          activeClassName="active"
          to="/create/work-experience"
        >
          work experience
        </NavLink>

        <NavLink
          className={
            !completedSections.educationHistory
              ? "create__navlink"
              : "create__navlink finished"
          }
          activeClassName="active"
          to="/create/education"
        >
          education
        </NavLink>

        <NavLink
          className={
            !completedSections.skills
              ? "create__navlink"
              : "create__navlink finished"
          }
          activeClassName="active"
          to="/create/skills"
        >
          skills
        </NavLink>
        <NavLink
          className={
            !completedSections.contact
              ? "create__navlink"
              : "create__navlink finished"
          }
          activeClassName="active"
          to="/create/contact"
        >
          contact
        </NavLink>
        <NavLink className="btn btn-square-blue" to="/create/view">
          view cv
        </NavLink>
      </nav>
    </>
  );
}
