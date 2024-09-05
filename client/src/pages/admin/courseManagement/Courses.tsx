import { Button, Modal, Table, Tooltip } from "antd";
import { useAddFacultiesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagementApi"
import UMForm from "../../../components/Forms/UMForm";
import UMSelect from "../../../components/Forms/UMSelect";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import { UserAddOutlined } from "@ant-design/icons";


const Courses = () => {

  const {data:courses,isFetching}=useGetAllCoursesQuery(undefined);
  // console.log(courses)
  type  TCourse ={
    _id: string;
    title: string;
    prefix: string;
    code: string;
  }

  const tableData = courses?.data?.map(({ _id, title, prefix, code }:TCourse) => ({
    key: _id ,
    title,
    code: `${code}`,
    prefix
  }));

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Prefix',
      key: 'prefix',
      dataIndex: 'prefix',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item:any) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];


  return (
    <Table
    loading={isFetching}
    columns={columns}
    dataSource={tableData}
    />
  )
}


const AddFacultyModal = ({ facultyInfo }:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data:facultiesData}=useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item:any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = (data:any) => {

    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    console.log(facultyData);
    addFaculties(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Tooltip title="Add your teacher" color="purple">

      <Button onClick={showModal}>Add Faculty <UserAddOutlined color="green" /></Button>
    </Tooltip>
      <Modal
         width={500}
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        onOk={handleOk}
      >
        <UMForm onSubmit={handleSubmit}>
          <UMSelect
          placeholder="Select your teacher name"
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty Name"
          />
          <Button  style={{backgroundColor:"green" ,color:"white", border:"2px solid green"}} htmlType="submit">Submit</Button>
        </UMForm>
      </Modal>
    </>
  );
};






export default Courses;


