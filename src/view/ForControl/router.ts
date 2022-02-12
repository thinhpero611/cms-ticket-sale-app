import ForControl from '.'
import { IRouter } from '../../router/interface'
import { PaperListIcon, TicketIcon } from '../../shared/assets/icon'

export const routerForControl: IRouter = {
  path: "/forControl",
  component: ForControl,
  exact: true,
  menu: {
    icon: PaperListIcon
  },
  name: "Đối soát vé"
}