import React, { useLayoutEffect, useState, useRef } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import EducationItem from "./EducationItem";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import sortByDate from "../../../../utilities/sortByDate";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";
const { format } = require("date-fns");

export default function Education({
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
  const storage = localStorage.getObject(userId + "_educationHistoryData");

  const layoutData = useRef({
    section: "education",
    headerText: "Education history",
    toolTip: "Education tooltip yo lorem ipsum fuckus duckus",
  });
  useLayoutEffect(() => {
    updateLayoutData(layoutData.current);
  });
  useLayoutUpdater(layoutData.current, updateLayoutData);

  //DATES FOR DATEPICKER INSTEAD OF REFS
  const [date, setDate] = useState(null);
  //EDUCATION HISTORY STATE
  const [tempEducationArray, setTempEducationArray] = useState(
    storage ? storage : []
  ); //ARRAY TO COLLECT UP TO THREE EDUCATION HISOTRY OBJECTS, PASSED TO SAVE SECTION FOR STORAGE AND TO UPDATE USEREDUCATIONHISOTRY
  const [userEducationHistory, setUserEducationHistory] = useState(
    storage ? storage : null
  );
  //FORM AND BUTTON ATTRIBUTES
  const [updated, setUpdated] = useState(false);
  const [formHidden, setFormHidden] = useState(true);

  //INPUT REFS
  const institution = useRef(null);
  const degree = useRef(null);
  const description = useRef(null);
  //date held in useState

  const updateTempEducationArray = () => {
    const obj = {
      institution: institution.current.value,
      degree: degree.current.value,
      description: description.current.value,
      date: date,
    };
    const id = obj.institution + obj.degree + obj.date;
    if (tempEducationArray.some((obj) => obj.id === id)) {
      alert("duplicate item entered");
      return;
    }
    setTempEducationArray((prevState) => {
      return [...prevState, { ...obj, id }];
    });
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
  const handleFormSubmit = () => {
    updateTempEducationArray();
    setFormHidden(true);
    reset({
      institution: "",
      degree: "",
    });
  };
  const updateFormHidden = (bool) => {
    setFormHidden(bool);
    reset({
      institution: "",
      degree: "",
    });
  };
  return (
    <section className="create-section education">
      <CreateSectionForm
        data={{ item: "new item", save: "item" }}
        saveFunction={updateTempEducationArray}
        items={tempEducationArray}
        limit={3}
        limitMessage="include up to three items"
        formId="education"
        formHidden={formHidden}
        updateFormHidden={updateFormHidden}
      >
        <form
          className="create__form"
          id="education"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="institution"
              rules={{
                required: "institution required",
                maxLength: {
                  value: 50,
                  message: "maximum length 50 characters",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="institution"
                  ref={institution}
                  placeholder="institution"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="institution" className="visuallyhidden">
              institution
            </label>
            <p className="form__error">
              &nbsp;
              {errors.institution ? errors.institution.message : ""}
            </p>
          </div>
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="degree"
              rules={{
                required: "degree or certification required",
                maxLength: {
                  value: 50,
                  message: "maximum length 50 characters",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="degree"
                  ref={degree}
                  placeholder="degree or certification"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="degree" className="visuallyhidden">
              degree
            </label>
            <p className="form__error">
              &nbsp;
              {errors.degree ? errors.degree.message : ""}
            </p>
          </div>
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  dateFormatCalendar="MMMM"
                  showYearDropdown
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown
                  maxDate={new Date()}
                  id="date"
                  className="input--date"
                  value={date || null}
                  placeholderText="date completed"
                  onSelect={(date) => {
                    setDate(format(date, "yyyy-MM-dd"));
                    field.onChange(date);
                  }}
                />
              )}
              rules={{
                required: "date required",
              }}
            />
            <label htmlFor="date" className="visuallyhidden">
              date
            </label>
            <p className="form__error">
              &nbsp;
              {errors.date ? errors.date.message : ""}
            </p>
          </div>
          <div className="form__element">
            <input
              ref={description}
              placeholder="description"
              type="text"
              className="input--standard"
              maxLength="150"
            />
            <p className="form__error">&nbsp;</p>
          </div>
        </form>
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
