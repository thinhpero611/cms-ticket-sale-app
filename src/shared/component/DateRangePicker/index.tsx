import React from 'react'
import DatePickerComponent from '../DatePickerComponent'
import Text from 'antd/lib/typography/Text'

interface Iprops {
  onChange?: () => void
  className?: string
  title?: string
  direction?: "row" | "column"
}

const DateRangePicker = () => {
  return (
    <div className="range-picker-card"> 
        <div className="start-day">
            <Text>Từ ngày</Text>
            <DatePickerComponent />
        </div>
        <div className="end-day">
            <Text>Đến ngày</Text>
            <DatePickerComponent />
        </div>
    </div>
  )
}

export default DateRangePicker