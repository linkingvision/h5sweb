<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog :title="label.Edit" width="25%" :visible.sync="editPopup">
            <!-- 1 -->
            <el-form class="el_form" ref="form" label-position='left' label-width="100px" size="small " :model="editform">
                <el-form-item :label="label.Enable">
                    <el-select v-model="editform.bCloudMode" :placeholder="label.pleasechoose">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.MinPort">
                    <el-input v-model="editform.iPortRangeMin"></el-input>
                </el-form-item>
                <el-form-item :label="label.MaxPort">
                    <el-input v-model="editform.iPortRangeMax"></el-input>
                </el-form-item>
                <el-form-item :label="label.PublicIP">
                    <el-input v-model="editform.strCloudPublicIp"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer button_table">
                <el-button class="form_butt1" @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button class="form_butt" type="primary" @click="proedityes">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <!-- 两个表格 -->
            <!-- 表格 -->
        <el-table
            :data="tableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
            style="width: 100%">
            <el-table-column
                prop="bCloudMode"
                :label="label.Enable"
                width="100">
            </el-table-column>
            <el-table-column
            prop="strCloudPublicIp"
            :label="label.PublicIP">
            </el-table-column>
            <el-table-column
            prop="iPortRangeMin"
            :label="label.MinPort"
            min-width="80">
            </el-table-column>
            <el-table-column
            prop="iPortRangeMax"
            :label="label.MaxPort"
            min-width="140">
            </el-table-column>
            <el-table-column
                fixed="right"
                min-width="140">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    @change="handlechange(scope.$index,scope.row)"
                    size="mini"
                    :placeholder="label.Enterkeywords"/>
                </template>
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Detail")}}</el-button> -->
                    <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.edit")}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: center;"
            layout="prev, pager, next"
            @size-change="handleSizeChange1" 
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :total="total1">
        </el-pagination>
        
    </div>
</template>
<script>
import uuid from '../../../assets/js/uuid'
import '../../../assets/js/jQuery.md5.js'
  export default {
    data() {
      return {
        eltitle:this.$t("message.setting.Configuration"),
        search: '',//搜索
        activeName: 'cloudmode',
        tabPosition: 'button',//选项卡位置
        inputedit:[],
        label:{
            Enterkeywords:this.$t("message.table.Enterkeywords"),
            pleasechoose:this.$t("message.table.pleasechoose"),
            CloudMode:this.$t("message.setting.CloudMode"),
            RelayMode:this.$t("message.setting.RelayMode"),
            TURNServer:this.$t("message.setting.TURNServer"),

            PublicIP:this.$t("message.setting.PublicIP"),
            MinPort:this.$t("message.setting.MinPort"),
            MaxPort:this.$t("message.setting.MaxPort"),
            Password:this.$t("message.setting.password"),
            PasswordEncrypt:this.$t("message.setting.PasswordEncrypt"),
            Enable:this.$t("message.setting.Enable"),
            user:this.$t("message.setting.user"),
            Port:this.$t("message.table.Port"),
            IP:this.$t("message.table.IP"),
            Edit:this.$t("message.table.Edit")
        },
        //分页
        editform: {
            Type:"cloudmode",
            bCloudMode:"",
            strCloudPublicIp:"",
            iPortRangeMin:"",
            iPortRangeMax:"",

            bRelayMode:"",
            strRelayPublicIp:"",
            nRelayPublicPort:"",
            strRelayUser:"",
            strRelayPasswd:"",
            strCloudPort:"",
            bRelayPasswdEncrypt:"",

            bTurnServer:"",
            strTurnServerIp:"",
            nTurnServerPort:""
        },
        scaletype:[
            {
                value: "true",
                label: "true"
            },{
                value: "false",
                label: "false"
            }
        ],
        pageSize: 10,//一页数量
        editPopup:false,//编辑弹窗
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [],//1
        currentPage1: 1, // 当前页码
        total1: 0, // 总条数 1

        tableData2: [],//2
        total2: 0, // 总条数 2
        currentPage2: 1, // 当前页码2

        tableData3: [],//2
        total3: 0, // 总条数 2
        currentPage3: 1, // 当前页码2
        editpasswd:""//编辑的密码
      };
    },
    mounted(){
        this.loadCloud();
    },
    methods:{
        loadCloud(){
            this.editPopup = false;
            var url = this.$store.state.IPPORT + "/api/v1/GetRTCCloudModeInfo?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                // console.log(result)
                // return false;
                if(result.status == 200){
                    var itme=result.data;
                    var tabledata={
                        bCloudMode: itme.bCloudMode+"",
                        strCloudPublicIp:itme.strCloudPublicIp,
                        iPortRangeMin:itme.iPortRangeMin,
                        iPortRangeMax:itme.iPortRangeMax
                    };
                    // console.log(tabledata)
                    this.tableData.push(tabledata);
                    this.total1=this.tableData.length;
                }
            })
        },
        // 编辑
        handleEdit(index,row){
            
            // console.log(row.bCloudMode);
            // return false
            this.editPopup = true;
            this.editform["bCloudMode"] = row.bCloudMode;
            this.editform["iPortRangeMax"] = row.iPortRangeMax;
            this.editform["iPortRangeMin"] = row.iPortRangeMin;
            this.editform["strCloudPublicIp"] = row.strCloudPublicIp;

            this.editform["bRelayMode"] = row.bRelayMode;
            this.editform["strRelayPublicIp"] = row.strRelayPublicIp;
            this.editform["nRelayPublicPort"] = row.nRelayPublicPort;
            this.editform["strRelayUser"] = row.strRelayUser;
            this.editform["strRelayPasswd"] = row.strRelayPasswd;
            this.editform["bRelayPasswdEncrypt"] = row.bRelayPasswdEncrypt;

            this.editform["bTurnServer"] = row.bTurnServer;
            this.editform["strTurnServerIp"] = row.strTurnServerIp;
            this.editform["nTurnServerPort"] = row.nTurnServerPort;
            // this.editpasswd = row.strPasswd;
            // console.log(this.editform);
            // console.log(this.tableData[index])
        },
        //  编辑 的确定键
        proedityes(){
            var form=this.editform;
            var url = this.$store.state.IPPORT + "/api/v1/SetRTCCloudModeInfo?cloudmode="+encodeURIComponent(form.bCloudMode)+
            "&cloudpublicip="+encodeURIComponent(form.strCloudPublicIp)+
            "&portrangemin="+encodeURIComponent(form.iPortRangeMin)+
            "&portrangemax="+encodeURIComponent(form.iPortRangeMax)+
            "&session="+ this.$store.state.token;
            // console.log("cloudmode",url);
            // return false
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.editPopup = false;
                        this.tableData=[];
                        this.loadCloud();
                        this.$root.bus.$emit('webrtc',true);
                    }else{
                        this.$message({
                            message:this.$t("message.setting.Editorfailure") ,
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },

        selectCall(row){
            console.log("INDEX",row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                var selectop={
                    token:row[i].strToken,
                    index:row[i].index,
                    type:row[i].nFPSType
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                var selectop={
                    token:row[i].strToken
                };
                this.selectop.push(selectop);
            }
        },
        //分页
        change (e) {
            this.$forceUpdate()
        },
        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage1 = 1;
            this.pageSize = val;
        },
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
            this.currentPage1 = val;
        }
    },
  };
</script>