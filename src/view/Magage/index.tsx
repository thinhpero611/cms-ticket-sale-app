import React, { useEffect, useMemo, useState } from 'react'
// redux-store
import { useDispatch, useSelector } from 'react-redux'
import { getAllTicketAsync, getFilterTicketAsync } from '../../module/ticket/repository'
import { RootState } from '../../module'
// components
import { Content } from 'antd/lib/layout/layout'
import MainTitle from '../../shared/component/MainTitle'
import { Button, Modal, Tabs, Tag } from 'antd'
import TableComponent from '../../shared/component/TableComponent'
// icons
import { GoPrimitiveDot } from 'react-icons/go'
import { BsDash } from 'react-icons/bs'
// constants
import { status } from '../../module/ticket/constant'
import api from '../../core/firebase'
import FilterButton from './components/FilterButton'
import ExportFile from '../../shared/component/ExportFile'

const { TabPane } = Tabs

const ManageTicket = () => {
  const ticket = useSelector((state: RootState) => state.ticket)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllTicketAsync())
  }, [dispatch])

  const [ tabKey, setTabKey ] = useState(1)

  const handleTabOnChange = (key: string) => {
    console.log(key)
    setTabKey(Number(key))
  }
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
      title: 'Tình trạng sử dụng',
      dataIndex: 'status',
      key: 'status',
      render: (record) => {
        let color= ''
        let message = ''
        switch(record) {
          case status.IN_USE: color = ''; message = 'Đã sử dụng'; break
          case status.EXPIRED: color = 'volcano'; message = 'Hết hạn'; break
          case status.NOT_USE: color = 'success'; message = 'Chưa sử dụng'; break
        }
        return (
          <Tag color={color}><GoPrimitiveDot /> &nbsp; {message}</Tag>
        )
      }
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: 'useDate',
      key: 'useDate'
    },
    {
      title: 'Ngày xuất vé',
      dataIndex: 'outDate',
      key: 'outDate'
    },
    {
      title: 'Cổng check-in',
      dataIndex: 'gate',
      key: 'gate',
      render: (record) => {
        if (record) return record
        return <BsDash />
      }
    }
  ]

  // for event packs
  const column2s = [...columns]
  column2s.splice(2, 0, { title: 'Tên sự kiện', dataIndex: 'event', key: 'event'})

  return (
    <Content className="manage-component">
      <MainTitle title="Danh sách vé" index={1} />
      
      <Tabs defaultActiveKey="1" onChange={handleTabOnChange} >
        <TabPane tab="Gói gia đình" key="1" className="family-packs">
          <ExportFile className={""} title={"Xuất file (.csv)"} />
          <TableComponent 
            apiServices={api.ticket.filterTicket}
            hasStt={true} 
            pagination={{ total: ticket.results.length }}
            dataSource={ticket.results} 
            columns={columns} 
            search={{ placeholder: 'Tìm bằng số vé'}}
            filterButton={{ title: 'Lọc'}}
            loading={!ticket.status}
          />
        </TabPane>
        <TabPane tab="Gói sự kiện" key="2" className="event-packs">
          <ExportFile className={""} title={"Xuất file (.csv)"} />
          <TableComponent 
            apiServices={api.ticket.filterTicket}
            hasStt={true} 
            pagination={{ total: ticket.results.filter((item) => item.event != null).length }}
            dataSource={ticket.results.filter((item) => item.event != null)} 
            columns={column2s} 
            search={{ placeholder: 'Tìm bằng số vé'}}
            loading={!ticket.status}
          />
        </TabPane>
      </Tabs>
    </Content>
  )
}

export default ManageTicket
