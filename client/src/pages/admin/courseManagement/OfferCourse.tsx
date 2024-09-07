import { Breadcrumb, Button, Col, Divider, Modal, Row } from "antd";
import UMForm from "../../../components/Forms/UMForm";
import UMInput from "../../../components/Forms/UMInput";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFacultyApi";
import UMSelectWithWatch from "../../../components/Forms/UMSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { HomeOutlined, ScheduleOutlined } from "@ant-design/icons";
import UMSelect from "../../../components/Forms/UMSelect";
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartmentApi";
import { weekDaysOptions } from "../../../constants/global";
import UMTimePicker from "../../../components/Forms/UMTimePicker";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: academicFacultyData } = useGetAllFacultyQuery(undefined);
  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);
  const { data: academicDepartmentData } = useGetAllDepartmentQuery(undefined);
  const { data: coursesData } = useGetAllCoursesQuery(undefined);
  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  //* Make the select options
  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const courseOptions = coursesData?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };


  const showModal = () => {
    setIsModalVisible(true);
  };
  
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Breadcrumb
        items={[
          {
            href: "/admin/students-data",
            title: (
              <HomeOutlined
                style={{
                  color: "green",
                  fontWeight: "bolder",
                  fontSize: "30px",
                }}
              />
            ),
          },
        ]}
      />
      <h1 style={{ textAlign: "center" }}>Create Offer Course</h1> <br />
      <br />
      <Row>
        <Col  span={24}>
          <UMForm onSubmit={handleSubmit}>
            <Divider style={{ color: "green", fontSize: "20px" }}>
              <ScheduleOutlined /> Academic Information
            </Divider>
            <Row gutter={8} >
              <Col  span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <UMSelect
                  label="Semester Registrations"
                  name="semesterRegistration"
                  options={semesterRegistrationOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <UMSelect
                  name="academicFaculty"
                  label="Academic Faculty"
                  options={academicFacultyOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <UMSelect
                  name="academicDepartment"
                  label="Academic Department"
                  options={academicDepartmentOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <UMSelectWithWatch
                  onValueChange={setCourseId}
                  options={courseOptions}
                  name="course"
                  label="Course"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <UMSelect
                  placeholder="depends on Course id"
                  disabled={!courseId || fetchingFaculties}
                  name="faculty"
                  label="Faculty"
                  options={facultiesOptions}
                />
              </Col>
            </Row>
            <Row gutter={8}>
              <Divider style={{ color: "green", fontSize: "20px" }}>
                <ScheduleOutlined /> Non Academic Information
              </Divider>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <UMInput type="text" name="section" label="Section" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <UMInput type="text" name="maxCapacity" label="Max Capacity" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <UMSelect
                  mode="multiple"
                  options={weekDaysOptions}
                  name="days"
                  label="Days"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMTimePicker name="startTime" label="Start Time" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMTimePicker name="endTime" label="End Time" />
              </Col>
            </Row>
            <Row gutter={8} justify="start">
            <Col>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
            <Col>
              <Button type="default" onClick={showModal}>
                Show Example
              </Button>
            </Col>
          </Row>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </UMForm>
        </Col>
      </Row>
      <Modal
      style={{fontFamily:"revert"}}
      title="Sample Response"
      visible={isModalVisible}
      footer={null}
      onCancel={handleCancel}
    >
      <pre>
        {JSON.stringify(
          {
            semesterRegistration: "Fall2025",
            academicFaculty: "Faculty of Arts",
            academicDepartment: "Drama",
            course: "Dom",
            faculty: "BappaBapi",
            section: 1,
            maxCapacity: 30,
            days: ["Mon", "Wed"],
            startTime: "12:30",
            endTime: "14:00",
          },
          null,
          2
        )}
      </pre>
    </Modal>
    </>
  );
};

export default OfferCourse;

// "semesterRegistration":"65b6185f13c0a33cdf61589a",
// "academicFaculty":"65b00f3510b74fcbd7a25d86",
// "academicDepartment": "65b00fb010b74fcbd7a25d8e",
// "course": "65b6001fd6ffdd9bfc058329",
// "faculty": "65b0844ccb87974826d0b7af",


