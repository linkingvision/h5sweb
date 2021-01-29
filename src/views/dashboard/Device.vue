<template>
    <div class="Dashboard_Device">
        <div class="container_co">
            <div class="container" v-for="(a,index) in 8" :key="index">
                <div class="flex_beibiao">
                    <div class="beibiao_zi" v-if="devdata">
                        <img src="../imgs/Dashboard_icon.png"/>
                        <span>{{devdata[index].name}}</span>
                    </div>
                    <div style="display: flex;">
                        <div class="beibiao_zi1">{{Online}}</div>
                        <div class="beibiao_bg"></div>
                        <div class="beibiao_zi1">{{Offline}}</div>
                        <div class="beibiao_bg1"></div>
                    </div>
                </div>
                <div class="flex_beisdk">
                    <div :id="'devicesdk'+index" class="beisdk"></div>
                    <div class="tit_sdk" v-if="devdata">
                        <div>{{devdata[index].name}}</div>
                        <div>{{total}}{{devdata[index].Total}}{{ge}}</div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    name: "device",
    data() {
        return {
            dev:{},
            devdata:"",
            Hikvision:this.$t("message.dashboard.Hikvision"),
            Dahua:this.$t("message.dashboard.Dahua"),
            Tiandy:this.$t("message.dashboard.Tiandy"),
            Uniview:this.$t("message.dashboard.Uniview"),

            total:this.$t("message.dashboard.total"),
            ge:this.$t("message.dashboard.ge"),

            Online:this.$t("message.dashboard.Online"),
            Offline:this.$t("message.dashboard.Offline")
        }
    },
    beforeDestroy() {
        clearInterval(this.timerRunInfo1);
    },
    mounted(){
        this.GetDeviceSummary();
        this.timerRunInfo1 = setInterval(() => {
            this.GetDeviceSummary();
        }, 60000*5);
        var _this=this
        _this.$root.bus.$on('skintoggle', function(a){
            console.log("更换皮肤",a)
            _this.GetDeviceSummary();
        });
    },
    methods:{
        //设备
        GetDeviceSummary(){
            var root = this.$store.state.IPPORT;
            //url
            var num=0;
            var url = root + "/api/v1/GetDeviceSummary?session="+ this.$store.state.token;
            // console.log("----------",url)
            this.$http.get(url).then(result=>{
                if (result.status == 200) {
                    console.log("----------",url,result)
                    // this.dev=result.data;
                    var data=result.data;
                    for(var i in data){
                    　　num++;
                    }
                    var devdata=[{
                            name:this.Hikvision,
                            Total:data.nHikDevTotal,
                            Online:data.nHikDevOnline
                        },{
                            name:this.Dahua,
                            Total:data.nDhDevTotal,
                            Online:data.nDhDevOnline
                        },{
                            name:"iSecure Center",
                            Total:data.nHikIscDevTotal,
                            Online:data.nHikIscDevOnline
                        },{
                            name:this.Tiandy,
                            Total:data.nTdDevTotal,
                            Online:data.nTdDevOnline
                        },{
                            name:"GB",
                            Total:data.nGbDevTotal,
                            Online:data.nGbDevOnline
                        },{
                            name:this.Uniview,
                            Total:data.nUnvDevTotal,
                            Online:data.nUnvDevOnline
                        },{
                            name:"DSS",
                            Total:data.nDssDevTotal,
                            Online:data.nDssDevOnline
                        },{
                            name:"IVS1800",
                            Total:data.nIvs1800DevTotal,
                            Online:data.nIvs1800DevOnline
                    }];
                    
                    this.devdata=devdata
                    for(var i=0;i<devdata.length;i++){
                        this.devimage(devdata[i],i);
                    }
                    // console.log(data)
                }
            })
        },
        //海康
        devimage(devdata,leng){
            // console.log(devdata,leng,'devive'+leng);
            var pieId=document.getElementById("devicesdk"+leng)
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
                    radius: ['54%', '70%'],
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
                                fontWeight: 'bold'
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
                                color: '#09C08F'
                            }
                        },
                        {
                            value: devdata.Total-devdata.Online,
                            name: this.Offline,
                            itemStyle: {
                                color: '#4C80FA'
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
        }
    }
}
</script>

<style lang="scss" scoped>
.Dashboard_Device{
    min-height: 860px;
    .container_co{
        margin-top: 10px;
        width: 100%;
        /* display: flex; */
        /* flex-wrap: wrap;
        justify-content: space-between; */
        padding: 0 10px;
        box-sizing: border-box;
        .container{
            width: 24%;
            padding: 10px 10px 30px 10px;
            display: flex;
            display: inline-block;
            flex-wrap: wrap;
            margin-bottom: 10px;
            margin-left: 0.6%;
            border-radius: 10px;
            .flex_beibiao{
                width: 100%;
                height: 10%;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                padding: 10px 0;
                .beibiao_zi{
                    font-size:16px;
                    font-weight:400;
                    margin: 0 10px;
                    // color:rgba(51,51,51,1);
                }
                .beibiao_zi1{
                    font-size:12px;
                    font-weight:400;
                    margin-right: 10px;
                    // color:rgba(51,51,51,1);
                }
                .beibiao_bg{
                    width: 15px;
                    height: 15px;
                    margin-right: 10px;
                    background-color: #09C08F;
                }
                .beibiao_bg1{
                    width: 15px;
                    height: 15px;
                    margin-right: 10px;
                    background-color: #4C80FA;
                }

            }
            .flex_beisdk{
                width: 100%;
                height: 80%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .beisdk{
                    width: 50%;
                    height: 200px;
                    min-width: 160px;
                }
                .tit_sdk{
                    width: 50%;
                    padding-top: 70px;
                    padding-left: 6%;
                }
                .tit_sdk div:nth-child(1){
                    margin-bottom: 10px;
                    font-size:16px;
                    font-family:PingFang SC;
                    font-weight:500;
                    // color:rgba(51,51,51,1);
                }
                .tit_sdk div:nth-child(){
                    font-size:14px;
                    font-family:PingFang SC;
                    font-weight:400;
                    // color:rgba(51,51,51,1);
                }
            }
        }
    }
}
</style>
