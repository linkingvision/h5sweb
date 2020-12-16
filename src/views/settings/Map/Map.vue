<template>
    <div class="Map">
        <div id="map" ref="rootmap" @drop="dropTarget($event)" @dragover.prevent="dragover($event)" ></div>
		<div></div>
		<div class="Map_Region">
			<el-collapse v-model="activeNames">
                <el-collapse-item name="1" id="headswitch1">
                    <template slot="title">
                        <div style="display: flex;justify-content: space-between;width: 85%; align-items: center;">
                            <div>{{$t("message.live.Region")}}</div>
                            <div class="liveview_colltitle">
                                <div class="liveview_titleicon1" @click.stop="Refresh('Region')"></div>
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
                                        </div>
                                    </span>
                                </el-tree>
                            </div>
                        </span>
                    </el-tree>
                </el-collapse-item>
            </el-collapse>
		</div>
		<div id="popup" class="ol-popup">
			<a href="#" id="popup-closer" class="ol-popup-closer"></a>
			<div id="popup-content" class="popup-content">
				<div class="Map_Popup_title">
					<video class="h5video" id="Mapvideoid" autoplay webkit-playsinline playsinline></video>
				</div>
				<div class="Map_Popup_content">
					<div class="Map_content_name">
						<i class="iconfont icon-jiankong"></i>
						<p id="Map_content_token"></p>
					</div>
					<div @click='Mapplay' class="Map_content_play iconfont icon-bofang"></div>
				</div>
			</div>
		</div>
		<el-dialog
            :before-close="handleClose"
            class="dasboard_modal"
            title="实时视频"
            :visible.sync="myModal"
            width="50%">
            <div class="text-center">
                <video class="videoo" id="Mapplayvideoid"></video>
                <div class="playback_function">
					<div></div>
					<div class="playback_function_icon">
						<div class="iconfont icon-yuntai"></div>
						<div class="iconfont icon-full"></div>
					</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import '../../../assets/js/adapter'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../../../assets/js/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../../../assets/js/h5splayerhelper.js'
import "ol/ol.css";
import OSM from "ol/source/OSM";

import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Map, View, Feature } from 'ol'
import { Style, Icon } from 'ol/style'
import Text from 'ol/style/Text'
import TileImage from "ol/source/TileImage";
import TileGrid from "ol/tilegrid/TileGrid";
// import Fill from 'ol/style/Fill'
import { Point } from 'ol/geom'

import { OverviewMap, ScaleLine, MousePosition, defaults } from "ol/control";//比例尺
import {createStringXY} from 'ol/coordinate';//比例尺单位

import Overlay from "ol/Overlay";//弹窗
import { fromLonLat, transform, toLonLat } from "ol/proj";//弹窗
import Extent from 'ol/interaction/Extent';
// import {defaults} from 'ol/control/util.js'

