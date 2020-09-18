<template>
    <div class="playback">
        <div class="playback_snap_zuo">
            <video class="h5video" id="h5sVideoLocal" autoplay webkit-playsinline playsinline></video>
        </div>
        <div class="playback_snap_you">
            <div class="up_you_flex">
                <div class="up_you_content">
                    <span>Video Codec</span>
                    <el-select style="width:75%" v-model="VideoCodec" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in VideoCodecs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

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

                <div class="up_you_content">
                    <span>Bitrate（Kpbs）</span>
                    <el-select style="width:75%" v-model="Bitratess" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in Bitrates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="up_you_content">
                    <span>Audio</span>
                    <el-switch
                        style="width:75%"
                        v-model="audioout"
                        active-color="#5DBFA6">
                    </el-switch>
                </div>

            </div>
            <div class="up_you_but">
                <div>
                    <el-button @click="connection" class="button_addpv" type="success"  size="mini">{{$t("message.Conference.Connect")}}</el-button>
                </div>
                <div>
                    <el-button @click="down" class="button_addpv1" type="success"  size="mini">{{$t("message.Conference.Disconnect")}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../assets/js/adapter'
import {H5sRTCPush,H5sRTCGetCapability} from '../../assets/js/h5splayer'
export default {
    
    name:"Avintercoms",
    data() {
        return {
            VideoCodecs: [],
            VideoCodec:"",

            VideoIns: [],
            VideoIn:"",

            AudioIns: [],
            AudioIn:"",

            AudioOuts: [],
            AudioOut:"",

            Resolutions: [],
            Resolution:"",

            Bitrates: [],
            Bitratess:"",
            audioout:true,
            v1:undefined
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
    },
    methods:{
        connection(){
            if (this.v1 != undefined)
            {
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
            }
            var root = this.$store.state.IPPORT;
            var wsroot = this.$store.state.WSROOT;
            var audioout=this.audioout.toString();
            var conf1 = {
                localvideoid:'h5sVideoLocal', //{string} - id of the local video element tag
                //localvideodom: h5svideodomlocal, //{object} - local video dom. if there has videoid, just use the videoid
                protocol: window.location.protocol, //http: or https:
                host:wsroot, //localhost:8080
                rootpath:'/', // {string} - path of the app running
                user:this.$store.state.users, // {string} - user name
                type:'media', // {string} - media or sharing
                audio: audioout,
                callback: null, //Callback for the event
                userdata: null, // user data
                session: this.$store.state.token, //session got from login
                consolelog: 'true' // 'true' or 'false' enable/disable console.log
            };
            console.log("***********",conf1, audioout)
            // return false
            console.log("*******",this.VideoCodec,"1*",
                this.VideoIn,"2*",
                this.Bitratess,"5*",
                this.Resolution,"3*",
                this.AudioIn,
            )
                // return false
            this.v1 = new H5sRTCPush(conf1);
		    this.v1.connect(
                this.VideoIn,
                this.VideoCodec,
                this.Bitratess,
                this.Resolution,
                this.AudioIn,
                false
            );
            console.log(this.AudioIn)
        },
        down(){
            this.v1.disconnect();
        },
        updisplay(){
            var up=H5sRTCGetCapability(this.UpdateCapability);
        },
        UpdateCapability(capability){
            
            console.log(capability);
            if(capability){

                for (let i = 0; i !== capability['videocodec'].length; ++i) {
                    const data = capability['videocodec'][i];
                    var src={
                        value: data,
                        label: data
                    }
                    this.VideoCodec = data
                    this.VideoCodecs.push(src);
                }
                for (let i = 0; i !== capability['videocodec'].length; ++i) {
                    const data = capability['videocodec'][i];
                    if (data == 'H264')
                    {
                        this.VideoCodec = data
                    }
                }
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
                
                var bitrate = ['32', '64', '128', '256', '512', '1024', '2048', '4096']
                for (let i = 0; i !== bitrate.length; ++i) {
                    const data = bitrate[i];
                    var src={
                        value: data,
                        label: data
                    }
                    // this.Bitratess=data
                    /* Default use 720P */
                    if (data == '1024')
                    {
                        this.Bitratess=data
                    }
                    this.Bitrates.push(src);
                }
            }
        },
        //模糊查询
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
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
        width: 82%;
        height: 87vh;
        .snap_zuo_title{
            width: 100%;
            padding: 12px 20px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            margin-bottom: 10px;
        }
        .h5video{
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }
    .playback_snap_you{
        width: 18%;
        height: 87vh;
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        .up_you_flex{
            width: 100%;
            .up_you_content{
                line-height: 50px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content:space-around;
                span{
                    width: 40%;
                }
            }
        }
        .up_you_but{
            width: 100%;
            margin-bottom: 50px;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            div{
                width: 100%;
                text-align: center;
                line-height: 100px;
                button{
                    width: 70%;
                    padding: 10px 15px;
                    background-color: #3ABCFE;
                    border: none;
                }
            }
            & div:nth-child(2){
                button{
                    width: 70%;
                    padding: 10px 15px;
                    background:none;
                    border: 1px solid #3ABCFE;
                }
            }
        }
    }
}
</style>