import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import EducationItem from "./EducationItem";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import sortByDate from "../../../../utilities/sortByDate";

export default function Education({
  user,
  updateLayoutData,
  updateCompletedSection,
}) {
  //VARIABLES FROM PROPS  & STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_educationHistoryData");

  //REFS???

  useEffect(() => {
    const layoutData = {
      section: "education",
      headerText: "education history",
      toolTip: "Education tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  const [tempEducationObject, setTempEducationObject] = useState(null); //UPDATES AS FORM UPDATES, GETS PUSHED TO TEMPEDUCATIONARRAY
  const [tempEducationArray, setTempEducationArray] = useState(
    storage ? storage : []
  ); //ARRAY TO COLLECT UP TO THREE EDUCATION HISOTRY OBJECTS, PASSED TO SAVE SECTION FOR STORAGE AND TO UPDATE USEREDUCATIONHISOTRY
  const [userEducationHistory, setUserEducationHistory] = useState(
    storage ? storage : null
  );
  const [updated, setUpdated] = useState(false);

  //FUNCTIONS TO UPDATE TEMPEDUCATIONOBJECT STATE
  const setInstitution = (e) => {
    const value = e.target.value;
    setTempEducationObject((prevState) => {
      return { ...prevState, institution: value };
    });
  };
  const setDegree = (e) => {
    const value = e.target.value;
    setTempEducationObject((prevState) => {
      return { ...prevState, degree: value };
    });
  };
  const setDescription = (e) => {
    const value = e.target.value;
    setTempEducationObject((prevState) => {
      return { ...prevState, description: value };
    });
  };
  const setDate = (e) => {
    const value = e.target.value;
    setTempEducationObject((prevState) => {
      return { ...prevState, date: value };
    });
  };

  const updateTempEducationArray = () => {
    if (!tempEducationObject) {
      alert("invalid entry");
      return; //EXIT FUNCTION IF NOTHING ENTERED IN BOX
    }
    const obj = tempEducationObject;
    const id = obj.institution + obj.degree + obj.date;
    if (tempEducationArray.some((obj) => obj.id === id)) {
      alert("duplicate item entered");
      return;
    }
    setTempEducationArray((prevState) => {
      return [...prevState, { ...tempEducationObject, id }];
    });
    setTempEducationObject(null);
    setUpdated(true);
  };
  const handleDeletedItem = (obj) => {
    localStorage.setObject(userId + "_educationHistoryData", obj);
    const storage = localStorage.getObject(userId + "_educationHistoryData");
    setTempEducationArray(storage);
    setUserEducationHistory(storage);
    updateCompletedSection(checkCompletedSections());
  };
  const saveUserEducationHistory = () => {
    setUserEducationHistory(tempEducationArray);
    setUpdated(false);
  };

  return (
    <section className="create-section education">
      <CreateSectionForm
        data={{ item: "new item", save: "item" }}
        saveFunction={updateTempEducationArray}
        items={tempEducationArray}
        limit={3}
        limitMessage="include up to three items"
      >
        <input
          placeholder="institution"
          type="text"
          className="input--standard"
          onChange={setInstitution}
        />
        <input
          placeholder="type of degree or certification"
          type="text"
          className="input--standard"
          onChange={setDegree}
        />
        <input
          placeholder="description"
          type="text"
          className="input--standard"
          onChange={setDescription}
        />
        <input
          placeholder="month"
          type="date"
          className="input--month"
          onChange={setDate}
        />
        {/* <input
          placeholder="month"
          type="text"
          className="input--month"
          onChange={setGraduationMonth}
        />
        <input
          placeholder="year"
          type="text"
          className="input--year"
          onChange={setGraduationYear}
        /> */}
      </CreateSectionForm>
      <CreateSectionPreview>
        {tempEducationArray.length > 0
          ? tempEducationArray.map((obj) => {
              return (
                <EducationItem
                  key={obj.id}
                  obj={obj}
                  userEducationHistory={userEducationHistory}
                  handleDeletedItem={handleDeletedItem}
                />
              );
            })
          : "no education history saved"}
      </CreateSectionPreview>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_educationHistoryData"}
        data={sortByDate(tempEducationArray)}
        updateParentState={saveUserEducationHistory}
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
