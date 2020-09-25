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

// Views
const Dashboard = () => import('@/views/Dashboard')
const Liveview = () => import('@/views/Liveview')
const Replay = () => import('@/views/Replay')
const Avintercom = () => import('@/views/Avintercom')
const Tour = () => import('@/views/Tour')

const Advancepb = () => import('@/views/replay/Advancepb')
const Archive = () => import('@/views/replay/Archive')
const Playback = () => import('@/views/replay/Playback')
const Snapshot = () => import('@/views/replay/Snapshot')

const Avintercoms = () => import('@/views/avintercom/Avintercoms')
const Upload = () => import('@/views/avintercom/Upload')

Vue.use(Router)

export default new Router({
	mode: 'hash', // https://router.vuejs.org/api/#mode
	linkActiveClass: 'open active',
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			path: '/',
			redirect: '/Dashboard',
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
						title: '/Dashboard',
						name:i18n.tc("message.left.dashboard"),
						icon:'iconfont icon-11111-copy',
						type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'Liveview',
					name: 'Liveview',
					component: Liveview,
					meta: {
						title: '/Liveview',
						name:i18n.tc("message.live.liveview"),
						icon:'iconfont icon-shipin1',
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
						type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
					},
				},{
					path: 'Replay',
					name: 'Replay',
					component: Replay,
					meta: {
						title: '/Replay/Advancepb',
						name:i18n.tc("message.left.playback"),
						icon:'iconfont icon-bofang1',
						type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
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
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Archive',
							name: 'Archive',
							component: Archive,
							meta: {
								title: 'Archive',
								name:i18n.tc("message.left.AdvancePB"),
								icon:'iconfont icon-bofang1',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Playback',
							name: 'Playback',
							component: Playback,
							meta: {
								title: 'Playback',
								name:i18n.tc("message.left.AdvancePB"),
								icon:'iconfont icon-bofang1',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
							},
						},{
							path: 'Snapshot',
							name: 'Snapshot',
							component: Snapshot,
							meta: {
								title: 'Snapshot',
								name:i18n.tc("message.left.AdvancePB"),
								icon:'iconfont icon-bofang1',
								type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
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