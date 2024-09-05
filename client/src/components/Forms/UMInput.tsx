import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  tooltip?: string | undefined;
  required?: boolean;
};

const UMInput = ({
  type,
  name,
  label,
  placeholder,
  disabled,
  tooltip,
  required,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            style={{ fontWeight: "bolder" }}
            tooltip={tooltip}
            required={required}
          >
            <Input
              style={{}}
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              size="large"
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UMInput;
