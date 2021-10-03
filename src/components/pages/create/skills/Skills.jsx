import React, { useLayoutEffect, useState, useRef } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import SkillItem from "./SkillItem";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import { useForm, Controller } from "react-hook-form";
import useLayoutUpdater from "../../../../hooks/useLayoutUpdater";

export default function Skills({
  user,
  updateLayoutData,
  updateCompletedSections,
  openAlert,
  openConfirm,
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
  const storage = localStorage.getObject(userId + "_skillsData");
  //useRef here stops useLayoutUpdater hook from causing infinite render
  const layoutData = useRef({
    section: "skills",
    headerText: "Relevant skills",
    toolTip: "Skills tooltip yo lorem ipsum fuckus duckus",
  });
  useLayoutEffect(() => {
    updateLayoutData(layoutData.current);
  });
  useLayoutUpdater(layoutData.current, updateLayoutData);

  //const [tempSkill, setTempSkill] = useState(null);
  const [tempSkillArray, setTempSkillArray] = useState(storage ? storage : []);
  const [userSkills, setUserSkills] = useState(storage ? storage : null);
  //FORM AND BUTTON ATTRIBUTES
  const [updated, setUpdated] = useState(false);
  const [formHidden, setFormHidden] = useState(true);
  // const setSkill = (e) => {
  //   const value = e.target.value;
  //   setTempSkill({ skill: value });
  // };

  const skill = useRef(null);

  const updateTempSkillArray = () => {
    let index = 0;
    if (userSkills && userSkills.length > 0) {
      index = userSkills.length;
    }
    const id = skill.current.value + index;
    //MAKE SURE SKILL DOESN'T REPEAT
    if (
      tempSkillArray.length > 0 &&
      tempSkillArray.some((obj) => obj.skill === skill.current.value)
    ) {
      openAlert("identical skill already saved");
    } else {
      setTempSkillArray((prevState) => {
        return [...prevState, { skill: skill.current.value, id }];
      });
      //setTempSkill(null);
      setUpdated(true);
    }
  };
  const handleDeletedItem = (obj) => {
    localStorage.setObject(userId + "_skillsData", obj);
    const storage = localStorage.getObject(userId + "_skillsData");
    setTempSkillArray(storage);
    setUserSkills(storage);
    updateCompletedSections();
  };
  const saveUserSkills = () => {
    setUserSkills(tempSkillArray);
    //setTempSkill(null);
    setUpdated(false);
  };
  const handleFormSubmit = () => {
    updateTempSkillArray();
    setFormHidden(true);
    reset({
      skill: "",
    });
  };
  const updateFormHidden = (bool) => {
    setFormHidden(bool);
    reset({
      skill: "",
    });
  };
  return (
    <section className="create-section skills">
      <CreateSectionForm
        data={{ item: "new skill", save: "skill" }}
        saveFunction={updateTempSkillArray}
        items={tempSkillArray}
        limit={8}
        limitMessage="up to 8 skills can be added"
        formId="skill"
        formHidden={formHidden}
        updateFormHidden={updateFormHidden}
        openAlert={openAlert}
      >
        <form
          className="create__form"
          id="skill"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="form__element">
            <Controller
              defaultValue=""
              control={control}
              name="skill"
              rules={{
                required: "enter skill",
                maxLength: {
                  value: 50,
                  message: "maximum length 50 characters",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="skill"
                  ref={skill}
                  placeholder="enter skill"
                  className="input--standard"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <label htmlFor="skill" className="visuallyhidden">
              skill
            </label>
            <p className="form__error">
              &nbsp;
              {errors.skill ? errors.skill.message : ""}
            </p>
          </div>
          <>
            {/* NEEDS AN EMPTY ELEMENT BECAUSE COMPONENT CAN'T .MAP ONLY ONE */}
          </>
        </form>
      </CreateSectionForm>
      <CreateSectionPreview>
        {tempSkillArray.length > 0 ? (
          tempSkillArray.map((obj) => {
            return (
              <SkillItem
                key={obj.id}
                obj={obj}
                userSkills={userSkills}
                handleDeletedItem={handleDeletedItem}
                openConfirm={openConfirm}
              />
            );
          })
        ) : (
          <div className="empty-preview-warning">no skills saved</div>
        )}
      </CreateSectionPreview>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_skillsData"}
        data={tempSkillArray}
        updateParentState={saveUserSkills}
        updateCompletedSections={updateCompletedSections}
        disableButton={!updated}
      />
    </section>
  );
}
