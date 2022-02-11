import React from 'react';
// component
import { Menu } from 'antd'
// icons
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { PaperListIcon, TicketIcon } from '../../assets/icon'

const LeftMenu = () => {
  return (
    <Menu className="ant-menu-layout" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key={1}>
          <HomeOutlined />Trang chủ
        </Menu.Item>
        <Menu.Item key={2}>
          <TicketIcon />
            Quản lý vé
        </Menu.Item>
        <Menu.Item key={3}>
          <PaperListIcon />
            Đối soát vé
        </Menu.Item>
        <Menu.Item key={4}>
            <SettingOutlined /> Cài Đặt
        </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
