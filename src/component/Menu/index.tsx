import React from 'react';
import { Menu } from 'antd'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'

const LeftMenu = () => {
  return (
    <Menu className="ant-menu-layout" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key={1}>
        <HomeOutlined />Trang chủ
        </Menu.Item>
        <Menu.Item key={2}>
            Quản lý vé
        </Menu.Item>
        <Menu.Item key={3}>
            Đối soát vé
        </Menu.Item>
        <Menu.Item key={4}>
            <SettingOutlined />Cài Đặt
        </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
