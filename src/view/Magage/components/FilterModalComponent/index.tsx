import React, { useEffect, useState } from 'react'
// component
import { Checkbox, Button, Radio } from 'antd';
import RangePickerComponent from '../../../../shared/component/DatePickerComponent';
import { status } from '../../../../module/ticket/constant';
import { PaginationEntity } from '../../../../core/pagination';
import { OptionEntity } from '../../../../core/table';

// interface 
interface IProps {
  onFilterTicket?: () => void
  // filter?: IFilterTicketProps
  setFilter: (_state?: {
    pagination?: PaginationEntity | undefined;
    option?: OptionEntity | undefined;
} | undefined) => void
  isShowModal?: boolean
}

// interface
export interface IFilterTicketProps {
  startDate?: Date | string
  endDate?: Date | string
  status?: string
  gates?: Array<any>
  isDoingForControl?: string
  event?: string
}

// initial setting
const defaultCheckedList = [];
const checkboxOptions = [ 1, 2, 3, 4, 5 ];

const FilterComponent = ( props: IProps) => {
  const [state, setState] = useState<IFilterTicketProps>({ status: '', gates: defaultCheckedList})
  const [checkAll, setCheckAll] = useState(false)
  const [isDisableAll, setIsDisableAll] = useState(false)

  const handleRadioGroupChange = (e) => {
    console.log('value has been pick', e.target.value)
    setState(prev => ({ ...prev, status: e.target.value}))
  }

  const onCheckboxGroupChange = list => {
    setState(prev => ({ ...prev, gates: list}))
    if (list.length === checkboxOptions.length) {
      setCheckAll(true)
      setIsDisableAll(true)
    }
  };

  const onCheckAllChange = e => {
    setState(prev => ({
       ...prev, 
       gates: e.target.checked ? checkboxOptions : []
    })) 
    setCheckAll(e.target.checked);
    setIsDisableAll(e.target.checked)
  }
  console.log('render filter component', props.isShowModal)

  useEffect(() => {
    if (!state.status) return
    console.log('run set filter function')
    props.setFilter({ option: { filter: state}})
  }, [state, props.isShowModal])

  return (
    <>
      <div className="modal-filter-ticket-component">
        <div className="modal-filter__ticket-date">
          <p>Từ ngày</p>
            <RangePickerComponent />
          <p>Dến ngày</p>
            <RangePickerComponent />
        </div>
        <div className="modal-filter__status-ticket">
          <p>Tình trạng sử dụng</p>
          <Radio.Group onChange={handleRadioGroupChange}>
            <Radio defaultChecked value={status.ALL}>Tất cả</Radio>
            <Radio value={status.IN_USE}>Đã sử dụng</Radio>
            <Radio value={status.NOT_USE}>Chưa sử dụng</Radio>
            <Radio value={status.EXPIRED}>Hết hạn</Radio>
          </Radio.Group>
        </div>
        <div className="modal-filter__ticket-gates">
          <p>Cổng Check-In</p>
          <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          Check all
          </Checkbox>
          <Checkbox.Group 
            options={checkboxOptions} 
            onChange={onCheckboxGroupChange} 
            value={isDisableAll ? [] : state?.gates} 
            disabled={isDisableAll} 
            />
        </div>
      </div>
    </>
  )
}

export default FilterComponent