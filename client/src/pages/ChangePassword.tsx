import { Button, Row } from 'antd';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import UMForm from '../components/Forms/UMForm';
import UMInput from '../components/Forms/UMInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useChangePasswordMutation } from '../redux/features/admin/userManagementApi';
import { logout } from '../redux/features/auth/authSlice';
import { TResponse } from '../types';

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    // const res =await changePassword(data)
    const res = (await changePassword(data)) as TResponse<any>;
    // console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' , backgroundColor:"snow"  }}>
      <UMForm onSubmit={onSubmit}>
        <UMInput type="text" name="oldPassword" label="Old Password" placeholder='student123'/>
        <UMInput type="text" name="newPassword" label="New Password" placeholder='student123' />
        <Button htmlType="submit" style={{width:"100%"} } type="primary" >Login</Button>
      </UMForm>
    </Row>
  );
};

export default ChangePassword;
