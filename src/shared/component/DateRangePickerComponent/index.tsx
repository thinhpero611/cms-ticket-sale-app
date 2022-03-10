import React from 'react'
import DatePickerComponent from '../DatePickerComponent'
import Text from 'antd/lib/typography/Text'
import TimePickerComponent from '../TimePickerComponent'
import { FiCalendar } from 'react-icons/fi';
interface Iprops {
  onChange?: () => void
  className?: string
  title?: string
  direction?: "row" | "column"
  hasTimePicker?: boolean
}

const DateRangePicker = ( props: Iprops ) => {
  return (
    <div className={`range-picker-card ${props?.className ? props?.className : ''}`}> 
        <div className="start-day picker-item">
          <div className="typography">
            <Text>Từ ngày</Text>
          </div>
          <DatePickerComponent placeholder='dd/mm/yy' suffixIcon={<FiCalendar size="27" className="icon-feather" />} />
          {props?.hasTimePicker && (<TimePickerComponent />) }
        </div>
        <div className="end-day picker-item">
          <div className="typography">
            <Text>Đến ngày</Text>
          </div>
          <DatePickerComponent placeholder='dd/mm/yy' suffixIcon={<FiCalendar size="27" className="icon-feather" />}/>
          {props?.hasTimePicker && (<TimePickerComponent />) }
        </div>
    </div>
  )
}

export default DateRangePicker