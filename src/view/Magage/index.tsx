import React, { useState } from 'react'
import data from './data'
import data2 from './data2'
// components
import { Content } from 'antd/lib/layout/layout'
import MainTitle from '../../shared/component/MainTitle'
import { Button, Modal, Tabs, Tag } from 'antd'
import TableComponent from '../../shared/component/TableComponent'
// icons
import { FiFilter } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'
import { BsDash } from 'react-icons/bs'
import FilterComonent from './components/FilterComponent'

const { TabPane } = Tabs

// interface
export interface IFilterTicketProps {
  startDate?: Date
  endDate?: Date
  status?: string
  gates?: Array<any>
}

// initial setting
const defaultCheckedList = [1];

const ManageTicket = () => {
  const [state, setState] = useState<IFilterTicketProps>({ status: '', gates: defaultCheckedList})
  const [ tabKey, setTabKey ] = useState(1)
  const [ isShowModal, setIsShowModal ] = useState<boolean>(false)

  const handleTabOnChange = (key: string) => {
    console.log(key)
    setTabKey(Number(key))
  }
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Booking code',
      dataIndex: 'bookingCode',
      key: 'bookingCode'
    },
    {
      title: 'Số vé',
      dataIndex: 'ticket',
      key: 'ticket'
    },
    {
      title: 'Tình trạng sử dụng',
      dataIndex: 'status',
      key: 'status',
      render: (record) => {
        let color= ''
        switch(record) {
          case 'da su dung': color = ''; break
          case 'het han': color = 'volcano'; break
          case 'chua su dung': color = 'success'; break
        }
        return (
          <Tag color={color}><GoPrimitiveDot /> &nbsp; {record}</Tag>
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
  column2s.splice(3, 0, { title: 'Tên sự kiện', dataIndex: 'event', key: 'event'})

  const handleShowModal = () => {
    setIsShowModal(true)
  }

  const handleOk = () => {
    setIsShowModal(false);
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };

  const handleFilterTicket = () => {
    console.log(state)
    switch(state.status) {
      case 'expired': 
        data.filter(i => i.status !== 'het han')
        break;
    }
    setIsShowModal(false);
  }

  return (
    <Content className="manage-component">
      <MainTitle title="Danh sách vé" index={1} />
      <Button onClick={handleShowModal}><FiFilter /> &nbsp; Lọc vé</Button>
      <Button><FiFilter /> &nbsp; Xuất file (.csv)</Button>
      <Modal title="Lọc vé" 
        visible={isShowModal} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        footer={[ <Button onClick={handleFilterTicket}>Lọc</Button>]}
      >
       <FilterComonent 
        filter={state} 
        setFilter={setState} 
      />
      </Modal>
      
      <Tabs defaultActiveKey="1" onChange={handleTabOnChange} >
        <TabPane tab="Gói gia đình" key="1" className="family-packs">
          <TableComponent dataSource={data} columns={columns} search={{ placeholder: 'Tìm bằng số vé'}} />
        </TabPane>
        <TabPane tab="Gói sự kiện" key="2" className="event-packs">
          <TableComponent dataSource={data2} columns={column2s} search={{ placeholder: 'Tìm bằng số vé'}}/>
        </TabPane>
      </Tabs>
    </Content>
  )
}

export default ManageTicket