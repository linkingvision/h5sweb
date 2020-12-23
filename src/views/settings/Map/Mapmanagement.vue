<template>
    <div class="Map_manag">
        <div class="Map_title">GIS地图数据来源</div>
        <div class="Map_edi">
            <!-- <CButton class="form_butt" type="submit">百度地图</CButton> -->
            <CButton class="form_butt1" @click="gaode" type="submit">高德地图</CButton>
            <CButton class="form_butt1" @click="guge" type="submit">谷歌地图</CButton>
            <CButton class="form_butt1" @click="tiandi" type="submit">天地地图</CButton>
        </div>
    </div>
</template>
<script>
export default {
    name:'Mapmanagement',
    data(){
        return {

        }
    },
    methods:{
        gaode(){
            var viewdata=[{
                name:"高德",
                url:"http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
            }]
            var viewjson=JSON.stringify(viewdata)
            console.log(viewjson)
            this.$store.state.Mapurl=viewjson
            localStorage.Mapurl=viewjson
            console.log(localStorage.getItem('Mapurl'))
        },
        guge(){
            var viewdata=[{
                name:"谷歌",
                url:"http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}"
            }]
            var viewjson=JSON.stringify(viewdata)
            console.log(viewjson)
            this.$store.state.Mapurl=viewjson
            localStorage.Mapurl=viewjson
            console.log(localStorage.getItem('Mapurl'))
        },
        tiandi(){
            var viewdata=[{
                name:"天地",
                url:"http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=093859ee97e903db5b5636801ce54f9e"
            },{
                 name:"天地",
                url:"http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=093859ee97e903db5b5636801ce54f9e"
            }]
            var viewjson=JSON.stringify(viewdata)
            console.log(viewjson)
            this.$store.state.Mapurl=viewjson
            localStorage.Mapurl=viewjson
            console.log(localStorage.getItem('Mapurl'))
            
        },
    }
}
</script>
<style lang="scss" scoped>
.Map_manag{
    padding: 0 10px;
    .Map_title{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .Map_edi{
        button{
            height: 40px;
            box-sizing: border-box;
            font-size: 16px;
            line-height: 25px;
            border-radius: 4px;
            border:1px solid rgba(58, 187, 254, 1) !important;
            margin-right: 10px;
            &:hover{
                background-color: rgba(58, 187, 254, 1);
            }
            
        }
    }
}
</style>