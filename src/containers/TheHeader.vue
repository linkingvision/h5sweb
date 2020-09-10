<template>
	<CHeader with-subheader>
		<!-- <CToggler
		in-header
		class="ml-3 d-lg-none"
		@click="$store.commit('toggleSidebarMobile')"
		/>
		<CToggler
			in-header
			class="ml-3 d-md-down-none"
			@click="$store.commit('toggleSidebarDesktop')"
		/> -->
		
		<CHeaderNav>
			<CHeaderNavItem class="px-3">
				<button
				in-header
				class="c-header-nav-btn"
				@click="$store.commit('toggle', 'asideShow')"
				>
				<CIcon size="lg" name="cil-applications-settings" class="mr-2"/>
				</button>
			</CHeaderNavItem>
		</CHeaderNav>
		<CHeaderNav class="d-md-down-none mr-auto" >
			<img 
			src="../assets/imgs/logo.png"
			width="190"
			height="26"
			alt="CoreUI Logo"/>
		</CHeaderNav>
		<CHeaderNav>
			<CHeaderNavItem class="px-3">
				<button 
				@click="() => $store.commit('toggle', 'darkMode')" 
				class="c-header-nav-btn"
				>
				<CIcon v-if="$store.state.darkMode" name="cil-sun"/>
				<CIcon v-else name="cil-moon"/>
				</button>
			</CHeaderNavItem>
		</CHeaderNav>
		<CHeaderNav>
			<CDropdown
				:caret="false">
				<template #toggler-content>
					<i class="iconfont icon-yonghuming"></i> {{user}}
				</template>
				<CDropdownItem :to="{name:'Logout'}">
					<div class="about_ab"><i class="iconfont icon-tuichudenglu"></i>退出登录</div>
				</CDropdownItem>
			</CDropdown>
		</CHeaderNav>
		<CHeaderNav>
			<CDropdown
				:caret="false">
				<template #toggler-content>
					<i class="iconfont icon-gengduo"></i>
				</template>
				<CDropdownItem >
					<div @click="about=true" class="about_ab"><i class="iconfont icon-guanyu"></i>关于</div>
				</CDropdownItem>
				<CDropdownItem href="doc/api.html">
					<div class="about_ab"><i class="iconfont icon-API"></i>API</div>
				</CDropdownItem>
				<CDropdownItem @click="skin">
					<div class="about_ab"><i class="iconfont icon-mingpianhuanfu"></i>主题</div>
				</CDropdownItem>
				<CDropdownItem @click="Rebootdialog=true">
					<div class="about_ab"><i class="iconfont icon-zhongqi"></i>重启</div>
				</CDropdownItem>
			</CDropdown>
		</CHeaderNav>
	
		<CSubheader class="px-4">
			<!-- 修改面包屑导航 -->
			<CHeaderNav>
				<div class="header_size">
					<i :class="this.$route.matched[1].meta.icon"> </i>
					{{this.$route.matched[1].meta.name}}
				</div>
			</CHeaderNav>
			<CHeaderNav>
				<CHeaderNavItem>
					<button
					in-header
					class="c-header-nav-btn"
					@click="$store.commit('toggle', 'asideShows')"
					>
						<img 
						src="../assets/imgs/liveview_setting.png"
						width="16"
						height="16"
						alt="CoreUI Logo"/>
					</button>
				</CHeaderNavItem>
			</CHeaderNav>
		<!-- <CBreadcrumbRouter class="border-0 mb-0"/> -->
		</CSubheader>
	</CHeader>
</template>

<script>

export default {
	name: 'TheHeader',
	data(){
		return {
			user:"",
			Rebootdialog:"",
			subtitle:{
				icon:this.$route.matched[1].meta.icon,
				name:this.$route.matched[1].meta.name
			}
		}
	},
	methods:{
		skin(){
			this.toggle=this.$store.state.darkMode
			this.$store.commit('toggle', 'darkMode')
		},
	}
}
</script>
<style lang="scss" scoped>
.header_size{
  font-size: 14px;
  i{
    font-size: 14px;
    margin-right: 10px;
  }
}
.c-subheader{
	display: flex;
	justify-content: space-between;
}
</style>