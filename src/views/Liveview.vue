<template>
    <div class=liveview>
        <div id="watermarktoggle"></div>
        <!-- 左侧数据栏 -->
		<div class="liveview_left">
            <el-input
                class="liveview_left_input"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input>
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1" id="headswitch">
                    <template slot="title">
                        <div style="display: flex;justify-content: space-between;width: 85%; align-items: center;">
                            <div>{{$t("message.live.device")}}</div>
                            <div class="liveview_colltitle">
                                <div class="liveview_titleicon1" @click.stop="Refresh('device')"></div>
                                <div @click.stop="headswitch1" class="liveview_titleicon"></div>
                            </div>
                        </div>
                    </template>
                    <el-tree
                        :data="data"
                        node-key="id"
                        :filter-node-method="filterNode"
                        ref="tree"
                        @node-click="handleNodeClick"
                        :props="defaultProps">
                        <span slot-scope="{ data }" style="width:100%;">
                            <div style="width:100%;display: flex;justify-content: space-between;">
                                <!-- draggable="true" 
                                    @dragstart="dragStart($event,data.token,data.label,data.streamprofile, data.name,data.disabled_me,node)" -->
                                <span 
                                    class="size_color" 
                                    draggable="true" 
                                    @dragstart="dragStart($event,data.token,data.label,data.streamprofile, data.name,data.disabled_me)">
                                    <span style="font-size: 12px;" :class="data.iconclass" :id="'icon'+data.token"></span>
                                    <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                                </span>
                                <span :class="data.iconclass2" class="black" style="">{{$t("message.live.Videorecording")}}</span>
                            </div>
                        </span>
                    </el-tree>
                </el-collapse-item>
                <el-collapse-item name="1" id="headswitch1">
                    <template slot="title">
                        <div style="display: flex;justify-content: space-between;width: 85%; align-items: center;">
                            <div>{{$t("message.live.Region")}}</div>
                            <div class="liveview_colltitle">
                                <div class="liveview_titleicon1" @click.stop="Refresh('Region')"></div>
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
                                <el-tree class="el_tree1" :data="data.cam" :props="defaultProps1" @node-click="handleNodeClick">
                                    <span slot-scope="{ data }" style="width:100%;">
                                        <div style="width:100%;display: flex;justify-content: space-between;">
                                            <span  
                                                draggable="true" 
                                                @dragstart="dragStart($event,data.strToken,data.strName,data.streamprofile, data.name,data.disabled_me)">
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
                            <div>{{$t("message.live.View")}}</div>
                            <div class="liveview_colltitle">
                                <div class="liveview_titleicon1" @click.stop="Refresh('view')"></div>
                                 <el-popover
                                    placement="right"
                                    :title="NewView"
                                    width="260"
                                    trigger="click">
                                    <div class="liveview_popover">
                                        <div class="liveview_popover_top">
                                            <div>{{ViewName}}</div>
                                            <el-input 
                                                placeholder="请输入名称" 
                                                class="liveview_left_input"
                                                v-model="viewname"></el-input>
                                        </div>
                                        <div class="liveview_popover_but">
                                            <el-button @click.stop="viewadd">{{$t("message.camera.save")}}</el-button>
                                        </div>
                                    </div>
                                    <div @click.stop="view" slot="reference" class="liveview_titleicon2"></div>
                                </el-popover>
                            </div>
                        </div>
                    </template>
                    <el-tree
                        class="el_tree"
                        node-key="strName" 
                        :default-expanded-keys="['root']" 
                        :data="viewdata" 
                        @node-click="viewClick"
                        :props="defaultProps2">
                        <span slot-scope="{data }" style="width:100%;">
                            <div style="width:100%;display: flex;justify-content: space-between;">
                                <span>
                                    <span :class="data.icon"></span>
                                    <span style="padding-left: 6px;">{{data.strName}}</span>
                                </span>
                                <div style="width:20%;display: flex;justify-content: space-between;">
                                    <div @click.stop="Delview(data.strToken)" class="iconfont icon-ashbin"></div>
                                    <div @click.stop="Editview(data)" class="iconfont icon-zhongmingming"></div>
                                </div>
                            </div>
                        </span>
                    </el-tree>
                </el-collapse-item>
            </el-collapse>
		</div>
		<!-- 右边视频栏 -->
      	<div class="liveview_right" id="videoPanel">
            <div id="video_hed">
                <div name='flex' style="position: relative;" class="videoColor" v-for="r in rows" :key="r">
                    <div
                        @drop="dropTarget($event,r,c)" 
                        @dragover.prevent="dragover($event)" 
                        class="palace" 
                        name="flex" 
                        v-for="c in cols" 
                        @contextmenu.prevent="stopVideo($event)" 
                        @click="videoClick(r,c,$event)" :key="c">
                        <v-liveplay 
                            v-bind:id="'h'+r+c" 
                            :h5id="'h'+r+c" 
                            :rows="rows" 
                            :cols="cols" 
                            :h5videoid="'hvideo'+r+c"
                            :canvasid="'canvas'+r+c">
                        </v-liveplay>
                    </div>
                </div>
            </div>
			<div class="liveview_group blocks">
				<el-button type="button" class="iconfont icon-tubiao_huaban1" data-row="1|1" @click="changePanel($event)"></el-button>
				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben" data-row="1|3" @click="changePanel($event)"></el-button>
				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben2" data-row="2|2" @click="changePanel($event)"></el-button>

				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben3" data-row="1|6" @click="changePanel($event)"></el-button>
				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben4" data-row="1|7" @click="changePanel($event)"></el-button>

				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben5" data-row="3|3" @click="changePanel($event)"></el-button>

				
				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben6" data-row="1|13" @click="changePanel($event)"></el-button>

				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben7" data-row="4|4" @click="changePanel($event)"></el-button>
				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben81" data-row="5|5" @click="changePanel($event)"></el-button>
				<el-button type="button" class="iconfont icon-tubiao_huaban1fuben9" @click="panelFullScreen($event)"> </el-button>
			</div>
		</div>
    </div>
