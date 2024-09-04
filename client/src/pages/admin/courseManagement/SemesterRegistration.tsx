import { FieldValues, SubmitHandler } from "react-hook-form";
import Form from "../../../components/Forms/UMForm";
import { Button } from "antd";
import UMSelect from "../../../components/Forms/UMSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import UMDatePicker from "../../../components/Forms/UMDatePicker";
import UMInput from "../../../components/Forms/UMInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const navigate = useNavigate();
  const { data: academicSemesterData } = useGetAllSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const [addRegisteredSemester] = useAddRegisteredSemesterMutation();

  //todo: Make this part generic
  const academicSemesterOptions = academicSemesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  // console.log(academicSemesterOptions)

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    const toastId = toast.loading("Semester Registration Creating...", {
      duration: 1500,
    });

    const semesterRegData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    console.log(semesterRegData);

    try {
      const res = (await addRegisteredSemester(
        semesterRegData
      )) as TResponse<any>;
      // const res = (await addAcademicSemester(semesterData)) as TResponse<TAcademicSemester>;

      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Academic Semester Created Successfully ", {
          id: toastId,
          richColors: true,
          position: "top-center",
        });
        navigate("/admin/registered-semesters")
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
      // resolver={zodResolver(academicSemesterSchema)}
    >
      <h2>Create Semester Registration</h2>
      <hr /> <br />
      <UMSelect
        placeholder="Select Semester with year ex: Fall 2024"
        label="Semester Name With Year"
        name="academicSemester"
        options={academicSemesterOptions}
      />
      <UMSelect label="Status" name="status" options={semesterStatusOptions} />
      <UMDatePicker name="startDate" label="Start Date" />
      <UMDatePicker name="endDate" label="End Date" />
      <UMInput type="text" name="minCredit" label="Min Credit" />
      <UMInput type="text" name="maxCredit" label="Max Credit" />
      <Button htmlType="submit" type="primary">
        Submit
      </Button>
      <div
        style={{ marginTop: "45px", display: "flex", justifyContent: "left" }}
      >
        <Link to="/admin/registered-semesters"> ⬅️ Back </Link>
      </div>
    </Form>
  );
};

export default SemesterRegistration;
//   {
//     "academicSemester": "65b0104110b74fcbd7a25d92",
//     "status": "UPCOMING",
//     "startDate": "2025-01-10T04:00:01Z",
//     "endDate": "2025-04-24T17:59:59Z",
//     "minCredit": 6,
//     "maxCredit": 16
// }
