import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean}[] |undefined;
  placeholder?: string;
  defaultValue?: string; // Add defaultValue props
  disabled?: boolean;
};

const UMSelect = ({ label, name, options, placeholder,defaultValue,disabled }: TPHSelectProps) => {
  return (
    <div style={{marginBottom:'12px'}}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              {...field}
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
