let completedSections = {
  photo: false,
  profile: false,
  workExperience: false,
  educationHistory: false,
  skills: false,
  contact: false,
};
const checkSwitch = (userId, section) => {
  const storage = localStorage.getObject(section);
  switch (section) {
    case userId + "_photoData":
      if (
        storage.filePath !== null &&
        storage.filePath != "click to browse files"
      ) {
        completedSections.photo = true;
      } else {
        completedSections.photo = false;
      }
      break;
    case userId + "_profileData":
      storage.profile
        ? (completedSections.profile = true)
        : (completedSections.profile = false);
      break;
    case userId + "_workExperienceData":
      storage.workExperience.length > 0
        ? (completedSections.workExperience = true)
        : (completedSections.workExperience = false);
      break;
    case userId + "_educationHistoryData":
      storage.educationHistory.length > 0
        ? (completedSections.educationHistory = true)
        : (completedSections.educationHistory = false);
      break;
    case userId + "_skillsData":
      storage.skills.length > 0
        ? (completedSections.skills = true)
        : (completedSections.skills = false);
      break;
    case userId + "_contactData":
      storage.contact &&
      storage.contact.telephone.length > 6 &&
      storage.contact.email.length > 6
        ? (completedSections.contact = true)
        : (completedSections.contact = false);
      break;
  }
};
function checkCompletedSections(storageKey) {
  const user = localStorage.getObject("currentUser").userId;
  const sections = Object.keys(localStorage).filter((key) =>
    key.includes(user + "_")
  );
  sections.forEach((section) => {
    checkSwitch(user, section);
  });
  console.log(sections);
  return completedSections;
  // console.log(user);
  // console.log(sections);
}

export default checkCompletedSections;

//storage found AND
//filePath: "real string", userPhoto: "real string" OR
//filePath: "disabled", userPhoto: null
//NOT filepath: "click to browse files"
