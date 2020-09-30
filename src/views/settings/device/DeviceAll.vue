<template>
    <div>
        <!-- 两个表格 -->
        <!-- 表格 -->
        <el-table
            :data="tableData3.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage3-1)*pageSize,currentPage3*pageSize)"
            stripe
            style="width: 100%">
            <el-table-column
                prop="index"
                :label="label.Index"
                width="100">
            </el-table-column>
            <el-table-column
            prop="Name"
            :label="label.Name">
            </el-table-column>
            <el-table-column
            prop="IP"
            :label="label.IP"
            min-width="140">
            </el-table-column>
            <el-table-column
            prop="Port"
            :label="label.Port">
            </el-table-column>
            <el-table-column
            prop="User"
            :label="label.User">
            </el-table-column>
            <el-table-column
            prop="Online"
            :label="label.Online">
            </el-table-column>
            <el-table-column
            prop="Token"
            :label="label.Token"
            min-width="140">
            </el-table-column>
            <el-table-column
            prop="Type"
            :label="label.Type"
            min-width="140">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    @change="handlechange(scope.$index,scope.row)"
                    size="mini"
                    placeholder="输入关键字"/>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: center;"
            layout=" prev, pager, next,total, jumper"
            @size-change="handleSizeChange4" 
            @current-change="handleCurrentChange4"
            :current-page="currentPage3"
            :total="total3">
        </el-pagination>
        
    </div>
</template>
<script>
import uuid from '../../../assets/js/uuid'

  export default {
    data() {
      return {
        eltitle:this.$t("message.setting.Configuration"),
        search: '',//搜索
        activeName: 'H5_STREAM',//优先显示选项卡
        inputedit:[],
        label:{
            label:"H5_STREAM",//选1
            label1:"H5_ONVIF",//选2
            label2:"H5_FILE",//选2
            label3:this.$t("message.setting.all"),//选3
            
            Index:this.$t("message.table.Index"),
            Name:this.$t("message.table.Name"),
            IP:this.$t("message.table.IP"),
            Port:this.$t("message.table.Port"),
            User:this.$t("message.table.User"),
            Online:this.$t("message.table.Online"),
            Type:this.$t("message.table.Type"),
            Token:this.$t("message.table.Token")
        },
        options: [{
                value: 'H5_STREAM',
                label: 'H5_STREAM'
            }, {
                value: 'H5_ONVIF',
                label: 'H5_ONVIF'
            }, {
                value: 'H5_FILE',
                label: 'H5_FILE'
            }
        ],
        //分页
        pageSize: 10,//一页数量
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            Type:"H5_STREAM",
            Name:"Cam1",
            Token:"",
            Username:"admin",
            Password:"12345",
            URL:"rtsp://192.168.1.1/stream",
            Audio:"false",
            IP:"192.168.1.1",
            Port:"80"
        },
        editform: {
            Audio:"false"
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        
        tableData3: [],//4
        total3: 0, // 总条数 4
        currentPage3: 1, // 当前页码4
        selectop:[]//选择啦那几个
      };
    },
    mounted(){
        this.loadqb();
    },
    methods:{
        
        //第四个表格的数据
        loadqb(){
          //url
          var url = this.$store.state.IPPORT + "/api/v1/GetSrc?session="+ this.$store.state.token;
          //console.log("444",url);
            this.$http.get(url).then(result=>{
              //console.log("a",result);
              if(result.status == 200){
                  var itme=result.data.src;
                  
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          index:i+1,
                          Type:itme[i].nType,
                          Name:itme[i].strName,
                          Token:itme[i].strToken,
                          User:itme[i].strUser,
                          Password:itme[i].strPasswd,
                          IP:itme[i].strSrcIpAddress,
                          Port:itme[i].strSrcPort,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          bPasswdEncrypt:itme[i].bPasswdEncrypt
                      };
                      this.tableData3.push(tabledata);
                      
                      //console.log(tabledata);
                  }
                  this.total3=this.tableData3.length;
              }
            })
        },
        
        //搜索
        handlechange(){},
        //分页
        
        handleSizeChange4(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage3 = 1;
            this.pageSize = val;
        },
        handleCurrentChange4(val) {
            console.log(`当前页: ${val}`);
            this.currentPage3 = val;
        },
        
    },
  };
</script>

