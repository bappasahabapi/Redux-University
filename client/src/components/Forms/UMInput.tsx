import { Form, Input } from "antd";
import { Controller} from "react-hook-form";


type TInputProps ={
  type:string, 
  name:string, 
  label?:string, 
  placeholder?:string,
}

const UMInput = ({ type, name, label,placeholder }:TInputProps) => {
  return (
    <div style={{marginBottom:'12px'}}>
      <Controller
        name={name}
        render={({ field , fieldState:{error}}) => (
          <Form.Item label={label}>
          <Input style={{}} {...field} type={type} id={name} placeholder={placeholder} size="large" />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UMInput;




