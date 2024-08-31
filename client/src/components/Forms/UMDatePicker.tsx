import { DatePicker, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

type TDatePikerProps = {
  name: string;
  label?: string;
};

const UMDatePicker = ({ name, label }: TDatePikerProps) => {
  const { control } = useFormContext(); // Use useFormContext to access the form context

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              value={field.value ? moment(field.value) : null} 
              onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : null)} 
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UMDatePicker;







// -------------------- 



// import { DatePicker,Form, } from "antd";
// import { Controller} from "react-hook-form";

// type TDatePikerProps = {
//   name: string;
//   label?: string;
// };

// const UMDatePicker =({name,label}:TDatePikerProps)=>{
//     return(
//         <div style={{}}>
//             <Controller
//             name={name}
//             render={({field})=>(
//                 <Form.Item label={label}>
//                     <DatePicker {...field} size="large" style={{width:"100%"}}/>
//                 </Form.Item>
//             )}
//             />
//         </div>
//     )
// }

// export default UMDatePicker;
