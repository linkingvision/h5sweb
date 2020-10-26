<template>
    <div class="dasboard">
        <div class="dasboard_global">
            <!-- 顶部 -->
            <div class="dasboard_one">
                <!-- 顶部左侧 -->
                <div class="dasboard_one_left">
                    <!-- 顶部左侧上部 -->
                    <div class="dasboard_one_lup">
                        <div class="dasboard_one_lupl">
                            <div class="beibiao_zi">
                                <img src="./imgs/Dashboard_icon.png"/>
                                <span>{{this.$t("message.dashboard.an_out")}}</span>
                            </div>
                            <div id="container0" style="width: 100%;height: 95%;"></div>
                        </div>
                        <div class="dasboard_one_lupr">
                            <div class="beibiao_zi">
                                <img src="./imgs/Dashboard_icon.png"/>
                                <span>CPU</span>
                            </div>
                            <div id="container1" style="width: 100%;height: 95%;"></div>
                        </div>
                    </div>
                    <!-- 顶部左侧下部 -->
                    <div class="dasboard_one_ldown">
                        <!-- 顶部左侧下部右侧 -->
                        <div class="dasboard_one_ldown_right">
                            <div style="display: flex; justify-content: space-between;">
                                <div class="flex_beibiao" style="width:90%">
                                    <div class="beibiao_zi">
                                        <img src="./imgs/Dashboard_icon.png"/>
                                        <span>{{this.$t("message.dashboard.device")}}</span>
                                    </div>
                                    <div style="display: flex;">
                                        <div class="beibiao_zi1">{{this.$t("message.dashboard.Online")}}</div>
                                        <div class="beibiao_bg"></div>
                                        <div class="beibiao_zi1">{{this.$t("message.dashboard.Offline")}}</div>
                                        <div class="beibiao_bg1"></div>
                                    </div>
                                </div>
                                <div class="more" style="padding: 6px 20px 0 0;">
                                    <router-link :to="{name:'Device'}" style="color:#09C08F">
                                        更多<i class="el-icon-d-arrow-right"></i>
                                    </router-link>
                                </div>
                            </div>
                            <div class="dasboard_one_ldown_container">
                                <div v-for="(a,index) in 5" :key="index">
                                    <div :id="'devsdk'+index" class="beisdk"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 顶部右侧 -->
                <div class="dasboard_one_right">
                    <!-- 顶部右侧上部 -->
                    <div class="dasboard_one_rup">
                        <div class="beibiao_zi">
                            <img src="./imgs/Dashboard_icon.png"/>
                            <span>{{this.$t("message.dashboard.DiskMemory")}}</span>
                        </div>
                        <div class="nr_mory">
                            <div class="nr_mory1">
                                <el-progress
                                v-if="strRunTime"
                                type="dashboard" 
                                :width='100'
                                :stroke-width="5"
                                color="#4C80FA"
                                :percentage="Number(Math.round((strRunTime.nTotalSpaceByte-strRunTime.nFreeSpaceByte)/strRunTime.nTotalSpaceByte*100))"></el-progress> 
                                <div>{{this.$t("message.dashboard.free_space")}}</div>
                                <div>({{((strRunTime.nFreeSpaceByte)/1024/1024/1024).toFixed(1)}}G)</div>
                            </div>
                            <div class="nr_mory1">
                                <el-progress
                                type="dashboard"
                                :width='100'
                                :stroke-width="5"
                                v-if="strRunTime"
                                color="#FFF025"
                                :percentage="Number(strRunTime.nMemoryUsage)"></el-progress>
                                <div>{{this.$t("message.dashboard.memory")}}</div>
                                <!-- {{this.$t("message.dashboard.TotalMemory")}}:  -->
                                <div>({{(strRunTime.nTotalMemoryByte/1024/1024/1024).toFixed(1)}}G)</div>
                            </div>
                            <div class="nr_mory1">
                                <el-progress
                                    type="dashboard"
                                    :width='100'
                                    :stroke-width="5"
                                    v-if="strRunTime"
                                    color="#FF3FE5"
                                    :percentage="Number(Math.round((strRunTime.nRecordTotalSpaceByte-strRunTime.nRecordFreeSpaceByte)/strRunTime.nRecordTotalSpaceByte*100))"></el-progress>
                                <div>{{this.$t("message.dashboard.Storage")}}</div>
                                <div>({{(strRunTime.nRecordTotalSpaceByte/1024/1024/1024).toFixed(1)}}G)</div>
                            </div>
                            
                        </div>
                    </div>
                    <!-- 顶部右侧中部 -->
                    <div class="dasboard_one_rin">
                        <div class="beibiao_zi">
                            <img src="./imgs/Dashboard_icon.png"/>
                            <span>{{this.$t("message.dashboard.codec_info")}}</span>
                        </div>
                        <div class="flex_nc_ag">
                            <div class="flex_nc_cpu" v-for="(a,index) in codecInfo" :key="index">
                                <span class="cpu_zuo">{{a.name}}:</span>
                                <span class="cpu_you"> {{a.id}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 顶部右侧下部 -->
                    <div class="dasboard_one_rdown">
                        <div style="display: flex; justify-content: space-between;">
                            <div class="beibiao_zi">
                                <img src="./imgs/Dashboard_icon.png"/>
                                <span>{{this.$t("message.dashboard.GPU_info")}}</span>
                            </div>
                            <div>
                                <router-link :to="{name:'GPU'}" style="color:#09C08F">
                                    更多<i class="el-icon-d-arrow-right"></i>
                                </router-link>
                            </div>
                        </div>
                        <div class="flex_GPU">
                            <div>Intel: {{Gpulen.nIndex}}</div>
                            <div>NVIDIA: {{Gpulen.nvidia}}</div>
                        </div>
                    </div>
                    <!-- 顶部左侧下部左侧 -->
                    <div class="dasboard_one_rdown_most">
                        <div class="beibiao_zi">
                            <img src="./imgs/Dashboard_icon.png"/>
                            <span>{{this.$t("message.dashboard.capability")}}</span>
                        </div>
                        <div class="function_list">
                            <div class="function_list_content" v-for="(c,index) in system" :key="index">
                                <span>{{c.name}}</span>
                                <el-switch
                                    v-model="c.id"
                                    disabled
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                                </el-switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部 -->
            <div class="dasboard_two">
                <!-- 一 -->
                <div class="dasboard_two1">
                    <div class="beibiao_zi">
                        <img src="./imgs/Dashboard_icon.png"/>
                        <span>{{this.$t("message.dashboard.system_info")}}</span>
                    </div>
                    <div class="flex_nc_ag">
                        <div class="flex_nc_cpu" v-for="(b,index) in capability" :key="index">
                            <span class="cpu_zuo">{{b.name}}:</span>
                            <span v-if="b.name!='主机号'&&b.name!='Hostid'" class="cpu_you" > {{b.id}}</span>
                            
                            <input v-if="b.name=='主机号'||b.name=='Hostid'" id="foo" type="text" :value="b.id"/>
                            <i data-clipboard-target="#foo" 
                                @click="copylink(b.id)" 
                                style="margin-left: 10px;" 
                                v-if="b.name=='主机号'||b.name=='Hostid'" 
                                class="copy iconfont icon-tianjiashijianicon">
                            </i>
                        </div>
                    </div>
                </div>
                <!-- 二 -->
                <div class="dasboard_two2">
                    <div class="beibiao_zi">
                        <img src="./imgs/Dashboard_icon.png"/>
                        <span>{{this.$t("message.dashboard.running")}}</span>
                    </div>
                    <div class="zong_flex">
                        <div class="zong_mve">
                            <div>{{this.$t("message.dashboard.running")}}</div>
                            <div>{{strRunTime.strRunTime}}</div>
                        </div>
                        <div class="zong_mve">
                            <div>{{this.$t("message.dashboard.cameras")}}</div>
                            <div>{{dev.nCameraTotal}}</div>
                        </div>
                        <div class="zong_mve">
                            <div>{{this.$t("message.dashboard.online_cam")}}</div>
                            <div>{{dev.nCameraOnline}}</div>
                        </div>
                    </div>
                    <div class="zong_img">
                        <img src="./imgs/Dashboard_chart.png"/>
                    </div>
                </div>
                <!-- 三 -->
                <div class="dasboard_two3">
                    <div class="beibiao_zi">
                            <img src="./imgs/Dashboard_icon.png"/>
                            <span>{{this.$t("message.dashboard.device")}}</span>
                        </div>
                        <div class="container_sdk">
                            <div class="containesr_sdks" v-for="(da,index) in devbucket" :key="index">
                                <div class="sdk_back">
                                    <div class="sdk_szie">{{da.percentage}}%</div>
                                </div>
                                <div class="containesr_sdks_zi">
                                    <div>{{da.name}}</div>
                                    <div>{{total}} {{da.total1}} {{ge}}</div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var echarts = require("echarts");
export default {
	name: 'Dashboard',
	data(){
		return{
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            data2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            title_text:this.$t("message.dashboard.an_out"),
            network_in:this.$t("message.dashboard.network_in"),
            network_out:this.$t("message.dashboard.network_out"),

            Hikvision:this.$t("message.dashboard.Hikvision"),
            Dahua:this.$t("message.dashboard.Dahua"),
            Tiandy:this.$t("message.dashboard.Tiandy"),

            total:this.$t("message.dashboard.total"),
            ge:this.$t("message.dashboard.ge"),

            Online:this.$t("message.dashboard.Online"),
            Offline:this.$t("message.dashboard.Offline"),
            capability:"",//版本号
            strRunTime:"",//运行时间
            codecInfo:"",
            devbucket:[],
            dev:{
                nCameraTotal: "",
                nCameraOnline: "",
                nHikDevTotal: "",
                nHikDevOnline: "",
                nDhDevTotal: "",
                nDhDevOnline: "",
                nHikIscDevTotal: "",
                nHikIscDevOnline: "",
                nTdDevTotal: "",

                nTdDevOnline: "",
                nGbDevTotal: "",
                nGbDevOnline: "",

                nCloudTotal: "",
                nCloudOnline: "",

                nRTSPRTMPTotal: "",
                nRTSPRTMPOnline: "",

                nONVIFTotal: "",
                nONVIFOnline: "",

                nRTMPPushTotal: "",
                nRTMPPushOnline: ""
            },
            system:"",
            Gpulen:{
                nIndex:"",
                nvidia:""
            },
            
		}
	},
	mounted(){
        this.GetRunInfo();
        this.GetSystemInfo();
        this.GetCodecInfo();
        this.GetDeviceSummary();
        this.Gpu();
        this.timerRunInfo = setInterval(() => {
            this.GetRunInfo();
        }, 5000);
        this.timerRunInfo1 = setInterval(() => {
            this.GetDeviceSummary();
        }, 60000*5)
        var _this=this
        _this.$root.bus.$on('skintoggle', function(a){
            console.log("更换皮肤",a)
            _this.GetRunInfo();
            _this.GetDeviceSummary();
        });
	},
	methods:{
        //GPU
        Gpu(){
            var url = this.$store.state.IPPORT  + "/api/v1/GetGPUInfo?session=" + this.$store.state.token;
            this.$http.get(url).then(result => {
                if (result.status == 200) {
                    var data = result.data;
                    this.Gpulen.nIndex=data.intel.length;
                    this.Gpulen.nvidia=data.nvidia.length;
                }
            })
        },
        //解码器等
        GetCodecInfo() {
            let _this = this;
            var url =
                this.$store.state.IPPORT + "/api/v1/GetCodecInfo?session=" + this.$store.state.token;
                // console.log("------------",url)
            this.$http.get(url).then(result => {
                if (result.status == 200) {
                    var data =  result.data;
                    var cpu=[{
                        name:this.$t("message.dashboard.cpumodel"),
                        id:data.strCPUModel
                    },{
                        name:this.$t("message.dashboard.PhysicalCPU"),
                        id:data.nCPU
                    },{
                        name:this.$t("message.dashboard.CPUCore"),
                        id:data.nCPUCore
                    },{
                        name:this.$t("message.dashboard.cpuencoder"),
                        id:data.strSWEncoders
                    },{
                        name:this.$t("message.dashboard.cpudecoder"),
                        id:data.strSWDecoders
                    }]
                    this.codecInfo = cpu;
                    // console.log("--------------",result,this.codecInfo);
                }
            })
            .catch(error => {
            console.log("GetSystemInfo", error);
            });
        },
        //设备
        GetDeviceSummary(){
            var url = this.$store.state.IPPORT + "/api/v1/GetDeviceSummary?session="+ this.$store.state.token;
            // console.log("----------",url)
            this.$http.get(url).then(result=>{
                console.log("----------",result)
                if (result.status == 200) {
                    this.dev=result.data;
                    var data=result.data;
                    var Cloud="";
                    var RTSPRx="";
                    var ONVIFx="";
                    var RTMPx="";
                    if(this.dev.nCloudTotal==0){
                        Cloud=0;
                    }else{
                        Cloud=Math.round(this.dev.nCloudOnline/this.dev.nCloudTotal*100)
                    }
                    if(this.dev.nRTSPRTMPTotal==0){
                        RTSPRx=0;
                    }else{
                        RTSPRx=Math.round(this.dev.nRTSPRTMPOnline/this.dev.nRTSPRTMPTotal*100)
                    }

                    if(this.dev.nONVIFTotal==0){
                        ONVIFx=0;
                    }else{
                        ONVIFx=Math.round(this.dev.nONVIFOnline/this.dev.nONVIFTotal*100)
                    }

                    if(this.dev.nRTMPPushTotal==0){
                        RTMPx=0;
                    }else{
                        RTMPx=Math.round(this.dev.nRTMPPushOnline/this.dev.nRTMPPushTotal*100)
                    }
                    var databuk=[{
                        name:this.$t("message.dashboard.Cloud"),
                        total1:this.dev.nCloudTotal,
                        percentage:Cloud
                    },{
                        name:'RTSP/RTMP',
                        total1:this.dev.nRTSPRTMPTotal,
                        percentage:RTSPRx
                    },{
                        name:'ONVIF',
                        total1:this.dev.nONVIFTotal,
                        percentage:ONVIFx
                    },{
                        name:this.$t("message.dashboard.RTMP"),
                        total1:this.dev.nRTMPPushTotal,
                        percentage:RTMPx
                    }]
                    
                    this.devbucket=databuk
                    var devdata=[{
                            name:"海康SDK",
                            Total:data.nHikDevTotal,
                            Online:data.nHikDevOnline
                        },{
                            name:"大华SDK",
                            Total:data.nDhDevTotal,
                            Online:data.nDhDevOnline
                        },{
                            name:"iSecure Center",
                            Total:data.nHikIscDevTotal,
                            Online:data.nHikIscDevOnline
                        },{
                            name:"天地SDK",
                            Total:data.nTdDevTotal,
                            Online:data.nTdDevOnline
                        },{
                            name:"GB",
                            Total:data.nGbDevTotal,
                            Online:data.nGbDevOnline
                        }];
                    for(var i=0;i<devdata.length;i++){
                        this.devimage(devdata[i],i);
                    }
                    // console.log(data)
                }
            })
        },
        //环形
        devimage(devdata,leng){
            // console.log(devdata,leng,'devive'+leng);
            var pieId=document.getElementById("devsdk"+leng)
            // console.log(pieId,'devsdk'+leng);
            // return false
            if (!pieId){
                return false;
            }
            var titlecol
            if(this.$store.state.darkMode){
                titlecol="#FFFFFF"
            }else{
                titlecol="#000000"
            }
            var myChart = echarts.init(pieId);
            myChart.setOption({
                tooltip: {
                    show:true
                },
                title: {
                    x: 'center',
                    y: 'center',
                    textStyle:{
                        fontSize:12,
                        fontWeight:400,
                        color:titlecol
                    }
                },
                
                series: [{
                    name: devdata.name,
                    type: 'pie',
                    radius: ['60%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                            },
                            formatter:'{b}\n{c}'
                        }
                        
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                            value:devdata.Online,
                            name: this.Online,
                            itemStyle: {
                                color: '#4C80FA'
                            }
                        },
                        {
                            value: devdata.Total-devdata.Online,
                            name: this.Offline,
                            itemStyle: {
                                color: '#09C08F'
                            }
                        }
                    ]
                }]
            })
            myChart.setOption({
                title: {
                    show: true,
                    text: devdata.name+'\n'+this.total+devdata.Total+this.ge
                }
            })
            
            myChart.on('mouseover', () => {
                myChart.setOption({
                    title: {
                        show: false
                    }
                })
            });

            myChart.on('mouseout', () => {
                myChart.setOption({
                    title: {
                        show: true,
                        text: devdata.name+'\n'+this.total+devdata.Total+this.ge
                    }
                })
            });
            window.onresize = function(){
                myChart.resize();
            }
        },
        //底部版本
        GetSystemInfo() {
            let _this = this;
            var url =_this.$store.state.IPPORT + "/api/v1/GetSystemInfo?session=" + _this.$store.state.token;
                // console.log("------------",url)
            _this.$http.get(url).then(result => {
                // console.log(result);
                if (result.status == 200) {
                    var data =  result.data;
                    var cpu=[{
                        name:this.$t("message.dashboard.version"),
                        id:data.strVersion
                    },{
                        name:this.$t("message.dashboard.hostid"),
                        id:data.strHostId
                    },{
                        name:this.$t("message.dashboard.license"),
                        id:data.strLicenseType
                    },{
                        name:this.$t("message.dashboard.channel"),
                        id:data.strChannelLimit
                    },{
                        name:this.$t("message.dashboard.endtime"),
                        id:data.strEndtime
                    }]
                    var fun=[{
                        name:this.$t("message.dashboard.devicesdk"),
                        id:data.bDeviceSDK
                    },{
                        name:this.$t("message.dashboard.transcoding"),
                        id:data.bTranscoding
                    },{
                        name:this.$t("message.dashboard.gb28181"),
                        id:data.bGB28181
                    },{
                        name:this.$t("message.dashboard.devicesdkpb"),
                        id:data.bDeviceSDKPb
                    },{
                        name:this.$t("message.dashboard.cluster"),
                        id:data.bCluster
                    },{
                        name:this.$t("message.dashboard.VideoConference"),
                        id:data.bVideoConference
                    },{
                        name:this.$t("message.dashboard.Platform"),
                        id:data.bPlatform
                    },{
                        name:this.$t("message.dashboard.Lingvideo"),
                        id:data.bLingvideo
                    },{
                        name:this.$t("message.dashboard.Docker"),
                        id:data.bDocker
                    }]
                    this.capability=cpu;
                    this.system=fun;
                    // console.log("***********",this.system)
                }
            }).catch(error => {
                console.log("GetSystemInfo");
            });
        },
        // 流量和cpu 运行时间
        GetRunInfo() {
            //url
            var url = this.$store.state.IPPORT + "/api/v1/GetRunInfo?session="+ this.$store.state.token;

            // console.log("url111",url)
            this.$http.get(url).then(result=>{
                if (result.status == 200) {
                    this.strRunTime=result.data
                    this.data.push(result.data.nNetworkInK)
                    this.data1.push(result.data.nNetworkOutK);
                    this.data2.push(result.data.nCPUUsage);
                    this.data.splice(0, 1);
                    this.data1.splice(0, 1);
                    this.data2.splice(0, 1);

                    var pieId = document.getElementById('container0');
                    var pieId1 = document.getElementById('container1');
                    if (!pieId||!pieId1){
                        return false;
                    }
                    var myChart = echarts.init(pieId)
                    var myChart1 = echarts.init(pieId1)
                    //根据窗口的大小变动图表 --- 重点
                    window.onresize = function(){
                        myChart.resize();
                        myChart1.resize();
                    }
                    this.liunv(myChart);
                    this.cpunv(myChart1);
                }
            })
        },
        liunv(myChart){
            // console.log(lengthnv,nvidiadata,l)
            // return false;
            var base = +new Date();
            var date = [];
            var _this=this;
            var oneSecond = 5000;
            for (var i = 1; i < 62; i++) {
                var now = new Date((base += oneSecond));
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            // return false;
            // 绘制图表
            var titlecol
            if(this.$store.state.darkMode){
                titlecol="#FFFFFF"
            }else{
                titlecol="#000000"
            }
            var Option={
                tooltip: {
                    trigger: 'axis',
                    position: function(pt) {
                        return [pt[0], '10%']
                    },
                    formatter:"{b0}<br />{a0}:{c0}Kbps<br />{a1}:{c1}Kbps"
                },
                title: {
                    left: 'center',
                    text: "nvidiadata[l].strName",
                    show:false,
                },
                legend: {
                        data:[ this.network_in,this.network_out],
                        icon:'rect',
                        itemWidth: 35,
                        itemHeight: 2,
                        textStyle:{
                            fontSize: 12,//字体大小
                            color: titlecol//字体颜色
                        },
                    },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: { //网格线
                        "show": false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: titlecol
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: { //网格线
                        "show": false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: titlecol,
                            // border:' 1px solid #000',
                        }
                    }
                },
                series: [{
                    name: this.network_in,
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#64C9E1'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#64C9E1'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,255,0.2)'
                            }
                        ])
                    },
                    data: this.data
                }, {
                    name: this.network_out,
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#3297FC'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#3297FC'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,255,0.2)'
                            }
                        ])
                    },
                    data: this.data1
                }, ]
            }
            // myChart.clear();
            myChart.setOption(Option)
        },
        cpunv(myChart1){
            var base = +new Date()
            var oneSecond = 5000
            var date = [];
            for (var i = 1; i <= 61; i++) {
                var now = new Date((base += oneSecond))
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            var titlecol
            if(this.$store.state.darkMode){
                titlecol="#FFFFFF"
            }else{
                titlecol="#000000"
            }
            // 绘制图表
            myChart1.setOption({
                tooltip: {
                    trigger: 'axis',
                    position: function(pt) {
                        return [pt[0], '10%']
                    },
                    formatter:"{b0}<br />{a0}:{c0}%"
                },
                title: {
                    left: 'center',
                    text: 'CPU',
                    show:false
                },
                legend: {
                        data:['CPU'],
                        icon:'rect',
                        itemWidth: 35,
                        itemHeight: 2,
                        x:"200px",
                        textStyle:{
                            fontSize: 12,//字体大小
                            color: titlecol//字体颜色
                        },
                    },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: { //网格线
                        "show": false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: titlecol
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: { //网格线
                        "show": false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: titlecol
                        }
                    }
                },
                series: [{
                    name: 'CPU',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#00FFB9'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#00FFB9'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,255,0.2)'
                            }
                        ])
                    },
                    data: this.data2
                },]
            })
        },
        // 复制
        copylink(id){
            
            var clipboard = new this.clipboard('.copy');
            //成功回调
            var _this=this;
            clipboard.on('success', function(e) {
                console.info('Action:',e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);  
                e.clearSelection();
                _this.$message(_this.$t("message.dashboard.Copysuccessful"))
            });
            //失败回调
            clipboard.on('error', function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        },
    },
    beforeDestroy() {
        clearInterval(this.timerRunInfo);
        clearInterval(this.timerRunInfo1)
    },
}
</script>

