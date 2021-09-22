import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";

export default function CreateNavbar({ completedSections }) {
  const arrowLeftIcon = (
    <FontAwesomeIcon
      icon={faArrowAltCircleLeft}
      className="arrow__icon--left"
    />
  );
  const arrowRightIcon = (
    <FontAwesomeIcon
      icon={faArrowAltCircleRight}
      className="arrow__icon--right"
    />
  );
  const checkIcon = (
    <FontAwesomeIcon icon={faCheckCircle} className="check__icon" />
  );

  return (
    <>
      <NavLink className="create__navlink" to="/create">
        <h1 className="nav__heading-primary">create</h1>
      </NavLink>
      <NavLink className="create__navlink" to="/account">
        <h2 className="nav__heading-secondary">my account</h2>
      </NavLink>
      <nav className="create__nav">
        <Link>{arrowLeftIcon}</Link>
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
        {checkIcon}

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
        <Link>{arrowRightIcon}</Link>
        <NavLink className="btn btn-square-blue" to="/create/view">
          view cv
        </NavLink>
      </nav>
    </>
  );
}
