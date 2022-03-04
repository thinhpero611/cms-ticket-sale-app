import { Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import RangePickerComponent from '../../../../shared/component/DatePickerComponent'

const ChangeDateUsing = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Text>Số vé</Text>
        </Col>
        <Col span={12}>
          <Text>sdfsdfhsdf</Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Text>Loại vé</Text>
        </Col>
        <Col span={12}>
          <Text>Vé cổng - gói sự kiện</Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Text>Tên sự kiện</Text>
        </Col>
        <Col span={12}>
          <Text>Will AI invade human civilization</Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Text>Hạn sử dụng</Text>
        </Col>
        <Col span={12}>
          <RangePickerComponent />
        </Col>
      </Row>
    </>
  )
}

export default ChangeDateUsing