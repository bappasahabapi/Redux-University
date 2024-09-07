import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const {data}=useGetAllOfferedCoursesQuery(undefined);
  // console.log(data?.data[0])
    return (
      <div>
        <h1> This is OfferedCourse:  {data?.data[0].course?.title} </h1>

      </div>
    );
  };
  
  export default OfferedCourse;