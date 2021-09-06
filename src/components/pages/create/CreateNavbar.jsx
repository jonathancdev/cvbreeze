import React from "react";
import { Link } from "react-router-dom";

export default function CreateNavbar() {
  return (
    <>
      <h1 className="nav__heading-primary">sections</h1>
      <nav className="create__nav">
        <Link className="create__navlink" to="/create/photo">
          photo
        </Link>

        <Link className="create__navlink" to="/create/profile">
          profile
        </Link>

        <Link className="create__navlink" to="/create/workexperience">
          work experience
        </Link>

        <Link className="create__navlink" to="/create/education">
          education
        </Link>

        <Link className="create__navlink" to="/create/skills">
          skills
        </Link>
        <Link className="create__navlink" to="/create/contact">
          contact
        </Link>
        <Link className="btn btn-square-blue" to="/create/view">
          view cv
        </Link>
      </nav>
    </>
  );
}
