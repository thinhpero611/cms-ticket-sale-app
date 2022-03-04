import { Input, Checkbox, Select } from 'antd'
import React, { useState } from 'react'
import Text from 'antd/lib/typography/Text'
import { status } from '../../../../module/ticket/constant'
import DateRangePicker from '../../../../shared/component/DateRangePickerComponent'
import InputNumberComponent from '../../../../shared/component/InputNumberComponent'

const { Option } = Select

const AddComboTicket = () => {
  const [ num1, setNum1 ] = useState<number>(0)
  const [ num2, setNum2 ] = useState<number>(0)
  const [ num3, setNum3 ] = useState<number>(0)
  
  const handleCheckboxChange = (list) => {
    console.log(list)
  }

  const handleSelectChange = (value) => {
    console.log(value)
  }

  return (
      <div className="add-combo-ticker-card">
        <div className="combo-ticker__add-name">
          <Text>Tên gói vé<sup style={{color: 'red'}}>*</sup></Text>
          <Input placeholder="Nhập tên gói vé" />
        </div>
        <div className="combo-ticker__date-range-picker">
          <DateRangePicker hasTimePicker={true}  />
        </div>
        <div className="combo-ticker__price">
          <Text>Giá vé áp dụng</Text>
          <Checkbox.Group onChange={handleCheckboxChange}>
          <Checkbox value={num1}>Vé lẻ (vnđ/vé) với giá <InputNumberComponent handleChange={setNum1} placeholder='giá vé' /> / vé</Checkbox>
          <Checkbox value={Math.round(num2/num3)}>Combo vé với giá <InputNumberComponent handleChange={setNum2} placeholder='giá vé' /> / <InputNumberComponent handleChange={setNum3} width="50px" placeholder='giá vé' />vé</Checkbox>
          </Checkbox.Group>
        </div>
        <div className="combo-ticker__status">
          <Text>Tình trạng</Text>
          <Select defaultValue={status.COMBO_ACTIVE} onChange={handleSelectChange}> 
          <Option value={status.COMBO_ACTIVE}>Đang áp dụng</Option>
          <Option value={status.COMBO_OFF}>Tắt</Option>
          </Select>
          <Text italic><sup style={{color: 'red'}}>*</sup>là thông tin bắt buột</Text>
        </div>
      </div>
  )
}

export default AddComboTicket