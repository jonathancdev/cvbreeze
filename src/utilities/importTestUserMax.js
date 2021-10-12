const profile =
  "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two.";
const fifty = [
  "A wonderful serenity has taken",
  "A wonderful serenity has taken",
  "A wonderful serenity has taken",
  "A wonderful serenity has taken",
  "A wonderful serenity has taken",
];
const hundred = [
  "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was bo",
  "The European languages are members of the same family. Their separate existence is a myth. For scien",
  "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live.",
  "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring whi",
  "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced",
];

export function importTestUserMax() {
  localStorage.setObject("BREEZEID_M5B6M16_photoData", {
    userPhoto: "test user",
    filePath: "breezeJ_cv.jpg",
  });
  //contact
  localStorage.setObject("BREEZEID_M5B6M16_contactData", {
    telephone: "555-555-5555-123-698",
    email: "zaqwsxcderfvbgtyhnmj@tgfds.com",
    city: "Adelaide",
    state: "South Australia",
    country: "Australia",
    website: "vbgtyhnmjuikloikujyatgfds.com",
  });
  //education
  localStorage.setObject("BREEZEID_M5B6M16_educationHistoryData", [
    {
      institution: fifty[0],
      degree: fifty[1],
      description: hundred[0],
      date: "2016-05-12",
      id: "International Biz UniversityMBA2016-05-12",
    },
    {
      institution: fifty[2],
      degree: fifty[4],
      description: hundred[1],
      date: "2013-06-18",
      id: "Happy UniversityBA Marketing and Strategy2013-06-18",
    },
  ]);
  //profile
  localStorage.setObject("BREEZEID_M5B6M16_profileData", profile);
  //skills
  localStorage.setObject("BREEZEID_M5B6M16_skillsData", [
    { skill: fifty[3], id: "Project Management1" },
    { skill: fifty[4], id: "Performance Management2" },
    {
      skill: fifty[2],
      id: "Staff Recruitment and Training3",
    },
    { skill: fifty[1], id: "Marketing and Promotions4" },
    { skill: fifty[0], id: "Auditing5" },
    { skill: fifty[3], id: "Quality Assurance6" },
    {
      skill: fifty[2],
      id: "Revenue and Trend Analysis7",
    },
    { skill: fifty[4], id: "Continuous Improvement8" },
  ]);
  //work
  localStorage.setObject("BREEZEID_M5B6M16_workExperienceData", [
    {
      title: fifty[2],
      company: fifty[1],
      startDate: "2017-03-01",
      endDate: "2021-07-04",
      dutyOne: hundred[3],
      dutyTwo: hundred[2],
      dutyThree: hundred[0],
      id: "ManagerSuper Agency2017-03-01",
    },
    {
      title: fifty[0],
      company: fifty[3],
      startDate: "2015-03-10",
      endDate: "2017-02-14",
      dutyOne: hundred[2],
      dutyTwo: hundred[3],
      dutyThree: hundred[4],
      id: "SupervisorWonder Corp.2015-03-10",
    },
    {
      title: fifty[4],
      company: fifty[2],
      startDate: "2012-06-20",
      endDate: "2015-01-31",
      dutyOne: hundred[3],
      dutyTwo: hundred[2],
      dutyThree: hundred[1],
      id: "CoordintaorThe Great Foundation2012-06-20",
    },
  ]);

  localStorage.setObject("user_test", {
    name: "Maria",
    surname: "Breeze",
    profession: "Managing Partner",
    password: "password",
    email: "maria@cvbreeze.cv",
    userId: "BREEZEID_M5B6M16",
    storageKey: "user_test",
  });
}
