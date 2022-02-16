import React, { useState} from 'react'
// datetime
import moment from 'moment'
// styles
import { Calendar, Button } from 'antd'
import { FiCalendar } from 'react-icons/fi'

const DatePicker = () => {
    const [ isShowCalendar, setIsShowCalendar ] = useState(false)
    const date = new Date()
    const hanldeShowCalendar = () => {
        setIsShowCalendar(!isShowCalendar)
      }
      const onPannelChange = (value, mode) => {
        console.log(value, mode)
      }
  return (
    <div className="calendar">
          <p className="date-now">{`Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`}</p>
          {isShowCalendar ? 
          <Calendar fullscreen={false} onPanelChange={onPannelChange} /> : ""}
          <Button onClick={hanldeShowCalendar} >
            <FiCalendar className="icon__calendar" />
          </Button>
    </div>
  )
}

export default DatePicker