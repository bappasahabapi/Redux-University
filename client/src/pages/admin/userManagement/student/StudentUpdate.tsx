

import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Controller, SubmitHandler, FieldValues } from "react-hook-form";
import { Row, Col, Divider, Form, Input, Button, Steps } from "antd";
import {
  useStudentQuery,
  useUpdateStudentMutation,
} from "../../../../redux/features/admin/userManagementApi";
import {
  useGetAllSemesterQuery,
} from "../../../../redux/features/admin/academicManagementApi";
import {
  useGetAllDepartmentQuery,
} from "../../../../redux/features/admin/academicDepartmentApi";
import UMForm from "../../../../components/Forms/UMForm";
import UMInput from "../../../../components/Forms/UMInput";
import UMSelect from "../../../../components/Forms/UMSelect";
import UMDatePiker from "../../../../components/Forms/UMDatePicker";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../../constants/global";
import {
  ScheduleOutlined,
  ContactsOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";

const { Step } = Steps;

const StudentUpdate = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const { data: studentData, isLoading: studentLoading } = useStudentQuery({ studentId });
  const [updateStudent] = useUpdateStudentMutation();

  const { data: semesterData, isLoading: sIsLoading } = useGetAllSemesterQuery(undefined);
  const { data: departmentData, isLoading: dIsLoading } = useGetAllDepartmentQuery(undefined, { skip: sIsLoading });

  const semesterOptions = semesterData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}`,
    value: semester._id,
  }));
  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name,
    value: department._id,
  }));

  // const methods = useForm({
  //   defaultValues: studentData?.data || {},
  // });

  // const { handeSubmit, reset, control } = methods;
  // const { handeSubmit, reset, control } = methods;
  
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.success("Updating student data...", { duration: 1500 });

    const updatedStudentData = {
      student: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedStudentData));
    if (data.image) {
      formData.append("file", data.image);
    }

    try {
      await updateStudent({ studentId, body: formData }).unwrap();
      toast.success("Student updated successfully", {
        id: toastId,
        richColors: true,
        position: "top-center",
      });
      // reset(data);
      setTimeout(() => {
        navigate("/admin/students-data");
      }, 2000);
    } catch (error) {
      toast.error("Failed to update student");
    }
  };

  const next = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  if (studentLoading || sIsLoading || dIsLoading) return <div>Loading...</div>;

  const steps = [
    {
      title: "Personal Information",
      icon: <ScheduleOutlined />,
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
            <UMDatePiker
              name="dateOfBirth"
              label="Date of Birth (yyyy/mm/dd)"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Controller
              name="image"
              // control={control}
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
      ),
    },
    {
      title: "Contact Information",
      icon: <ContactsOutlined />,
      content: (
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
      ),
    },
    {
      title: "Guardian Information",
      icon: <UserOutlined />,
      content: (
        <>
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
        </>
      ),
    },
    {
      title: "Academic Information",
      icon: <IdcardOutlined />,
      content: (
        <>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="academic.id" label="Student ID" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect
                name="academic.semester"
                label="Semester"
                options={semesterOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect
                name="academic.department"
                label="Department"
                options={departmentOptions}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="number"
                name="academic.registrationNo"
                label="Registration No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="number"
                name="academic.rollNo"
                label="Roll No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="academic.admissionDate"
                label="Admission Date"
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <Row>
      <h1 style={{ marginRight: "100px" }}>
        <Link to="/admin/students-data">⬅️ Back to Student List</Link>
      </h1>
      <Col span={24}>
        <UMForm onSubmit={handleSubmit} defaultValues={studentData?.data}>
          <Steps current={currentStep}>
            {steps.map((step, index) => (
              <Step key={index} title={step.title} icon={step.icon} />
            ))}
          </Steps>
          <div className="steps-content">{steps[currentStep].content}</div>
          <div className="steps-action">
            {currentStep > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={prev}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ marginBottom: "30px", marginTop:"30px"  }}
              >
                Update Student
              </Button>
            )}
          </div>
        </UMForm>
      </Col>
    </Row>
  );
};

export default StudentUpdate;



