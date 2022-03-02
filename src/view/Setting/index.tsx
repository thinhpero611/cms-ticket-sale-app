import React, { useEffect, useState} from 'react'
import { Button, Modal, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../module'
import { getAllTicketAsync } from '../../module/ticket/repository'
import MainTitle from '../../shared/component/MainTitle'
import TableComponent from '../../shared/component/TableComponent'
import AddComboTicket from './component/AddComboTicket'
import UpdateComboTicket from './component/UpdateComboTicket'

const { Text } = Typography

const SettingComponent = () => {
  const ticket  = useSelector((state: RootState) => state.ticket)
  const dispatch = useDispatch()
  const [ isShowModalAddTicket, setIsShowModalAddTicket ] = useState(false)
  const [ isShowModalUpdateTicket, setIsShowModalUpdateTicket ] = useState(false)

  const columns = [
    {
      title: 'Mã gói',
      dataIndex: 'packCode',
      key: 'packCode'
    },
    {
      title: 'Tên gói vé',
      dataIndex: 'ticketPackName',
      key: 'ticketPackName'
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
      dataIndex: 'comboTicketPrice',
      key: 'comboTicketPrice'
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '',
      dataIndex: 'update',
      key: 'update'
    }
  ]

  const hanleShowAddComboTicket = () => {
    setIsShowModalAddTicket(true)
  }
  const handleUpdateTicket = () => {
    setIsShowModalUpdateTicket(false)
  }

  const handleAddComboTicket = () => {
    setIsShowModalAddTicket(false)
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
        footer={[
          <Button onClick={() => setIsShowModalAddTicket(false)}>Hủy</Button>,
          <Button onClick={handleAddComboTicket}>Lưu</Button>
        ]}
      >
        <AddComboTicket />
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
        dataSource={ticket.results}
        columns={columns}
        pagination={{ total: ticket.results.length}}
        search={{ placeholder: "Tìm bằng mã gói vé"}}
        loading={!ticket.status}
      />
      <Button onClick={() => setIsShowModalUpdateTicket(true)}><Text underline>cập nhật</Text></Button>
    </Content>
  )
}

export default SettingComponent