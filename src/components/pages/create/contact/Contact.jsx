import React, { useEffect, useState, useRef } from "react";
import AutoTextArea from "../../../AutoTextArea";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";

export default function Contact({
  user,
  updateLayoutData,
  updateCompletedSection,
}) {
  //VARIABLES FROM PROPS AND STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_contactData");

  //REFS???
  const inputTelephoneRef = useRef(null);
  const inputEmailRef = useRef(null);
  //ADDRESS REF IS IN AUTOTEXTAREA COMPONENT
  const inputWebsiteRef = useRef(null);

  //SEND SECTION INFORMATION TO LAYOUT

  const layoutData = useRef({
    section: "contact",
    headerText: "Add contact information",
    toolTip: "Contact tooltip yo lorem ipsum fuckus duckus",
  });
  useLayoutUpdater(layoutData.current, updateLayoutData);

  //CONTACT DATA STATE
  const [tempContactObject, setTempContactObject] = useState(
    storage ? storage : null
  );
  const [userContactInformation, setUserContactInformation] = useState(
    storage ? storage : null
  );
  //ACTIVATES SAVE BUTTON IN SAVE SECTION WHEN NEEDED
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    //PERSISTS PROFILE VALUE AFTER LEAVING PAGE BUT ALLOWS EDITING AFTER SAVE
    if (userContactInformation) {
      inputTelephoneRef.current.value = userContactInformation.telephone;
      inputEmailRef.current.value = userContactInformation.email;
      //TEXTAREA IS IN AUTOTEXTAREA COMPONENT
      inputWebsiteRef.current.value = userContactInformation.website;
    } else {
      inputTelephoneRef.current.value = null;
      inputEmailRef.current.value = null;
      //TEXTAREA IS IN AUTOTEXTAREA COMPONENT
      inputWebsiteRef.current.value = null;
    }
  }, [userContactInformation]);
  //TAKES INPUT VALUES FROM INPUTS AND PUTS IN TEMPCONTACTOBJECT
  const setTelephone = (e) => {
    const value = e.target.value;
    setTempContactObject((prevState) => {
      return { ...prevState, telephone: value };
    });
    setUpdated(true);
  };
  const setEmail = (e) => {
    const value = e.target.value;
    setTempContactObject((prevState) => {
      return { ...prevState, email: value };
    });
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
    const popup = window.confirm(
      "are you sure you want to permanently delete this information?"
    );
    if (popup) {
      setTempContactObject(null);
      setUserContactInformation(null);
      localStorage.setObject(userId + "_contactData", null);
      updateCompletedSection(checkCompletedSections());
    }
  };

  return (
    <section className="create-section contact">
      <label htmlFor="" className="input__label"></label>
      <input
        placeholder="telephone"
        ref={inputTelephoneRef}
        type="text"
        className="input--standard"
        onChange={setTelephone}
      />
      <label htmlFor="" className="input__label"></label>
      <input
        placeholder="email"
        ref={inputEmailRef}
        type="text"
        className="input--standard"
        onChange={setEmail}
      />
      <label htmlFor="contact__text-area" className="text-area__label"></label>

      <AutoTextArea
        className="profile__textarea"
        placeholder="address"
        update={setAddress}
        userText={
          userContactInformation ? userContactInformation.address : null
        }
      />
      <label htmlFor="" className="input__label"></label>
      <input
        placeholder="website"
        ref={inputWebsiteRef}
        type="text"
        className="input--standard"
        onChange={setWebsite}
      />
      <button onClick={handleDelete} className="btn btn--delete">
        delete
      </button>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_contactData"}
        data={{ contact: tempContactObject }}
        updateParentState={saveUserContactInformation}
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
