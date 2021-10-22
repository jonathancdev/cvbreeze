import React, { useLayoutEffect, useState, useRef } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import WorkItem from "./WorkItem";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import sortByDate from "../../../../utilities/sortByDate";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";
const { format } = require("date-fns");

export default function WorkExperience({
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
  const storage = localStorage.getObject(userId + "_workExperienceData");

  const layoutData = useRef({
    section: "work experience",
    headerText: "Work experience",
    toolTip: "Work experience tooltip yo lorem ipsum fuckus duckus",
  });
  useLayoutEffect(() => {
    updateLayoutData(layoutData.current);
  });
  useLayoutUpdater(layoutData.current, updateLayoutData);
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
  const dutyOne = useRef(null);
  const dutyTwo = useRef(null);
  const dutyThree = useRef(null);

  const updateTempWorkArray = () => {
    const obj = {
      title: title.current.value,
      company: company.current.value,
      startDate: startDate,
      endDate: endDate,
      dutyOne: dutyOne.current.value,
      dutyTwo: dutyTwo.current.value,
      dutyThree: dutyThree.current.value,
    };
    const id = obj.title + obj.company + obj.startDate;
    if (tempWorkArray.some((obj) => obj.id === id)) {
      openAlert("identical item already saved");
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
    updateCompletedSections();
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
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <section className="create-section workexperience">
      <CreateSectionForm
        data={{ item: "new experience", save: "experience" }}
        items={tempWorkArray}
        limit={3}
        limitMessage="up to three positions can be added"
        formId="work"
        formHidden={formHidden}
        updateFormHidden={updateFormHidden}
        openAlert={openAlert}
      >
        <form
          className="create__form"
          id="work"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="title"
              rules={{
                required: "job title required",
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
            <label htmlFor="title" className="visuallyhidden">
              title
            </label>

            <p className="form__error">
              &nbsp;
              {errors.title ? errors.title.message : ""}
            </p>
          </div>
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="company"
              rules={{
                required: "company name required",
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
            <label htmlFor="company" className="visuallyhidden">
              company
            </label>

            <p className="form__error">
              &nbsp;
              {errors.company ? errors.company.message : ""}
            </p>
          </div>
          <div className="form__dates">
            <div className="form__element">
              <Controller
                defaultValue=""
                control={control}
                name="startdate"
                render={({ field }) => (
                  <DatePicker
                    wrapperClassName="datePicker"
                    dateFormatCalendar="MMMM"
                    showYearDropdown
                    yearDropdownItemNumber={30}
                    scrollableYearDropdown
                    maxDate={new Date()}
                    id="startdate"
                    className="input--date startdate"
                    value={startDate || null}
                    placeholderText="start date"
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
              <label htmlFor="startdate" className="visuallyhidden">
                start date
              </label>

              <p className="form__error">
                &nbsp;
                {errors.startdate ? errors.startdate.message : ""}
              </p>
            </div>
            <div className="form__element--date">
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
                    className="input--date enddate"
                    value={endDate || null}
                    placeholderText="end date"
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
              <label htmlFor="enddate" className="visuallyhidden">
                end date
              </label>
              <p className="form__error">
                &nbsp;
                {errors.enddate ? errors.enddate.message : ""}
              </p>
            </div>
          </div>
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="duty"
              rules={{
                required: "at least one duty required",
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
                  id="duty"
                  ref={dutyOne}
                  placeholder="job duty"
                  type="text"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="duty" className="visuallyhidden">
              duties
            </label>

            <p className="form__error">
              &nbsp;
              {errors.duty ? errors.duty.message : ""}
            </p>
          </div>
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="dutyTwo"
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
                  id="dutyTwo"
                  ref={dutyTwo}
                  placeholder="job duty (optional)"
                  type="text"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="dutyTwo" className="visuallyhidden">
              duties
            </label>

            <p className="form__error">
              &nbsp;
              {errors.dutyTwo ? errors.dutyTwo.message : ""}
            </p>
          </div>
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="dutyThree"
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
                  id="dutyTrhee"
                  ref={dutyThree}
                  placeholder="job duty (optional)"
                  type="text"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="dutyThree" className="visuallyhidden">
              duties
            </label>

            <p className="form__error">
              &nbsp;
              {errors.dutyThree ? errors.dutyThree.message : ""}
            </p>
          </div>
        </form>
      </CreateSectionForm>
      <CreateSectionPreview>
        {tempWorkArray.length > 0 ? ( // USING TEMPWORKARRAY SO UNSAVED ITEMS DISPLAY, COMPARE IN WORKITEM COMPONENT TO ONLY ADD DELETE BUTTON IF THEY ARE ALSO IN USERWORKEXPERIENCE
          tempWorkArray.map((obj) => {
            return (
              <WorkItem
                key={obj.id}
                obj={obj}
                userWorkExperience={userWorkExperience}
                handleDeletedItem={handleDeletedItem}
                openConfirm={openConfirm}
                layout={layout}
              />
            );
          })
        ) : (
          <div className="empty-preview-warning">no work experience saved</div>
        )}
      </CreateSectionPreview>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_workExperienceData"}
        //SORTS TEMPWORKARRAY OBJECTS BY DATE DESCENDING WHICH AUTOMATICALLY
        //UPDATES INTO STATE WHEN SAVED TO LOCAL STORAGE
        data={sortByDate(tempWorkArray)}
        updateParentState={saveUserWorkExperience}
        updateCompletedSections={updateCompletedSections}
        disableButton={!updated}
      />
    </section>
  );
}
