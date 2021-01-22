<template>
    <div class=liveview>
        <div id="watermarktoggle"></div>
        <!-- 左侧数据栏 -->
		<div class="liveview_left">
            <!-- <el-input
                class="liveview_left_input"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input> -->
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1" id="headswitch">
                    <template slot="title">
                        <div style="display: flex;justify-content: space-between;width: 85%; align-items: center;">
                            <div>{{$t("message.live.device")}}</div>
                        </div>
                    </template>
                    <el-tree
                        :data="data"
                        node-key="id"
                        :filter-node-method="filterNode"
                        ref="tree"
                        @node-click="handleNodeClick"
                        :props="defaultProps">
                        <span slot-scope="{ data }">
                            <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                            <!-- <img src="" alt=""> -->
                            <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                        </span>
                    </el-tree>
                </el-collapse-item>
            </el-collapse>
		</div>
		<!-- 右边视频栏 -->
      	<div class="liveview_right" id="videoPanel">
            <div class="liveview_right_but">
                <CButton class="form_butt iconfont icon-duihao" @click="Allon(true)" type="submit">全部开启</CButton>
                <CButton class="form_butt iconfont icon-jinyong" @click="Alloff(false)" type="submit">全部关闭</CButton>
                <CButton class="form_butt iconfont icon-baocun" @click="Allsave" type="submit">全部保存</CButton>
            </div>
            <el-table
                stripe
                style="width: 100%"
                :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)">
                <el-table-column
                    prop="token"
                    :label="label.Token"
                    width="230">
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="Name1"
                    width="230">
                </el-table-column>
                <el-table-column
                    width="150"
                    :label="open_Close">
                    <template slot-scope="scope">
                        <el-switch
                            @change="openchange"
                            v-model="scope.row.open_close"
                            :disabled="scope.row.disabled"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    :label="label.GBID">
                    <template slot-scope="scope">
                        <el-input @blur="openchange" v-model="scope.row.gbid" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    width="150"
                    :label="audio">
                    <template slot-scope="scope">
                        <el-switch
                            @change="openchange"
                            v-model="scope.row.audio"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    :label="save">
                    <template slot-scope="scope">
                        <div class="button_edi">
                            <el-button @click="handleEdit(scope.$index,scope.row)" type="text" class=" iconfont icon-history"></el-button>
                            <el-button @click="handledel(scope.$index,scope.row)"  class="iconfont icon-ashbin" type="text"></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                style="text-align: center;"
                layout=" prev, pager, next,total, jumper"
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :total="total">
            </el-pagination>
		</div>
    </div>
</template>

