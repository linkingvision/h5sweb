<template>
    <div>
       
        <!-- 编辑弹窗 -->
        
        <el-dialog :title="label.eltitle" :visible.sync="editPopup">
            <el-form label-position="left" label-width="120px" :model="editform">
               
               <el-form-item :label="label.label2">
                   <el-input v-model="editform.name"></el-input>
                </el-form-item>
                <el-form-item :label="label.Token">
                    <el-input v-model="editform.Token"></el-input>
                </el-form-item>
                <el-form-item :label="label.label3">
                    <el-input v-model="editform.strGbServerIpAddr"></el-input>
                </el-form-item>
                <el-form-item :label="label.label4">
                    <el-input v-model="editform.nGbLocalPort"></el-input>
                </el-form-item>
                <el-form-item :label="label.label5">
                    <el-input v-model="editform.nGbServerPort"></el-input>
                </el-form-item>
                <el-form-item :label="label.label6">
                    <el-input v-model="editform.strGbID"></el-input>
                </el-form-item>
                <el-form-item :label="label.label7">
                    <el-input v-model="editform.strGbServerID"></el-input>
                </el-form-item>
                <el-form-item :label="label.label13">
                    <el-input v-model="editform.strGbDomain"></el-input>
                </el-form-item>
                <el-form-item :label="label.label9">
                    <el-input v-model="editform.strGbServerPassword"></el-input>
                </el-form-item>
                <el-form-item :label="label.label11">
                    <el-input v-model="editform.nGbKeepaliveTime"></el-input>
                </el-form-item>
                <el-form-item :label="label.label12">
                    <el-input v-model="editform.nGbRegisterPeriod"></el-input>
                </el-form-item>
                <el-collapse v-model="activeNames" class="GBService_active">
                    <el-collapse-item title="更多设置" name="1" id="headswitch">
                        <el-form-item :label="label.label10">
                            <el-input v-model="editform.strGbIDChBase"></el-input>
                        </el-form-item>
                        <el-form-item :label="label.label8">
                            <el-input v-model="editform.strGbProto"></el-input>
                        </el-form-item>
                        <el-form-item :label="label.Stream">
                            <el-select v-model="editform.strStream" placeholder="请选择">
                                <el-option
                                    v-for="item in strStream"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <input class="editinput" v-model="editform.bSubAlarm"/> -->
                        </el-form-item>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
            <div slot="footer" class="dialog-footer button_table">
                <el-button @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button type="primary" @click="edityes">{{$t("message.camera.save")}}</el-button>
            </div>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog :title="label.eltitle" :visible.sync="dialogFormVisible">
            <el-form label-position="left" label-width="120px" :model="form">
            
                <el-form-item :label="label.label2">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="label.Token">
                    <el-input v-model="form.Token"></el-input>
                </el-form-item>
                <el-form-item :label="label.label3">
                    <el-input v-model="form.strGbServerIpAddr"></el-input>
                </el-form-item>
                <el-form-item :label="label.label4">
                    <el-input v-model="form.nGbLocalPort"></el-input>
                </el-form-item>
                <el-form-item :label="label.label5">
                    <el-input v-model="form.nGbServerPort"></el-input>
                </el-form-item>
                <el-form-item :label="label.label6">
                    <el-input v-model="form.strGbID"></el-input>
                </el-form-item>
                <el-form-item :label="label.label7">
                    <el-input v-model="form.strGbServerID"></el-input>
                </el-form-item>
                
                <el-form-item :label="label.label13">
                    <el-input v-model="form.strGbDomain"></el-input>
                </el-form-item>
                <el-form-item :label="label.label9">
                    <el-input v-model="form.strGbServerPassword"></el-input>
                </el-form-item>

                <el-form-item :label="label.label11">
                    <el-input v-model="form.nGbKeepaliveTime"></el-input>
                </el-form-item>
                <el-form-item :label="label.label12">
                    <el-input v-model="form.nGbRegisterPeriod"></el-input>
                </el-form-item>
                <el-collapse v-model="activeNames" class="GBService_active">
                    <el-collapse-item title="更多设置" name="1" id="headswitch">
                        <el-form-item :label="label.label10">
                            <el-input v-model="form.strGbIDChBase"></el-input>
                        </el-form-item>
                        <el-form-item :label="label.label8">
                            <el-input v-model="form.strGbProto"></el-input>
                        </el-form-item>
                        <el-form-item :label="label.Stream">
                            <el-select v-model="form.strStream" placeholder="请选择">
                                <el-option
                                    v-for="item in strStream"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <input class="editinput" v-model="editform.bSubAlarm"/> -->
                        </el-form-item>
                    </el-collapse-item>
                </el-collapse>
                
            </el-form>
            
            <div slot="footer" class="dialog-footer button_table">
                <el-button @click="dialogFormVisible = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button type="primary" @click="platformyes">{{$t("message.setting.ADD")}}</el-button>
            </div>
        </el-dialog>
        <div class="button_edi">
            <CButton class="form_butt" @click="addto" type="submit">添加</CButton>
            <CButton class="form_butt1" @click="deleteselect" type="submit">删除</CButton>
        </div>
        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
            @select='selectCall'
            @select-all='select_Call'
            style="width: 100%">
            <!-- 隐藏内容 -->
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
            prop="name"
            :label="label.label2"
            width="180">
            </el-table-column>
            <el-table-column
            prop="Token"
            :label="label.Token"
            width="180">
            </el-table-column>
            <el-table-column
            prop="strGbServerIpAddr"
            :label="label.label3">
            </el-table-column>
            <el-table-column
            prop="nGbServerPort"
            :label="label.label5">
            </el-table-column>
            <el-table-column
            prop="bRegStatus"
            :label="label.Online">
            </el-table-column>
            <el-table-column
                fixed="right"
                width="180">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    @change="handlechange(scope.$index,scope.row)"
                    size="mini"
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
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :total="total1">
        </el-pagination>
    </div>
