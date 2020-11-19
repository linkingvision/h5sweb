import Vue from 'vue'
import Router from 'vue-router'
import VueI18n from 'vue-i18n'
import store from '../store'
import LangEn from '../../static/lang/en'
import LangZhCHS from '../../static/lang/zhchs'
import LangZhCHT from '../../static/lang/zhcht'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale:"zhchs",
  messages: {
    'en': LangEn,
    'zhchs': LangZhCHS,
    'zhcht': LangZhCHT
  }
})
if(sessionStorage.getItem('mculang')){
	store.state.lang=sessionStorage.getItem('mculang');
}
i18n.locale = store.state.lang
// Containers
const TheContainer = () => import('@/containers/TheContainer')
const Login = () => import('@/containers/Login')
const Logout = () => import('@/containers/Logout')
const Downloadapp = () => import('@/containers/Downloadapp')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Liveview = () => import('@/views/Liveview')
const Replay = () => import('@/views/Replay')
const Avintercom = () => import('@/views/Avintercom')
const Tour = () => import('@/views/Tour')
const Settings = () => import('@/views/Settings')
const GB = () => import('@/views/GB')
const Clouds = () => import('@/views/Clouds')
const Event = () => import('@/views/Event')

const Device = () => import('@/views/dashboard/Device')
const GPU = () => import('@/views/dashboard/GPU')

const GB28181 = () => import('@/views/GB/GB28181')
const GBplatform = () => import('@/views/GB/GBplatform')
const GBService = () => import('@/views/GB/GBService')

const Advancepb = () => import('@/views/replay/Advancepb')
const Archive = () => import('@/views/replay/Archive')
const Playback = () => import('@/views/replay/Playback')
const Snapshot = () => import('@/views/replay/Snapshot')


const DeviceImport = () => import('@/views/settings/Batch/BatchImport')
const Camera = () => import('@/views/settings/Camera/Camera')
const DeviceStream = () => import('@/views/settings/device/DeviceStream')
const DeviceOnvif = () => import('@/views/settings/device/DeviceOnvif')
const DeviceFile = () => import('@/views/settings/device/DeviceFile')
const DeviceAll = () => import('@/views/settings/device/DeviceAll')
const Docker = () => import('@/views/settings/docker/Docker')
const RTSP = () => import('@/views/settings/Protocol/RTSP')
const DeviceSdk = () => import('@/views/settings/SDK/DeviceSdk')
const User = () => import('@/views/settings/user/User')
const Role = () => import('@/views/settings/user/Role')
const CyberSecurity = () => import('@/views/settings/user/CyberSecurity')
const Default = () => import('@/views/settings/Transcoding/Default')
const Profile = () => import('@/views/settings/Transcoding/Profile')
const CloudMode = () => import('@/views/settings/WEBRTC/CloudMode')
const RelayMode = () => import('@/views/settings/WEBRTC/RelayMode')
const TURNServer = () => import('@/views/settings/WEBRTC/TURNServer')
const Record = () => import('@/views/settings/record/Record')
const LogLevel = () => import('@/views/settings/log/LogLevel')
const LogRotating = () => import('@/views/settings/log/LogRotating')
const System = () => import('@/views/settings/system/System')
const RtmpPush = () => import('@/views/settings/RTMP/RtmpPush')
const CloudConnect = () => import('@/views/settings/CloudConnect/CloudConnect')
const Edit = () => import('@/views/settings/region/Edit')
const Region = () => import('@/views/settings/region/Region')

const Avintercoms = () => import('@/views/avintercom/Avintercoms')
const Upload = () => import('@/views/avintercom/Upload')

Vue.use(Router)

