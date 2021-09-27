import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Layout from "../layout/Layout";
export default function Signin({ user, sessionActive, logUserIn, logUserOut }) {
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [authenticated, setAuthenticated] = useState(false);
  const email = useRef();
  const password = useRef();
  const handleFormSubmit = () => {
    authenticate();
  };

  const authenticate = () => {
    const keys = Object.keys(localStorage).filter((item) =>
      item.includes("user_")
    );
    keys.forEach((key, i) => {
      const user = localStorage.getObject(keys[i]);
      if (
        email.current.value === user.email &&
        password.current.value === user.password
      ) {
        logUserIn(user);
        setAuthenticated(true);
        history.push("/create");
      } else {
        setAuthenticated(false);
        alert("sign in failed");
      }
    });
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
