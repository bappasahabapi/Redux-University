
import { Button, Col, Row, Steps } from "antd";
import UMForm from "../../../components/Forms/UMForm";
import UMInput from "../../../components/Forms/UMInput";
import UMSelect from "../../../components/Forms/UMSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import UMDatePicker from "../../../components/Forms/UMDatePicker";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartmentApi";
import { useState } from "react";


const studentDefaultValues = {
    name: {
      firstName: "I am ",
      middleName: "Student",
      lastName: "Number 1",
    },
    gender: "male",
    // dateOfBirth: "1990-01-01",
    email: "student1@gmail.com",
    contactNo: "1235678",
    emergencyContactNo: "987-654-3210",
    bloogGroup: "A+",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",
    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666",
    },
    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton",
    },
    // admissionSemester: "65b0104110b74fcbd7a25d92",
    // academicDepartment: "65b00fb010b74fcbd7a25d8e",
  };

const { Step } = Steps;

const CreateStudent = () => {
  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);
  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery(undefined);

  const [currentStep, setCurrentStep] = useState(0);

  const semesterOptions = semesterData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}`,
    value: semester._id,
  }));

  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name,
    value: department._id,
  }));

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <Row gutter={8}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMInput name="name.firstName" type="text" label="First Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMInput name="name.middleName" type="text" label="Middle Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMInput name="name.lastName" type="text" label="Last Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMSelect name="gender" label="Gender" options={genderOptions} />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMSelect
              name="bloodGroup"
              label="Blood Group"
              options={bloodGroupOptions}
              placeholder="Select a blood group"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMDatePicker
              name="dateOfBirth"
              label="Date of Birth (yyyy/mm/dd)"
            />
          </Col>
        </Row>
      ),
    },
    {
      title: "Guardian Information",
      content: (
        <Row gutter={8}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            
            <UMInput
              type="text"
              name="guardian.fatherName"
              label="Father Name"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMInput
              type="text"
              name="guardian.fatherOccupation"
              label="Father Occupation"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMInput
              type="text"
              name="guardian.fatherContactNo"
              label="Father ContactNo"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMInput
              type="text"
              name="guardian.motherOccupation"
              label="Mother Occupation"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMInput
              type="text"
              name="guardian.motherContactNo"
              label="Mother ContactNo"
            />{" "}
          </Col>
        </Row>
      ),
    },
    {
      title: "Local Guardian",
      content: (
        <Row gutter={8}>
          {/* Local Guardian Information Fields */}
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMInput type="text" name="localGuardian.name" label="Name" />
          </Col>

          {/* Add more fields here... */}
        </Row>
      ),
    },
    {
      title: "Academic Info",
      content: (
        <Row gutter={8}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMSelect
              options={semesterOptions}
              disabled={sIsLoading}
              name="admissionSemester"
              label="Admission Semester"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <UMSelect
              options={departmentOptions}
              disabled={dIsLoading}
              name="academicDepartment"
              label="Admission Department"
            />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <UMForm onSubmit={handleSubmit} defaultValues={studentDefaultValues}>
        <div>{steps[currentStep].content}</div>
        <div style={{ marginTop: "20px" }}>
          {currentStep > 0 && (
            <Button onClick={handlePrev} style={{ marginRight: "8px" }}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </UMForm>
    </div>
  );
};

export default CreateStudent;