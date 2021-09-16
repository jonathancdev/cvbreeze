import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { importTestUser } from "../../utilities/importTestUser";
import { useForm, Controller } from "react-hook-form";

export default function Signup({ logUserIn }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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
    history.push("/create");
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
      <form
        id="signup"
        className="signup__form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {/* <input
          id="firstname"
          placeholder="first name"
          className="input--standard"
          onChange={setFirstName}
          {...register("firstname", {
            required: "first name required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "enter a valid first name",
            },
          })}
        />
        <label htmlFor="firstname">
          {errors.firstname ? null : "first name"}
          {errors.firstname && (
            <p className="form__error">{errors.firstname.message}</p>
          )}
        </label> */}
        {/* <Controller
          control={control}
          name="firstname"
          render={({ field }) => {
            <input
              {...field}
              id="firstname"
              placeholder="first name"
              className="input--standard"
              onChange={(e) => {
                setFirstName(e);
                field.onChange(e);
              }}
            />;
          }}
        /> */}
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
              id="firstname"
              placeholder="first name"
              className="input--standard"
              onChange={(e) => {
                setFirstName(e);
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
        <input
          id="lastname"
          placeholder="last name"
          className="input--standard"
          onChange={setLastName}
          {...register("lastname", {
            required: "last name required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "enter a valid last name",
            },
          })}
        />
        <label htmlFor="lastname">
          {errors.lastname ? null : "last name"}
          {errors.lastname && (
            <p className="form__error">{errors.lastname.message}</p>
          )}
        </label>
        <input
          id="profession"
          placeholder="profession"
          className="input--standard"
          onChange={setProfession}
          {...register("profession", {
            required: "profession required",
          })}
        />
        <label htmlFor="profession">
          {errors.profession ? null : "first name"}
          {errors.profession && (
            <p className="form__error">{errors.profession.message}</p>
          )}
        </label>
        <input
          id="email"
          placeholder="email"
          className="input--standard"
          onChange={setEmail}
          {...register("email", {
            required: "email required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
            },
          })}
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
          onChange={setPassword}
          {...register("password", {
            required: "password required",
            minLength: {
              value: 8,
              message: "password must be at least 8 characters",
            },
          })}
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