</template>
<script>
import uuid from '../../assets/js/uuid'
  export default {
    name:"GB",
    data() {
      return {
        activeNames: [],//左边
        activeName: "GBPlatform",//优先显示选项卡
        label:{
            label1:this.$t("message.GB.GBPlatform"),//选2
            eltitle:this.$t("message.setting.Configuration"),//编辑

            label2:this.$t("message.GB.Name"),
            label3:this.$t("message.GB.SIPServerIP"),
            label4:this.$t("message.GB.SIPPort"),
            label5:this.$t("message.GB.SIPServerPort"),
            label6:this.$t("message.GB.SIPUserID"),
            label7:this.$t("message.GB.SIPServerID"),
            label8:this.$t("message.GB.SIPProtocol"),
            label9:this.$t("message.GB.Password"),
            label10:this.$t("message.GB.SIPChannelBaseID"),
            label11:this.$t("message.GB.KeepaliveTime"),
            label12:this.$t("message.GB.RegisterPeriod"),
            label13:this.$t("message.GB.Domain"),
            Online:this.$t("message.table.Online"),
            Index:this.$t("message.table.Index"),
            Token:this.$t("message.table.Token"),
            Stream:this.$t("message.GB.Stream"),
            main:this.$t("message.GB.main"),
            sub:this.$t("message.GB.sub"),
        },
        //分页
        search:"",//搜索
        currentPage: 1, // 当前页码
        total1: 0, // 总条数
        pageSize: 10,//一页数量
        dialogFormVisible: false,//添加弹窗
        strStream:[
            {
                value: "main",
                label: this.$t("message.GB.main")
            },{
                value: "sub",
                label: this.$t("message.GB.sub")
            }
        ],
        editPopup:false,//编辑弹窗
        form: {
            name:"Platform1",
            Token:"platform1",
            strGbServerIpAddr:"192.168.1.100",
            nGbServerPort:"5060",
            strGbID:"34020000002000000100",
            strGbServerID:"34020000002000000001",
            strGbProto:"UDP",
            strGbDomain:"3402000000",
            strGbServerPassword:"3402000000",
            strGbIDChBase:"34020000001320000001",
            nGbKeepaliveTime:"10",
            nGbRegisterPeriod:"120",
            nGbLocalPort:"50600",
            strStream:'main'
        },
        editform: {
            name:"Platform1",
            Token:"platform1",
            strGbServerIpAddr:"192.168.1.100",
            nGbServerPort:"5060",
            strGbID:"34020000002000000100",
            strGbServerID:"34020000002000000001",
            strGbProto:"UDP",
            strGbDomain:"3402000000",
            strGbServerPassword:"3402000000",
            strGbIDChBase:"34020000001320000001",
            nGbKeepaliveTime:"10",
            nGbRegisterPeriod:"120",
            nGbLocalPort:"50600",
            strStream:'main'
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [],//2
        selectop:[]//选择那几个
      };
    },
    mounted(){
        this.loadplatform();
    },
    methods:{
        handlechange(){},
        //第一个表格的数据
        loadplatform(){
            if(this.$store.state.root=="Operator"){
                return false
            }
		    var root =this.$store.state.IPPORT;
            //url
            var url = root + "/api/v1/GetGbPlatform?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    var itme=result.data.platform;
                    console.log(itme);
                    this.loadplatforms(itme)
                }
            })
        },
        loadplatforms(itme,bianji,editindex){
            var itme=itme
            // console.log(itme)
            var _this=this
            var root = this.$store.state.IPPORT;
            for(var i=0;i<itme.length;i++){
                if(itme[i].strToken==undefined){
                    return false
                }
                console.log("****",itme[i].strToken)
                var url = root + "/api/v1/GetGbRegStatus?token="+itme[i].strToken+"&session="+ this.$store.state.token;
                $.ajax({
                    type: 'get',
                    url: url,  
                    async: false,  
                    success: function(data){ 
                        console.log(data)
                        var tabledata={
                            index:i+1,
                            Token:itme[i].strToken,
                            name:itme[i].strName,
                            strGbServerIpAddr:itme[i].strGbServerIpAddr,
                            nGbServerPort:itme[i].nGbServerPort,
                            nGbLocalPort:itme[i].nGbLocalPort,
                            strGbID:itme[i].strGbID,
                            strGbDomain:itme[i].strGbDomain,
                            strGbServerID:itme[i].strGbServerID,
                            strGbServerPassword:itme[i].strGbServerPassword,
                            strGbProto:itme[i].strGbProto,
                            strGbIDChBase:itme[i].strGbIDChBase,
                            nGbRegisterPeriod:itme[i].nGbRegisterPeriod,
                            nGbKeepaliveTime:itme[i].nGbKeepaliveTime,
                            bRegStatus:data.bRegStatus+"",
                            strStream:itme[i].strStream
                        };
                        if(bianji=='bianji'){
                            _this.tableData.splice(editindex, 1,tabledata)
                        }else{
                            _this.tableData.push(tabledata);
                            _this.total1=_this.tableData.length;
                        }
                        // console.log("编辑",_this.tableData)
                    }
                })

            }
        },
        //点击添加时随机获取到token数据
        addto(){
            this.dialogFormVisible=true;
            this.form["Token"] = uuid(4, 16).toLowerCase();
        },
        //  编辑  添加 的确定键
        edityes(){
            console.log(this.editindex);
            //return false;
            this.editPopup = false;
            console.log(this.editform);
            var root =this.$store.state.IPPORT;
            //url
            console.log(this.edittoken);
            var editform=this.editform;
            var url1 = root + "/api/v1/DelGbPlatform?token="+this.edittoken+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                //console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var list = {
                            index:editform.index,
                            strToken:editform.Token,
                            strName:editform.name,
                            Token:editform.Token,
                            name:editform.name,
                            strGbServerIpAddr:editform.strGbServerIpAddr,
                            nGbServerPort:editform.nGbServerPort,
                            nGbLocalPort:editform.nGbLocalPort,
                            strGbID:editform.strGbID,
                            strGbServerID:editform.strGbServerID,
                            strGbServerPassword:editform.strGbServerPassword,
                            strGbProto:editform.strGbProto,
                            strGbIDChBase:editform.strGbIDChBase,
                            nGbRegisterPeriod:editform.nGbRegisterPeriod,
                            nGbKeepaliveTime:editform.nGbKeepaliveTime,
                            strGbDomain:editform.strGbDomain,
                            strStream:editform.strStream
                        }
                        this.tableData.splice(this.editindex, 1,list)
                        var url = root + "/api/v1/AddGbPlatform?name="
                        +encodeURIComponent(editform.name)+
                        "&token="+encodeURIComponent(editform.Token)+
                        "&localport="+encodeURIComponent(editform.nGbLocalPort)+
                        "&gbid="+encodeURIComponent(editform.strGbID)+
                        "&gbserverid="+encodeURIComponent(editform.strGbServerID)+
                        "&gbdomain="+encodeURIComponent(editform.strGbDomain)+
                        "&gbserverpw="+encodeURIComponent(editform.strGbServerPassword)+
                        "&gbproto="+encodeURIComponent(editform.strGbProto)+
                        "&gbserverip="+encodeURIComponent(editform.strGbServerIpAddr)+
                        "&gbserverport="+encodeURIComponent(editform.nGbServerPort)+
                        "&gbidchbase="+encodeURIComponent(editform.strGbIDChBase)+
                        "&registerperiod="+encodeURIComponent(editform.nGbRegisterPeriod)+
                        "&keepalivetime="+encodeURIComponent(editform.nGbKeepaliveTime)+
                        "&stream="+encodeURIComponent(editform.strStream)+
                        "&session="+ this.$store.state.token;
                        console.log(url);
                        this.$http.get(url).then(result=>{
                            console.log(result);
                            if(result.status==200){
                                if(result.data.bStatus){
                                    console.log("添加成功")
                                    var listarr=[list]
                                    this.loadplatforms(listarr,"bianji",this.editindex)
                                }else{
                                    console.log("添加失败")
                                }
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
            console.log("form",editform)
            
            
        },
        platformyes(){
            this.dialogFormVisible=false;
            
            //return false;
            var form=this.form;
            var root =this.$store.state.IPPORT;
            console.log(form);
            var url = root + "/api/v1/AddGbPlatform?name="
            +encodeURIComponent(form.name)+
            "&token="+encodeURIComponent(form.Token)+
            "&localport="+encodeURIComponent(form.nGbLocalPort)+
            "&gbid="+encodeURIComponent(form.strGbID)+
            "&gbserverid="+encodeURIComponent(form.strGbServerID)+
            "&gbdomain="+encodeURIComponent(form.strGbDomain)+
            "&gbserverpw="+encodeURIComponent(form.strGbServerPassword)+
            "&gbproto="+encodeURIComponent(form.strGbProto)+
            "&gbserverip="+encodeURIComponent(form.strGbServerIpAddr)+
            "&gbserverport="+encodeURIComponent(form.nGbServerPort)+
            "&gbidchbase="+encodeURIComponent(form.strGbIDChBase)+
            "&registerperiod="+encodeURIComponent(form.nGbRegisterPeriod)+
            "&keepalivetime="+encodeURIComponent(form.nGbKeepaliveTime)+
            "&stream="+encodeURIComponent(form.strStream)+
            "&session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    console.log(result.data);
                    if(result.data.bStatus){
                        this.tableData=[]
                        this.loadplatform();
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
        handleClick(index,row){
            //console.log(row,index,this.tableData);
            this.$alert(
                '<div> '+this.$t("message.GB.Name")+': '
                +row.name+'</div><div>Token: '
                +row.Token+'</div><div>'+this.$t("message.GB.SIPServerIP")+': '
                +row.strGbServerIpAddr+'</div><div>'+this.$t("message.GB.SIPServerPort")+': '
                +row.nGbServerPort+'</div><div>'+this.$t("message.GB.SIPPort")+':' 
                +row.nGbLocalPort+'</div><div>'+this.$t("message.GB.SIPUserID")+': '
                +row.strGbID+'</div><div>'+this.$t("message.GB.SIPServerID")+': '
                +row.strGbServerID+'</div><div>'+this.$t("message.GB.Domain")+': '
                +row.strGbDomain+'</div><div>'+this.$t("message.GB.Password")+': '
                +row.strGbServerPassword+'</div><div>'+this.$t("message.GB.SIPProtocol")+': '
                +row.strGbProto+'</div><div>'+this.$t("message.GB.SIPChannelBaseID")+': '
                +row.strGbIDChBase+'</div><div>'+this.$t("message.GB.RegisterPeriod")+': '
                +row.nGbRegisterPeriod+'</div><div>'+this.$t("message.GB.KeepaliveTime")+': '
                +row.nGbKeepaliveTime+'</div><div>'+this.$t("message.GB.Stream")+': '
                +row.strStream+'</div>', '详情',{dangerouslyUseHTMLString: true});
        },
        handleEdit(index,row){
            //console.log(index);
            this.editPopup = true;
            this.edittoken=row.Token;
            console.log("序列号",((this.currentPage-1)*10)+index);
            var index_xlh=((this.currentPage-1)*10)+index;
            this.editindex=index_xlh;

            this.editform["name"]=row.name;
            this.editform["index"]=row.index;
            this.editform["Token"]=row.Token;
            this.editform["strGbServerIpAddr"]=row.strGbServerIpAddr;
            this.editform["nGbServerPort"]=row.nGbServerPort;
            this.editform["strGbID"]=row.strGbID;
            this.editform["strGbServerID"]=row.strGbServerID;
            this.editform["strGbProto"]=row.strGbProto;
            this.editform["strGbDomain"]=row.strGbDomain;
            this.editform["strGbServerPassword"]=row.strGbServerPassword;
            this.editform["strGbIDChBase"]=row.strGbIDChBase;
            this.editform["nGbKeepaliveTime"]=row.nGbKeepaliveTime;
            this.editform["nGbRegisterPeriod"]=row.nGbRegisterPeriod;
            this.editform["nGbLocalPort"]=row.nGbLocalPort;
            this.editform["strStream"]=row.strStream;
            console.log(this.editform)
            // console.log(this.tableData[index])
            
            
            
        },
        //删除
        deleteRow(index, row,rows) {
            //var form=this.form;
            // console.log(row,index,rows,this.currentPage);
            console.log("序列号",((this.currentPage-1)*10)+index);
            var index_xlh=((this.currentPage-1)*10)+index;
            //return false;
            var root =this.$store.state.IPPORT;
            //url
            var url = root + "/api/v1/DelGbPlatform?token="+encodeURIComponent(row.Token)+"&session="+ this.$store.state.token;
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
        async deleteselect(){
            var selectop=this.selectop;
            console.log(selectop)
            //return false;
            var root =this.$store.state.IPPORT;
            //url
            for(var i=0;i<selectop.length;i++){
                var url = root + "/api/v1/DelGbPlatform?token="+encodeURIComponent(selectop[i].token)+"&session="+ this.$store.state.token;
                await this.$http.get(url).then(result=>{
                    console.log(result);
                    console.log(this.tableData);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            if(selectop[0].type=='dan'){
                                this.tableData=[];
                                this.loadplatform();
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
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        }
    }
  };
</script>