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

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  data: {
    bus
  },
  template: '<App/>',
  components: {
    App
  }
})
