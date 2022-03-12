import { TimePicker, TimePickerProps } from 'antd'
import React from 'react'
import { BiTime } from 'react-icons/bi'

interface Iprops extends TimePickerProps {
    className?: string
    onChange?: () => void
}
const TimePickerComponent = ( props: Iprops ) => {

  return (
    <TimePicker 
      className={props.className ? props.className : ''}
      value={props?.defaultValue}
      defaultValue={props?.defaultValue}
      placeholder={props?.placeholder || 'hh:mm:ss'}
      onChange={props?.onChange}
      format={props?.format}
      suffixIcon={<BiTime size="27" className="time-picker__icon" />}
    />
  )
}

export default TimePickerComponent