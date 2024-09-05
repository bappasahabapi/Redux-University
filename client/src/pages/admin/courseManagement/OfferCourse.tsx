import { Breadcrumb, Button, Col, Flex } from "antd";
import UMForm from "../../../components/Forms/UMForm";
import UMInput from "../../../components/Forms/UMInput";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFacultyApi";
import UMSelectWithWatch from "../../../components/Forms/UMSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { HomeOutlined } from "@ant-design/icons";

const OfferCourse = () => {

  const [courseId, setCourseId]=useState();
  const { data: academicFacultyData } = useGetAllFacultyQuery(undefined);
  console.log(courseId)

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));



const handleSubmit:SubmitHandler<FieldValues> =(data)=>{
  console.log(data)
};



  return (
    <>
      <Breadcrumb
        items={[
          {
            href: "/admin/students-data",
            title:  <HomeOutlined  style={{color:"green", fontWeight:"bolder", fontSize:"30px"}}/>
          },
    
        ]}
      />
    <Flex justify="center" align="center">
      <Col span={6}>
        <h3>Create Offer Course</h3>
        <UMForm onSubmit={handleSubmit}>
          <UMSelectWithWatch
          onValueChange={setCourseId}
          label="Academic Faculty"
          name="academicFaculty"
          options={academicFacultyOptions}
          />
          <UMInput tooltip="initially disable if no id is selected" disabled={!courseId} type="test" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
          </>
  );
};

export default OfferCourse;

// "semesterRegistration":"65b6185f13c0a33cdf61589a",
// "academicFaculty":"65b00f3510b74fcbd7a25d86",
// "academicDepartment": "65b00fb010b74fcbd7a25d8e",
// "course": "65b6001fd6ffdd9bfc058329",
// "faculty": "65b0844ccb87974826d0b7af",
