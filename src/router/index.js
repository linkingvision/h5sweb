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
i18n.locale = store.state.lang
// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Liveview = () => import('@/views/Liveview')


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
		children: [
			{
				path: 'Dashboard',
				name: 'Dashboard',
				component: Dashboard,
				meta: {
					title: 'Dashboard',
					name:i18n.tc("message.left.dashboard"),
					icon:'iconfont icon-gengduo',
					type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
				},
			},
			{
				path: 'Liveview',
				name: 'Liveview',
				component: Liveview,
				meta: {
					title: 'Liveview',
					name:i18n.tc("message.live.liveview"),
					icon:'iconfont icon-shexiangji1',
					type: 'Administrator'  // 是否需要判断是否登录,这里是需要判断
				},
			}
		]
		}
	]
})
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