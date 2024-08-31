import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/Forms/UMForm";
import UMInput from "../../../components/Forms/UMInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import UMSelect from "../../../components/Forms/UMSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import UMDatePiker from "../../../components/Forms/UMDatePicker";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartmentApi";
import { ScheduleOutlined } from "@ant-design/icons";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagementApi";

// const studentDummyData = {
//   password: "student123",
//   student: {
//     name: {
//       firstName: "I am ",
//       middleName: "Student",
//       lastName: "Number 1",
//     },
//     gender: "male",
//     dateOfBirth: "1990-01-01",
//     email: "student1@gmail.com",
//     contactNo: "1235678",
//     emergencyContactNo: "987-654-3210",
//     bloogGroup: "A+",
//     presentAddress: "123 Main St, Cityville",
//     permanentAddress: "456 Oak St, Townsville",
//     guardian: {
//       fatherName: "James Doe",
//       fatherOccupation: "Engineer",
//       fatherContactNo: "111-222-3333",
//       motherName: "Mary Doe",
//       motherOccupation: "Teacher",
//       motherContactNo: "444-555-6666",
//     },
//     localGuardian: {
//       name: "Alice Johnson",
//       occupation: "Doctor",
//       contactNo: "777-888-9999",
//       address: "789 Pine St, Villageton",
//     },
//       admissionSemester: "66cc1d2dc7a5c5b601ca9e5b",
// academicDepartment: "66cdc3ba56eca97ec2664587",
//   },
// };

// //! Default value for testing
const studentDefaultValues = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",
  // dateOfBirth: "1990-01-01",
  email: "bappastudent11@gmail.com",
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
  academicDepartment: "66cdc3ba56eca97ec2664587",
  admissionSemester: "66cc1d2dc7a5c5b601ca9e5b",
};

const CreateStudent = () => {
  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);
  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery(undefined, { skip: sIsLoading });
  const [addStudent] = useAddStudentMutation();
  // console.log(departmentData)
  // console.log(semesterData)

  const semesterOptions = semesterData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}`,
    value: semester._id,
  }));
  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name,
    value: department._id,
  }));

  //todo: Post part
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const studentData = {
      password: "student123",
      student: data,
    };

    //todo: Here working with formdata
    const formData = new FormData();
    //     // formData.append('persodanName','bappa saha');
    // formData.append("data", JSON.stringify(data));
    formData.append("data", JSON.stringify(studentData));
    formData.append("file",data.image)
    addStudent(formData)
    console.log(formData)

    //     //! devlopment purpose for checking
    //     console.log(Object.fromEntries(formData));
    //     // console.log(formData.get('personName'))
    //     // console.log([...formData.entries()]);
  };
  return (
    <Row>
      <h2>Create Student </h2>
      <Col span={24}>
        <UMForm onSubmit={handleSubmit} defaultValues={studentDefaultValues}>
          <Divider style={{ color: "green", fontSize: "20px" }}>
            <ScheduleOutlined /> Personal Information
          </Divider>
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
                name="bloogGroup"
                label="Blood Group"
                options={bloodGroupOptions}
                placeholder="Select a blood group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMDatePiker
                name="dateOfBirth"
                label="Date of Birth (yyyy/mm/dd)"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="📷 Upload Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider style={{ color: "green", fontSize: "20px" }}>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          {/* -----------------------  */}
          <Divider style={{ color: "green", fontSize: "20px" }}>
            Guardian Information
          </Divider>
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
              />
            </Col>
          </Row>
          <Divider style={{ color: "green", fontSize: "20px" }}>
            Local Guardian
          </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider style={{ color: "green", fontSize: "20px" }}>
            Academic Info.
          </Divider>
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
          <Button htmlType="submit" type="primary">
            Add a New Student
          </Button>{" "}
        </UMForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
