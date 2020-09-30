<template>
	<div class="dasboard_global">
        <!-- 编辑弹窗 -->
        
        <el-dialog class="user_pop" width="25%" close="dialog" :title="label.Edit" :visible.sync="editPopup">
            <!-- 1 -->
            <el-form label-position="left" label-width="150px" :model="editform">
                <el-form-item :label="label.user">
                    <el-input disabled v-model="editform.strUser"></el-input>
                </el-form-item>
                <el-form-item :label="label.olPassword">
                    <el-input v-model="editform.strPasswd"></el-input>
                </el-form-item>
                <el-form-item :label="label.nePassword">
                    <el-input v-model="editform.Newpassword"></el-input>
                </el-form-item>
                <el-form-item :label="label.confirmpass1">
                    <el-input v-model="editform.Newpassword1"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button> -->
                <el-button class="pop_but" type="primary" @click="changepwss">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog class="user_pop"  width="25%" :title="eltitle" :visible.sync="dialogFormVisible">
            <!-- 1 -->
            <el-form label-position="left" label-width="150px" :model="form">
                <el-form-item :label="label.user">
                    <el-input v-model="form.strUser"></el-input>
                </el-form-item>
                <el-form-item :label="label.Password">
                    <el-input v-model="form.strPasswd"></el-input>
                </el-form-item>
                <el-form-item :label="label.confirmpass">
                    <el-input v-model="form.strPasswd1"></el-input>
                </el-form-item>
                <!-- <el-form-item :label="label.role">
                    <input class="editinput" v-model="form.strRoleToken"/>
                </el-form-item> -->
                <el-form-item :label="label.role">
                    <el-select v-model="form.strRoleToken" placeholder="请选择">
                        <el-option
                            v-for="item in Role"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">{{$t("message.setting.Cancel")}}</el-button> -->
                <el-button  class="pop_but" @click="adduse" type="primary">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <div class="button_edi">
            <CButton class="form_butt" @click="dialogFormVisible = true" type="submit">添加用户</CButton>
            <CButton class="form_butt1" @click="deleteuser" type="submit">删除用户</CButton>
        </div>
        <el-table
            :data="tableData.filter(data => !search || data.strUser.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
            stripe
            @select='selectCall'
            @select-all='select_Call'
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="strUser"
            label="用户名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="strRole"
            label="角色"
            min-width="50">
            </el-table-column>
            <el-table-column
                min-width="50"
                class="size"
                fixed="right">
                <template  slot-scope="scope">
                    <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Change")}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="text-align: center;"
            layout=" prev, pager, next,total, jumper"
            @size-change="handleSizeChange1" 
            @current-change="handleCurrentChange1"
            :current-page="currentPage"
            :total="total">
        </el-pagination>
	</div>
</template>

