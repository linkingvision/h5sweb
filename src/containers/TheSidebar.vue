<template>

	<CSidebar 
		:show="$store.state.asideShow"
		@update:show="(val) => $store.commit('set', ['asideShow', val])"
		colorScheme="light"
		overlaid
	>
		<CSidebarClose @click.native="$store.commit('toggle', 'asideShow')"/>
		<CSidebarBrand class="d-md-down-none">
		<CIcon 
			class="c-sidebar-brand-full" 
			name="logo" 
			size="custom-size"
			:height="35" 
			viewBox="0 0 556 134"
		/>
		<CIcon 
			class="c-sidebar-brand-minimized" 
			name="logo" 
			size="custom-size"
			:height="35"
			viewBox="0 0 110 134"
		/>
		</CSidebarBrand>
		<el-menu
			router
			:default-active="activeIndex" 
			class="el-menu-vertical-demo"
			:background-color="($store.state.darkMode) ? '#0C0C0C' : '#FFFFFF'"
			:text-color="($store.state.darkMode) ? '#B7B7B7' : '#000000'"
			active-text-color="#3277FF">
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
		</el-menu>
	</CSidebar>
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
