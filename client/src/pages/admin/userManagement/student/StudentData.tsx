import {
  Button,
  message,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TQueryParam } from "../../../../constants/global";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "../../../../redux/features/admin/userManagementApi";
import { DeleteOutlined, EditFilled, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import UMModal from "../../../../components/UMModal";
// import { TStudent } from "../../../types";

// export type TTableData = Pick<TStudent, "fullName" | "id"|"email"|"academicDepartment"|"academicFaculty">;

type TTableData = {
  fullName: string;
  id: string;
  email: string;
  academicDepartment: string; // Expecting only the name (string)
  academicFaculty: string; // Expecting only the name (string)
};

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [deleteStudent] = useDeleteStudentMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studenttIdToDelete, setStudentIdToDelete] = useState<string | null>(
    null
  );

  const deleteHandler = (id: string) => {
    setStudentIdToDelete(id);
    setIsModalVisible(true);
  };

  const onOkDeleteHandler = async () => {
    if (studenttIdToDelete) {
      message.open({
        type: "warning",
        content: "Deleting Student...",
      });
      try {
        await deleteStudent(studenttIdToDelete);
        message.success("Student Successfully Deleted :(");
      } catch (err: any) {
        console.error(err.message);
        message.error(err.message);
      } finally {
        setIsModalVisible(false);
        setStudentIdToDelete(null);
      }
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email.",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Academic Department.",
      key: "academicDepartment",
      dataIndex: "academicDepartment",
    },
    {
      title: "Academic Facility",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        // console.log(item.key)
        // const deleteHandler = (id: string) => {
        //   console.log(id);
        //   deleteStudent(id)
        // };
        return (
          <Space style={{ fontSize: "25px" }}>
            <Link to={`/admin/students-data/${item?.key}`}>
              <Tooltip title="🧑‍🏫 View Student details" color="green">
                <EyeOutlined />
              </Tooltip>
            </Link>
            <Link to={`/admin/students-update/${item?.key}`}>
              <Tooltip title="🧑‍🏫 Update Student details" color="purple">
                <EditFilled style={{ color: "orange" }} />
              </Tooltip>
            </Link>
            <Tooltip title="🧑‍🏫 Delete Student details" color="red">
              <Button onClick={() => deleteHandler(item?.key)}>
                <DeleteOutlined
                  style={{
                    color: "red",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                />
              </Button>
            </Tooltip>

            <Button>Blocked</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
    // { name: "page", value: 2 },
    { name: "sort", value: "id" },
    ...params,
  ]);




  const metaData = studentData?.meta;

  //   console.log(studentData);

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, academicDepartment, academicFaculty }) => ({
      key: _id,
      fullName,
      id,
      email,
      academicDepartment: academicDepartment?.name,
      academicFaculty: academicFaculty?.name,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/create-student");
  };



  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Student List</h1> <br />
      <Button type="primary" onClick={handleClick}>
        Create Student
      </Button>{" "}
      <br /> <br />
      <hr />
      <Table
        columns={columns}
        onChange={onChange}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        loading={isFetching}
        pagination={false}
      />
      <UMModal
        visible={isModalVisible}
        onOk={onOkDeleteHandler}
        onCancel={() => setIsModalVisible(false)}
        title={"Delete Student"}
      >
        <h1 style={{ backgroundColor: "lightgrey" }}>
          Are You Sure for delete Student ❓{" "}
        </h1>
      </UMModal>
      <Pagination
        total={metaData?.total}
        pageSize={metaData?.limit}
        onChange={(clickedPage) => setPage(clickedPage)}
        current={page}
      />
    </div>
  );
};

export default StudentData;
