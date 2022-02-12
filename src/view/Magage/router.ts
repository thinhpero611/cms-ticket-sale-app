import ManageTicket from '.'
import { IRouter } from '../../router/interface'
import { PaperListIcon, TicketIcon } from '../../shared/assets/icon'

export const routerManage: IRouter = {
  path: "/manageTicket",
  component: ManageTicket,
  exact: true,
  menu: {
    icon: TicketIcon
  },
  name: "Quản lý vé"
}