import { HomeOutlined } from "@ant-design/icons"
import { Breadcrumb } from "antd"


const OfferedCourse = () => {
  return (
    <div>
      Offered-Course
      <Breadcrumb
        items={[
          {
            href: "/admin/courses",
            title:  <HomeOutlined />
          },
    
        ]}
      />
      </div>

  )
}

export default OfferedCourse