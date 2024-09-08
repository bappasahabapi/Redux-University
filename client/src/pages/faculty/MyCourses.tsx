import { Button, Col, Flex } from "antd";

import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../components/Forms/UMForm";
import UMSelect from "../../components/Forms/UMSelect";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import { toast } from "sonner";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined); 
  const navigate = useNavigate();

  const semesterRegistrationOptions = facultyCoursesData?.data?.map((item:any) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item:any) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
    toast.success("Navigated to my courses", {
      richColors: true,
      position: "top-center",
      duration:1000
    });
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelect
            options={semesterRegistrationOptions}
            name="semesterRegistration"
            label="Registered Semester"
          />
          <UMSelect options={courseOptions} name="course" label="Course" />
          <Button style={{width:"100%"}} htmlType="submit" type="primary">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
