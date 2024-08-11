/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { decodeToken } from "../utils/verifyToken";
// import Password from "antd/es/input/Password";

const Login = () => {
  const dispatch =useAppDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId:"A-0001",
      password:"admin123" 
    },
  });
  const [login, { data}] = useLoginMutation();
  // console.log("data=>",data);

  const onSubmitLogin = async(data) => {
    // console.log(data);  // { id: 'A-0001', password: 'admin123' }

    //todo:same format as backend accept
    const userInfo = {
      id:data?.userId,
      // id: data?.id,
      password: data?.password,
    };

    const res =await login(userInfo).unwrap();
    // console.log(res)
    const user =decodeToken(res.data.accessToken)
    // console.log(user)



    dispatch(setUser({user:{ user},token:res.data.accessToken}))


  };

  return (
    <div>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
        }}
      >
        {/* <Col sm={12} md={18} lg={8}>
          <p>Login Image</p>
        </Col> */}

        <Col sm={12} md={8} lg={8}>
          <h1 style={{ margin: "15px 0px" }}>First login your account</h1>
          <div>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <div>
                <label htmlFor="id">ID: </label>
                <input type="text" id="id" {...register("userId")} />
              </div>
              <div>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" {...register("password")} />
              </div>
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
