import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  darkMode: true,
  asideShow: false,
  asideShows:false,
  liveviewrtc:'WS',
  // tourrtc:"WS",
  watermarkstring:"linkingvision",
  watermarktoggle:"",
  Certificatetime:null,//证书时间 是否显示水印
  
  lang:"zhchs",
  token:null,
  user:null,
  root:null,
  Adswitch:"false",
  IPPORT:'',
  WSROOT:'',
  liveviewadd:[],
  Mapurl:null,
  liveplay:{
    token:null,
    streamprofile:null,
    name:null,
    label:null,
    vid:null,
    viewparameter:null
  },
  trueplay:{
    token:null,
    streamprofile:null,
    vid:null,
  }
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggle (state, variable) {
    state[variable] = !state[variable]
  }
}

export default new Vuex.Store({
  state,
  mutations
})