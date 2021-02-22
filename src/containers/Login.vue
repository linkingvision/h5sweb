<template>
    <div class="login_back">
        <div class="Copyrightnotice" id="Copyrightnotice">
            系统许可将于{{capability}}天后到期，请及时购买许可，避免影响正常使用。
        </div>
        <!-- <div class="login_but">
            <router-link :to="{name:'Downloadapp'}">
                <el-button class="but_jump" plain>{{this.$t("message.archive.Download")}}</el-button>
            </router-link>
        </div> -->
        <div class="login_head">
            <div class="login_title"></div>
            <div class="login_content">
                <CCol sm="12">
                    <CCard class="content_beck">
                        <CCardBody>
                            
                            <CForm novalidate @submit.stop.prevent="login">
                                <div class="prompt" id="prompt">
                                    <i class="iconfont icon-ts-caveat"></i> <span>用户名或密码错误，请您重新输入，剩余次数{{frequency}}次。</span>
                                </div>
                                <div class="prompt" id="prompt1">
                                    <i class="iconfont icon-ts-caveat"></i> <span>错误次数过多，账户已锁定 ,请{{lockingdate}}分钟后再试!</span>
                                </div>
                                <CInput placeholder="Username" v-model="name">
                                    <template #prepend-content><i class="content_icon iconfont icon-yonghuming"></i> </template>
                                </CInput>
                                <CInput placeholder="password" type="password" v-model="passw">
                                    <template #prepend-content><i class="content_icon iconfont icon-suozi"></i> </template>
                                </CInput>
                                <div class="content_lang">
                                    <div class="lang_size">语言</div>
                                    <!-- <CSelect
                                    class="a"
                                        horizontal
                                        :options="selectOptions"
                                        placeholder="Please select"
                                    /> -->
                                    <!-- <i-select class="lang_back" :model="model1" style="width:200px">
                                        <i-option v-for="(item,index) in cityList" :key="index" :value="item.value">{{ item.label }}</i-option>
                                    </i-select> -->
                                    
                                    <el-select class="lang_back" v-model="lang" @change="langchang" placeholder="请选择">
                                        <el-option
                                            v-for="item in cityList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="form-actions">
                                    <CButton class="form_butt" type="submit">
                                        {{$t("message.login.login")}}
                                    </CButton>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </div>
            <div class="login_buttom">{{date}} © linkingvision.com</div>
        </div>
    </div>
