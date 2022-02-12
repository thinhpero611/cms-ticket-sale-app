import { IRouter} from "../../router/interface";
// icons 
import { HomeOutlined } from '@ant-design/icons'
import Home from "./index";

export const routerHome: IRouter = 
  {
    path: "/",
    component: Home,
    exact: true,
    menu: {
      icon: HomeOutlined
    },
    name: "Trang chủ"
  }