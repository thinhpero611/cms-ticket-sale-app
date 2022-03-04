import React, { useEffect, useState} from 'react'
import { Anchor, Button, Modal } from 'antd'
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


const SettingComponent = () => {
  const comboTicket  = useSelector((state: RootState) => state.comboTicket)
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
      key: 'update',
      render: (text, record) => (<Text onClick={handleShowUpdateTicket}><FiEdit /> &nbsp; cap nhap</Text>)
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
        //@ts-ignore
        apiServices={api.comboTicket.createTask}
        hasStt={true}
        dataSource={comboTicket.results}
        columns={columns}
        pagination={{ total: comboTicket.results.length}}
        search={{ placeholder: "Tìm bằng mã gói vé"}}
      />
      <Button onClick={() => setIsShowModalUpdateTicket(true)}><Text underline>cập nhật</Text></Button>
    </Content>
  )
}

export default SettingComponent