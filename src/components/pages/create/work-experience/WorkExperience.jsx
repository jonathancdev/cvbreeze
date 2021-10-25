import React, { useLayoutEffect, useState, useRef } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import WorkItem from "./WorkItem";
import sortByDate from "../../../../utilities/sortByDate";
import { useForm, Controller } from "react-hook-form";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";
import MonthPicker from "../../../MonthPicker";
import YearPicker from "../../../YearPicker";

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
  const [monthStart, setMonthStart] = useState(null);
  const [monthEnd, setMonthEnd] = useState(null);
  const [yearStart, setYearStart] = useState(null);
  const [yearEnd, setYearEnd] = useState(null);
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
      monthStart: monthStart,
      monthEnd: monthEnd,
      yearStart: yearStart,
      yearEnd: yearEnd,
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
    setMonthStart(null);
    setMonthEnd(null);
    setYearStart(null);
    setYearEnd(null);
  };
  const updateMonthStart = (str) => {
    setMonthStart(str);
  };
  const updateMonthEnd = (str) => {
    setMonthEnd(str);
  };
  const updateYearStart = (str) => {
    setYearStart(str);
  };
  const updateYearEnd = (str) => {
    setYearEnd(str);
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
            <div className="form__element--date">
              <Controller
                defaultValue=""
                control={control}
                name="monthstart"
                render={({ field }) => (
                  <MonthPicker
                    id="monthstart"
                    className="input--date monthstart"
                    value={monthStart || ""}
                    placeholder="month"
                    updateParent={updateMonthStart}
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
              <label htmlFor="monthstart" className="visuallyhidden">
                start month
              </label>
              <p className="form__error">
                &nbsp;
                {errors.monthstart ? errors.monthstart.message : ""}
              </p>
            </div>
            <div className="form__element--date">
              <Controller
                defaultValue=""
                control={control}
                name="yearstart"
                render={({ field }) => (
                  <YearPicker
                    id="yearstart"
                    className="input--date yearstart"
                    value={yearStart || ""}
                    placeholder="year"
                    updateParent={updateYearStart}
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
              <label htmlFor="yearstart" className="visuallyhidden">
                start year
              </label>
              <p className="form__error">
                &nbsp;
                {errors.yearstart ? errors.yearstart.message : ""}
              </p>
            </div>
            <p className="text date-dash">&mdash;</p>
            <div className="form__element--date">
              <Controller
                defaultValue=""
                control={control}
                name="monthend"
                render={({ field }) => (
                  <MonthPicker
                    id="monthend"
                    className="input--date monthend"
                    value={monthEnd || ""}
                    placeholder="month"
                    updateParent={updateMonthEnd}
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
              <label htmlFor="monthend" className="visuallyhidden">
                end month
              </label>
              <p className="form__error">
                &nbsp;
                {errors.monthend ? errors.monthend.message : ""}
              </p>
            </div>
            <div className="form__element--date">
              <Controller
                defaultValue=""
                control={control}
                name="yearend"
                render={({ field }) => (
                  <YearPicker
                    id="yearend"
                    className="input--date yearEnd"
                    value={yearStart || ""}
                    placeholder="year"
                    updateParent={updateYearEnd}
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
              <label htmlFor="yearend" className="visuallyhidden">
                end year
              </label>
              <p className="form__error">
                &nbsp;
                {errors.yearend ? errors.yearend.message : ""}
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
