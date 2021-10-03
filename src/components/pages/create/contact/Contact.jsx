import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import AutoTextArea from "../../../AutoTextArea";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";

export default function Contact({
  user,
  updateLayoutData,
  updateCompletedSections,
  openConfirm,
}) {
  //VARIABLES FROM PROPS AND STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_contactData");

  //REFS???
  const inputTelephoneRef = useRef(null);
  const inputEmailRef = useRef(null);
  //ADDRESS REF IS IN AUTOTEXTAREA COMPONENT
  const inputAddressRef = useRef(null);
  const inputWebsiteRef = useRef(null);

  //SEND SECTION INFORMATION TO LAYOUT

  const layoutData = useRef({
    section: "contact",
    headerText: "Contact information",
    toolTip: "Contact tooltip yo lorem ipsum fuckus duckus",
  });
  useLayoutEffect(() => {
    updateLayoutData(layoutData.current);
  });
  useLayoutUpdater(layoutData.current, updateLayoutData);

  //CONTACT DATA STATE
  const [tempContactObject, setTempContactObject] = useState(
    storage ? storage : null
  );
  const [userContactInformation, setUserContactInformation] = useState(
    storage ? storage : null
  );
  const [errors, setErrors] = useState({});
  //ACTIVATES SAVE BUTTON IN SAVE SECTION WHEN NEEDED
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    //PERSISTS VALUES AFTER LEAVING PAGE BUT ALLOWS EDITING AFTER SAVE

    if (userContactInformation) {
      inputTelephoneRef.current.value = userContactInformation.telephone || "";
      inputEmailRef.current.value = userContactInformation.email || "";
      //TEXTAREA IS IN AUTOTEXTAREA COMPONENT
      inputWebsiteRef.current.value = userContactInformation.website || "";
    } else {
      inputTelephoneRef.current.value = null;
      inputEmailRef.current.value = null;
      //TEXTAREA IS IN AUTOTEXTAREA COMPONENT
      inputWebsiteRef.current.value = "";
    }
  }, [userContactInformation]);
  //TAKES INPUT VALUES FROM INPUTS AND PUTS IN TEMPCONTACTOBJECT
  const setTelephone = (e) => {
    const value = e.target.value;
    if (value.length < 1) {
      setErrors((prevState) => {
        return { ...prevState, telephone: "telephone number required" };
      });
    } else if (value.match(/^([0-9\(\)\/\+ \-]*)$/)) {
      setTempContactObject((prevState) => {
        return { ...prevState, telephone: value };
      });
      setErrors((prevState) => {
        return {
          ...prevState,
          telephone: "",
        };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, telephone: "enter valid telephone number" };
      });
    }
    setUpdated(true);
  };
  const setEmail = (e) => {
    const value = e.target.value;
    if (value.length < 1) {
      setErrors((prevState) => {
        return { ...prevState, email: "email address required" };
      });
    } else if (value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      setTempContactObject((prevState) => {
        return { ...prevState, email: value };
      });
      setErrors((prevState) => {
        return {
          ...prevState,
          email: "",
        };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, email: "enter valid email address" };
      });
    }
    setUpdated(true);
  };
  const setAddress = (value) => {
    setTempContactObject((prevState) => {
      return { ...prevState, address: value };
    });
    setUpdated(true);
  };
  const setWebsite = (e) => {
    const value = e.target.value;
    setTempContactObject((prevState) => {
      return { ...prevState, website: value };
    });
    setUpdated(true);
  };

  const saveUserContactInformation = () => {
    setUserContactInformation(tempContactObject);
    setUpdated(false);
    setTempContactObject(null);
  };
  const handleDelete = () => {
    openConfirm(
      "are you sure you want to permanently delete this information?",
      () => confirmDelete,
      () => noop
    );
  };
  const confirmDelete = () => {
    setTempContactObject(null);
    setUserContactInformation(null);
    localStorage.setObject(userId + "_contactData", null);
    updateCompletedSections();
  };
  const noop = () => {};

  return (
    <section className="create-section contact">
      <div className="form__element">
        <input
          placeholder="telephone"
          ref={inputTelephoneRef}
          type="text"
          className="input--standard"
          onChange={setTelephone}
          onClick={() => inputTelephoneRef.current.select()}
          id="telephone"
        />
        <label htmlFor="telephone" className="visuallyhidden">
          telephone
        </label>
        <p className="form__error">
          &nbsp;
          {errors.telephone ? errors.telephone : ""}
        </p>
      </div>

      <div className="form__element">
        <input
          placeholder="email"
          ref={inputEmailRef}
          type="text"
          className="input--standard"
          onChange={setEmail}
          onClick={() => inputEmailRef.current.select()}
          id="email"
        />
        <label htmlFor="email" className="visuallyhidden">
          email
        </label>
        <p className="form__error">
          &nbsp;
          {errors.email ? errors.email : ""}
        </p>
      </div>

      <label htmlFor="contact__text-area" className="text-area__label"></label>

      <div className="form__element">
        <AutoTextArea
          className="contact__textarea"
          placeholder="address"
          update={setAddress}
          id="address"
          userText={
            userContactInformation
              ? userContactInformation.address
                ? userContactInformation.address
                : "address\ncity, state/province\npostal code\ncountry"
              : "address\ncity, state/province\npostal code\ncountry"
          }
        />
        <label htmlFor="address" className="visuallyhidden">
          address
        </label>
        <p className="form__error">&nbsp;</p>
      </div>

      <div className="form__element">
        <input
          placeholder="website"
          ref={inputWebsiteRef}
          type="text"
          className="input--standard"
          onChange={setWebsite}
          onClick={() => inputWebsiteRef.current.select()}
        />
        <label htmlFor="website" className="visuallyhidden">
          website
        </label>
        <p className="form__error">&nbsp;</p>
      </div>

      <button
        onClick={handleDelete}
        className="btn btn--delete margin-bottomo-large"
      >
        delete
      </button>
      {errors.email || errors.telephone ? (
        <>
          <p className="form__error">&nbsp;</p>
          <p className="form__error">&nbsp;</p>
          <p className="form__error">&nbsp;</p>
        </>
      ) : (
        <SaveSection
          message={updated ? "do you want to save these changes?" : null}
          storageKey={userId + "_contactData"}
          data={tempContactObject}
          updateParentState={saveUserContactInformation}
          updateCompletedSections={updateCompletedSections}
          disableButton={!updated}
        />
      )}
    </section>
  );
}
