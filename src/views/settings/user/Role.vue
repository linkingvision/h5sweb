<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog close="dialog" width="25%" :title="label.Edit" :visible.sync="editPopup">
            <el-form label-position="right" label-width="140px" :model="editform">
                <div class="tree_flex">
                    <div class="ed_tree">
                        <el-tree
                            :data="camdata" 
                            show-checkbox
                            :check-strictly="true"
                            ref="tree">
                            <span slot-scope="{ data }" style="width:100%;">
                                    <div style="width:100%;display: flex;justify-content: space-between;">
                                        <span >
                                            <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                            <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                                        </span>
                                    </div>
                                </span>
                        </el-tree>
                    </div>
                    <div class="tow_node_root">
                            <div>
                                <!-- 按钮  -->
                                <el-button class="button_addpv" @click="edaddcam" type="success" round size="mini">{{$t("message.setting.ADD")}}</el-button>
                            </div>
                            <div>
                                <el-button class="button_addpv" @click="eddlcam" type="success" round size="mini">{{$t("message.setting.DeleteAll")}}</el-button>
                            </div>
                        </div>
                    <div class="ed_tree">
                        <!--  show-checkbox :check-strictly="true" -->
                        <el-tree
                            :data="camroledata" 
                            show-checkbox
                            :check-strictly="true"
                            :props="defaultrole"
                            ref="tree1">
                            <span slot-scope="{ data }" style="width:100%;">
                                <div style="width:100%;display: flex;justify-content: space-between;">
                                    <span >
                                        <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strRoleToken}}</span>
                                    </span>
                                </div>
                            </span>
                        </el-tree>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
            </div>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog :title="eltitle" width="25%" :visible.sync="dialogFormVisible">
            <!-- 2 -->
            <el-form label-position="left"  label-width="90px" :model="form">
                <el-form-item :label="label.roleuser" class="role">
                    <el-input v-model="form.strRoleToken"></el-input>
                </el-form-item>
                <el-form-item label-width="160px" :label="label.Videoroot" class="role">

                </el-form-item>
                <div class="el_tree">
                    <el-tree
                        :data="camdata" 
                        show-checkbox
                        :check-strictly="true"
                        ref="tree">
                        <span slot-scope="{ data }" style="width:100%;">
                                <div style="width:100%;display: flex;justify-content: space-between;">
                                    <span >
                                        <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                                    </span>
                                </div>
                            </span>
                    </el-tree>
                </div>
                <el-form-item :label="label.operroot">
                    <el-select v-model="form.strRole" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button type="primary" @click="platformyes1">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <div class="button_edi">
            <CButton class="form_butt" type="submit" @click="addto">添加角色</CButton>
            <CButton class="form_butt1" type="submit" @click="deleteselect">删除角色</CButton>
        </div>
        <el-table
            @select='selectCall'
            @select-all='select_Call'
            :data="tableData1.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
            stripe
            style="width: 100%">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
            prop="strRoleToken"
            :label="label.roleuser"
            width="180">
            </el-table-column>
            <el-table-column
            prop="bConfig"
            :label="label.Confroot"
            width="180">
            </el-table-column>
            <el-table-column
            prop="bOperate"
            :label="label.operroot">
            </el-table-column>
            <el-table-column
                min-width="50"
                class="size"
                fixed="right">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index,scope.row)"  type="text" size="small">{{$t("message.setting.edit")}}</el-button>
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
import {listdatagload,listdatag} from '../../public/regional'
  export default {
    data() {
        return {
            Illegal:false,//非法锁定
            camdata:listdatag,
            camroledata:[],
            eltitle:this.$t("message.setting.Configuration"),
            anonymous:false,//匿名
            search: '',//搜索
            activeName: 'first',
            tabPosition: 'button',//选项卡位置
            inputedit:[],
            label:{
                Edit:this.$t("message.table.Edit"),

                label:this.$t("message.setting.user"),//选1
                label_role:this.$t("message.setting.Rolemanagement"),//选1
                // label_system:this.$t("message.setting.SystemManagement")
                label_system:this.$t("message.setting.CyberSecurity"),

                user:this.$t("message.setting.username"),
                Password:this.$t("message.setting.password"),
                role:this.$t("message.setting.role"),
                type:this.$t("message.setting.Authority"),
                olPassword:this.$t("message.setting.currentpass"),
                nePassword:this.$t("message.setting.newpass"),
                confirmpass:this.$t("message.setting.confirmpassword"),
                confirmpass1:this.$t("message.setting.confirmpass"),

                roleuser:this.$t("message.setting.RoleName"),
                Confroot:this.$t("message.setting.Configure"),
                operroot:this.$t("message.setting.Operation"),
                Videoroot:this.$t("message.setting.Camera"),

                label2:this.$t("message.setting.user"),
                label3:this.$t("message.setting.role"),
                label4:this.$t("message.setting.action"),

                label5:this.$t("message.setting.name"),
                label6:this.$t("message.setting.currentpass"),
                label7:this.$t("message.setting.newpass"),
                label8:this.$t("message.setting.confirmpass")
            },
            options: [{
                    value: 'Administrator',
                    label: 'Administrator'
                }, {
                    value: 'Operator',
                    label: 'Operator'
                }
            ],
            Role:[],
            defaultrole:{
                children: 'cam',
                label: 'strRoleToken'
            },
            defaultProps: {
                children: 'node',
                label: 'strName',
                cam:"cam"
            },
            //分页
            pageSize: 10,//一页数量
            dialogFormVisible: false,//添加弹窗
            editPopup:false,//编辑弹窗
            form: {
                switch:"first",
                strUser:"Operator",
                strPasswd: "12345",
                strPasswd1:"12345",
                strUserType: "Operator",
                
                strRole:"Administrator",
                strRoleToken:"Administrator"

            },
            editform: {
                strUser:"",
                strPasswd: "",
                strUserType: "",
                Newpassword:"",
                Newpassword1:""
            },
            edittoken:"",//编辑时要删除的token
            editindex:"",//编辑时所在索引
            
            tableData1: [],
            currentPage1: 1, // 当前页码
            total1: 0, // 总条数 1
            selectop:[]//选择那几个
        };
    },
    mounted(){
        this.rolesre();
    },
    methods:{
        // 第二个表格列表
        rolesre(){
            var url1 = this.$store.state.IPPORT + "/api/v1/GetRoleList?session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                // console.log("***",result);
                if(result.status==200){
                    // this.tableData2=result.data.users;
                    this.tableData1=[];
                    var data=result.data.roles;
                    for(var i=0;i<data.length;i++){
                        var datasrc={
                            strRoleToken:data[i].strRoleToken,
                            bConfig:data[i].permission.bConfig+"",
                            bOperate:data[i].permission.bOperate+""
                        }
                        // console.log("**--*",datasrc);
                        var Role={
                            value: data[i].strRoleToken,
                            label: data[i].strRoleToken
                        }
                        this.Role.push(Role);
                        this.tableData1.push(datasrc);
                    }
                }
            })
        },

        addto(){
            this.dialogFormVisible=true;
        },
        //点击删除
        deleteselect() {
            var selectop=this.selectop;
            var form=this.form;
            for(var i=0;i<selectop.length;i++){
                var url = this.$store.state.IPPORT + "/api/v1/DeleteRole?roletoken="+encodeURIComponent(selectop[i].strRoleToken)+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.tableData1=[];
                            this.rolesre();
                        }else{
                            this.$message({
                                message: "删除失败",
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }
        },
        //  编辑  添加 的确定键
        edityes(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            //url
            var form=this.editform;
            if( form.Newpassword!==form.Newpassword1){
                this.$message(this.$t("message.setting.Twopassword"));
                return false;
            }
            // console.log(form)
            // return false;
            this.editPopup = false;
            var url1 = this.$store.state.IPPORT + "/api/v1/UpdateUser?user="+encodeURIComponent(form.strUser)+"&oldpassword="+encodeURIComponent($.md5(form.strPasswd))+"&newpassword="+encodeURIComponent($.md5(form.Newpassword))+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                console.log("1",result,url1);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.$router.push({ path:'../../login'})
                        this.$store.commit(types.LOGOUT);
                        this.$message(this.$t("message.setting.Changecg"));
                    }else{
                        this.$message(this.$t("message.setting.Changesb"));
                    }
                    
                }
            })
        },
        
        platformyes1(){
            var tokencheked=this.$refs.tree.getCheckedNodes();
            // console.log(tokencheked)
            // return false;
            this.dialogFormVisible=false;
            var form=this.form;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = this.$store.state.IPPORT + "/api/v1/CreateRole?roletoken="+encodeURIComponent(form.strRoleToken)+"&role="+encodeURIComponent(form.strRole)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                // console.log("***",result,form,url);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.tableData1=[];
                        this.rolesre();
                        for(var i=0 ;i<tokencheked.length;i++){
                            this.addcam(tokencheked[i].token,form.strRoleToken,tokencheked[i].label);
                        }
                    }else{
                        this.$message({
                            message: "添加失败",
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },
        
        edaddcam(){
            var tokencheked=this.$refs.tree.getCheckedNodes();
            var tokencheked1=this.$refs.tree1.getCheckedNodes();
            console.log(tokencheked,tokencheked1)
            // return false;
            for(var i=0 ;i<tokencheked.length;i++){
                for(var l=0 ;l<tokencheked1.length;l++){
                    this.addcam(tokencheked[i].token,tokencheked1[l].strRoleToken,tokencheked[i].label);
                }
            }
        },
        
        addcam(token,roletoken,name){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            console.log(token,roletoken,name);
            // return false;
            var url = this.$store.state.IPPORT + "/api/v1/AddCamToRole?roletoken="+encodeURIComponent(roletoken)+"&camtoken="+encodeURIComponent(token)+"&cam="+encodeURIComponent(name)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    if(result.data.bStatus==true){
                        // this.editPopup=false
                        var cam={
                            strRoleToken:name,
                            strCamName:token,
                        }
                        if(this.camroledata.length!=0){
                            this.camroledata[0].cam.push(cam)
                        }
                        
                    }else{
                        this.$message({
                            message: "摄像机"+name+"添加失败",
                            type: 'warning'
                        });
                        // return false;
                    }
                }
            })
        },
        
        //编辑
        handleEdit(index,row){
            // console.log(row)
            this.editPopup = true;
            this.editindex=index;
            this.editform["strUser"]=row.strUser;
            this.editform["strUserType"]=row.strUserType;
            this.camroledata=[];
            var url = this.$store.state.IPPORT + "/api/v1/GetRoleInfo?roletoken="+encodeURIComponent(row.strRoleToken)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    var data=result.data;
                    var roledata={
                            strRoleToken:data.strRoleToken,
                            strRole: data.strRole,
                            cam:[]
                        }
                    var camdata=data.cams;
                    for(var l=0; l<camdata.length;l++){
                        var camrole={
                            strRoleToken:data.cams[l].strCamName,
                            strCamName:data.cams[l].strCamToken,
                        }
                        roledata.cam.push(camrole);
                    }
                    this.camroledata.push(roledata);
                }
            })
        },
        //删除摄像机
        eddlcam(){
            var tokencheked=this.$refs.tree1.getCheckedNodes();
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            
            var camdata=this.camroledata[0].cam;
            for(var i=1;i<tokencheked.length;i++){
                for(var l=0 ; l<camdata.length;l++){
                    if(tokencheked[i].strCamName==camdata[l].strCamName){
                        camdata.splice(l,1);
                        var url = this.$store.state.IPPORT + "/api/v1/DelCamInRole?roletoken="+encodeURIComponent(tokencheked[0].strRoleToken)+"&camtoken="+encodeURIComponent(tokencheked[i].strCamName)+"&session="+ this.$store.state.token;
                        this.$http.get(url).then(result=>{
                            if(result.status==200){
                                if(result.data.bStatus==true){
                                    // this.editPopup=false
                                }else{
                                    this.$message({
                                        message: tokencheked[i].strRoleToken,
                                        type: 'warning'
                                    });
                                    // return false;
                                }
                            }
                        })
                    }
                }
            }

        },
        // 选中函数
        selectCall(row){
            // console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                // console.log(row[i].Token)
                var selectop={
                    strUser:row[i].strUser,
                    strPasswd:row[i].strPasswd,
                    strUserType:row[i].strUserType,
                    strRoleToken:row[i].strRoleToken
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            // console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                console.log(row[i].Token)
                var selectop={
                    strUser:row[i].strUser,
                    strPasswd:row[i].strPasswd,
                    strUserType:row[i].strUserType,
                    strRoleToken:row[i].strRoleToken
                };
                this.selectop.push(selectop);
            }
        },
        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage1 = 1;
            this.pageSize = val;
        },
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
            this.currentPage1 = val;
        },
        handlechange(){}
    },
  };
</script>

<style lang="scss" scoped>
.tree_flex{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    /* 编辑   的 两个按钮 */
    .ed_tree{
        width: 40%;
        height: 280px;
        overflow: scroll;
        border-radius: 4px;
        border:1px solid #DCDFE6;
        padding: 10px;
        margin-bottom: 20px;
    }
    .ed_tree::-webkit-scrollbar{
        display: none;
    }
    .tow_node_root div{
        margin-bottom: 25px;
    }
}
</style>