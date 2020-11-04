<template>
    <div class="liveview tour">
      <!-- 左侧数据栏 -->
		<div class="liveview_left">
            <el-input
                class="liveview_left_input"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input>
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1" id="headswitchtour">
                    <template slot="title">
                        <div style="display: flex;justify-content: space-between;width: 85%; align-items: center;">
                            <div>{{$t("message.live.device")}}</div>
                            <div class="liveview_colltitle">
                                <div class="liveview_titleicon1"></div>
                                <div @click.stop="headswitch1" class="liveview_titleicon"></div>
                            </div>
                        </div>
                    </template>
                    <el-tree
                        :data="data"
                        node-key="id"
                        :filter-node-method="filterNode"
                        ref="tree"
                        :props="defaultProps">
                        <span slot-scope="{ data }" style="width:100%;">
                            <div style="width:100%;display: flex;justify-content: space-between;">
                                <!-- draggable="true" 
                                    @dragstart="dragStart($event,data.token,data.label,data.streamprofile, data.name,data.disabled_me,node)" -->
                                <span 
                                    class="size_color" 
                                    draggable="true" >
                                    <span style="font-size: 12px;" :class="data.iconclass" :id="'icon'+data.token"></span>
                                    <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                                </span>
                                <span :class="data.iconclass2" class="black" style="">{{$t("message.live.Videorecording")}}</span>
                            </div>
                        </span>
                    </el-tree>
                </el-collapse-item>
                <el-collapse-item name="1" id="headswitchtour1">
                    <template slot="title">
                        <div style="display: flex;justify-content: space-between;width: 85%; align-items: center;">
                            <div>{{$t("message.live.Region")}}</div>
                            <div class="liveview_colltitle">
                                <div class="liveview_titleicon1"></div>
                                <div @click.stop="headswitch" class="liveview_titleicon"></div>
                            </div>
                        </div>
                    </template>
                    <el-tree
                        class="el_tree"
                        node-key="strName" 
                        :default-expanded-keys="['root']" 
                        :data="data1" 
                        :props="defaultProps1">
                        <span slot-scope="{data }" style="width:100%;">
                            <span>
                                <span class="iconfont icon-quyu"></span>
                                <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                            </span>
                            <div v-if="data.cam.length!=0">
                                <el-tree class="el_tree1" :data="data.cam" :props="defaultProps1">
                                    <span slot-scope="{ data }" style="width:100%;">
                                        <div style="width:100%;display: flex;justify-content: space-between;">
                                            <span  
                                                draggable="true" >
                                                <span style="font-size: 12px;" :class="data.iconclass" :id="'icon'+data.strToken"></span>
                                                <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                                            </span>
                                            <span :class="data.iconclass2" class="black" style="">{{$t("message.live.Videorecording")}}</span>
                                        </div>
                                    </span>
                                </el-tree>
                            </div>
                        </span>
                    </el-tree>
                </el-collapse-item>
                <el-collapse-item name="2" >
                    <template slot="title">
                        <div style="display: flex;justify-content: space-between;width: 85%; align-items: center;">
                            <div>视图</div>
                            <div class="liveview_colltitle">
                                <div class="liveview_titleicon2"></div>
                            </div>
                        </div>
                    </template>
                </el-collapse-item>
            </el-collapse>
		</div>
		<!-- 右边视频栏 -->
      	<div class="liveview_right" id="videoPanel">
            <div id="video_hed">
                <div name='flex' style="position: relative;" class="videoColor"  v-for="r in rows" :key="r">
                    <div 
                        class="palace" 
                        name="flex" 
                        v-for="c in cols" 
                        :key="c" 
                        @contextmenu.prevent="stopVideo($event)" 
                        @click="videoClick(r,c,$event)">
                        <True-play v-bind:id="'h'+r+c" :h5id="'tour'+r+c" :rows="rows" :cols="cols" :h5videoid="'hvideo'+r+c"></True-play>
                    </div>
                </div>
            </div>
			<div class="liveview_group blocks">
                <div class="liveview_function">
                    <el-button class="tour_start" size="mini" @click="Playall">{{$t("message.tour.Start")}}</el-button>
                    <el-button class="tour_stop" size="mini" @click="Allpause">{{$t("message.tour.stop")}}</el-button>
                    
                </div>
                <div class="liveview_butt">
                    <el-button type="button" class="iconfont icon-tubiao_huaban1" data-row="1|1" @click="changePanel($event)"></el-button>
                    <!-- <el-button type="button" class="iconfont icon-tubiao_huaban1fuben" data-row="1|3" @click="changePanel($event)"></el-button> -->
                    <el-button type="button" class="iconfont icon-tubiao_huaban1fuben2" data-row="2|2" @click="changePanel($event)"></el-button>

                    <el-button type="button" class="iconfont icon-tubiao_huaban1fuben3" data-row="1|6" @click="changePanel($event)"></el-button>
                    <el-button type="button" class="iconfont icon-tubiao_huaban1fuben4" data-row="1|7" @click="changePanel($event)"></el-button>

                    <el-button type="button" class="iconfont icon-tubiao_huaban1fuben5" data-row="3|3" @click="changePanel($event)"></el-button>

                    
                    <el-button type="button" class="iconfont icon-tubiao_huaban1fuben6" data-row="1|13" @click="changePanel($event)"></el-button>

                    <el-button type="button" class="iconfont icon-tubiao_huaban1fuben7" data-row="4|4" @click="changePanel($event)"></el-button>
                    <!-- <el-button type="button" class="iconfont icon-tubiao_huaban1fuben81" data-row="5|5" @click="changePanel($event)"></el-button> -->
                    <el-button type="button" class="iconfont icon-tubiao_huaban1fuben9" @click="panelFullScreen($event)"> </el-button>
                </div>
                <div class="liveview_butts">
                      <el-popover
                        placement="top-start"
                        width="200"
                        trigger="click">
                        <div class="tour_region">
                            <el-select v-model="region" size="mini"  @change="Speed()">
                                <el-option label="20" value="20"></el-option>
                                <el-option label="30" value="30"></el-option>
                                <el-option label="60" value="60"></el-option>
                            </el-select>
                            <el-select v-model="streamprofile" size="mini" >
                                <el-option :label="label.label2" value="main"></el-option>
                                <el-option :label="label.label3" value="sub"></el-option>
                            </el-select>
                            <el-select v-model="proto" size="mini" @change="changeWS">
                                <el-option label="WS" value="WS"></el-option>
                                <el-option label="RTC" value="RTC"></el-option>
                            </el-select>
                        </div>
                        <el-button slot="reference" class="iconfont icon-shezhi"></el-button>
                    </el-popover>
                </div>
			</div>
		</div>
    </div>
