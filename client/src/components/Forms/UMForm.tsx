import { Col, Flex, Form } from "antd";
import { ReactElement, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  children?: ReactElement | ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const UMForm = ({ onSubmit, children, defaultValues }: TFormProps) => {
  const formconfig: TFormConfig = {};

  if (defaultValues) {
    formconfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formconfig);
  return (
    <Flex justify="center" align="">
      <Col span={6}>
        <FormProvider {...methods}>
          <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>{children}</Form>
        </FormProvider>
      </Col>
      
    </Flex>
  );
};

export default UMForm;
