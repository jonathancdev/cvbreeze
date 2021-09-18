export function importTestUser() {
  localStorage.setObject("BREEZEID_J4B6P12_photoData", {
    userPhoto: "test user",
    filePath: "breezeJ_cv.jpg",
  });
  //contact
  localStorage.setObject("BREEZEID_J4B6P12_contactData", {
    telephone: "555-555-5555",
    email: "maria@cvbreeze.breeze",
    address: "510 Carrington Lane\nAdelaide\nSA 5000\nAustralia",
    website: "janebmgmt.breeze",
  });
  //education
  localStorage.setObject("BREEZEID_J4B6P12_educationHistoryData", [
    {
      institution: "International Biz University",
      degree: "MBA",
      description: "Management concentration",
      date: "2016-05-12",
      id: "International Biz UniversityMBA2016-05-12",
    },
    {
      institution: "Happy University",
      degree: "BA Marketing and Strategy",
      description: "",
      date: "2013-06-18",
      id: "Happy UniversityBA Marketing and Strategy2013-06-18",
    },
  ]);
  //profile
  localStorage.setObject(
    "BREEZEID_J4B6P12_profileData",

    "Aliquet eget sit amet tellus. Sit amet mauris commodo quis imperdiet. A lacus vestibulum sed arcu non. Netus et malesuada fames ac. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Nisi vitae suscipit tellus mauris a diam maecenas sed. Ut pharetra sit amet aliquam id. Varius sit amet mattis vulputate enim nulla."
  );
  //skills
  localStorage.setObject("BREEZEID_J4B6P12_skillsData", [
    { skill: "Project Management", id: "Project Management1" },
    { skill: "Performance Management", id: "Performance Management2" },
    {
      skill: "Staff Recruitment and Training",
      id: "Staff Recruitment and Training3",
    },
    { skill: "Marketing and Promotions", id: "Marketing and Promotions4" },
    { skill: "Auditing", id: "Auditing5" },
    { skill: "Quality Assurance", id: "Quality Assurance6" },
    {
      skill: "Revenue and Trend Analysis",
      id: "Revenue and Trend Analysis7",
    },
    { skill: "Continuous Improvement", id: "Continuous Improvement8" },
  ]);
  //work
  localStorage.setObject("BREEZEID_J4B6P12_workExperienceData", [
    {
      title: "Manager",
      company: "Super Agency",
      startDate: "2017-03-01",
      endDate: "2021-07-04",
      dutyOne:
        "Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum",
      dutyTwo: "At risus viverra adipiscing at in",
      dutyThree: "Ante metus dictum at tempor commodo",
      id: "ManagerSuper Agency2017-03-01",
    },
    {
      title: "Supervisor",
      company: "Wonder Corp.",
      startDate: "2015-03-10",
      endDate: "2017-02-14",
      dutyOne: "Faucibus purus in massa tempor",
      dutyTwo: "Neque ornare aenean euismod elementum",
      dutyThree: "Diam maecenas sed enim ut",
      id: "SupervisorWonder Corp.2015-03-10",
    },
    {
      title: "Coordinator",
      company: "The Great Foundation",
      startDate: "2012-06-20",
      endDate: "2015-01-31",
      dutyOne: "Laoreet sit amet cursus sit amet",
      dutyTwo: "Elementum integer enim neque volutpat",
      dutyThree: "Molestie at elementum eu facilisis sed odio",
      id: "CoordintaorThe Great Foundation2012-06-20",
    },
  ]);

  localStorage.setObject("user_test", {
    name: "Maria",
    surname: "Breeze",
    profession: "Managing Partner",
    password: "password",
    email: "maria@cvbreeze.cv",
    userId: "BREEZEID_J4B6P12",
    storageKey: "user_test",
  });
}
