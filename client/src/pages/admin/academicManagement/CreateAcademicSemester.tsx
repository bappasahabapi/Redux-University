import { FieldValues, SubmitHandler } from "react-hook-form";
import Form from "../../../components/Forms/UMForm";
import { Button } from "antd";
import UMSelect from "../../../components/Forms/UMSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicSemesterSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

// console.log(yearOptions)

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const toastId = toast.loading("Academic Semester Creating...", {
      duration: 1500,
    });
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    // console.log(name)

    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Academic Semester Created Successfully ", {
          id: toastId,
          richColors: true,
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
        richColors: true,
        position: "top-center",
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      resolver={zodResolver(academicSemesterSchema)}
    >
      <h2>Create Academic Semester</h2>
      <hr /> <br />
      <UMSelect label="NAME" name="name" options={semesterOptions} />
      <UMSelect label="YEAR" name="year" options={yearOptions} />
      <UMSelect label="START MONTH" name="startMonth" options={monthOptions} />
      <UMSelect label="END MONTH" name="endMonth" options={monthOptions} />
      <Button htmlType="submit" type="primary">
        Submit
      </Button>
      <div
        style={{ marginTop: "45px", display: "flex", justifyContent: "left" }}
      >
        <Link to="/admin/academic-semester"> ⬅️ Back </Link>
      </div>
    </Form>
  );
};

export default CreateAcademicSemester;
