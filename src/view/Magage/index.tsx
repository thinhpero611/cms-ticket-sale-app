import React from 'react'
// components
import { Content } from 'antd/lib/layout/layout'
import MainTitle from '../../shared/component/MainTitle'
import { Tabs } from 'antd'
import SearchBar from '../../shared/component/SearchBar'
// styles

const { TabPane } = Tabs

const ManageTicket = () => {
  const handleTabOnChange = (key) => {
    console.log(key)
  }
  return (
    <Content className="manage-component">
      <MainTitle title="Danh sách vé" index={1} />
      <Tabs defaultActiveKey="1" onChange={handleTabOnChange} >
        <TabPane tab="Gói gia đình" key="1" className="family-packs">
          <SearchBar placeholder="Tìm bằng số vé" />
          
        </TabPane>
        <TabPane tab="Gói sự kiện" key="2" className="event-packs">
          <SearchBar placeholder="Tìm bằng số vé" />
        </TabPane>
      </Tabs>
    </Content>
  )
}

export default ManageTicket