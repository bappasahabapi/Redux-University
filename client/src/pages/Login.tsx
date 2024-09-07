import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { decodeToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UMForm from "../components/Forms/UMForm";
import FormInput from "../components/Forms/UMInput"
import { useState } from "react"
import CarouselAuto from "../components/Carosal";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId:"A-0001",
  //     password:"admin123"
  //   },
  // });

  const [defaultValues, setDefaultValues] = useState({
    userId: "A-0001",
    password: "admin123",
  });

  // const defaultValues = {
  //   userId: "A-0001",
  //   password: "admin123",
  // };

  const [login] = useLoginMutation();
  // console.log("data=>",data);

  const onSubmitLogin = async (data: FieldValues) => {
    console.log(data); // { id: 'A-0001', password: 'admin123' }
    const toastId = toast.loading("Logging in...", { position: "top-center" });

    try {
      //       //todo:same format as backend accept
      const userInfo = {
        id: data?.userId,
        // id: data?.id,
        password: data?.password,
      };

      const res = await login(userInfo).unwrap();
      // console.log(res)
      const user = decodeToken(res.data.accessToken) as TUser;
      // // console.log(user)

      // //todo: After login
      // dispatch(setUser({user:{ user},token:res.data.accessToken}));

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("User logged in successfully", {
        richColors: true,
        id: toastId,
        position: "top-center",
        duration: 1500,
      });
      navigate(`/${user?.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong");
    }
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
        <Col sm={12} md={18} lg={10}>
          {/* <Image src={LoginImage}/> */}
          <CarouselAuto/>
        </Col>

        <Col sm={12} md={8} lg={8} style={{marginLeft:"30px"}}>
          <h1 style={{ }}>First login your account</h1>
          <div>
            <UMForm onSubmit={onSubmitLogin} defaultValues={defaultValues} key={JSON.stringify(defaultValues)}>
              <FormInput type="text" name="userId" label="ID: " />
              <FormInput type="text" name="password" label="Password: " />
              <Button  className="custom-login-button" htmlType="submit" type="primary" >
                Login
              </Button>
            </UMForm>
            <div style={{ marginTop: "20px" }}>
              <Button
                type="default"
                onClick={() => setDefaultValues({
                  userId: "A-0001",
                  password: "admin123",
                })}
                style={{ marginRight: "10px" }}
              >
                Admin Login
              </Button>
              <Button
                type="default"
                onClick={() => setDefaultValues({
                  userId: "2026030002",
                  password: "student123",
                })}
                style={{ marginRight: "10px" }}
              >
                Student Login
              </Button>
              <Button
                type="default"
                onClick={() => setDefaultValues({
                  userId: "F-0005",
                  password: "faculty123",
                })}
              >
                Faculty Login
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
