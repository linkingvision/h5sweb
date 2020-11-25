
<template>
    <div>
      <!-- 编辑弹窗 -->
        <el-dialog width="25%" :title="eltitle" :visible.sync="editPopup">
          <el-form class="el_form" ref="form" label-position='left' label-width="100px" size="small " :model="editform">
              <el-form-item :label="label.Type">
                    <el-select v-model="editform.Type" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.Name">
                    <el-input v-model="editform.Name"></el-input>
                </el-form-item>
                <el-form-item :label="label.Token">
                    <el-input v-model="editform.Token"></el-input>
                </el-form-item>
                <el-form-item label="Audio">
                    <el-switch
                    v-model="editform.Audio"
                    active-text="ON"
                    inactive-text="OFF">
                    </el-switch>
                </el-form-item>
              
          </el-form>
          <div slot="footer" class="dialog-footer button_table">
              <el-button class="form_butt1" @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
              <el-button class="form_butt" type="primary" @click="edityes">{{$t("message.setting.OK")}}</el-button>
          </div>
        </el-dialog>
        <!-- 添加的弹窗 -->
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
                <el-form-item label="Audio">
                    <el-switch
                        v-model="form.Audio"
                        active-text="ON"
                        inactive-text="OFF">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer button_table">
                <el-button class="form_butt1" @click="dialogFormVisible = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button class="form_butt" type="primary" @click="platformyes">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <!-- 两个表格 -->
        <!-- 添加 -->
        <div class="button_edi">
            <CButton class="form_butt" @click="addto" type="submit">添加</CButton>
            <CButton class="form_butt1" @click="deleteselect" type="submit">删除</CButton>
        </div>
            <!-- 表格 -->
        <el-table
            :data="tableData.slice((currentPage2-1)*pageSize,currentPage2*pageSize).filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))"
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
                    <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Detail")}}</el-button>
                    <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.edit")}}</el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index,scope.row, tableData)" type="text" size="small">{{$t("message.setting.DeleteAll")}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: center;"
            layout=" prev, pager, next,total, jumper"
            @size-change="handleSizeChange3" 
            @current-change="handleCurrentChange3"
            :current-page="currentPage2"
            :total="total2">
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
            Token:this.$t("message.table.Token"),

            username:this.$t("message.setting.username"),
            password:this.$t("message.setting.password")
        },
        options: [{
                value: 'H5_RTMP_PUSH',
                label: 'H5_RTMP_PUSH'
            }
        ],
        //分页
        pageSize: 10,//一页数量
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            Type: 'H5_RTMP_PUSH',
            Name:"Cam1",
            Token:"platform1",
            Audio:false
        },
        editform: {
            Type: 'H5_RTMP_PUSH',
            Name:"Cam1",
            Token:"platform1",
            Audio:false
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        
        tableData: [],//3
        total2: 0, // 总条数 3
        currentPage2: 1, // 当前页码3
        selectop:[]//选择啦那几个
      };
    },
    mounted(){
        this.loadfile();
    },
    methods:{
        loadfile(){
          //url
          var url = this.$store.state.IPPORT + "/api/v1/GetSrc?type=H5_RTMP_PUSH&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
              console.log("a",result);
              if(result.status == 200){
                  var itme=result.data.src;
                  this.tableData=[]
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          index:i+1,
                          Type:itme[i].nType,
                          Name:itme[i].strName,
                          Token:itme[i].strToken,
                          User:itme[i].strUser,
                          Password:itme[i].strPasswd,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          bPasswdEncrypt:itme[i].bPasswdEncrypt
                      };
                      this.tableData.push(tabledata);
                      //console.log(tabledata);
                  }
                //   console.log("xiugai",this.tableData)
                  this.total2=this.tableData.length;
              }
            })
        },
        //查看
        handleClick(index,row){
           //console.log(row,index,this.tableData);
            this.$alert(
                '<div> Type: '
                +row.Type+'</div><div>Name: '
                +row.Name+'</div><div>Token: '
                +row.Token+'</div><div>User: '
                +row.User+'</div><div>Password:' 
                +row.Password+'</div><div>Audio: '
                +row.Audio+'</div><div>Online: '
                +row.Online+'</div><div>bPasswdEncrypt: '
                +row.bPasswdEncrypt+'</div>', '详情',{dangerouslyUseHTMLString: true});
        },
        
        // 编辑
        handleEdit(index,row){
            console.log(index);
            console.log(this.tableData[index]);
            console.log("序列号",((this.currentPage1-1)*10)+index);
            var index_xlh=((this.currentPage1-1)*10)+index;
            //return false;
            this.editPopup = true;
            this.edittoken=row.Token;
            this.editindex=index_xlh;
            
            this.editform["Type"]=row.Type;
            this.editform["index"]=row.index;
            this.editform["Name"]=row.Name;
            this.editform["Token"]=row.Token;
            this.editform["User"]=row.User;
            this.editform["Password"]=row.Password;
            this.editform["Audio"]=row.Audio;
            this.editform["Online"]=row.Online;
            this.editform["bPasswdEncrypt"]=row.bPasswdEncrypt;
            // console.log(this.editform)
            // console.log(this.tableData[index])
        },
        
        //  编辑  添加 的确定键
        edityes(){
            console.log(this.editindex);
            //return false;
            this.editPopup = false;
            var root = this.$store.state.IPPORT;
            //url
            var form=this.editform;
            // console.log("form", form,list);
            //return false;
            var url1 = root + "/api/v1/DelSrc?token="+this.edittoken+"&edit=true&session="+ this.$store.state.token;
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
                            Audio :form.Audio,
                            Online:form.Online+"",
                            bPasswdEncrypt:form.bPasswdEncrypt
                            }
                        this.tableData.splice(this.editindex, 1,list)
                        var url = root + "/api/v1/AddRTMPPush?&name="+form.Name+
                        "&token="+form.Token+
                        "&audio="+form.Audio+
                        "&session="+ this.$store.state.token;
                        console.log(url);
                        this.$http.get(url).then(result=>{
                            console.log(result);
                            if(result.status==200){
                            }
                        })
                    }else{
                        this.$message({
                            message: this.$t("message.setting.Editorfailure"),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
            
            
            
        },
        
        /*deleteRow(index, row,rows) {
            //var form=this.form;
            console.log(this.edittoken);
            console.log("序列号",((this.currentPage1-1)*10)+index);
            var index_xlh=((this.currentPage1-1)*10)+index;
            //return false;
            var root = this.$store.state.IPPORT;
            //url
            var url = root + "/api/v1/DelSrc?token="+row.Token+"&session="+ this.$store.state.token;
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
        },*/

        platformyes(){
            this.dialogFormVisible=false;
            console.log(this.form)
            //return false;
            var form=this.form;
            
            var root = this.$store.state.IPPORT;
            console.log(form.Type)
            var url = root + "/api/v1/AddRTMPPush?&name="+form.Name+
            "&token="+form.Token+
            "&audio="+form.Audio+
            "&session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus){
                        this.tableData=[];
                        this.loadfile();
                        // this.reload();
                    }else{
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
            
        },
        //查看 编辑 移除
        //点击添加时随机获取到token数据
        addto(){
            this.dialogFormVisible=true;
            this.form["Token"] = uuid(4, 16).toLowerCase();
        },
        //点击删除
        deleteRow(index, row,rows) {
          //var form=this.form;
            console.log(rows,this.form.Type,index);
            var index_xlh="";
            //return false;
            console.log("序列号H5_FILE",this.currentPage2,((this.currentPage2-1)*10)+index);
            index_xlh=((this.currentPage2-1)*10)+index;
            //url
            var url = this.$store.state.IPPORT + "/api/v1/DelSrc?token="+encodeURIComponent(row.Token)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log(result);
                console.log(this.tableData);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        rows.splice(index_xlh, 1);
                        this.total2=this.tableData.length
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
        async deleteselect(){
            var selectop=this.selectop;
            console.log(selectop)
            //return false;
            var root = this.$store.state.IPPORT;
            //url
            for(var i=0;i<selectop.length;i++){
                var url = root + "/api/v1/DelSrc?token="+selectop[i].token+"&session="+ this.$store.state.token;
                await this.$http.get(url).then(result=>{
                    console.log(result);
                    console.log(this.tableData);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            if(selectop[0].type=='dan'){
                                this.tableData=[];
                                this.loadfile();
                            }
                            if(selectop[i].type=='duo'){
                                this.tableData.splice(selectop[i].index, 1);
                            }
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
                    token:row[i].Token,
                    type:"dan",
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
                    index:((this.currentPage1-1)*10)+i,
                    type:'duo',
                };
                this.selectop.push(selectop);
            }
        },
        //搜索
        handlechange(){},
        //分页
        //3
        handleSizeChange3(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage2 = 1;
            this.pageSize = val;
        },
        handleCurrentChange3(val) {
            console.log(`当前页: ${val}`);
            this.currentPage2 = val;
        }
    },
  };
</script>