<script>
import Vue from 'vue'
import {listdatag,listdatagload,listdatag1} from '../../public/device'
export default {
    name: 'Camera',
	data(){
		return{
            filterText:"",//搜索框
            activeNames: ['1'],//左边
            open_Close:this.$t('message.camera.open_Close'),
            Name1:this.$t('message.camera.name'),
            audio:this.$t('message.camera.audio'),
            save:this.$t('message.camera.save'),
            label:{
                Token:this.$t('message.table.Token'),
                GBID:this.$t('message.table.GBID')
            },
            //分页
            currentPage: 1, // 当前页码
            total: 0, // 总条数
            pageSize: 10,//一页数量
            tableData: [],
            data:[],
            defaultProps: {
                children: 'children',
                label: 'label',
                token:"token",
                iconclass:"iconclass"
            },
            // editPopup:false,//编辑弹窗
            editform: {
                open_close:false,
                audio:false
            },
            searchTableInfo:""
		}
    },
	mounted(){
        this.loadtest();
        this.loadDevice();
        this.NumberDevice();
	},
	methods:{
        //全部开启
        async Allon(on){
            console.log('全部开启',this.tableData)
            // return
            var root = this.$store.state.IPPORT
            var tableData=this.tableData
            var open_close=on
            for(var i=0;i<tableData.length;i++){
                console.log(tableData[i].token)
                if(tableData[i].disabled){
                    return
                }
                var url1 = root + "/api/v1/DelCamera?token="+tableData[i].token+"&session="+ this.$store.state.token;
                await this.$http.get(url1).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            var tabledata={
                                name:tableData[i].name,
                                token:tableData[i].token,
                                open_close:open_close,
                                gbid:tableData[i].gbid,
                                audio:tableData[i].audio,
                                disabled:tableData[i].disabled
                            };
                            this.tableData.splice(i, 1,tabledata)
                            this.Allpublic(root,
                                tableData[i].token,
                                open_close,
                                tableData[i].gbid,
                                tableData[i].audio);
                        }
                    }
                })
            }
            
        },
        //全部关闭
        async Alloff(off){
            console.log('全部关闭')
            // return
            var root = this.$store.state.IPPORT
            var tableData=this.tableData
            var open_close=off
            for(var i=0;i<tableData.length;i++){
                console.log(tableData[i].token)
                if(tableData[i].disabled){
                    return
                }
                var url1 = root + "/api/v1/DelCamera?token="+tableData[i].token+"&session="+ this.$store.state.token;
                await this.$http.get(url1).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            var tabledata={
                                name:tableData[i].name,
                                token:tableData[i].token,
                                open_close:open_close,
                                gbid:tableData[i].gbid,
                                audio:tableData[i].audio,
                                disabled:tableData[i].disabled
                            };
                            this.tableData.splice(i, 1,tabledata)
                            this.Allpublic(root,
                                tableData[i].token,
                                open_close,
                                tableData[i].gbid,
                                tableData[i].audio);
                        }
                    }
                })
            }
        },
        //全部保存
        async Allsave(){
            console.log('全部保存')
            // return
            var root = this.$store.state.IPPORT
            var tableData=this.tableData
            for(var i=0;i<tableData.length;i++){
                console.log(tableData[i].token)
                var url1 = root + "/api/v1/DelCamera?token="+tableData[i].token+"&session="+ this.$store.state.token;
                await this.$http.get(url1).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            var tabledata={
                                name:tableData[i].name,
                                token:tableData[i].token,
                                open_close:tableData[i].open_close,
                                gbid:tableData[i].gbid,
                                audio:tableData[i].audio,
                                disabled:tableData[i].disabled
                            };
                            this.tableData.splice(i, 1,tabledata)
                            console.log(tabledata)
                            this.Allpublic(root,
                                tableData[i].token,
                                tableData[i].open_close,
                                tableData[i].gbid,
                                tableData[i].audio);
                        }
                    }
                })
            }
        },
        Allpublic(root,token,open_close,gbid,audio){
            var url=""
            if(gbid==""){
                url = root + "/api/v1/AddCamera?token="+token+"&enable="+open_close+"&audio="+audio+"&session="+ this.$store.state.token;
            }else if(gbid.length==20){
                url = root + "/api/v1/AddCamera?token="+token+"&enable="+open_close+"&audio="+audio+"&gbid="+gbid+"&session="+ this.$store.state.token;
            }else if(gbid.length==7){
                url = root + "/api/v1/AddCamera?token="+token+"&enable="+open_close+"&audio="+audio+"&session="+ this.$store.state.token;
            }
            this.$nextTick(()=>{
                console.log("----------------",url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        this.$message({
                            message: this.$t('message.camera.Save_successfully'),
                            type: 'success'
                        });
                    }
                })
            })

            this.editform["name"]=name;
            this.editform["token"]=token;
            this.editform["open_close"]=open_close;
            this.editform["audio"]=audio;
            this.editform["gbid"]=gbid;
        },
        //修改后提示
        openchange(){
            this.$message({
                message: '修改后请保存',
                type: 'warning',
                center: true
            });
        },
        //第一个表格的数据
        GetSrc(){
            var root = this.$store.state.IPPORT;
          //url
            var url = root + "/api/v1/GetSrc?session="+ this.$store.state.token;
            console.log("url111",url)
            this.$http.get(url).then(result=>{
              //console.log("a",result.data.src);
              if(result.status == 200){
                var itme=result.data.src;
                var tabledata={};
                for(var i=0;i<itme.length;i++){
                    tabledata={
                        name:itme[i].strName,
                        token:itme[i].strToken,
                        open_close:true,
                        gbid:"",
                        audio:false,
                        disabled:false
                    };
                    if(itme[i].nType!="H5_CH_DEV"){
                        // console.log(itme[i].nType)
                        tabledata["disabled"]=true;
                    }
                    this.tableData.push(tabledata);
                    this.loadSrc(tabledata,itme[i].strToken);
                  }
                  
                  this.total=this.tableData.length;
              }
            })
            
        },
        loadSrc(tabledata,token){
            var data=tabledata;
            var root = this.$store.state.IPPORT;
            var url = root + "/api/v1/GetCamera?token="+token+"&session="+ this.$store.state.token;
            // console.log(url);
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    if(result.data.bStatus==false){
                    }else{
                        var itme=result.data.cam;
                        for(var i=0; i< itme.length; i++){
                            //console.log(itme,itme[i].bEnableAudio)
                            data["open_close"]=itme[i].bEnable;
                            data["gbid"]=itme[i].strGbID;
                            data["audio"]=itme[i].bEnableAudio;
                            this.tableData.push(data);
                            for(var i=0; i<this.tableData.length; i++){
                                for(var j=i+1; j<this.tableData.length; j++){
                                    if(this.tableData[i]==this.tableData[j]){         //第一个等同于第二个，splice方法删除第二个
                                        this.tableData.splice(j,1);
                                        j--;
                                    }
                                }
                            }
                        }
                    }
                }
            })
        },
        //树形节点点击
        handleNodeClick(data, checked, indeterminate){
            this.currentPage=1
            this.tableData=[];
            var root = this.$store.state.IPPORT;
            var data =  data.children1;
            var tabledata={};
            for(var i=0; i< data.length; i++){
                console.log(data[i].nType)
                console.log(data[i].token)
                console.log(data[i].label)
                // return false;
                tabledata={
                    name:data[i].label,
                    token:data[i].token,
                    open_close:true,
                    gbid:"",
                    audio:false,
                    disabled:false
                };
                if(data[i].nType!="H5_CH_DEV"){
                    // console.log(itme[i].nType)
                    tabledata["disabled"]=true;
                }
                this.tableData.push(tabledata);
                this.loadSrc(tabledata,data[i].token);
               
            }
            this.total=this.tableData.length;
        },
        //编辑
        handleEdit(index,row){
            console.log(index,row,row.gbid.length,row.gbid);
            var index_xlh=((this.currentPage-1)*10)+index;
            //return false;
            var root = this.$store.state.IPPORT

            var url1 = root + "/api/v1/DelCamera?token="+row.token+"&session="+ this.$store.state.token;
            console.log("-****************",url1);
            this.$http.get(url1).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var tabledata={
                            name:row.name,
                            token:row.token,
                            open_close:row.open_close,
                            gbid:row.gbid,
                            audio:row.audio,
                            disabled:row.disabled
                        };
                        this.tableData.splice(index_xlh, 1,tabledata)
                        console.log(row.gbid.length)
                        var url=""
                        if(row.gbid==""){
                            console.log("&&row.open_close==true||row.audio==true");
                            url = root + "/api/v1/AddCamera?token="+row.token+"&enable="+row.open_close+"&audio="+row.audio+"&session="+ this.$store.state.token;
                        }else if(row.gbid.length==20){
                            console.log("222");
                            url = root + "/api/v1/AddCamera?token="+row.token+"&enable="+row.open_close+"&audio="+row.audio+"&gbid="+row.gbid+"&session="+ this.$store.state.token;
                        }else if(row.gbid.length==7){
                            console.log("222");
                            url = root + "/api/v1/AddCamera?token="+row.token+"&enable="+row.open_close+"&audio="+row.audio+"&session="+ this.$store.state.token;
                        }
                        
                        console.log("----------------",url);
                        this.$http.get(url).then(result=>{
                            console.log(result);
                            if(result.status==200){
                                this.$message({
                                    message: this.$t('message.camera.Save_successfully'),
                                    type: 'success'
                                });
                            }
                        })

                        this.editform["name"]=row.name;
                        this.editform["token"]=row.token;
                        this.editform["open_close"]=row.open_close;
                        this.editform["audio"]=row.audio;
                        this.editform["gbid"]=row.gbid;
                    }
                    else{
                        console.log("保存失败");
                        // return false;
                    }
                }
            })
            
        },
        //删除
        handledel(index,row){
            console.log(index,row);
            console.log("序列号",((this.currentPage-1)*10)+index);
            var index_xlh=((this.currentPage-1)*10)+index;

            var root = this.$store.state.IPPORT
            var url = root + "/api/v1/DelCamera?token="+row.token+"&session="+ this.$store.state.token;
            console.log("-****************",url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var tabledata={
                            name:row.name,
                            token:row.token,
                            open_close:true,
                            gbid:"",
                            audio:false,
                        };
                        this.tableData.splice(index_xlh, 1,tabledata);
                        this.$message({
                            message: this.$t('message.camera.Delete_successful'),
                            type: 'success'
                        });
                    }
                    else{
                        this.$message({
                            message: this.$t('message.camera.Delete_failed'),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },
        //测试机仓
        loadtest(){
            let _this =this;
            var root = this.$store.state.IPPORT;
		    //url
            var url = root + "/api/v1//GetSrcCamera?session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                if(result.status == 200){
					var data =  result.data;
                    var srcGroup = {children1: []};
                    srcGroup.label=this.$t('message.live.camera');
                    srcGroup.iconclass="iconfont icon-kaiqishexiangtou1";
                    for(var i=0; i< data.src.length; i++){
                         var item = data.src[i];
                        if(item['nOriginalType'] == 'H5_CH_GB'){
                            continue;
                        }else{
                            var newItem ={
                                    token : item['strToken'],
                                    label : item['strName'],
                                    nType : item['nType']};
                            srcGroup.children1.push(newItem);
                        }
                    }
                    this.data.push(srcGroup);
				  } 
            })

        },
        //sdk
        loadDevice() {
            var root = this.$store.state.IPPORT;
		   //url
		   var url = root + "/api/v1/GetDevice?session="+ this.$store.state.token;
            console.log("*******",url)
			  //重组
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
					  var srcData = [];
					  var data=result.data;
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var srclevel=[];
						  srclevel["strToken"]=item.strToken;
						  srclevel["strName"]=item.strName;
						  this.loadSrcdev(srclevel,srcData);
					  }
				  }
			  })
		},
        loadSrcdev(srclevel, srcData) {
            var root = this.$store.state.IPPORT;
            var url = root + "/api/v1/GetDeviceSrc?token="+ srclevel.strToken + "&session=" + this.$store.state.token;
            // console.log("*******",url)
            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = {children1: []};
                    srcGroup.label=srclevel.strName;
                    srcGroup.iconclass="iconfont icon-kaiqishexiangtou1";
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                nType : item['nType']};
                       srcGroup.children1.push(newItem);
                    }
                    this.data.push(srcGroup);
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
        },
        //数字仓机
        NumberDevice() {
            var root = this.$store.state.IPPORT;
		   //url
		   var url = root + "/api/v1/GetGbDevice?session="+ this.$store.state.token;

			  //重组
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
					  var srcData = [];
					  var data=result.data;
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var srclevel=[];
						  srclevel["strToken"]=item.strToken;
						  srclevel["strName"]=item.strName;
						  this.NumberSrc(srclevel,srcData);
					  }
				  }
			  })
		},
        NumberSrc(srclevel, srcData) {
            var root = this.$store.state.IPPORT;
            var url = root + "/api/v1/GetGbDeviceSrc?token="+ srclevel.strToken + "&session=" + this.$store.state.token;

            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = {children1: []};
                    srcGroup.label=srclevel.strName;
                    srcGroup.iconclass="iconfont icon-kaiqishexiangtou1";
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                nType : item['nType']};
                       srcGroup.children1.push(newItem);
                    }
                    this.data.push(srcGroup);
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
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
    },
    computed: {
      // 根据计算属性模糊搜索
      tableData1 () {
        const searchTableInfo = this.searchTableInfo
        if (searchTableInfo) {
          return this.tableData.filter(data => {
            console.log("success"+data)
            return Object.keys(data).some(key => {
                console.log(data[key])
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).indexOf(searchTableInfo) > -1
            })
          })
        }
        return this.tableData
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
        background: none !important;
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
    }
    .liveview_right{
        width: 84%;
        .liveview_right_but{
            height: 50px;
            display: flex;
            align-items: center;
            .form_butt{
                font-size: 12px;
                background: none;
                border-radius: 5px;
                margin-right: 10px;
                opacity: 0.9;
                &:hover{
                    border: 1px solid #3DABFF!important;
                    color: #3DABFF!important;
                }
            }
        }
        .button_edi{
            .el-button{
                font-size: 20px;
                padding: 0;
            }
        }
    }
}
</style>