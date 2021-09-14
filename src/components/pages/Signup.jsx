import React, { useState } from "react";
import { Link } from "react-router-dom";
import { importTestUser } from "../../utilities/importTestUser";

export default function Signup({ logUserIn }) {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    password: "",
    email: "",
  });
  const loadTestUser = () => {
    importTestUser();
    logUserIn({
      firstName: "Maria",
      lastName: "Breeze",
      profession: "Managing Partner",
      password: "password",
      email: "maria@cvbreeze.cv",
      userId: "BREEZEID_J4B6P12",
    });
  };
  const handleFormSubmit = () => {
    const userCount = Object.keys(localStorage).filter((item) =>
      item.includes("user_")
    ).length;
    const obj = userInfo;
    const id =
      "breezeId_" +
      obj.firstName[0] +
      obj.firstName.length +
      obj.lastName[0] +
      obj.lastName.length +
      obj.profession[0] +
      obj.profession.length;
    obj.userId = id.toUpperCase();
    localStorage.setObject("user_" + (userCount + 1), obj);
  };
  const setFirstName = (e) => {
    const value = e.target.value;
    setUserInfo((prevState) => {
      return { ...prevState, firstName: value };
    });
  };
  const setLastName = (e) => {
    const value = e.target.value;
    setUserInfo((prevState) => {
      return { ...prevState, lastName: value };
    });
  };
  const setProfession = (e) => {
    const value = e.target.value;
    setUserInfo((prevState) => {
      return { ...prevState, profession: value };
    });
  };
  const setEmail = (e) => {
    const value = e.target.value;
    setUserInfo((prevState) => {
      return { ...prevState, email: value };
    });
  };
  const setPassword = (e) => {
    const value = e.target.value;
    setUserInfo((prevState) => {
      return { ...prevState, password: value };
    });
  };

  return (
    <section className="signup">
      <h1 className="heading--primary">Create your account</h1>
      <h3 className="heading--tertiary">not ready to make an account?</h3>
      <Link className="heading--tertiary" to="/create" onClick={loadTestUser}>
        try it out free!
      </Link>
      <form className="signup__form">
        <input
          placeholder="First name"
          type="text"
          className="input--standard"
          onChange={setFirstName}
        />
        <input
          placeholder="Last name"
          type="text"
          className="input--standard"
          onChange={setLastName}
        />
        <input
          placeholder="Profession"
          type="email"
          className="input--standard"
          onChange={setProfession}
        />
        <input
          placeholder="Email"
          type="email"
          className="input--standard"
          onChange={setEmail}
        />
        <input
          placeholder="Password"
          type="password"
          className="input--standard"
          onChange={setPassword}
        />
        <Link to="/create" className="btn--square" onClick={handleFormSubmit}>
          create account
        </Link>
      </form>
      <p className="signup__text">already have an account?</p>
      <Link to="/signin">
        <p className="signup__text">sign in here</p>
      </Link>
    </section>
  );
}
