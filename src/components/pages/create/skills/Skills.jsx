import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";
import SkillItem from "./SkillItem";

export default function Skills({ user, updateLayoutData }) {
  //variables from props  & storage
  const userId = user.userId;
  const storage = localStorage.getObject(userId + "_skillsData");

  //refs ???

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

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });
  const setSkill = (e) => {
    const value = e.target.value;
    setTempSkill({ skill: value });
  };
  const updateTempSkillArray = () => {
    let index = 0;
    if (userSkills && userSkills.length > 0) {
      index = userSkills.length;
    }
    const id = tempSkill.skill + index;
    setTempSkillArray((prevState) => {
      return [...prevState, { ...tempSkill, id }];
    });
    setTempSkill(null);
    setUpdated(true);
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
      >
        <input
          placeholder="enter skill"
          type="text"
          className="input--standard"
          onChange={setSkill}
        />
        <>
          {/* needs an empty element because component can't .map only one */}
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
        disableButton={!updated}
      />
    </section>
  );
}
