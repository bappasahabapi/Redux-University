import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TQueryParam } from "../../../constants/global";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { DeleteOutlined, EditFilled, EyeOutlined } from "@ant-design/icons";
// import { TStudent } from "../../../types";

// export type TTableData = Pick<TStudent, "fullName" | "id"|"email"|"academicDepartment"|"academicFaculty">;

type TTableData = {
  fullName: string;
  id: string;
  email: string;
  academicDepartment: string;  // Expecting only the name (string)
  academicFaculty: string;  // Expecting only the name (string)
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
    render: () => {
      return (
        <Space>
          <EyeOutlined />
          <EditFilled />
          <DeleteOutlined style={{ color: "red", fontWeight: "bolder" }} />
          <Button>Blocked</Button>
        </Space>
      );
    },
    width: "1%",
  },
];

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page,setPage]=useState(1)




  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 3 },
    { name: "page", value: page },
    // { name: "page", value: 2 },
    {name:'sort', value:"id"},
    ...params,
  ]);

  const metaData =studentData?.meta

  //   console.log(studentData);

  const tableData = studentData?.data?.map(({ _id, fullName, id ,email,academicDepartment,academicFaculty }) => ({
    key: _id,
    fullName,
    id,
    email,
    academicDepartment:academicDepartment?.name,
    academicFaculty:academicFaculty?.name,
  })) ;

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
      <Pagination
      total={metaData?.total}
      pageSize={metaData?.limit}
      onChange={(clickedPage)=>setPage(clickedPage)}
      current={page}
      />
    </div>
  );
};

export default StudentData;
