<template>
    <div class="liveplay h5container">
        <video class="h5video" :id="videoid" autoplay webkit-playsinline playsinline></video>
        <div :id="videonameid" class="" >
            {{videoname}} {{picturequality}}
            <input type="button" :value="valuebutton"  @click="Bitstream($event.target.value)" :id="inputid" class=""/>
        </div>
        <div :id="rtcid" class=""></div>
        <!-- 画质 -->
        <span class=" "  :id="spanqualityid">
            <el-dropdown placement='top-end' trigger="click"  @command="handleCommand" class=" "  :id="qualityid">
                <span :id="elqualityid" class="el-dropdown-link">
                    <i class="el-icon-video-camera el-icon--left"></i>{{$t('message.live.Quality')}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <template >
                        <el-dropdown-item v-for="(it,index) in qualitylist"   :key="index" :command="it">{{it.strName}}</el-dropdown-item>
                    </template>
                </el-dropdown-menu>
            </el-dropdown>
        </span>
        <div id="Audio_slider" class="Audio_slider">
            <el-slider :step='0.1' :show-tooltip="false" :max='1' @input='Audiochange' v-model="Audioslider"></el-slider>
        </div>
        <div class="information"  style="display:none padding:0px">
            <div class="information_con">
                <div class="information1">
                    <div class="information_title">{{$t('message.live.Video')}}</div>
                    <div class="information_content" v-for="(a,index) in informationVideo" :key="index">
                        <div class="information_content_left">{{a.name}}</div>
                        <div class="information_content_right">{{a.data}}</div>
                    </div>
                </div>
                <div class="information1">
                    <div class="information_title">{{$t('message.live.Audio')}}</div>
                    <div class="information_content" v-for="(a,index) in informationAudio" :key="index">
                        <div class="information_content_left">{{a.name}}</div>
                        <div class="information_content_right">{{a.data}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="liveplay_butt">
            <CDropdown
                class="fw_butt"
                style=""
                color="link"
                placement="top-start"
                :caret="false">
                <template #toggler-content>
                    <button class="iconfont icon-erweima1" @click="qrcode"></button>
                </template>
                <div class="bottom_QR">
                    <div class="bottom_scan">扫一扫</div>
                    <div class="bottom_QRcode">
                        <div>
                            <div ref="qrcodead" id="qrcodead1" style="margin-bottom: 16px;"></div>
                            <div>Android</div>
                        </div>
                        <div>
                            <div ref="qrcodeios" id="qrcodeios1" style="margin-bottom: 16px;"></div>
                            <div>iOS</div>
                        </div>
                    </div>
                </div>
            </CDropdown>
            <button class="info_id_show iconfont" :class="(Audioslider==0)?'icon-jingyin':'icon-mn_shengyin_fill'" @click="Audiosetup"></button>
            <button class="info_id_show iconfont icon-liuliang" @click="Information"></button>
            <button class="iconfont" :class="Shoutwheatclass" @click="Shoutwheat"></button>
            <button class="iconfont icon-picfill" @click="DoSnapshotWeb"></button>
            <button class="iconfont icon-camerafill" @click="DoSnapshot"></button>
            <button class="iconfont icon-videofill" @click="DoManualRecordStart"></button>
            <button class="iconfont icon-radioboxfill" @click="DoManualRecordStop"></button>
            <button class="ptz_id_show iconfont icon-yuntai" @click="PtzControlShow"></button>
            <button class="iconfont icon-full" @click="FullScreen"></button>
            <button class="iconfont icon-roundclosefill" @click="CloseVideo('close')"></button>
        </div>
        <div class="liveplay_ptz"  style="display:none padding:0px">
            <div class="flex_content">
                <div class="content_zoom">
                    <div class="key_zoom">
                        <div class="key_flex">
                            <div class="key_but" @mousedown ="PtzActionUpleft($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionUpleft($event)" @touchend="PtzActionStop($event)"></div>
                            <div class="key_but" @mousedown ="PtzActionUp($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionUp($event)" @touchend="PtzActionStop($event)"></div>
                            <div class="key_but" @mousedown ="PtzActionUpright($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionUpright($event)" @touchend="PtzActionStop($event)"></div>
                            <div class="key_but" @mousedown ="PtzActionLeft($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionLeft($event)" @touchend="PtzActionStop($event)"></div>
                            <div class="key_but" ></div>
                            <div class="key_but" @mousedown ="PtzActionRight($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionRight($event)" @touchend="PtzActionStop($event)"></div>
                            <div class="key_but" @mousedown ="PtzActionDownleft($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionDownleft($event)" @touchend="PtzActionStop($event)"></div>
                            <div class="key_but" @mousedown ="PtzActionDown($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionDown($event)" @touchend="PtzActionStop($event)"></div>
                            <div class="key_but" @mousedown ="PtzActionDownright($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionDownright($event)" @touchend="PtzActionStop($event)"></div>
                        </div>
                        
                    </div>
                    <div class="zoom">
                            <el-tooltip :enterable="false" :content="content.focusing" placement="top" effect="light">
                                <button class="iconfont icon-add-focus zoom_add" @mousedown ="PtzActionZoomIn($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionZoomIn($event)" @touchend="PtzActionStop($event)"></button>
                            </el-tooltip>
                            <el-tooltip :enterable="false" :content="content.focusing" placement="top" effect="light">
                                <button class="iconfont icon-reduce-focus zoom_add" @mousedown ="PtzActionZoomOut($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionZoomOut($event)" @touchend="PtzActionStop($event)"></button>
                            </el-tooltip>
                        </div>
                </div>
                <!-- 聚光等 -->
                <div class="zoom_g">
                    <el-tooltip :enterable="false" :content="content.Focus" placement="top" effect="light">
                        <button class="iconfont icon-jujiao2 zoom_add" @mousedown ="PtzActionfocusing($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionfocusing($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" :content="content.Focus" placement="top" effect="light">
                        <button class="iconfont icon-jujiao1 zoom_add" @mousedown ="PtzActionfocusings($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionfocusings($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>

                    <el-tooltip :enterable="false" :content="content.aperture" placement="top" effect="light">
                        <button class="iconfont icon-guangquanjia zoom_add" @mousedown ="PtzActionaperture($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionaperture($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" :content="content.aperture" placement="top" effect="light">
                        <button class="iconfont icon-guangquanjian zoom_add"  @mousedown ="PtzActionaperturej" @mouseup="PtzActionStop" @touchstart ="PtzActionaperturej" @touchend="PtzActionStop"></button>
                    </el-tooltip>
                    <!-- 后四 -->
                    <el-tooltip :enterable="false" :content="content.LightON" placement="top" effect="light">
                        <button class="iconfont icon-light-open zoom_add" @mousedown ="PtzActionlighton($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionfocusing($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" :content="content.LightOFF" placement="top" effect="light">
                        <button class="iconfont icon-light-close zoom_add" @mousedown ="PtzActionlightoff($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionfocusings($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>

                    <el-tooltip :enterable="false" :content="content.WiperON" placement="top" effect="light">
                        <button class="iconfont icon-kaiyushua zoom_add" @mousedown ="PtzActionwiperon($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionaperture($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" :content="content.WiperOFF" placement="top" effect="light">
                        <button class="iconfont icon-guanyushua zoom_add" @mousedown ="PtzActionwiperoff($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionaperture($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>
                </div>
                <div class="Preset">
                    <div class="" style="text-align: center;">
                        <el-slider v-model="Preset_value" :show-tooltip="false" :max="1" :min="0.1" :step="0.1"></el-slider>
                        <span style="color:#ffffff;">{{Preset_value}}</span>
                    </div>
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item placement="top" v-for="Pre in Presetdata" :key="Pre.strName" >
                                <el-card>
                                    <div class="preset_bgc">
                                        <input type="text" class="preset_input" :value="Pre.strName"/>
                                        <button type="button" class="iconfont icon-RectangleCopy1" @click="preset_Jump(Pre.strToken)"></button>
                                        <button type="button" class="iconfont icon-icon-test1" @click="preset_set(Pre.strToken,$event)"></button>
                                    </div>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import '../../assets/js/adapter'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../../assets/js/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../../assets/js/h5splayerhelper.js'
export default {
    name:"liveplay",
    props:['h5id', 'h5videoid',"cols","rows"],
    data(){
        return{
            Audioslider:0,//音频
            informationshow: false,
            informationAudio:[],
            informationVideo:[],
            proto: this.$store.state.liveviewrtc,
            videoid: this.h5videoid,
            h5handler:undefined,//v1
            audioback:undefined,//语音
            currtoken:undefined,//token
            tokenshou:null,
            ptzshow: false,
            audioshow: false,
            Preset_value:0.5,//镜头转换速度
            Presetdata:[],//预置位数组
            Shoutwheatclass:"icon-voicefill1",//语音图标
            content:{
                focusing:this.$t('message.live.focusing'),
                Focus:this.$t('message.live.Focus'),
                aperture:this.$t('message.live.aperture'),

                LightON:this.$t('message.live.LightON'),
                LightOFF:this.$t('message.live.LightOFF'),
                WiperON:this.$t('message.live.WiperON'),
                WiperOFF:this.$t('message.live.WiperOFF')
            },//聚焦

            spanqualityid:"spanqualityid"+this.h5videoid,
            qualityid: 'quality'+this.h5videoid,
            elqualityid:'elqualityid'+this.h5videoid,
            videonameid:"name"+this.h5videoid,
            picturequalityid:"picturequalityid"+this.h5videoid,
            inputid:"input"+this.h5videoid,
            qualitylist:[],
            valuebutton:this.$t("message.live.substream"),
            videoname:"",//视频名称
            picturequality:'',//画质名称
            rtcid:"rtc"+this.h5videoid,
            streamprofileInformation:null,//码流区分
        }
    },
    beforeDestroy() {
        this.CloseVideo('close');
    },
    computed: {
        listData() {
            return this.$store.state.liveplay;
        }
    },
    mounted(){
        let _this = this;
        // console.log(this.$store.state.liveplay)
        $("#"+this.spanqualityid).addClass("spanquality")
        $("#"+this.inputid).addClass("spanpicturequality")
        this. Gettranscod()
    },
    watch:{
        listData(token){
            if(token.viewparameter=='viewparameter'){
                this.CloseVideo(token.viewparameter);
            }
            setTimeout(()=>{
                console.log(token.token)
                if (this.h5id != token.vid)
                {
                    return;
                }
                
                this.PlayVideo(token.token,token.streamprofile,token.label,token.name);
                this.tokenshou=token.token;
                this.streamprofileInformation=token.streamprofile
            },200)
        }
    },
    methods:{
        //音频
        Audiosetup(){
            var $container = $("#"+this.h5id);
            var $controlsin = $container.children(".Audio_slider");
            if (this.audioshow == false){
                $controlsin.css("display", "block");
                this.audioshow = true;
            }else{
                $controlsin.css("display", "none");
                this.audioshow = false;
            }
        },
        Audiochange(){
            //要打开音频设置
            console.log("要打开音频设置",this.Audioslider)
            document.getElementById(this.h5videoid).volume=this.Audioslider
        },
        //码率
        Information(){
            console.log('124')
            var $container = $("#"+this.h5id);
            var $controlsin = $container.children(".information");
            var cors=this.cols*this.rows;
            console.log(this.tokenshou)
            if(cors>9||this.tokenshou==undefined){
                return false
            }
            if (this.informationshow == false)
            {
                console.log('12455',cors)
                $controlsin.css("display", "block");
                this.informationshow = true;
            }else
            {
                $controlsin.css("display", "none");
                this.informationshow = false;
                clearInterval(this.timerRunInfo);
                return false
            }
            this.Informationdate()
            this.timerRunInfo = setInterval(() => {
                this.Informationdate()
            },8000)

        },
        Informationdate(){
            var root = this.$store.state.IPPORT;
            //url
            var url = root + "/api/v1/GetVidStreamStatus?token="+this.tokenshou+"&stream="+this.streamprofileInformation+"&session="+ this.$store.state.token;
            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    console.log(result)
                    var item=result.data
                    var informationAudio=[{
                            name:this.$t("message.live.Codec"),
                            data:item.strAudioType
                        },{
                            name:this.$t("message.live.SampleRate"),
                            data:item.nAudioSampleRate
                        },{
                            name:this.$t("message.live.SampleBit"),
                            data:item.nAudioSampleBit
                        },{
                            name:this.$t("message.live.Channels"),
                            data:item.nAudioChannels
                        },{
                            name:this.$t("message.live.Bitrate"),
                            data:(item.nAudioBitrate/1024).toFixed(1)+'kpbs'
                        }]

                        var informationVideo=[{
                            name:this.$t("message.live.Codec"),
                            data:item.strVideoType
                        },{
                            name:this.$t("message.live.Width"),
                            data:item.nVideoWidth
                        },{
                            name:this.$t("message.live.Height"),
                            data:item.nVideoHeight
                        },{
                            name:this.$t("message.live.FPS"),
                            data:item.nVideoFPS
                        },{
                            name:this.$t("message.live.Bitrate"),
                            data:(item.nVideoBitrate/1024).toFixed(1)+'kpbs'
                        }]
                        this.informationAudio=informationAudio
                        this.informationVideo=informationVideo
                }
            })
        },
        //码流按钮
        Bitstream(event){
            console.log(event,this.$t("message.live.substream"))
            // return false
            if(event===this.$t("message.live.substream")){
                var streamprofile='sub'
                var token=this.inputtoken
                var label=this.inputlabel
                var arr=label.split("-")
                var name=arr[0]+"-"+this.$t("message.live.substream")
                this.PlayVideo(token,streamprofile,label,name)
                this.valuebutton=this.$t("message.live.mainstream")
                this.picturequality=''
            }else if(event===this.$t("message.live.mainstream")){
                var streamprofile='main'
                var token=this.inputtoken
                var arr=this.inputlabel.split("-")
                var name=arr[0]+"-"+this.$t("message.live.mainstream")
                this.PlayVideo(token,streamprofile,label,name);
                this.valuebutton=this.$t("message.live.substream")
                this.picturequality=''
            }
        },
        // 转码
        Gettranscod(){
            var url = this.$store.state.IPPORT + "/api/v1/GetTransProfile?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
            //   return false;
              if(result.status == 200){
                this.qualitylist=result.data.profile
                //   var itme=result.data.profile;
                //   for(var i=0;i<itme.length;i++){
                //       var qualitydata={
                //           strName:itme[i].strName,
                //           strToken:itme[i].strToken,
                //           nCodec:itme[i].nCodec,
                //           nEngine:itme[i].nEngine,
                //           nBitrate:itme[i].nBitrate,
                //           nFPSType:itme[i].nFPSType,
                //           nFPS :itme[i].nFPS,
                //           nScaleType:itme[i].nScaleType,
                //           nWidth:itme[i].nWidth,
                //           nHeight:itme[i].nHeight,
                //       };
                //       this.qualityform.push(qualitydata);
                //   }

             }
            }).catch()
        },
        // 画质
        handleCommand(command) {
           this.videoname=''
           var arr=this.inputlabel.split("-")
           var name=arr[0]+"-"+command.strName
           var token=this.inputtoken
           this.videoname=name
           var streamprofile= command.strToken
           this.PlayVideo(token,streamprofile,label,name)
           
        },
        //播放
        PlayVideo(token,streamprofile,label,name){
            

            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
            }
            this.currtoken = token;

            var videosize = document.querySelector('#'+this.h5id);
            // return false;
            this.inputtoken=token
            this.inputlabel=name
            this.streamprofile=streamprofile
            // this.streamprofile=streamprofile
            this.videoname=name;//视频名称
           
            $("#"+this.videonameid).addClass("videoname");
            $("#"+this.inputid).addClass("streambutton")
            $("#"+this.qualityid).addClass("quality")
            $("#"+this. picturequalityid).removeClass("picturequality")      
            //console.log("*********************",label,token);
            $("#"+this.spanqualityid).removeClass("spanquality")
            $("#"+this.inputid).removeClass("spanpicturequality") 
            this.currtoken = token;
            // console.log(streamprofile,"111111111111111111*****")
            if(streamprofile==="sub"){
                this.valuebutton=this.$t("message.live.mainstream")
            } else if(streamprofile==="main"){
                this.valuebutton=this.$t("message.live.substream")
            }else{
                this.valuebutton=this.$t("message.live.substream")
            }

            let conf = {
                videoid: this.h5videoid,
                protocol: window.location.protocol, //http: or https:
                host: this.$store.state.WSROOT, //localhost:8080
	            streamprofile: streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
                rootpath: '/', // '/'
                token: token,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                rtcengine: localStorage.getItem('H5sRtcengine'),
                session: this.$store.state.token, //session got from login
                consolelog: 'true'
            };
            if (this.$store.state.liveviewrtc == 'RTC' || (H5siOS() === true)){
                console.log(this.$store.state.liveviewrtc)
                this.h5handler = new H5sPlayerRTC(conf);
                $("#"+this.rtcid).addClass("rtc_new");
            }else{
                console.log(this.$store.state.liveviewrtc)
                this.h5handler = new H5sPlayerWS(conf);
                $("#"+this.rtcid).removeClass("rtc_new");
            }
            this.h5handler.connect();
            this.$store.state.liveplay={
                token:null,
                streamprofile:null,
                name:null,
                label:null,
                vid:null,
                viewparameter:null
            }
        },
        //关闭
        CloseVideo(viewparameter){
            // console.log(viewparameter)
            if(viewparameter==='close'){
                // console.log(this.$store.state.liveviewadd,this.tokenshou)
                for(var i=0;i<this.$store.state.liveviewadd.length;i++){
                    if(this.$store.state.liveviewadd[i].strToken==this.tokenshou){
                        this.$store.state.liveviewadd.splice(i,1)
                        console.log(this.$store.state.liveviewadd)
                    }
                }
            }
            var $container = $("#"+this.h5id);
            //音频
            var $controlsinAudio = $container.children(".Audio_slider");
            $controlsinAudio.css("display", "none");
            this.audioshow = false;
            //码流
            var $controlsininformation = $container.children(".information");
            $controlsininformation.css("display", "none");
            this.informationshow = false;
            clearInterval(this.timerRunInfo);
            //ptz
            var $controlsptz = $container.children(".liveplay_ptz");
            $controlsptz.css("display", "none");
            this.ptzshow = false;
            //转码
            this.videoname="";
            this.valuebutton='';
            var $ptzcontrols = $container.children(".ptzcontrols");
            
            // var valueId=document.getElementById('inputid ')
            // var divId=document.getElementById('divid')
            // console.log(divId)
            $ptzcontrols.css("display", "none");
            $("#"+this.videonameid).removeClass("videoname");
            $("#"+this.inputid).removeClass("streambutton")
            $("#"+this.qualityid).removeClass("quality")
            $("#"+this.rtcid).removeClass("rtc_new");
            $("#"+this.spanqualityid).addClass("spanquality")
            $("#"+this.inputid).addClass("spanpicturequality")
            if (this.audioback != undefined)
            {
                this.audioback.disconnect();
                delete this.audioback;
                this.audioback = undefined;
            }
            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
                if(document.getElementById(this.h5videoid)){
                    $("#" + this.h5videoid).get(0).poster = '';
                    $("#" + this.h5videoid).get(0).load();
                }
            }
            
        },
        //预置位跳转
        preset_Jump(token){
		   //url
		    var url = this.$store.state.IPPORT + "/api/v1/Ptz?token="+this.tokenshou+"&action=preset&preset="+token+"&speed="+this.Preset_value+"&session="+ this.$store.state.token;
            console.log(url)
            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    console.log("跳转");
                }
            })


        },
        //预置位设置
        preset_set(token,event){
            var input_val=event.currentTarget.previousElementSibling.previousElementSibling.value;
		   //url
		    var url = this.$store.state.IPPORT + "/api/v1/SetPreset?token="+this.tokenshou+"&presetname="+input_val+"&presettoken="+token+"&session="+ this.$store.state.token;
            console.log(url)
            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    console.log(result);
                }
            })
            console.log("设置");
        },
        // 二维码
        qrcode () {
            console.log(this.currtoken)
            if(this.currtoken==undefined){
                return false;
            }else{
                var android= window.location.protocol + '//' + window.location.host + '/single.html?token=' + this.currtoken+"&h5splayer=ws";
                var ios= window.location.protocol + '//' + window.location.host + '/single.html?token=' + this.currtoken+"&h5splayer=rtc";
            }
            this.$refs.qrcodead.innerHTML="";
            this.$refs.qrcodeios.innerHTML="";
            console.log(android,ios)
            var qrcode = new QRCode(this.$refs.qrcodead, {
                width: 100,
                height: 100// 高度
            })
            var qrcode1 = new QRCode(this.$refs.qrcodeios, {
                width: 100,
                height: 100// 高度
            })
            qrcode.clear();
            qrcode1.clear();
            qrcode.makeCode(android);
            qrcode1.makeCode(ios);
        },
        //麦克风
        Shoutwheat(){
            if (this.h5handler == undefined)
            {
                return;
            }
            var tokenshou=this.currtoken
            var conf2 = {
                protocol: window.location.protocol, //http: or https:
                host: window.location.host, //localhost:8080
                rootpath:'/', // '/' or window.location.pathname
                token:tokenshou,
                session:this.$store.state.token //session got from login
            };
            
            
            var Shoutwheat=this.Shoutwheatclass;
            if(Shoutwheat=="icon-voicefill1"){
                console.log("大开");
                this.audioback = new H5sPlayerAudBack(conf2);
                this.audioback.connect();
                this.Shoutwheatclass="icon-voicefill";
            }else{
                console.log("关闭2");
                this.audioback.disconnect();
                delete this.audioback;
                this.audioback = undefined;
                this.Shoutwheatclass="icon-voicefill1";
            }
        },
        //本地截图
        DoSnapshotWeb(){
            if (this.h5handler == undefined)
            {
                return;
            }
            var fileName = '1';
            const date = new Date();
            fileName = this.currtoken + '_' + date.getFullYear() + '-' + (date.getMonth() + 1)
                         + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
            console.log(fileName);
            var video = $("#" + this.h5videoid).get(0);
            var w = video.videoWidth;//video.videoWidth * scaleFactor;
            var h = video.videoHeight;//video.videoHeight * scaleFactor;
            var canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, w, h);
            var MIME_TYPE = "image/png";
            var imgURL = canvas.toDataURL(MIME_TYPE,1.0);
            // console.log(imgURL);

            var dlLink = document.createElement('a');
            dlLink.download = fileName;
            dlLink.href = imgURL;
            dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

            document.body.appendChild(dlLink);
            dlLink.click();
            document.body.removeChild(dlLink);
        },
        //截图服务端
        DoSnapshot(){
            if (this.h5handler == undefined)
            {
                return;
            }
            let _this =this;
            var snapshot = "token=" + this.currtoken;
            console.log("snapshot cmd", snapshot);

            var url = this.$store.state.IPPORT + "/api/v1/Snapshot?" + snapshot  + "&session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200)
                {
                    this.$message({
                        message: 'Snapshot successfully',
                        type: 'success'
                    });
                }
            }).catch(error => {
                console.log('Snapshot failed!', error);
                this.$Notice.info({
                    title: "Snapshot failed !"
                })
                this.$message({
                    message: 'Snapshot failed !',
                    type: 'warning'
                });
            });
        },
        //开始录像
        DoManualRecordStart(){
            if (this.h5handler == undefined)
            {
                return;
            }
            let _this =this;

            var record = "token=" + this.currtoken + "&duration=300";
            console.log("record cmd", record);

            var url = this.$store.state.IPPORT + "/api/v1/ManualRecordStart?" + record  + "&session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200)
                {
                    this.$message({
                        message: 'Manual Start Record successfully',
                        type: 'success'
                    });
                }
            }).catch(error => {
                console.log('Record failed!', error);
                this.$message({
                    message: 'Record failed !',
                    type: 'warning'
                });
            });
        },
        //关闭录像
        DoManualRecordStop(event){
            if (this.h5handler == undefined)
            {
                return;
            }
            let _this =this;
            var record = "token=" + this.currtoken + "&duration=300";
            console.log("record cmd", record);

            var url = this.$store.state.IPPORT + "/api/v1/ManualRecordStop?" + record  + "&session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200)
                {
                    this.$message({
                        message: 'Manual Stop Record successfully',
                        type: 'success'
                    });
                }
            }).catch(error => {
                
                this.$message({
                    message: 'Record failed !',
                    type: 'warning'
                });
            });
        },
        //全屏
        FullScreen(){
            var elem = $("#"+this.h5id).get(0);
            //var elem = $("#videoPanel");
            if (
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
            ) {
                if (
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement
                ) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                        
                    }
                    // this.Electronicoff();
                    // this.Electronicopen();
                    console.log("========  updateUIExitFullScreen");
                    this.updateUIExitFullScreen();
                } else {
                     console.log('panelFullScreen3');
                    // this.Electronicoff();
                    // this.Electronicopen();
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    }
                }
            } else {
                console.log('Fullscreen is not supported on your browser.');
            }
        },
        updateUIExitFullScreen(){
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
            {
                $('div[name="flex"]').height(this.contentHeight / this.rows);
            }
        },
        PtzControlShow(event){
            this.Presetdata=[];
            var cors=this.cols*this.rows;
            if(cors>9){
                return false
            }
		   //url
           var url = this.$store.state.IPPORT + "/api/v1/GetPresets?token="+this.tokenshou+"&session="+ this.$store.state.token;
            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    if(result.bStatus==false){
                        return false;
                    }else{
                        var data=result.data;

                        console.log(data)
                        for(var i = 0; i < data.preset.length; i++){
                            var newItem ={
                                strName : data.preset[i].strName,
                                strToken : data.preset[i].strToken,};
                            this.Presetdata.push(newItem);
                            if(i>8){
                                break;
                            }
                        }
                    }
                }
            })
            var $container = $("#"+this.h5id);
            var $controls = $container.children(".liveplay_ptz");
            if (this.ptzshow == false)
            {
                $controls.css("display", "block");
                this.ptzshow = true;
            }else
            {
                $controls.css("display", "none");
                this.ptzshow = false;
            }
        },

        PtzActionwiperon(event){
            this.PtzAction('wiperon');
        },
        PtzActionwiperoff(event){
            this.PtzAction('wiperoff');
        },
        PtzActionlighton(event){
            this.PtzAction('lighton');
        },
        PtzActionlightoff(event){
            this.PtzAction('lightoff');
        },
        PtzActionfocusing(event){
            this.PtzAction('focusin');
        },
        PtzActionfocusings(event){
            this.PtzAction('focusout');
        },
        PtzActionaperture(event){
            this.PtzAction('irisin');
        },
        PtzActionaperturej(event){
            this.PtzAction('irisout');
        },

        PtzActionZoomIn(event)
        {
            console.log("PtzActionZoomIn");
            this.PtzAction('zoomin');
        },
        PtzActionZoomOut(event)
        {
            this.PtzAction('zoomout');
        },
        PtzActionUpleft(event){
            this.PtzAction('upleft');
        },
        PtzActionUpright(event){
            this.PtzAction('upright');
        },
        PtzActionDownleft(event){
            this.PtzAction('downleft');
        },
        PtzActionDownright(event){
            this.PtzAction('downright');
        },
        PtzActionLeft(event)
        {
            this.PtzAction('left');
        },
        PtzActionRight(event)
        {
            this.PtzAction('right');
        },
        PtzActionUp(event)
        {
            this.PtzAction('up');
        },
        PtzActionDown(event)
        {
            this.PtzAction('down');
        },
        PtzActionStop(event)
        {
            console.log("PtzActionStop");
            this.PtzAction('stop');
        },

        PtzAction(action)
        {
            if (this.h5handler == undefined)
            {
                return;
            }
            let _this =this;
            var ptzcmd = "token=" + this.currtoken + "&action=" + action + "&speed="+this.Preset_value+"";
            console.log("ptzcmd", ptzcmd);

            var url = this.$store.state.IPPORT + "/api/v1/Ptz?" + ptzcmd  + "&session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200)
                {

                }
            }).catch(error => {
                console.log('ptz failed!', error);
            });
        },
    }
}
</script>


