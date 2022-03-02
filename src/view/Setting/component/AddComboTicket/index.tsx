import { Col, Input, Row, TimePicker, Checkbox, InputNumber, Select } from 'antd'
import React from 'react'
import Text from 'antd/lib/typography/Text'
import RangePickerComponent from '../../../../shared/component/RangePickerComponent'

const { Option } = Select

const AddComboTicket = () => {
  return (
    <>
      <Text>Tên gói vé</Text>
      <Input placeholder="Nhập tên gói vé" />
      <Row>
        <Col span={12}>
          <Text>Ngày áp dụng</Text>
          <RangePickerComponent />
          <TimePicker onChange={(key) => console.log(key)} />
        </Col>
        <Col span={12}>
          <Text>Ngày hết hạn</Text>
          <RangePickerComponent />
          <TimePicker onChange={(key) => console.log(key)} />
        </Col>
      </Row>
      <Text>Giá vé áp dụng</Text>
      <Checkbox.Group>
        <Checkbox>Vé lẻ (vnđ/vé) với giá <InputNumber placeholder='giá vé' /> / vé</Checkbox>
        <Checkbox>Combo vé với giá <InputNumber placeholder='giá vé' /> / <InputNumber width="50px" placeholder='giá vé' />vé</Checkbox>
      </Checkbox.Group>
      <Text>Tình trạng</Text>
      <Select defaultValue="Đang áp dụng"> 
        <Option value="Đang áp dụng">Đang áp dụng</Option>
        <Option value="Tắt">Tắt</Option>
      </Select>
      <Text italic>là thông tin bắt buột</Text>
    </>
  )
}

export default AddComboTicket