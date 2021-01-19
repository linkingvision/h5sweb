<template>
  <div class="c-app" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <TheSidebar/>
    <TheAside/>
    <CWrapper>
      <TheHeader v-if="embed==false"/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <!-- <TheFooter/> -->
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import TheAside from './TheAside'

import '../assets/js/adapter'
import {H5sEvent} from '../assets/js/h5sevent.js'

export default {
	name: 'TheContainer',
	components: {
		TheSidebar,
		TheHeader,
		TheFooter,
		TheAside
	},
	data(){
		return {
			embed:false
		}
	},
	mounted(){
		// this.open();
		const cur_query = this.$route.query || {};
		// console.log(cur_query);
		if(cur_query['embed'] === 'true'){
			this.embed = true;
		}
	},
	methods:{
		/**open(){
			var conf1 = {
				protocol: window.location.protocol, //http: or https:
				host:this.$store.state.WSROOT, //localhost:8080
				rootpath:'/', // '/'
				callback: this.EventCB, 
				userdata: null, // user data
				session: this.$store.state.token //session got from login
			};
			
			// console.log("*******2",conf1)
			this.e1 = new H5sEvent(conf1);
			this.e1.connect();
		},
		EventCB(event, userdata){
			var msgevent = JSON.parse(event);
			// console.log("****消息",msgevent)
		}*/
	}
}
</script>
<style lang="scss" scoped>
.c-main{
  padding-top: 0px;
  .container-fluid{
    padding: 0;
  }
}
</style>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
