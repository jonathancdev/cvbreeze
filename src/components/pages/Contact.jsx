import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import AutoTextArea from "../AutoTextArea";

export default function Contact() {
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
  const comment = useRef(commentValue);

  const updateCommentValue = (value) => {
    setCommentValue(value);
  };

  const handleFormSubmit = () => {
    if (commentValue) {
      alert("sent successfully");
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

  return (
    <section className="contact">
      <h1 className="heading--primary">Questions or comments?</h1>
      <h3 className="heading--tertiary">
        fill out the form and we'll get back to you!
      </h3>

      <form
        id="contact"
        className="contact__form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Controller
          defaultValue=""
          control={control}
          name="name"
          rules={{
            required: "name required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "enter a valid name",
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
        <label htmlFor="name">
          {errors.name ? null : "name"}
          {errors.name && <p className="form__error">{errors.name.message}</p>}
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

        <AutoTextArea
          ref={comment}
          userText={commentValue}
          id="comment"
          update={updateCommentValue}
          className="profile__textarea"
          placeholder="click to write your questions or comments"
        />

        <label htmlFor="comment">
          {invalid ? null : "comment"}
          {invalid ? (
            <p className="form__error">enter questions or comments</p>
          ) : null}
        </label>

        <button form="contact" type="submit" className="btn--square">
          send
        </button>
      </form>
    </section>
  );
}
