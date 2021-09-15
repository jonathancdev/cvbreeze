import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import WorkItem from "./WorkItem";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import sortByDate from "../../../../utilities/sortByDate";

export default function WorkExperience({
  user,
  updateLayoutData,
  updateCompletedSection,
}) {
  //VARIABLES FROM PROPS  & STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_workExperienceData");

  useEffect(() => {
    const layoutData = {
      section: "work experience",
      headerText: "work experience",
      toolTip: "Work experience tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);
  //WORKEXPERIENCEDATA STATE

  const [tempWorkObject, setTempWorkObject] = useState(null); //UPDATES AS FORM UPDATES, GETS PUSHED TO TEMPWORKARRAY
  const [tempWorkArray, setTempWorkArray] = useState(storage ? storage : []); //ARRAY TO COLLECT UP TO THREE WORK EXPERIENCE OBJECTS, PASSED TO SAVE SECTION FOR STORAGE AND TO UPDATE USERWORKEXPERIENCE
  const [userWorkExperience, setUserWorkExperience] = useState(
    storage ? storage : null
  );
  const [updated, setUpdated] = useState(false);
  const setTitle = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, title: value };
    });
  };
  const setCompanyName = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, companyName: value };
    });
  };
  const setStartDate = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, startDate: value };
    });
  };
  const setEndDate = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, endDate: value };
    });
  };

  const setDutyOne = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, dutyOne: value };
    });
  };
  const setDutyTwo = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, dutyTwo: value };
    });
  };
  const setDutyThree = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, dutyThree: value };
    });
  };
  const updateTempWorkArray = () => {
    if (!tempWorkObject) {
      alert("invalid entry");
      return; //EXIT FUNCTION IF NOTHING ENTERED IN BOX
    }
    const obj = tempWorkObject;
    const id = obj.title + obj.companyName + obj.date;
    if (tempWorkArray.some((obj) => obj.id === id)) {
      alert("duplicate item entered");
      return;
    }
    setTempWorkArray((prevState) => {
      return [...prevState, { ...tempWorkObject, id }];
    });
    setTempWorkObject(null);
    setUpdated(true);
  };
  const handleDeletedItem = (obj) => {
    localStorage.setObject(userId + "_workExperienceData", obj);
    const storage = localStorage.getObject(userId + "_workExperienceData");
    setTempWorkArray(storage);
    setUserWorkExperience(storage);
    updateCompletedSection(checkCompletedSections());
  };
  const saveUserWorkExperience = () => {
    setUserWorkExperience(tempWorkArray);
    //setTempWorkObject(null);
    setUpdated(false);
  };
  return (
    <section className="create-section work-experience">
      <CreateSectionForm
        data={{ item: "new experience", save: "experience" }}
        saveFunction={updateTempWorkArray}
        items={tempWorkArray}
        limit={3}
        limitMessage="include your three most relevant positions"
      >
        <input
          placeholder="job title"
          type="text"
          className="standard__input"
          onChange={setTitle}
        />
        <input
          placeholder="company name"
          type="text"
          className="standard__input"
          onChange={setCompanyName}
        />
        from
        <input
          placeholder="month"
          type="date"
          className="date__input"
          onChange={setStartDate}
        />
        <input
          placeholder="month"
          type="date"
          className="date__input"
          onChange={setEndDate}
        />
        <input
          placeholder="click to add job duty"
          type="text"
          className="input--standard"
          onChange={setDutyOne}
        />
        <input
          placeholder="click to add job duty"
          type="text"
          className="input--standard"
          onChange={setDutyTwo}
        />
        <input
          placeholder="click to add job duty"
          type="text"
          className="input--standard"
          onChange={setDutyThree}
        />
      </CreateSectionForm>
      <CreateSectionPreview>
        {tempWorkArray.length > 0 // USING TEMPWORKARRAY SO UNSAVED ITEMS DISPLAY, COMPARE IN WORKITEM COMPONENT TO ONLY ADD DELETE BUTTON IF THEY ARE ALSO IN USERWORKEXPERIENCE
          ? tempWorkArray.map((obj) => {
              return (
                <WorkItem
                  key={obj.id}
                  obj={obj}
                  userWorkExperience={userWorkExperience}
                  handleDeletedItem={handleDeletedItem}
                />
              );
            })
          : "no work experience saved"}
      </CreateSectionPreview>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_workExperienceData"}
        //SORTS TEMPWORKARRAY OBJECTS BY DATE DESCENDING WHICH AUTOMATICALLY
        //UPDATES INTO STATE WHEN SAVED TO LOCAL STORAGE
        data={tempWorkArray}
        updateParentState={saveUserWorkExperience}
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
