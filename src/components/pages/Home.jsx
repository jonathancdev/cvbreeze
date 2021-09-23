import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import homeIllustration from "../../img/home_illustration.png";
export default function Home({ user, sessionActive, logUserIn, logUserOut }) {
  return (
    <Layout sessionActive={sessionActive} logUserOut={logUserOut} user={user}>
      <section className="home">
        <img
          src={homeIllustration}
          alt="resume illustration"
          className="home__img margin-top-medium"
        />
        <h1 className="heading-secondary margin-top-small">
          Build an incredible CV &mdash;
        </h1>
        <h1 className="heading-secondary">&mdash; incredibly fast</h1>
        <Link
          to={sessionActive ? "/create" : "/signup"}
          className="btn btn--square-blue margin-top-small"
        >
          {sessionActive ? "go to CV" : "try it free!"}
        </Link>
        <p className="text margin-top-small">
          Generate a refined CV in a matter of minutes. Save your information
          for quick access anytime.
        </p>
      </section>
    </Layout>
  );
}
