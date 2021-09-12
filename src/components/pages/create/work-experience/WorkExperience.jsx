import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import WorkItem from "./WorkItem";
import sortByDate from "../../../../utilities/sortByDate";

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
  const [tempWorkArray, setTempWorkArray] = useState(
    storage ? storage.workExperience : []
  ); //array to collect up to three work experience objects, passed to save section for storage and to update userWorkExperience
  const [userWorkExperience, setUserWorkExperience] = useState(
    storage ? storage.workExperience : null
  );
  const [updated, setUpdated] = useState(false);
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
  const setDate = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, date: value };
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
    if (!tempWorkObject) {
      alert("invalid entry");
      return; //exit function if nothing entered in box
    }
    const obj = tempWorkObject;
    const id = obj.title + obj.companyName + obj.date;
    setTempWorkArray((prevState) => {
      return [...prevState, { ...tempWorkObject, id }];
    });
    setTempWorkObject(null);
    setUpdated(true);
  };
  const saveUserWorkExperience = (array) => {
    setUserWorkExperience([...array]);
    setTempWorkObject(null);
    setUpdated(false);
  };
  const childSetUpdated = (bool) => {
    //to set updated from workItem, using in save also updates from save
    //which enables the storage save button again
    setUpdated(bool);
  };
  console.log(tempWorkArray.length);
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
          type="date"
          className="input--month"
          onChange={setDate}
        />
        {/* <input
          placeholder="month"
          type="text"
          className="input--month"
          onChange={setMonthOne}
        /> */}
        {/* <input
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
        /> */}
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
        {tempWorkArray.length > 0 // using tempWorkArray so unsaved items display, compare in workItem component to only add delete button if they are also in userWorkExperience
          ? tempWorkArray.map((obj) => {
              return (
                <WorkItem
                  key={obj.id}
                  obj={obj}
                  data={{ workExperience: sortByDate(tempWorkArray) }}
                  userWorkExperience={userWorkExperience}
                  updateParentState={saveUserWorkExperience}
                  childSetUpdated={childSetUpdated}
                />
              );
            })
          : "no work experience saved"}
      </CreateSectionPreview>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_workExperienceData"}
        //sorts tempWorkArray objects by date descending which automatically
        //updates into state when saved to local storage
        data={{ workExperience: sortByDate(tempWorkArray) }}
        updateParentState={saveUserWorkExperience}
        disableButton={!updated}
      />
    </section>
  );
}
