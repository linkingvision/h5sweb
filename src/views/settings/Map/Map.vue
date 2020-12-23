<template>
    <div class="Map">
        <div id="map" ref="rootmap" @drop="dropTarget($event)" @dragover.prevent="dragover($event)" >
			<div class="Map_functionbut">
				<div>
					<CButton @click="Mapbox" class="map_boxbut" type="submit">
						<i class="iconfont icon-box-select" style="margin-right: 4px;"></i>
						<p id="map_boxbut" style="display: initial;">框选</p>
					</CButton>
					<CButton @click="Delcam(boxarr)" class="map_fullbut" type="submit">
						<i class="iconfont icon-ashbin"></i>
						删除
					</CButton>
					<CButton @click="FullScreen" class="map_fullbut" type="submit">
						<i class="iconfont icon-fullscreen"></i>
						全屏
					</CButton>
				</div>
				<div>
					<CButton @click="Mapview" class="map_viewbut" type="submit">
						<i class="iconfont icon-zhongmingming"></i>
						修改视野
					</CButton>
				</div>
				<div>
					<CButton @click="Delcam(features,'all')" class="map_offbut" type="submit">
						<i class="iconfont icon-ashbin"></i>
						清除配置
					</CButton>
				</div>
			</div>
			<div class="Map_Region">
				<el-collapse v-model="activeNames">
					<el-collapse-item name="1" id="headswitch1">
						<template slot="title">
							<div style="display: flex;justify-content: space-between;width: 85%; align-items: center;">
								<div>设备</div>
							</div>
						</template>
						<el-input
							class="liveview_left_input"
							placeholder="输入区域关键字"
							v-model="filterText">
						</el-input>
						<el-tree
							class="el_tree"
							node-key="strName" 
							:default-expanded-keys="['root']" 
							:filter-node-method="filterNode"
							:data="data1"
							ref="tree" 
							:props="defaultProps1">
							<span slot-scope="{data }" style="width:100%;">
								<span>
									<span class="iconfont icon-quyu"></span>
									<span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
								</span>
								<div v-if="data.cam.length!=0">
									<el-tree 
										class="el_tree1" 
										:data="data.cam" 
										:props="defaultProps1" 
										@node-click="handleNodeClick">
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
							<p id="Map_content_token" ></p>
						</div>
						<div @click='Mapplay' class="Map_content_play iconfont icon-bofang"></div>
					</div>
				</div>
			</div>
			<el-dialog
				:before-close="handleClose"
				class="dasboard_modal"
				:title="videoname"
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
import Fill from 'ol/style/Fill'
import { Point } from 'ol/geom'

import { OverviewMap, ScaleLine, MousePosition, defaults } from "ol/control";//比例尺
import {createStringXY} from 'ol/coordinate';//比例尺单位

import Overlay from "ol/Overlay";//弹窗
import { fromLonLat, transform, toLonLat ,get} from "ol/proj";//弹窗
import Extent from 'ol/interaction/Extent';

import Draw from 'ol/interaction/Draw';//框选
import {createBox} from 'ol/interaction/Draw';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
// import {defaults} from 'ol/control/util.js'

