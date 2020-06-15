module.exports = {
  CANDIDATE: [
    {
      ID: "per1",
      FirstName: "Gilad",
      LastName: "Tsabar",
      Birthdate: Date.parse("1976-04-09"),
      PlaceOfBirth: "Afula",
      Nationality: ["Israeli","Deutsch"],
      //Address: {ADDRESSES},!
      //Contact: [CONTACT_DETAILS],!
      //Education: [EDUCATION],!
      //Experience: [EXPERIENCE],!
      //Skills: [SKILLS],
      //Languages: [LANGUAGES],
      //Applications: [APPLICATIONS]!
    }
  ],
  CONTACT_DETAILS: [
    {
      ID: "con1",
      RefId: "per1",
      Type: "Mobile",
      Value: "+49 176 550 27 556",
      IsDefault: true
    },
    {
      ID: "con2",
      RefId: "per1",
      Type: "Landline",
      Value: "+49 30 830 39 120",
      IsDefault: false
    },
    {
      ID: "con2",
      RefId: "per1",
      Type: "e-Mail",
      Value: "gilad@tsabar.net",
      IsDefault: false
    },
  ],
  LANGUAGES: [
    {
      ID: "lang1",
      RefId: "per1",
      Name: "Hebrew",
      Level: 5
    },
    {
      ID: "lang2",
      RefId: "per1",
      Name: "English",
      Level: 3
    },
    {
      ID: "lang3",
      RefId: "per1",
      Name: "German",
      Level: 3
    }
  ],
  SKILLS: [
    {
      ID: "skl1",
      RefId: "per1",
      Name: "Javascript",
      Level: 5
    },
    {
      ID: "skl2",
      RefId: "per1",
      Name: "GraphQL",
      Level: 3
    },
    {
      ID: "skl3",
      RefId: "per1",
      Name: "ReactJS",
      Level: 2
    },
    {
      ID: "skl4",
      RefId: "per1",
      Name: "VBA",
      Level: 5
    }
  ],
  STATUS_LOG: [
    {
      ID: "stat1",
      RefId: "app1",
      LogValue: "Sent",
      Date: Date.parse('2020-05-15 21:02')
    },
    {
      ID: "stat2",
      RefId: "app1",
      LogValue: "In proccess",
      Date: Date.parse('2020-05-17 11:24')
    },
    {
      ID: "stat3",
      RefId: "app1",
      LogValue: "First Interview",
      Date: Date.parse('2020-05-21 12:12')
    },
    {
      ID: "stat4",
      RefId: "app1",
      LogValue: "Contract Begin",
      Date: Date.parse('2020-06-01 09:00')
    }
  ],
  APPLICATIONS: [
    {
      ID: "app1",
      RefId: "per1",
      EmployerName: "Dummy Employer",
      RoleName: "Important Role",
      RollDescription: "Do Important Stuff",
      ContactName: "John Doe",
      WebsiteUrl: "https://www.dummy-website.com",
      OpenningUrl: "https://www.dummy-opening.com",
      CoverLetter: "Here comes some long dummy letter"
      // EmployerAddress:{ADDRESSES},
      // StatusLog: [STATUS_LOG]
    },
    {
      ID: "app2",
      RefId: "per1",
      EmployerName: "Another Dummy Employer",
      RoleName: "Another Important Role",
      RollDescription: "Do More Important Stuff",
      ContactName: "Johna Doeit",
      WebsiteUrl: "https://www.another-dummy-website.com",
      OpenningUrl: "https://www.some-dummy-opening.com",
      CoverLetter: "Here comes some even more long dummy letter"
      // EmployerAddress:{ADDRESSES},
      // StatusLog: [STATUS_LOG]
    }
  ],
  EDUCATION: [
    {
      ID: "edu1",
      RefId: "per1", // Personal ID
      Institution: "Dummy University of Moabit",
      InstitutionType: "University",
      StudySubject: "Full-Stack for Dummies",
      DegreeAchived: "Certified Dummy",
      StartDate: Date.parse("2000-03-01"),
      GraduatingDate: Date.parse("2005-06-30"),
      Documents: []
      // InstitutionAddress: {ADDRESSES},!
    }
  ],
  EXPERIENCE: [
    {
      ID: "exp1",
      RefId: "per1",
      EmployerName: "First Dummy Experience",
      // EmployerAddress: {},!
      Documents: [],
      // Rolls: []!
    }
  ],
  ROLLS: [
    {
      ID: "rol1",
      RefId: "exp1",
      Title: "Head of Dummy",
      StartDate: Date.parse("2009-02-02"),
      EndDate: Date.parse("2020-06-30")
      // Tasks: [TASKS]
    }
  ],
  TASKS: [
    {
      ID: "tsk1",
      RefId: "rol1",
      Description: "Some task for dummies"
    },
    {
      ID: "tsk2",
      RefId: "rol1",
      Description: "Some task for dummies"
    },
    {
      ID: "tsk3",
      RefId: "rol1",
      Description: "Some task for dummies"
    },
    {
      ID: "tsk4",
      RefId: "rol1",
      Description: "Some task for dummies"
    }
  ],
  ADDRESS: [
    {
      ID: "addr1",
      RefId: "per1",
      Street: "Kruppstr",
      HouseNo: "12",
      City: "Berlin",
      State: "Berlin",
      Country: "Germany",
      PostalCode: 10559
    },
    {
      ID: "addr2",
      RefId: "app1",
      Street: "Dummy Street",
      HouseNo: "1",
      City: "Dummstadt",
      State: "Dummy State",
      Country: "Dummland",
      PostalCode: 10999

    },
    {
      ID: "addr3",
      RefId: "edu1",
      Street: "Dummy Edu Street",
      HouseNo: "2",
      City: "Unistadt",
      State: "Dummy State",
      Country: "Dummland",
      PostalCode: 10888
    },
    {
      ID: "addr4",
      RefId: "exp1",
      Street: "Dummy Experience Street",
      HouseNo: "3",
      City: "Workstadt",
      State: "Dummy State",
      Country: "Dummland",
      PostalCode: 10777
    },
    {
      ID: "addr5",
      RefId: "exp2",
      Street: "Nochdummy Experience Street",
      HouseNo: "4",
      City: "Workstadt",
      State: "Dummy State",
      Country: "Dummland",
      PostalCode: 10666
    }
  ]
};
