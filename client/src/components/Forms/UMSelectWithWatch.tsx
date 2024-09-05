import { Form, Select } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TUMSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
};

const UMSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
}: TUMSelectProps) => {


    const method =useFormContext();
    const inputValue =useWatch({
        control:method.control,
        name
    })
    

    console.log(inputValue);
    

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UMSelectWithWatch;
