<template>
    <div class="Avintercomsplay">
        <video class="videoo1" :id="videoid" autoplay webkit-playsinline playsinline></video>
        <!-- <div class="liveplay_butt">
            <button class="iconfont icon-full" @click="FullScreen"></button>
            <button class="iconfont icon-roundclosefill" @click="CloseVideo"></button>
        </div> -->
    </div>
</template>

<script>

export default {
    name:"Avintercomsplay",
    props:['h5id', 'h5videoid',"cols","rows"],
    data(){
        return{
            videoid: this.h5videoid,
        }
    },
    methods:{
        CloseVideo(){

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
    }
}
</script>
<style lang="scss" scoped>
.Avintercomsplay{
    width: 100%;
    height: 100%;
    position: relative;
    .videoo1{
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    &:hover .liveplay_butt{
        display: block;
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
            background-size: 320px 35px;
            background-position-x:right;
            text-align: right;
            padding: 0 15px;
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
}
</style>