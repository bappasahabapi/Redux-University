import { Button, Col, Row } from "antd";
import {
  useEnrolCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { toast } from "sonner";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const [enrolCourse] = useEnrolCourseMutation();
  // console.log(data?.data[0])

  const singleOject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    // console.log(item);
    const key = item.course.title;
    const prefix = item.course.prefix;
    const code = item.course.code;
    acc[key] = acc[key] || {
      courseTitle: key,
      sections: [],
      prefix: prefix,
      code: code,
    };

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    //todo: another way to data modification
    /*   if (!acc[key]) {
      acc[key] = {
        courseTitle: key,
        sections: []
      };
    }
  
    acc[key].sections.push({
      section: item.section,
      _id: item._id
    }); */

    return acc;
  }, {});

  // console.log(Object.values(singleOject ? singleOject : {}))
  const modifiedData = Object.values(singleOject ? singleOject : {});

  const handleEnrollCourse =async(id:string)=>{

    const enrollData ={
      offeredCourse:id
    }

    toast.success("Successfully enroll course")

    const res=await enrolCourse(enrollData);
    console.log(res)
  };

  if (!modifiedData.length) {
    return <h3 style={{textAlign:"center"}}>No Available courses</h3>;
  }






  return (
    <Row style={{ backgroundColor: 'snow' }} gutter={[0, 20]}>
      {modifiedData.map((item, index) => (
        <Col key={index} span={24} style={{ border: 'solid #d4d4d4 2px' }}>
          <div style={{ padding: '10px' }}>
            <h2>
              {item.courseTitle} - <span style={{ color: "Green" }}>{item.prefix}-{item.code}</span>
            </h2>
          </div>
          <div>
            {item.sections.map((section: any) => (
              <Row
                key={section._id}
                justify="space-between"
                align="middle"
                style={{ borderTop: 'solid #d4d4d4 2px', padding: '10px' }}
              >
                <Col span={5}><b>Section:</b> {section.section} </Col>
                <Col span={5}>
                  <b>Days:</b>{' '}
                  {section.days.map((day: string, i: number) => (
                    <span key={i}> {day} </span>
                  ))}
                </Col>
                <Col span={5}>Start Time: {section.startTime} </Col>
                <Col span={5}>End Time: {section.endTime} </Col>
                <Button onClick={() => handleEnrollCourse(section._id)}>
                  <b>Enroll</b>
                </Button>
              </Row>
            ))}
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default OfferedCourse;

// Response

//   {
//     "success": true,
//     "message": "OfferedCourses retrieved successfully !",
//     "meta": {
//         "page": 1,
//         "limit": 10,
//         "total": 1,
//         "totalPage": 1
//     },
//     "data": [
//         {
//             "_id": "66dcc1562e73a4f362cd2cda",
//             "semesterRegistration": "66dcbb7a2e73a4f362cd2b49",
//             "academicSemester": "66d82743bfb0c7170fb477cc",
//             "academicFaculty": "66d6cd2a3a38c45fcb586030",
//             "academicDepartment": "66dcbe632e73a4f362cd2ba8",
//             "course": {
//                 "_id": "66dcc0f52e73a4f362cd2cb2",
//                 "title": "Computer Fundamental",
//                 "prefix": "cse",
//                 "code": 101,
//                 "credits": 1,
//                 "preRequisiteCourses": [],
//                 "isDeleted": false,
//                 "__v": 0
//             },
//             "faculty": "66d8d6623f6e9e61bbf94393",
//             "maxCapacity": 30,
//             "section": 1,
//             "days": [
//                 "Sun",
//                 "Tue",
//                 "Thu"
//             ],
//             "startTime": "10:00",
//             "endTime": "12:00",
//             "createdAt": "2024-09-07T21:10:46.364Z",
//             "updatedAt": "2024-09-07T21:10:46.364Z",
//             "__v": 0,
//             "enrolledCourses": [],
//             "completedCourses": [],
//             "completedCourseIds": [],
//             "isPreRequisitesFulFilled": true,
//             "isAlreadyEnrolled": false
//         }
//     ]
// }