export default {
	data() {
		return {
			boxbut:true,//框选
			boxclick:true,//点击框选
			videoname:null,//视频名称
			data1:[],
			Maptoken:undefined,
			activeNames:[],//设备
			filterText:'',
			myModal:false,//弹窗
			map: null,
			x: 0,
			y: 0,
			boxarr:[],//删除数组
			coordinates: [],
			camsrc:[],
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
	//模糊查询
    watch: {
      filterText(val) {
        console.log("filter",val);
		this.$refs.tree.filter(val);
	  }
	},
	beforeDestroy() {
        this.handleClose();
	},
	created(){
		this.getcam();
		this.Regional();
	},
	mounted() {
		setTimeout(()=>{
			this.initPointMap();
		},200)
	},
	methods:{
		//删除
		async Delcam(boxarr,all){
			console.log(boxarr)
			var flagLayer=this.flagLayer
			var _this=this
			var root = this.$store.state.IPPORT;
			for(var i=0; i<boxarr.length; i++){
				console.log(boxarr[i].id_)
				var url = root + "/api/v1/MapDelCam?token="+boxarr[i].id_+"&session="+ this.$store.state.token;
				await this.$http.get(url).then(result=>{
					if(result.status == 200){
						console.log('GetMapCamList',result)
						
						if(all=='all'){
							flagLayer.getSource().removeFeature(flagLayer.getSource().getFeatureById(boxarr[i].id_))
							_this.features=[]
						}else{
							for(var l=0; l<_this.features.length; l++){
								console.log(_this.features[l].id_)
								if(_this.features[l].id_==boxarr[i].id_){
									flagLayer.getSource().removeFeature(flagLayer.getSource().getFeatureById(boxarr[i].id_))
									_this.features.splice(l,1)
									console.log(_this.features)
								}
							}
						}
					}
				}).catch(error => {
					console.log('删除摄像机', error);
				});
			}
			
		},
		//点击框选
		Mapbox(){
			var _this=this
			var style = new Style({
				fill: new Fill({
					color: 'RGBA(58,187,254, 0.4)'
				}),
				//划线的时候的图样
				stroke: new Stroke({
					color: 'rgba(255,255,255, 0.1)',
					width: 2
				}),
				image: new CircleStyle({
					radius: 5,
					stroke: new Stroke({
						color: 'rgba(96,96,96, 0.1)'
					}),
					fill: new Fill({
						color: 'rgba(96,96,96, 0.1)'
					})
				})
			});
			var layer = new VectorLayer({
				source: new VectorSource(),
				style: style
			});
			var draw = new Draw({
				source: layer.getSource(),
				type: 'Circle',
				style: style,
				geometryFunction: createBox()
			});
			var btnclick=  document.getElementById('map_boxbut')
			
			btnclick.innerText = '取消'
			_this.map.addInteraction(draw);
			draw.on('drawend',function (evt) {
				var extent = evt.feature.getGeometry().getExtent()
				//获取屏幕内的Feature _this.map.getView().calculateExtent()
				var boxarr= _this.map.getLayers().getArray()[1].getSource().getFeaturesInExtent(extent)//获取指定位置的Feature
				_this.boxarr=boxarr
				console.log(boxarr)
				_this.map.addLayer(layer);
				_this.map.removeInteraction(draw);
				// console.log(layer)
				// layer.getSource().clear();
				_this.map.removeLayer(layer);
	            btnclick.innerText = "框选"
			});
		},
		//获取摄像机
		getcam(){
			var root = this.$store.state.IPPORT;
            var url = root + "/api/v1/GetMapCamList?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
				if(result.status == 200){
					console.log('GetMapCamList',result)
					this.coordinates=result.data.cam
					this.camsrc=result.data.src
				}
			}).catch(error => {
                console.log('获取摄像机', error);
            });
		},
		//设置视野
		Mapview(){
			var zoom = this.map.getView().getZoom();  //获取当前地图的缩放级别getCenter
			var center = this.map.getView().getCenter()
			console.log(zoom,center)
			// return
			var root = this.$store.state.IPPORT;
            var url = root + "/api/v1/SetMapConf?zoom="+zoom+"&longitude="+center[0]+"&latitude="+center[1]+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
				if(result.status == 200){
					console.log(result)
					if(result.data.bStatus){
						this.$message({
                            message: result.data.strCode,
                            type: 'success'
                        });
					}else{
						this.$message({
                            message: result.data.strCode,
                            type: 'warning'
                        });
					}
				}
            }).catch(error => {
                console.log('设置视野', error);
            });
		},
		//点击设备
		handleNodeClick(data, checked, indeterminate){
			console.log(data)
			this.Maptoken=data.strToken;
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
			var videoid=$( "#Map_content_token" ).data( "token" );
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
			var resolutions = []
			for(var i=0; i<19; i++){
				resolutions[i]=Math.pow(2,18-i);
			}
			var tilegrid = new TileGrid({
				origin:[0,0],
				resolutions:resolutions
			})
			var baidu_source=new TileImage({
				porjectuon:"'EPSG:3857'",
				tileGrid:tilegrid,
				tileUrlFunction:function(tileCoord,pixelRatio,porj){
					console.log(tileCoord,pixelRatio,porj)
					if(!tileCoord){
						return "";
					}
					var z=tileCoord[0];
					var x=tileCoord[1];
					var y=-tileCoord[2];
					if(x<0){
						x='M'+(-x)
					}
					if(y<0){
						y='M'+(-y)
					}
					return "http://online2.map.bdimg.com/tile/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20200630&scaler=1";
				}
			})
			var Mapurl=JSON.parse(this.$store.state.Mapurl);
			console.log(Mapurl)
			var _this=this
			var tileLayer=''
			if(Mapurl[0].name=="高德"){
				tileLayer=[new TileLayer({
					source: new XYZ({
						title:Mapurl[0].name,
						url:Mapurl[0].url
					})
				})]
			}else if(Mapurl[0].name=="谷歌"){
				tileLayer=[new TileLayer({
					source: new XYZ({
						title:Mapurl[0].name,
						url:Mapurl[0].url
					})
				})]
			}else if(Mapurl[0].name=="天地"){
				tileLayer=[new TileLayer({
					source: new XYZ({
						title:Mapurl[0].name,
						url:Mapurl[0].url
					})
				}),new TileLayer({
					source: new XYZ({
						title:Mapurl[1].name,
						url:Mapurl[1].url
					})
				})]
			}else{
				tileLayer=[new TileLayer({
					source: new XYZ({
						title:'高德',
						url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
					})
				})]
			}
			var root = this.$store.state.IPPORT;
            var url = root + "/api/v1/GetMapConf?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
				if(result.status == 200){
					console.log(result)
					this.map = new Map({
						target: "map",
						layers: tileLayer,
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
							center: [result.data.center.strLongitude, result.data.center.strLatitude],  //坐标
							zoom: result.data.strZoom,
							// 限制缩放级别，可以和extent同用限制范围
							maxZoom: 19,
							// 最小级别，越大则面积越大
							minZoom: 4,
							zoomControl: true// 地图是否可被缩放控制
						}),
					});
					this.handleAddBatchFeature();
					this.addPopup();
					this.map.on('singleclick', this.changeXY)
					this.map.on("moveend",function(e){
						var zoom = _this.map.getView().getZoom();  //获取当前地图的缩放级别getCenter
						var center = _this.map.getView().getCenter()
						// console.log(zoom,center);
					})
				}
			}).catch(error => {
                console.log('GetSrc failed', error);
            });
		},
		/**
		 * 变换XY坐标  添加摄像机图标  关闭弹窗
 		 * @param e
		**/
		changeXY (e) {
			var closer = document.getElementById("popup-closer");
			// console.log(this.map.getFont())
			var _that = this
			_that.x = e.coordinate[0]
			_that.y = e.coordinate[1]
			console.log(_that.x, _that.y)
			if(this.Maptoken!=undefined){
				var root = this.$store.state.IPPORT;
				var url = root + "/api/v1/MapAddCam?&token="+this.Maptoken+"&longitude="+_that.x+"&latitude="+_that.y+"&session="+ this.$store.state.token;
				this.$http.get(url).then(result=>{
					if(result.status == 200){
						console.log('创建',result)
						if(result.data.bStatus){
							this.MapAddCam(_that.x,_that.y)
						}
					}
				})
			}
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
		//添加设备
		MapAddCam(x,y){
			console.log(x,y)
			var _that = this
			// 创建feature
			let feature = new Feature({
				geometry: new Point([x,y]),
			})
			// 设置ID
			feature.setId(_that.Maptoken)
			// 设置样式
			feature.setStyle(_that.getStyls(feature))
			// 放入features
			_that.features.push(feature)
			
			// 批量添加fe	ature
			_that.flagLayer.getSource().addFeatures(_that.features)
			console.log(_that.features,feature)

			this.Maptoken=undefined
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
					// console.log(feature,evt)
					if(feature[0].id_==undefined){
						return
					}
					// "EPSG:3857", "EPSG:4326" 转换
					let coordinate = transform(
						evt.coordinate,
						"EPSG:3857",
						"EPSG:4326"
					);
					for(var i=0; i<_that.camsrc.length; i++){
						
						if(feature[0].id_==_that.camsrc[i].strToken){
							document.getElementById("Map_content_token").innerHTML = _that.camsrc[i].strName;
							$( "#Map_content_token" ).data( "token" ,feature[0].id_ ); 
							_that.videoname=_that.camsrc[i].strName
						}
					}
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
			console.log(this.coordinates)
			// return
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
					geometry: new Point([_that.coordinates[i].position.strLongitude, _that.coordinates[i].position.strLatitude]),
				})
				// 设置ID
				feature.setId(_that.coordinates[i].strToken)
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
		//全屏
        FullScreen(){
            var elem = $("#map").get(0);
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
		//模糊查询
        filterNode(value, data) {
			console.log(value,data)
            if (!value) return true;
            return data.strName.indexOf(value) !== -1;
        }

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
	.Map_functionbut{
		min-width: 550px;
		position: absolute;
		top: 30px;
		right: 30px;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		div{
			padding: 4px 8px;
			background-color: RGBA(0, 0, 0, 0.8);
			button{
				font-size: 14px;
				font-family: PingFang SC;
				color: #FFFFFF;
				line-height: 20px;
				i{
					font-size: 18px;
				}
			}
		}
	}
	.Map_Region{
		position: absolute;
		top: 30px;
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
	width: 100%;
	margin: 10px 0;
	padding: 0 10px;
	line-height: 30px;
	height: 30px;
	display: flex;
	justify-content: space-between;
}
.Map_Popup_content #Map_content_token{
	width: 125px;
	margin: 0;
	overflow: hidden; white-space: nowrap; text-overflow: ellipsis
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

.ol-mouse-position{
	color: #000;
}
</style>