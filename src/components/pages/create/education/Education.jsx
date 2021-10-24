import React, { useLayoutEffect, useState, useRef } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import EducationItem from "./EducationItem";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import sortByDate from "../../../../utilities/sortByDate";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import MonthPicker from "../../../MonthPicker";
import YearPicker from "../../../YearPicker";
import "react-datepicker/dist/react-datepicker.css";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";
const { format } = require("date-fns");

export default function Education({
  user,
  updateLayoutData,
  updateCompletedSections,
  openAlert,
  openConfirm,
  layout,
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

  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

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
      month: month,
      year: year,
    };
    const id = obj.institution + obj.degree + obj.date;
    if (tempEducationArray.some((obj) => obj.id === id)) {
      openAlert("identical item already saved");
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
    updateCompletedSections();
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
  const updateMonth = (str) => {
    setMonth(str);
  };
  const updateYear = (str) => {
    setYear(str);
  };
  return (
    <section className="create-section education">
      <CreateSectionForm
        data={{ item: "new item", save: "item" }}
        saveFunction={updateTempEducationArray}
        items={tempEducationArray}
        limit={3}
        limitMessage="up to 3 items can be added"
        formId="education"
        formHidden={formHidden}
        updateFormHidden={updateFormHidden}
        openAlert={openAlert}
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
                minLength: {
                  value: 2,
                  message: "minimum length 2 characters",
                },
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
                minLength: {
                  value: 2,
                  message: "minimum length 2 characters",
                },
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
          <div className="form__dates">
            <p className="text date-text">completed</p>
            <div className="form__element--date">
              <Controller
                defaultValue=""
                control={control}
                name="month"
                render={({ field }) => (
                  <MonthPicker
                    id="month"
                    className="input--date month"
                    value={month || ""}
                    placeholder="month"
                    updateParent={updateMonth}
                    onSelect={(value) => {
                      // setMonthStart(format(date, "yyyy-MM-dd"));
                      field.onChange(value);
                    }}
                  />
                )}
                rules={{
                  required: "month required",
                }}
              />
              <label htmlFor="month" className="visuallyhidden">
                month
              </label>
              <p className="form__error">
                &nbsp;
                {errors.month ? errors.month.message : ""}
              </p>
            </div>
            <div className="form__element--date">
              <Controller
                defaultValue=""
                control={control}
                name="year"
                render={({ field }) => (
                  <YearPicker
                    id="year"
                    className="input--date year"
                    value={year || ""}
                    placeholder="year"
                    updateParent={updateYear}
                    maxYears={50}
                    onSelect={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
                rules={{
                  required: "year required",
                }}
              />
              <label htmlFor="year" className="visuallyhidden">
                start year
              </label>
              <p className="form__error">
                &nbsp;
                {errors.year ? errors.year.message : ""}
              </p>
            </div>
          </div>
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="description"
              rules={{
                minLength: {
                  value: 5,
                  message: "minimum length 5 characters",
                },
                maxLength: {
                  value: 100,
                  message: "maximum length 100 characters",
                },
              }}
              render={({ field }) => (
                <input
                  id="description"
                  ref={description}
                  placeholder="description (optional)"
                  type="text"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="description" className="visuallyhidden">
              description
            </label>

            <p className="form__error">
              &nbsp;
              {errors.description ? errors.description.message : ""}
            </p>
          </div>
        </form>
      </CreateSectionForm>
      <CreateSectionPreview>
        {tempEducationArray.length > 0 ? (
          tempEducationArray.map((obj) => {
            return (
              <EducationItem
                key={obj.id}
                obj={obj}
                userEducationHistory={userEducationHistory}
                handleDeletedItem={handleDeletedItem}
                openConfirm={openConfirm}
                layout={layout}
              />
            );
          })
        ) : (
          <div className="empty-preview-warning">
            no education history saved
          </div>
        )}
      </CreateSectionPreview>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_educationHistoryData"}
        data={sortByDate(tempEducationArray)}
        updateParentState={saveUserEducationHistory}
        updateCompletedSections={updateCompletedSections}
        disableButton={!updated}
      />
    </section>
  );
}
