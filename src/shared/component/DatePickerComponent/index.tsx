import React , { useState } from "react";
import { DatePicker, DatePickerProps, Radio } from "antd";
import "./style.scss";
import { PickerDateProps } from "antd/lib/date-picker/generatePicker";
import { Moment } from "moment";
import { FiCalendar } from "react-icons/fi";
import moment from 'moment'

interface IRangerPicker extends PickerDateProps<Moment> {
  value?: any;
  onChange?: any;
  defaultValue?: any;
  className?: string;
  placeholder?: string;
}

const DatePickerComponent = (props: IRangerPicker) => {
  const [ isPicked, setIsPicked ] = useState(false)
  const [ pickerType, setPickerType ] = useState<'date' | 'week' | 'time'>('date')
  return (
    <DatePicker
      placeholder={`${props.placeholder ? props.placeholder : "dd/mm/yy"}`}
      className={`${props?.className ? props.className : ''} ${isPicked ? 'date-has-picked' : ''}`}
      defaultValue={props?.defaultValue}
      onChange={(value) => setIsPicked(value !== undefined)}
      value={props?.value}
      picker={pickerType}
      format={isPicked ? "DD/MM/YYYY" : props.format}
      // locale={locale}
      suffixIcon={props.suffixIcon || <FiCalendar size="27" className="icon-feather" />}
      onMouseLeave={(value) => setIsPicked(value.currentTarget.getElementsByTagName('input')[0].value !== '')} // point to input tag
      superNextIcon={false}
      superPrevIcon={false}
      renderExtraFooter={() => (
        <>
          <Radio.Group defaultValue={'date'} onChange={(value) => setPickerType(value.target.value)}>
            <Radio defaultChecked value="date">Theo ngày</Radio>
            <Radio value="week">Theo tuần</Radio>
          </Radio.Group>
        </>
      )}
    />
  );
};

export default React.memo(DatePickerComponent);


// function useState(arg0: boolean): [any, any] {
//   throw new Error("Function not implemented.");
// }

