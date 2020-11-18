<template>
	<div class="BatchImport">
        <div class="BatchImport_flex">
            <div class="BatchImport_title">
                {{lable.Batchimportdevice}}
            </div>
            <el-input placeholder="请选择文件" v-model="input">
                <template slot="append">
                    <!-- 按钮 -->
                    <el-upload
                    class="upload"
                    action=""
                    :multiple="false"
                    :show-file-list="false"
                    accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :http-request="httpRequest">
                    <el-button size="small" class="iconfont icon-wenjianjia" type="primary"></el-button>
                    </el-upload>
                </template>
            </el-input>
            <div class="BatchImport_up">
                <a href="/doc/devtemplate.xlsx" download="devtemplate.xlsx" class="waves-effect" > <div>下载文件模版</div></a>
            </div>
            <!-- 按钮 end -->
            <div class="BatchImport_butt">
                <el-button size="small" type="primary" @click="cancel">{{lable.Cancel}}</el-button>
                <el-button size="small" type="primary" @click="Upload">{{lable.Import}}</el-button>
            </div>
        </div>
     </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
	data () {
		return {
            tableData: [],
            input:'',
            lable:{
                DeviceImport:this.$t("message.setting.DeviceImport"), 
                Import:this.$t("message.setting.Import"),
                Batchimportdevice:this.$t("message.setting.Batchimportdevice"),
                Cancel: this.$t("message.setting.Cancel"),
            },
		}
	},
	methods: {
        //取消
        cancel(){
            this.input=''
            this.tableData=[]
        },
        //上传
        Upload(){
            var root = this.$store.state.IPPORT;
            if(this.tableData.length==0){
                return false
            }else{
                console.log(this.tableData)
                var data=this.tableData
                for(var i=0;i<data.length;i++){
                    // console.log(data[i].Type)
                    var from=data[i]
                    if(data[i].Type=='H5_STREAM'){
                        var url = root + "/api/v1/AddSrcRTSP?name="+encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&user="+encodeURIComponent(from.Username)+
                        "&password="+encodeURIComponent(from.Password)+
                        "&audio="+from.Audio+
                        "&url="+encodeURIComponent(from.URL)+
                        "&session="+ this.$store.state.token;
                        console.log('H5_STREAM',from.Type,url)
                        this.platfromyes(url,from.Type);
                    }else if(data[i].Type=='H5_ONVIF'){
                        var url = root + "/api/v1/AddSrcONVIF?name="
                        +encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&user="+encodeURIComponent(from.Username)+
                        "&password="+encodeURIComponent(from.Password)+
                        "&audio="+from.Audio+
                        "&ip="+encodeURIComponent(from.IP)+
                        "&port="+encodeURIComponent(from.Port)+
                        "&session="+ this.$store.state.token;
                        this.platfromyes(url,from.Type);
                        console.log('H5_ONVIF',from.Type,url)
                    }else if(data[i].Type=='H5_FILE'){
                        var url = root + "/api/v1/AddSrcFile?name="
                        +encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&url="+encodeURIComponent(from.URL)+
                        "&session="+ this.$store.state.token;
                        console.log('H5_FILE',from.Type,url)

                    }else if(data[i].Type=='H5_DEV_HIK'){
                        var url = root + "/api/v1/AddDeviceHik?name="+encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&user="+encodeURIComponent(from.Username)+
                        "&password="+encodeURIComponent(from.Password)+
                        "&ip="+encodeURIComponent(from.IP)+
                        "&port="+encodeURIComponent(from.Port)+
                        "&audio="+from.Audio+
                        "&session="+ this.$store.state.token;
                        console.log('H5_DEV_HIK',from.Type,url)
                        this.platfromyes(url,from.Type);
                    }else if(data[i].Type=='H5_DEV_DH'){
                        var url = root + "/api/v1/AddDeviceDh?name="+encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&user="+encodeURIComponent(from.Username)+
                        "&password="+encodeURIComponent(from.Password)+
                        "&ip="+encodeURIComponent(from.IP)+
                        "&port="+encodeURIComponent(from.Port)+
                        "&audio="+from.Audio+
                        "&session="+ this.$store.state.token;
                        this.platfromyes(url,from.Type);
                        console.log('H5_DEV_DH',from.Type,url)
                    }else if(data[i].Type=='H5_DEV_HIKISC'){
                        var url = root + "/api/v1/AddDeviceHikISC?name="+encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&user="+encodeURIComponent(from.Username_isc)+
                        "&password="+encodeURIComponent(from.Password_isc)+
                        "&ip="+encodeURIComponent(from.IP)+
                        "&port="+encodeURIComponent(from.Port)+
                        "&audio="+from.Audio+
                        "&session="+ this.$store.state.token;
                        this.platfromyes(url,from.Type);
                        console.log('H5_DEV_HIKISC',from.Type,url)
                    }else if(data[i].Type=='H5_DEV_TD'){
                        var url = root + "/api/v1/AddDeviceTd?name="+encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&user="+encodeURIComponent(from.Username)+
                        "&password="+encodeURIComponent(from.Password)+
                        "&ip="+encodeURIComponent(from.IP)+
                        "&port="+encodeURIComponent(from.Port)+
                        "&audio="+from.Audio+
                        "&session="+ this.$store.state.token;
                        this.platfromyes(url,from.Type);
                        console.log('H5_DEV_TD',from.Type,url)
                    }else if(data[i].Type=='H5_DEV_UNV'){
                        var url = root + "/api/v1/AddDeviceUnv?name="+encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&user="+encodeURIComponent(from.Username)+
                        "&password="+encodeURIComponent(from.Password)+
                        "&ip="+encodeURIComponent(from.IP)+
                        "&port="+encodeURIComponent(from.Port)+
                        "&audio="+from.Audio+
                        "&session="+ this.$store.state.token;
                        this.platfromyes(url,from.Type);
                        console.log('H5_DEV_UNV',from.Type,url)
                    }else if(data[i].Type=='H5_DEV_DHDSS'){
                        var url = root + "/api/v1/AddDeviceDss?name="+encodeURIComponent(from.Name)+
                        "&token="+encodeURIComponent(from.Token)+
                        "&user="+encodeURIComponent(from.Username)+
                        "&password="+encodeURIComponent(from.Password)+
                        "&ip="+encodeURIComponent(from.IP)+
                        "&port="+encodeURIComponent(from.Port)+
                        "&audio="+from.Audio+
                        "&session="+ this.$store.state.token;
                        this.platfromyes(url,from.Type);
                        console.log('H5_DEV_DHDSS',from.Type,url)
                    }else{
                        console.log(data[i].Type)
                    }
                }
            }
        },
        platfromyes(url,Type){
            var _this=this
            $.ajax({
                type: 'get',
                url: url,  
                async: false,  
                success: function(data){ 
                    console.log("添加人员",data)
                    if(data.bStatus==true){
                        console.log('添加成功',Type)
                    }else{
                        _this.$message({
                            message: '添加失败'+Type,
                            type: 'warning'
                        });
                        return false;
                    }
                }  
            });
        },
        //导入
	    httpRequest (e) {
            let file = e.file // 文件信息
            console.log('e: ', e)
            console.log('file: ', e.file)
            if (!file) {
                // 没有文件
                return false
            } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
                // 格式根据自己需求定义
                this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
                return false
            }
            
            this.input=e.file.name
            const fileReader = new FileReader()
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result
                    const workbook = XLSX.read(data, {
                    type: 'binary' // 以字符编码的方式解析
                    })
                    const exlname = workbook.SheetNames[0] // 取第一张表
                    const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
                    console.log(exl)
                    // 将 JSON 数据挂到 data 里
                    this.tableData = exl
                    console.log(this.tableData)
                    // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
                } catch (e) {
                    console.log('出错了：：')
                    return false
                }
	        }
            fileReader.readAsBinaryString(file)
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
        .BatchImport_up{
            margin-bottom: 40px;
            div{
                font-family: PingFang SC;
                font-weight: 600;
                color: #2CA3FB;
                cursor:pointer;
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