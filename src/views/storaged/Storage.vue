<template>
    <div class="cockpit">
         <div class="cockpit_left">
            <el-menu
                router
                :default-active="activemenu" 
				class="el-menu-vertical-demo"
				:background-color="($store.state.darkMode) ? '#2D2D2D' : '#F5F5F5'"
				:text-color="($store.state.darkMode) ? '#B7B7B7' : '#7A7A7A'">
                <el-menu-item v-if="this.$store.state.root=='Administrator'" index="/Storage/StorageConfig">
					<!-- <i class="iconfont icon-shezhi"></i> -->
					<span slot="title">{{$t("message.left.StorageConfig")}}</span>
				</el-menu-item>
                <el-menu-item v-if="this.$store.state.root=='Administrator'" index="/storage/StorageTerminal">
					<!-- <i class="iconfont icon-shezhi"></i> -->
					<span slot="title">{{$t("message.left.StorageTerminal")}}</span>
				</el-menu-item> 
            </el-menu>
         </div>
         <div class="cockpit_right">
             <router-view></router-view>
         </div>
    </div>
</template>

<script>
export default {
  name: 'cockpit',
	data(){
		return{
			activemenu:''
		}
	},
	methods:{
       menuinit(){ 
            let path = this.$route.path
			console.log(path,this.$route)
            this.activemenu = path
        }
	},
	mounted(){
		this.menuinit()
	},
}
</script>

<style scoped>
 .cockpit{
    display: flex;
    /* //flex-wrap: wrap; */
    justify-content: space-between; 
}
 .cockpit_left{
    width: 16%;
    min-width: 290px;
    height: 90vh;
    margin: 0 5px;
    background-color: #2D2D2D;
    overflow: auto;
 }
 .cockpit_right{
    width: 84%;
    height:100%; 
    /* background-color: #222222; */
 }
</style>