<style lang="scss" scoped>
    .liveplay{
        width: 100%;
        height: 100%;
        position: relative;
        .h5video{
            object-fit: fill;
            width: 100%;
            height: 100%
        }
        &:hover .liveplay_butt{
            display: block;
        }
        // 音频
        .Audio_slider{
            display: none;
            width: 100px;
            position: absolute;
            top: 40px;
            left: 50px;
            z-index:1012;
            .el-slider__runway{
                height: 4px;
            }
        }
        .liveplay_butt{
            position: absolute;
            display: none;
            top: 0;
            z-index:1012;
            width: 100%;
            height: 40px;
            line-height: 30px;
            background: url('~@/views/liveview/imgs/liveview_buttback.png') no-repeat;
            background-size: 360px 35px;
            background-position-x:right;
            text-align: right;
            padding: 0 15px;
            .bottom_QR{
                font-size:16px;
                font-weight:600;
                
                text-align: center;
                
                .bottom_scan{
                    font-size:16px;
                    font-weight:600;
                    margin-bottom: 20px;
                    padding: 0 20px;
                }
                .bottom_QRcode{
                    display: flex;
                    div{
                        padding: 0 20px;
                    }
                }
            }
            button{
                background: none;
                border: none;
                padding: 0;
                margin: 0;
                color: #FFFFFF;
                margin-left: 15px;
            }
            .fw_butt{
                padding:0;display: inline;
                border: none;
                top: -2px;
                right: -15px;
            }
        }
        .liveplay_ptz {
            position:absolute;
            bottom:0;
            background:rgba(255,255,255,0);
            padding:0px;
            box-sizing:content-box;
            width: 100%;
            height: 100%;
            display:none;
            .flex_content{
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.3);
                padding: 8% 0 8% 0;
                position: relative;
                /* margin-bottom: 6%; */
                .content_zoom{
                    width: 50%;
                    height: 100%;
                    display: flex;
                    /* justify-content: space-between; */
                    align-items: flex-end;
                    .key_zoom{
                        width: 25%;
                        margin: 0 4% 0 8%;
                        /* position: absolute;
                        bottom: 4%; */
                        .key_flex{
                            width: 100px;
                            height: 100px;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            margin-left: 5%;
                            background:url("~@/views/liveview/imgs/liveview_ptzbutton.png") no-repeat center;
                            /* margin-bottom: 20px; */
                            .key_but{
                                width: 33.33%;
                                height: 33.33%;
                                text-align: center;
                                /* background-color: #FF0000; */
                            }
                        }
                    }
                    .zoom{
                        width: 20px;
                        height: 50px;
                        // background-color: rgba(0, 0, 0, 0.6);
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        align-content: space-around;
                        margin-left: 40px;
                        margin-bottom: 50px;
                        .zoom_add{
                            width: 20px;
                            height: 20px;
                            text-align: center;
                            background: none;
                            border: 0;
                            padding: 0;
                            color: #FFFFFF;
                        }
                    }
                    
                }
                .zoom_g{
                    width: 20px;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.6);
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    align-content: space-around;
                    // margin-left: 40px
                    padding: 0 2px;
                    ;
                    .zoom_add{
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        background: none;
                        border: 0;
                        padding: 0;
                        color: #FFFFFF;
                        font-size: 14px;
                        &:nth-child(5){
                            color: #3ABBFE;
                            font-size: 18px;
                        }
                        &:nth-child(7){
                            color: #3ABBFE;
                            font-size: 18px;
                        }
                        &:nth-child(6){
                            font-size: 18px;
                        }
                        &:nth-child(8){
                            font-size: 18px;
                        }
                    }
                }
                
                /*  */
                .Preset{
                    width: 30%;
                    position: absolute;
                    bottom: 10%;
                    right: 4%;
                    .block {
                        width: 100%;
                        height: 140px;
                        margin-right: 4%;
                        overflow: auto;
                        color: #FFFFFF;
                        &::-webkit-scrollbar{
                            display: none;
                        }
                        .preset_bgc{
                            width:100%;
                            height:24px;
                            background:rgba(255,255,255,0.2);
                            .preset_input{
                                width: 52%;
                                background:none;
                                /* opacity:0.2; */
                                border-radius:12px;
                                border: 0;
                                padding: 0 0 0 10px;
                                color:rgba(255,255,255,1)!important;
                            }
                            button{
                                width: 15%;
                                background: none;
                                border: 0;
                                font-size: 15px;
                                color: #ffffff;
                                margin-left: 3px;
                            }
                        }
                    }
                }

            }
        }
        .information {
            position:absolute;
            bottom:40px;
            left: 10px;
            background:rgba(0,0,0,0.5);
            box-sizing:content-box;
            /* z-index:1100; */
            width: 330px;
            height: 150px;
            display:none;
            color: #FFFFFF;
            .information_con{
                width: 100%;
                height: 90%;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                align-content: space-between;
                .information1{
                    width: 50%;
                    .information_title{
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        background-color: rgba(0, 0, 0, 0.7);
                        padding: 0 10px;
                    }
                    .information_content{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 2px;
                        .information_content_left{
                            width: 50%;
                            color: #3ABBFE;
                            text-align: left;
                        }
                        .information_content_right{
                            width: 50%;
                            color: #3ABBFE;
                            text-align: left;
                        }

                    }
                }
            }
        }

        //主副码流
        .videoname{ 
            position: absolute;
            bottom: 0px;
            font-size:14px;
            background-color: rgba(0,0,0,0.3);
            color: #FFFFFF;
            padding: 8px 24px;
            text-align: center;
            .streambutton{
                position: absolute;
                bottom: 5px;
                right: -73px;
                border-radius: 10px;
                background-color: #67cfb5;
                border: none;
                width:68px;
                font-size: 10px;
                height: 25px;
                padding: 0 2px;
            }
        }
        .quality{
            position: absolute;
            bottom: 5px;
            right: 10px;
            padding:0 10px;
            /* display:none; */
        }
        .spanquality{
            display:none;
        }
        .spanpicturequality{
            display: none !important;
        }
        .el-dropdown{
            .el-dropdown-link {
                color: white;
                .el-dropdown-menu :hover li{
                    background-color: rgb(248, 28, 28)!important;
                }
            }
        }
        //rtc
        .rtc_new{
            width: 25px;
            height: 25px;
            margin: 10px;
            background:url("~@/views/liveview/imgs/liveview_rtc.svg") no-repeat center;
            background-size: contain;
            background-position:center center;
            position: absolute;
            top: 0px;
        }
    }



</style>