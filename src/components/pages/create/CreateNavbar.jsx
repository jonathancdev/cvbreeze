import React from "react";
import { Link } from "react-router-dom";

export default function CreateNavbar({ completedSections }) {
  return (
    <>
      <Link className="create__navlink" to="/create">
        <h1 className="nav__heading-primary">create</h1>
      </Link>
      <nav className="create__nav">
        <Link
          className={
            !completedSections.photo
              ? "create__navlink"
              : "create__navlink finished"
          }
          to="/create/photo"
        >
          photo
        </Link>

        <Link
          className={
            !completedSections.profile
              ? "create__navlink"
              : "create__navlink finished"
          }
          to="/create/profile"
        >
          profile
        </Link>

        <Link
          className={
            !completedSections.workExperience
              ? "create__navlink"
              : "create__navlink finished"
          }
          to="/create/work-experience"
        >
          work experience
        </Link>

        <Link
          className={
            !completedSections.educationHistory
              ? "create__navlink"
              : "create__navlink finished"
          }
          to="/create/education"
        >
          education
        </Link>

        <Link
          className={
            !completedSections.skills
              ? "create__navlink"
              : "create__navlink finished"
          }
          to="/create/skills"
        >
          skills
        </Link>
        <Link
          className={
            !completedSections.contact
              ? "create__navlink"
              : "create__navlink finished"
          }
          to="/create/contact"
        >
          contact
        </Link>
        <Link className="btn btn-square-blue" to="/create/view">
          view cv
        </Link>
      </nav>
    </>
  );
}
