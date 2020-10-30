<template>
    <div class="playback">
        <div class="playback_snap_zuo">
            <!-- 模糊查询搜查 -->
            <el-input
                class="snap_zuo_input"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input>
            <div class="snap_zuo_title">设备</div>
            <!-- 这是原下拉框代码 -->
            <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                :filter-node-method="filterNode"
                ref="tree"
                highlight-current
                :props="defaultProps">
                <span slot-scope="{ data }">
                    <i :class="data.iconclass" style="color:rgb(142, 132, 132);"></i>
                    <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                </span>
            </el-tree>
        </div>
        <div class="playback_snap_you">
            <div class="snap_you_top">
                <div class="snap_you_topfast">
                    <div class="snap_you_topinterval">日期</div>
                    <el-select v-model="value" placeholder="请选择" @change="datechange">
                        <el-option
                        v-for="item in selectdate"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="snap_you_topdate">
                    <div class="snap_you_topinterval">开始日期</div>
                    <el-date-picker
                        v-model="startvalue"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                    <div class="snap_you_topinterval1">-</div>
                    <div class="snap_you_topinterval">结束日期</div>
                    <el-date-picker
                        v-model="endvalue"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="snap_you_topbutt">
                    <el-button class="snap_you_topbutt1" @click="getCheckedNodes">{{$t("message.archive.search")}}</el-button>
                    <el-button class="snap_you_topbutt2" @click="tableDatak">{{$t("message.archive.Clear")}}</el-button>
                </div>
            </div>
            <div class="snap_you_bottom">
                <!-- 有按钮 -->
                <el-table
                    stripe
                    :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    style="width: 100%;">
                    <el-table-column
                        prop="name"
                        :label="label.Name"
                        min-width="50" >
                    </el-table-column>
                    <el-table-column
                        prop="token"
                        :label="label.Token">
                    </el-table-column>
                    <el-table-column
                        prop="starf"
                        :label="label.StartTime">
                            <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span>{{ scope.row.starf }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="end"
                        :label="label.EndTime">
                            <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span>{{ scope.row.end }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="end"
                        :label="label.Type"
                        min-width="50">
                            <template slot-scope="scope">
                            <span>{{ scope.row.type }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        width=310px>
                        <template slot-scope="scope">
                            <div class="snap_you_lable_butt">
                                <el-tooltip class="item" effect="dark" :content="content.content1" placement="top-start">
                                    <el-button size="mini" type="button" class="iconfont icon-guiding" @click="handleEdit(scope.$index, scope.row)"></el-button>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :content="content.content2" placement="top-start">
                                    <el-button size="mini" type="button" class="iconfont icon-history" @click="Refresh(scope.row)"></el-button>
                                </el-tooltip>
                                    <el-progress type="circle" :percentage="scope.row.percentage" :stroke-width="2" :width="35"></el-progress>
                                <el-tooltip class="item" effect="dark" :content="content.content3" placement="top-start">
                                    <a :href="scope.row.url" :download="scope.row.urlto"><el-button size="mini" class="iconfont icon-download"></el-button></a>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :content="content.content4" placement="top-start">
                                    <el-button size="mini" @click="Refresh1(scope.$index, scope.row)" data-toggle="modal" data-target="#myModal" class="iconfont icon-play"></el-button>
                                </el-tooltip>
                            </div>
                        </template>
                        </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    style="text-align: center;"
                    layout="prev, pager, next"
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            :before-close="handleClose"
            class="dasboard_modal"
            :title="label.Playback"
            :visible.sync="myModal1"
            width="30%">
            <div style="display: flex;justify-content: space-between;">
                <span>{{$t("message.archive.StartTime")}}:{{rowstarf}}</span>
                <span>{{$t("message.archive.EndTime")}}:{{rowend}}</span>
            </div>
            <div class="text-center">
                <video class="videoo" id="pbplayarch"></video>
                <div class="block" @mousedown ="timelinndown($event)" @mouseup="timelinnup($event)">
                    <el-slider  v-model="timelink" :max="max" @change="timelinn(timelink)" :show-tooltip="false"></el-slider>
                    <!-- <input @mousedown ="a($event)" @mouseup="b($event)" type="range"> -->
                </div>
                <!-- <el-button :class="icon" @click="resume()" class="strart"></el-button> -->
                <div class="playback_function">
                    <div :class="icon" @click="resume()" class="strart"></div>
                    <!-- 倍速 -->
                    <el-select v-model="region" size="mini" style="width:70px" @change="Speed()">
                        <el-option
                            v-for="item in regiondata"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 实时时间 -->
                    <span>{{displayc}}</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {listdatagload,listdatag} from '../public/regional'
import '../../assets/js/adapter'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../../assets/js/h5splayer.js'
export default {
    
    name:"Archive",
    data() {
        return {
            v1:undefined,
            content:{
                content1:this.$t("message.archive.archive"),
                content2:this.$t("message.archive.Refresh"),
                content3:this.$t("message.archive.Download"),
                content4:this.$t("message.archive.Playback")
            },
            label:{
                Name:this.$t("message.table.Name"),
                Token:this.$t("message.table.Token"),
                Time:this.$t("message.table.Time"),
                StartTime:this.$t("message.table.StartTime"),
                EndTime:this.$t("message.table.EndTime"),
                Playback:this.$t("message.archive.Playback")
            },
            icon:'icon_start',
            timelink:0,//滑块
            max:0,//滑块最大值
            value: '',
            endvalue: new Date().getTime(),
            startvalue:new Date().getTime() - 3600 * 1000 * 1,
            myModal1:false,
            region:'0.5',
            regiondata:[{
                    value: "0.5",
                    label: "0.5"
                }, {
                    value: "1.0",
                    label: "1.0"
                }, {
                    value: "2.0",
                    label: "2.0"
                }, {
                    value: "4.0",
                    label: "4.0"
                }, {
                    value: "8.0",
                    label: "8.0"
                }, {
                    value: "16.0",
                    label: "16.0"
            }],
            selectdate: [{
                    value: (new Date().getTime() - 3600 * 1000 * 1),
                    label: this.$t("message.archive.Onehour")
                }, {
                    value: (new Date().getTime() - 3600 * 1000 * 24),
                    label: this.$t("message.archive.Oneday")
                }, {
                    value: (new Date().getTime() - 3600 * 1000 * 24 * 7),
                    label: this.$t("message.archive.Oneweek")
                }, {
                    value: (new Date().getTime() - 3600 * 1000 * 24 * 30),
                    label: this.$t("message.archive.Onemonth")
            }],
            //分页
            currentPage: 1, // 当前页码
            total: 0, // 总条数
            pageSize: 10,//一页数量
            search: '',
            filterText: '',
            data: listdatag,
            defaultProps: {
                children: 'children',
                label: 'label',
                token:"token",
                iconclass:"iconclass"
            },
            tableData1: [],
            rowstarf:"",//跟进进度条开始时间
            rowend:"",//进度条结束时间
            displayc:"",//实时时间
            Refreshset:undefined,//刷新
            url:""//图片地址
        }
    },
    beforeDestroy() {
        this.handleClose();
        clearInterval(this.Refreshset);
        // this.$root.bus.$off('liveplay');
    },
    mounted(){
    },
    methods:{
        //刷新
        Refresh(row){
            console.log(row);
            
            //3m刷新数据
            this.rename=row.token;
            this.redata=row.strFileName;
            this.rerow=row;
            this.Refreshset = setInterval(function(){
                var url1 = this.$store.state.IPPORT + "/api/v1/GetArchiveStatus?token="+row.token+"&filename="+row.strFileName+"&session="+ this.$store.state.token;
                
                this.$http.get(url1).then(result1=>{
                    if (result1.status == 200)
                    {
                        console.log(result1.data.nPercentage);
                        row.percentage=result1.data.nPercentage;
                        if(result1.data.nPercentage==100){
                            clearInterval(this.Refreshset);
                        }
                    }
                    
                    }).catch(error => {
                        console.log('GetArchiveStatus failed!', error);
                    });
            }.bind(this),3000)
        },
        //归档
        handleEdit(index, row) {
            console.log(index,row);
            
            var end=new Date(row.end).getTime();
            var starf=new Date(row.starf).getTime();
            var rqstarf=new Date(starf);
            //时间差
            var starfend=(end-starf)/1000;
            //年月日
            var y = rqstarf.getFullYear();
            var m = rqstarf.getMonth()+1;
            var d = rqstarf.getDate();
            //时分秒
            var h = rqstarf.getHours();
            var mm = rqstarf.getMinutes();
            var s = rqstarf.getSeconds();
            var rq=y+'-'+m+'-'+d;
            var sj=h+'-'+mm+'-'+s;
            var roww=row.token;
            //url
            let _this =this;
			var url = this.$store.state.IPPORT + "/api/v1/Archive?token="+roww+"&start1="+rq+"&start2="+sj+"&duration="+starfend+"&speed=4&session="+ this.$store.state.token;
           
            this.$http.get(url).then(result=>{
                if (result.status == 200){
                    console.log(result)
                    this.$message('Archive in progressing');
                    var data=result.data;
                    var strFileName=data.strFileName;
                    row.strFileName=strFileName;//下载的地址
                    var strUrl=data.strUrl;
                    row.url=strUrl;//下载的地址
                    var urlto=strUrl.split("/");
                    row.urlto=urlto[urlto.length-1];//下载文件
                    // this.Refresh()
                }
            }).catch(error => {
                console.log('Snapshot failed!', error);
                this.$message('Archive failed !');
            });
        },
        // 整月日期
        datechange(){
            console.log(this.value)
            this.startvalue=this.value
        },
        PlaybackCB(event, userdata){
            // console.log("Playback callback ", event,userdata);
            
            var msgevent = JSON.parse(event);
            if (msgevent.type === 'H5S_EVENT_PB_TIME')
            {
                this.displayc=msgevent.pbTime.strTime;
                var starf=new Date(this.rowstarf).getTime()/1000;
                var endd=new Date(msgevent.pbTime.strTime).getTime()/1000;
                var staefend=endd-starf;
                this.timelink=staefend;
            }
        },
        //播放
        Refresh1(index, row){
            if (this.v1 != undefined){
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
            }
            console.log(index, row);
            this.rowstarf=row.starf;
            this.rowend=row.end;
            this.url=row.url;
            this.myModal1=true
            var pbconf1 = {
                begintime: row.starf,
                endtime: row.end,
                showposter: 'true', //'true' or 'false' show poster
				callback: this.PlaybackCB,
				userdata:  this // user data
            };
            this.$nextTick(()=>{
                console.log(row.token);
                let conf = {
                    videoid: "pbplayarch",
                    protocol: window.location.protocol, //http: or https:
                    host: this.$store.state.WSROOT, //localhost:8080
                    rootpath:'/', // '/'
                    token:row.token,
                    pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
                    hlsver:'v1', //v1 is for ts, v2 is for fmp4
                    session:this.$store.state.token
                };
                var end=new Date(row.end).getTime();
                var starf=new Date(row.starf).getTime();
                var starfend=(end-starf)/1000;//时间差
                console.log(starfend,conf);
                // return false
                this.max=starfend;
                this.v1 = new H5sPlayerRTC(conf);
                this.v1.connect();
                setTimeout(function(){
                    this.v1.start();
                }.bind(this),500);
            })
        },
        //开始
        resume(){
            var strart=this.icon;
            console.log(strart);
            if(strart=="icon_start"){
                console.log(strart);
                this.icon="icon_stop";
                this.v1.pause();
            }
            if(strart=="icon_stop"){
                console.log(strart);
                this.icon="icon_start";
                this.v1.resume();
            }
        },
        //拖
        timelinndown(err){
            console.log('a',err)
            this.v1.pause();
        },
        timelinnup(err){
            console.log('a',err)
            this.v1.resume();
        },
        timelinn(timelink){
            console.log(timelink);
            this.v1.seek(timelink);
            this.icon="icon_start";
        },
        //关闭
        handleClose(){
            if (this.v1 != undefined){
                console.log('关闭')
                this.myModal1=false
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
            }
        },
        //倍速
        Speed(){
            console.log( this.region);
            this.v1.speed(this.region);
        },
        // 表格归档 下载 刷新
        
        //按钮搜索
        async getCheckedNodes() {
            this.tableData1=[];
            console.log("node值",this.$refs.tree.getCheckedNodes());
            var nodes=this.$refs.tree.getCheckedNodes();
            var srartdate=new Date(this.startvalue).toISOString()+"08:00";
            var enddate= new Date(this.endvalue).toISOString()+"08:00";
            // console.log(this.endvalue,this.startvalue,srartdate,enddate)
            for(var l=0 ;l<nodes.length; l++){
                if(nodes[l].token!=undefined){
                    // console.log(nodes[l].token,nodes[l].label)
                    var label=nodes[l].label
                    // return false
                    var url = this.$store.state.IPPORT + "/api/v1/SearchDeviceRecordByTime?token="+nodes[l].token+"&start="+srartdate+"&end="+enddate+"&session="+ this.$store.state.token;
                    // console.log(url);
                    //return false;
                    await this.$http.get(url).then(result=>{
                        if(result.status == 200){
                            this.$message('Query successful');
                            var data=result.data;
                            console.log(data,label)
                            for(var i=0;i<data.record.length;i++){
                                var item=data.record[i];
                                var timeitem={
                                        name: label,
                                        token: nodes[l].token,
                                        starf : item['strStartTime'],
                                        end : item['strEndTime'],
                                        type: item['nType'],
                                        percentage:0,
                                        url:'',
                                        urlto:'',
                                        strFileName:""
                                    };
                                    
                                    //   console.log(data)
                                    if(item['nType']=="H5_REC_MANUAL"){
                                        timeitem["type"] = this.$t("message.archive.ManualRecord");
                                    }else{
                                        timeitem["type"] = this.$t("message.archive.AlarmRecord");
                                    }
                                    // console.log(timeitem);
                                    //填充
                                    this.tableData1.push(timeitem);
                            }
                            
                            this.total=this.tableData1.length;
                        }
                    }).catch(error => {
                        console.log('Snapshot failed!', error);
                        this.$message('Query failed !');
                    });
                }
            }
        },
        //清空表格
        tableDatak(){
            this.tableData1=[];
            this.total=0;
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
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
    }
    .playback_snap_you{
        width: 82%;
        height: 87vh;
        .snap_you_top{
            padding: 15px 20px;
            @extend .g_flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .el-input__inner{
                background: none;
                padding: 0;
            }
            .snap_you_topfast{
                width: 17%;
                min-width: 240px;
                @extend .g_flex;
                justify-content: space-around;
                align-items: center;
            }
            .snap_you_topdate{
                width: 45%;
                min-width: 600px;
                @extend .g_flex;
                justify-content: space-around;
                align-items: center;
            }
            .snap_you_topbutt{
                width: 15%;
                min-width: 160px;
                @extend .g_flex;
                justify-content: space-around;
                align-items: center;
                .snap_you_topbutt1{
                    background: #3ABBFE;
                    border: none;
                }
            }
        }
        .snap_you_bottom{
            .button_edi button{
                border: 0;
                background:none;
                font-size: 24px;
                margin-right: 40px;
                button:last-child{
                    margin-right: 0;
                }
            }
            .snap_you_lable_butt{
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-content: center;
                button{
                    background: none;
                    border: none;
                    font-size: 24px;
                }
            }
        }
    }
    .dasboard_modal{
        .el-select.el-select--mini{
            .el-input__inner{
                background: none !important;
            }
        }
        .playback_function{
            display: flex;
            padding: 0 20%;
            justify-content: space-around;
            margin-top: 16px;
        }
        .videoo{
            width: 100%;
        }
    }
}


.icon_start{
    width: 32px;
    height: 32px;
    background: url('~@/views/replay/imgs/Playback_start.png') no-repeat center;
    background-size: 100%;
}
.icon_stop{
    width: 32px;
    height: 32px;
    background: url('~@/views/replay/imgs/Playback_stop.png') no-repeat center;
    background-size: 100%;
}
.g_flex{
    display: flex;
}
</style>