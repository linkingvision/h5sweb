<template>
    <div class="playback">
        <div class="playback_snap_zuo">
            <!-- 模糊查询搜查 -->
            <el-input
                class="snap_zuo_input"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input>
            <div class="snap_zuo_title">联系人</div>
            <el-tree
                :data="data"
                node-key="id"
                :filter-node-method="filterNode"
                ref="tree"
                highlight-current
                :props="defaultProps">
                <span slot-scope="{ data }" style="width:100%;">
                    <div class="Avintercoms_tree" style="width:100%;display: flex;justify-content: space-between;">
                        <div >
                            <!-- <img src="" alt=""> -->
                            <i class="iconfont icon-yonghuming"></i>
                            <span style="padding-left: 4px;">{{data.label}}</span>
                            <!-- <span  class="black" style="">{{$t("message.live.Videorecording")}}</span> -->
                        </div>
                        <div style="display: flex;justify-content: space-between;">
                            <div @click="CallVideoAudio(data)" class="Avintercoms_icon1"></div>
                            <div @click="CallAudio(data)" class="Avintercoms_icon" ></div>
                        </div>
                        
                    </div>
                </span>
            </el-tree>
        </div>
        <div class="playback_snap_you">
            <div class="up_you_flex">
                <div class="up_you_content">
                    <span>Video In</span>
                    <el-select style="width:75%" v-model="VideoIn" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in VideoIns"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="up_you_content">
                    <span>Audio In</span>
                    <el-select style="width:75%" v-model="AudioIn" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in AudioIns"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="up_you_content">
                    <span>Audio Out</span>
                    <el-select style="width:75%" v-model="AudioOut" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in AudioOuts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="up_you_content">
                    <span>Resolution</span>
                    <el-select style="width:75%" v-model="Resolution" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in Resolutions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="content_name">
                {{name}}
            </div>
            <!--  -->
            <div class="content_video"  v-on:mouseover="sortAll()" v-on:mouseleave='leave()'>
                <!-- <img src="./gallery/chart.png"/> -->
                <video id="h5sVideoRemote" src=""></video>  
                <div class="content_h5sVideoRemote">
                    
                    <video id="h5sVideoLocal" muted src="" ></video>
                </div>
                <div class="content_anniu" >
                    <div class="content_anniu1">
                        <div>
                            <el-button type="danger" circle class="content_anniu1_Hangup" @click="Hangup">
                                {{$t("message.Conference.Hang")}}
                            </el-button>
                        </div>
                    </div>
                    
                </div>
                <div class="content_anniu2">
                    <div class="content_anniu2_frame">
                        <div>
                            <span>{{$t("message.Conference.Call")}}</span>
                            <el-button style="background:none;border:0; padding: 0;" type="success" @click="Hangup()" circle size="mini"></el-button>
                        </div>
                        <div>
                            <img src="../imgs/Avintercoms_back.png"/>
                        </div>
                        <div>
                            <el-button  type="success" @click="AnswerVideoAudio()" round size="mini">{{$t("message.Conference.VideoCall")}}</el-button>
                            <el-button  type="success" @click="AnswerAudio()" round size="mini">{{$t("message.Conference.AudioCall")}}</el-button>
                            <el-button style="background:none;border:1px solid #3ABBFE" type="danger" @click="Hangup()" round size="mini">{{$t("message.Conference.HangUp")}}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../assets/js/adapter'
