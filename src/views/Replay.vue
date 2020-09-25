<template>
    <div class="top_el_menu">
        <el-menu
            router
            :default-active="activeIndex" 
            class="el-menu-demo" 
            mode="horizontal"
            :background-color="($store.state.darkMode) ? '#222222' : '#EBEBEB'"
            :text-color="($store.state.darkMode) ? '#E1E1E1' : '#000000'"
            :active-text-color="($store.state.darkMode) ?'#FFFFFF':'#000000'">
            <el-menu-item index="Advancepb">高级回放</el-menu-item>
            <el-menu-item index="Archive">归档</el-menu-item>
            <el-menu-item index="Playback">回放</el-menu-item>
            <el-menu-item index="Snapshot">抓图</el-menu-item>
        </el-menu>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name:'Replay',
    data(){
        return {
            activeIndex:'Advancepb',
        }
    },
    mounted(){
        this.menuList();
    },
    methods:{
        menuList(){ 
			let path = this.$route.meta.title
			// console.log(this.$route)
            this.activeIndex = path
        }
    }
}
</script>