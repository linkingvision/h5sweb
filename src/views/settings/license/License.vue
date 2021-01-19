<template>
	<div class="BatchImport">
        <div class="BatchImport_flex">
            <div class="BatchImport_title">
                License{{lable.Import}}
            </div>
            <el-input placeholder="License文件" v-model="input">
                <template slot="append">
                    <!-- 按钮 -->
                    <el-upload
                    class="upload"
                    action=""
                    :multiple="false"
                    :show-file-list="false"
                    :http-request="httpRequest">
                    <el-button size="small" class="iconfont icon-wenjianjia" type="primary"></el-button>
                    </el-upload>
                </template>
            </el-input>
            <!-- 按钮 end -->
            <div class="BatchImport_butt">
                <el-button size="small" @click="cancel" type="primary">{{lable.Cancel}}</el-button>
                <el-button size="small" @click="UpLoadLic" type="primary">{{lable.Import}}</el-button>
            </div>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="详情" name="1">
                    <div class="flex_nc_ag">
                        <div class="flex_nc_cpu" v-for="(b,index) in capability" :key="index">
                            <span class="cpu_zuo">{{b.name}}:</span>
                            <span class="cpu_you" > {{b.id}}</span>
                            
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
     </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
	data () {
		return {
            activeNames:[],
            tableData: [],
            input:null,
            file:null,
            capability:null,
            system:null,
            lable:{
                DeviceImport:this.$t("message.setting.DeviceImport"), 
                Import:this.$t("message.setting.Import"),
                Batchimportdevice:this.$t("message.setting.Batchimportdevice"),
                Cancel: this.$t("message.setting.Cancel"),
            },
		}
    },
    mounted(){
        this.GetSystemInfo()
    },
	methods: {
        //版权
        GetSystemInfo() {
            let _this = this;
            var url =_this.$store.state.IPPORT + "/api/v1/GetSystemInfo?session=" + _this.$store.state.token;
            _this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200) {
                    var data =  result.data;
                    var cpu=[{
                        name:this.$t("message.dashboard.version"),
                        id:data.strVersion
                    },{
                        name:this.$t("message.dashboard.hostid"),
                        id:data.strHostId
                    },{
                        name:this.$t("message.dashboard.license"),
                        id:data.strLicenseType
                    },{
                        name:this.$t("message.dashboard.channel"),
                        id:data.strChannelLimit
                    },{
                        name:this.$t("message.dashboard.endtime"),
                        id:data.strEndtime
                    }]
                    var fun=[{
                        name:this.$t("message.dashboard.devicesdk"),
                        id:data.bDeviceSDK
                    },{
                        name:this.$t("message.dashboard.transcoding"),
                        id:data.bTranscoding
                    },{
                        name:this.$t("message.dashboard.gb28181"),
                        id:data.bGB28181
                    },{
                        name:this.$t("message.dashboard.devicesdkpb"),
                        id:data.bDeviceSDKPb
                    },{
                        name:this.$t("message.dashboard.cluster"),
                        id:data.bCluster
                    },{
                        name:this.$t("message.dashboard.VideoConference"),
                        id:data.bVideoConference
                    },{
                        name:this.$t("message.dashboard.Platform"),
                        id:data.bPlatform
                    },{
                        name:this.$t("message.dashboard.Lingvideo"),
                        id:data.bLingvideo
                    },{
                        name:this.$t("message.dashboard.Docker"),
                        id:data.bDocker
                    }]
                    this.capability=cpu;
                    this.system=fun;
                    // console.log("***********",this.system)
                }
            }).catch(error => {
                console.log("GetSystemInfo");
            });
        },
        //导入
	    httpRequest (e) {
            let file = e.file // 文件信息
            console.log('e: ', e)
            console.log('file: ', e.file)
            this.input=file.name
            this.file=file
        },
        UpLoadLic(){
            var url =this.$store.state.IPPORT + "/api/v1/UpLoadLic?session=" + this.$store.state.token;
            this.$http.post(url,this.file,{headers: {'Content-Type': 'application/octet-stream'}}).then(result => {
                console.log(result)
                if (result.status == 200) {
                    if(result.data.bStatus){
                        this.GetSystemInfo()
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
            }).catch(error => {
                console.log("UpLoadLic",error);
            });
        },
        //取消
        cancel(){
            this.input=null
            this.file=null
        }
    }
}
</script>
<style lang="scss" scoped>
.BatchImport{
    width: 100%;
    display: flex;
    justify-content: center;
    .BatchImport_flex{
        width: 30%;
        display: flex;
        // justify-content: center;
        flex-wrap: wrap;
        // align-items: center;
        margin-top: 10%;
        .flex_nc_ag{
            margin: 5px 0;
            height:80%;
            display: flex;
            flex-wrap: wrap;
            overflow-y: auto;
            align-content: space-between;
            .flex_nc_cpu{
                width: 100%;
                margin: 0 0 0 10px;
                margin-bottom: 10px;
                .cpu_zuo{
                    font-size:12px;
                    /* font-family:PingFang SC; */
                    font-weight:600;
                    margin-right: 8px;
                    opacity:0.6;
                }
                .cpu_you{
                    font-size:12px;
                    /* font-family:PingFang SC; */
                    font-weight:600;
                }
                #foo{
                    border: 0;
                    width: 78%;
                    background: none;
                }
            }
        }
        .BatchImport_title{
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 600;
            margin-bottom: 60px;
        }
        .el-input{
            width: 100%;
            text-align: right;
            margin-bottom: 30px;
            .el-input-group__append{
                    .el-button{
                        font-size: 16px;
                    }
                }
        }
        .BatchImport_butt{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            button:nth-child(1){
                background: none;
                border: 1px solid #3ABBFE;
            }
            button:nth-child(2){
                background: #3ABBFE;
                border: none;
            }
        }
    }
}
</style>