import {H5sPlayerHls,H5sPlayerAudBack,H5sConference,H5sRTCGetCapability} from '../../assets/js/h5splayer'
export default {
    
    name:"Avintercoms",
    data() {
        return {
            VideoIns: [],
            VideoIn:"",

            AudioIns: [],
            AudioIn:"",

            AudioOuts: [],
            AudioOut:"",

            Resolutions: [],
            Resolution:"",

            filterText: '',
            searchTableInfo:this.$store.state.user,
            v1:undefined,
            name:'',
            data:[],
            hangup:false,
            defaultProps: {
                children: 'children',
                label: 'label',
                token:"token",
                iconclass:"iconclass"
            }
        }
    },
    beforeDestroy(){
        if (this.v1 != undefined)
        {
            this.v1.disconnect();
            delete this.v1;
            this.v1 = undefined;
        }
    },
    mounted(){
        console.log(this.searchTableInfo)
        this.updisplay()
        this.list();
    },
    methods:{
        //拨打视频语音电话
        CallVideoAudio(data){
            this.name=data.label;
            // this.id=data.id;
            console.log("CallVideoAudio",data.id);
            this.v1.call(true,data.id,this.VideoIn,this.Resolution,this.AudioIn);
            this.$nextTick(()=>{
                this.hangup=true
            })
        },
        //拨打语音电话
        CallAudio(data){
            this.name=data.label;
            // this.id=data.id;
            console.log("CallAudio",data.id);
            this.v1.call(false, data.id,this.VideoIn,this.Resolution,this.AudioIn);
            this.$nextTick(()=>{
                this.hangup=true
            })
        },
        //接通视频
        AnswerVideoAudio(){
            console.log("AnswerVideoAudio",this.id);
            $(".content_anniu2").css("display","none");
            this.v1.answer(true,this.id,this.VideoIn,this.Resolution,this.AudioIn);
            this.$nextTick(()=>{
                this.hangup=true
            })
        },
        //接通语音
        AnswerAudio(){
            console.log("AnswerAudio",this.id);
            $(".content_anniu2").css("display","none");
            this.v1.answer(false, this.id,this.VideoIn,this.Resolution,this.AudioIn);
            this.$nextTick(()=>{
                this.hangup=true
            })
        },

        //挂断
        Hangup(){
            console.log("Hangup");
            this.v1.hangup();
            $(".content_anniu2").css("display","none");
            this.$nextTick(()=>{
                this.hangup=false
                $(".content_anniu").css("display","none");
            })
        },
        // 添加用户
        add(){
            if( this.searchTableInfo!=""){
                if (this.v1 != undefined)
                {
                    this.v1.disconnect();
                    delete this.v1;
                    this.v1 = undefined;
                }
                this.data=[];
                this.list();
                // this.$store.commit(types.CONFERENCE, this.searchTableInfo);
            }else{
                this.$message({
                    message: this.$t("message.Conference.Nickname"),
                    type: 'warning'
                });
            }
            
        },
        updisplay(){
            var up=H5sRTCGetCapability(this.UpdateCapability);
        },
        UpdateCapability(capability){
            
            console.log(capability);
            if(capability){

                
                for (let i = 0; i !== capability['videoin'].length; ++i) {
                    const data = capability['videoin'][i];
                    var src={
                        value: data.id,
                        label: data.name
                    }
                    this.VideoIn=data.id
                    this.VideoIns.push(src);
                }	

                for (let i = 0; i !== capability['audioin'].length; ++i) {
                    const data = capability['audioin'][i];
                    var src={
                        value: data.id,
                        label: data.name
                    }
                    this.AudioIn=capability['audioin'][0].id
                    this.AudioIns.push(src);
                }
                
                for (let i = 0; i !== capability['audioout'].length; ++i) {
                    const data = capability['audioout'][i];
                    var src={
                        value: data.id,
                        label: data.name
                    }
                    this.AudioOut=capability['audioout'][0].id
                    this.AudioOuts.push(src);
                }
                
                var resolution = ['QVGA', 'VGA', 'D1', '720P', '1080P', '4K', '8K']
                for (let i = 0; i !== resolution.length; ++i) {
                    const data = resolution[i];
                    /* Default use 720P */
                    
                    var src={
                        value: data,
                        label: data
                    }
                    // this.Resolution=data
                    if (data == '720P')
                    {
                        this.Resolution=data
                    }
                    this.Resolutions.push(src);
                }
            }
        },
        //获取列表
        list(){
            console.log(this.searchTableInfo)
            this.data=[];
            var root = this.$store.state.IPPORT;
            var wsroot = this.$store.state.WSROOT;
            // console.log("11111111111111",process.env.API_ROOT)
            var conf1 = {
                localvideoid:'h5sVideoLocal',
                remotevideoid:'h5sVideoRemote',
                protocol: window.location.protocol, //http: or https:
                host: wsroot, //localhost:8080
                rootpath:'/', // '/'
                callback: this.EventCB, 
                userdata: null, // user data
                user:this.searchTableInfo,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                session: this.$store.state.token //session got from login
            };
            console.log(conf1);
            this.v1 = new H5sConference(conf1);
            this.v1.connect();
        },
        sortAll(){
            // console.log(video.poster)
            if(this.hangup){
                $(".content_anniu").css("display","block");
                // console.log("1548");
            }
        },
        leave(){
            if(this.hangup){
                $(".content_anniu").css("display","none");
                // console.log("456787");
            }
        },
        //点击事件
        handleNodeClick(data){
            // console.log("点击",data)
        },
        EventCB(event, userdata){
            var msgevent = JSON.parse(event);
            if (msgevent.type === 'CFE_EVENT_PEER_CALL')
            {
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].id==msgevent.peerCall.strId){
                        console.log("对方id",this.data[i].label)
                        this.name=this.data[i].label;
                    }
                }
                $(".content_anniu2").css("display","block");
                this.id=msgevent.peerCall.strId;
                console.log("****************",msgevent.peerCall.strId);
            }
            if (msgevent.type === 'CFE_EVENT_PEER_ADD')
            {
                console.log("****************",msgevent.peerAdd.strId);
                var newItem ={
                    label:msgevent.peerAdd.strName,
                    id:msgevent.peerAdd.strId
                };
                this.data.push(newItem);
                // for(var i=0; i<this.data.length; i++){
                //     for(var j=i+1; j<this.data.length; j++){
                //         if(this.data[i].id==this.data[j].id){
                //             this.data.splice(j,1);
                //             j--;
                //         }
                //     }
                // }
                
                console.log("****************",newItem,this.data);
            }
            if (msgevent.type === 'CFE_EVENT_PEER_DEL')
            {
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].id==msgevent.peerDel.strId){
                        this.data.splice(i,1);
                        // console.log("对方id",this.data[i].label)
                    }
                }
                console.log("****************",msgevent.peerDel.strId);
            }
        },
        //模糊查询
        filterNode(value, data, node) {
            // 如果什么都没填就直接返回
            if (!value) return true;
            // 如果传入的value和data中的label相同说明是匹配到了
            if (data.label.indexOf(value) !== -1) {
            return true;
            }
            // 否则要去判断它是不是选中节点的子节点
            return this.checkBelongToChooseNode(value, data, node);
        },
        
    },
     //模糊查询
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
    
}
</script>

