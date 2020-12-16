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
                    <div class="snap_you_topinterval1"> —— </div>
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
                        prop="token"
                        :label="label.Name" >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.token }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        :label="label.Token">
                            <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="starf"
                        :label="label.Time">
                            <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span>{{ scope.row.starf }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right">
                        <template slot-scope="scope">
                            <div class="snap_you_lable_butt">
                                <a :href="scope.row.url" :download="scope.row.urlto"><button type="button" style="margin-right: 40px;" class="iconfont icon-download"></button></a>
                                <button type="button" class="iconfont icon-play" @click="Refresh1(scope.$index, scope.row)" data-toggle="modal" data-target="#myModal"></button>
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
            class="dasboard_modal"
            :title="label.picture"
            :visible.sync="myModal1"
            width="25%">
            <div>{{$t("message.archive.Time")}}:{{rowstarf}}</div>
            <span slot="footer" class="dialog-footer">
                <img :src="url" class="imgmin"/>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {listdatagload,listdatag} from '../public/regional'
export default {
    
    name:"screenshots",
    data() {
        return {
            label:{
                Name:this.$t("message.table.Name"),
                Token:this.$t("message.table.Token"),
                Time:this.$t("message.table.Time"),
                Picture:this.$t("message.archive.Picture")
            },
            timelink:0,//滑块
            max:0,//滑块最大值
            value: '',
            endvalue: new Date().getTime(),
            startvalue:new Date().getTime() - 3600 * 1000 * 1,
            myModal1:false,
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
            url:""//图片地址
        }
    },
    mounted(){
    },
    methods:{
        datechange(){
            console.log(this.value)
            this.startvalue=this.value
        },
        //播放
        Refresh1(index, row){
            console.log(index, row);
            this.rowstarf=row.starf;
            this.url=row.url;
            this.myModal1=true
        },
       
        // 表格归档 下载 刷新
        
        //按钮搜索
        async getCheckedNodes() {
            this.tableData1=[];
            console.log("node值",this.$refs.tree.getCheckedNodes());
            var nodes=this.$refs.tree.getCheckedNodes();
            var srartdate=new Date(this.startvalue).toISOString()+"08:00";
            var enddate= new Date(this.endvalue).toISOString()+"08:00";
            console.log(this.endvalue,this.startvalue,srartdate,enddate)
            for(var i=0 ;i<nodes.length; i++){
                if(nodes[i].token!=undefined){
                    console.log(nodes[i].token,nodes[i].label)
                    var label=nodes[i].label
                    // return false
                    var url = this.$store.state.IPPORT + "/api/v1/Search?type=snapshot&token="+nodes[i].token+"&start="+srartdate+"&end="+enddate+"&session="+ this.$store.state.token;
                    console.log(url);
                    //return false;
                    await this.$http.get(url).then(result=>{
                        if(result.status == 200){
                            this.$message('Query successful');
                            var data=result.data;
                            for(var i=0;i<data.record.length;i++){
                                var item=data.record[i];
                                var urlto=item["strPath"].split("/");
                                var timeitem={
                                        name: item.strToken,
                                        token: label,
                                        starf : item['strStartTime'],
                                        percentage:0,
                                        url:item["strPath"],
                                        urlto:urlto[urlto.length-1],
                                        strFileName:""
                                    };
                                    this.tableData1.push(timeitem);
                            }
                            
                            this.total=this.tableData1.length;
                            console.log("length",this.total)
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
                button{
                    background: none;
                    border: none;
                    font-size: 24px;
                }
            }
        }
    }
}
.imgmin{
    width: 100%;
}
.g_flex{
    display: flex;
}
</style>