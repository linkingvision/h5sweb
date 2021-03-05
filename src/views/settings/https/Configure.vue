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
                <el-form class="Cluster_form" label-position="left" label-width="140px" :model="form">
            
                    <el-form-item :label="label.ForceHTTPS">
                        <el-switch active-color="#13ce66" v-model="form.bForceHTTPS" @change='Together("bForceHTTPS",form.bForceHTTPS)'></el-switch>
                    </el-form-item>
                    <el-form-item :label="label.EnableDomain">
                        <el-switch active-color="#13ce66" v-model="form.bEnableDomain" @change='Together("bEnableDomain",form.bEnableDomain)'></el-switch>
                    </el-form-item>
                    <el-form-item :label="label.DocumentRoot">
                        <el-input v-model="form.strDocumentRoot"></el-input>
                    </el-form-item>
                    <el-form-item>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- <div class="Cluster_block">
            <div class="Cluster_block_title">{{$t("message.setting.ForceHTTPS")}}</div>
            <div class="Cluster_block_content">
                
            </div>
        </div> -->
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
                ForceHTTPS:this.$t("message.setting.ForceHTTPS"),
                EnableDomain:this.$t("message.setting.EnableDomain"),
                DocumentRoot:this.$t("message.setting.DocumentRoot"),
            },
            form: {
                nHTTPPort:"8080",
                nHTTPSPort:"8443",
                strSSLCertificateFile:"server.pem",
                bForceHTTPS:false,
                bEnableDomain:false,
                strDocumentRoot:"www/"
            }
        }
    },
    mounted(){
        this.GetHTTPConf()

    },
    methods:{
        Together(value,data){
            console.log(value,data)
            if(value=='bEnableDomain'){
                if(data){
                    this.form.bForceHTTPS=data
                }
            }else if(value=='bForceHTTPS'){
                if(!data){
                    this.form.bEnableDomain=data
                }
            }
        },
        SetHTTPConf(){
            console.log(this.ruleForm,this.form)
            // return
            var _this=this
            var form=_this.form
            var url = this.$store.state.IPPORT + "/api/v1/SetHTTPConf?http="+form.nHTTPPort+
            "&https="+form.nHTTPSPort+
            "&sslcertificatefile="+form.strSSLCertificateFile+
            "&forcehttps="+form.bForceHTTPS+
            "&enabledomain="+form.bEnableDomain+
            "&documentroot="+form.strDocumentRoot+"&session="+ this.$store.state.token;

            this.$http.get(url).then(result=>{
                console.log("SetHTTPConf",result);
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