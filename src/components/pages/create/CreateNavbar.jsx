import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function CreateNavbar({ completedSections }) {
  const angleLeftIcon = (
    <FontAwesomeIcon icon={faAngleLeft} className="angle__icon--left" />
  );
  const angleRightIcon = (
    <FontAwesomeIcon icon={faAngleRight} className="angle__icon--right" />
  );
  const checkIcon = <FontAwesomeIcon icon={faCheck} className="check__icon" />;
  const currentSection = window.location.pathname.substring(8);

  console.log(currentSection);

  return (
    <section className="create-navbar">
      <div className="carousel">
        <div className="carousel__header margin-top-extra-small">
          <Link>
            <div className="icon-wrap--circle">{angleLeftIcon}</div>
          </Link>
          <h2 className="heading-secondary">sections</h2>
          <Link>
            {" "}
            <div className="icon-wrap--circle">{angleRightIcon}</div>
          </Link>
        </div>
        <div className="carousel__gradient">
          <div className="carousel__nav">
            <NavLink
              className="carousel__navlink btn--create-navlink"
              activeClassName="active"
              to="/create/photo"
            >
              photo
              {completedSections.photo && (
                <div className="icon-wrap--circle">{checkIcon}</div>
              )}
            </NavLink>
            <NavLink
              className={
                !completedSections.profile
                  ? "carousel__navlink btn--create-navlink"
                  : "carousel__navlink btn--create-navlink finished"
              }
              activeClassName="active"
              to="/create/profile"
            >
              profile
              {completedSections.profile && (
                <div className="icon-wrap--circle">{checkIcon}</div>
              )}
            </NavLink>

            <NavLink
              className={
                !completedSections.workExperience
                  ? "carousel__navlink btn--create-navlink"
                  : "carousel__navlink btn--create-navlink finished"
              }
              activeClassName="active"
              to="/create/work-experience"
            >
              work experience
            </NavLink>

            <NavLink
              className={
                !completedSections.educationHistory
                  ? "carousel__navlink btn--create-navlink"
                  : "carousel__navlink btn--create-navlink finished"
              }
              activeClassName="active"
              to="/create/education"
            >
              education
            </NavLink>

            <NavLink
              className={
                !completedSections.skills
                  ? "carousel__navlink btn--create-navlink"
                  : "carousel__navlink btn--create-navlink finished"
              }
              activeClassName="active"
              to="/create/skills"
            >
              skills
            </NavLink>
            <NavLink
              className={
                !completedSections.contact
                  ? "carousel__navlink btn--create-navlink"
                  : "carousel__navlink btn--create-navlink finished"
              }
              activeClassName="active"
              to="/create/contact"
            >
              contact
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
