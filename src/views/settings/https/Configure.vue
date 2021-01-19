<template>
    <div class="Cluster">
        <div class="Cluster_block">
            <div class="Cluster_block_title">HTTP配置</div>
            <div class="Cluster_block_content">
                <el-form class="Cluster_form" label-position="left" label-width="140px" :model="form">
            
                    <el-form-item label="HTTP端口">
                        <el-input v-model="form.nHTTPPort"></el-input>
                    </el-form-item>
                    <el-form-item label="HTTPS端口">
                        <el-input v-model="form.nHTTPSPort"></el-input>
                    </el-form-item>
                    <el-form-item label="SSL证书文件">
                        <el-input v-model="form.strSSLCertificateFile"></el-input>
                    </el-form-item>
                    <el-form-item>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="Cluster_but">
            <button @click="SetHTTPConf">{{$t("message.camera.save")}}</button>
        </div>
    </div>
</template>
<script>
export default {
    name:"Cluster",
    data(){
        return {
            label:{
                open_Close:this.$t("message.camera.open_Close"),
            },
            form: {
                nHTTPPort:"8080",
                nHTTPSPort:"8443",
                strSSLCertificateFile:"server.pem",
            }

        }
    },
    mounted(){
        this.GetHTTPConf()

    },
    methods:{
        SetHTTPConf(){
            console.log(this.ruleForm,this.form)
            // return
            var _this=this
            var form=_this.form
            var url = this.$store.state.IPPORT + "/api/v1/SetHTTPConf?http="+form.nHTTPPort+
            "&https="+form.nHTTPSPort+
            "&sslcertificatefile="+form.strSSLCertificateFile+"&session="+ this.$store.state.token;

            this.$http.get(url).then(result=>{
                console.log("SetHTTPConf",result);
                if(result.status == 200){
                    if(result.data.bStatus){
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
        GetHTTPConf(){
            var _this=this
            var url = this.$store.state.IPPORT + "/api/v1/GetHTTPConf?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log("GetHTTPConf",result);
                if(result.status == 200){
                    this.form=result.data
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.Cluster{
    padding: 40px;
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