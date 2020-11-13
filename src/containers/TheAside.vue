<template>
<div class="Aside">
	<CSidebar 
		aside 
		:show="$store.state.asideShows"
		@update:show="(val) => $store.commit('set', ['asideShows', val])"
		colorScheme="light"
		overlaid
		size="lg">
		<CSidebarClose @click.native="$store.commit('toggle', 'asideShows')"/>
		<CSidebarBrand class="d-md-down-none">
			<div class="Aside_title">设置</div>
		</CSidebarBrand>
		<div class="Aside_content">
			<div class="Aside_content_top">
				<div>{{$t("message.live.protocol")}}: {{proto}}</div>
				<div class="up_you_but">
					<div>
						<el-button @click="changeWS" class="button_addpv" type="success"  size="mini">WEBSOCKET</el-button>
					</div>
					<div>
						<el-button @click="changeRTC" class="button_addpv1" type="success"  size="mini">WEBRTC</el-button>
					</div>
				</div>
			</div>
			<div class="Aside_content_buttom">
				<div>{{$t("message.live.waterprint")}}：</div>
				<div class="up_you_but">
					<div>
						<el-input
							class="liveview_left_input"
							placeholder="请您输入水印内容"
							v-model="watermarkstring">
						</el-input>
					</div>
					<div>
						<el-button @click="waterprintoff($event)" class="button_addpv" type="success"  size="mini">打开水印</el-button>
					</div>
					<div>
						<el-button @click="waterprintno($event)" class="button_addpv1" type="success"  size="mini">关闭水印</el-button>
					</div>
				</div>
			</div>
		</div>
	</CSidebar>
</div>
</template>

<script>
export default {
	name: 'TheAside',
	data () {
		return {
			proto: this.$store.state.liveviewrtc,
			watermarkstring:this.$store.state.watermarkstring,//水印、
		}
	},
	mounted(){
	},
	methods:{
		//水印
        waterprintoff(){
            this.watermarktoggle = "block";
            var watermarktoggle=this.watermarktoggle;
			localStorage.setItem("watermarktoggle",watermarktoggle);

            this.addWaterMarker();
            this.$store.state.watermarktoggle="block";
            document.getElementById("watermarktoggle").style.display=this.watermarktoggle;
        }, 
        waterprintno(){
            // console.log(this.watermarktoggle);

            this.watermarktoggle = "none";
            var watermarktoggle=this.watermarktoggle;
            localStorage.setItem("watermarktoggle",watermarktoggle);
            document.getElementById("watermarktoggle").style.display=this.watermarktoggle;
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
	.c-sidebar{
		padding: 0 18px;
		.c-sidebar-brand{
			justify-content: left;
			.Aside_title{
				font-size: 16px;
				font-weight: bold;
				opacity: 0.4;
				text-align: left;
			}
			.Aside_content{
				display: flex;
				flex-wrap: wrap;
			}
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
		line-height: 50px;
		button{
			font-size: 16px;
			width: 70%;
			padding: 10px 10px;
			background-color: #3ABCFE;
			border: none;
		}
	}
	& div:nth-child(2){
		button{
			
			font-size: 16px;
			width: 70%;
			padding: 10px 10px;
			background:none;
			border: 1px solid #3ABCFE;
		}
	}
}
</style>
