import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { importTestUser } from "../../utilities/importTestUser";
import { useForm, Controller } from "react-hook-form";

export default function Signup({ logUserIn }) {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
    const obj = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      profession: profession.current.value,
      email: email.current.value,
      password: password.current.value,
    };
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
    history.push("/create");
  };
  const firstName = useRef(null);
  const lastName = useRef(null);
  const profession = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  return (
    <section className="signup">
      <h1 className="heading--primary">Create your account</h1>
      <h3 className="heading--tertiary">not ready to make an account?</h3>
      <Link className="heading--tertiary" to="/create" onClick={loadTestUser}>
        try it out free!
      </Link>
      <form
        id="signup"
        className="signup__form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
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
        <label htmlFor="firstname">
          {errors.firstname ? null : "last name"}
          {errors.firstname && (
            <p className="form__error">{errors.firstname.message}</p>
          )}
        </label>

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
        <label htmlFor="lastname">
          {errors.lastname ? null : "last name"}
          {errors.lastname && (
            <p className="form__error">{errors.lastname.message}</p>
          )}
        </label>
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
        <label htmlFor="profession">
          {errors.profession ? null : "profession"}
          {errors.profession && (
            <p className="form__error">{errors.profession.message}</p>
          )}
        </label>

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
        <button form="signup" type="submit" className="btn--square">
          create account
        </button>
      </form>
      <p className="signup__text">already have an account?</p>
      <Link to="/signin">
        <p className="signup__text">sign in here</p>
      </Link>
    </section>
  );
}
