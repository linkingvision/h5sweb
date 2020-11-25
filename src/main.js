import 'core-js/stable'
import Vue from 'vue'
import CoreuiVue from '@coreui/vue/src'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import './assets/icon/iconfont.css'//字体
import $ from 'jquery'

import axios from '@/http';
Vue.prototype.$http = axios;

//注册到vue原型上
import clipboard from 'clipboard';
Vue.prototype.clipboard = clipboard;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import VueI18n from 'vue-i18n'
import LangEn from '../static/lang/en'
import LangZhCHS from '../static/lang/zhchs'
import LangZhCHT from '../static/lang/zhcht'
Vue.use(VueI18n)
const bus = new Vue()
// console.log(store.state.lang,"mian")
import event from './views/public/event'
Vue.prototype.EVENT = event

const i18n = new VueI18n({
  locale:"zhchs",
  messages: {
    'en': LangEn,
    'zhchs': LangZhCHS,
    'zhcht': LangZhCHT
  }
})
i18n.locale = store.state.lang

Vue.use(CoreuiVue)


router.beforeEach((to, from, next) => {
    const type = to.meta.type
    console.log(store.state.root,type)
    
    // 判断该路由是否需要登录权限
    if (store.state.root!=null) {
        // console.log(type,"1");
		if (store.state.token) {
			// console.log(type,"2");
			if(store.state.root==='Administrator'){
				next()
			}else{
				if(store.state.root === 'Operator' && type==='Operator'){
					console.log(type,store.state.root,"4");
					next()  // 确保一定要有next()被调用
				}else{
					sessionStorage.removeItem('mcutoken')
					store.state.token = null
					sessionStorage.removeItem('mcuuser')
					store.state.user = null
					sessionStorage.removeItem('mcuroot')
					store.state.root = null
					next('/login')
				}
			}
			
		} else {
			sessionStorage.removeItem('mcutoken')
			store.state.token = null 
			sessionStorage.removeItem('mcuuser')
			store.state.user = null
			sessionStorage.removeItem('mcuroot')
			store.state.root = null
			// console.log(type,"3");
			next('/login')
		}
    } else {
		console.log('不需要认证')
		next()
    }
})

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  template: '<App/>',
  data: {
    bus
  },
  components: {
    App
  }
})
