import { Checkbox, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useState, useEffect } from 'react'
import api from '../../../../core/firebase'
import ComboTicketEntity from '../../../../module/comboTicket/entity'
import { status } from '../../../../module/ticket/constant'
import DateRangePicker from '../../../../shared/component/DateRangePickerComponent'
import InputNumberComponent from '../../../../shared/component/InputNumberComponent'

const { Option } = Select
// setCurrentVal(new ComboTicketEntity(data)
const UpdateComboTicket = ({ currentId }) => {
  const [ currentVal, setCurrentVal ] = useState<ComboTicketEntity>()
  const [ num1, setNum1 ] = useState<number>(0)
  const [ num2, setNum2 ] = useState<number>(0)
  const [ num3, setNum3 ] = useState<number>(0)
  
  console.log('value',currentVal) 
  useEffect(() => {
    api.comboTicket.fetchOne<ComboTicketEntity>(currentId).then((data) => setCurrentVal(data))
  }, [currentId])
  
  const handleCheckboxChange = (list) => {
    console.log(list)
  }

  const handleSelectChange = (value) => {
    console.log(value)
  }

  return (
    <div className="update-combo-ticket-card">
      <div className="update-combo__name">
        <div className="event-code">
          <Text>Mã sự kiện<sup style={{color: 'red'}}>*</sup></Text>
          {/*field cua ComboTicketEntity khac field tren firebase*/}
          {/*@ts-ignore*/}
          <Input placeholder={currentVal?.code} onChange={(value) => console.log(value)} />
        </div>
        <div className="event-name">
          <Text>Tên sự kiện</Text>
          {/*@ts-ignore*/}
          <Input placeholder={currentVal?.packName} />
        </div>
      </div>
      <div className="update-combo__date-range-picker">
        <DateRangePicker hasTimePicker={true} />
      </div>
      <div className="update-combo__price">
        <Text>Giá vé áp dụng</Text>
        <Checkbox.Group onChange={handleCheckboxChange}>
        <Checkbox value={currentVal?.ticketPrice}>Vé lẻ (vnđ/vé) với giá <InputNumberComponent value={currentVal?.ticketPrice} handleChange={setNum1} placeholder='giá vé' /> / vé</Checkbox>
        {/*@ts-ignore */}
        <Checkbox value={currentVal?.comboPrice}>Combo vé với giá <InputNumberComponent value={currentVal?.comboPrice} handleChange={setNum2} placeholder='giá vé' /> / <InputNumberComponent value={currentVal?.comboPrice / currentVal?.ticketPrice} handleChange={setNum3} width="50px" placeholder='số vé' />vé</Checkbox>
        </Checkbox.Group>
      </div>
      <div className="update-combo__status">
        <Text>Tình trạng</Text>
        <Select value={currentVal?.status ? status.COMBO_ACTIVE : status.COMBO_OFF} onChange={handleSelectChange}> 
        <Option value={status.COMBO_ACTIVE}>{status.COMBO_ACTIVE}</Option>
        <Option value={status.COMBO_OFF}>{status.COMBO_OFF}</Option>
        </Select>
        <Text italic><sup style={{color: 'red'}}>*</sup>là thông tin bắt buột</Text>
      </div>
    </div>
  )
}

export default UpdateComboTicket