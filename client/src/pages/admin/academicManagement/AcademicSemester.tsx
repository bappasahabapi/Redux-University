import { Button, Table, TableColumnsType, TableProps } from "antd";

import { useNavigate } from "react-router-dom";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";


interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    // sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Code",
    dataIndex: "code",
    defaultSortOrder: "descend",
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Year",
    dataIndex: "year",
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const AcademicSemester = () => {
  const { data: semesterData } = useGetAllSemesterQuery(undefined);

  // console.log(semesterData);

  const tableData = semesterData?.data?.map(
    ({ _id, name, endMonth, startMonth, code, year }) => ({
      _id,
      name,
      endMonth,
      startMonth,
      code,
      year,
    })
  );

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/create-academic-semester"); // Updated navigation path
  };

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Academic Semester</h1> <br />
      <Button type="primary" onClick={handleClick}>
        Create Semester
      </Button>{" "}
      <br /> <br />
      <hr />
      {/* <UMTable/> */}
      <Table
        columns={columns}
        onChange={onChange}
        dataSource={tableData}
        // dataSource={data}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicSemester;
