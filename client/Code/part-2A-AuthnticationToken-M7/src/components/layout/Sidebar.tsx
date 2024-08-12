// import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { Menu,Layout} from "antd";
import { studentPaths } from "../../routes/studen.routes";
import { facultyPaths } from "../../routes/facultyPaths";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;


const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
  };

const SideBar = () => {

  const user =useAppSelector(selectCurrentUser);
  // console.log(user) 

  // const role ='admin'
    let sidebarItems;

    // switch (role) {
    switch (user!.role) {
        case userRole.ADMIN:
          sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
          break;
        case userRole.FACULTY:
          sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
          break;
        case userRole.STUDENT:
          sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
          break;
    
        default:
          break;
      }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div
        style={{
          color: "white",

          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>BS</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
        // items={sidebarItemsGenerator(adminPaths, "admin")}
      />
    </Sider>
  );
};

export default SideBar;


