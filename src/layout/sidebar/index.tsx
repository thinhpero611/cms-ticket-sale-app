import React, { PropsWithChildren } from 'react'
import { logo } from '../../shared/assets/images'

const SideBarComponent: React.FC<PropsWithChildren<any>> = ( props) => {
  return (
    <div className="sider-component">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="mask">
        {props.children}
      </div>
    </div>
  )
}

export default SideBarComponent