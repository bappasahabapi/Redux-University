import { Button, Dropdown, Table, TableColumnsType, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterStatusMutation,
} from "../../../redux/features/admin/courseManagementApi";
import { TSemester } from "../../../types";
import moment from "moment";
import { useState } from "react";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;
const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);
  const [semesterId, setSemesterId] = useState("");
  const [updateSemesterStatus] = useUpdateSemesterStatusMutation();

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const handleStatusUpdate = (data:any) => {
    // console.log('semesterId:',semesterId)
    // console.log('newStatus:',data?.key)
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Tooltip title="Upcoming->Ongoing->Ended" color="green">
              <Button onClick={() => setSemesterId(item.key)}>Update</Button>
            </Tooltip>
          </Dropdown>
        );
      },
    },
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/semester-registration");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Already Registered Semester</h1>{" "}
      <br />
      <Button type="primary" onClick={handleClick}>
        Register Semester
      </Button>{" "}
      <br /> <br />
      <hr />
      <Table
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        loading={isFetching}
      />
    </div>
  );
};

export default RegisteredSemesters;
