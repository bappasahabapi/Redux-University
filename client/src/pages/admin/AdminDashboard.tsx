import { Card } from "antd";
import { Link } from "react-router-dom";

const gridStyle: React.CSSProperties = {
  width: "30%",
  textAlign: "center",
  padding:"80px",
  cursor: "pointer",
  fontSize: "30px",
  fontWeight:"bolder",
  backgroundColor:"snow",
  marginBottom:"20px",
  marginRight:"20px"

  

};


const AdminDashboard = () => {
  return (
    <div>
      <h1> This is Admin Dashboard component </h1>
      <ul>
        <li>First Create Semester</li>
        <li>First Create Faculty</li>
        <li>
          <b>First Create Department</b>
          <ol> - Need Faculty Id</ol>
        </li>
      </ul>
      <Card title="Academic Management" style={{marginTop:"20px"}}>
        <Card.Grid  style={gridStyle}> <Link  to='/admin/academic-semester'>Academic Semester</Link></Card.Grid>
        <Card.Grid  style={gridStyle}> <Link to='/admin/academic-faculty'>Academic Faculty</Link></Card.Grid>
        <Card.Grid  style={gridStyle}> <Link to='/admin/academic-department'>Academic Department List</Link></Card.Grid>
       
      </Card>
      <Card title="User Management" style={{marginTop:"30px", textAlign:"center"}}>
       
        <Card.Grid  style={gridStyle}> <Link to='/admin/students-data'>Student List</Link></Card.Grid>
       
      </Card>
    </div>
  );
};

export default AdminDashboard;
