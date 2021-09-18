import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
export default function Signin({ logUserIn }) {
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
    //history.push("/create");
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
      } else {
        setAuthenticated(false);
      }
    });
    console.log(keys);
  };
  return (
    <section className="signin">
      <h1 className="heading--primary">Sign in to your account</h1>

      <form
        id="signin"
        className="signin__form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Controller
          defaultValue=""
          control={control}
          name="email"
          rules={{
            required: "email required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
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
        <label htmlFor="email">
          {errors.email ? null : "email"}
          {errors.email && (
            <p className="form__error">{errors.email.message}</p>
          )}
        </label>

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
        <label htmlFor="password">
          {errors.password ? null : "Password"}
          {errors.password && (
            <p className="form__error">{errors.password.message}</p>
          )}
        </label>

        <button form="signin" type="submit" className="btn--square">
          sign in
        </button>
      </form>
      <p className="signup__text">don't have an account?</p>
      <Link to="/signup">
        <p className="signin__text">sign up here</p>
      </Link>
    </section>
  );
}
