import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <section className="home">
      <img src="" alt="" className="home__img" />
      <h1 className="home__heading--primary">
        An easy way to create an amazing CV
      </h1>
      <p className="home__text">
        Generate a beautiful CV in only a few minutes
      </p>
      <p className="home__text">
        Save your information for quick access anytime, anywhere
      </p>
      <Link className="btn btn--square-blue">try it free/go to cv</Link>
    </section>
  );
}
