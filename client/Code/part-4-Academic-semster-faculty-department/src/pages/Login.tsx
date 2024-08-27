import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { decodeToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UMForm from "../components/Forms/UMForm";
import FormInput from "../components/Forms/FormInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId:"A-0001",
  //     password:"admin123"
  //   },
  // });

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

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
        <Col sm={12} md={18} lg={8}>
          <p>Login Image</p>
        </Col>

        <Col sm={12} md={8} lg={8}>
          <h1 style={{ margin: "18px " }}>First login your account</h1>
          <div>
            <UMForm onSubmit={onSubmitLogin} defaultValues={defaultValues}>
              <FormInput type="text" name="userId" label="ID: " />
              <FormInput type="text" name="password" label="Password: " />
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </UMForm>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
