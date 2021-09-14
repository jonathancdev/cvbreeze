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
        storage !== null &&
        storage.filePath !== null &&
        storage.filePath !== "click to browse files"
      ) {
        completedSections.photo = true;
      } else {
        completedSections.photo = false;
      }
      break;
    case userId + "_profileData":
      storage !== null
        ? (completedSections.profile = true)
        : (completedSections.profile = false);
      break;
    case userId + "_workExperienceData":
      storage.length > 0
        ? (completedSections.workExperience = true)
        : (completedSections.workExperience = false);
      break;
    case userId + "_educationHistoryData":
      storage.length > 0
        ? (completedSections.educationHistory = true)
        : (completedSections.educationHistory = false);
      break;
    case userId + "_skillsData":
      storage.length > 0
        ? (completedSections.skills = true)
        : (completedSections.skills = false);
      break;
    case userId + "_contactData":
      storage !== null
        ? (completedSections.contact = true)
        : (completedSections.contact = false);
      break;
    default:
      break;
  }
};
function checkCompletedSections() {
  const user = localStorage.getObject("currentUser").userId;

  const sections = Object.keys(localStorage).filter((key) =>
    key.includes(user + "_")
  );
  sections.forEach((section) => {
    checkSwitch(user, section);
  });

  return { ...completedSections };
}
export default checkCompletedSections;
