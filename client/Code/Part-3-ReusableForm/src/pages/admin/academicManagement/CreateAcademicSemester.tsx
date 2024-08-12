import { FieldValues, SubmitHandler } from "react-hook-form";
import Form from "../../../components/Forms/UMForm";
import { Button } from "antd";
import UMSelect from "../../../components/Forms/UMSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";



const currentYear =new Date().getFullYear();
const yearOptions =[0,1,2,3,4,5 ,6,7,8,9,10].map((number)=>({
  value:String(currentYear+number),
  label:String(currentYear+number),
}))

// console.log(yearOptions)


const CreateAcademicSemester = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const name =semesterOptions[Number(data?.name)-1]?.label
    console.log(name)

    const semesterData ={
      name:name,
      code:data.name,
      year:data.year
    };
    console.log(semesterData)
  };


  return (
    <Form onSubmit={handleSubmit}>
      <UMSelect label="NAME" name="name" options={semesterOptions}/>
      <UMSelect label="YEAR" name="year" options={yearOptions}/>
      <UMSelect label="START MONTH" name="startMonth" options={monthOptions}/>
      <UMSelect label="END MONTH" name="endMonth" options={monthOptions}/>
      <Button htmlType="submit" type="primary">Submit</Button>
    </Form>
  );
};

export default CreateAcademicSemester;
