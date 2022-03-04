import { TimePicker, TimePickerProps } from 'antd'
import React from 'react'
import { BiTime } from 'react-icons/bi'

interface Iprops extends TimePickerProps {
    className?: string
    onChange?: () => void
}
const TimePickerComponent = ( props: Iprops ) => {

  return (
    <div className={`time-picker-wrapper ${props.className}`}>
        <TimePicker 
            value={props?.defaultValue}
            defaultValue={props?.defaultValue}
            onChange={props?.onChange}
            format={props?.format}
            suffixIcon={<BiTime />}
        />
    </div>
  )
}

export default TimePickerComponent