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
          className="home__img margin-top-small margin-bottom-small"
        />
        <h2 className="heading-secondary margin-top-extra-small">
          Build an incredible CV &mdash;
        </h2>
        <h2 className="heading-secondary">&mdash; incredibly fast</h2>
        <Link
          to={sessionActive ? "/create" : "/signup"}
          className="btn btn--square-blue margin-top-small"
        >
          {sessionActive ? "go to CV" : "try it free!"}
        </Link>
      </section>
    </Layout>
  );
}
