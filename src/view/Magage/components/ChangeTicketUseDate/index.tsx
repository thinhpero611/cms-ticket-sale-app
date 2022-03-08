import { Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useEffect, useState } from 'react'
import api from '../../../../core/firebase'
import TicketEntity from '../../../../module/ticket/entity'
import RangePickerComponent from '../../../../shared/component/DatePickerComponent'
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

interface Iprops {
  currentId: string
  isEventTicket?: boolean
}

const ChangeDateUsing: React.FC<Iprops> = ({ currentId, isEventTicket }) => {
  const [ currentVal, setCurrentVal ] = useState<TicketEntity | firebase.firestore.DocumentData>()
  console.log('currentid :', currentId, currentVal)

  useEffect(() => {
    api.ticket.fetchOne<TicketEntity>(currentId).then((data) => setCurrentVal(data))
  }, [currentId])

  return (
    <>
      <Row>
        <Col span={12}>
          <Text>Số vé</Text>
        </Col>
        <Col span={12}>
          <Text>{currentVal?.ticketNumber}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Text>Loại vé</Text>
        </Col>
        <Col span={12}>
          <Text>{currentVal?.type}</Text>
        </Col>
      </Row>
     {isEventTicket && ( <Row>
        <Col span={12}>
          <Text>Tên sự kiện</Text>
        </Col>
        <Col span={12}>
          <Text>{currentVal?.event}</Text>
        </Col>
      </Row>)}
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