</template>

<script>
import Vue from 'vue'
import Trueplay from './true/Trueplay'
import {listdatag,listdatagload,listdatag1} from './public/device'
export default {
    name: 'Liveview',
    components: {
        'True-play': Trueplay
    },
	data(){
		return{
            label:{
                label2:this.$t("message.live.mainstream"),//选3
                label3:this.$t("message.live.substream")//选3
            },
            activeNames: ['1','2'],//左边
			rows: 3,
            cols: 3,
			selectCol: 1,
			selectRow: 1,
			contentHeight: '',
            contentWidth: '',
            filterText:"",//搜索框
            data:listdatag,
            data1:listdatag1,
            defaultProps: {
                children: 'children',
                label: 'label',
                token:"token",
                iconclass:"iconclass"
            },
            defaultProps1: {
                children: 'node',
                label: 'strName',
                cam:"cam"
            },

            drawer: false,//右侧栏
            direction: 'rtl',//右侧栏
            title:this.$t("message.live.setting"),
            region:20,//几秒钟更换
            streamprofile:"main",//码流
            proto: this.$store.state.tourrtc,//协议
            h5playev1:[],//内容
            timersetInterval:"",//定时器
            token_index:""//删除个数
		}
    },
    beforeDestroy() {
        clearInterval(this.timersetInterval);
    },
	mounted(){
        // console.log(listdatag,listdatagload,listdatag1,this.data)
        this.updateUI();
        $('#headswitchtour1').hide()
	},
	methods:{
        //ws rtc
        changeWS(event) {
            //this.proto = "WS";
            console.log(this.proto);
            var proto=this.proto;
            this.$store.state.tourrtc=proto
            localStorage.setItem("tourrtc",proto);
        },
        //全部开始
        Playall(){
            this.Allpause();
            var timing=this.region*1000;
            var root = this.$store.state.IPPORT;
			var wsroot = this.$store.state.WSROOT;
            //url
            var token_q=[];
            var vid = '';
            var url = root + "/api/v1/GetSrc?getonline=false&session="+ this.$store.state.token;
            
            // console.log("44",this.rowsxcols,this.rows*this.cols);
            // return false
            this.$http.get(url).then(result=>{
                //console.log("a",result);
                if(result.status == 200){
                    var data =  result.data;
                    console.log(data);
                    
                    this.token_index=data.src.length;
                    //return false;
                    for(var i=0; i< data.src.length; i++){
                        token_q.push(data.src[i].strToken);
                    }
                    this.$nextTick(()=>{
                        
                        for(var i=0; i< data.src.length; i++){
                            if(i<this.rows*this.cols){
                                var item = token_q[i];
                                this.Tranvalue(item,i)
                                token_q.push(token_q[i]);
                            }
                            
                        }
                        if(this.token_index>this.rows*this.cols){
                            token_q.splice(0,this.rows*this.cols);
                            // console.log("==================11",token_q,this.rows*this.cols);
                        }else{
                            token_q.splice(0,this.token_index);
                            // console.log("==================12",token_q,this.rows*this.cols);
                        }
                        // console.log("==================",token_q,this.token_index);
                    })
                }
            })
            
            this.timersetInterval=setInterval(function(){
                // console.log("==================",token_q);
                for(var l=0; l< this.token_index; l++){
                    if(l<this.rows*this.cols){
                        var item = token_q[l];
                        this.Tranvalue(item,l)
                        token_q.push(item);
                        // console.log("==================12",token_q,token_q.length);
                    }
                }
                this.$nextTick(()=>{
                    if(this.token_index>this.rows*this.cols){
                        token_q.splice(0,this.rows*this.cols);
                        // console.log("==================1",token_q);
                    }else{
                        token_q.splice(0,this.token_index);
                        // console.log("==================12",token_q,this.token_index);
                    }
                })
                // console.log("==================",token_q,this.token_index);

            }.bind(this),timing)
            this.$once('hook:beforeDestroy', () => {            
                clearInterval(this.timersetInterval);                                    
            })
            
        }, 
        Tranvalue(item,i){
            var vid='';
            if(this.rows*this.cols==1||this.rows*this.cols==6||this.rows*this.cols==7||this.rows*this.cols==13){
                if (i==0) {
                    vid = 'tour' +11;
                }else if (i==1) {
                    vid = 'tour' +12;
                }else if (i==2) {
                    vid = 'tour' +13;
                }else if (i==3) {
                    vid = 'tour' +14;
                }else if (i==4) {
                    vid = 'tour' +15;
                }else if (i==5) {
                    vid = 'tour' +16;
                }else if (i==6) {
                    vid = 'tour' +17;
                }else if (i==7) {
                    vid = 'tour' +18;
                }else if (i==8) {
                    vid = 'tour' +19;
                }else if (i==9) {
                    vid = 'tour' +110;
                }else if (i==10) {
                    vid = 'tour' +111;
                }else if (i==11) {
                    vid = 'tour' +112;
                }else if (i==12) {
                    vid = 'tour' +113;
                }
                console.log(item,vid)
                this.$root.bus.$emit('livetour', item ,this.streamprofile, vid);
            }
            if(this.rows*this.cols==4||this.rows*this.cols==9||this.rows*this.cols==16){
                if (i==0) {
                    vid = 'tour' +11;
                }else if (i==1) {
                    vid = 'tour' +12;
                }else if (i==2) {
                    vid = 'tour' +21;
                }else if (i==3) {
                    vid = 'tour' +22;
                }else if (i==4) {
                    vid = 'tour' +13;
                }else if (i==5) {
                    vid = 'tour' +23;
                }else if (i==6) {
                    vid = 'tour' +31;
                }else if (i==7) {
                    vid = 'tour' +32;
                }else if (i==8) {
                    vid = 'tour' +33;
                }else if (i==9) {
                    vid = 'tour' +14;
                }else if (i==10) {
                    vid = 'tour' +24;
                }else if (i==11) {
                    vid = 'tour' +34;
                }else if (i==12) {
                    vid = 'tour' +41;
                }else if (i==13) {
                    vid = 'tour' +42;
                }else if (i==14) {
                    vid = 'tour' +43;
                }else if (i==15) {
                    vid = 'tour' +44;
                }
                console.log(item,vid)
                this.$root.bus.$emit('livetour', item ,this.streamprofile, vid);
            }
        },
        //全部暂停
        Allpause(){
            this.$root.bus.$emit('liveplaystop');
            clearInterval(this.timersetInterval);
            //console.log("b");
        },
        //快换时间
        Speed(){
            console.log( this.region);
            //this.v1.speed(this.region);
        },

		//点击宫格
		videoClick(r, c, $event) {
            this.selectCol = c;
            this.selectRow = r;
            console.log(r, c);
            $(".h5container").removeClass('h5videoh');
            $("#h"+r+c).addClass('h5videoh');
        },
        stopVideo(event){
            return;
        },
		// ui宽度
		updateUI() {
            if($(document.body).width() < 768)
            {
                this.contentHeight = $(document.body).height()*0.4;
            }else
            {
                this.contentHeight = $(document.body).height()*0.82;
            }
            $('div[name="flex"]').height(this.contentHeight / this.rows);
            //this.contentHeight = $(document.body).height()*0.8;
            let _this = this;
            // if (H5siOS() === true)
            // {
            //     $('.h5video').prop("controls", true);
            // }
        },
		//点击宫格
        changePanel(event) {
            let data = $(event.target).data('row');
            let _this = this;
            window.setTimeout(function() {
                if(data=='1|6'||data=='1|7'||data=='1|13'){
                    // console.log("121");
                    
                }else{
                    // console.log("45845454545");
                    $("#videoPanel .videoColor .palace").removeClass("Seven_Palace");
                    $("#videoPanel .videoColor .palace").removeClass("Six_Palace");
                    $("#videoPanel .videoColor .palace").removeClass("videoflexitem");
                }
                var list_gong=$(".palace");
                if(data=='1|6'){
                    // console.log("23")
                    list_gong.removeClass("videoflexitem");
                    list_gong.removeClass("Seven_Palace");

                    list_gong.addClass("Six_Palace");
                }
                if(data=='1|7'){
                    // console.log("234")
                    list_gong.removeClass("videoflexitem");
                    list_gong.removeClass("Six_Palace");

                    list_gong.addClass("Seven_Palace");
                }
                if(data=='1|13'){
                    // console.log("2345")
                    list_gong.removeClass("Six_Palace");
                    list_gong.removeClass("Seven_Palace");

                    list_gong.addClass("videoflexitem");
                }

		    }, 50);
            let cols = data.split('|')[1];
            let rows = data.split('|')[0];
            //this.map.clear();
            Object.assign(this.$data, {
                rows: parseInt(rows),
                cols: parseInt(cols)
            });
            Vue.nextTick(function () {
                //$('div[name="flex"]').height(($(".content").height() - 50) / rows);
                $('div[name="flex"]').height(_this.contentHeight / rows);
            })
        },
        //全屏
        panelFullScreen(event) {
            var elem = document.getElementById('video_hed');
            //var elem = $("#videoPanel");
            console.log('panelFullScreen', event);
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
                    console.log("========  updateUIExitFullScreen");
                    this.updateUIExitFullScreen();
                } else {
                     console.log('panelFullScreen3');

                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    }
                    this.updateUIEnterFullScreen();
                    if (document.addEventListener)
                    {
                        document.addEventListener('webkitfullscreenchange', this.updateUIExitFullScreen, false);
                        document.addEventListener('mozfullscreenchange', this.updateUIExitFullScreen, false);
                        document.addEventListener('fullscreenchange', this.updateUIExitFullScreen, false);
                        document.addEventListener('MSFullscreenChange', this.updateUIExitFullScreen, false);
                    }
                }
            } else {
                console.log('Fullscreen is not supported on your browser.');
            }
        },
        updateUIEnterFullScreen(){

            $('div[name="flex"]').height(screen.height / this.rows);
        },
        updateUIExitFullScreen(){
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
            {
                $('div[name="flex"]').height(this.contentHeight / this.rows);
            }
        },
        //最菜的写法
        headswitch(){
            $('#headswitchtour').show()
            $('#headswitchtour1').hide()
        },
        headswitch1(){
            $('#headswitchtour1').show()
            $('#headswitchtour').hide()
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
        // 判断传入的节点是不是选中节点的子节点
        checkBelongToChooseNode(value, data, node) {
            const level = node.level;
            // 如果传入的节点本身就是一级节点就不用校验了
            if (level === 1) {
            return false;
            }
            // 先取当前节点的父节点
            let parentData = node.parent;
            // 遍历当前节点的父节点
            let index = 0;
            while (index < level - 1) {
            // 如果匹配到直接返回
            if (parentData.data.label.indexOf(value) !== -1) {
                return true;
            }
            // 否则的话再往上一层做匹配
            parentData = parentData.parent;
            index ++;
            }
            // 没匹配到返回false
            return false;
        }
    
    },
    //模糊查询
    watch: {
      filterText(val) {
        console.log("filter",val);
        this.$refs.tree.filter(val);
      }
    }
}
</script>

