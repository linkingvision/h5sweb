<template>
    <div>
        <!-- 两个表格 -->
        <!-- 表格 -->
        
        <div class="All_button_edi">
            <CButton class="form_butt1" @click="exportExcel" type="submit">全部导出</CButton>
        </div>
        <el-table
            :data="tableData3.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage3-1)*pageSize,currentPage3*pageSize)"
            stripe
            style="width: 100%">
            <el-table-column
                prop="index"
                :label="label.Index"
                width="100">
            </el-table-column>
            <el-table-column
            prop="Name"
            :label="label.Name">
            </el-table-column>
            <el-table-column
            prop="IP"
            :label="label.IP"
            min-width="140">
            </el-table-column>
            <el-table-column
            prop="Port"
            :label="label.Port">
            </el-table-column>
            <el-table-column
            prop="User"
            :label="label.User">
            </el-table-column>
            <el-table-column
            prop="Online"
            :label="label.Online">
            </el-table-column>
            <el-table-column
            prop="Token"
            :label="label.Token"
            min-width="140">
            </el-table-column>
            <el-table-column
            fixed="right"
            prop="Type"
            :label="label.Type"
            min-width="140">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    @change="handlechange(scope.$index,scope.row)"
                    size="mini"
                    placeholder="输入关键字"/>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: center;"
            layout=" prev, pager, next,total, jumper"
            @size-change="handleSizeChange4" 
            @current-change="handleCurrentChange4"
            :current-page="currentPage3"
            :total="total3">
        </el-pagination>
        
    </div>
</template>
<script>
import uuid from '../../../assets/js/uuid'
import XLSX from 'xlsx'
import '../../public/xlsx.core.min'
  export default {
    data() {
      return {
        eltitle:this.$t("message.setting.Configuration"),
        search: '',//搜索
        activeName: 'H5_STREAM',//优先显示选项卡
        inputedit:[],
        label:{
            label:"H5_STREAM",//选1
            label1:"H5_ONVIF",//选2
            label2:"H5_FILE",//选2
            label3:this.$t("message.setting.all"),//选3
            
            Index:this.$t("message.table.Index"),
            Name:this.$t("message.table.Name"),
            IP:this.$t("message.table.IP"),
            Port:this.$t("message.table.Port"),
            User:this.$t("message.table.User"),
            Online:this.$t("message.table.Online"),
            Type:this.$t("message.table.Type"),
            Token:this.$t("message.table.Token")
        },
        options: [{
                value: 'H5_STREAM',
                label: 'H5_STREAM'
            }, {
                value: 'H5_ONVIF',
                label: 'H5_ONVIF'
            }, {
                value: 'H5_FILE',
                label: 'H5_FILE'
            }
        ],
        //分页
        pageSize: 10,//一页数量
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            Type:"H5_STREAM",
            Name:"Cam1",
            Token:"",
            Username:"admin",
            Password:"12345",
            URL:"rtsp://192.168.1.1/stream",
            Audio:"false",
            IP:"192.168.1.1",
            Port:"80"
        },
        editform: {
            Audio:"false"
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        
        tableData3: [],//4
        total3: 0, // 总条数 4
        currentPage3: 1, // 当前页码4
        selectop:[]//选择啦那几个
      };
    },
    mounted(){
        this.loadqb();
    },
    methods:{
        openDownloadDialog(url, saveName){
            if(typeof url == 'object' && url instanceof Blob)
            {
                url = URL.createObjectURL(url); // 创建blob地址
            }
            var aLink = document.createElement('a');
            aLink.href = url;
            aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
            var event;
            if(window.MouseEvent) event = new MouseEvent('click');
            else
            {
                event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            aLink.dispatchEvent(event);
        },
        sheet2blob(sheet, sheetName) {
            sheetName = sheetName || 'sheet1';
            var workbook = {
                SheetNames: [sheetName],
                Sheets: {}
            };
            workbook.Sheets[sheetName] = sheet;
            // 生成excel的配置项
            var wopts = {
                bookType: 'xlsx', // 要生成的文件类型
                bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                type: 'binary'
            };
            var wbout = XLSX.write(workbook, wopts);
            var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
            // 字符串转ArrayBuffer
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            return blob;
        },
        exportExcel() {
            // console.log(this.tableData3)
            var aoa =  [
                ['Index', 'Name', 'IP', 'Port','User','Online','Token','Type']
            ];//组装数组
            for (var i=0; i<this.tableData3.length; i++) {
                // console.log(this.tableData3[1])
                var data=this.tableData3[i]
                var aoadata=[data.index,data.Name,data.IP,data.Port,data.User,data.Online,data.Token,data.Type]
                aoa.push(aoadata)
            }
            console.log(aoa)
            // return
            var sheet = XLSX.utils.aoa_to_sheet(aoa);
            // sheet['!merges'] = [
            //     // 设置A1-C1的单元格合并
            //     {s: {r: 0, c: 0}, e: {r: 0, c: 2}}
            // ];
            this.openDownloadDialog(this.sheet2blob(sheet), '设备信息.xlsx');
        },
        //第四个表格的数据
        loadqb(){
          //url
          var url = this.$store.state.IPPORT + "/api/v1/GetSrc?session="+ this.$store.state.token;
          //console.log("444",url);
            this.$http.get(url).then(result=>{
              //console.log("a",result);
              if(result.status == 200){
                  var itme=result.data.src;
                  
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          index:i+1,
                          Type:itme[i].nType,
                          Name:itme[i].strName,
                          Token:itme[i].strToken,
                          User:itme[i].strUser,
                          Password:itme[i].strPasswd,
                          IP:itme[i].strSrcIpAddress,
                          Port:itme[i].strSrcPort,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          bPasswdEncrypt:itme[i].bPasswdEncrypt
                      };
                      this.tableData3.push(tabledata);
                      
                      //console.log(tabledata);
                  }
                  this.total3=this.tableData3.length;
              }
            })
        },
        
        //搜索
        handlechange(){},
        //分页
        
        handleSizeChange4(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage3 = 1;
            this.pageSize = val;
        },
        handleCurrentChange4(val) {
            console.log(`当前页: ${val}`);
            this.currentPage3 = val;
        },
        
    },
  };
</script>

<style lang="scss" scoped>
.All_button_edi{
    .form_butt1{
        background: #3ABBFE;
        border-radius: 4px;
        line-height: 15px;
        color: #FFFFFF;
    }
    margin-bottom: 10px;
}
</style>