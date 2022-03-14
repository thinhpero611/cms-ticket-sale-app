import React, { useEffect, useMemo, useState } from 'react'
import data from './data2'
// api
import api from '../../core/firebase'
// redux-store
import { useDispatch, useSelector } from 'react-redux'
import { getAllTicketAsync } from '../../module/ticket/repository'
import { RootState } from '../../module'
// components
import { Content } from 'antd/lib/layout/layout'
import MainTitle from '../../shared/component/MainTitle'
import { Button, Modal, Tabs, Tag } from 'antd'
import TableComponent from '../../shared/component/TableComponent'
import ExportFile from '../../shared/component/ExportFile'
import ChangeDateUsing from './components/ChangeTicketUseDate'
// icons
import { GoPrimitiveDot } from 'react-icons/go'
import { BsDash } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
// constants
import { status } from '../../module/ticket/constant'
import DashComponent from '../../shared/component/DashComponent'

const { TabPane } = Tabs

const ManageTicket = () => {
  const ticket = useSelector((state: RootState) => state.ticket)
  const [ isShowModal, setIsShowModal ] = useState(false)
  const [ currentId, setCurrentId ] = useState('0')
  const [ tabKey, setTabKey ] = useState(1)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllTicketAsync())
  }, [dispatch])

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
      key: 'ticketNumber',
      render: (record) => record ? record : <DashComponent />
    },
    {
      title: 'Tình trạng sử dụng',
      dataIndex: 'status',
      key: 'status',
      render: (record) => {
        let message = ''
        let className = ''
        switch(record) {
          case status.IN_USE:  message = 'Đã sử dụng'; className = ''; break
          case status.EXPIRED: message = 'Hết hạn'; className = 'ant-red-tag'; break
          case status.NOT_USE: message = 'Chưa sử dụng'; className = 'ant-green-tag'; break
          default: return <DashComponent />
        }
        return (
          <div className={className + " my-tag"} ><GoPrimitiveDot size="26px"/> <span>{message}</span></div>
        )
      }
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: 'useDate',
      key: 'useDate',
      render: (record) => record ? record : <DashComponent />
    },
    {
      title: 'Ngày xuất vé',
      dataIndex: 'outDate',
      key: 'outDate',
      render: (record) => record ? record : <DashComponent />
    },
    {
      title: 'Cổng check-in',
      dataIndex: 'gate',
      key: 'gate',
      render: (record) => record ? record : <DashComponent />
    }, 
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
      className: 'update-ticket',
      render: (text, record) => {
        if (record.status === status.NOT_USE) return (<div onClick={handleShowChangeDateModal}><BiDotsVerticalRounded size="24px" /></div>)
      }
    }
  ]

  // for event packs
  const column2s = [...columns]
  column2s.splice(2, 0, { title: 'Tên sự kiện', dataIndex: 'event', key: 'event',  render: (record) => record ? record : <DashComponent />})

  const handleShowChangeDateModal = () => {
    setIsShowModal(true)
  }
  return (
    <Content className="manage-component">
      <MainTitle className="manage-title" title="Danh sách vé" index={1} />
      <ExportFile className="export-file-btn" title={"Xuất file (.csv)"} />
      <Tabs defaultActiveKey="1" onChange={handleTabOnChange} className="main-tab">
        <TabPane tab="Gói gia đình" key="1" className="family-packs">
          <TableComponent 
            apiServices={api.ticket.filterTicket}
            hasStt={true} 
            pagination={{ total: ticket.results.length, pageSize: 9 }}
            dataSource={ ticket.results} 
            columns={columns} 
            search={{ placeholder: 'Tìm bằng số vé'}}
            filterButton={{ title: 'Lọc'}}
            loading={!ticket.status}
            setCurrentId={setCurrentId}
          />
        </TabPane>
        <TabPane tab="Gói sự kiện" key="2" className="event-packs">
          <TableComponent 
            apiServices={api.ticket.filterTicket}
            hasStt={true} 
            pagination={{ total: ticket.results.filter((item) => item.event != '').length, pageSize: 9}}
            dataSource={ticket.results.filter((item) => item.event != '')} 
            columns={column2s} 
            search={{ placeholder: 'Tìm bằng số vé'}}
            filterButton={{ title: 'Lọc'}}
            loading={!ticket.status}
            setCurrentId={setCurrentId}
          />
        </TabPane>
      </Tabs>
      <Modal 
        key="4"
        title="Đổi ngày sử dụng vé"
        className="modal-update-ticket"
        visible={isShowModal}
        onCancel={() => setIsShowModal(false)}
        onOk={() => setIsShowModal(false)}
        footer={[
          <Button onClick={() => setIsShowModal(false)}>Hủy</Button>,
          <Button onClick={() => setIsShowModal(false)}>Lưu</Button>
        ]}>
          <ChangeDateUsing currentId={currentId} isEventTicket={tabKey === 2}/>
        </Modal>
    </Content>
  )
}

export default ManageTicket
