import React, { useState } from 'react'
// component
import { Checkbox, Button, Radio } from 'antd';
import { IFilterTicketProps } from '../..';
import RangePickerComponent from '../../../../shared/component/RangePickerComponent';
import { status } from '../../../../module/ticket/constant';

// interface 
interface IProps {
  onFilterTicket?: () => void
  filter?: IFilterTicketProps
  setFilter: (value: React.SetStateAction<IFilterTicketProps>) => void
}

const checkboxOptions = [ 1, 2, 3, 4, 5];

const FilterComonent = ( props: IProps) => {
  const [checkAll, setCheckAll] = useState(false)
  const [isDisableAll, setIsDisableAll] = useState(false)

  const handleRadioGroupChange = (e) => {
    console.log('value has been pick', e.target.value)
    props.setFilter(prev => ({ ...prev, status: e.target.value}))
  }

  const onCheckboxGroupChange = list => {
    props.setFilter(prev => ({ ...prev, gates: list}))
    if (list.length === checkboxOptions.length) {
      setCheckAll(true)
      setIsDisableAll(true)
    }
  };

  const onCheckAllChange = e => {
    props.setFilter(prev => ({
       ...prev, 
       gates: e.target.checked ? checkboxOptions : []
    })) 
    setCheckAll(e.target.checked);
    setIsDisableAll(e.target.checked)
  }

  return (
    <>
      <p>Từ ngày</p>
        <RangePickerComponent />
      <p>Dến ngày</p>
        <RangePickerComponent />
      <p>Tình trạng sử dụng</p>
      <Radio.Group onChange={handleRadioGroupChange}>
        <Radio defaultChecked value={status.ALL}>Tất cả</Radio>
        <Radio value={status.IN_USE}>Đã sử dụng</Radio>
        <Radio value={status.NOT_USE}>Chưa sử dụng</Radio>
        <Radio value={status.EXPIRED}>Hết hạn</Radio>
      </Radio.Group>
      <p>Cổng Check-In</p>
      <Checkbox onChange={onCheckAllChange} checked={checkAll}>
      Check all
      </Checkbox>
      <Checkbox.Group 
        options={checkboxOptions} 
        onChange={onCheckboxGroupChange} 
        value={isDisableAll ? [] : props?.filter?.gates} 
        disabled={isDisableAll} 
      />
    </>
  )
}

export default FilterComonent