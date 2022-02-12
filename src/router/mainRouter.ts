import { routerForControl } from "../view/ForControl/router";
import { routerHome } from "../view/Home/router";
import { routerManage } from "../view/Magage/router";
import { routerSetting } from "../view/Setting/router";
import { IRouter } from "./interface";

export const publicPage: IRouter[] = [
  routerHome,
  routerManage,
  routerForControl,
  routerSetting
]