import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
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
  const [prevPath, setPrevPath] = useState("/create");
  const [nextPath, setNextPath] = useState("/create");
  const [boolean, setBoolean] = useState(false);
  const [scrollTo, setScrollTo] = useState(0);
  const scrollContainer = useRef(null);
  const paths = [
    // { photo: "/create/photo" },
    // { profile: "/create/profile" },
    // { workexperience: "/create/workexperience" },
    // { education: "/create/education" },
    // { skills: "/create/skills" },
    // { contact: "/create/contact" },
    "photo",
    "profile",
    "workexperience",
    "education",
    "skills",
    "contact",
  ];
  const scrollValues = {
    //in percent
    photo: 0.16,
    profile: 0.16,
    workexperience: 9.72,
    education: 31.96,
    skills: 45,
    contact: 50,
  };

  useLayoutEffect(() => {
    const currentSection = window.location.pathname.substring(8);
    const width = parseInt(scrollContainer.current.scrollWidth);
    const percent = scrollValues[currentSection];
    const scrollAmount = (width * percent) / 100;
    scrollContainer.current.scrollLeft = scrollAmount;
  });
  useLayoutEffect(() => {
    const index = paths.findIndex((item) => item === currentSection);
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    prevIndex >= 0
      ? setPrevPath("/create/" + paths[prevIndex])
      : setPrevPath("/create/" + currentSection);
    nextIndex <= 5
      ? setNextPath("/create/" + paths[nextIndex])
      : setNextPath("/create/" + currentSection);
  });
  // useLayoutEffect(() => {
  //   const width = parseInt(scrollContainer.current.scrollWidth);
  //   const scroll = scrollContainer.current.scrollLeft + 1;
  //   const percent = (scroll / width) * 100;
  //   console.log(width);
  //   console.log(scroll);
  //   console.log(percent);
  //   //scrollContainer.current.scrollLeft = 375 / 5.43;
  // });

  // useEffect(() => {
  //   scrollContainer.current.scrollLeft = scrollTo;
  //   console.log(scrollContainer.current.scrollLeft);
  // }, []);

  const forceRender = () => {
    setBoolean((prevState) => !prevState);
  };

  return (
    <section className="create-navbar">
      <div className="carousel">
        <div className="carousel__header margin-top-extra-small">
          <Link to={prevPath}>
            <div className="icon-wrap--circle">{angleLeftIcon}</div>
          </Link>
          <h2 onClick={forceRender} className="heading-secondary">
            sections
          </h2>
          <Link to={nextPath}>
            <div className="icon-wrap--circle">{angleRightIcon}</div>
          </Link>
        </div>
        <div className="carousel__gradient">
          <div ref={scrollContainer} className="carousel__nav">
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
              to="/create/workexperience"
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
