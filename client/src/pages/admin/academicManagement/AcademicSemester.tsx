import { Button, Table, TableColumnsType, TableProps } from "antd";

import { useNavigate } from "react-router-dom";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../constants/global";


export type TTableData=Pick<TAcademicSemester, "name" |"year" |"startMonth"|"endMonth" >

const columns: TableColumnsType<TTableData> = [
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
  // {
  //   title: "Code",
  //   dataIndex: "code",
  //   defaultSortOrder: "descend",
  //   sorter: (a, b) => a.age - b.age,
  // },
  {
    title: "Year",
    dataIndex: "year",
    filters: [
      {
        text: "2024",
        value: "2024",
      },
      {
        text: "2025",
        value: "2025",
      },
    ],
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
  {
    title:"Action",
    key:"X",
    render: ()=>{
      return <div>
        <Button>Update</Button>{" "}
        <Button>Delete</Button>
      </div>
    }
  }
];



const AcademicSemester = () => {
  const [params, setParams]=useState<TQueryParam[] |undefined>(undefined)
  // const [params, setParams]=useState([])
  // const { data: semesterData } = useGetAllSemesterQuery([{name:'year',value:'2024'}]);
  // const { data: semesterData } = useGetAllSemesterQuery([{name:'name',value:'Fall'}]);
  // const { data: semesterData } = useGetAllSemesterQuery(undefined);
  const { data: semesterData ,isFetching} = useGetAllSemesterQuery(params);
  // console.log({isLoading,isFetching})

  // console.log(semesterData);

  const tableData = semesterData?.data?.map(
    ({ _id, name, endMonth, startMonth,year }) => ({
      key:_id,
      name,
      endMonth,
      startMonth,
      year,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log({filters}, {extra});
    if(extra.action==='filter'){
      const queryParams: TQueryParam[] =[];
  
      filters.name?.forEach((item)=>
        queryParams.push({name:'name',value:item})
      )
      filters.year?.forEach((item)=>
        queryParams.push({name:'year',value:item})
      )
      // console.log(queryParams)
      setParams(queryParams)
    }
  
  };

  
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/admin/create-academic-semester"); // Updated navigation path
  };
  
  // if(isLoading){
  //   return <h4>Loading ...</h4>
  // }

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
        loading={isFetching}
      />
    </div>
  );
};

export default AcademicSemester;
