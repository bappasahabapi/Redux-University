import { Button, Col, Flex } from "antd";
import UMForm from "../../../components/Forms/UMForm";
import UMInput from "../../../components/Forms/UMInput";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFacultyApi";
import UMSelectWithWatch from "../../../components/Forms/UMSelectWithWatch";

const OfferCourse = () => {

  const { data: academicFacultyData } = useGetAllFacultyQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));



const handleSubmit =(data)=>{
  console.log(data)
};



  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <h3>Create Offer Course</h3>
        <UMForm onSubmit={handleSubmit}>
          <UMSelectWithWatch
          label="Academic Faculty"
          name="academicFaculty"
          options={academicFacultyOptions}
          />
          <UMInput type="test" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;

// "semesterRegistration":"65b6185f13c0a33cdf61589a",
// "academicFaculty":"65b00f3510b74fcbd7a25d86",
// "academicDepartment": "65b00fb010b74fcbd7a25d8e",
// "course": "65b6001fd6ffdd9bfc058329",
// "faculty": "65b0844ccb87974826d0b7af",
