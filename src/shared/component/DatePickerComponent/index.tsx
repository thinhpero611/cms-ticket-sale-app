import React from "react";
import { DatePicker } from "antd";
import "./style.scss";
import { FiCalendar } from 'react-icons/fi'

interface IRangerPicker {
  value?: any;
  onChange?: any;
  defaultValue?: any;
}

const DatePickerComponent = (props: IRangerPicker) => {
  return (
    <DatePicker
      defaultValue={props?.defaultValue}
      onChange={(value) => props?.onChange(value)}
      value={props?.value}
      picker="date"
      format="DD-MM-YYYY"
      // locale={locale}
      suffixIcon={<FiCalendar size="27" className="icon-feather" />}
    />
  );
};

export default React.memo(DatePickerComponent);
