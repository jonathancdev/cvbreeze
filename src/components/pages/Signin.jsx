import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Layout from "../layout/Layout";
export default function Signin({
  user,
  sessionActive,
  logUserIn,
  logUserOut,
  openAlert,
}) {
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const email = useRef();
  const password = useRef();

  const handleFormSubmit = () => {
    authenticate();
  };

  const authenticate = async () => {
    //get all users in local storage
    const keys = Object.keys(localStorage).filter((item) =>
      item.includes("user_")
    );
    //create array of objects with each user info
    const userArray = keys.map((key) => {
      return localStorage.getObject(key);
    });
    //match user signing in with user info in storage
    const userSigningIn = findUserEmail(userArray, email.current.value);

    //if an email matches
    if (userSigningIn) {
      //check if password matches
      if (userSigningIn.password === password.current.value) {
        logUserIn(userSigningIn);
        history.push("/create");
      } else {
        openAlert("incorrect password");
      }
    } else {
      openAlert("no user registered with this email address");
    }
  };

  const findUserEmail = (userArray, email) => {
    return userArray.find((obj) => obj.email === email);
  };

  return (
    <Layout sessionActive={sessionActive} logUserOut={logUserOut} user={user}>
      <section className="signin">
        <h2 className="heading-secondary margin-top-extra-small margin-bottom-extra-small">
          Sign in to your account
        </h2>

        <form
          id="signin"
          className="signin__form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
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
            form="signin"
            type="submit"
            className="btn btn--square-blue margin-top-extra-small margin-bottom-extra-small"
          >
            sign in
          </button>
        </form>
        <p className="signin__text">don't have an account?</p>
        <Link to="/signup">
          <p className="signin__text--link">sign up here</p>
        </Link>
      </section>
    </Layout>
  );
}
