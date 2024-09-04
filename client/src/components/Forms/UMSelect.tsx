import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean}[] |undefined;
  placeholder?: string;
  defaultValue?: string; // Add defaultValue props
  disabled?: boolean;
  mode?:"multiple" |undefined
};

const UMSelect = ({ label, name, options, placeholder,defaultValue,disabled,mode }: TPHSelectProps) => {
  return (
    <div style={{marginBottom:'12px'}}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} style={{fontWeight:"bolder"}}>
            <Select
              {...field}
              mode={mode}
              options={options}
              style={{ width: "100%" }}
              size="large"
              placeholder={placeholder}
              defaultValue={defaultValue}
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UMSelect;