export default new Router({
	mode: 'hash', // https://router.vuejs.org/api/#mode
	linkActiveClass: 'open active',
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{path:"/",redirect:'/Login'},
		{
			path: '/',
			name: 'Home',
			component: TheContainer,
			meta: {
                type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
            },
			children: [
				{
					path: 'Dashboard',
					name: 'Dashboard',
					component: Dashboard,
					meta: {
						title: 'Dashboard',
						name:i18n.tc("message.left.dashboard"),
						icon:'iconfont icon-11111-copy',
						type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'Event',
					name: 'Event',
					component: Event,
					meta: {
						title: 'Event',
						name:i18n.tc("message.left.event"),
						icon:'iconfont icon-lingdang',
						type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'Device',
					name: 'Device',
					component: Device,
					meta: {
						title: 'Device',
						name:i18n.tc("message.dashboard.device"),
						icon:'iconfont icon-11111-copy',
						type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'GPU',
					name: 'GPU',
					component: GPU,
					meta: {
						title: 'GPU',
						name:'GPU',
						icon:'iconfont icon-11111-copy',
						type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'Liveview',
					name: 'Liveview',
					component: Liveview,
					meta: {
						title: '/Liveview',
						name:i18n.tc("message.live.liveview"),
						icon:'iconfont icon-shipin1',
						type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'Clouds',
					name: 'Clouds',
					component: Clouds,
					meta: {
						title: '/Clouds',
						name:i18n.tc("message.left.cloud"),
						icon:'iconfont icon-yun',
						type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'Tour',
					name: 'Tour',
					component: Tour,
					meta: {
						title: '/Tour',
						name:i18n.tc("message.left.tour"),
						icon:'iconfont icon-sigongge',
						type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'Replay',
					name: 'Replay',
					component: Replay,
					meta: {
						title: '/Replay/Advancepb',
						name:i18n.tc("message.left.playback"),
						icon:'iconfont icon-bofang1',
						type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
					},
					children: [
						{
							path: 'Advancepb',
							name: 'Advancepb',
							component: Advancepb,
							meta: {
								title: 'Advancepb',
								name:i18n.tc("message.left.AdvancePB"),
								icon:'iconfont icon-bofang1',
								type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Archive',
							name: 'Archive',
							component: Archive,
							meta: {
								title: 'Archive',
								name:i18n.tc("message.left.AdvancePB"),
								icon:'iconfont icon-bofang1',
								type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Playback',
							name: 'Playback',
							component: Playback,
							meta: {
								title: 'Playback',
								name:i18n.tc("message.left.AdvancePB"),
								icon:'iconfont icon-bofang1',
								type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Snapshot',
							name: 'Snapshot',
							component: Snapshot,
							meta: {
								title: 'Snapshot',
								name:i18n.tc("message.left.AdvancePB"),
								icon:'iconfont icon-bofang1',
								type: 'Operator'  // 是否需要判断是否登录,这里是需要判断
							},
						},
						
					]
				},{
					path: 'Avintercom',
					name: 'Avintercom',
					component: Avintercom,
					meta: {
						title: '/Avintercom/Avintercoms',
						name:i18n.tc("message.Conference.Upload"),
						icon:'iconfont icon-shipinhuiyi3',
						type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
					},
					children: [
						{
							path: 'Avintercoms',
							name: 'Avintercoms',
							component: Avintercoms,
							meta: {
								title: 'Avintercoms',
								name:i18n.tc("message.Conference.Videointercom"),
								icon:'iconfont icon-bofang1',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Upload',
							name: 'Upload',
							component: Upload,
							meta: {
								title: 'Upload',
								name:i18n.tc("message.Conference.Upload"),
								icon:'iconfont icon-bofang1',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						}
					]
				},{
					path: 'GB',
					name: 'GB',
					component: GB,
					meta: {
						title: '/GB/GB28181',
						name:'GB',
						icon:'iconfont icon-wendang',
						type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
					},
					children: [
						{
							path: 'GB28181',
							name: 'GB28181',
							component: GB28181,
							meta: {
								title: 'GB28181',
								name:i18n.tc("message.GB.GB28181"),
								icon:'iconfont icon-bofang1',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'GBplatform',
							name: 'GBplatform',
							component: GBplatform,
							meta: {
								title: 'GBplatform',
								name:i18n.tc("message.GB.GBPlatform"),
								icon:'iconfont icon-bofang1',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'GBService',
							name: 'GBService',
							component: GBService,
							meta: {
								title: 'GBService',
								name:i18n.tc("message.GB.GBService"),
								icon:'iconfont icon-bofang1',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						}
					]
				},{
					path: 'Settings',
					name: 'Settings',
					component: Settings,
					meta: {
						title: '/Settings/DeviceStream',
						name:i18n.tc("message.setting.setting"),
						icon:'iconfont icon-shezhi',
						type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
					},
					children: [{
						path: 'DeviceImport',
						name: 'DeviceImport',
						component: DeviceImport,
						meta: {
							title: '/DeviceImport',
							name:i18n.tc("message.left.camera"),
							icon:'iconfont icon-jiankong',
							type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
						},
						},{
							path: 'Camera',
							name: 'Camera',
							component: Camera,
							meta: {
								title: '/Camera',
								name:i18n.tc("message.left.camera"),
								icon:'iconfont icon-jiankong',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'DeviceStream',
							name: 'DeviceStream',
							component: DeviceStream,
							meta: {
								title: '/DeviceStream',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'DeviceOnvif',
							name: 'DeviceOnvif',
							component: DeviceOnvif,
							meta: {
								title: '/DeviceOnvif',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'DeviceFile',
							name: 'DeviceFile',
							component: DeviceFile,
							meta: {
								title: '/DeviceFile',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'DeviceAll',
							name: 'DeviceAll',
							component: DeviceAll,
							meta: {
								title: '/DeviceAll',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Docker',
							name: 'Docker',
							component: Docker,
							meta: {
								title: '/Docker',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'RTSP',
							name: 'RTSP',
							component: RTSP,
							meta: {
								title: '/RTSP',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'DeviceSdk',
							name: 'DeviceSdk',
							component: DeviceSdk,
							meta: {
								title: '/DeviceSdk',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'User',
							name: 'User',
							component: User,
							meta: {
								title: '/User',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Role',
							name: 'Role',
							component: Role,
							meta: {
								title: '/Role',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'CyberSecurity',
							name: 'CyberSecurity',
							component: CyberSecurity,
							meta: {
								title: '/CyberSecurity',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Default',
							name: 'Default',
							component: Default,
							meta: {
								title: '/Default',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Profile',
							name: 'Profile',
							component: Profile,
							meta: {
								title: '/Profile',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'CloudMode',
							name: 'CloudMode',
							component: CloudMode,
							meta: {
								title: '/CloudMode',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'RelayMode',
							name: 'RelayMode',
							component: RelayMode,
							meta: {
								title: '/RelayMode',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'TURNServer',
							name: 'TURNServer',
							component: TURNServer,
							meta: {
								title: '/TURNServer',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Record',
							name: 'Record',
							component: Record,
							meta: {
								title: '/Record',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'LogLevel',
							name: 'LogLevel',
							component: LogLevel,
							meta: {
								title: '/LogLevel',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'LogRotating',
							name: 'LogRotating',
							component: LogRotating,
							meta: {
								title: '/LogRotating',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'System',
							name: 'System',
							component: System,
							meta: {
								title: '/System',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'RtmpPush',
							name: 'RtmpPush',
							component: RtmpPush,
							meta: {
								title: '/RtmpPush',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'CloudConnect',
							name: 'CloudConnect',
							component: CloudConnect,
							meta: {
								title: '/CloudConnect',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Edit',
							name: 'Edit',
							component: Edit,
							meta: {
								title: '/Edit',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Region',
							name: 'Region',
							component: Region,
							meta: {
								title: '/Region',
								name:i18n.tc("message.left.dashboard"),
								icon:'iconfont icon-11111-copy',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						}
					]
				}
			]
		},{
			path: '/Login',
			name: 'Login',
			component: Login,
			meta: {
				title: 'login',
				type: '' // 不需要鉴权
			}
        },{
			path: '/Downloadapp',
			name: 'Downloadapp',
			component: Downloadapp,
			meta: {
				title: 'Downloadapp',
				type: '' // 不需要鉴权
			}
        },{
			path: '/Logout',
			name: 'Logout',
			component: Logout,
			meta: {
				title: 'Logout',
				type: '' // 不需要鉴权
			}
        }
	]
})


if(sessionStorage.getItem('mcuroot')){
	store.state.root=sessionStorage.getItem('mcuroot');
}
if(sessionStorage.getItem('mcutoken')){
	store.state.token=sessionStorage.getItem('mcutoken');
}
if(sessionStorage.getItem('mcuuser')){
	store.state.user=sessionStorage.getItem('mcuuser');
}

if(localStorage.getItem('liveviewrtc')){
	store.state.liveviewrtc=localStorage.getItem('liveviewrtc');
}
if(localStorage.getItem('watermarktoggle')){
	store.state.watermarktoggle=localStorage.getItem('watermarktoggle');
}
if(localStorage.getItem('tourrtc')){
	store.state.tourrtc=localStorage.getItem('tourrtc');
}

let root=process.env.VUE_APP_URL;
if (root == undefined){
	root = window.location.protocol + '//' + window.location.host + window.location.pathname;
}
console.log(root)
store.state.IPPORT=root

var wsroot = process.env.VUE_APP_PORT;
if (wsroot == undefined)
{
	wsroot = window.location.host;
}
console.log(wsroot)
store.state.WSROOT=wsroot