import React from 'react'
import { getAllTicketAsync } from '../../module/ticket/repository'
import { RootState } from '../../module'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Radio, Row, Tag } from 'antd'
import { BsDash } from 'react-icons/bs'
import { GoPrimitiveDot } from 'react-icons/go'
import { Content } from 'antd/lib/layout/layout'
import MainTitle from '../../shared/component/MainTitle'
import RangePickerComponent from '../../shared/component/RangePickerComponent'
import TableComponent from '../../shared/component/TableComponent'
import Text from 'antd/lib/typography/Text'

const ForControl = () => {
  const tickets = useSelector((state: RootState) => state.ticket)
  const dispatch = useDispatch()

  const columns = [
    {
      title: 'Booking code',
      dataIndex: 'bookingCode',
      key: 'bookingCode'
    },
    {
      title: 'Số vé',
      dataIndex: 'ticketNumber',
      key: 'ticketNumber'
    },
  
    {
      title: 'Ngày sử dụng',
      dataIndex: 'useDate',
      key: 'useDate'
    },
    { 
      title: 'Tên sự kiện', 
      dataIndex: 'event', 
      key: 'event'
    },
    {
      title: 'Tên loại vé',
      dataIndex: 'ticketType',
      key: 'ticketType',
      render: (text, record, index) => (<span>Vé cổng</span>)
    },
    {
      title: 'Cổng check-in',
      dataIndex: 'gate',
      key: 'gate',
      render: (record) => {
        if (record) return record
        return <BsDash />
      }
    },
    {
      title: '',
      dataIndex: 'forControlStatus',
      key: 'forControlStatus',
      render: (text, record, index) => (<Text type="danger">Chưa đối soát</Text>)
    }
  ]
  
  return (
    <Content className="forControl-component">
      <Row>
        <Col span={16}>
          <MainTitle index={1} title="Đối soát vé " />
          <Button>Xuất file (.csv)</Button>
          <TableComponent 
            hasStt={true}
            columns={columns}
            dataSource={tickets.results}
            pagination={{ total: tickets.results.length}}
            loading={!tickets.status}
            search={{ placeholder: "Tìm bằng số vé"}}
          /> 
        </Col>
        <Col span={8}>
          <MainTitle index={2} title="Lọc vé" />
          <Row>
            <Col span={12}>
              <Text>Tình trạng đối soát vé</Text>
            </Col>
            <Col span={12}>
              <Radio.Group>
                <Radio>Tất cả</Radio>
                <Radio>Đã đối soát</Radio>
                <Radio>Chưa đối soát</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Text>Loại vé</Text>
          <Text>Vé Cổng</Text>
          <Text>Từ ngày</Text>
          <RangePickerComponent />
          <Text>Đến ngày</Text>
          <RangePickerComponent />
        </Col>
      </Row>
    </Content>

  )
}

export default ForControl