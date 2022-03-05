import { Input, Checkbox, Select, Button } from 'antd'
import React, { useState } from 'react'
import Text from 'antd/lib/typography/Text'
import { status } from '../../../../module/ticket/constant'
import DateRangePicker from '../../../../shared/component/DateRangePickerComponent'
import InputNumberComponent from '../../../../shared/component/InputNumberComponent'
import ComboTicketEntity from '../../../../module/comboTicket/entity'
import { useDispatch } from 'react-redux'
import { createComboTicket } from '../../../../module/comboTicket/repository'

const { Option } = Select

interface Iprops {
  setIsShowModalAddTicket: React.Dispatch<React.SetStateAction<boolean>>
}
const AddComboTicket: React.FC<Iprops> = ({ setIsShowModalAddTicket }) => {
  const [ state, setState ] = useState<ComboTicketEntity>({ status: true })
  const dispatch = useDispatch()
  const [ price, setPirce ] = useState<number>(0)
  const [ comboPrice, setComboPrice ] = useState<number>(0)
  const [ ticketQuantity , setTicketQuantity ] = useState<number>(0)
  console.log('add combo ticket render', state)
  const handleCheckboxChange = (list) => {
    console.log(list)
    setState(prev => ({ 
      ...prev, 
      ticketPrice: list[0], 
      comboTicketPrice: ticketQuantity ? price * ticketQuantity : 0
    }))
  }

  const handleSelectChange = (value) => {
    console.log(value)
    if (!value) return
    setState({ ...state, status: value === status.COMBO_ACTIVE })
  }
  
  const handleAddComboTicket = () => {
    if (state.ticketPackName && state.status !== undefined) {
      dispatch(createComboTicket(state))
      setIsShowModalAddTicket(false)
    }
    setIsShowModalAddTicket(false)
  }

  return (
      <div className="add-combo-ticker-card">
        <div className="combo-ticker__add-name">
          <Text>Tên gói vé<sup style={{color: 'red'}}>*</sup></Text>
          <Input onChange={(e) => setState({ ...state, ticketPackName: e.target.value})} placeholder="Nhập tên gói vé" />
        </div>
        <div className="combo-ticker__date-range-picker">
          <DateRangePicker hasTimePicker={true}  />
        </div>
        <div className="combo-ticker__price">
          <Text>Giá vé áp dụng</Text>
          <Checkbox.Group onChange={handleCheckboxChange}>
            <Checkbox value={price}>Vé lẻ (vnđ/vé) với giá <InputNumberComponent handleChange={setPirce} placeholder='giá vé' width="150px" /> / <span>vé</span></Checkbox>
            <Checkbox value={ticketQuantity && ticketQuantity* price }>
              Combo vé với giá 
              <InputNumberComponent placeholder='số vé' width="150px" /> / 
              <InputNumberComponent handleChange={setTicketQuantity} width="70px" placeholder='giá vé' /> <span>vé</span>
            </Checkbox>
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
        <div className="">
          <Button onClick={() => setIsShowModalAddTicket(false)}>Hủy</Button>,
          <Button onClick={handleAddComboTicket}>Lưu</Button>
        </div>
      </div>
  )
}

export default AddComboTicket