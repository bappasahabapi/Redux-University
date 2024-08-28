import { Form } from "antd";
import { ReactElement, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  children?: ReactElement | ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const UMForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formconfig: TFormConfig = {};

  if (defaultValues) {
    formconfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formconfig["resolver"] = resolver;
  }
  const methods = useForm(formconfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  // return (
  //   <FormProvider {...methods}>
  //     <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
  //       {children}
  //     </Form>
  //   </FormProvider>
  // );

  return (
    <>
      <FormProvider {...methods}>
        <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
          {children}
        </Form>
      </FormProvider>
    </>
  );
};

export default UMForm;
