import React, { useEffect, useState, useRef } from "react";
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
  //DATES FOR DATEPICKER INSTEAD OF REFS
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //WORK EXPERIENCE STATE
  const [tempWorkArray, setTempWorkArray] = useState(storage ? storage : []); //ARRAY TO COLLECT UP TO THREE WORK EXPERIENCE OBJECTS, PASSED TO SAVE SECTION FOR STORAGE AND TO UPDATE USERWORKEXPERIENCE
  const [userWorkExperience, setUserWorkExperience] = useState(
    storage ? storage : null
  );
  //FORM AND BUTTON ATTRIBUTES
  const [updated, setUpdated] = useState(false);
  const [formHidden, setFormHidden] = useState(true);

  //INPUT REFS
  const title = useRef(null);
  const company = useRef(null);
  //dates held in useState
  const duty1 = useRef(null);
  const duty2 = useRef(null);
  const duty3 = useRef(null);

  const updateTempWorkArray = () => {
    const obj = {
      title: title.current.value,
      company: company.current.value,
      startDate: startDate,
      endDate: endDate,
      duties: [duty1.current.value, duty2.current.value, duty3.current.value],
    };
    const id = obj.title + obj.company + obj.startDate;
    if (tempWorkArray.some((obj) => obj.id === id)) {
      alert("duplicate item entered");
      return;
    }
    setTempWorkArray((prevState) => {
      return [...prevState, { ...obj, id }];
    });
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
                ref={title}
                placeholder="job title"
                className="input--standard"
                onChange={(e) => {
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
                ref={company}
                placeholder="company name"
                className="input--standard"
                onChange={(e) => {
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
                dateFormatCalendar="MMMM"
                showYearDropdown
                yearDropdownItemNumber={30}
                scrollableYearDropdown
                maxDate={new Date()}
                id="startdate"
                className="input--date"
                value={startDate || null}
                placeholderText="enter start date"
                onSelect={(date) => {
                  setStartDate(format(date, "yyyy-MM-dd"));
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
                dateFormatCalendar="MMMM"
                showYearDropdown
                yearDropdownItemNumber={30}
                scrollableYearDropdown
                maxDate={new Date()}
                id="enddate"
                className="input--date"
                value={endDate || null}
                placeholderText="enter end date"
                onSelect={(date) => {
                  setEndDate(format(date, "yyyy-MM-dd"));
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
            ref={duty1}
            placeholder="click to add job duty"
            type="text"
            className="input--standard"
          />
          <input
            ref={duty2}
            placeholder="click to add job duty"
            type="text"
            className="input--standard"
          />
          <input
            ref={duty3}
            placeholder="click to add job duty"
            type="text"
            className="input--standard"
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
