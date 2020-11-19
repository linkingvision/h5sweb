<template>
    <div>
        <!-- 表格 -->
        <el-table
            :data="tableData1.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
            style="width: 100%;">
            <el-table-column
                :label="label.Index"
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
            prop="name"
            :label="label.label1">
            </el-table-column>
            <el-table-column
            prop="Token"
            :label="label.Token">
            </el-table-column>
            <el-table-column
            prop="ip"
            :label="label.IP">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: center;"
            layout="prev, pager, next"
            @size-change="handleSizeChange1" 
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :total="total2">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name:"clouds",
    data(){
        return {
            activeName: 'cloud',//优先显示选项卡
            label:{
                Index:this.$t("message.table.Index"),
                label:this.$t("message.left.cloud"),//选1
                label1:this.$t("message.GB.name"),
                Token:this.$t('message.table.Token'),
                IP:this.$t('message.table.IP')
            },
            //分页
            pageSize: 10,//一页数量
            currentPage1: 1, // 当前页码
            total2: 0, // 总条数
            tableData1: []//1
        }
    },
    mounted(){
        this.loadDevice();
    },
    methods:{
        loadDevice(){
            if(this.$store.state.root=="Operator"){
                console.log("a");
                return false
            }
		    var root = this.$store.state.IPPORT;
            //url
            var url = root + "/api/v1/GetCloudDevice?session="+ this.$store.state.token;
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
                      //console.log(result);
                      var itme=result.data.dev;
                      
                      for(var i=0;i<itme.length;i++){
                          var tabledata={
                              Token:itme[i].strToken,
                              name:itme[i].strName,
                              ip:itme[i].strIp
                          };
                          this.tableData1.push(tabledata);
                      }
                      this.total2=this.tableData1.length;
				  }
			  })
        },

        //分页
        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage1 = 1;
            this.pageSize = val;
        },
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
            this.currentPage1 = val;
        }
    }
}
</script>