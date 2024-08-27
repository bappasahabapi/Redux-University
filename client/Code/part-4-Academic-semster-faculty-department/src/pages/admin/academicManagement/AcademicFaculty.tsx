import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFacultyApi";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";


export type TTableData=Pick<TAcademicFaculty, "name">

const columns: TableColumnsType<TTableData> = [

  {
    title: "Faculty Name",
    dataIndex: "name",
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


const AcademicFaculty = () => {

  const {data:facultyData, isFetching}=useGetAllFacultyQuery(undefined)
  console.log(facultyData)
  const navigate =useNavigate();

  const tableData =facultyData?.data?.map(({name,_id})=>({
    name,
    key:_id
  }))




  const handleClick = () => {
    navigate("/admin/create-academic-faculty"); // Updated navigation path
  };
  
  return (
    <div>
      <h1 style={{textAlign:'center'}}> Academic Faculty</h1> 
      <Button type="primary" onClick={handleClick}>
      <PlusCircleOutlined /> Create Faculty
      </Button>{" "}
      <br /> <br />
      <hr />

      <Table
      columns={columns}
      dataSource={tableData}
      loading={isFetching}
      />
    </div>
  );
};

export default AcademicFaculty;
