import { Form, Input } from "antd";
import { Controller} from "react-hook-form";

type TInputProps ={
  type:string, 
  name:string, 
  label?:string, 
}

const FormInput = ({ type, name, label }:TInputProps) => {
  return (
    <div style={{marginBottom:'12px', width:'130%'}}>
      {/* {label ? label : null} */}
      <Controller
        name={name}
        render={({ field , fieldState:{error}}) => (
          <Form.Item label={label}>
          <Input {...field} type={type} id={name}/>
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
