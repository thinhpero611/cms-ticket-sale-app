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
import ExportFile from '../../shared/component/ExportFile'
import EnableTicketButton from '../../shared/component/EnableTicketButton'

const { TabPane } = Tabs

const ForControl = () => {
  const tickets = useSelector((state: RootState) => state.ticket)
  const [ tabKey, setTabKey ] = useState(1)
  const [ state, setState ] = useState<IFilterTicketProps>({ isDoingForControl: 'all'})
  console.log(state)
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
      dataIndex: 'type',
      key: 'type',
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
      dataIndex: 'isDoingForControlTicket',
      key: 'isDoingForControlTicket',
      render: (text, record, index) => {
        if (!text) return (<Text italic>Chưa đối soát</Text>)
        if (text) return (<Text type="danger" italic>Da đối soát</Text>)
      
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
          {state.isDoingForControl && (<ExportFile className={""} title={"Xuất file (.csv)"} />)}
          {!state.isDoingForControl && (<EnableTicketButton className={""} title={"Chốt đối soát"} />)}
          <TableComponent 
            apiServices={api.ticket.filterTicketForControl}
            hasStt={true}
            columns={columns}
            dataSource={tickets.results}
            pagination={{ total: tickets.results.length}}
            option={{ filter: {...state}}}
            loading={!tickets.status}
            search={{ placeholder: "Tìm bằng số vé"}}
            /> 
        </TabPane>
        <TabPane key="2" tab="Goi su kien">
          {state.isDoingForControl && (<ExportFile className={""} title={"Xuất file (.csv)"} />)}
          {!state.isDoingForControl && (<EnableTicketButton className={""} title={"Chốt đối soát"} />)}
          <TableComponent 
            apiServices={api.ticket.filterTicketForControl}
            hasStt={true}
            columns={column2s}
            dataSource={tickets.results.filter((item) => item.event !== null)}
            pagination={{ total: tickets.results.filter((item) => item.event !== null).length}}
            option={{ filter: {...state}}}
            loading={!tickets.status}
            search={{ placeholder: "Tìm bằng số vé"}}
          /> 
        </TabPane>
      </Tabs>
      <RightFilterComponent getFilter={setState} isEventTicket={tabKey == 2}/>
    </Content>
  )
}

export default ForControl