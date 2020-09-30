<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog width="25%" :title="eltitle" :visible.sync="editPopup">
            <el-form class="el_form" ref="form" label-position='left' label-width="100px" size="small " :model="editform">
                    
                <el-form-item :label="label.Type">
                    <el-select v-model="editform.Type" placeholder="请选择">
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.Name">
                    <el-input v-model="editform.Name"></el-input>
                </el-form-item>
                <el-form-item :label="label.Token">
                    <el-input v-model="editform.Token"></el-input>
                </el-form-item>
                <el-form-item label="Username">
                    <el-input v-model="editform.User"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="editform.Password"></el-input>
                </el-form-item>
                <el-form-item label="IP">
                    <el-input v-model="editform.IP"></el-input>
                </el-form-item>
                <el-form-item :label="label.Port">
                    <el-input v-model="editform.Port"></el-input>
                </el-form-item>
                <el-form-item label="Audio">
                    <el-switch
                    v-model="editform.Audio">
                    </el-switch>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer button_table">
                <el-button class="form_butt1" @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button class="form_butt" type="primary" @click="edityes">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <el-dialog width="25%" :title="eltitle" :visible.sync="dialogFormVisible">
            <el-form class="el_form" ref="form" label-position='left' label-width="100px" size="small " :model="form">
            
                <el-form-item :label="label.Type">
                    <el-select v-model="form.Type" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.Name">
                    <el-input v-model="form.Name"></el-input>
                </el-form-item>
                <el-form-item :label="label.Token">
                    <el-input v-model="form.Token"></el-input>
                </el-form-item>
                <el-form-item label="Username" v-if="form.Type!='H5_DEV_HIKISC'">
                    <el-input v-model="form.Username"></el-input>
                </el-form-item>
                <el-form-item label="Password" v-if="form.Type!='H5_DEV_HIKISC'">
                    <el-input v-model="form.Password"></el-input>
                </el-form-item>
                <!-- lingyige -->
                <el-form-item label="AppKey "  v-if="form.Type=='H5_DEV_HIKISC'">
                    <el-input v-model="form.Username_isc"></el-input>
                </el-form-item>
                <el-form-item label="AppSecret"  v-if="form.Type=='H5_DEV_HIKISC'">
                    <el-input v-model="form.Password_isc"></el-input>
                </el-form-item>

                <el-form-item label="IP">
                    <el-input v-model="form.IP"></el-input>
                </el-form-item>
                <el-form-item :label="label.Port">
                    <el-input v-if="form.Type=='H5_DEV_HIK'" v-model="form.Port"></el-input>
                    <el-input v-if="form.Type=='H5_DEV_DH'" v-model="form.Port_dh"></el-input>
                    <el-input v-if="form.Type=='H5_DEV_HIKISC'" v-model="form.Port_isc"></el-input>
                    <el-input v-if="form.Type=='H5_DEV_TD'" v-model="form.Port_td"></el-input>
                    <el-input v-if="form.Type=='H5_DEV_UNV'" v-model="form.Port_unv"></el-input>
                    <el-input v-if="form.Type=='H5_DEV_DHDSS'" v-model="form.Port_DSS"></el-input>
                </el-form-item>
                <el-form-item label="Audio">
                    <el-switch
                    v-model="form.Audio">
                    </el-switch>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer button_table">
                <el-button class="form_butt1" @click="dialogFormVisible = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button class="form_butt" type="primary" @click="platformyes">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <div class="button_edi">
            <CButton class="form_butt" @click="addto" type="submit">添加</CButton>
            <CButton class="form_butt1" @click="deleteselect" type="submit">删除</CButton>
        </div>
            <!-- 表格 -->
        <el-table
            :data="tableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
            @select='selectCall'
            @select-all='select_Call'
            style="width: 100%">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
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
            label="IP"
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
            prop="Type"
            :label="label.Type"
            min-width="140">
            </el-table-column>
            <el-table-column
            prop="Token"
            :label="label.Token">
            </el-table-column>
            <el-table-column
                fixed="right"
                min-width="140">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="mini"
                    @change="handlechange(scope.$index,scope.row)"
                    placeholder="输入关键字"/>
                </template>
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.edit")}}</el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index,scope.row, tableData)" type="text" size="small">{{$t("message.setting.DeleteAll")}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: center;"
            layout=" prev, pager, next,total, jumper"
            @size-change="handleSizeChange1" 
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :total="total2">
        </el-pagination>
        
    </div>
</template>
<script>
import uuid from '../../../assets/js/uuid'
  export default {
    name:"GB",
    data() {
      return {
        eltitle:this.$t("message.setting.Configuration"),
        search: '',//搜索
        activeName: 'first',
        tabPosition: 'button',//选项卡位置
        inputedit:[],
        label:{
            label:"H5_DEV",//选1

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
                value: 'H5_DEV_HIK',
                label: 'H5_DEV_HIK'
            }, {
                value: 'H5_DEV_DH',
                label: 'H5_DEV_DH'
            }
            , {
                value: 'H5_DEV_HIKISC',
                label: 'H5_DEV_HIKISC'
            }
            , {
                value: 'H5_DEV_TD',
                label: 'H5_DEV_TD'
            }, {
                value: 'H5_DEV_UNV',
                label: 'H5_DEV_UNV'
            }, {
                value: 'H5_DEV_DHDSS',
                label: 'H5_DEV_DHDSS'
            }
        ],
        //分页
        pageSize: 10,//一页数量
        currentPage1: 1, // 当前页码
        total2: 0, // 总条数 1
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            Type: 'H5_DEV_HIK',
            Name:"Device1",
            Token:"platform1",
            Username:"admin",
            Username_isc:"22936233",
            Password:"admin12345",
            Password_isc:"px50TzrNNUiU1uxloJLG",
            IP:"192.168.1.1",
            Port:"8000",
            Port_dh:"37777",
            Port_isc:"443",
            Port_td:"3000",
            Port_unv:"80",
            Port_DSS:"9000",
            Audio:false
        },
        editform: {
            Audio:"false"
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [],//1
        selectop:[]//选择那几个
      };
    },
    mounted(){
        // this.loadHIK();
    },
    methods:{
        //第一个表格的数据
        loadHIK(){
          //url
          var url = this.$store.state.IPPORT + "/api/v1/GetDevice?getonline=true&session="+ this.$store.state.token;
          //   console.log("***********************",url)
            this.$http.get(url).then(result=>{
              if(result.status == 200){
                  var itme=result.data.dev;
                  console.log(result);
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          index:i+1,
                          Type:itme[i].nType,
                          Name:itme[i].strName,
                          Token:itme[i].strToken,
                          User:itme[i].strUser,
                          Password:itme[i].strPasswd,
                          IP:itme[i].strDevIpAddress,
                          Port:itme[i].strDevPort,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          bPasswdEncrypt:itme[i].bPasswdEncrypt
                      };
                      this.tableData.push(tabledata);
                      //console.log(tabledata);
                  }
                  this.total2=this.tableData.length;
              }
            })
          },
        
        //点击添加时随机获取到token数据
        addto(){
            this.dialogFormVisible=true;
            this.form["Token"] = uuid(4, 16).toLowerCase();
        },
        //编辑成功
        Success(){
            
            var form=this.editform;
            // console.log(this.editindex,form.Type);
            // return false;
            //url
            if(form.Type=="H5_DEV_HIK"){
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceHik?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.User)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                    }
                })
            }else if(form.Type=="H5_DEV_DH"){
                console.log(form.Type)
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceDh?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.User)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                    }
                })
            }else if(form.Type=="H5_DEV_HIKISC"){
                console.log(form.Type)
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceHikISC?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.User)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log("isc****************************",url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                    }
                })
            }else if(form.Type=="H5_DEV_TD"){
                console.log(form.Type)
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceTd?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.User)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log("td****************************",url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                    }
                })
            }else if(form.Type=="H5_DEV_UNV"){
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceUnv?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.User)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log("yushi****************************",url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                    }
                })
            }else if(form.Type=="H5_DEV_DHDSS"){
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceUnv?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.User)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log("yushi****************************",url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                    }
                })
            }

        },
        //  编辑  添加 的确定键
        edityes(){
            console.log(this.editindex);
            //return false;
            this.editPopup = false;
            //url
            var form=this.editform;
            console.log("45111111******",form)
            //return false;
            var url1 = this.$store.state.IPPORT + "/api/v1/DelDevice?token="+encodeURIComponent(this.edittoken)+"&session="+ this.$store.state.token;
            console.log("isc------------------------",url1)
            this.$http.get(url1).then(result=>{
                //console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var list = {
                            index:form.index,
                            Type:form.Type,
                            Name:form.Name,
                            Token:form.Token,
                            User:form.User,
                            Password:form.Password,
                            IP:form.IP,
                            Port:form.Port,
                            Audio :form.Audio,
                            Online:form.Online+"",
                            bPasswdEncrypt:form.bPasswdEncrypt
                            }
                        this.tableData.splice(this.editindex, 1,list)
                        
                        this.Success();
            
                        
                    }else{
                        console.log("编辑失败")
                        this.$message({
                            message: this.$t("message.setting.Editorfailure"),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
            
        },
        platformyes(){
            this.dialogFormVisible=false;
            console.log(this.form)
            //return false;
            var form=this.form;
            
            console.log(form.Type)
            // return false
            if(form.Type=="H5_DEV_HIK"){
              var url = this.$store.state.IPPORT + "/api/v1/AddDeviceHik?&name="+encodeURIComponent(form.Name)+
              "&token="+encodeURIComponent(form.Token)+
              "&user="+encodeURIComponent(form.Username)+
              "&password="+encodeURIComponent(form.Password)+
              "&ip="+encodeURIComponent(form.IP)+
              "&port="+encodeURIComponent(form.Port)+
              "&audio="+form.Audio+
              "&session="+ this.$store.state.token;
              console.log(url);
              this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.tableData=[];
                        this.loadHIK();
                    }else{
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                        return false;
                    }
                  
                }
              })
            }else if(form.Type=="H5_DEV_DH"){
                console.log(form.Type)
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceDh?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.Username)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port_dh)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.tableData=[];
                            this.loadHIK();
                        }else{
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }else if(form.Type=="H5_DEV_HIKISC"){
                console.log(form.Type)
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceHikISC?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.Username_isc)+
                "&password="+encodeURIComponent(form.Password_isc)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port_isc)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.tableData=[];
                            this.loadHIK();
                        }else{
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }else if(form.Type=="H5_DEV_TD"){
                console.log(form.Type)
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceTd?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.Username)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port_td)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.tableData=[];
                            this.loadHIK();
                        }else{
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }else if(form.Type=="H5_DEV_UNV"){
                console.log(form.Type)
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceUnv?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.Username)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port_unv)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.tableData=[];
                            this.loadHIK();
                        }else{
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }else if(form.Type=="H5_DEV_DHDSS"){
                console.log(form.Type)
                var url = this.$store.state.IPPORT + "/api/v1/AddDeviceDss?&name="+encodeURIComponent(form.Name)+
                "&token="+encodeURIComponent(form.Token)+
                "&user="+encodeURIComponent(form.Username)+
                "&password="+encodeURIComponent(form.Password)+
                "&ip="+encodeURIComponent(form.IP)+
                "&port="+encodeURIComponent(form.Port_DSS)+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.tableData=[];
                            this.loadHIK();
                        }else{
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }
            
        },
        // 编辑 移除
        handleEdit(index,row){
            console.log("****************",row);
            var index_xlh=((this.currentPage1-1)*10)+index;
            // return false;
            this.editPopup = true;
            this.edittoken=row.Token;
            this.editindex=index_xlh;
            
            this.editform["Type"]=row.Type;
            this.editform["index"]=row.index;
            this.editform["Name"]=row.Name;
            this.editform["Token"]=row.Token;
            this.editform["User"]=row.User;
            this.editform["Password"]=row.Password;
            this.editform["IP"]=row.IP;
            this.editform["Port"]=row.Port;
            this.editform["Audio"]=row.Audio;
            this.editform["Online"]=row.Online;
            this.editform["bPasswdEncrypt"]=row.bPasswdEncrypt;
            // console.log(this.editform)
            // console.log(this.tableData[index])
            
            
            
            
        },
        //删除
        deleteRow(index, row,rows) {
            //var form=this.form;
            // console.log(index)
            console.log("序列号",((this.currentPage1-1)*10)+index);
            var index_xlh=((this.currentPage1-1)*10)+index;
            //return false;
            //url
            var url = this.$store.state.IPPORT + "/api/v1/DelDevice?token="+encodeURIComponent(row.Token)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log(result);
                console.log(this.tableData);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        rows.splice(index_xlh, 1);
                    }else{
                        this.$message({
                            message: '删除失败',
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },
        //全选删除
        deleteselect(){
            var token=this.selectop;
            console.log(token)
            //return false;
            //url
            for(var i=0;i<token.length;i++){
                var url = this.$store.state.IPPORT + "/api/v1/DelDevice?token="+encodeURIComponent(token[i].token)+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    console.log(result);
                    console.log(this.tableData);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.loadHIK();
                        }else{
                            this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }
            
        },
        selectCall(row){
            console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                console.log(row[i].Token)
                var selectop={
                    token:row[i].Token
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                console.log(row[i].Token)
                var selectop={
                    token:row[i].Token,
                };
                this.selectop.push(selectop);
            }
        },
        //搜索
        handlechange(){},
        //分页

        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage1 = 1;
            this.pageSize = val;
        },
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
            this.currentPage1 = val;
        },
    },
  };
</script>