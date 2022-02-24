import React, { memo, PropsWithChildren } from 'react'
import { publicRouter } from '../../router';
import { IRouter } from '../../router/interface';
import { logo } from '../../shared/assets/images'
import Item from './MenuItem';

interface IRenderMenuProps {
  listNav: Array<IRouter>;
  location?: string;
}

const _RenderMenu: React.FC<IRenderMenuProps> = ({ listNav, location }: IRenderMenuProps) => {
  return (
    <>
      {listNav.map((item: IRouter, index) => {
        if (item.menu == null || item.menu?.hideInNavbar) {
          return <React.Fragment key={index}> no menu</React.Fragment>;
        } else {
          console.log('render menu')
          return <Item data={item} key={index} />;
        }
      })}
    </>
  );
};

const RenderMenu = memo(_RenderMenu);

const SideBarComponent = () => {
  return (
    <div className="sider-component">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="mask">
        <RenderMenu listNav={publicRouter} />
      </div>
    </div>
  )
}

export default memo(SideBarComponent)
