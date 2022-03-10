import React, { useEffect, useState} from 'react'
import {  Button, Modal, Tag } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../module'
import MainTitle from '../../shared/component/MainTitle'
import TableComponent from '../../shared/component/TableComponent'
import AddComboTicket from './component/AddComboTicket'
import UpdateComboTicket from './component/UpdateComboTicket'
import { FiEdit } from 'react-icons/fi'
import Text from 'antd/lib/typography/Text'
import api from '../../core/firebase'
import { status } from '../../module/ticket/constant'
import { GoPrimitiveDot } from 'react-icons/go'
import { createComboTicket, getAllComboTicketAsync } from '../../module/comboTicket/repository'
import ComboTicketEntity from '../../module/comboTicket/entity'

const initialState = { status: true, price: 0}

const SettingComponent = () => {
  const comboTickets  = useSelector((state: RootState) => state.comboTicket)
  const [ comboTicket, setComboTicket ] = useState<ComboTicketEntity>(initialState)
  const [ isShowModalAddTicket, setIsShowModalAddTicket ] = useState(false)
  const [ isShowModalUpdateTicket, setIsShowModalUpdateTicket ] = useState(false)
  const [ currentId, setCurrentId ] = useState('0')

  const dispatch = useDispatch()

  // get data from fireabse
  useEffect(() => {
    dispatch(getAllComboTicketAsync())
  }, [dispatch])
// console.log(comboTickets.results, comboTicket)
  const columns = [
    {
      title: 'Mã gói',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Tên gói vé',
      dataIndex: 'packName',
      key: 'packName'
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'useDate',
      key: 'useDate'
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'outDate',
      key: 'outDate'
    },
    {
      title: 'Giá vé (VND/Vé)',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice'
    },
    {
      title: 'Giá Combo (VNĐ/Combo)',
      dataIndex: 'comboPrice',
      key: 'comboPrice',
      render: (text, record) => <Text>{text + ' VNĐ'}/{record.comboPrice /record.ticketPrice} vé</Text>
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (text === true) 
          return (<div className="my-tag ant-green-tag" color={"success"}><GoPrimitiveDot /> <span>{status.COMBO_ACTIVE}</span></div>)
        else  
          return (<div className="my-tag ant-red-tag"  style={{ width: '70px' }} color="volcano"><GoPrimitiveDot /> <span>{status.COMBO_OFF}</span></div>)
      }
    },
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
      render: (text, record) => (<Text className="update-combo-ticket" key={record.id} type='danger' onClick={handleShowUpdateTicket}><FiEdit /> &nbsp; cập nhập</Text>)
    }
  ]

  const hanleShowAddComboTicket = () => {
    setIsShowModalAddTicket(true)
  }

  const handleShowUpdateTicket = () => {
    setIsShowModalUpdateTicket(true)
  }

  const handleUpdateTicket = () => {
    setIsShowModalUpdateTicket(false)
  }
  
  const handleAddComboTicket = () => {
    if (comboTicket.ticketPackName && comboTicket.status !== undefined) {
      dispatch(createComboTicket(comboTicket))
      setComboTicket(initialState)
      setIsShowModalAddTicket(false)
    }
    setIsShowModalAddTicket(false)
  }

  return (
    <div className="setting-component">
      <MainTitle index={1} title="Danh sách gói vé" className="title-in-setting-router"/>
      <Button className="export-file-btn" >Xuất file (.csv)</Button>
      <Button className="add-combo-ticket-btn" onClick={hanleShowAddComboTicket}>Thêm gói vé</Button>
      <Modal title="Thêm gói vé" key="1"
        className="modal-add-combo-ticket my-modal-item"
        visible={isShowModalAddTicket}
        onCancel={() => setIsShowModalAddTicket(false)}
        onOk={() => setIsShowModalAddTicket(false)}
        footer={[
          <Button onClick={() => setIsShowModalUpdateTicket(false)}>Hủy</Button>,
          <Button onClick={handleAddComboTicket}>Lưu</Button>
        ]}
      >
        <AddComboTicket  comboTicket={comboTicket} setComboTicket={setComboTicket} />
      </Modal>
      <Modal title="Cập nhập thông gói vé" key="2"
        className="modal-update-combo-ticket my-modal-item"
        visible={isShowModalUpdateTicket}
        onCancel={() => setIsShowModalUpdateTicket(false)}
        onOk={() => setIsShowModalUpdateTicket(false)}
        footer={[
          <Button onClick={() => setIsShowModalUpdateTicket(false)}>Hủy</Button>,
          <Button onClick={handleUpdateTicket}>Lưu</Button>
        ]}
      >
        <UpdateComboTicket currentId={currentId} />
      </Modal>
      <TableComponent 
        hasStt={true}
        dataSource={comboTickets.results}
        columns={columns}
        pagination={{ total: comboTickets.results.length}}
        search={{ placeholder: "Tìm bằng mã gói vé"}}
        setCurrentId={setCurrentId}
      />
    </div>
  )
}

export default SettingComponent