export default {
	data() {
		return {
			data1:[],
			activeNames:['1'],//设备
			myModal:false,//弹窗
			map: null,
			x: 0,
			y: 0,
			coordinates: [
				{
					x: 112.87197876066057,
					y: 28.22084712811648,
					token:'29ac--33'
				},
				{
					x: 112.8720016491825,
					y: 28.225383281160706,
					token:'29ac--34'
				},
				{
					x: 112.87314605792562,
					y: 28.228450298111515,
					token:'29ac--35'
				},
				{
					x: 112.87527465926178,
					y: 28.23101377452122,
					token:'29ac--36'
				},
				{
					x: 112.87994384801641,
					y: 28.232203960351857,
					token:'3a15'
				},
			],
			defaultProps1: {
                children: 'node',
                label: 'strName',
                cam:"cam"
            },
			features: [],
			flagLayer: null,
			h5handler:undefined
		};
	},
	mounted() {
		this.initPointMap();
		this.handleAddBatchFeature();
		this.addPopup();
		this.Regional();
		this.map.on('singleclick', this.changeXY)
	},
	methods:{
		//点击设备
		handleNodeClick(data, checked, indeterminate){
            console.log(data)
        },
		//拖动设备
        dragStart(ev,token,label,streamprofile,name,disabled_me){
            // console.log(ev,token,label,streamprofile,name,disabled_me,"124");
            var drag={
                token:token,
                label:label,
                streamprofile:streamprofile,
                name:name,
                disabled_me:disabled_me,
            }
            ev.dataTransfer.setData("Text",ev.target.id);
		},
		dragover (ev) {
            // console.log(ev,"123",ev.target.id)
            // ev.preventDefalut()
        },
        dropTarget (ev) {
			var _this=this
			_this.map.on('singleclick', _this.changeXY)
            // console.log(ev)
        },
		//地图弹窗播放
		Mapplay(){
			var videoid=document.getElementById('Map_content_token').innerHTML
			this.myModal=true
			console.log('aaa',videoid)
			this.$nextTick(()=>{
				if (this.h5handler != undefined)
					{
						this.h5handler.disconnect();
						delete this.h5handler;
						this.h5handler = undefined;
					}
					let conf = {
						videoid:'Mapplayvideoid',
						protocol: window.location.protocol, //http: or https:
						host: this.$store.state.WSROOT, //localhost:8080
						streamprofile: 'main', // {string} - stream profile, main/sub or other predefine transcoding profile
						rootpath: '/', // '/'
						token: videoid,
						hlsver: 'v1', //v1 is for ts, v2 is for fmp4
						session: this.$store.state.token //session got from login
					};
					if (this.$store.state.liveviewrtc == 'RTC' || (H5siOS() === true)){
						this.h5handler = new H5sPlayerRTC(conf);
					}else{
						this.h5handler = new H5sPlayerWS(conf);
					}
					this.h5handler.connect();
			})
		},
		//关闭
        handleClose(){
			if (this.h5handler != undefined)
			{
				this.myModal=false
				this.h5handler.disconnect();
				delete this.h5handler;
				this.h5handler = undefined;
			}
        },
		//创建地图
		initPointMap() {
			// var Extent = new Extent();
			// var Interaction = new defaults().extend([new DragRotateAndZoom()])
			this.map = new Map({
				target: "map",
				layers: [
					new TileLayer({
						// source: new OSM()https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}
						source: new XYZ({
							url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
						})
						// source: new XYZ({
						// 	url:'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
						// })
					})
				],
				controls: defaults().extend([
					// 添加一个鹰眼控件
					new OverviewMap({
						// 实例化一个OverviewMap类的对象，并加入到地图中
						collapsed: false,
						view: new View({
							projection: "EPSG:4326",
							center: [112.87, 28.23],
						}),
						layers: [
							new TileLayer({
								source: new XYZ({
									url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
								})
							})
						]
					}),
					// 添加比例尺
					new ScaleLine({
						units: "metric"
					}),
					new MousePosition({
						coordinateFormat: createStringXY(6), // 保留6位小数位
					})
				]),
				view: new View({
					projection: "EPSG:4326",    //坐标系
					center: [112.87, 28.23],  //坐标
					zoom: 9,
					// 限制缩放级别，可以和extent同用限制范围
					maxZoom: 19,
					// 最小级别，越大则面积越大
					minZoom: 4,
					zoomControl: true// 地图是否可被缩放控制
				}),
				// Interaction:[Interaction]
			});
		},
		/**
		 * 变换XY坐标
		 * @param e
		**/
		changeXY (e) {
			var closer = document.getElementById("popup-closer");
			// console.log(this.map.getFont())
			const _that = this
			_that.x = e.coordinate[0]
			_that.y = e.coordinate[1]
			console.log(_that.x, _that.y)
			if (!_that.map.hasFeatureAtPixel(e.pixel)) {
				if (_that.h5handler != undefined)
				{
					_that.h5handler.disconnect();
					delete _that.h5handler;
					_that.h5handler = undefined;
				}
				document.getElementById('Map_content_token').innerHTML=''
				_that.overlay.setPosition(undefined);
				closer.blur();
				return false;
			}
		},
		//点击显示弹窗
		addPopup(x,y) {
            // 使用变量存储弹窗所需的 DOM 对象
            var container = document.getElementById("popup");
            var closer = document.getElementById("popup-closer");
            var content = document.getElementById("popup-content");

            // 创建一个弹窗 Overlay 对象
            this.overlay = new Overlay({
                element: container, //绑定 Overlay 对象和 DOM 对象的
                autoPan: true, // 定义弹出窗口在边缘点击时候可能不完整 设置自动平移效果
                autoPanAnimation: {
                    duration: 250 //自动平移效果的动画时间 9毫秒
                }
            });
            // 将弹窗添加到 map 地图中
            this.map.addOverlay(this.overlay);
            let _that = this;
            /**
             * 添加单击响应函数来处理弹窗动作
             */
            this.map.on("click", function(evt) {
				if (_that.map.hasFeatureAtPixel(evt.pixel)) {
					var feature = _that.map.getFeaturesAtPixel(evt.pixel)
					console.log(feature,evt)
					// "EPSG:3857", "EPSG:4326" 转换
					let coordinate = transform(
						evt.coordinate,
						"EPSG:3857",
						"EPSG:4326"
					);
					document.getElementById("Map_content_token").innerHTML = feature[0].id_;
					if (_that.h5handler != undefined)
					{
						_that.h5handler.disconnect();
						delete _that.h5handler;
						_that.h5handler = undefined;
					}
					let conf = {
						videoid:'Mapvideoid',
						protocol: window.location.protocol, //http: or https:
						host: _that.$store.state.WSROOT, //localhost:8080
						streamprofile: 'main', // {string} - stream profile, main/sub or other predefine transcoding profile
						rootpath: '/', // '/'
						token: feature[0].id_,
						hlsver: 'v1', //v1 is for ts, v2 is for fmp4
						session: _that.$store.state.token //session got from login
					};
					if (_that.$store.state.liveviewrtc == 'RTC' || (H5siOS() === true)){
						console.log(_that.$store.state.liveviewrtc)
						_that.h5handler = new H5sPlayerRTC(conf);
					}else{
						console.log(_that.$store.state.liveviewrtc)
						_that.h5handler = new H5sPlayerWS(conf);
					}
					_that.overlay.setPosition(evt.coordinate); //把 overlay 显示到指定的 x,y坐标
					
				}
			});
			
            /**
             * 为弹窗添加一个响应关闭的函数
             */
            closer.onclick = function() {
				if (_that.h5handler != undefined)
				{
					_that.h5handler.disconnect();
					delete _that.h5handler;
					_that.h5handler = undefined;
				}
				document.getElementById('Map_content_token').innerHTML
                _that.overlay.setPosition(undefined);
                closer.blur();
                return false;
            };
		},
		
		handleAddBatchFeature () {
			const _that = this
			// 设置图层
			_that.flagLayer = new VectorLayer({
				source: new VectorSource()
			})
			// 添加图层
			_that.map.addLayer(_that.flagLayer)
			// 循环添加feature
			for (let i = 0; i < this.coordinates.length; i++) {
				// 创建feature
				let feature = new Feature({
					geometry: new Point([_that.coordinates[i].x, _that.coordinates[i].y]),
					name: '北京市',                         //名称属性
            		population: 2115  
				})
				// 设置ID
				console.log(feature.name)
				feature.setId(_that.coordinates[i].token)
				// 设置样式
				feature.setStyle(_that.getStyls(feature))
				// 放入features
				_that.features.push(feature)
			} // for 结束
			// 批量添加fe	ature
			_that.flagLayer.getSource().addFeatures(_that.features)
		},
		/**
		 * 设置Style
		 */
		getStyls (feature) {
			let Styles = []
			Styles.push(
				new Style({
					image: new Icon({
						src: 'http://localhost:8080/img/dev.png',
						anchor: [0.5, 1]
					}),
				})
			)
			// 绘制圆角矩形
			let canvas = document.createElement('canvas')
			let context = canvas.getContext('2d')
			let length = (feature.id_ + '标记点').length + 1
			canvas.width = length * 15
			canvas.height = 35
			let x = 0
			let y = 0
			let w = canvas.width
			let h = canvas.height
			let r = 15
			// 缩放
			context.scale(0.8, 0.8)
			context.fillStyle = 'rgba(255,255,255,1)'
			// 绘制圆角矩形
			context.beginPath()
			context.moveTo(x + r, y)
			context.arcTo(x + w, y, x + w, y + h, r)
			context.arcTo(x + w, y + h, x, y + h, r)
			context.arcTo(x, y + h, x, y, r)
			context.arcTo(x, y, x + w, y, r)
			// 设置阴影
			context.shadowColor = 'rgba(0, 0, 0, 0.2)' // 颜色
			context.shadowBlur = 5 // 模糊尺寸
			context.shadowOffsetX = 2 // 阴影Y轴偏移
			context.shadowOffsetY = 2 // 阴影X轴偏移
			// ----
			context.closePath()
			// 填充
			context.fill()
			// 设置style
			/**Styles.push(
				new Style({
					image: new Icon({
						img: canvas,
						imgSize: [w, h],
						anchor: [0, 1]
					}),
					text: new Text({
						textAlign: 'center',
						token:'100',
						text: '标记点' + feature.id_,
						offsetX: 28,
						offsetY: -17
					})
				})
			)*/
			// console.log(Styles)
			return Styles
		},
		//刷新
        Refresh(type){
			this.data1=[];
			this.Regional();
        },
		//区域
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
            // var nodecam=[{
            //     strName:"cam",
            //     node:arr.cam,
            // },{
                
            // }]
            if(arr.node && arr.node.length>0){
                for (var i = 0; i < arr.node.length; i++) {
                    arr.node[i] = this.getchild(arr.node[i],arr1);
                }
            }
            return arr;
        },

	}
}
</script>

