import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import AutoTextArea from "../AutoTextArea";
import Layout from "../layout/Layout";

export default function Contact({
  user,
  sessionActive,
  logUserIn,
  logUserOut,
  openAlert,
}) {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [commentValue, setCommentValue] = useState("");
  const [invalid, setInvalid] = useState(false);

  const name = useRef(null);
  const email = useRef(null);

  const updateCommentValue = (value) => {
    setCommentValue(value);
  };

  const handleFormSubmit = () => {
    if (commentValue) {
      openAlert("message sent!");
      reset({
        name: "",
        email: "",
      });
      setCommentValue("");
      setInvalid(false);
      history.push("/");
    } else {
      setInvalid(true);
    }
  };
  const checkErrors = () => {
    if (!commentValue) {
      setInvalid(true);
    }
  };
  return (
    <Layout sessionActive={sessionActive} logUserOut={logUserOut} user={user}>
      <section className="contactform">
        <h2 className="heading-secondary margin-top-small">
          Questions or comments?
        </h2>
        <h3 className="heading-tertiary margin-bottom-extra-small">
          fill out the form and we'll get back to you!
        </h3>

        <form
          id="contact"
          className="contact__form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="name"
              rules={{
                required: " name required",
                pattern: {
                  value: /^[A-Za-z\ ']+$/,
                  message: "enter a valid  name",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  ref={name}
                  id="name"
                  placeholder="name"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="name" className="visuallyhidden">
              name
            </label>

            <p className="form__error">
              &nbsp;
              {errors.name ? errors.name.message : ""}
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
            {" "}
            <AutoTextArea
              userText={commentValue}
              id="comment"
              update={updateCommentValue}
              className="contactform__textarea"
              placeholder="questions or comments"
              required
            />
            <label htmlFor="comment" className="visuallyhidden">
              comments
            </label>
            <p className="form__error">
              {invalid ? "enter questions or comments" : " "}
            </p>
          </div>

          <button
            form="contact"
            type="submit"
            className="btn btn--square-blue margin-top-extra-small margin-bottom-extra-small"
            onClick={checkErrors}
          >
            send
          </button>
        </form>
      </section>
    </Layout>
  );
}
