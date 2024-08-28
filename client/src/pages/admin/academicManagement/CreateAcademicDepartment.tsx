import { Button } from "antd";
import FormInput from "../../../components/Forms/UMInput";
import UMForm from "../../../components/Forms/UMForm";
import UMSelect from "../../../components/Forms/UMSelect";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFacultyApi";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { useAddAcademicDepartmentMutation } from "../../../redux/features/admin/academicDepartmentApi";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicDepartment.type";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const navigate =useNavigate();
  const { data: fData } = useGetAllFacultyQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  // console.log(fData)



  const facultyOptions =
    fData?.data?.map((item) => ({
      value: item._id,
      label: `${item.name}`,
    })) || []; // fallback to an empty array if undefined;

  const handleSubmit = async (data: FieldValues) => {
    // console.log(data)
    const toastId = toast.loading("Academic Department Creating...", {
      duration: 1500,
    });


    const departmentData = {
      name: data?.name,
      academicFaculty: data?.academicFaculty,
    };
    // console.log(departmentData)

    try {
      const res = (await addAcademicDepartment(departmentData))as TResponse<TAcademicDepartment>;
      // console.log(res);

      if(res.error){
        toast.error(res.error.data.message);
      }else{
        toast.success("Academic Faculty Created Successfully",{
          id: toastId,
          richColors: true,
          position: "top-center",
        })
        navigate("/admin/academic-department")
      }






    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1> Create Academic Department</h1>
      <hr />

      <UMForm onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          label="Department Name"
          placeholder="Enter a Department Name ex: CSE"
        />
        <UMSelect
          placeholder="Select a Faculty Name"
          label="Academic Faculty Name"
          name="academicFaculty"
          options={facultyOptions}
          defaultValue={
            facultyOptions.find((option) => option.label === "bappa")?.value
          }
        />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
        <div
          style={{ marginTop: "45px", display: "flex", justifyContent: "left" }}
        >
          <Link to="/admin/academic-department"> ⬅️ Back </Link>
        </div>
      </UMForm>
    </div>
  );
};

export default CreateAcademicDepartment;
