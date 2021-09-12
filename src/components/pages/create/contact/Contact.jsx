import React, { useEffect, useState, useRef } from "react";
import AutoTextArea from "../../../AutoTextArea";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";

export default function Contact({ user, updateLayoutData }) {
  //variables from props  & storage
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_contactData");

  //refs???
  const inputTelephoneRef = useRef(null);
  const inputEmailRef = useRef(null);
  //address ref is in AutoTextArea component
  const inputWebsiteRef = useRef(null);

  //send section information to layout
  useEffect(() => {
    const layoutData = {
      section: "contact",
      headerText: "contact information",
      toolTip: "Contact tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  //contact data state
  const [tempContactObject, setTempContactObject] = useState(
    storage ? storage.contact : null
  );
  const [userContactInformation, setUserContactInformation] = useState(
    storage ? storage.contact : null
  );
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    //persists profile value after leaving page but allows editing after save
    if (userContactInformation) {
      inputTelephoneRef.current.value = userContactInformation.telephone;
      inputEmailRef.current.value = userContactInformation.email;
      //textarea is in autotextarea component
      inputWebsiteRef.current.value = userContactInformation.website;
    }
  }, [userContactInformation]);
  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });

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
  };
  const handleDelete = () => {
    localStorage.removeItem(userId + "_contactData");
    setUserContactInformation(null);
    setUpdated(true);
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
      {/* <textarea
        ref={textareaAddressRef}
        name="profile"
        cols="30"
        rows="10"
        className="profile__text-area"
        placeholder="click to edit profile"
        onChange={setAddress}
      ></textarea> */}
      <AutoTextArea
        className="profile__textarea"
        placeholder="click to edit address"
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
        //may not always be needed, but might be good to have temp setting for all data
        updateParentState={saveUserContactInformation}
        disableButton={!updated}
      />
    </section>
  );
}
