import { DatePicker,Form, } from "antd";
import { Controller} from "react-hook-form";


type TDatePikerProps = {
  name: string;
  label?: string;
};


const UMDatePicker =({name,label}:TDatePikerProps)=>{
    return(
        <div style={{}}>
            <Controller
            name={name}
            render={({field})=>(
                <Form.Item label={label}>
                    <DatePicker {...field} size="large" style={{width:"100%"}}/>
                </Form.Item>
            )}
            
            />
        </div>
    )
}




export default UMDatePicker;
