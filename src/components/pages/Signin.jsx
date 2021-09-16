import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function Signin({ logUserIn }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = () => {
    history.push("/create");
  };
  return (
    <section className="signin">
      <h1 className="heading--primary">Sign in to your account</h1>

      <form
        id="signin"
        className="signin__form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <input
          id="email"
          placeholder="email"
          className="input--standard"
          {...register("email", {
            required: "email required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
            },
          })}
          // onChange={setFirstName}
        />

        <label htmlFor="email">
          {errors.email ? null : "Email"}
          {errors.email && (
            <p className="form__error">{errors.email.message}</p>
          )}
        </label>
        <input
          id="password"
          placeholder="password"
          type="password"
          className="input--standard"
          {...register("password", {
            required: "password required",
            minLength: {
              value: 8,
              message: "password must be at least 8 characters",
            },
          })}
          // onChange={setLastName}
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
