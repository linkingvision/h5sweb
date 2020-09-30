<template>
	<div class="Sidebar">
		<CSidebar 
			:show="$store.state.asideShow"
			@update:show="(val) => $store.commit('set', ['asideShow', val])"
			colorScheme="light"
			overlaid
		>
			<CSidebarBrand class="d-md-down-none">
				<img 
					:src="($store.state.darkMode)? require('../assets/imgs/logo.png'):require('../assets/imgs/logo_hei.png')"
					width="180"
					height="26"
					alt="H5S Logo"/>
			</CSidebarBrand>
			<!-- <CSidebarClose @click.native="$store.commit('toggle', 'asideShow')"/> -->
			<el-menu
				router
				:default-active="activeIndex" 
				class="el-menu-vertical-demo"
				:background-color="($store.state.darkMode) ? '#0C0C0C' : '#F5F5F5'"
				:text-color="($store.state.darkMode) ? '#B7B7B7' : '#7A7A7A'"
				active-text-color="#000000">
				<el-menu-item index="/Dashboard">
					<i class="iconfont icon-11111-copy"></i>
					<span slot="title">{{$t("message.left.dashboard")}}</span>
				</el-menu-item>
				<el-menu-item index="/Liveview">
					<i class="iconfont icon-shipin1"></i>
					<span slot="title">{{$t("message.live.liveview")}}</span>
				</el-menu-item>
				<el-menu-item index="/Replay/Advancepb">
					<i class="iconfont icon-bofang1"></i>
					<span slot="title">{{$t("message.left.playback")}}</span>
				</el-menu-item>
				<el-menu-item index="/Avintercom/Avintercoms">
					<i class="iconfont icon-shipinhuiyi3"></i>
					<span slot="title">{{$t("message.Conference.Upload")}}</span>
				</el-menu-item>
				<el-menu-item index="/Tour">
					<i class="iconfont icon-sigongge"></i>
					<span slot="title">{{$t("message.left.tour")}}</span>
				</el-menu-item>
				<a href='/mediastore'>
					<el-menu-item >
						<i class="iconfont icon-icon-test1"></i>
						<span slot="title">{{$t("message.left.screenshots")}}</span>
					</el-menu-item>
				</a>
				<el-menu-item index="/Settings/DeviceStream">
					<i class="iconfont icon-icon-test1"></i>
					<span slot="title">{{$t("message.setting.setting")}}</span>
				</el-menu-item>
			</el-menu>
		</CSidebar>
	</div>
</template>

<script>
import nav from './_nav'
export default {
	name: 'TheSidebar',
	nav,
	computed: {
		show () {
			return this.$store.state.sidebarShow 
		},
		minimize () {
			return this.$store.state.sidebarMinimize 
		}
	},
	data(){
		return {
			activeIndex:"Dashboard"
		}
	},
	mounted(){
		this.menuList();	
	},
	methods:{
		menuList(){ 
			let path = this.$route.matched[1].meta.title
			console.log(this.$route)
            this.activeIndex = path
        }
	}
}
</script>
<style lang="scss" scoped>
a{
	text-decoration: none;
}
</style>
