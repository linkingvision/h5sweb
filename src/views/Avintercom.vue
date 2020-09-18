<template>
    <div>
        <el-menu
            router
            :default-active="activeIndex" 
            class="el-menu-demo" 
            mode="horizontal"
            :background-color="($store.state.darkMode) ? '#222222' : '#FFFFFF'"
            :text-color="($store.state.darkMode) ? '#E1E1E1' : '#000000'"
            active-text-color="#FFFFFF">
            <el-menu-item index="Avintercoms">视频对讲</el-menu-item>
            <el-menu-item index="Upload">上传</el-menu-item>
        </el-menu>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name:'Avintercom',
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

<style lang="scss" scoped>
.el-menu.el-menu--horizontal{
    border: none;
    .el-menu-item{
        height: auto;
        border: none;
        line-height:35px;
        border-top: 2px solid #1F6678;
        &.is-active{
          border: none;
          border-top: 2px solid #26B4FC;
          background-color: #181818 !important;
        }
    }
}
</style>