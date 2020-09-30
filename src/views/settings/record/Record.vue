<template>
<div class="cont">
    <div class="ziti">{{$t("message.setting.manualstart")}}</div>
    <!-- <el-switch
        v-model="value"
         @change="start()"
        active-color="#5FBFA7"
        inactive-color="#E9E9E9">
    </el-switch> -->
    <el-button type="success" @click="start()" round size="mini">{{$t("message.tour.Start")}}</el-button>
    <div class="ziti">{{$t("message.setting.manualstop")}}</div>
    <!-- <el-switch
        v-model="value1"
         @change="stop()"
        active-color="#5FBFA7"
        inactive-color="#E9E9E9">>
    </el-switch> -->
    <el-button type="danger" @click="stop()" round size="mini">{{$t("message.tour.stop")}}</el-button>
</div>
</template>   


<script>
export default {
    name: 'record',
    data(){
        return {
            value:false,
            value1:true,
            recordstart:[]
        }
    },
    mounted(){
        this.getsrc();
    },
    methods:{
     getsrc(){
        var url = this.$store.state.IPPORT + "/api/v1/GetSrc?session="+ this.$store.state.token;
        console.log(url);
        //return false;
        this.$http.get(url).then(result=>{
            if(result.status == 200){
                var data=result.data;
                for(var i=0;i<data.src.length;i++){
                    var item=data.src[i];
                    var topData={};
                    topData["token"]=item.strToken;
                    //console.log("token",topData);
                    this.recordstart.push(topData);
                    //console.log("token", this.recordstart);
                }
            }//wei
        })
     },
     start(){
         this.value1=false
         console.log(this.recordstart);
         for(var i=0;i<this.recordstart.length;i++){
            var Token=this.recordstart[i];
            console.log(Token.token);
            var url = this.$store.state.IPPORT + "/api/v1/ManualRecordStart?token="+Token.token+"&session="+ this.$store.state.token;
            // console.log(url);
            //return false;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    const h = this.$createElement;
                    this.$notify({
                    title: '开启录像',
                    message: h('i', { style: 'color: teal'}, '开启成功')
                    });
                }
            })
         }
     },
     stop(){
         this.value=false;
         console.log(this.recordstart);
         for(var i=0;i<this.recordstart.length;i++){
            var Token=this.recordstart[i];
            console.log(Token.token);
            var url = this.$store.state.IPPORT + "/api/v1/ManualRecordStop?token="+Token.token+"&session="+ this.$store.state.token;
            // console.log(url);
            //return false;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    const h = this.$createElement;
                    this.$notify({
                    title: '关闭录像',
                    message: h('i', { style: 'color: teal'}, '关闭成功')
                    });
                }
            })
         }
     }
    }
}
</script>
<style scoped>
.cont{
    padding: 20px;
}

.ziti{
    /* color: #000; */
    font-size: 14px;
    margin: 10px 0;
}
</style>