</template>
<script>
import '../assets/js/jQuery.md5'
export default {
    data() {
        return {
            date:new Date().getFullYear(),
            name:"",
            passw:"",
            capability:"",
            dialogVisible: false,
            selectOptions: [
                'English', '简体中文',
            ],
            lang:this.$store.state.lang,
            cityList: [
                {
                    value: 'en',
                    label: 'English'
                },
                {
                    value: 'zhchs',
                    label: '简体中文'
                },
            ],
            e1:undefined,
            frequency:0,
            lockingdate:0
        };
    },
    mounted(){
        $("#prompt").hide();
        $("#prompt1").hide();
        this.GetSystemInfo()
        console.log(sessionStorage.getItem('mcutoken'),sessionStorage.getItem('mcuuser'),sessionStorage.getItem('mculang'),sessionStorage.getItem('mcuroot'),this.$store.state.token,this.$store.state.user)
    },
    methods: {
        GetSystemInfo() {
            let root=this.$store.state.IPPORT;
            var url =root + "/api/v1/GetLicEndTime?session=" + this.$store.state.token;
                // console.log("------------",url)
            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200) {
                    var Enddate=new Date(result.data.strEndtime).getTime()
                    var date=new Date().getTime()
                    var Timedifference=1000*60*60*24*31
                    if((Enddate-date)<Timedifference){
                        console.log(date-Enddate,Timedifference,result.data.strEndtime);
                        this.capability=result.data.strEndtime
                        this.$store.state.Certificatetime='false'
                        sessionStorage.Certificatetime = 'false'
                        document.getElementById("Copyrightnotice").style.display='block';
                    }else{
                        this.$store.state.Certificatetime='true'
                        sessionStorage.Certificatetime = 'true'
                    }

                    console.log(Enddate-date,Timedifference);
                }
            }).catch(error => {
                console.log("GetSystemInfo", error);
            });
        },
        
        langchang(){
            console.log("111",this.lang)
            this.$i18n.locale=this.lang
            this.$store.state.lang=this.lang
            sessionStorage.mculang=this.lang
            console.log("11221",this.$store.state.lang,this.$i18n.locale)
        },
        login(){
            // return false;
            let root=this.$store.state.IPPORT;
            var url=root+'/api/v1/Login?user='+encodeURIComponent(this.name)+'&password='+encodeURIComponent($.md5(this.passw))+''
            // console.log(root,url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    if(result.data.bStatus){
                        $("#prompt").hide();
                        $("#prompt1").hide();
                        var data=result.data;
                        console.log(data)
                        this.$store.state.token=data.strSession
                        sessionStorage.mcutoken = this.$store.state.token
                        
                        this.loginroot(data.strSession,root)
                    }else{
                        console.log(result.data)
                        if(result.data.nFaultTimes<=3){
                            this.frequency=3-result.data.nFaultTimes;
                            // console.log("data还能错次拉",3-data.nFaultTimes,_this.frequency);
                            $("#prompt").show();
                            $("#prompt1").hide();
                        }else{
                            this.lockingdate = Math.floor(data.tLockTimeResidue/60);
                            $("#prompt1").show();
                            $("#prompt").hide();
                        }
                        this.$message(this.$t("message.login.login_status_failed"));
                    }
                }
            })
        },
        loginroot(strSession,root){
            var url=root+'/api/v1/GetUserInfo?user='+encodeURIComponent(this.name)+'&session='+strSession;
            
            console.log(root,url)
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    var data=result.data;
                    console.log(data)
                    this.$store.state.user=data.strUser
                    this.$store.state.root=data.strUserType
                    sessionStorage.mcuuser = this.$store.state.user
                    sessionStorage.mcuroot=this.$store.state.root
                    this.$router.push({
                        path: 'Dashboard'
                    })
                }
            })
        },
    }
};
</script>
<style lang="scss" scopad>

.login_back{
    width: 100%;
    height: 100%;
    position: fixed;
    background: url('../assets/imgs/login_back.png') no-repeat;
    background-size: cover;
    .login_but{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 0 20px;
        margin-top: 40px;
    }
    /* 版权 */
    .Copyrightnotice{
        position: fixed;
        top: 0;
        width: 100%;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        z-index: 100000;
        background-color: #E62424;
        display: none;
    }
    .login_head{
        text-align: center;
        margin: 12% auto 0;
        .login_title{
            height: 70px;
            margin-bottom: 30px;
            background: url('../assets/imgs/H5s_logo.png')no-repeat center center;
        }
        .login_content{
            margin: 0 auto;
            padding: 20px 2%;
            width:24%;
            background:#FFFFFF;
            // border: 2px solid rgba(30,34,40,0.1);
            box-shadow: -10px -10px 20px 10px rgba(226,226,226,0.3);
            .content_beck{
                background: none;
                border: none;
                /*错误提示 */
                .prompt{
                    font-size:7px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(208,19,19,1);
                }
                .form-group{
                    font-size:10px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(34,38,44,1);
                    border-bottom: 1px solid rgba(226,226,226,1);
                    .content_icon{
                        color: #22262C;
                    }
                    .form-control{
                        background: none;
                        border: none;
                    }
                }
                .input-group-text{
                    background: none;
                    border: none;
                }
                .content_lang{
                    border-bottom: 1px solid rgba(226,226,226,1);
                    .lang_size{
                        text-align: left;
                        font-family:PingFang SC;
                        font-weight:600;
                        color:rgba(34,38,44,1);
                    }
                    .lang_back{
                        width: 100%;
                        .el-input__inner{
                            background: none;
                            border: none;
                        }
                        
                    }
                }
                .form-actions{
                    .form_butt{
                        width: 100%;
                        border: none;
                        background:#3277FF;
                        margin: 20px 0;
                        padding: 5px;
                        font-size:14px;
                        font-family:PingFang SC;
                        font-weight:600;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
        .login_buttom{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #FFFFFF;
            font-size:12px;
            font-family:PingFang SC;
            font-weight:600;
            background: rgba(0,0,0,0.4);
        }
    }
}
</style>