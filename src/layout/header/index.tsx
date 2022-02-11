import React from 'react'
import { noImg, imgAvatar } from '../../shared/assets/images'
import { MailOutlined, BellOutlined } from '@ant-design/icons'
import SearchBar from '../../shared/component/SearchBar'

const HeaderComponent = () => {
  return (
    <div className="header-component">
      <div className="header-component__searchBar">
        <SearchBar placeholder="Search"/>
      </div>
      <div className="email">
        <MailOutlined className="icon__email"/>
      </div>
      <div className="bell">
        <BellOutlined className="icon__bell" />
      </div>
      <div className="avatar">
        <img className="avatar-img" src={imgAvatar} />
      </div>
    </div>
  )
}

export default HeaderComponent