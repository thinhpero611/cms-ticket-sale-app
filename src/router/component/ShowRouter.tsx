import React, { PropsWithChildren } from 'react'
import { Route } from 'react-router-dom'
import { IRouter } from '../interface'

interface IShowRouter {
  routers: IRouter[]
  MasterLayout: React.FC<PropsWithChildren<any>>
}

const ShowRouter = ({ routers, MasterLayout}: IShowRouter) => {
  const pages = React.useMemo(() => routers.map((router: IRouter, index) => {
    // console.log(typeof MasterLayout)
    if (!MasterLayout)
      return (
        <Route
          key={router.path}
          path={router.path}
          exact={router.exact}
          component={router.component}
        />
      );
    const DynamicComponent: React.FC<any> | undefined = router.component;
    return (
      <Route
        key={router.path}
        path={router.path}
        exact={router.exact}
        component={() => (
          <MasterLayout>
            {DynamicComponent && <DynamicComponent />}
          </MasterLayout>
        )}
      />
    );
  }), [routers, MasterLayout])
  return pages
}

export default ShowRouter