<style lang="scss" scoped>
.playback{
    display: flex;
    justify-content: space-between;
    .playback_snap_zuo{
        width: 18%;
        height: 87vh;
        .snap_zuo_title{
            width: 100%;
            padding: 12px 20px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            margin-bottom: 10px;
        }
        .Avintercoms_tree{
            font-size: 20px !important;
            div{
                margin-right: 10px;
            }
            .Avintercoms_icon{
                width: 32px;
                height: 32px;
                background: url('~@/views/imgs/Avintercoms_bbj.png') no-repeat;
                background-size: 100%;
            }
            .Avintercoms_icon1{
                width: 32px;
                height: 32px;
                background: url('~@/views/imgs/Avintercoms_video.png') no-repeat;
                background-size: 100%;
            }
        }
    }
    .playback_snap_you{
        width: 82%;
        height: 87vh;
        padding-left: 8px;
        .up_you_flex{
            display: flex;
            justify-content: space-around;
            line-height: 80px;
            .up_you_content{
                width: 24%;
                display: flex;
                align-items: center;
                justify-content:space-around;
                span{
                    width: 26%;
                }
            }
        }
        .content_name{
            width: 100%;
            font-size:18px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            margin-bottom: 30px;
            height: 20px;
            line-height: 20px;
        }
        .content_video{
            width: 100%;
            height: 72vh;
            position: relative;
            background-color: #222222;
            #h5sVideoRemote{
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
            .content_h5sVideoRemote{
                position: absolute;
                height: 200px;
                width: 250px;
                // background-color: #f7f7f7;
                bottom: 10px;
                right: 10px;
                #h5sVideoLocal{
                    width: 100%;
                    height: 100%;
                    object-fit: fill;
                }
            }
            .content_anniu{
                display: none;
                width: 100%;
                
                .content_anniu1{
                    width: 50%;
                    position: absolute;
                    display: flex;
                    flex-wrap: wrap;
                    align-items:center;
                    justify-content: space-between;
                    right: 20px;
                    bottom: 20px;
                    text-align: center;
                    
                    .content_anniu1_Hangup{
                        width: 60px;
                        height: 60px;
                        background-color: #3ABCFE;
                        border: none;
                    }
                }
            }

            .content_anniu2{
                display: none;
                width: 100%;
                position: absolute;
                top: 0;
                text-align: center;
                background: rgba(0,0,0,0.5);
                height: 100%;
                
                .content_anniu2_frame{
                    width: 30%;
                    text-align: center;
                    margin: 5% auto 0;
                    background-color: #2d2d2d;
                    padding: 10px;
                    color: #fff;
                    button{
                        background-color: #3ABBFE;
                        border: none;
                    }
                    & div:nth-child(3){
                        margin-top: 20px;
                    }
                    & div:nth-child(2) img{
                        width: 100%;
                    }
                    & div:nth-child(1){
                        display: flex;
                        width: 100%;
                        margin-bottom: 10px;
                        justify-content: space-between;
                    }
                }
            }
        }
    }
}
</style>