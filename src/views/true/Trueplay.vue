<template>
    <div class="liveplay h5container">
        <video class="h5video" :id="videoid" autoplay webkit-playsinline playsinline></video>
    </div>
</template>
<script>
import '../../assets/js/adapter'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../../assets/js/h5splayer.js'
export default {
    name:"liveplay",
    props:['h5id', 'h5videoid',"cols","rows"],
    data(){
        return{
            videoid: this.h5videoid,
            h5handler:undefined,//v1
        }
    },
    beforeDestroy() {
        this.CloseVideo();
    },
    mounted(){
        let _this = this;
        _this.$root.bus.$on('liveplay', function(token,streamprofile,name,label, id)
        {
            console.log("++++++++++++++++++++",name,label,_this.h5videoid,_this.h5id,id)
            if (_this.h5id != id)
            {
                return;
            }
            _this.PlayVideo(token,streamprofile,label,name);
        });

    },
    methods:{
        
        //播放
        PlayVideo(token,streamprofile,label,name){
            this.CloseVideo();
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
            this.h5handler = new H5sPlayerRTC(conf);
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