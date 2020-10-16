<template>
    <div class="Protocol">
        <div>{{this.$t("message.setting.ServiceDetection")}}</div>
        <div>
            <el-switch
                @change="Certchange()"
                v-model="Certification"
                active-color="#13ce66">
            </el-switch>
        </div>
        <div class="portcheck">
            {{this.$t("message.GB.KeepaliveTime")}} <el-input class="portcheck_input" style="width:100px" v-model="input" type='number'></el-input>(S)
        </div>
    </div>
</template>


<script>
export default {
	name: 'Protocol',
	data(){
        return {
            input:'',
            Certification:''
        }
    },
	mounted(){
        this.Cert()
	},
	methods:{
        Cert(){
            var url = this.$store.state.IPPORT + "/api/v1/GetIpPortCheck?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    console.log(result)
                    if(result.status == 200){
                        this.input=result.data.nDetentionPeriod
                        this.Certification=result.data.enable
                    }
                }
            })
        },
        Certchange(){
            var url = this.$store.state.IPPORT + "/api/v1/SetIpPortCheck?enable="+this.Certification+"&period="+this.input+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    console.log(result)
                    this.$message('修改成功,请重启。')
                    this.$root.bus.$emit('webrtc',true);
                }
            },response => {
                    this.$message('修改失败')
                    this.Cert()
            })
        },
	}
}
</script>

<style lang="scss" scoped>
.Protocol{
    padding: 10px 20px;
    .portcheck{
        margin-top: 10px;
    }
}
</style>