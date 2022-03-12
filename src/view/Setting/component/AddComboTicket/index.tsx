import { Input, Checkbox, Select, Button } from 'antd'
import React, { useState } from 'react'
import Text from 'antd/lib/typography/Text'
import { status } from '../../../../module/ticket/constant'
import DateRangePicker from '../../../../shared/component/DateRangePickerComponent'
import InputNumberComponent from '../../../../shared/component/InputNumberComponent'
import ComboTicketEntity from '../../../../module/comboTicket/entity'

const { Option } = Select

interface Iprops {
  setComboTicket: React.Dispatch<React.SetStateAction<ComboTicketEntity>>
  comboTicket: ComboTicketEntity
}
const AddComboTicket: React.FC<Iprops> = ({ setComboTicket, comboTicket }) => {
 
  const [ price, setPirce ] = useState<number>(0)
  const [ comboPrice, setComboPrice ] = useState<number>(0)
  const [ ticketQuantity , setTicketQuantity ] = useState<number>(0)
  const handleCheckboxChange = (list) => {
    console.log(list)
    if (list[0] < list[1])
    setComboTicket(prev => ({ 
      ...prev, 
      ticketPrice: list[0] || 0 , 
      comboTicketPrice: list[1] || 0
    }))
  }

  const handleSelectChange = (value) => {
    console.log(value)
    if (!value) return
    setComboTicket(prev => ({ ...prev, status: value === status.COMBO_ACTIVE }))
  }

  return (
      <div className="add-combo-ticket-card">
        <div className="combo-ticket__add-name">
          <div>
            <Text>Tên gói vé<sup style={{color: 'red'}}>*</sup></Text>
            <Input onChange={(e) => setComboTicket(prev => ({ ...prev, ticketPackName: e.target.value}))} placeholder="Nhập tên gói vé" />
          </div>
        </div>
        <div className="combo-ticket__date-range-picker">
          <DateRangePicker hasTimePicker={true}  />
        </div>
        <div className="combo-ticket__price">
          <Text>Giá vé áp dụng</Text>
          <Checkbox.Group onChange={handleCheckboxChange}>
            <Checkbox value={price}>Vé lẻ (vnđ/vé) với giá <InputNumberComponent handleChange={setPirce} placeholder='giá vé' width="150px" /> / <span>vé</span></Checkbox>
            <Checkbox value={ticketQuantity && ticketQuantity* price }>
              Combo vé với giá 
              <InputNumberComponent value={price * ticketQuantity} placeholder='số vé' width="150px" /> / 
              <InputNumberComponent handleChange={setTicketQuantity} width="70px" placeholder='giá vé' /> <span>vé</span>
            </Checkbox>
          </Checkbox.Group>
        </div>
        <div className="combo-ticket__status">
          <Text>Tình trạng</Text>
          <Select defaultValue={status.COMBO_ACTIVE} onChange={handleSelectChange}> 
          <Option value={status.COMBO_ACTIVE}>Đang áp dụng</Option>
          <Option value={status.COMBO_OFF}>Tắt</Option>
          </Select>
          <Text><span>*</span><i>là thông tin bắt buột</i></Text>
        </div>
      </div>
  )
}

export default AddComboTicket