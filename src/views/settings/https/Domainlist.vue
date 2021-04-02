
<template>
    <div>
      <!-- 编辑弹窗 -->
        <el-dialog width="25%" :title="eltitle" :visible.sync="editPopup">
          <el-form class="el_form" ref="form" label-position='left' label-width="100px" size="small " :model="editform">
                <el-form-item label="SSL证书文件">
                    <el-input v-model="editform.strSSLCertificateFile"></el-input>
                </el-form-item>
                <el-form-item label="认证域名">
                    <el-input v-model="editform.strAuthenticationDomain"></el-input>
                </el-form-item>
                <el-form-item label="文件目录">
                    <el-input v-model="editform.strDocumentRoot"></el-input>
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
                <el-form-item label="SSL证书文件">
                    <el-input v-model="form.strSSLCertificateFile"></el-input>
                </el-form-item>
                <el-form-item label="认证域名">
                    <el-input v-model="form.strAuthenticationDomain"></el-input>
                </el-form-item>
                <el-form-item label="文件目录">
                    <el-input v-model="form.strDocumentRoot"></el-input>
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
            prop="strSSLCertificateFile"
            label="SSL证书文件">
            </el-table-column>
            <el-table-column
            prop="strAuthenticationDomain"
            label="认证域名">
            </el-table-column>
            <el-table-column
            prop="strDocumentRoot"
            label="文件目录">
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
            @size-change="handleSizeChange3" 
            @current-change="handleCurrentChange3"
            :current-page="currentPage2"
            :total="total">
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
        inputedit:[],
        label:{
        },
        //分页
        pageSize: 10,//一页数量
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            strAuthenticationDomain: "localhost",
            strDocumentRoot: "www/domain/cluster/",
            strSSLCertificateFile: "localhost.pem"
        },
        editform: {
            strAuthenticationDomain: "localhost",
            strDocumentRoot: "www/domain/cluster/",
            strSSLCertificateFile: "localhost.pem"
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        
        tableData: [],//3
        total: 0, // 总条数 3
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
            var url = this.$store.state.IPPORT + "/api/v1/GetDomainList?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
              console.log("a",result);
              if(result.status == 200){
                  var itme=result.data.domain;
                  this.tableData=[]
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          index:i+1,
                          strAuthenticationDomain:itme[i].strAuthenticationDomain,
                          strDocumentRoot:itme[i].strDocumentRoot,
                          strSSLCertificateFile:itme[i].strSSLCertificateFile,
                      };
                      this.tableData.push(tabledata);
                      //console.log(tabledata);
                  }
                  this.total=this.tableData.length;
              }
            })
        },
        // 编辑
        handleEdit(index,row){
            console.log(index);
            console.log(this.tableData[index]);
            console.log("序列号",((this.currentPage2-1)*10)+index);
            var index_xlh=((this.currentPage2-1)*10)+index;
            //return false;
            this.editPopup = true;
            this.edittoken=row.strAuthenticationDomain;
            this.editindex=index_xlh;
            
            this.editform["strAuthenticationDomain"]=row.strAuthenticationDomain;
            this.editform["strDocumentRoot"]=row.strDocumentRoot;
            this.editform["strSSLCertificateFile"]=row.strSSLCertificateFile;
        },
        
        //  编辑  添加 的确定键
        edityes(){
            console.log(this.editindex);
            //return false;
            this.editPopup = false;
            var root = this.$store.state.IPPORT;
            //url
            var form=this.editform;
            console.log("form", form);
            // return false;
            var url1 = root + "/api/v1/DelDomainConf?authenticationdomain="+this.edittoken+"&edit=true&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                //console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var list = {
                            strAuthenticationDomain:form.strAuthenticationDomain,
                            strDocumentRoot:form.strDocumentRoot,
                            strSSLCertificateFile:form.strSSLCertificateFile,
                        }
                        this.tableData.splice(this.editindex, 1,list)
                        var url = root + "/api/v1/AddDomainConf?&authenticationdomain="+form.strAuthenticationDomain+
                        "&sslcertificatefile="+form.strSSLCertificateFile+
                        "&documentroot="+form.strDocumentRoot+
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

        platformyes(){
            this.dialogFormVisible=false;
            console.log(this.form)
            //return false;
            var form=this.form;
            
            var root = this.$store.state.IPPORT;
            console.log(form.Type)
            var url = root + "/api/v1/AddDomainConf?&authenticationdomain="+form.strAuthenticationDomain+
            "&sslcertificatefile="+form.strSSLCertificateFile+
            "&documentroot="+form.strDocumentRoot+
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
            // console.log(rows,row,this.form.Type,index);
            var index_xlh="";
            // return false;
            console.log("序列号H5_FILE",this.currentPage2,((this.currentPage2-1)*10)+index);
            index_xlh=((this.currentPage2-1)*10)+index;
            //url
            var url = this.$store.state.IPPORT + "/api/v1/DelDomainConf?authenticationdomain="+encodeURIComponent(row.strAuthenticationDomain)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log(result);
                console.log(this.tableData);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        rows.splice(index_xlh, 1);
                        this.total=this.tableData.length
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
            // console.log(selectop)
            //return false;
            var root = this.$store.state.IPPORT;
            //url
            for(var i=selectop.length-1;i>=0;i--){
                var url = root + "/api/v1/DelDomainConf?authenticationdomain="+selectop[i].token+"&session="+ this.$store.state.token;
                await this.$http.get(url).then(result=>{
                    // console.log(result);
                    // console.log(this.tableData);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            if(selectop[0].type=='dan'){
                                this.tableData=[];
                                this.loadfile();
                            }
                            if(selectop[i].type=='duo'){
                                console.log(selectop[i].index)
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
                console.log(row[i].strAuthenticationDomain)
                var selectop={
                    token:row[i].strAuthenticationDomain,
                    type:"dan",
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                console.log(row[i].strAuthenticationDomain)
                var selectop={
                    token:row[i].strAuthenticationDomain,
                    index:((this.currentPage2-1)*10)+i,
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
