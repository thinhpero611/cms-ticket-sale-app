import { SettingOutlined } from '@ant-design/icons'
import SettingComponent from '.'
import { IRouter } from '../../router/interface'

export const routerSetting: IRouter = {
  path: "/setting",
  component: SettingComponent,
  exact: true,
  menu: {
    icon: SettingOutlined
  },
  name: "Cài đặt"
}