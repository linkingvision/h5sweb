<template>
<div class="Aside">
        <div class="Aside_title">客户端配置</div>
		<div class="Aside_content">
			<div class="Aside_content_top">
				<div class="Aside_content_title">{{$t("message.live.protocol")}}: {{proto}}</div>
				<div class="up_you_but">
						<el-button @click="changeWS" :class="(proto=='WS')?'button_addpv':'button_addpv1'" type="success"  size="mini">WEBSOCKET</el-button>
						<el-button @click="changeRTC" :class="(proto=='RTC')?'button_addpv':'button_addpv1'"  type="success"  size="mini">WEBRTC</el-button>
				</div>
			</div>
			<div class="Aside_content_buttom">
				<div class="Aside_content_title">{{$t("message.live.waterprint")}}：</div>
				<div class="up_you_but">
					<div>
						<el-input
							class="liveview_left_input"
							placeholder="请您输入水印内容"
							v-model="watermarkstring">
						</el-input>
					</div>
					<div>
						<el-button @click="waterprintoff($event)" :class="(watermarktoggle=='block')?'button_addpv':'button_addpv1'" type="success"  size="mini">打开水印</el-button>
						<el-button @click="waterprintno($event)" :class="(watermarktoggle=='none')?'button_addpv':'button_addpv1'" type="success"  size="mini">关闭水印</el-button>
					</div>
				</div>
			</div>
            <div class="Aside_content_buttom">
				<div class="Aside_content_title">{{$t("message.setting.RTCENGINE")}}</div>
				<div class="up_you_but">
                    <el-select v-model="value" style="width:100px" size='mini' placeholder="请选择" @change='Rtcengine'>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
				</div>
			</div>
            <div class="Aside_content_buttom">
				<div class="Aside_content_title">显示禁用</div>
				<div class="up_you_but">
					<div>
						<el-button @click="deviceprintoff($event)" :class="(devicemarktoggle=='block')?'button_addpv':'button_addpv1'" type="success"  size="mini">显示</el-button>
						<el-button @click="deviceprintno($event)" :class="(devicemarktoggle=='none')?'button_addpv':'button_addpv1'" type="success"  size="mini">隐藏</el-button>
					</div>
				</div>
			</div>
		</div>
</div>
</template>

<script>
export default {
	name: 'TheAside',
	data () {
		return {
			waterprintcolor:true,
            deviceprintcolor:true,
			proto: this.$store.state.liveviewrtc,
			watermarkstring:this.$store.state.watermarkstring,//水印、
			watermarktoggle:this.$store.state.watermarktoggle,
			devicemarktoggle:"",
            options: [{
                value: 'v1',
                label: 'v1'
                }, {
                value: 'v2',
                label: 'v2'
                }],
            value: "v1",
		}
	},
	mounted(){
		// localStorage.removeItem('watermarktoggle')
        if(localStorage.getItem('H5sRtcengine')){
           this.value=localStorage.getItem('H5sRtcengine') 
        }
        if(typeof(sessionStorage.devicemarktoggle) == 'undefined'){
           this.devicemarktoggle='block'
        }else{
            this.devicemarktoggle = sessionStorage.devicemarktoggle; 
            
        }
	},
	methods:{
        Rtcengine(){
            if((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))){
                //  console.log((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)))
                localStorage.setItem("H5sRtcengine",this.value);
            }else{
                this.value="v1",
                this.$message({
                    message: 'v2只支持Safari浏览器',
                    type: 'warning'
                });
            }
            
        },
		//水印
        waterprintoff(){
			this.waterprintcolor=true
            this.watermarktoggle = "block";
            var watermarktoggle=this.watermarktoggle;
			localStorage.setItem("watermarktoggle",watermarktoggle);

            this.addWaterMarker();
            this.$store.state.watermarktoggle="block";
            // document.getElementById("watermarktoggle").style.display=this.watermarktoggle;
        }, 
        waterprintno(){
            // console.log(this.watermarktoggle);
			this.waterprintcolor=false
            this.watermarktoggle = "none";
            var watermarktoggle=this.watermarktoggle;
            localStorage.setItem("watermarktoggle",watermarktoggle);
            this.$store.state.watermarktoggle="none";
            // document.getElementById("watermarktoggle").style.display=this.watermarktoggle;
        },
        //显示禁用
        deviceprintoff(){
			this.deviceprintcolor=true
            sessionStorage.devicemarktoggle = "block";
            this.devicemarktoggle = sessionStorage.devicemarktoggle;
            this.$store.state.devicemarktoggle=sessionStorage.devicemarktoggle;
        }, 
        deviceprintno(){
			this.deviceprintcolor=false
            sessionStorage.devicemarktoggle = "none";
            this.devicemarktoggle = sessionStorage.devicemarktoggle;
            this.$store.state.devicemarktoggle=sessionStorage.devicemarktoggle
        },

        addWaterMarker(){
			if(!document.getElementById("watermarktoggle")){
				return
			}
            var date=new Date();
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var dates=Y+M+D;
            var watermarkstring= this.watermarkstring;
            // console.log(watermarkstring);

            var can = document.createElement('canvas');
            var body = document.body;
            body.appendChild(can);
            can.width=300; //画布的宽
            can.height=200;//画布的高度
            can.style.display='none';
            var cans = can.getContext('2d');
            cans.rotate(-20*Math.PI/180); //画布里面文字的旋转角度
            cans.font = "16px Microsoft JhengHei"; //画布里面文字的字体
            cans.fillStyle = "rgba(17, 17, 17, 1)";//画布里面文字的颜色
            cans.textAlign = 'left'; //画布里面文字的水平位置
            cans.textBaseline = 'Middle'; //画布里面文字的垂直位置
            cans.fillText(watermarkstring,can.width/3,can.height/2); //画布里面文字的间距比例
            document.getElementById("watermarktoggle").style.backgroundImage="url("+can.toDataURL("image/png")+")";
        },
		//ws rtc
		changeWS(event) {
            this.proto = "WS";
			var proto=this.proto;
			this.$store.state.liveviewrtc=proto
			localStorage.setItem("liveviewrtc",proto);
        },
        changeRTC(event) {
            this.proto = "RTC";
            var proto=this.proto;
            this.$store.state.liveviewrtc=proto
            localStorage.setItem("liveviewrtc",proto);
        },
	}
}
</script>

<style lang="scss" scoped>
.Aside{
    padding: 10px 30px;
    .Aside_title{
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .Aside_content{
        .Aside_content_title{
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .up_you_but{
            margin-bottom: 30px;
            line-height: 50px;
            .liveview_left_input{
                width: 200px;
                .el-input__inner{
                    background: rgba(73, 74, 76, 0.2);
                    border-radius: 20px;
                    border: none;
                }
            }
            .button_addpv{
                font-size: 14px;
                padding: 10px 10px;
                background-color: #3ABCFE;
                border: none;
            }
            .button_addpv1{
                font-size: 14px;
                padding: 10px 10px;
                background:none;
                border: 1px solid #3ABCFE;
            }
        }
    }

}

</style>