<style lang="scss" scoped>
.Map{
	width: 100%;
	height: 100%;
	position: relative;
	#map{
		height:100%;
		.ol-popup {
			width: 200px;
			min-height: 150px;
			position: absolute;
			-webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
			filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
			// padding: 15px;
			border-radius: 10px;
			border: 1px solid #cccccc;
			bottom: 12px;
			left: -100px;
			background-color: #67686A;
			border-radius: 10px;
			&:after,&:before {
				top: 100%;
				border: solid transparent;
				content: " ";
				height: 0;
				width: 0;
				position: absolute;
				pointer-events: none;
			}
			&:after {
				border-top-color: #67686A;
				border-width: 10px;
				left: 100px;
				margin-left: -10px;
			}
			&:before {
				border-top-color: #67686A;
				border-width: 11px;
				left: 100px;
				margin-left: -11px;
			}
			.ol-popup-closer {
				text-decoration: none;
				position: absolute;
				top: 2px;
				right: 8px;
				z-index: 2;
				&:after {
					content: "✖";
				}
				.popup-content {
					width: 100%;
					
				}
			}
		}
		
	}
	.Map_Region{
		position: absolute;
		top: 20px;
		left: 30px;
		z-index: 10;
	}
	.dasboard_modal .el-dialog{
			margin-top: 18vh;
        .playback_function{
            display: flex;
            justify-content: space-between;
			.playback_function_icon{
				display: flex;
				div{
					margin-right: 10px;
				}
			}
        }
        .videoo{
            object-fit: fill;
			width: 100%;
			height: 100%
        }
    }
}
</style>
<style>
.Map_Popup_title{
	width: 100%;
	height: 110px;
	background-color: #000;
}
.Map_Popup_title .h5video{
	object-fit: fill;
	width: 100%;
	height: 100%
}
.Map_Popup_content{
	margin: 10px 0;
	padding: 0 10px;
	line-height: 30px;
	height: 30px;
	display: flex;
	justify-content: space-between;
}
.Map_content_name{
	width: 90%;
	display: flex;
	color: #FFFFFF;
}
.Map_content_play{
	color: #FFFFFF;
}
.Map_content_name i{
	border-radius: 50px;
	padding: 0 7px;
	background-color: #3E3E40;
	color: #2D9BF4;
	margin-right: 5px;
}
/* 比例尺 */
.ol-zoom {
	bottom: 0.5em !important;
	right: 0.5em;
	top: auto;
    left: auto;
}
.ol-scale-line {
	left: 180px !important;
}
</style>