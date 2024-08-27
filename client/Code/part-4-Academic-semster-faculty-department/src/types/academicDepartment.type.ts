import { TAcademicFaculty } from "./academicFaculty.type";

  
  export type TAcademicDepartment = {
    _id: string;
    name: string;
    academicFaculty: TAcademicFaculty;
    createdAt: string;
    updatedAt: string;
    _v:number;
  };
  


// {
//     "_id": "66aa7ad023ab207958bcca70",
//     "name": "Department of L3",
//     "academicFaculty": {
//         "_id": "66aa7a7a8d156c805f7a8921",
//         "name": "Faculty of Testing",
//         "createdAt": "2024-07-31T17:55:06.320Z",
//         "updatedAt": "2024-07-31T17:55:06.320Z",
//         "__v": 0
//     },
//     "createdAt": "2024-07-31T17:56:32.883Z",
//     "updatedAt": "2024-07-31T17:56:32.883Z"
// },