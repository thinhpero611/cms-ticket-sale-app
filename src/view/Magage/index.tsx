import React, { useEffect, useMemo, useState } from 'react'
// redux-store
import { useDispatch, useSelector } from 'react-redux'
import { getAllEventTicketAsync, getAllFamilyTicketAsync, getAllTicketAsync, getFilterTicketAsync } from '../../module/ticket/repository'
import { RootState } from '../../module'
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
// constants
import { status } from '../../module/ticket/constant'

const { TabPane } = Tabs

// interface
export interface IFilterTicketProps {
  startDate?: Date | string
  endDate?: Date | string
  status?: string
  gates?: Array<any>
}

// initial setting
const defaultCheckedList = [];

const ManageTicket = () => {
  const ticket = useSelector((state: RootState) => state.ticket)
  const dispatch = useDispatch()
  const [state, setState] = useState<IFilterTicketProps>({ status: '', gates: defaultCheckedList})
  const [ tabKey, setTabKey ] = useState(1)
  const [ isShowModal, setIsShowModal ] = useState<boolean>(false)
  
  // get data from fireabse
  useEffect(() => {
    // if (tabKey === 1) dispatch(getAllFamilyTicketAsync())
    // else {
    //   dispatch(getAllEventTicketAsync)
    //   console.log('event ticket')
    // }
    dispatch(getAllTicketAsync())
  }, [dispatch, tabKey])
  
  console.log('data', ticket.results)

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
    if (state.status == status.ALL) {
      // if (tabKey === 1) dispatch(getAllFamilyTicketAsync())
      // else {
      //   dispatch(getAllEventTicketAsync)
      //   console.log('event ticket')
      // }
      dispatch(getAllTicketAsync())
      setIsShowModal(false)
      return
    }
    dispatch(getFilterTicketAsync(state))
    setIsShowModal(false)
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
          <TableComponent 
            hasStt={true} 
            pagination={{ total: ticket.results.length }}
            dataSource={ticket.results} 
            columns={columns} 
            search={{ placeholder: 'Tìm bằng số vé'}}
            loading={!ticket.status}
          />
        </TabPane>
        <TabPane tab="Gói sự kiện" key="2" className="event-packs">
          <TableComponent 
            hasStt={true} 
            pagination={{ total: ticket.results.length }}
            dataSource={ticket.results} 
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