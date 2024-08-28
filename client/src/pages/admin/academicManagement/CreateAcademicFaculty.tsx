import { Button } from "antd";
import FormInput from "../../../components/Forms/UMInput";
import UMForm from "../../../components/Forms/UMForm";
import { FieldValues} from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicFacultyApi";
import { TResponse } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicFacultySchema";
import { Link, useNavigate } from "react-router-dom";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";


const CreateAcademicFaculty = () => {

  const [addAcademicFaculty]=useAddAcademicFacultyMutation();
  const navigate =useNavigate();

  const handleSubmit =async(data:FieldValues)=>{
    // console.log(data);]
    const toastId = toast.loading("Academic Faculty Creating...", {
      duration: 1500,
    });

    const facultyData ={
      name:data?.name
    }

    try{

      const res =(await addAcademicFaculty(facultyData) ) as TResponse<TAcademicFaculty >;
      console.log(res)
      if(res.error){
        toast.error(res.error.data.message);
      }else{
        toast.success("Academic Faculty Created Successfully",{
          id: toastId,
          richColors: true,
          position: "top-center",
        })
        navigate("/admin/academic-faculty")
      }


    }catch(error){
      toast.error("Something went wrong")
    }

  };

  return (
    <UMForm
    onSubmit={handleSubmit}
    resolver={zodResolver(academicFacultySchema)}
    >
      <h1> Create Academic Faculty </h1> <br />
      <hr /> 
      <br />
      <FormInput type="text" name="name" label="Academic Faculty" />
      <Button htmlType="submit" type="primary" style={{}}>
        Submit
      </Button>
      <div
        style={{ marginTop: "45px", display: "flex", justifyContent: "left" }}
      >
        <Link to="/admin/academic-faculty"> ⬅️ Back to Academic Faculty  </Link>
      </div>
    </UMForm>
  );
};

export default CreateAcademicFaculty;