<script>
import '../../../assets/js/jQuery.md5'
export default {
	name: 'roleinof',
	data(){
		return{
            total: 0, // 总条数 1
            currentPage: 1, // 当前页码1
            pageSize: 10,//一页数量
            search: '',//搜索
			tableData: [],
            editPopup:false,
            dialogFormVisible:false,
            eltitle:this.$t("message.setting.Configuration"),
			label:{
                Edit:this.$t("message.setting.edit"),

                label:this.$t("message.setting.user"),//选1
                user:this.$t("message.setting.username"),
                Password:this.$t("message.setting.password"),
                role:this.$t("message.setting.role"),
                type:this.$t("message.setting.Authority"),
                olPassword:this.$t("message.setting.currentpass"),
                nePassword:this.$t("message.setting.newpass"),
                confirmpass:this.$t("message.setting.confirmpassword"),//重复密码
                confirmpass1:this.$t("message.setting.confirmpass"),//重复新密码
            },
			form: {
                strUser:"Operator",
                strPasswd: "12345",
                strPasswd1:"12345",
                strRoleToken: "Administrator",

            },
            Role:[],
            editform: {
                strUser:"",
                strPasswd: "",
                strUserType: "",
                Newpassword:"",
                Newpassword1:""
            },
            selectop:[]//选择那几个
		}
    },
	mounted(){
        if(this.$store.state.root==='Operator'){
            return false
        }else{
            this.user();
            this.rolelist();
        }
	},
	created(){
	},
	methods:{
        //删除用户
        deleteuser(){
            var selectop=this.selectop;
            let root=this.$store.state.IPPORT;
            for(var i=0;i<selectop.length;i++){
                var url = root + "/api/v1/DeleteUser?user="+encodeURIComponent(selectop[i].strUser)+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.tableData=[];
                            this.user();
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
        //添加用户
        adduse(){
            var form=this.form;
            console.log(form)
            let root=this.$store.state.IPPORT;
            if( form.strPasswd1!==form.strPasswd){
                this.$message(this.$t("message.setting.Twopassword"));
                return false;
            }
            if( form.strPasswd==""&&form.strPasswd1==""){
                this.$message(this.$t("message.setting.beblank"));
                return false;
            }
            this.dialogFormVisible=false;
            // console.log(form.strPasswd,$.md5(form.strPasswd))
            var url = root + "/api/v1/CreateUser?user="+encodeURIComponent(form.strUser)+"&password="+encodeURIComponent($.md5(form.strPasswd))+"&roletoken="+encodeURIComponent(form.strRoleToken)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                // console.log("***",result,form,url);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.user();
                    }else{
                        this.$message({
                            message: this.$t("message.setting.Creationfailed"),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },
		//点击编辑
		handleClick(index,row){
			this.editPopup = true;
			console.log("***",index,row);
			this.editform["strUser"]=row.strUser;
            // this.editform["strUserType"]=row.strUserType;
		},
		// 修改密码
		changepwss(){
            var form=this.editform;
            let root=this.$store.state.IPPORT;
            if( form.Newpassword!==form.Newpassword1){
                this.$message(this.$t("message.setting.Twopassword"));
                return false;
            }
            if( form.strPasswd==""||form.Newpassword==""||form.Newpassword1==""){
                this.$message(this.$t("message.setting.beblank"));
                return false;
            }
            var url = root + "/api/v1/UpdateUser?user="+encodeURIComponent(form.strUser)+"&oldpassword="+encodeURIComponent($.md5(form.strPasswd))+"&newpassword="+encodeURIComponent($.md5(form.Newpassword))+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                // console.log(url,result)
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.editPopup = false;
                        if(form.strUser==this.$store.state.user){
                            this.$router.push({
                                path: '/logout'
                            })
                        }
                        this.$message(this.$t("message.setting.Changecg"));
                    }else{
                        this.$message(this.$t("message.setting.Changesb"));
                    }
                    
                }
            })
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
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            // console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                var selectop={
                    strUser:row[i].strUser,
                    strPasswd:row[i].strPasswd,
                    strUserType:row[i].strUserType,
                };
                this.selectop.push(selectop);
            // console.log(this.selectop);
            }
        },
        // 表格列表
        user(){
            let root=this.$store.state.IPPORT;
            var url = root + "/api/v1/GetUserList?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log("***",result);
                if(result.status==200){
                    this.tableData=result.data.users;
                    this.total=this.tableData.length
                }
            })
        },
        rolelist(){
            let root=this.$store.state.IPPORT;
            var url1 = root + "/api/v1/GetRoleList?session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                console.log("**--*",result);
                if(result.status==200){
                    // this.tableData=result.data.users;
                    var data=result.data.roles;
                    for(var i=0;i<data.length;i++){
                        // console.log("**--*",datasrc);
                        var Role={
                            value: data[i].strRoleToken,
                            label: data[i].strRoleToken
                        }
                        this.Role.push(Role);
                    }
                    
                        console.log(this.Role)
                }
            })
        },
        
        handleSizeChange1(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange1(val) {
            this.currentPage = val;
        },
	}
}
</script>

<style lang="scss" scoped>
.dasboard_global{
	/* 弹框input */
	.user_pop{
		.pop_but{
			width: 60px;
			background:rgba(50,113,255,1);
			border-radius:5px;
			padding: 5px 10px;
		}
		.editinput{
			border:1px solid rgba(181,181,181,1);
			-webkit-appearance: none;
			background:none;
			border-radius: 4px;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			display: inline-block;
			font-size: inherit;
			height: 40px;
			line-height: 40px;
			outline: 0;
			padding: 0 15px;
			-webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
			transition: border-color .2s cubic-bezier(.645,.045,.355,1);
			width: 100%;
		}
	}
}

</style>