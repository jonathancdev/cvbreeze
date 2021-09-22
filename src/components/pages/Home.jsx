import React from "react";
import { Link } from "react-router-dom";
import homeIllustration from "../../img/home_illustration.png";
export default function Home({ sessionActive }) {
  return (
    <section className="home">
      <img
        src={homeIllustration}
        alt="resume illustration"
        className="home__img"
      />
      <h1 className="home__heading--primary">
        An easy way to create an amazing CV
      </h1>
      <p className="home__text">
        Generate a beautiful CV in only a few minutes
      </p>
      <p className="home__text">
        Save your information for quick access anytime, anywhere
      </p>
      <Link
        to={sessionActive ? "/create" : "/signup"}
        className="btn btn--square-blue"
      >
        {sessionActive ? "go to CV" : "try it free!"}
      </Link>
    </section>
  );
}
