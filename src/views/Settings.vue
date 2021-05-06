<template>
<div class="Setting">
	<div class="setting_all">
		<div class="setting_zuo">
			<el-menu
                router
                :default-active="activemenu" 
				class="el-menu-vertical-demo"
				:background-color="($store.state.darkMode) ? '#2D2D2D' : '#F5F5F5'"
				:text-color="($store.state.darkMode) ? '#B7B7B7' : '#7A7A7A'">
				<el-submenu index="/Settings/DeviceStream">
					<template slot="title">
						<i class="iconfont icon-shezhi_guanli"></i>
						<span>{{$t("message.setting.device")}} </span>
					</template>
                    <el-menu-item index="/Settings/DeviceStream">
                        <span class="Setting_tree">{{$t("message.setting.RTSPRTMP")}}</span> 
                    </el-menu-item>
                    <el-menu-item index="/Settings/DeviceOnvif">
                         <span class="Setting_tree">{{$t("message.setting.ONVIF")}}</span> 
                    </el-menu-item>
					<el-menu-item index="/Settings/DeviceSdk">
                        <span class="Setting_tree">{{$t("message.setting.devicesdk")}}</span> 
                    </el-menu-item>
					<el-menu-item index="/Settings/RtmpPush">
                        <span class="Setting_tree">{{$t("message.setting.devicertmppush")}}</span> 
                    </el-menu-item>
					<el-menu-item index="/Settings/DeviceFile">
                         <span class="Setting_tree">{{$t("message.setting.File")}}</span> 
                    </el-menu-item>
					<el-menu-item index="/Settings/DeviceAll">
                         <span class="Setting_tree">{{$t("message.setting.all")}}</span> 
                    </el-menu-item>
					<el-menu-item index="/Settings/DeviceImport">
                        <span class="Setting_tree">{{$t("message.setting.DeviceImport")}}</span> 
                    </el-menu-item>
				</el-submenu>
				
				<!-- <el-submenu index="/Settings/DeviceSdk">
					<template slot="title">
						<span>{{$t("message.setting.devicesdk")}}</span>
					</template>
                    
				</el-submenu>
				<el-submenu index="/Settings/DeviceImport">
					<template slot="title">
						<span>{{$t("message.setting.DeviceImport")}}</span>
					</template>
                    
				</el-submenu>
				<el-submenu index="/Settings/RtmpPush">
					<template slot="title">
						<span>{{$t("message.setting.devicertmppush")}} </span>
					</template>
                    
				</el-submenu> -->
				<el-submenu index="/Settings/Client">
					<template slot="title">
						<i class="iconfont icon-kehuduanpeizhi"></i>
						<span>{{$t("message.setting.ClientConfiguration")}}</span>
					</template>
                    <el-menu-item index="/Settings/Client">
                        <span class="Setting_tree">{{$t("message.setting.ClientConfiguration")}}</span> 
                    </el-menu-item>
				</el-submenu>
				<el-submenu index="/Settings/Record">
					<template slot="title">
						<i class="iconfont icon-bofang2"></i>
						<span>{{$t("message.setting.record")}} </span>
					</template>
                    <el-menu-item index="/Settings/Record">
                        <span class="Setting_tree">{{$t("message.setting.record")}}</span> 
                    </el-menu-item>
				</el-submenu>

				<el-submenu index="/Settings/Edit">
					<template slot="title">
						<i class="iconfont icon-jianzhu"></i>
						<span>{{$t("message.setting.Regional")}} </span>
					</template>
                    <el-menu-item index="/Settings/Edit">
                        <span class="Setting_tree">{{$t("message.setting.Area")}}</span> 
                    </el-menu-item>
					<el-menu-item index="/Settings/Region">
                        <span class="Setting_tree">{{$t("message.setting.Regional")}}</span> 
                    </el-menu-item>
				</el-submenu>

				<el-submenu index="/Settings/Default">
					<template slot="title">
						<i class="iconfont icon-transcode-management"></i>
						<span>{{$t("message.setting.Transcoding")}}</span>
					</template>
                    <el-menu-item index="/Settings/Default">
                        <span class="Setting_tree">{{this.$t("message.setting.Default")}}</span> 
                    </el-menu-item>
					<el-menu-item index="/Settings/Profile">
                        <span class="Setting_tree">{{this.$t("message.setting.Profile")}}</span> 
                    </el-menu-item>
				</el-submenu>

				<el-submenu index="/Settings/CloudConnect">
					<template slot="title">
						<i class="iconfont icon-jilian"></i>
						<span>{{$t("message.setting.CloudConnect")}}</span>
					</template>
                    <el-menu-item index="/Settings/CloudConnect">
                        <span class="Setting_tree">{{this.$t("message.setting.CloudConnect")}}</span> 
                    </el-menu-item>
				</el-submenu>

				<!-- 系统 -->
				<el-submenu index="System">
					<template slot="title">
						<i class="iconfont icon-xitongweihu"></i>
						<span>{{$t("message.dashboard.system_info")}} </span>
					</template>
					<!-- 系统 -->
					<el-submenu index="/Settings/System">
						<template slot="title">
							<span>{{$t("message.setting.System")}} </span>
						</template>
						<el-menu-item index="/Settings/System">
							<span class="Setting_tree">{{this.$t("message.setting.System")}}</span> 
						</el-menu-item>
						<el-menu-item index="/Settings/License">
							<span class="Setting_tree">授权管理</span> 
						</el-menu-item>
					</el-submenu>
					<!-- User -->
					<el-submenu index="/Settings/User">
						<template slot="title">
							<span>{{$t("message.setting.user")}}</span>
						</template>
						<el-menu-item index="/Settings/User">
							<span class="Setting_tree">{{this.$t("message.setting.user")}}</span> 
						</el-menu-item>
						<el-menu-item index="/Settings/Role">
							<span class="Setting_tree">{{this.$t("message.setting.Rolemanagement")}}</span> 
						</el-menu-item>
						<el-menu-item index="/Settings/CyberSecurity">
							<span class="Setting_tree">{{this.$t("message.setting.CyberSecurity")}}</span> 
						</el-menu-item>
					</el-submenu>
					<!-- Docker -->
					<el-submenu index="/Settings/Docker">
						<template slot="title">
							<span>Docker</span>
						</template>
						<el-menu-item index="/Settings/Docker">
							<span class="Setting_tree">Docker</span> 
						</el-menu-item>
					</el-submenu>
					<!-- log -->
					<el-submenu index="/Settings/LogLevel">
						<template slot="title">
							<span>{{$t("message.setting.Log")}} </span>
						</template>
						<el-menu-item index="/Settings/LogLevel">
							<span class="Setting_tree">{{this.$t("message.setting.LogLevel")}}</span> 
						</el-menu-item>
						<el-menu-item index="/Settings/LogRotating">
							<span class="Setting_tree">{{this.$t("message.setting.LogRotating")}}</span> 
						</el-menu-item>
					</el-submenu>

					<a href='/mediastore'>
						<el-menu-item >
							<!-- <i class="iconfont icon-wenjianjia" style="font-size:20px"></i> -->
							<span slot="title">{{$t("message.left.screenshots")}}</span>
						</el-menu-item>
					</a>
					<!--存储配置 -->
					<div index="/Settings/LogLevel">
						<el-menu-item index="/Settings/Storagepage">
							<!-- <i class="iconfont icon-wenjianjia" style="font-size:20px"></i> -->
							<span slot="title">存储配置</span>
						</el-menu-item>
					</div>
				</el-submenu>

				<el-submenu index="协议">
					<template slot="title">
						<i class="iconfont icon-xieyi"></i>
						<span>{{$t("message.setting.Protocol")}} </span>
					</template>
					<!-- 协议 rtsp -->
                    <!-- <el-submenu index="/Settings/RTSP">
						<template slot="title">
							<span>{{$t("message.setting.Protocol")}} </span>
						</template>
						<el-menu-item index="/Settings/RTSP">
							<span class="Setting_tree">RTSP</span> 
						</el-menu-item>
					</el-submenu> -->
					<el-menu-item index="/Settings/RTSP">
						<span class="Setting_tree">RTSP</span> 
					</el-menu-item>
					<!-- WEBRTC -->
					<el-submenu index="/Settings/CloudMode">
						<template slot="title">
							<span>WEBRTC</span>
						</template>
						<el-menu-item index="/Settings/CloudMode">
							<span class="Setting_tree">{{this.$t("message.setting.CloudMode")}}</span> 
						</el-menu-item>
						<el-menu-item index="/Settings/RelayMode">
							<span class="Setting_tree">{{this.$t("message.setting.RelayMode")}}</span> 
						</el-menu-item>
						<el-menu-item index="/Settings/TURNServer">
							<span class="Setting_tree">{{this.$t("message.setting.TURNServer")}}</span> 
						</el-menu-item>
					</el-submenu>
					<!-- HTTP -->
					<el-submenu index="HTTP">
						<template slot="title">
							<span>HTTP</span>
						</template>
						<el-menu-item index="/Settings/Configure">
							<span class="Setting_tree">{{$t("message.setting.Configuration")}}</span> 
						</el-menu-item>
						<el-menu-item index="/Settings/Domainlist">
							<span class="Setting_tree">{{$t("message.setting.Domainlist")}}</span> 
						</el-menu-item>
					</el-submenu>
				</el-submenu>

				<el-submenu index="/Settings/Map">
					<template slot="title">
						<i class="iconfont icon-ditu"></i>
						<span>{{$t("message.left.Map")}}</span>
					</template>
					<el-menu-item index="/Settings/Mapmanagement">
                        <span class="Setting_tree">{{$t("message.left.MapManagement")}}</span> 
                    </el-menu-item>
                    <!-- <el-menu-item index="/Settings/Map">
                        <span class="Setting_tree">Map</span> 
                    </el-menu-item> -->
				</el-submenu>

				<el-submenu index="/Settings/Cluster">
					<template slot="title">
						<i class="iconfont icon-jiqun"></i>
						<span>{{$t("message.dashboard.cluster")}}</span>
					</template>
					<el-menu-item index="/Settings/Cluster">
                        <span class="Setting_tree">{{$t("message.dashboard.cluster")}}</span> 
                    </el-menu-item>
                    <!-- <el-menu-item index="/Settings/Map">
                        <span class="Setting_tree">Map</span> 
                    </el-menu-item> -->
				</el-submenu>
				
				<el-menu-item index="/Settings/Camera">
					<i class="iconfont icon-jiankongdianliebiao"></i>
					<span slot="title">{{$t("message.left.camera")}}</span>
				</el-menu-item>
				
			</el-menu>
		</div>
		<div class="setting_you">
			<router-view></router-view>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'Dashboard',
	data(){
		return{
			activemenu:"2-1"
		}
	},
	methods:{
		menuList(){ 
            let path = this.$route.path
			// console.log(path,this.$route)
            this.activemenu = path
        }
		
	},
	mounted(){
		this.menuList();
	},
	created(){
	}
}
</script>
<style lang="scss" scoped>
.setting_all{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.setting_zuo{
		width: 16%;
		height: 91vh;
		overflow-y: auto;
	}
	i{
		margin-right: 10px;
	}
	.setting_you{
		width: 84%;
		height: 91vh;
		padding: 10px 0;
		overflow-y: auto;
		// background-color: #171717;
	}
	.setting_you::-webkit-scrollbar,.setting_zuo::-webkit-scrollbar{
		display: none;
	}
}
</style>