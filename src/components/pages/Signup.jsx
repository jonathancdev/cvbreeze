import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { importTestUser } from "../../utilities/importTestUser";
import { useForm, Controller } from "react-hook-form";
import Layout from "../layout/Layout";

export default function Signup({ user, sessionActive, logUserIn, logUserOut }) {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const createStorageMap = (id) => {
    const keyArray = [
      ["_photoData", null],
      ["_workExperienceData", []],
      ["_profileData", null],
      ["_contactData", null],
      ["_skillsData", []],
      ["_educationHistoryData", []],
    ];
    const storageKeys = keyArray.map((item) => {
      const obj = {
        key: id + item[0],
        value: item[1],
      };
      return obj;
    });
    storageKeys.forEach((item) => {
      localStorage.setObject(item.key, item.value);
    });
  };
  const loadTestUser = () => {
    importTestUser();
    logUserIn({
      firstName: "Maria",
      lastName: "Breeze",
      profession: "Managing Partner",
      password: "password",
      email: "maria@cvbreeze.cv",
      userId: "BREEZEID_M5B6M16",
      storageKey: "user_test",
    });
  };
  const handleFormSubmit = () => {
    const userCount = Object.keys(localStorage).filter((item) =>
      item.includes("user_")
    ).length;
    const storageKey = "user_" + (userCount + 1);
    const obj = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      profession: profession.current.value,
      email: email.current.value,
      password: password.current.value,
      storageKey: storageKey,
    };
    const id =
      "BREEZEID_" +
      obj.firstName[0] +
      obj.firstName.length +
      obj.lastName[0] +
      obj.lastName.length +
      obj.profession[0] +
      obj.profession.length;
    obj.userId = id.toUpperCase();
    localStorage.setObject(storageKey, obj);
    createStorageMap(id.toUpperCase());
    logUserIn(localStorage.getObject(storageKey));
    history.push("/create");
  };
  const firstName = useRef(null);
  const lastName = useRef(null);
  const profession = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  return (
    <Layout sessionActive={sessionActive} logUserOut={logUserOut} user={user}>
      <section className="signup margin-top-extra-small">
        <h2 className="heading-secondary margin-bottom-extra-small">
          Create your account
        </h2>
        <h3 className="heading-tertiary">not ready to make an account?</h3>
        <Link
          className="heading-tertiary--link margin-bottom-extra-small"
          to="/create"
          onClick={loadTestUser}
        >
          try it out free!
        </Link>
        <form
          id="signup"
          className="signup__form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="firstname"
              rules={{
                required: "first name required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "enter a valid first name",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  ref={firstName}
                  id="firstname"
                  placeholder="first name"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="firstname" className="visuallyhidden">
              first name
            </label>

            <p className="form__error">
              &nbsp;
              {errors.firstname ? errors.firstname.message : ""}
            </p>
          </div>

          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="lastname"
              rules={{
                required: "last name required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "enter a valid last name",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  ref={lastName}
                  id="lastname"
                  placeholder="last name"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="lastname" className="visuallyhidden">
              last name
            </label>
            <p className="form__error">
              &nbsp;
              {errors.lastname ? errors.lastname.message : ""}
            </p>
          </div>
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="profession"
              rules={{
                required: "profession required",
              }}
              render={({ field }) => (
                <input
                  {...field}
                  ref={profession}
                  id="profession"
                  placeholder="profession"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="profession" className="visuallyhidden">
              profession
            </label>
            <p className="form__error">
              &nbsp;
              {errors.profession ? errors.profession.message : ""}
            </p>
          </div>

          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="email"
              rules={{
                required: "email required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "enter a valid e-mail address",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  ref={email}
                  id="email"
                  placeholder="email"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="email" className="visuallyhidden">
              email
            </label>
            <p className="form__error">
              &nbsp;
              {errors.email ? errors.email.message : ""}
            </p>
          </div>

          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="password"
              rules={{
                required: "password required",
                minLength: {
                  value: 8,
                  message: "password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  ref={password}
                  id="password"
                  type="password"
                  placeholder="password"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="password" className="visuallyhidden">
              password
            </label>
            <p className="form__error">
              &nbsp;
              {errors.password ? errors.password.message : ""}
            </p>
          </div>
          <button
            form="signup"
            type="submit"
            className="btn btn--square-blue margin-top-small margin-bottom-extra-small"
          >
            create account
          </button>
        </form>
        <p className="signup__text">already have an account?</p>
        <Link to="/signin">
          <p className="signup__text--link">sign in here</p>
        </Link>
      </section>
    </Layout>
  );
}
