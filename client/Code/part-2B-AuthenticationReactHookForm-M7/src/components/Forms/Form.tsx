import { ReactElement, ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";


type TFormConfig={
    defaultValues?:Record<string,any>;
};

type TFormProps={
    children?:ReactElement |ReactNode;
    onSubmit:SubmitHandler<FieldValues>;
} & TFormConfig ;



const Form = ({ onSubmit, children ,defaultValues}:TFormProps) => {

    const formconfig:TFormConfig={};

    if(defaultValues){
        formconfig['defaultValues'] = defaultValues
    }
  const methods = useForm(formconfig);
  return (
    <FormProvider {...methods}> 
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
