import React from 'react'
import { DatePicker } from 'antd'
import { FiCalendar } from 'react-icons/fi'

interface IRangePicker {
  value?: any
  onChange?: any
  defaultValue?: any
}

const RangePickerComponent = ( props: IRangePicker ) => {
  return (
    <DatePicker.RangePicker
      defaultValue={props.defaultValue}
      onChange={(value) => props?.onChange(value)}
      value={props?.value}
      picker='date'
      format="DD/MM/YYYY"
      suffixIcon={<FiCalendar size={27} className="icons-feather"/>}
    />
  )
}

export default React.memo(RangePickerComponent)