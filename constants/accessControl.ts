import { ApplicationRole } from "#types/accessControl";

export const ApplicationRolePermissionName = {
  FullAccess: "полный доступ",
  PartialViewing: "частичный просмотр",
  Viewing: "просмотр",
  PartialEditing: "частичное редактирование",
  Editing: "редактирование",
} as const;

export const ApplicationModuleName = {
  Students: "Студенты",
  Groups: "Группы",
  Specialities: "Специальности",
  ForeignStudents: "Иностранные обучающиеся",
  PostgraduateStudents: "Аспирантура",
  Orders: "Приказы и распоряжения",
  Distribution: "Трудоустройство выпускников",
  Graduation: "Регистрация дипломов",
  EducationPlans: "Учебные планы",
  Statements: "Ведомости",
  Auditoriums: "Цифровой паспорт аудиторий",
  Handbooks: "Справочники",
  Admin: "Панель администратора",
} as const;

export const ApplicationPageName = {
  Student: "Студент",
  Students: "Студенты",
  PostgraduateStudents: "Аспирантура",
  PostgraduateStudent: "Аспирант",
  PostgraduateStudentHalfYearAttestation: "Полугодовая аттестация аспиранта",
  PostgraduateStudentFinalAttestation: "Итоговая аттестация аспиранта",
  PostgraduateStudentAnnualAttestation: "Годовая аттестация аспиранта",
  PostgraduateStudentIndividualPlan: "Индивидуальный план аспиранта",
  Orders: "Приказы и распоряжения",
  Order: "Приказ (Распоряжение)",
  Handbooks: "Справочники",
  Groups: "Группы",
  Group: "Группа",
  Specialities: "Специальности",
  ForeignStudent: "Иностранный обучающийся",
  ForeignStudents: "Иностранные обучающиеся",
  Graduation: "Регистрация дипломов",
  Companies: "Предприятия, потребности и трудоустройство",
  Company: "Предприятие",
  Admin: "Сотрудники и роли",
  Auditoriums: "Аудитории",
  Auditorium: "Аудитория",
} as const;

export const ADMIN_ROLE: ApplicationRole = {
  id: 1,
  name: "Admin",
  permittedModules: [
    {
      name: ApplicationModuleName.Admin,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.Admin,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
      ],
    },
    {
      name: ApplicationModuleName.Auditoriums,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.Auditoriums,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.Auditorium,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
      ],
    },
    {
      name: ApplicationModuleName.Handbooks,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.Handbooks,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
      ],
    },
    {
      name: ApplicationModuleName.EducationPlans,
      isExternal: true,
      permissions: [ApplicationRolePermissionName.FullAccess],
    },
    {
      name: ApplicationModuleName.Statements,
      isExternal: true,
      permissions: [ApplicationRolePermissionName.FullAccess],
    },
    {
      name: ApplicationModuleName.Distribution,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.Companies,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.Company,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
      ],
    },
    {
      name: ApplicationModuleName.Orders,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.Orders,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.Order,
          permissions: [
            ApplicationRolePermissionName.FullAccess,
            "отмена проведенных приказов",
          ],
        },
      ],
    },
    {
      name: ApplicationModuleName.PostgraduateStudents,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.PostgraduateStudents,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.PostgraduateStudent,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.PostgraduateStudentAnnualAttestation,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.PostgraduateStudentFinalAttestation,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.PostgraduateStudentHalfYearAttestation,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.PostgraduateStudentIndividualPlan,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
      ],
    },
    {
      name: ApplicationModuleName.ForeignStudents,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.ForeignStudents,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.ForeignStudent,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
      ],
    },
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.FullAccess],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.FullAccess],
        },
      ],
    },
  ],
};

export const EMPLOYEE_ROLE: ApplicationRole = {
  id: 2,
  name: "Employee",
  permittedModules: [],
};

export const STUDENT_ROLE: ApplicationRole = {
  id: 3,
  name: "Student",
  permittedModules: [
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.Student,
          permissions: [
            ApplicationRolePermissionName.PartialViewing,
            "заказ услуг",
          ],
        },
      ],
    },
  ],
};

export const SECRETARY_ROLE: ApplicationRole = {
  id: 12,
  name: "Secretary",
  permittedModules: [
    {
      name: ApplicationModuleName.EducationPlans,
      isExternal: true,
      permissions: ["доступ в соответствии с факультетом"],
    },
    {
      name: ApplicationModuleName.Statements,
      isExternal: true,
      permissions: ["доступ в соответствии с факультетом"],
    },
    {
      name: ApplicationModuleName.Distribution,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.Companies,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.Company,
          permissions: [ApplicationRolePermissionName.Editing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Orders,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Orders,
          permissions: ["создание приказов"],
        },
        {
          name: ApplicationPageName.Order,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
    {
      name: ApplicationModuleName.PostgraduateStudents,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.PostgraduateStudents,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudent,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentAnnualAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentFinalAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentHalfYearAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentIndividualPlan,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [
            ApplicationRolePermissionName.Editing,
            "перевод на следующий курс",
          ],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [
            ApplicationRolePermissionName.PartialEditing,
            "обработка заказанных услуг",
          ],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [
            ApplicationRolePermissionName.PartialEditing,
            "обработка заказанных услуг",
          ],
        },
      ],
    },
  ],
};

