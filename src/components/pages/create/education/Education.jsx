import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";

export default function Education({ user, updateLayoutData }) {
  //variables from props  & storage
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_educationHistoryData");

  //refs???

  useEffect(() => {
    const layoutData = {
      section: "education",
      headerText: "education history",
      toolTip: "Education tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  const [tempEducationObject, setTempEducationObject] = useState(null); //updates as form updates, gets pushed to tempEducationArray
  const [tempEducationArray, setTempEducationArray] = useState([]); //array to collect up to three Education Hisotry objects, passed to save section for storage and to update userEducationHisotry
  const [userEducationHistory, setUserEducationHistory] = useState(
    storage ? storage.educationHistory : null
  );

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });
  //functions to update tempEducationObject state
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
  const setGraduationMonth = (e) => {
    const value = e.target.value;
    setTempEducationObject((prevState) => {
      return { ...prevState, graduationMonth: value };
    });
  };
  const setGraduationYear = (e) => {
    const value = e.target.value;
    setTempEducationObject((prevState) => {
      return { ...prevState, graduationYear: value };
    });
  };
  const updateTempEducationArray = () => {
    setTempEducationArray((prevState) => {
      return [...prevState, tempEducationObject];
    });
  };
  const saveUserEducationHistory = () => {
    setUserEducationHistory(tempEducationArray);
    setTempEducationObject(null);
  };

  return (
    <section className="create-section education">
      <CreateSectionForm
        data={{ item: "new item", save: "item" }}
        saveFunction={updateTempEducationArray}
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
          type="text"
          className="input--month"
          onChange={setGraduationMonth}
        />
        <input
          placeholder="year"
          type="text"
          className="input--year"
          onChange={setGraduationYear}
        />
      </CreateSectionForm>
      <CreateSectionPreview>
        {userEducationHistory
          ? userEducationHistory.map((obj, i) => {
              return obj.institution;
            })
          : "no work experience saved"}
      </CreateSectionPreview>
      <SaveSection
        message="message"
        storageKey={userId + "_educationHistoryData"}
        data={{ educationHistory: tempEducationArray }}
        updateParentState={saveUserEducationHistory}
      />
    </section>
  );
}
