import React, { useEffect, useState } from "react";
import SaveSection from "../create-layout/SaveSection";
import checkCompletedSections from "../../../../utilities/checkCompletedSections";
import CreateSectionForm from "../CreateSectionForm";
import CreateSectionPreview from "../CreateSectionPreview";

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
  const [tempSkillArray, setTempSkillArray] = useState([]);
  const [userSkills, setUserSkills] = useState(storage ? storage.skills : null);

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });
  const setSkill = (e) => {
    const value = e.target.value;
    setTempSkill(value);
  };
  const updateTempSkillArray = () => {
    setTempSkillArray((prevState) => {
      return [...prevState, tempSkill];
    });
  };
  const saveUserSkills = () => {
    setUserSkills(tempSkillArray);
    setTempSkill(null);
  };
  console.log(tempSkill);
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
        {/* //empty element because sectionform sections wants to map an array */}
        <></>
      </CreateSectionForm>
      <CreateSectionPreview>
        {userSkills
          ? userSkills.map((skill, i) => {
              return skill;
            })
          : "no work experience saved"}
      </CreateSectionPreview>
      <SaveSection
        message="message"
        storageKey={userId + "_skillsData"}
        data={{ skills: tempSkillArray }}
        updateParentState={saveUserSkills}
      />
    </section>
  );
}