export const SECRETARY_DEP_MILITARY_ROLE: ApplicationRole = {
  id: 1385,
  name: "Secretary_DepMilitary",
  permittedModules: [
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
        },
        {
          name: ApplicationPageName.Student,
        },
      ],
    },
  ],
};

export const FOREIGN_STUDENTS_SECRETARY_ROLE: ApplicationRole = {
  id: 13,
  name: "FS_Secretary",
  permittedModules: [
    {
      name: ApplicationModuleName.Handbooks,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Handbooks,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Orders,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Orders,
          permissions: ["создание приказов"],
        },
        {
          name: ApplicationPageName.Order,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
    {
      name: ApplicationModuleName.ForeignStudents,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.ForeignStudents,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.ForeignStudent,
          permissions: [ApplicationRolePermissionName.Editing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [
            ApplicationRolePermissionName.Editing,
            "перевод на следующий курс",
          ],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
  ],
};

export const POSTGRADUATE_STUDENT_ROLE: ApplicationRole = {
  id: 118,
  name: "PostgraduateStudent",
  permittedModules: [
    {
      name: ApplicationModuleName.PostgraduateStudents,
      permissions: [
        ApplicationRolePermissionName.PartialViewing,
        ApplicationRolePermissionName.PartialEditing,
      ],
      permittedPages: [
        {
          name: ApplicationPageName.PostgraduateStudent,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentAnnualAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentFinalAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentHalfYearAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentIndividualPlan,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
  ],
};

export const SCIENTIFIC_SUPERVISOR_ROLE: ApplicationRole = {
  id: 119,
  name: "ScientificSupervisor",
  permittedModules: [
    {
      name: ApplicationModuleName.PostgraduateStudents,
      permissions: [
        ApplicationRolePermissionName.PartialViewing,
        ApplicationRolePermissionName.PartialEditing,
      ],
      permittedPages: [
        {
          name: ApplicationPageName.PostgraduateStudents,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudent,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentAnnualAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentFinalAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentHalfYearAttestation,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentIndividualPlan,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
  ],
};

export const POSTGRADUATE_STUDENTS_SECRETARY_ROLE: ApplicationRole = {
  id: 120,
  name: "PS_Secretary",
  permittedModules: [
    {
      name: ApplicationModuleName.Orders,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Orders,
          permissions: ["создание приказов"],
        },
        {
          name: ApplicationPageName.Order,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
    {
      name: ApplicationModuleName.PostgraduateStudents,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.PostgraduateStudents,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.PostgraduateStudent,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentAnnualAttestation,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentFinalAttestation,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentHalfYearAttestation,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentIndividualPlan,
          permissions: [ApplicationRolePermissionName.Editing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [
            ApplicationRolePermissionName.Editing,
            "перевод на следующий курс",
          ],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
  ],
};

export const VISITOR_ROLE: ApplicationRole = {
  id: 125,
  name: "Visitor",
  permittedModules: [
    {
      name: ApplicationModuleName.Distribution,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.Companies,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Company,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
  ],
};

export const DO_SECRETARY_ROLE: ApplicationRole = {
  id: 126,
  name: "DO_Secretary",
  permittedModules: [
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialEditing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [
            ApplicationRolePermissionName.Viewing,
            "обработка заказнных услуг",
            "статистика платных услуг",
          ],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [
            ApplicationRolePermissionName.Viewing,
            "обработка заказнных услуг",
          ],
        },
      ],
    },
  ],
};

export const ORDERS_SECRETARY_ROLE: ApplicationRole = {
  id: 133,
  name: "ORD_Secretary",
  permittedModules: [
    {
      name: ApplicationModuleName.Orders,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.Orders,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.Order,
          permissions: [
            ApplicationRolePermissionName.Editing,
            "проведение приказов",
          ],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
  ],
};

export const MLT_SECRETARY_ROLE: ApplicationRole = {
  id: 134,
  name: "MLT_Secretary",
  permittedModules: [
    {
      name: ApplicationModuleName.Students,
      permissions: [
        ApplicationRolePermissionName.PartialEditing,
        "военный учет",
      ],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.PartialEditing],
        },
      ],
    },
  ],
};

export const FOREIGN_STUDENTS_VISITOR_ROLE: ApplicationRole = {
  id: 1129,
  name: "FS_Visitor",
  permittedModules: [
    {
      name: ApplicationModuleName.ForeignStudents,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.ForeignStudents,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.ForeignStudent,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
  ],
};

export const POSTGRADUATE_STUDENTS_VISITOR_ROLE: ApplicationRole = {
  id: 1138,
  name: "PS_Visitor",
  permittedModules: [
    {
      name: ApplicationModuleName.PostgraduateStudents,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.PostgraduateStudents,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudent,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentAnnualAttestation,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentFinalAttestation,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentHalfYearAttestation,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentIndividualPlan,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
  ],
};

export const GROUP_MENTOR_ROLE: ApplicationRole = {
  id: 1278,
  name: "Group_Mentor",
  permittedModules: [
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
  ],
};

export const UMO_SECRETARY_ROLE: ApplicationRole = {
  id: 1299,
  name: "UMO_Secretary",
  permittedModules: [
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.PartialViewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.PartialViewing],
        },
      ],
    },
  ],
};

export const RECTORATE_MEMBER_ROLE: ApplicationRole = {
  id: 1359,
  name: "Rectorate_Member",
  permittedModules: [
    {
      name: ApplicationModuleName.EducationPlans,
      isExternal: true,
      permissions: [ApplicationRolePermissionName.FullAccess],
    },
    {
      name: ApplicationModuleName.Statements,
      isExternal: true,
      permissions: [ApplicationRolePermissionName.FullAccess],
    },
    {
      name: ApplicationModuleName.Distribution,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Companies,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Company,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Orders,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Orders,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Order,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.PostgraduateStudents,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.PostgraduateStudents,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudent,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentAnnualAttestation,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentFinalAttestation,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentHalfYearAttestation,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.PostgraduateStudentIndividualPlan,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.ForeignStudents,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.ForeignStudents,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.ForeignStudent,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
  ],
};

export const DORMITORY_MEMBER_ROLE: ApplicationRole = {
  id: 1375,
  name: "Dormitory_Member",
  permittedModules: [
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
  ],
};

export const PASSPORT_OFFICER_ROLE: ApplicationRole = {
  id: 1376,
  name: "Passport_Officer",
  permittedModules: [
    {
      name: ApplicationModuleName.Groups,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Groups,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Group,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
  ],
};

export const ACCOUNTING_MEMBER_ROLE: ApplicationRole = {
  id: 1377,
  name: "Accounting_Member",
  permittedModules: [
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
        {
          name: ApplicationPageName.Student,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
  ],
};

export const STUDENTS_PERSONNEL_DEPARTMENT_MEMBER_ROLE: ApplicationRole = {
  id: 1381,
  name: "StudentsPersonnelDepartment_Member",
  permittedModules: [
    {
      name: ApplicationModuleName.Graduation,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.Graduation,
          permissions: [ApplicationRolePermissionName.Editing],
        },
      ],
    },
    {
      name: ApplicationModuleName.Students,
      permissions: [ApplicationRolePermissionName.Viewing],
      permittedPages: [
        {
          name: ApplicationPageName.Students,
          permissions: [ApplicationRolePermissionName.Viewing],
        },
      ],
    },
  ],
};

export const REPAIR_MEMBER_ROLE: ApplicationRole = {
  id: 1386,
  name: "Repair_Member",
  permittedModules: [
    {
      name: ApplicationModuleName.Auditoriums,
      permissions: [ApplicationRolePermissionName.Editing],
      permittedPages: [
        {
          name: ApplicationPageName.Auditoriums,
          permissions: [ApplicationRolePermissionName.Editing],
        },
        {
          name: ApplicationPageName.Auditorium,
          permissions: [ApplicationRolePermissionName.Editing],
        },
      ],
    },
  ],
};

export const APPLICATION_ROLES: ApplicationRole[] = [
  ADMIN_ROLE,
  EMPLOYEE_ROLE,
  STUDENT_ROLE,
  SECRETARY_ROLE,
  SECRETARY_DEP_MILITARY_ROLE,
  FOREIGN_STUDENTS_SECRETARY_ROLE,
  POSTGRADUATE_STUDENT_ROLE,
  SCIENTIFIC_SUPERVISOR_ROLE,
  POSTGRADUATE_STUDENTS_SECRETARY_ROLE,
  VISITOR_ROLE,
  DO_SECRETARY_ROLE,
  ORDERS_SECRETARY_ROLE,
  MLT_SECRETARY_ROLE,
  FOREIGN_STUDENTS_VISITOR_ROLE,
  POSTGRADUATE_STUDENTS_VISITOR_ROLE,
  GROUP_MENTOR_ROLE,
  UMO_SECRETARY_ROLE,
  RECTORATE_MEMBER_ROLE,
  DORMITORY_MEMBER_ROLE,
  PASSPORT_OFFICER_ROLE,
  ACCOUNTING_MEMBER_ROLE,
  STUDENTS_PERSONNEL_DEPARTMENT_MEMBER_ROLE,
  REPAIR_MEMBER_ROLE
];
