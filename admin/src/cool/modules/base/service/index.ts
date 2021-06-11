import Common from "./common";
import Open from "./open";
import SysUser from "./system/user";
import SysMenu from "./system/menu";
import SysRole from "./system/role";
import SysDept from "./system/dept";
import SysTask from "./system/task";
import SysSetting from "./system/setting";
import SysLog from "./system/log";
import PluginInfo from "./plugin/info";
import SysAd from "./system/ad";
import SysLink from "./system/link";
import SysAssets from "./system/assets";
import SysAttachment from "./system/attachment";

export default {
	common: new Common(),
	open: new Open(),
	system: {
		user: new SysUser(),
		menu: new SysMenu(),
		role: new SysRole(),
		dept: new SysDept(),
		task: new SysTask(),
		setting: new SysSetting(),
		log: new SysLog(),
		ad: new SysAd(),
		link: new SysLink(),
		assets: new SysAssets(),
		attachment: new SysAttachment()
	},
	plugin: {
		info: new PluginInfo()
	}
};