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
import { getAllComboTicketAsync } from '../../module/comboTicket/repository'


const SettingComponent = () => {
  const comboTicket  = useSelector((state: RootState) => state.comboTicket)
  const [ isShowModalAddTicket, setIsShowModalAddTicket ] = useState(false)
  const [ isShowModalUpdateTicket, setIsShowModalUpdateTicket ] = useState(false)

  const dispatch = useDispatch()

  // get data from fireabse
  useEffect(() => {
    dispatch(getAllComboTicketAsync())
  }, [dispatch])

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
          return (<Tag color={"success"}><GoPrimitiveDot /> {status.COMBO_ACTIVE}</Tag>)
        else  
          return (<Tag color="volcano"><GoPrimitiveDot /> {status.COMBO_OFF}</Tag>)
      }
    },
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
      render: (text, record) => (<Text type='danger' onClick={handleShowUpdateTicket}><FiEdit /> &nbsp; cập nhập</Text>)
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
  
  return (
    <Content className="setting-component">
      <MainTitle index={1} title="Danh sách gói vé" />
      <Button>Xuất file (.csv)</Button>
      <Button onClick={hanleShowAddComboTicket}>Thêm gói vé</Button>
      <Modal title="Thêm gói vé"
        visible={isShowModalAddTicket}
        onCancel={() => setIsShowModalAddTicket(false)}
        onOk={() => setIsShowModalAddTicket(false)}
        footer={[]}
      >
        <AddComboTicket setIsShowModalAddTicket={setIsShowModalUpdateTicket} />
      </Modal>
      <Modal title="Cập nhập thông gói vé"
        visible={isShowModalUpdateTicket}
        onCancel={() => setIsShowModalUpdateTicket(false)}
        onOk={() => setIsShowModalUpdateTicket(false)}
        footer={[
          <Button onClick={() => setIsShowModalUpdateTicket(false)}>Hủy</Button>,
          <Button onClick={handleUpdateTicket}>Lưu</Button>
        ]}
      >
        <UpdateComboTicket />
      </Modal>
      <TableComponent 
        hasStt={true}
        dataSource={comboTicket.results}
        columns={columns}
        pagination={{ total: comboTicket.results.length}}
        search={{ placeholder: "Tìm bằng mã gói vé"}}
      />
    </Content>
  )
}

export default SettingComponent