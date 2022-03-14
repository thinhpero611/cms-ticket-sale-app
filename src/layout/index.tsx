import React, { PropsWithChildren } from 'react'
import HeaderComponent from './header'
import SideBarComponent from './sidebar'

const Layout: React.FC<PropsWithChildren<any>> = (props) => {
  return (
    <div className="all-page-component main-layout"> 
      <SideBarComponent />
      <div className="copright">
        <span>
          Copright &copy; 2022 Alta Software
        </span>
      </div>
      <div className="right-page-component">
        <HeaderComponent />
        <div className="main-component">{props.children}</div>
      </div>
    </div>
  )
}

export default Layout