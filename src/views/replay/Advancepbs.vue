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
            <div id="video_hed">
                <div name='flex' style="position: relative;" class="videoColor" v-for="r in rows" :key="r">
                    <div
                        @click="videoClick(r,c)"
                        class="palace" 
                        name="flex" 
                        v-for="c in cols"
                        :key="c">
                        <v-Avintercomsplay 
                            v-bind:id="'h'+r+c" 
                            :h5id="'h'+r+c" 
                            :h5videoid="'payback'+r+c"
                            :rows="rows" 
                            :cols="cols" >
                        </v-Avintercomsplay>
                    </div>
                </div>
            </div>
            <div class="caveat_butt" style="">
                <button @click="aaa" class="mr-1" type="button"></button>{{$t("message.archive.ManualRecord")}}
                <button class="mr-2" type="button"></button>{{$t("message.archive.AlarmRecord")}}
            </div>
        </div>
    </div>
</template>

<script>
import '../../assets/js/adapter'
import {listdatag} from '../public/regional'
import Avintercomsplay from './Avintercoms/Avintercomsplay'
export default {
    name:"Advancepbs",
    components: {
        'v-Avintercomsplay': Avintercomsplay
    },
    data() {
        return {
            rows: 3,
			cols: 3,
            v1:undefined,
            value: '',
            defaultProps: {
                children: 'children',
                label: 'label',
                token:"token",
                iconclass:"iconclass"
            },
            filterText: '',
            data: listdatag,
            selectCol: 1,
			selectRow: 1,
        }
    },
    mounted(){
        this.updateUI();
    },
    methods:{
        
        aaa(){
            let vid = 'h' + this.$data.selectRow + this.$data.selectCol;
            this.$root.bus.$emit('playback',vid);
        },
        //点击宫格
		videoClick(r, c) {
            this.selectCol = c;
            this.selectRow = r;
            console.log(r, c);
        },
        // ui宽度
		updateUI() {
            if($(document.body).width() < 768)
            {
                this.contentHeight = $(document.body).height()*0.4;
            }else
            {
                this.contentHeight = $(document.body).height()*0.72;
            }
            $('div[name="flex"]').height(this.contentHeight / this.rows);
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
        #video_hed{
            border-bottom: 1px solid black;
            .videoColor {
                .palace{
                    background-size: 10%;
                    flex: 1 1 10%;
                    border: 1px solid black;
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
        }
        .caveat_butt{
            display: flex;align-items:center;width:11%;min-width: 180px;
            .mr-1{
                width: 15px;
                height: 15px;
                border-radius: 50px;
                border: 0;
                margin: 0 5px;
                vertical-align:middle;
                background-color: rgb(60,196,60);
            }
            .mr-2{
                width: 15px;
                height:15px;
                border-radius: 50px;
                border: 0;
                margin: 0 5px;
                vertical-align:middle;
                background-color: rgb(238,17,17);
            }
        }
    }
}

.g_flex{
    display: flex;
}
</style>