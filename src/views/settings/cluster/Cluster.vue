<template>
    <div class="Cluster">
        <div class="Cluster_block">
            <div class="Cluster_block_title">集群管理</div>
            <div class="Cluster_block_content">
                <el-form class="Cluster_form" label-position="left" label-width="140px" :model="form">
            
                    <el-form-item :label="label.NodeName">
                        <el-input v-model="form.strNodeName"></el-input>
                    </el-form-item>
                    <el-form-item :label="label.NodeID">
                        <el-input v-model="form.strNodeId"></el-input>
                    </el-form-item>
                    <el-form-item :label="label.RedisServerIP">
                        <el-input v-model="form.strServerIp"></el-input>
                    </el-form-item>
                    <el-form-item :label="label.LocalIP">
                        <el-input v-model="form.strNodeIp"></el-input>
                    </el-form-item>
                    <el-form-item :label="label.RedisServerPort">
                        <el-input v-model="form.nServerPort"></el-input>
                    </el-form-item>
                    <el-form-item label="SSL协议">
                        <el-switch active-color="#13ce66" v-model="ruleForm.ssl"></el-switch>
                    </el-form-item>
                    <el-form-item>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="Cluster_block">
            <div class="Cluster_block_title">集群开关</div>
            <div class="Cluster_block_content">
                <el-form class="Cluster_form" label-position="left" label-width="100px" :model="ruleForm">
                    <el-form-item :label="label.open_Close">
                        <el-switch active-color="#13ce66" v-model="ruleForm.switch"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="Cluster_but">
            <button @click="SetRedis">{{$t("message.camera.save")}}</button>
        </div>
        <el-dialog width="25%" :visible.sync="editPopup">
            <div class="Cluster_dialog">{{$t("message.cluster.PleaseHTTP")}}</div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"Cluster",
    data(){
        return {
            editPopup:false,
            label:{
                NodeName:this.$t("message.cluster.NodeName"),
                NodeID:this.$t("message.cluster.NodeID"),
                RedisServerIP:this.$t("message.cluster.RedisServerIP"),
                RedisServerPort:this.$t("message.cluster.RedisServerPort"),
                LocalIP:this.$t("message.cluster.LocalIP"),
                open_Close:this.$t("message.camera.open_Close"),
            },
            form: {
                strServerIp:"192.168.100.162",
                strNodeId:"node1",
                strNodeIp:"192.168.100.145",
                strNodeName:"node1",
                nServerPort:"6379",
            },
            ruleForm:{
                switch:null,
                ssl:null
            },

        }
    },
    mounted(){
        this.GetRedisConf()
        this.GetEnableRedis()
    },
    methods:{
        SetRedis(){
            console.log(this.ruleForm,this.form)
            // return
            var _this=this
            var form=_this.form
            var url = this.$store.state.IPPORT + "/api/v1/SetRedisConf?serverport="
            +form.nServerPort+"&nodeid="
            +form.strNodeId+"&nodename="
            +form.strNodeName+"&nodeip="
            +form.strNodeIp+"&serverip="
            +form.strServerIp+"&session="+ this.$store.state.token
            +'&ssl='+this.ruleForm.ssl;
            console.log(url ,111111111111);
            var url1 = this.$store.state.IPPORT + "/api/v1/SetEnableRedis?enable="+_this.ruleForm.switch+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log("SetRedisConf",result);
                if(result.status == 200){
                    if(result.data.bStatus){
                        this.$root.bus.$emit('webrtc',true);
                        this.$message({
                            message: result.data.strCode,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: result.data.strCode,
                            type: 'warning'
                        });
                    }
                }
            })
            this.$http.get(url1).then(result=>{
                console.log("SetEnableRedis",result);
                if(result.status == 200){
                    if(result.data.bStatus){
                        this.$root.bus.$emit('webrtc',true);
                        this.editPopup=true
                        this.$message({
                            message: result.data.strCode,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: result.data.strCode,
                            type: 'warning'
                        });
                    }
                }
            })
        },
        GetRedisConf(){
            var _this=this
            var url = this.$store.state.IPPORT + "/api/v1/GetRedisConf?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log("GetRedisConf",result);
                if(result.status == 200){
                    this.form=result.data
                }
            })
        },
        GetEnableRedis(){
            var url = this.$store.state.IPPORT + "/api/v1/GetEnableRedis?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log("GetEnableRedis",result);
                if(result.status == 200){
                    this.ruleForm["switch"]=result.data.enable
                    this.ruleForm["ssl"]=result.data.bSSL
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.Cluster{
    
    padding: 40px;
    .Cluster_dialog{
        text-align: center;
        margin-bottom: 20px;
    }
    .Cluster_block{
        margin-bottom: 40px;
        .Cluster_block_title{
            margin-bottom: 20px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 600;
        }
        .Cluster_block_content{
            padding: 20px 40px;
            .Cluster_form{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .el-form-item{
                    width: 30%;
                }
            }
        }
    }
    .Cluster_but{
        text-align: center;
        button{
            font-size: 16px;
            padding: 8px 8%;
            border: none;
            background: #3ABBFE;
            border-radius: 5px;
        }
    }
}
</style>