<style lang="scss" scoped>
// 首页块状背景颜色
.c-app{
    .dasboard{
        .back_g{
            background-color: #FFFFFF;
        }
        .dasboard_two{
            .dasboard_two1{
                .flex_nc_ag{
                    .flex_nc_cpu{
                        #foo{
                            color: #000;
                        }
                    }
                }
            }
        }
    }
}
.c-app.c-dark-theme{
    .dasboard{
        .back_g{
            background-color: #2C2C2C;
        }
        .dasboard_two{
            .dasboard_two1{
                .flex_nc_ag{
                    .flex_nc_cpu{
                        #foo{
                            color: #FFF;
                        }
                    }
                }
            }
        }
    }
    
}
.dasboard{
    .beibiao_zi{
        font-size:14px;
        margin: 0 10px;
        margin-bottom: 8px;
        font-family:PingFang SC;
        font-weight:550;
    }
    .back_g{
        border-radius: 2px;
        padding: 10px;
    }
    width: 100%;
    height: 100vh;
    .dasboard_global{
        width: 100%;
        height: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        border-radius: 10px;
        min-width: 993px;
        min-height: 870px;
        .dasboard_one{
            width: 100%;
            height: 69.3%;
            display: flex;
            justify-content: space-between;
            // background-color: aqua;
            .dasboard_one_left{
                width: 78%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
                .dasboard_one_lup{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    height: 49.5%;
                    .dasboard_one_lupl{
                        width: 49.8%;
                        @extend .back_g;
                    }
                    .dasboard_one_lupr{
                        width: 49.8%;
                        @extend .back_g;
                    }
                }
                .dasboard_one_ldown{
                    width: 100%;
                    height: 49.5%;
                    display: flex;
                    justify-content: space-between;
                    .dasboard_one_ldown_left{
                        width: 34.6%;
                        @extend .back_g;
                        .function_list{
                            width: 100%;
                            height: 90%;
                            display: flex;
                            justify-content: center;
                            align-content: space-around;
                            flex-wrap: wrap;
                            .function_list_content{
                                width: 40%;
                                // text-align: center;
                                span{
                                    margin-right: 5px;
                                }
                                .el-switch.is-disabled{
                                    opacity: 1;
                                }
                            }
                        }
                    }
                    .dasboard_one_ldown_right{
                        width: 100%;
                        @extend .back_g;
                        .flex_beibiao{
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            padding: 10px 20px;
                            .beibiao_zi{
                                font-size:16px;
                                font-weight:400;
                                margin: 0 10px;
                            }
                            .beibiao_zi1{
                                font-size:12px;
                                font-weight:400;
                                margin-right: 10px;
                            }
                            .beibiao_bg{
                                width: 15px;
                                height: 15px;
                                margin-right: 10px;
                                background-color: #4C80FA;
                            }
                            .beibiao_bg1{
                                width: 15px;
                                height: 15px;
                                margin-right: 10px;
                                background-color: #09C08F;
                            }
                        }
                        
                        .dasboard_one_ldown_container{
                            width: 100%;
                            height: 80%;
                            display: flex;
                            justify-content: space-between;
                            div{
                                width: 20%;
                                height: 100%;
                                div{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                }
            }
            .dasboard_one_right{
                width: 21.7%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
                .dasboard_one_rup{
                    width: 100%;
                    height: 34%;
                    @extend .back_g;
                    .nr_mory{
                        height: 80%;
                        display: flex;
                        width: 100%;
                        padding: 0 20px;
                        justify-content: space-between;
                        align-items: center;
                        text-align: center;
                    }
                }
                .dasboard_one_rin{
                    width: 100%;
                    height: 33%;
                    @extend .back_g;
                    .flex_nc_ag{
                        margin: 20px 0;
                        height:80%;
                        display: flex;
                        flex-wrap: wrap;
                        overflow-y: auto;
                        align-content: space-between;
                        .flex_nc_cpu{
                            width: 100%;
                            // height:90%;
                            .cpu_zuo{
                                font-size:14px;
                                /* font-family:PingFang SC; */
                                font-weight:400;
                                margin-right: 8px;
                                opacity:0.4;
                            }
                            .cpu_you{
                                font-size:14px;
                                /* font-family:PingFang SC; */
                                font-weight:400;
                            }
                        }
                    }
                }
                .dasboard_one_rdown{
                    width: 100%;
                    height: 11%;
                    @extend .back_g;
                    .flex_GPU{
                        width: 100%;
                        height: 50%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                }
                .dasboard_one_rdown_most{
                    width: 100%;
                    height: 20%;
                    @extend .back_g;
                    .function_list{
                        width: 100%;
                        height: 70%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-content: space-between;
                        .function_list_content{
                            width: 32%;
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }
            }
        }
        .dasboard_two{
            width: 100%;
            height: 30%;
            display: flex;
            justify-content: space-between;
            .dasboard_two1{
                width: 27%;
                @extend .back_g;
                .flex_nc_ag{
                    margin: 5px 0;
                    height:80%;
                    display: flex;
                    flex-wrap: wrap;
                    overflow-y: auto;
                    align-content: space-between;
                    .flex_nc_cpu{
                        width: 100%;
                        margin: 0 0 0 10px;
                        margin-bottom: 10px;
                        .cpu_zuo{
                            font-size:12px;
                            /* font-family:PingFang SC; */
                            font-weight:400;
                            margin-right: 8px;
                            opacity:0.4;
                        }
                        .cpu_you{
                            font-size:12px;
                            /* font-family:PingFang SC; */
                            font-weight:400;
                        }
                        #foo{
                            border: 0;
                            width: 78%;
                            background: none;
                        }
                    }
                }
            }
            .dasboard_two2{
                width: 32%;
                @extend .back_g;
                .zong_flex{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-content: space-between;
                    margin: 10px 10px;
                    .zong_mve{
                        div{
                            margin-bottom: 10px;
                        }
                        div:nth-child(1){
                            opacity: 0.4;
                        }
                    } 
                }
                .zong_img{
                    width: 100%;
                    text-align: center;
                    img{
                        width: 90%;
                    }
                }
            }
            .dasboard_two3{
                width: 40.2%;
                @extend .back_g;
                .container_sdk{
                    width: 100%;
                    height: 90%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    text-align: center;
                    .containesr_sdks{
                        width: 24%;
                        height: 100%;
                        text-align: center;
                        .sdk_back{
                            width: 100%;
                            text-align: center;
                            // padding: 45% 6px;
                            font-size:22px;
                            font-family:Arial Black;
                            font-weight:400;
                            color:#B4FFEF;
                            width: 100%;
                            height: 62%;
                            background: url('./imgs/Dashboard_shuitong.png')no-repeat center;
                            // background-size: 100%;
                            position: relative;
                        }
                        .sdk_szie{
                            padding-top: 20%;
                            width: 100%;
                        }
                    }
                
                }
            }
        }
    }
}
</style>