<style lang="scss">
.liveview.tour{
    padding-top: 10px;
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-between;
    .liveview_left{
        width: 16%;
        min-width: 290px;
        height: 90vh;
        margin: 0 5px;
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        .liveview_left_input{
            margin: 10px 0;
        }
        //录像管理
        .black{
            display: none;font-size: 12px;color: #606266; padding-left: 4px;line-height: 26px;color: #f00;
        }
        .none{
            display: block;
        }
        
        .el_tree .el-tree-node__content{
            min-height: 24px;
            height: auto;
        }
        .el-collapse{
            .el-collapse-item{
                height: 40vh;
                .el-collapse-item__wrap{
                    .el-collapse-item__content{
                        height: 35vh;
                        padding: 0 10px;
                        overflow: auto;
                        // ::-webkit-scrollbar{
                        //     display: none;
                        // }
                    }
                }
            }
        }
        .liveview_colltitle{
            display: flex;
            .liveview_titleicon{
                width: 35px;
                height: 35px;
                background: url("~@/views/liveview/imgs/liveview_titleicon.png") no-repeat;
                background: {
                    size: 100%;
                    
                };
            }
            .liveview_titleicon1{
                width: 35px;
                height: 35px;
                background: url("~@/views/liveview/imgs/liveview_titleicon1.png") no-repeat;
                background: {
                    size: 100%;
                    
                };
            }
            .liveview_titleicon2{
                width: 35px;
                height: 35px;
                background: url("~@/views/liveview/imgs/liveview_titleicon2.png") no-repeat;
                background: {
                    size: 100%;
                    
                };
            }
        }
    }
    .liveview_right{
        width: 84%;
        /* 播放片段 */
        .h5videoh{
            /* border: 2px solid #f44336 !important;
            box-sizing: border-box; */
            box-shadow: 0 0 0 2px #f44336;
            // box-sizing: border-box;
            z-index: 10;
        }
        .videoColor {
            .palace{
                background-size: 10%;
                flex: 1 1 10%;
            }
            /* 六 */
            .Six_Palace{
                flex: 1 1 33.33%!important;
                height: 33.33% !important;
                &:nth-child(1){
                    flex: 1 1 66.66% !important;
                    height: 66.66% !important;
                }
                &:nth-child(3){
                    width: 33.33% !important;
                    position: absolute;
                    top: 33.33%;
                    right: 0;
                }
            }
            /* 十三宫格 */
            .videoflexitem{
                flex: 1 1 25% !important;
                width: 25% !important;
                height: 25% !important;
                &:nth-child(6){
                    position: absolute;
                    top: 50%;
                    left: 0;
                }
                &:nth-child(7){
                    flex: 1 1 50% !important;
                    height: 50% !important;
                }
                &:nth-child(8){
                    flex: 1 1 25% !important;
                    position: absolute;
                    top: 50%;
                    right: 0;
                }
            }
            /* 七宫格 */
            .Seven_Palace{
                flex: 1 1 33.33%;
                height: 33.33% !important;
                &:nth-child(1){
                    height: 100% !important;
                }
                &:nth-child(3){
                    width: 33.33% !important;
                    position: absolute;
                    top: 33.33%;
                    right: 0;
                }
                &:nth-child(2){
                    width: 33.33% !important;
                    position: absolute;
                    top: 33.33%;
                    right: 33.33%;
                }
                &:nth-child(6){
                    width: 33.33% !important;
                    position: absolute;
                    bottom: 0;
                    right: 33.33%;
                }
                &:nth-child(7){
                    width: 33.33% !important;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }
        }
        div[name='flex'] {
            display: flex;
            flex-wrap: wrap;
            border-bottom: 0px !important;
            :hover {
                /*background-color: #3c8dbc;*/
                cursor: pointer;
            }
            +[name='flex'] {
                border-left: 0px !important;
            }
        }
        .liveview_group{
            width: 100%;
            padding: 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .liveview_function{
                // width: 20%;
                div{
                    margin: 0 10px;
                }
                .tour_start{
                    padding: 8px 15px;
                    background-color: #3ABCFE;
                    border: none;
                    color: #FFFFFF;
                    font-size: 14px;
                }
                .tour_stop{
                    padding: 8px 15px;
                    background: none;
                    border: 1px solid #3ABCFE;
                    font-size: 14px;
                    // color: #FFFFFF;
                }
                .el-input__inner{
                    // background: none;
                    border: 1px solid #9A9A9A;
                }
            }
            .liveview_butt{
                width: 50%;
                display: flex;
                justify-content: space-around;
            }
            .liveview_butts{
                // width: 20%;
                font-size: 16px;
                padding-right: 10px;
            }
        }
    }
}
</style>