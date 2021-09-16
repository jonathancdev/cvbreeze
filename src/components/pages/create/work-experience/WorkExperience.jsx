import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import WorkItem from "./WorkItem";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import sortByDate from "../../../../utilities/sortByDate";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const { format } = require("date-fns");

export default function WorkExperience({
  user,
  updateLayoutData,
  updateCompletedSection,
}) {
  //REACT HOOK FORM
  const {
    control,
    reset,
    handleSubmit,
    //watch,
    formState: { errors },
  } = useForm();

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
  //FORM AND BUTTON ATTRIBUTES
  const [updated, setUpdated] = useState(false);
  const [formHidden, setFormHidden] = useState(true);

  //SET OBJECT PROPERTIES ON INPUT CHANGE
  const setTitle = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, title: value };
    });
  };
  const setCompany = (e) => {
    const value = e.target.value;
    setTempWorkObject((prevState) => {
      return { ...prevState, company: value };
    });
  };
  const setStartDate = (date) => {
    const value = format(date, "yyyy-MM-dd");
    setTempWorkObject((prevState) => {
      return { ...prevState, startDate: value };
    });
  };
  const setEndDate = (date) => {
    const value = format(date, "yyyy-MM-dd");
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
    // if (!tempWorkObject) {
    //   alert("invalid entry");
    //   return; //EXIT FUNCTION IF NOTHING ENTERED IN BOX
    // }
    const obj = tempWorkObject;
    const id = obj.title + obj.company + obj.startDate;
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
  const handleFormSubmit = () => {
    updateTempWorkArray();
    setFormHidden(true);
    reset({
      title: "",
      company: "",
    });
  };
  const updateFormHidden = (bool) => {
    setFormHidden(bool);
    reset({
      title: "",
      company: "",
    });
  };

  return (
    <section className="create-section work-experience">
      <CreateSectionForm
        data={{ item: "new experience", save: "experience" }}
        items={tempWorkArray}
        limit={3}
        limitMessage="include your three most relevant positions"
        formId="work"
        formHidden={formHidden}
        updateFormHidden={updateFormHidden}
      >
        <form
          className="create__form"
          id="work"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            defaultValue=""
            control={control}
            name="title"
            rules={{
              required: "job title required",
              maxLength: {
                value: 50,
                message: "maximum length 50 characters",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="title"
                placeholder="job title"
                className="input--standard"
                onChange={(e) => {
                  setTitle(e);
                  field.onChange(e);
                }}
              />
            )}
          />
          <label htmlFor="title">
            {errors.title ? null : "title"}
            {errors.title && (
              <p className="form__error">{errors.title.message}</p>
            )}
          </label>
          <Controller
            defaultValue=""
            control={control}
            name="company"
            rules={{
              required: "company name required",
              maxLength: {
                value: 50,
                message: "maximum length 50 characters",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="company"
                placeholder="company name"
                className="input--standard"
                onChange={(e) => {
                  setCompany(e);
                  field.onChange(e);
                }}
              />
            )}
          />
          <label htmlFor="company">
            {errors.company ? null : "company"}
            {errors.company && (
              <p className="form__error">{errors.company.message}</p>
            )}
          </label>

          <Controller
            defaultValue=""
            control={control}
            name="startdate"
            render={({ field }) => (
              <DatePicker
                id="startdate"
                className="input--date"
                value={tempWorkObject ? tempWorkObject.startDate : null}
                placeholderText="enter start date"
                onSelect={(date) => {
                  setStartDate(date);
                  field.onChange(date);
                }}
              />
            )}
            rules={{
              required: "start date required",
            }}
          />
          <label htmlFor="startdate">
            {errors.startdate && (
              <p className="form__error">{errors.startdate.message}</p>
            )}
          </label>
          <Controller
            defaultValue=""
            control={control}
            name="enddate"
            render={({ field }) => (
              <DatePicker
                id="enddate"
                className="input--date"
                value={tempWorkObject ? tempWorkObject.endDate : null}
                placeholderText="enter end date"
                onSelect={(date) => {
                  setEndDate(date);
                  field.onChange(date);
                }}
              />
            )}
            rules={{
              required: "end date required",
            }}
          />
          <label htmlFor="enddate">
            {errors.enddate && (
              <p className="form__error">{errors.enddate.message}</p>
            )}
          </label>
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
        </form>
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
        data={sortByDate(tempWorkArray)}
        updateParentState={saveUserWorkExperience}
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
