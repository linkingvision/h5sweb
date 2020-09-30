<template>
    <div>
        {{label.Loop}}
        <el-switch
            @change="systemchange"
            v-model="system"
            active-color="#53BCA1"
            inactive-color="#DCDFE6">
        </el-switch>
    </div>
</template>

<script>
export default {
    name:'log',
    data(){
        return {
            activeName:'cloudmode',
            label:{
                log:this.$t("message.setting.LogLevel"),
                Loop:this.$t("message.setting.LogRotating")
            },
            value: '',
            system:null,
        }
    },
    mounted(){
        this.systemdata()
    },
    methods:{
        systemchange(){
            var url = this.$store.state.IPPORT + "/api/v1/SetRotatingLog?enable="+this.system+"&session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.$message('修改成功')
                    this.$root.bus.$emit('webrtc',true);
                }
            })
        },
        systemdata(){
            var url = this.$store.state.IPPORT + "/api/v1/GetRotatingLog?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.system=result.data.enable
                }
            })
        },
    }
}
</script>

<style scoped>
.log_log{
    display: flex;
    align-items: center;
}
.log_log div:nth-child(1){
    margin-right: 10px;
}
</style>