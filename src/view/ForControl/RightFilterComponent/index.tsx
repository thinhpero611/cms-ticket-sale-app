import { Row, Col, Radio, Button, Select } from 'antd'
import React, { useState } from 'react'
import MainTitle from '../../../shared/component/MainTitle'
import DatePickerComponent from '../../../shared/component/DatePickerComponent'
import Text from 'antd/lib/typography/Text'
import { status } from '../../../module/ticket/constant'
import { IFilterTicketProps } from '../../Magage/components/FilterModalComponent'
import DateRangePicker from '../../../shared/component/DateRangePickerComponent'

interface Iprops {
  isEventTicket?: boolean
  getFilter: React.Dispatch<React.SetStateAction<IFilterTicketProps>>
}

const { Option } = Select

const RightFilterComponent = ( props: Iprops ) => {
  // console.log(state)
  const onRadioGroupChange = (e) => {
    if (e.target.value === 'all') {
      props.getFilter(prev => ({ ...prev, isDoingForControl: 'all'}))
      return
    }
    props.getFilter(prev => ({ ...prev, isDoingForControl: e.target.value === status.DOING_FORCONTROL}))
  }
  
  const hanldeOnChangeSelect = (value) => {
    props.getFilter(prev => ({ ...prev, event: value}))
  }

  const hanldeFilterTicket = () => {
    // props.getFilter({ ...state })
  }
  
  return (
   <div className="right-filter-component">
      <MainTitle index={2} title="Lọc vé" />
      {props.isEventTicket && (
        <div className="filter__event">
          <Select defaultValue="Will AI invade human civilization" onChange={hanldeOnChangeSelect}>
            <Option value="Will AI invade human civilization">Will AI invade human civilization</Option>
          </Select>
        </div>
      )}
      <div className="filter__status-ticket">
        <div className="typography">
          <Text>Tình trạng đối soát</Text>
        </div>
        <Radio.Group onChange={onRadioGroupChange}>
          <Radio value="all">Tất cả</Radio>
          <Radio value={status.DOING_FORCONTROL}>Đã đối soát</Radio>
          <Radio value={status.NOT_DOING_FORCONTROL}>Chưa đối soát</Radio>
        </Radio.Group>
      </div>
      <div className="filter__type-ticket">
        <div className="typography">
          <Text>Loại vé</Text>
        </div>
        <div className="data-entry">
          <Text>Vé Cổng</Text>
        </div>
      </div>
      <div className="filter__date-ticket">
        <DateRangePicker />
      </div>
      <Button onClick={hanldeFilterTicket} className="filter__activated-button">Lọc</Button>
   </div>
  )
}

export default RightFilterComponent