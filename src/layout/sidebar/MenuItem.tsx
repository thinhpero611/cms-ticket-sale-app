import React, { memo, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLocation, matchPath } from 'react-router-dom';
import { IRouter } from '../../router/interface'

interface IMenu {
  data: IRouter;
  activePath?: string
}

const Item: React.FC<IMenu> = (props: IMenu) => {
  const item = props.data;
  const location = useLocation();
  const active = useMemo(() => {
    return matchPath(location.pathname, { path: item.path, exact: item.exact }) ? "menu-active" : "";
  }, [location.pathname]);

  console.log("active nav item", active)

  return (
    <div className={`menu--component--item ${active}`}>
      <Link to={item.path} >
        <span className="item-hover__icon">{item?.menu?.icon}</span>
        <span className="item__nav">
          <FormattedMessage
          id={item.name}
          defaultMessage={item.name}
          /> 
        </span>
      </Link>
    </div>
  );
};

export default memo(Item);