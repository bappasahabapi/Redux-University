import { Card } from "antd";
import { Link } from "react-router-dom";

const gridStyle: React.CSSProperties = {
  width: "30%",
  textAlign: "center",
  padding: "85px",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "bolder",
  backgroundColor: "snow",
  marginBottom: "20px",
  marginRight: "20px",
};
const gridStyle1: React.CSSProperties = {
  width: "30%",
  textAlign: "left",
  padding: "50px",
  cursor: "pointer",
  fontSize: "25px",
  fontWeight: "bolder",
  backgroundColor: "snow",
  marginBottom: "20px",
  marginRight: "20px",
  // margin:"30px"
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
      <Card
        title="User Management"
        style={{ marginTop: "30px", textAlign: "center" }}
      >
        <Card.Grid style={gridStyle}>
          {" "}
          <Link to="/admin/students-data">01-Student List</Link>
        </Card.Grid>
      </Card>
      <Card title="Academic Management" style={{ marginTop: "20px" ,textAlign: "center"  }}>
        <Card.Grid style={gridStyle}>
          {" "}
          <Link to="/admin/academic-semester">01-Academic Semester</Link>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          {" "}
          <Link to="/admin/academic-faculty">02-Academic Faculty</Link>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Link to="/admin/academic-department">03-Academic Department</Link>
        </Card.Grid>
      </Card>
      <Card
        title="User Management"
        style={{ marginTop: "30px", textAlign: "center" }}
      >
        <Card.Grid style={gridStyle1}>
          <Link to="/admin/registered-semesters">01-Registered Semester</Link>
        </Card.Grid>
        <Card.Grid style={gridStyle1}>
          <Link to="/admin/courses">02-Courses</Link>
        </Card.Grid>
        <Card.Grid style={gridStyle1}>
          <Link to="/admin/courses">03-Offered Course</Link>
        </Card.Grid>
      
       
      </Card>
    </div>
  );
};

export default AdminDashboard;