</template>

<script>
import Vue from 'vue'
import liveplay from './liveview/Liveplay'
import uuid from '../assets/js/uuid'
export default {
    name: 'Liveview',
    components: {
        'v-liveplay': liveplay
    },
	data(){
		return{
            NewView:this.$t("message.live.NewView"),
            ViewName:this.$t("message.live.ViewName"),
            
            viewname:null,//视图名称
            viewdata:[],//视图数据
            proto: this.$store.state.liveviewrtc,
            activeNames: ['1','2'],//左边
			rows: 3,
			cols: 3,
			selectCol: 1,
			selectRow: 1,
			contentHeight: '',
            contentWidth: '',
            filterText:"",//搜索框
            data:[],
            data1:[],
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
            defaultProps2:{
                label: 'strName',
            }
		}
    },
	mounted(){
        this.updateUI();
        $('#headswitch1').hide()
        this.addWaterMarker();
        // document.getElementById("watermarktoggle").style.display=this.$store.state.watermarktoggle;
        console.log(localStorage.getItem('H5sRtcengine'))
		if(localStorage.getItem('watermarktoggle')==null){
			if(this.$store.state.Certificatetime=="true"){
				document.getElementById("watermarktoggle").style.display='none';
			}else if(this.$store.state.Certificatetime=="false"){
				document.getElementById("watermarktoggle").style.display='block';
			}
		}else{
			document.getElementById("watermarktoggle").style.display=this.$store.state.watermarktoggle;
        }
        
        this.loadtest();
        this.$nextTick(()=>{
            this.loadDevice();
            this.NumberDevice();
            this.cloudDevice();
            this.Regional();
            this.srcview();
        })
	},
	methods:{
        //编辑视图
        Editview(data){
            console.log(data,this.$store.state.liveviewadd)
            // return
            var url = this.$store.state.IPPORT + "/api/v1/DelView?token="+data.strToken+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if (result.status === 200) {
                    this.Editadd(data)
                }
            })
        },
        Editadd(data){
            console.log(this.$store.state.liveviewadd);
            var viewdata={
                strName:data.strName,
                strToken:uuid(4, 16).toLowerCase(),
                strLayoutType:this.rows+'|'+this.cols,
                src:this.$store.state.liveviewadd
            }
            var viewjson=JSON.stringify(viewdata)
            // console.log(viewjson)
            // return
            var url = this.$store.state.IPPORT + "/api/v1/AddView?session="+ this.$store.state.token;
            this.$http.post(url,viewjson,{headers: {'Content-Type': 'application/json'}}).then(result=>{
                if (result.status === 200) {
                    console.log(result,url)
                    this.Refresh('view')
                    this.$message({
                        message: this.$t("message.camera.Save_successfully"),
                        type: 'warning'
                    });
                }
            })
        },
        //删除视图
        Delview(strToken){
            for(var i=0;i<this.viewdata.length;i++){
                if(this.viewdata[i].strToken==strToken){
                    this.viewdata.splice(i,1)
                    console.log(this.viewdata,strToken)
                }
            }
            var url = this.$store.state.IPPORT + "/api/v1/DelView?token="+strToken+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if (result.status === 200) {
                    console.log(result)
                    this.$message({
                        message: this.$t("message.camera.Delete_successful"),
                        type: 'warning'
                    });
                    // this.Refresh('view')
                }
            })
        },
        //播放视图
        async viewClick(data){
            console.log(data)
            this.$store.state.liveviewadd=[]
            var _this=this
            this.changePanel(data,'viewClick')
            if(data.src.length==0){
                var vdata={
                    viewparameter:'viewparameter'
                }
                _this.$store.state.liveplay=vdata
                return
            }
            for(var i=0;i<data.src.length;i++){
                console.log(data.src[i].strToken,data.src[i].strIndex,data)
                var label=''
                if(data.src[i].strStream=='main'){
                    label=data.src[i].strName+"--"+this.$t('message.live.mainstream')
                }else if(data.src[i].strStream=='sub'){
                    label=data.src[i].strName+"--"+this.$t('message.live.substream')
                }
                console.log(label)
                var vdata={
                    token:data.src[i].strToken,
                    streamprofile:data.src[i].strStream,
                    name:label,
                    label:data.src[i].strName,
                    vid:data.src[i].strIndex,
                    viewparameter:'viewparameter'
                }
                var viewdata={
                    strIndex:data.src[i].strIndex,
                    strToken:data.src[i].strToken,
                    strStream:data.src[i].strStream
                }
                _this.$store.state.liveplay=vdata
                await _this.$store.state.liveviewadd.push(viewdata)
            }
        },
        //保存视图
        viewadd(){
            if(this.viewname==null){
                return
            }
            var viewdata={
                strName:this.viewname,
                strToken:uuid(4, 16).toLowerCase(),
                strLayoutType:this.rows+'|'+this.cols,
                src:this.$store.state.liveviewadd
            }
            console.log(viewdata)
            var viewjson=JSON.stringify(viewdata)
            if(viewdata.strLayoutType=='1|1'){
                viewdata.icon='iconfont icon-tubiao_huaban11'
            }else if(viewdata.strLayoutType=='1|3'){
                viewdata.icon='iconfont icon-tubiao_huaban1fuben1'
            }else if(viewdata.strLayoutType=='2|2'){
                viewdata.icon='iconfont icon-tubiao_huaban1fuben21'
            }else if(viewdata.strLayoutType=='1|6'){
                viewdata.icon='iconfont icon-tubiao_huaban1fuben31'
            }else if(viewdata.strLayoutType=='1|7'){
                viewdata.icon='iconfont icon-tubiao_huaban1fuben41'
            }else if(viewdata.strLayoutType=='3|3'){
                viewdata.icon='iconfont icon-tubiao_huaban1fuben51'
            }else if(viewdata.strLayoutType=='1|13'){
                viewdata.icon='iconfont icon-tubiao_huaban1fuben61'
            }else if(viewdata.strLayoutType=='4|4'){
                viewdata.icon='iconfont icon-tubiao_huaban1fuben71'
            }else if(viewdata.strLayoutType=='5|5'){
                viewdata.icon='iconfont icon-tubiao_huaban1fuben8'
            }
            // console.log(viewjson)
            // return
            var url = this.$store.state.IPPORT + "/api/v1/AddView?session="+ this.$store.state.token;
            this.$http.post(url,viewjson,{headers: {'Content-Type': 'application/json'}}).then(result=>{
                if (result.status === 200) {
                    console.log(result,url)
                    // this.Refresh('view')
                    this.viewdata.push(viewdata)
                }
            })
            this.viewname=null
        },
        srcview(){
            var url = this.$store.state.IPPORT + "/api/v1/GetView?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if (result.status === 200) {
                    // console.log(result)
                    var oldarr=result.data.conf;
                    var oldarr1=result.data.src;
                    // console.log(oldarr,oldarr1)
                    
                    for(var l in oldarr){
                        var dataroot=this.getview(oldarr[l],oldarr1);
                        // console.log(dataroot)
                        this.viewdata.push(dataroot);
                    }
                    // console.log(this.viewdata)
                }
            })
        },
        getview(arr,arr1){
            if(arr.strLayoutType=='1|1'){
                arr.icon='iconfont icon-tubiao_huaban11'
            }else if(arr.strLayoutType=='1|3'){
                arr.icon='iconfont icon-tubiao_huaban1fuben1'
            }else if(arr.strLayoutType=='2|2'){
                arr.icon='iconfont icon-tubiao_huaban1fuben21'
            }else if(arr.strLayoutType=='1|6'){
                arr.icon='iconfont icon-tubiao_huaban1fuben31'
            }else if(arr.strLayoutType=='1|7'){
                arr.icon='iconfont icon-tubiao_huaban1fuben41'
            }else if(arr.strLayoutType=='3|3'){
                arr.icon='iconfont icon-tubiao_huaban1fuben51'
            }else if(arr.strLayoutType=='1|13'){
                arr.icon='iconfont icon-tubiao_huaban1fuben61'
            }else if(arr.strLayoutType=='4|4'){
                arr.icon='iconfont icon-tubiao_huaban1fuben71'
            }else if(arr.strLayoutType=='5|5'){
                arr.icon='iconfont icon-tubiao_huaban1fuben8'
            }
            for(var i in arr.src){
                for(var j in arr1){
                    if(arr.src[i].strToken == arr1[j].strToken){
                        arr.src[i].strName = arr1[j].strName;
                        // console.log(arr.src[i])
                    }
                }
            }
            // if(arr.src && arr.src.length>0){
            //     for (var i = 0; i < arr.src.length; i++) {
            //         arr.src[i] = getview(arr.src[i],arr1);
            //     }
            // }
            return arr;
        },
        view(){},
        //刷新
        Refresh(type){
            if(type=='device'){
                this.data=[];
                this.loadtest();
                this.loadDevice();
                this.NumberDevice();
                this.cloudDevice();
            }else if(type=='Region'){
                this.data1=[];
                this.Regional();
            }else if(type=='view'){
                this.viewdata=[];
                this.srcview();
            }
        },
        //水印
        addWaterMarker(){
			if(!document.getElementById("watermarktoggle")){
				return
			}
            var date=new Date();
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var dates=Y+M+D;
            var watermarkstring= this.$store.state.watermarkstring;
            // console.log(watermarkstring);

            var can = document.createElement('canvas');
            var body = document.body;
            body.appendChild(can);
            can.width=300; //画布的宽
            can.height=200;//画布的高度
            can.style.display='none';
            var cans = can.getContext('2d');
            cans.rotate(-20*Math.PI/140); //画布里面文字的旋转角度
            cans.font = "16px Microsoft JhengHei"; //画布里面文字的字体
            cans.fillStyle = "rgba(17, 17, 17, 1)";//画布里面文字的颜色
            cans.textAlign = 'left'; //画布里面文字的水平位置
            cans.textBaseline = 'Middle'; //画布里面文字的垂直位置
            cans.fillText(watermarkstring,can.width/3,can.height/2); //画布里面文字的间距比例
            document.getElementById("watermarktoggle").style.backgroundImage="url("+can.toDataURL("image/png")+")";
        },
        //树形节点点击
        handleNodeClick(data, checked, indeterminate){
            if(data.streamprofile==undefined){
                data.streamprofile='main'
            }
            console.log(data)
            // var a=data.token.replace(/#/g,"%23")
            // return false;
            let _this =this;
            if(data.disabled_me==false){
                // document.getElementById("icon"+data.token).style.color="#5fbfa7";
                if (data.token) {
                    let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
                    
                    var vdata={
                        token:data.token,
                        streamprofile:data.streamprofile,
                        name:data.name,
                        label:data.label,
                        vid:vid
                    }
                    var viewdata={
                        strIndex:vid,
                        strToken:data.token,
                        strStream:data.streamprofile
                    }
                    _this.$store.state.liveplay=vdata
                    _this.$store.state.liveviewadd.push(viewdata)
                    console.log("----------------------",vdata,_this.$store.state.liveplay);
                    // _this.$root.bus.$emit('liveplay', data.token, data.streamprofile, data.name,data.label,vid);
                }
                if (data.strToken) {
                    console.log(data.strToken)
                    let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
                    var vdata={
                        token:data.strToken,
                        streamprofile:data.streamprofile,
                        name:data.name,
                        label:data.label,
                        vid:vid
                    }
                    var viewdata={
                        strIndex:vid,
                        strToken:data.strToken,
                        strStream:data.streamprofile
                    }
                    _this.$store.state.liveplay=vdata
                    _this.$store.state.liveviewadd.push(viewdata)
                    console.log("----------------------",vdata,_this.$store.state.liveplay);
                    // _this.$root.bus.$emit('liveplay', data.strToken, data.streamprofile, data.name,data.strName,vid);
                }
                
                _this.$nextTick(()=>{
                    setTimeout(()=>{
                    for(var i=1;i<=this.rows;i++){
                        for(var c=1;c<=this.cols;c++){
                            var video= document.getElementById("hvideo"+i+c)
                            console.log('video.paused++++',video.poster);
                            if(video.poster==""||video.poster=="http://localhost:6080/"||video.poster==_this.$store.state.IPPORT){
                                this.selectCol = c;
                                this.selectRow =i;
                                $(".h5container").removeClass('h5videoh');
                                $("#h"+this.selectRow+this.selectCol).addClass('h5videoh');
                                // console.log('video.paused1',video.poster,i,c);
                                return false
                            }else{
                                console.log('video.paused1',video.poster);
                            }
                        }
                    }
                    },300)
                })
            }else{
               console.log("不可用");
            }
        },
        //拖动播放
        dragStart(ev,token,label,streamprofile,name,disabled_me){
            // console.log(ev,token,label,streamprofile,name,disabled_me,"124");
            var drag={
                token:token,
                label:label,
                streamprofile:streamprofile,
                name:name,
                disabled_me:disabled_me,
            }
            this.drag=drag;
            ev.dataTransfer.setData("Text",ev.target.id);
        },
        dragover (ev) {
            // console.log(ev,"123",ev.target.id)
            // ev.preventDefalut()
        },
        dropTarget (ev,r,c) {
            let _this =this;
            var data=this.drag;
            if(data.streamprofile==undefined){
                data.streamprofile='main'
            }
            // return false;
            if(data.disabled_me==false){
                // document.getElementById("icon"+data.token).style.color="#5fbfa7";
                if (data.token) {
                    let vid = 'h' + r + c;
                    var vdata={
                        token:data.token,
                        streamprofile:data.streamprofile,
                        name:data.name,
                        label:data.label,
                        vid:vid
                    }
                    var viewdata={
                        strIndex:vid,
                        strToken:data.token,
                        strStream:data.streamprofile
                    }
                    _this.$store.state.liveplay=vdata
                    _this.$store.state.liveviewadd.push(viewdata)
                    console.log("----------------------",vdata,_this.$store.state.liveplay);
                    // _this.$root.bus.$emit('liveplay', data.token, data.streamprofile, data.name,data.label,vid);
                }
                _this.$nextTick(()=>{
                    setTimeout(()=>{
                    for(var i=1;i<=this.rows;i++){
                        for(var c=1;c<=this.cols;c++){
                            var video= document.getElementById("hvideo"+i+c)
                            // console.log('video.paused',video);
                            if(video.poster==""||video.poster=="http://localhost:6080/"||video.poster==_this.$store.state.IPPORT){
                                this.selectCol = c;
                                this.selectRow =i;
                                $(".h5container").removeClass('h5videoh');
                                $("#h"+this.selectRow+this.selectCol).addClass('h5videoh');
                                return false
                            }else{
                                console.log('video.paused1',!video.poster);
                            }
                        }
                    }
                    },300)
                })
                    
            }else{
               console.log("不可用");
            }
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
        changePanel(event,viewClick) {
            // console.log(viewClick,event)
            var data=''
            if(viewClick=='viewClick'){
                data=event.strLayoutType
            }else{
                data = $(event.target).data('row');
            }
            // return
            let _this = this;
            let cols = data.split('|')[1];
            let rows = data.split('|')[0];
            //this.map.clear();
            Object.assign(this.$data, {
                rows: parseInt(rows),
                cols: parseInt(cols)
            });
            
            Vue.nextTick(function () {
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
                //$('div[name="flex"]').height(($(".content").height() - 50) / rows);
                $('div[name="flex"]').height(_this.contentHeight / rows);
                var cors=_this.cols*_this.rows;
                console.log(cors)
                if(cors>9){
                    $('.ptz_id_show').hide()
                    $('.info_id_show').hide()
                    $('.ptzcontrols').hide()
                    $('.information').hide()
                    $('.liveplay_ptz').hide()
                }
                if(cors<=9){
                    $('.ptz_id_show').show()
                    $('.info_id_show').show()
                }
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
            $('#headswitch').show()
            $('#headswitch1').hide()
        },
        headswitch1(){
            $('#headswitch1').show()
            $('#headswitch').hide()
        },
        //测试机仓
        loadtest(){
            var root = this.$store.state.IPPORT;
            if(this.$store.state.root=="Operator"){
                return false
            }
            var url = root + "/api/v1//GetSrcCamera?session="+ this.$store.state.token;
            // return falsel;
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    var data =  result.data;
                    var srcGroup = {children: []};
                    srcGroup.label=this.$t('message.live.camera');
                    srcGroup.iconclass="iconfont  icon-kaiqishexiangtou1";
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        if(item['nOriginalType'] == 'H5_CH_GB'){
                            continue;
                        }else{
                            // 主副流
                            var node=[{
                            token : item['strToken'],
                            streamprofile : "main",
                            label :this.$t('message.live.mainstream'),
                            name:item['strName']+"--"+this.$t('message.live.mainstream'),
                            iconclass : 'mdi mdi-playlist-play fa-fw',
                            disabled_me:false
                            },{
                            token : item['strToken'],
                            streamprofile : "sub",
                            label :this.$t('message.live.substream'),
                            name:item['strName']+"--"+this.$t('message.live.substream'),
                            iconclass : 'mdi mdi-playlist-play fa-fw',
                            disabled_me:false
                            }]
                            var newItem ={
                                    token : item['strToken'],
                                    label : item['strName'],
                                    iconclass : 'iconfont  icon-kaiqishexiangtou1',
                                    iconclass2 : 'iconfont  icon-shexiangtou',
                                    name:item['strName']+"--"+this.$t('message.live.mainstream'),
                                    children:node,
                                    disabled_me:false};
                            
                            if(!item['bOnline'])
                                newItem['iconclass'] = 'iconfont icon-kaiqishexiangtou';

                            if(item['nType'] == 'H5_CLOUD')
                                newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';
                            
                            if(item['bRec'] == true)
                                newItem['iconclass2'] = 'iconfont icon-radioboxfill none';
                                
                        srcGroup.children.push(newItem);
                        }
                    }
                    this.data.push(srcGroup);
                } 
            })

        },
        //写作业
        loadDevice() {
            var root = this.$store.state.IPPORT;
            if(this.$store.state.root=="Operator"){
                return false
            }
            var url = root + "/api/v1/GetDevice?session="+ this.$store.state.token;

            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    // var srcData = [];
                    var data=result.data.dev;
                    // console.log(data)
                    if(Array.isArray(data)){
                        data.sort((a,b)=>{
                            if(a.strName===b.strName) return 0;

                            return a.strName > b.strName? 1:-1 
                        })
                        for(var i=0; i<data.length; i++){
                            var item=data[i];

                            this.data.push({
                                token:item.strToken,
                                label:item.strName,
                                iconclass:"iconfont icon-kaiqishexiangtou1",
                                children:[]
                            })
                            this.loadSrc(item.strToken)
                        }
                        // console.log(this.data)
                    }
                }
            })
        },
        loadSrc(strToken) {
            var root = this.$store.state.IPPORT;
            let _this =this;
            
            var url = root + "/api/v1/GetDeviceSrc?token="+ strToken + "&session=" + this.$store.state.token;

            this.$http.get(url).then(result => {
                // console.log(result.data)
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = [];
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        // 主副流
                        var node=[{
                        token : item['strToken'],
                        streamprofile : "main",
                        label :this.$t('message.live.mainstream'),
                        name:item['strName']+"--"+this.$t('message.live.mainstream'),
                        iconclass : 'mdi mdi-playlist-play fa-fw',
                        disabled_me:false
                        },{
                        token : item['strToken'],
                        streamprofile : "sub",
                        label :this.$t('message.live.substream'),
                        name:item['strName']+"--"+this.$t('message.live.substream'),
                        iconclass : 'mdi mdi-playlist-play fa-fw',
                        disabled_me:false
                        }]
                        for(var l=0; l< node.length; l++){
                            if(item['bDisable'] == true){
                                node[l].disabled_me =true;
                            }
                        }
                        
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                iconclass : 'iconfont  icon-kaiqishexiangtou1',
                                iconclass1 : '',
                                name:item['strName']+"--"+this.$t('message.live.mainstream'),
                                children:node,
                                disabled_me:false};

                        if(!item['bOnline'])
                            newItem['iconclass'] = 'iconfont icon-kaiqishexiangtou';

                        if(item['nType'] == 'H5_CLOUD')
                            newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                        if(item['bRec'] == true)
                                newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

                        if(item['bDisable'] == true){
                            newItem['disabled_me'] =true;
                            newItem['iconclass1'] = 'camera';
                        }
                        if(item['bDisable'] == true&&this.$store.state.devicemarktoggle=='none'){
                            continue;
                        }
                        srcGroup.push(newItem);
                    }
                    var srcData = this.data.find(item => item.token === strToken)
                    // console.log(srcData)
                    if(srcData){
                        srcData.children=srcGroup
                    }
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
        },
        //数字仓机
        NumberDevice() {
            var root = this.$store.state.IPPORT;
            if(this.$store.state.root=="Operator"){
                return false
            }
            //url
            var url = root + "/api/v1/GetGbDevice?session="+ this.$store.state.token;

            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    var data=result.data.dev;
                    // console.log(data)
                    if(Array.isArray(data)){
                        data.sort((a,b)=>{
                            if(a.strName===b.strName) return 0;

                            return a.strName > b.strName? 1:-1 
                        })
                        for(var i=0; i<data.length; i++){
                            var item=data[i];

                            this.data.push({
                                token:item.strToken,
                                label:item.strName,
                                iconclass:"iconfont icon-kaiqishexiangtou1",
                                children:[]
                            })
                            this.NumberSrc(item.strToken)
                        }
                        // console.log(this.data)
                    }
                }
            })
        },
        NumberSrc(strToken) {
            var root = this.$store.state.IPPORT;
            let _this =this;
            var url = root + "/api/v1/GetGbDeviceSrc?token="+ strToken + "&session=" + this.$store.state.token;

            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = [];
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        // 主副流
                        var node=[{
                        token : item['strToken'],
                        streamprofile : "main",
                        label :this.$t('message.live.mainstream'),
                        name:item['strName']+"--"+this.$t('message.live.mainstream'),
                        iconclass : 'mdi mdi-playlist-play fa-fw',
                        disabled_me:false
                        },{
                        token : item['strToken'],
                        streamprofile : "sub",
                        label :this.$t('message.live.substream'),
                        name:item['strName']+"--"+this.$t('message.live.substream'),
                        iconclass : 'mdi mdi-playlist-play fa-fw',
                        disabled_me:false
                        }]
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                iconclass : 'iconfont  icon-kaiqishexiangtou1',
                                name:item['strName']+"--"+this.$t('message.live.mainstream'),
                                children:node,
                                disabled_me:false};

                        if(!item['bOnline'])
                            newItem['iconclass'] = 'iconfont icon-kaiqishexiangtou';

                        if(item['nType'] == 'H5_CLOUD')
                            newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                        if(item['bRec'] == true)
                                newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

                    srcGroup.push(newItem);
                    }
                    var srcData = this.data.find(item => item.token === strToken)
                    // console.log(srcData)
                    if(srcData){
                        srcData.children=srcGroup
                    }
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
        },
        //级联
        cloudDevice() {
            var root = this.$store.state.IPPORT;
            if(this.$store.state.root=="Operator"){
                return false
            }
            var url = root + "/api/v1/GetCloudDevice?session="+ this.$store.state.token;

            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    var data=result.data.dev;
                    // console.log(data)
                    if(Array.isArray(data)){
                        data.sort((a,b)=>{
                            if(a.strName===b.strName) return 0;

                            return a.strName > b.strName? 1:-1 
                        })
                        for(var i=0; i<data.length; i++){
                            var item=data[i];

                            this.data.push({
                                token:item.strToken,
                                label:item.strName,
                                iconclass:"iconfont icon-kaiqishexiangtou1",
                                children:[]
                            })
                            this.cloudSrc(item.strToken)
                        }
                        // console.log(this.data)
                    }
                }
            })
        },
        cloudSrc(strToken) {
            var root = this.$store.state.IPPORT;
            var url = root + "/api/v1/GetCloudDeviceSrc?token="+ strToken + "&session=" + this.$store.state.token;

            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = [];
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        // 主副流
                        var node=[{
                        token : item['strToken'],
                        streamprofile : "main",
                        label :this.$t('message.live.mainstream'),
                        name:item['strName']+"--"+this.$t('message.live.mainstream'),
                        iconclass : 'mdi mdi-playlist-play fa-fw',
                        disabled_me:false
                        },{
                        token : item['strToken'],
                        streamprofile : "sub",
                        label :this.$t('message.live.substream'),
                        name:item['strName']+"--"+this.$t('message.live.substream'),
                        iconclass : 'mdi mdi-playlist-play fa-fw',
                        disabled_me:false
                        }]
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                iconclass : 'mdi mdi-video fa-fw',
                                name:item['strName']+"--"+this.$t('message.live.mainstream'),
                                children:node,
                                disabled_me:false};

                        if(!item['bOnline'])
                            newItem['iconclass'] = 'iconfont icon-kaiqishexiangtou';

                        if(item['nType'] == 'H5_CLOUD')
                            newItem['iconclass'] = 'iconfont  icon-kaiqishexiangtou1';

                        if(item['bRec'] == true)
                                newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

                    srcGroup.push(newItem);
                    }
                    var srcData = this.data.find(item => item.token === strToken)
                    // console.log(srcData)
                    if(srcData){
                        srcData.children=srcGroup
                    }
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
        },

        Regional(){
            var root = this.$store.state.IPPORT;
            var url = root + "/api/v1/GetRegion?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                // console.log(result);
                var oldarr=result.data.root;
                var oldarr1=result.data.src;
                // console.log(oldarr,oldarr1)
                var dataroot=this.getchild(oldarr,oldarr1);
                this.data1.push(dataroot);
            })
        },
        getchild(arr,arr1) {
            
            for(var i in arr.cam){
                if(!arr.cam[i].strName){
                    for(var j in arr1){
                        if(arr.cam[i].strToken == arr1[j].strToken){
                            var node1=[{
                                strToken : arr1[j].strToken,
                                streamprofile : "main",
                                strName :this.$t('message.live.mainstream'),
                                name:arr1[j].strName+"--"+this.$t('message.live.mainstream'),
                                iconclass : 'mdi mdi-playlist-play fa-fw',
                                disabled_me:false
                            },{
                                strToken : arr1[j].strToken,
                                streamprofile : "sub",
                                strName :this.$t('message.live.substream'),
                                name:arr1[j].strName+"--"+this.$t('message.live.substream'),
                                iconclass : 'mdi mdi-playlist-play fa-fw',
                                disabled_me:false
                            }]
                            arr.cam[i].node=node1;
                            arr.cam[i].strName = arr1[j].strName;
                            arr.cam[i].name=arr1[j].strName+"--"+this.$t('message.live.mainstream')
                            arr.cam[i].bOnline = arr1[j].bOnline;
                            arr.cam[i].iconclass="iconfont  icon-kaiqishexiangtou1"
                            arr.cam[i].disabled_me=false
                            if(!arr1[j].bOnline)
                                arr.cam[i].iconclass = 'iconfont icon-kaiqishexiangtou';

                            if(arr1[j].nConnectType == 'H5_CLOUD')
                                arr.cam[i].iconclass = 'iconfont  icon-kaiqishexiangtou1';

                            if(arr1[j].bRec == true)
                                arr.cam[i].iconclass2  = 'iconfont icon-radioboxfill none';

                            if(arr1[j].bDisable== true){
                                
                                arr.cam[i].node[0].disabled_me=true;
                                arr.cam[i].node[1].disabled_me=true;
                                arr.cam[i].disabled_me=true;
                                arr.cam[i].iconclass1= 'camera';
                            }
                        }
                    }
                }
            }

            var camarr=[]
			var camarr1=[]
			for(var i in arr.cam){
				camarr.push(arr.cam[i].strToken)
			}
			for(var i in arr1){
				camarr1.push(arr1[i].strToken)
			}
			let diff = camarr.filter(item => !new Set(camarr1).has(item))
			// console.log(diff)
			for(var i in arr.cam){
				for(var j in diff){
					if(arr.cam[i].strToken == diff[j]){
						arr.cam[i].strName = '设备暂时不可用';
						arr.cam[i].iconclass="iconfont  icon-kaiqishexiangtou"
					}
				}
			}

            if(arr.node && arr.node.length>0){
                for (var i = 0; i < arr.node.length; i++) {
                    arr.node[i] = this.getchild(arr.node[i],arr1);
                }
            }
            return arr;
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
        },
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
.liveview{
    padding-top: 10px;
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-between;
    /* 水印 */
    #watermarktoggle{
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: block;
        pointer-events: none;
        margin-top: 40px;
    }
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
        #headswitch1{
            display: none;
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
            padding: 20px 20%;
            display: flex;
            justify-content: space-between;
            button{
                border: none;
                background: none;
                font-size: 30px;
            }
        }
    }
}
.el-popover.el-popper{
    .liveview_popover{
        .liveview_popover_top{
            display: flex;
            width: 100%;
            margin-bottom: 10px;
            div{
                width: 35%;
                line-height: 40px;
            }
            .liveview_left_input{
                width: 65%;
                .el-input__inner{
                    width: 100%;
                    border: none;
                }
            }
        }
        .liveview_popover_but{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            button{
                border-radius: 5px;
                border: none;
            }
        }
    }
}
</style>