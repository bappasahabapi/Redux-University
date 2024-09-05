import { FieldValues, SubmitHandler } from "react-hook-form";
import Form from "../../../components/Forms/UMForm";
import { Button, Col, Flex } from "antd";
import UMSelect from "../../../components/Forms/UMSelect";
import { Link, useNavigate } from "react-router-dom";

import UMInput from "../../../components/Forms/UMInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation(undefined);

  const preRequisiteCoursesOptions = courseData?.data?.map((item:any) => ({
    value: item._id,
    label: item.title,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Course Creating...", {
      duration: 1000,
    });

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    // console.log(courseData);

    try {
      const res = (await addCourse(courseData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Academic Semester Created Successfully ", {
          id: toastId,
          richColors: true,
          position: "top-center",
        });
        navigate("/admin/courses");
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
    <Flex justify="center" align="center">
      <Col span={6} style={{}}>
        <Form onSubmit={handleSubmit}>
          <h2>Create New Course</h2>
          <hr /> <br />
          <UMInput placeholder="Next js 14" type="text" name="title" label="Course Title" />
          <UMInput placeholder="web" type="text" name="prefix" label="Prefix" />
          <UMInput placeholder="5555" type="text" name="code" label="Code" />
          <UMInput placeholder="5" type="text" name="credits" label="Credits" />
          <UMSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            // options={[
            //   { value: "test1", label: "one" },
            //   { value: "test2", label: "two" },
            // ]}
            name="preRequisiteCourses"
            label="Pre-Requisite Courses"
          />
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <div
            style={{
              marginTop: "45px",
              display: "flex",
              justifyContent: "left",
            }}
          >
            <Link to="/admin/registered-semesters"> ⬅️ Back </Link>
          </div>
        </Form>
      </Col>
    </Flex>
  );
};

export default CreateCourse;

// {
//   "title": "Dom Manipulation",
//   "prefix": "JS",
//   "code": 108,
//   "credits": 3,
//   "isDeleted": false,
//   "preRequisiteCourses": [
//       {
//           "course": "65b5ff53d6ffdd9bfc058320",
//           "isDeleted": false
//       },
//        {
//           "course": "65b5ffc2d6ffdd9bfc058326",
//           "isDeleted": false
//       }
//   ]
// }
