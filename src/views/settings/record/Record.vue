<template>
<div class="cont">
    <div class="record_Duration">
        <div>录像文件时长</div>
        <el-input @blur='Durationsetting' class="portcheck_input" style="width:100px" max="240" min="10" v-model="input" type='number'></el-input>(分钟)
        <div>录像文件时长最短10分钟，最长240分钟，设置完毕后请重启。</div>
    </div>
    <div>
        <div class="ziti">{{$t("message.setting.manualstart")}}</div>
        <el-button type="success" @click="start()" round size="mini">{{$t("message.tour.Start")}}</el-button>
        <div class="ziti">{{$t("message.setting.manualstop")}}</div>
        <el-button type="danger" @click="stop()" round size="mini">{{$t("message.tour.stop")}}</el-button>
    </div>
</div>
</template>   


<script>
export default {
    name: 'record',
    data(){
        return {
            value:false,
            value1:true,
            recordstart:[],
            input:''
        }
    },
    mounted(){
        this.getsrc();
        this.Duration();
    },
    methods:{
        
        //录像时长
        Durationsetting(){
            console.log(this.input)
            if(this.input<10||this.input>240){
                this.$message('录像文件时长最短10分钟，最长240分钟，设置完毕后请重启。')
                this.Duration();
                return false
            }
            var url = this.$store.state.IPPORT + "/api/v1/SetRecordDuration?duration="+this.input+"&session="+ this.$store.state.token;
            //return false;
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    // this.input=result.data.nRecordDuration
                    this.$message(result.data.strCode)
                    this.$root.bus.$emit('webrtc',true);
                }//wei
            })
        },
        Duration(){
            var url = this.$store.state.IPPORT + "/api/v1/GetRecordDuration?session="+ this.$store.state.token;
            //return false;
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.input=result.data.nRecordDuration
                }//wei
            })
        },
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