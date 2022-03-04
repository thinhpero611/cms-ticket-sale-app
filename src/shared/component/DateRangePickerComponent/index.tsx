import React from 'react'
import DatePickerComponent from '../DatePickerComponent'
import Text from 'antd/lib/typography/Text'
import TimePickerComponent from '../TimePickerComponent'

interface Iprops {
  onChange?: () => void
  className?: string
  title?: string
  direction?: "row" | "column"
  hasTimePicker?: boolean
}

const DateRangePicker = ( props: Iprops ) => {
  return (
    <div className={`"range-picker-card" ${props?.className}`}> 
        <div className="start-day">
            <Text>Từ ngày</Text>
            <DatePickerComponent />
            {props?.hasTimePicker && (<TimePickerComponent />) }
        </div>
        <div className="end-day">
            <Text>Đến ngày</Text>
            <DatePickerComponent />
            {props?.hasTimePicker && (<TimePickerComponent />) }
        </div>
    </div>
  )
}

export default DateRangePicker