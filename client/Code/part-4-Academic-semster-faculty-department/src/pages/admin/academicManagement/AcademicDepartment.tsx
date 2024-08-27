import { Button, Table, TableColumnType } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartmentApi";
import { TAcademicDepartment } from "../../../types/academicDepartment.type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment"; 

export type TTableData=Pick<TAcademicDepartment, "name" | "academicFaculty" | "createdAt"> & {key:string}


const columns:TableColumnType<TTableData>[] =[

  {
    title: "Department Name",
    dataIndex: "name",
    key: "name",
    sorter:(a,b)=>a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
     defaultSortOrder: 'ascend',

     onHeaderCell: () => ({
      style: { backgroundColor: 'aqua', color: 'Black' }, // Green background and white text
    }),
  },
  {
    title:"Faculty Name",
    dataIndex:"academicFaculty",
    key:"academicFaculty",
    render:(academicFaculty)=>academicFaculty?.name,
    sorter: (a, b) => a.academicFaculty.name.localeCompare(b.academicFaculty.name), 
    sortDirections: ['ascend', 'descend'], 
    defaultSortOrder: 'ascend', 
    onHeaderCell: () => ({
      style: { backgroundColor: 'yellow', color: 'Black' }, // Green background and white text
    }),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => moment(createdAt).format("dddd, DD-MM-YYYY, h:mm A"),
    // render: (createdAt) => moment(createdAt).format("DD-MM-YYYY"),
    // render: (createdAt) => moment(createdAt).format("dddd, DD-MM-YYYY, HH:mm"),
  },

  {
    title:"Action",
    key:"X",
    render: ()=>{
      return <div>
        <Button style={{backgroundColor:"lightblue"}}><EditOutlined  /></Button>{" "}
        <Button style={{backgroundColor:" orange "}}><DeleteOutlined style={{color:"red", fontWeight:"bolder"}} /></Button>
      </div>
    }
  }
]





const AcademicDepartment = () => {
  const navigate = useNavigate();
  const {data,isFetching}=useGetAllDepartmentQuery(undefined);
  // console.log({data})

  const tableData =data?.data?.map(({name,_id,academicFaculty,createdAt})=>({
    key:_id,
    name,
    academicFaculty,
    createdAt
  }))


  const handleClick = () => {
    navigate("/admin/create-academic-department"); 
  };
  
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Academic Department</h1> <br />
      <Button type="primary" onClick={handleClick}>
        Create Department
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

export default AcademicDepartment;



// import { Button, Table, TableColumnType } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicDepartmentApi";
// import { TAcademicDepartment } from "../../../types/academicDepartment.type";

// // Define the table data type using Pick to extract only the needed properties
// export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty"> & {
//   key: string;
// };

// // Define the columns for the table
// const columns: TableColumnType<TTableData>[] = [
//   {
//     title: "Department Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Faculty Name",
//     dataIndex: "academicFaculty",
//     key: "academicFaculty",
//     render: (academicFaculty) => academicFaculty?.name, // Assuming academicFaculty has a name property
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) => (
//       <div>
//         <Button onClick={() => handleUpdate(record.key)}>Update</Button>{" "}
//         <Button onClick={() => handleDelete(record.key)}>Delete</Button>
//       </div>
//     ),
//   },
// ];

// // Handle update and delete actions
// const handleUpdate = (id: string) => {
//   // Update logic here
// };

// const handleDelete = (id: string) => {
//   // Delete logic here
// };

// const AcademicDepartment = () => {
//   const navigate = useNavigate();
//   const { data, isFetching } = useGetAllDepartmentQuery(undefined);

//   // Map the API data to the table data format
//   const tableData: TTableData[] = data?.data?.map(({ name, _id, academicFaculty }) => ({
//     key: _id,
//     name,
//     academicFaculty,
//   })) || [];

//   const handleClick = () => {
//     navigate("/admin/create-academic-department");
//   };

//   return (
//     <div>
//       <h1 style={{ textAlign: "center" }}>Academic Department</h1> <br />
//       <Button type="primary" onClick={handleClick}>
//         Create Department
//       </Button>{" "}
//       <br /> <br />
//       <hr />
//       <Table
//         columns={columns}
//         dataSource={tableData}
//         loading={isFetching}
//       />
//     </div>
//   );
// };

// export default AcademicDepartment;

