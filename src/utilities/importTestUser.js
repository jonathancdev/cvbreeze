export function importTestUser() {
  localStorage.setObject("BREEZEID_M5B6M16_photoData", {
    userPhoto: "test user",
    filePath: "breezeM_cv.jpg",
  });
  //contact
  localStorage.setObject("BREEZEID_M5B6M16_contactData", {
    telephone: "555-123-1829",
    email: "maria@mariabgraphics.io",
    city: "Boston",
    state: "Massachusetts",
    country: "USA",
    website: "mariabgraphics.io",
  });
  //education
  localStorage.setObject("BREEZEID_M5B6M16_educationHistoryData", [
    {
      institution: "New England Institute of Technology",
      degree: "B.A. Fine Arts",
      description:
        "Graphic design concentration with focus on digital marketing and new media",
      date: "2012-06-08",
      id: "New England Institute of TechnologyB.A. Fine Arts2012-06-08",
    },
    {
      institution: "New England Institute of Technology",
      degree: "Modern Web Design Certification",
      description: "",
      date: "2010-06-11",
      id: "New England Institute of TechnologyModern Web Design Certification2010-06-11",
    },
  ]);
  //profile
  localStorage.setObject(
    "BREEZEID_M5B6M16_profileData",

    "Senior graphic designer with more than 5 years of experience managing the design process from concept to completion. Skilled in interdepartmental communication and coordination. Proficient in all industry leading design suites and experienced with web design applications and integration."
  );
  //skills
  localStorage.setObject("BREEZEID_M5B6M16_skillsData", [
    { skill: "Adobe Creative Suite", id: "Adobe Creative Suite0" },
    { skill: "Microsoft Office Suite", id: "Microsoft Office Suite1" },
    {
      skill: "HTML / CSS",
      id: "HTML / CSS2",
    },
    { skill: "Typography", id: "Typography3" },
    { skill: "Time Management", id: "Time Management4" },
    { skill: "Communication", id: "Communication5" },
  ]);
  //work
  localStorage.setObject("BREEZEID_M5B6M16_workExperienceData", [
    {
      title: "Senior Graphic Designer",
      company: "Impulse Design",
      startDate: "2016-08-08",
      endDate: "2021-10-19",
      dutyOne:
        "Lead the design, development, and production of communication materials",
      dutyTwo:
        "Oversaw seven-member design team and provided mentorship to junior designers",
      dutyThree:
        "Supervised the quality assessment of all graphic materials to ensure company standards",
      id: "Senior Graphic DesignerImpulse Design2016-08-08",
    },
    {
      title: "Lead Graphic Design Specialist",
      company: "Creative Agency",
      startDate: "2012-12-06",
      endDate: "2016-07-04",
      dutyOne:
        "Developed marketing campaign materials including logos, brochures, newsletters, and more",
      dutyTwo:
        "Managed several simultaneous projects and campaigns successfully within deadlines",
      dutyThree:
        "Advised and consulted with clients to coordinate design options based on budgets and goals",
      id: "Lead Graphic Design SpecialistCreative Agency2012-12-06",
    },
  ]);

  localStorage.setObject("user_test", {
    firstName: "Maria",
    lastName: "Breeze",
    profession: "Graphic Designer",
    password: "a83kfad2211",
    email: "maria@mariabgraphics.io",
    userId: "BREEZEID_M5B6M16",
    storageKey: "user_test",
  });
}
