import React, { useState, useRef } from "react";
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
  const storage = localStorage.getObject(userId + "_skillsData");
  //useRef here stops useLayoutUpdater hook from causing infinite render
  const layoutData = useRef({
    section: "skills",
    headerText: "Add relevant skills",
    toolTip: "Skills tooltip yo lorem ipsum fuckus duckus",
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
      alert("skill with that name already saved");
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
    updateCompletedSection(checkCompletedSections());
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
        data={{ item: "skill", save: "skill" }}
        saveFunction={updateTempSkillArray}
        items={tempSkillArray}
        limit={8}
        limitMessage="include up to 8 skills"
        formId="skill"
        formHidden={formHidden}
        updateFormHidden={updateFormHidden}
      >
        <form
          className="create__form"
          id="skill"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
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
          <label htmlFor="skill">
            {errors.skill ? null : "skill"}
            {errors.skill && (
              <p className="form__error">{errors.skill.message}</p>
            )}
          </label>
          <>
            {/* NEEDS AN EMPTY ELEMENT BECAUSE COMPONENT CAN'T .MAP ONLY ONE */}
          </>
        </form>
      </CreateSectionForm>
      <CreateSectionPreview>
        {tempSkillArray.length > 0
          ? tempSkillArray.map((obj) => {
              return (
                <SkillItem
                  key={obj.id}
                  obj={obj}
                  userSkills={userSkills}
                  handleDeletedItem={handleDeletedItem}
                />
              );
            })
          : "no skills saved"}
      </CreateSectionPreview>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_skillsData"}
        data={tempSkillArray}
        updateParentState={saveUserSkills}
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
