import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import SkillItem from "./SkillItem";

export default function Skills({
  user,
  updateLayoutData,
  updateCompletedSection,
}) {
  //VARIABLES FROM PROPS  & STORAGE
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_skillsData");

  useEffect(() => {
    const layoutData = {
      section: "skills",
      headerText: "relevant skills",
      toolTip: "Skills tooltip yo lorem ipsum fuckus duckus",
    };
    updateLayoutData(layoutData);
  }, [updateLayoutData]);

  const [tempSkill, setTempSkill] = useState(null);
  const [tempSkillArray, setTempSkillArray] = useState(
    storage ? storage.skills : []
  );
  const [userSkills, setUserSkills] = useState(storage ? storage.skills : null);
  const [updated, setUpdated] = useState(false);
  const setSkill = (e) => {
    const value = e.target.value;
    setTempSkill({ skill: value });
  };
  const updateTempSkillArray = () => {
    if (!tempSkill) {
      alert("enter a valid skill");
      return; //EXIT FUNCTION IF NOTHING ENTERED IN BOX
    }
    let index = 0;
    if (userSkills && userSkills.length > 0) {
      index = userSkills.length;
    }
    const id = tempSkill.skill + index;
    //MAKE SURE SKILL DOESN'T REPEAT
    if (tempSkillArray.some((obj) => obj.skill === tempSkill.skill)) {
      alert("skill with that name already saved");
    } else {
      setTempSkillArray((prevState) => {
        return [...prevState, { ...tempSkill, id }];
      });
      setTempSkill(null);
      setUpdated(true);
    }
  };
  const saveUserSkills = () => {
    setUserSkills(tempSkillArray);
    setTempSkill(null);
    setUpdated(false);
  };
  const childSetUpdated = (bool) => {
    setUpdated(bool);
  };
  return (
    <section className="create-section skills">
      <CreateSectionForm
        data={{ item: "skill", save: "skill" }}
        saveFunction={updateTempSkillArray}
        items={tempSkillArray}
        limit={8}
        limitMessage="include up to 8 skills"
      >
        <input
          placeholder="enter skill"
          type="text"
          className="input--standard"
          onChange={setSkill}
        />
        <>
          {/* NEEDS AN EMPTY ELEMENT BECAUSE COMPONENT CAN'T .MAP ONLY ONE */}
        </>
      </CreateSectionForm>
      <CreateSectionPreview>
        {tempSkillArray.length > 0
          ? tempSkillArray.map((obj) => {
              return (
                <SkillItem
                  key={obj.id}
                  obj={obj}
                  data={{ skills: userSkills }}
                  userSkills={userSkills}
                  updateParentState={saveUserSkills}
                  childSetUpdated={childSetUpdated}
                />
              );
            })
          : "no skills saved"}
      </CreateSectionPreview>
      <SaveSection
        message={updated ? "do you want to save these changes?" : null}
        storageKey={userId + "_skillsData"}
        data={{ skills: tempSkillArray }}
        updateParentState={saveUserSkills}
        updateCompletedSection={updateCompletedSection}
        disableButton={!updated}
      />
    </section>
  );
}
