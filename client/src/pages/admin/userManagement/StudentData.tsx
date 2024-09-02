import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TQueryParam } from "../../../constants/global";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { DeleteOutlined, EditFilled, EyeOutlined } from "@ant-design/icons";
import { TStudent } from "../../../types";

export type TTableData = Pick<TStudent, "fullName" | "id">;

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
  const [page,]=useState(1)




  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    // { name: "page", value: 2 },
    {name:'sort', value:"id"},
    ...params,
  ]);

  //   console.log(studentData);

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

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
      />
    </div>
  );
};

export default StudentData;
