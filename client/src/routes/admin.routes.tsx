import AcademicDepartment from '../pages/admin/academicManagement/AcademicDepartment';
import AcademicFaculty from '../pages/admin/academicManagement/AcademicFaculty';
import AcademicSemester from '../pages/admin/academicManagement/AcademicSemester';
import CreateAcademicDepartment from '../pages/admin/academicManagement/CreateAcademicDepartment';
import CreateAcademicFaculty from '../pages/admin/academicManagement/CreateAcademicFaculty';
import CreateAcademicSemester from '../pages/admin/academicManagement/CreateAcademicSemester';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateAdmin from '../pages/admin/userManagement/CreateAdmin';
import CreateFaculty from '../pages/admin/userManagement/CreateFaculty';
import CreateStudent from '../pages/admin/userManagement/student/CreateStudent';
import StudentDetails from '../pages/admin/userManagement/student/StudentDetails';
import StudentData from '../pages/admin/userManagement/student/StudentData';
import StudentUpdate from '../pages/admin/userManagement/student/StudentUpdate';
import SemesterRegistration from '../pages/admin/courseManagement/SemesterRegistration';
import RegisteredSemesters from '../pages/admin/courseManagement/RegisteredSemesters';
import CreateCourse from '../pages/admin/courseManagement/CreateCourse';
import Courses from '../pages/admin/courseManagement/Courses';
import OfferCourse from '../pages/admin/courseManagement/OfferCourse';
import OfferedCourse from '../pages/student/OfferedCourse';

 export const adminPaths = [
  {
    name: '🎛️ Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
    
  },
  {
    name:'📚 Academic Management ', 
    children:[
      {
        name: '📗 Create A.S',
        path: 'create-academic-semester',
        element: <CreateAcademicSemester />,
      },
      {
        name: 'Academic Semester',
        path: 'academic-semester',
        element: <AcademicSemester />,
      },
      {
        name: '🧑‍🎓 Create A. Faculty',
        path: 'create-academic-faculty',
        element: <CreateAcademicFaculty />,
      },
      {
        name: 'Academic Faculty',
        path: 'academic-faculty',
        element: <AcademicFaculty />,
      },
      {
        name: '🏬 Create A.Department',
        path: 'create-academic-department',
        element: <CreateAcademicDepartment />,
      },
      {
        name: 'Academic Department',
        path: 'academic-department',
        element: <AcademicDepartment />,
      },
    ]
  },

  {
    name: '👥 User Management',
    children: [
      {
        name: '🧑‍🏫 Create Student',
        path: 'create-student',
        element: <CreateStudent />,
      },
      {
        // name: 'Student',
        path: 'students-data',
        element: <StudentData />,
      },
      {
        // name: 'Student',
        path: 'students-data/:studentId',
        element: <StudentDetails />,
      },
      {
        // name: 'Update-Student',
        path: 'students-update/:studentId',
        element: <StudentUpdate />,
      },
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <CreateAdmin />,
      },
      {
        name: 'Create Faculty',
        path: 'create-faculty',
        element: <CreateFaculty />,
      },
      {
        name: 'Create Member',
        path: 'create-member',
        element: <CreateStudent />,
      },
    ],
  },
  {
    name: '👪 Course Management',
    children: [
      {
        name: '📓 1-Semester Registration',
        path: 'semester-registration',
        element: <SemesterRegistration />,
      },
      {
        name: 'Registered Semesters List',
        path: 'registered-semesters',
        element: <RegisteredSemesters />,
      },

      {
        name: '🟢 2-Create Course 📘',
        path: 'create-course',
        element: <CreateCourse />,
      },
      {
        name: 'Courses List',
        path: 'courses',
        element: <Courses />,
      },
      {
        name: '🎁 3-Offer Course',
        path: 'offer-course',
        element: <OfferCourse />,
      },
      {
        name: 'Offered Courses List',
        path: 'offered-courses',
        element: <OfferedCourse />,
      },
    ],
  },
];

// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

//* Programatical way

/* export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }

  return acc;
}, []); */

//! Hard coded way

// export const adminPaths = [
//   {
//     path: 'dashboard',
//     element: <AdminDashboard />,
//   },
//   {
//     path: 'create-student',
//     element: <CreateStudent />,
//   },
//   {
//     path: 'create-admin',
//     element: <CreateAdmin />,
//   },
//   {
//     path: 'create-faculty',
//     element: <CreateFaculty />,
//   },
// ];
