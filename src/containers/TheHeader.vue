<template>
<div>
	<el-dialog
		class="plugin_adout"
		:visible.sync="centerDialogVisible"
		width="25%"
		append-to-body
		center>
		<div class="about_flex">
			<div v-if="$store.state.darkMode">
				<img class="adout_img" src="../assets/imgs/logo_hei.svg"/>
			</div>
			<div v-else>
				<img class="adout_img" src="../assets/imgs/logo.svg"/>
			</div>
			<div style="margin: 20px 0 10px 20px; text-align: center;">
				<div>{{$t("message.dashboard.version")}}: {{information.strVersion}}</div>
			</div>
		</div>
	</el-dialog>
	<el-dialog
		class="Rebootdialog"
		title="重启"
		append-to-body
		:visible.sync="Rebootdialog"
		width="25%">
		<div class="Rebootdialog1">
			<div style="">修改后请您重启</div>
			<div slot="footer" class="dialog-footer" style="display: flex;justify-content: flex-end;">
				<el-button type="primary" @click="Reboot">{{label.Reboot}}</el-button>
			</div>
		</div>
	</el-dialog>
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
					<i class="iconfont icon-hanbaobao" style="font-size: 24px;"></i>
				</button>
			</CHeaderNavItem>
		</CHeaderNav>
		<CHeaderNav class="d-md-down-none mr-auto" >
			<img 
			src="../assets/imgs/logo.png"
			width="190"
			height="26"
			alt="H5S Logo"/>
		</CHeaderNav>

		<CHeaderNav>
			<div class="c_Docker" id="Docker"></div>
		</CHeaderNav>
		<CHeaderNav>
			<router-link :to="{name:'Event'}">
				<el-badge :value="gEvvalue" :max="999" class="item" data-toggle="dropdown">
					<i style="color: #fff;" class="iconfont icon-lingdang" type="primary"></i>
				</el-badge>
			</router-link>
		</CHeaderNav>
		<CHeaderNav>
		<div class="use_user" id="rtc_togg">
			<el-tooltip content="重启" placement="bottom" effect="dark">
				<el-button @click="Rebootdialog=true" style="border: none;background: none; color:#fff;line-height: 0.9;padding-right: 10px;" >
					<i style=" font-size: 18px;color:#ea5252;font-weight: 500;" class="iconfont icon-zhongqi"></i>
				</el-button>
			</el-tooltip>
		</div>
		</CHeaderNav>
		<!-- <CHeaderNav>
			<CHeaderNavItem class="px-3">
				<button 
				@click="() => $store.commit('toggle', 'darkMode')" 
				class="c-header-nav-btn"
				>
				<CIcon v-if="$store.state.darkMode" name="cil-sun"/>
				<CIcon v-else name="cil-moon"/>
				</button>
			</CHeaderNavItem>
		</CHeaderNav> -->
		<CHeaderNav>
			<CDropdown
				:caret="false">
				<template #toggler-content>
					<i class="iconfont icon-yonghuming"></i> {{user}}
				</template>
				<CDropdownItem :to="{name:'Logout'}">
					<div class="about_ab" v-if="user==''||user==null"><i class="iconfont icon-shijian-"></i>{{$t("message.header.login")}}</div>
					<div class="about_ab" v-else><i class="iconfont icon-shijian-"></i>{{$t("message.header.logouts")}}</div>
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
					<div @click="centerDialogVisible=true" class="about_ab"><i class="iconfont icon-prompt"></i>关于</div>
				</CDropdownItem>
				<CDropdownItem href="doc/api.html">
					<div class="about_ab"><i class="iconfont icon-category"></i>API</div>
				</CDropdownItem>
				<CDropdownItem @click="skin">
					<div class="about_ab"><i class="iconfont icon-huanfu"></i>主题</div>
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
			<CHeaderNav v-if="this.$route.matched[1].meta.icon=='iconfont icon-shipin1'">
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
	
</div>
</template>

<script>
import Vue from 'vue'
export default {
	name: 'TheHeader',
	data(){
		return {
			gEvvalue: 0,
			user:this.$store.state.user,
			Rebootdialog:false,
			centerDialogVisible:false,
			subtitle:{
				icon:this.$route.matched[1].meta.icon,
				name:this.$route.matched[1].meta.name
			},
			information:{
				strVersion: ""
			},
			toggle:"",//主题
			label:{
				Edit:this.$t("message.table.Edit"),
				user:this.$t("message.setting.username"),
				role:this.$t("message.setting.role"),
				type:this.$t("message.setting.Authority"),
				olPassword:this.$t("message.setting.currentpass"),
				nePassword:this.$t("message.setting.newpass"),
				nePassword1:this.$t("message.setting.confirmpass"),
				Change:this.$t("message.setting.Change"),
				Download:this.$t("message.archive.Download"),
				Control:this.$t("message.left.Control"),
				goto:this.$t("message.header.goto"),
				control1:this.$t("message.header.control"),
				Reboot:this.$t("message.header.Reboot")
			},
		}
	},
	watch:{
		toggle(a){
			this.$root.bus.$emit('skintoggle', a);
		}
	},
	mounted(){
		this.Docker();
		this.GetSystemInfo();
		var _this=this
		$("#rtc_togg").hide();
		_this.$root.bus.$on('webrtc', function(token){
			$("#rtc_togg").show();
		});
	},
	methods:{
		gEventval() {
			setInterval(
				function() {
				this.gEvvalue = this.EVENT.gEvent.length;
				}.bind(this),
				1000
			);
		},
		rtctogg(){
			$("#rtc_togg").hide();
		},
		GetSystemInfo(){
			var root = this.$store.state.IPPORT;
			var url = root + "/api/v1/GetSystemInfo?session="+ this.$store.state.token;

			this.$http.get(url).then(result => {
				//console.log(result);
				if (result.status == 200) 
				{
					this.information = result.data;
					// console.log(_this.information);
				}
			}).catch(error => {
				console.log('GetSystemInfo', error);
			});

		},
		//重启
		Reboot(){
			var url = this.$store.state.IPPORT + "/api/v1/Restart?session="+ this.$store.state.token;
			this.$http.get(url).then(result=>{
				if(result.status==200){
					if(result.data.bStatus){
						console.log("重启",result.data.bStatus)
					}
				}
			})
			
			var loading = Vue.prototype.$loading({
				lock: true,
				text: '重启中',
				background:"RGBA(0, 0, 0, 0.5)",
				target: '.Rebootdialog1'  // 需要loading的元素的类名
			})
			setTimeout(()=>{
				this.$nextTick(()=>{
					loading.close();
					this.$router.push({ path:'../../login'})
				})
			},1000*30)
		},
		Docker(){
			var url = this.$store.state.IPPORT + "/api/v1/GetEnableLinkagent?session="+ this.$store.state.token;
			this.$http.get(url).then(result=>{
				if(result.status==200){
					console.log(result)
					if(result.data.enable){
						document.getElementById('Docker').style.display='block'
					}
				}
			})
		},
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
.about_ab i{
	margin-right: 10px;
}
.c_Docker{
    width: 40px;
	height: 100%;
    background: url("~@/assets/imgs/Docker.png") center center no-repeat;
	display: none;
	background-size: 65%;
}
</style>