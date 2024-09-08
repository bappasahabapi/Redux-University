
import { Link } from "react-router-dom";

const flexContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: "30px",
  textAlign: "center",
};

const flexItemStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30%",
  padding: "85px",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "bolder",
  backgroundColor: "snow",
  marginBottom: "20px",
  marginRight: "20px",
  textDecoration: "none",
  color: "Purple",
};


const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1> <br />
      <hr />
      <hr />
      <div title="User Management" style={{ marginTop: "20px" }} >
        <h1 style={{ textAlign: "center" }}>User Management</h1>
        <div style={flexContainerStyle} >
          <Link to="/admin/students-data" style={flexItemStyle} className="flexContainerStyle">
            01-Student List
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Academic Management</h1>
        <div style={flexContainerStyle}>
          <Link to="/admin/academic-semester" style={flexItemStyle}>
            01-Academic Semester
          </Link>
          <Link to="/admin/academic-faculty" style={flexItemStyle}>
            02-Academic Faculty
          </Link>
          <Link to="/admin/academic-department" style={flexItemStyle}>
            03-Academic Department
          </Link>
        </div>
      </div>

      <div>
        <h1 style={{ textAlign: "center" }}>Course Management</h1>
        <div style={flexContainerStyle} >
          <Link  to="/admin/registered-semesters" style={flexItemStyle}>
            01-Registered Semester
          </Link>
          <Link to="/admin/courses" style={flexItemStyle}>
            02-Courses
          </Link>
          <Link to="/admin/offered-courses" style={flexItemStyle}>
            03-Offered Course 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
