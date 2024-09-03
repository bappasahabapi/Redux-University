import { useParams } from "react-router-dom";
import { useStudentQuery } from "../../../../redux/features/admin/userManagementApi";
import { Breadcrumb, Descriptions, Spin, Timeline } from "antd";
import {
  CarryOutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data: studentData } = useStudentQuery({ studentId });

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (studentData) {
      const { data } = studentData;
      // Determine the current step based on the completeness of the sections
      if (data.academicFaculty && data.academicDepartment) {
        setCurrentStep(4); // All sections completed
      } else if (data.localGuardian && data.localGuardian.name) {
        setCurrentStep(3); // Local Guardian section completed
      } else if (data.guardian && data.guardian.fatherName) {
        setCurrentStep(2); // Guardian section completed
      } else if (data.fullName && data.gender) {
        setCurrentStep(1); // Personal Information section completed
      } else {
        setCurrentStep(0); // No sections completed
      }
    }
  }, [studentData]);

  if (!studentData) return <h1>Loading <Spin size="small" /> <Spin /> <Spin size="large"/></h1>;

  const { data } = studentData;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Student Details of{" "}
        <span style={{ color: "green" }}> {data.fullName}</span>
        <hr />
      </h1>
      <br />
      <Breadcrumb
        items={[
          {
            href: "/admin/students-data",
            title:  <HomeOutlined />
          },
    
        ]}
      />

      <Timeline mode="alternate">
        {/* Personal Information */}
        <Timeline.Item
          dot={
            <CarryOutOutlined style={{ fontSize: "30px", color: "green" }} />
          }
        >
          <span
            style={{ fontWeight: "bold", fontSize: "25px", color: "#1890ff" }}
          >
            Personal Information
          </span>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Full Name">
              {" "}
              <span style={{ fontWeight: "bolder" }}>{data.fullName}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Gender">{data.gender}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {new Date(data.dateOfBirth).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
            <Descriptions.Item label="Contact No">
              {data.contactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Emergency Contact">
              {data.emergencyContactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Blood Group">
              {data.bloogGroup}
            </Descriptions.Item>
            <Descriptions.Item label="Present Address">
              {data.presentAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Permanent Address">
              {data.permanentAddress}
            </Descriptions.Item>
          </Descriptions>
        </Timeline.Item>

        {/* Guardian Information */}
        <Timeline.Item color={currentStep >= 2 ? "green" : "red"}>
          <span
            style={{ fontWeight: "bold", fontSize: "25px", color: "#1890ff" }}
          >
            Guardian Information
          </span>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Father's Name">
              {data.guardian.fatherName}
            </Descriptions.Item>
            <Descriptions.Item label="Father's Occupation">
              {data.guardian.fatherOccupation}
            </Descriptions.Item>
            <Descriptions.Item label="Father's Contact No">
              {data.guardian.fatherContactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Name">
              {data.guardian.motherName}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Occupation">
              {data.guardian.motherOccupation}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Contact No">
              {data.guardian.motherContactNo}
            </Descriptions.Item>
          </Descriptions>
        </Timeline.Item>

        {/* Local Guardian Information */}
        <Timeline.Item color={currentStep === 5 ? "green" : "green"}>
          <span
            style={{ fontWeight: "bold", fontSize: "25px", color: "#1890ff" }}
          >
            Local Guardian Information
          </span>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {data.localGuardian.name}
            </Descriptions.Item>
            <Descriptions.Item label="Occupation">
              {data.localGuardian.occupation}
            </Descriptions.Item>
            <Descriptions.Item label="Contact No">
              {data.localGuardian.contactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {data.localGuardian.address}
            </Descriptions.Item>
          </Descriptions>
        </Timeline.Item>

        {/* Academic Information */}
        <Timeline.Item color={currentStep === 4 ? "green" : "red"}>
          <span
            style={{ fontWeight: "bold", fontSize: "25px", color: "#1890ff" }}
          >
            Academic Information
          </span>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Admission Semester">{`${data.admissionSemester.name} ${data.admissionSemester.year}`}</Descriptions.Item>
            <Descriptions.Item label="Academic Department">
              {data.academicDepartment.name}
            </Descriptions.Item>
            <Descriptions.Item label="Academic Faculty">
              {data.academicFaculty.name}
            </Descriptions.Item>
            <Descriptions.Item label="Profile Image">
              {data.profileImg || "No image available"}
            </Descriptions.Item>
          </Descriptions>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default StudentDetails;
