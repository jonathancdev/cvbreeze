import React from "react";
import AutoTextFitter from "../../../AutoTextFitter";
export default function ViewContact({ user, section }) {
  const obj = localStorage.getObject(user.userId + section);
  const { city, state, country, email, telephone, website } = obj;

  return (
    <section className="view__contact">
      <h1 className="heading-primary">Contact</h1>
      <div className="contact__cont">
        <div className="contact__firstline">
          <AutoTextFitter
            className="fitter__contact--telephone contact__text"
            type="single"
            min={12}
            max={18}
            input={telephone}
          ></AutoTextFitter>
          <AutoTextFitter
            className="fitter__contact--email contact__text"
            type="single"
            min={12}
            max={18}
            input={email}
          ></AutoTextFitter>
        </div>
        <div className="contact__secondline">
          <AutoTextFitter
            className="fitter__contact--city contact__text"
            type="multi"
            min={12}
            max={18}
            input={state ? city + ", " + state : city}
          ></AutoTextFitter>
          <AutoTextFitter
            className="fitter__contact--city contact__text"
            type="multi"
            min={12}
            max={18}
            input={country}
          ></AutoTextFitter>
          <AutoTextFitter
            className="fitter__contact--email contact__text"
            type="single"
            min={12}
            max={18}
            input={website}
          ></AutoTextFitter>
        </div>
      </div>
    </section>
  );
}
