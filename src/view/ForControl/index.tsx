import React, { useEffect, useState } from 'react'
import { RootState } from '../../module'
import { useDispatch, useSelector } from 'react-redux'
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
import data2 from '../Magage/data2'
import DashComponent from '../../shared/component/DashComponent'
import { getAllTicketAsync } from '../../module/ticket/repository'

const { TabPane } = Tabs

const ForControl = () => {
  const tickets = useSelector((state: RootState) => state.ticket)
  const [ tabKey, setTabKey ] = useState(1)
  const [ state, setState ] = useState<IFilterTicketProps>({ isDoingForControl: 'all'})
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getAllTicketAsync())
  }, [dispatch])

  console.log(tickets.results)
  const columns = [
    {
      title: 'Booking code',
      dataIndex: 'bookingCode',
      key: 'bookingCode'
    },
    {
      title: 'Số vé',
      dataIndex: 'ticketNumber',
      key: 'ticketNumber',
      render: (record) => record ? record : <DashComponent />
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
      render: (text, record, index) => text ? (<span>{text}</span>) : <DashComponent />
    },
    {
      title: 'Cổng check-in',
      dataIndex: 'gate',
      key: 'gate',
      render: (record) => record ? record : <DashComponent />
    },
    {
      title: '',
      dataIndex: 'isDoingForControlTicket',
      key: 'isDoingForControlTicket',
      render: (text, record, index) => {
        if (!text) return (<Text italic>Chưa đối soát</Text>)
        if (text) return (<Text type="danger" italic>Đã đối soát</Text>)
      
      }
    }
  ]
  const column2s = [...columns.slice(1, columns.length)]
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
      <div className="column-3">
        <MainTitle index={1} title="Đối soát vé" />
        {state.isDoingForControl && state.isDoingForControl !== 'all' && (<ExportFile className={"export-file-btn"} title={"Xuất file (.csv)"} />)}
        {!state.isDoingForControl && (<EnableTicketButton className={"enable-ticket-btn"} title={"Chốt đối soát"} />)}
        <Tabs defaultActiveKey="1" onChange={handleChangeTabKey} className="main-tab">
          <TabPane key="1" tab="Gói gia đình">
            {/*@ts-ignore */}
            <TableComponent 
              // apiServices={api.ticket.filterTicketForControl}
              hasStt={true}
              columns={columns}
              dataSource={tickets.results}
              pagination={{ total: tickets.results.length, pageSize: 9 }}
              option={{ filter: {...state}}}
              loading={!tickets.status}
              search={{ placeholder: "Tìm bằng số vé"}}
              /> 
          </TabPane>
          <TabPane key="2" tab="Gói sự kiện">
            {/*@ts-ignore */}
            <TableComponent 
              // apiServices={api.ticket.filterTicketForControl}
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
      </div>
      <div className="column-1">
        <RightFilterComponent getFilter={setState} isEventTicket={tabKey == 2}/>
      </div>
    </Content>
  )
}

export default ForControl