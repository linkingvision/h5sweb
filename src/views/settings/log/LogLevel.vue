<template>
    <div>
        <div class="log_log">
            
            <div>{{label.log}}</div>
            
            <el-select v-model="value" style="width:150px" size='mini' placeholder="请选择" @change='loglevelchange'>
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
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
            options: [{
                value: 'H5_LOG_DEBUG',
                label: 'H5_LOG_DEBUG'
                }, {
                value: 'H5_LOG_INFO',
                label: 'H5_LOG_INFO'
                },{
                value: 'H5_LOG_WARNING',
                label: 'H5_LOG_WARNING'
                },{
                value: 'H5_LOG_ERROR',
                label: 'H5_LOG_ERROR'
            }],
            value: '',
            system:null,
        }
    },
    mounted(){
        this.loglevel()
    },
    methods:{
        //log
        loglevelchange(){
            console.log(this.value)
            var url = this.$store.state.IPPORT + "/api/v1/SetLogLevel?level="+this.value+"&session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.$message('修改成功')
                    this.$root.bus.$emit('webrtc',true);
                }
            })
        },
        loglevel(){
            var url = this.$store.state.IPPORT + "/api/v1/GetLogLevel?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.value=result.data.strLevelLog
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