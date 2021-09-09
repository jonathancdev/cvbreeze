import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";

export default function WorkExperience({ user, updateLayoutData }) {
  //variables from props  & storage
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_workExperienceData");

  //refs???

  useEffect(() => {
    const layoutData = {
      section: "work experience",
      headerText: "work experience",
      toolTip: "Work experience tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);
  //workExperienceData state

  const [tempWorkObject, setTempWorkObject] = useState(null); //updates as form updates, gets pushed to tempWorkArray
  const [tempWorkArray, setTempWorkArray] = useState([]); //array to collect up to three work experience objects, passed to save section for storage and to update userWorkExperience
  const [userWorkExperience, setUserWorkExperience] = useState(
    storage ? storage.workExperience : null
  );
  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });
  //functions to update TempWorkObject state

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
  const setMonthOne = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, monthOne: value };
    });
  };
  const setYearOne = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, yearOne: value };
    });
  };
  const setMonthTwo = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, monthTwo: value };
    });
  };
  const setYearTwo = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, yearTwo: value };
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
    setTempWorkArray((prevState) => {
      return [...prevState, tempWorkObject];
    });
  };
  const saveUserWorkExperience = () => {
    setUserWorkExperience(tempWorkArray);
    setTempWorkObject(null);
  };

  return (
    <section className="create-section work-experience">
      <CreateSectionForm
        data={{ item: "new experience", save: "experience" }}
        saveFunction={updateTempWorkArray}
      >
        <input
          placeholder="job title"
          type="text"
          className="input--standard"
          onChange={setTitle}
        />
        <input
          placeholder="company name"
          type="text"
          className="input--standard"
          onChange={setCompanyName}
        />
        from
        <input
          placeholder="month"
          type="text"
          className="input--month"
          onChange={setMonthOne}
        />
        <input
          placeholder="year"
          type="text"
          className="input--year"
          onChange={setYearOne}
        />
        to
        <input
          placeholder="month"
          type="text"
          className="input--month"
          onChange={setMonthTwo}
        />
        <input
          placeholder="year"
          type="text"
          className="input--year"
          onChange={setYearTwo}
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
        {userWorkExperience
          ? userWorkExperience.map((obj, i) => {
              return obj.title;
            })
          : "no work experience saved"}
      </CreateSectionPreview>
      <SaveSection
        message="message"
        storageKey={userId + "_workExperienceData"}
        data={{ workExperience: tempWorkArray }}
        updateParentState={saveUserWorkExperience}
      />
    </section>
  );
}
