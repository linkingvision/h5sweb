<template>
    <div class="liveplay h5container">
        <video class="h5video" :id="videoid" autoplay webkit-playsinline playsinline></video>
    </div>
</template>
<script>
import '../../assets/js/adapter'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../../assets/js/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../../assets/js/h5splayerhelper.js'
export default {
    name:"Trueplay",
    props:['h5id', 'h5videoid',"cols","rows"],
    data(){
        return{
            videoid: this.h5videoid,
            h5handler:undefined,//v1
            proto: this.$store.state.tourrtc,
        }
    },
    beforeDestroy() {
        this.CloseVideo();
    },
    mounted(){
        let _this = this;
        this.$root.bus.$on('livetour', function(token,streamprofile, id)
        {
            console.log(token)
            if (_this.h5id != id)
            {
                return;
            }
            _this.PlayVideo(token,streamprofile);
            _this.tokenshou=token;
        });
        this.$root.bus.$on('liveplaystop', function()
        {
            _this.PlayVideostop();
        });

    },
    methods:{
        PlayVideostop(){
            console.log("aaa");
            //console.log("-----------",this.h5handler);
            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
                $("#" + this.videoid).get(0).load();
                $("#" + this.videoid).get(0).poster = '';

            }
        },
        //播放
        PlayVideo(token,streamprofile,label,name){
            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
            }
            let conf = {
                videoid: this.h5videoid,
                protocol: window.location.protocol, //http: or https:
                host: this.$store.state.WSROOT, //localhost:8080
	            streamprofile: streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
                rootpath: '/', // '/'
                token: token,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                session: this.$store.state.token //session got from login
            };
            if (this.$store.state.tourrtc == 'RTC' || (H5siOS() === true)){
                this.h5handler = new H5sPlayerRTC(conf);
            }else{
                this.h5handler = new H5sPlayerWS(conf);
            }
            this.h5handler.connect();
        },
        //关闭
        CloseVideo(){
            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
            }
            
        }
    }
}
</script>


<style lang="scss" scoped>
    .liveplay{
        width: 100%;
        height: 100%;
        .h5video{
            object-fit: fill;
            width: 100%;
            height: 100%
        }
    }



</style>