import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { Menu } from "antd";
import { studentPaths } from "../../routes/studen.routes";
import { facultyPaths } from "../../routes/facultyPaths";


const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
  };

const SideBar = () => {

    const role = 'admin';
    // const role = 'student';
    // const role = 'faculty';
    let sidebarItems;

    switch (role) {
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
