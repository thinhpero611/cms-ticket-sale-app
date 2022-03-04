import React, { useState } from 'react'
import { RootState } from '../../module'
import { useSelector } from 'react-redux'
import { Button, Tabs } from 'antd'
import { BsDash } from 'react-icons/bs'
import { Content } from 'antd/lib/layout/layout'
import MainTitle from '../../shared/component/MainTitle'
import TableComponent from '../../shared/component/TableComponent'
import Text from 'antd/lib/typography/Text'
import RightFilterComponent from './RightFilterComponent'
import { IFilterTicketProps } from '../Magage/components/FilterModalComponent'
import api from '../../core/firebase'

const { TabPane } = Tabs

const ForControl = () => {
  const tickets = useSelector((state: RootState) => state.ticket)
  const [ tabKey, setTabKey ] = useState(1)
  const [ state, setState ] = useState<IFilterTicketProps>({})

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
      title: 'Tên loại vé',
      dataIndex: 'ticketType',
      key: 'ticketType',
      render: (text, record, index) => (<span>{text}</span>)
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
      render: (text, record, index) => {
        if (!record.forControlStatus) return (<Text italic>Chưa đối soát</Text>)
        if (record.forControlStatus) return (<Text type="danger" italic>Da đối soát</Text>)
      }
    }
  ]
  const column2s = [...columns]
  column2s.splice(1, 0,  { 
    title: 'Tên sự kiện', 
    dataIndex: 'event', 
    key: 'event'
  })

  const handleChangeTabKey = (key: string) => {
    setTabKey(Number(key))
  }

  return (
    <Content className="forControl-component">
      <MainTitle index={1} title="Đối soát vé " />
      <Tabs defaultActiveKey="1" onChange={handleChangeTabKey} className="table-in-tabs">
        <TabPane key="1" tab="Goi gia dinh">
          <TableComponent 
            apiServices={api.filterTicketForControl}
            hasStt={true}
            columns={columns}
            dataSource={tickets.results}
            pagination={{ total: tickets.results.length}}
            option={{ filter: state}}
            loading={!tickets.status}
            search={{ placeholder: "Tìm bằng số vé"}}
            moreButton={{ title: "Chot doi soat"}}
            exportButton={{ title: "Xuat file (.csv)"}}
          /> 
        </TabPane>
        <TabPane key="2" tab="Goi su kien">
          <TableComponent 
            apiServices={api.filterTicketForControl}
            hasStt={true}
            columns={column2s}
            dataSource={tickets.results.filter((item) => item.event !== null)}
            pagination={{ total: tickets.results.filter((item) => item.event !== null).length}}
            loading={!tickets.status}
            search={{ placeholder: "Tìm bằng số vé"}}
            moreButton={{ title: "Chot doi soat"}}
            exportButton={{ title: "Xuat file (.csv)"}}
          /> 
        </TabPane>
      </Tabs>
      <RightFilterComponent getFilter={setState} isEventTicket={tabKey == 2}/>
    </Content>
  )
}

export default ForControl