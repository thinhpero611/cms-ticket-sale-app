import React , { useState } from "react";
import { DatePicker, DatePickerProps } from "antd";
import "./style.scss";
import { PickerDateProps } from "antd/lib/date-picker/generatePicker";
import { Moment } from "moment";
import { FiCalendar } from "react-icons/fi";

interface IRangerPicker extends PickerDateProps<Moment> {
  value?: any;
  onChange?: any;
  defaultValue?: any;
  className?: string;
  placeholder?: string;
}

const DatePickerComponent = (props: IRangerPicker) => {
  const [ isPicked, setIsPicked ] = useState(false)
  return (
    <DatePicker
      placeholder={`${props.placeholder ? props.placeholder : "dd/mm/yy"}`}
      className={`${props?.className ? props.className : ''} ${isPicked ? 'date-has-picked' : ''}`}
      defaultValue={props?.defaultValue}
      onChange={(value) => setIsPicked(value !== undefined)}
      value={props?.value}
      picker="date"
      format={props.format || "DD/MM/YYYY"}
      // locale={locale}
      suffixIcon={props.suffixIcon || <FiCalendar size="27" className="icon-feather" />}
      onMouseLeave={(value) => setIsPicked(value.currentTarget.getElementsByTagName('input')[0].value !== '')} // point to input tag
    />
  );
};

export default React.memo(DatePickerComponent);


// function useState(arg0: boolean): [any, any] {
//   throw new Error("Function not implemented.");
// }

