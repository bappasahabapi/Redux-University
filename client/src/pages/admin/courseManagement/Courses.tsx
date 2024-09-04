import { Button, Modal, Table } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagementApi"
import UMForm from "../../../components/Forms/UMForm";
import UMSelect from "../../../components/Forms/UMSelect";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";


const Courses = () => {

  const {data:courses,isFetching}=useGetAllCoursesQuery(undefined);
  // console.log(courses)


  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
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
      render: (item) => {
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
  // console.log(facultiesData)
  
  

  // const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = (data) => {

    console.log(data)
    // const facultyData = {
    //   courseId: facultyInfo.key,
    //   data,
    // };

    // console.log(facultyData);

    // addFaculties(facultyData);
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
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        // footer={null}
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
          <Button style={{backgroundColor:"snow" ,color:"black", border:"2px solid green"}} htmlType="submit">Submit</Button>
        </UMForm>
      </Modal>
    </>
  );
};






export default Courses;


