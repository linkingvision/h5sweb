<template>
  <div class="liveview">
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
            <div
              style="
                display: flex;
                justify-content: space-between;
                width: 85%;
                align-items: center;
              "
            >
              <div>{{ $t("message.live.device") }}</div>
            </div>
          </template>
          <el-tree
            :data="data"
            node-key="id"
            :filter-node-method="filterNode"
            ref="tree"
            @node-click="handleNodeClick"
            :props="defaultProps"
          >
            <span slot-scope="{ data }">
              <span
                :class="data.iconclass"
                style="color: rgb(142, 132, 132)"
              ></span>
              <!-- <img src="" alt=""> -->
              <span :class="data.iconclass1" style="padding-left: 4px">{{
                data.label
              }}</span>
            </span>
          </el-tree>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 右边视频栏 -->
    <div class="liveview_right" id="videoPanel">
      <div class="liveview_right_but">
        <CButton
          class="form_butt iconfont icon-duihao"
          @click="Allon(true)"
          type="submit"
          >全部开启</CButton
        >
        <CButton
          class="form_butt iconfont icon-jinyong"
          @click="Alloff(false)"
          type="submit"
          >全部关闭</CButton
        >
        <CButton
          class="form_butt iconfont icon-jinyong"
          @click="Allpart(false)"
          type="submit"
          >禁用离线</CButton
        >
        <CButton
          class="form_butt iconfont icon-baocun"
          @click="Allsave"
          type="submit"
          >全部保存</CButton
        >
        <CButton class="addChannelSloganBtn" @click="addChdialog" type="submit"
          >修改通道号</CButton
        >
        <!-- <el-button
          class="addChannelSloganBtn form_butt"
          type="primary"
          @click="AddChannelSloganDialog = true"
          >修改通道号</el-button
        > -->
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="正在保存中"
        element-loading-background="rgba(0, 0, 0, 0)"
        stripe
        style="width: 100%"
        :data="
          tableData1
            .filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase()) ||
                data.token.toLowerCase().includes(search.toLowerCase())
            )
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
      >
        <el-table-column prop="token" :label="label.Token" width="230">
        </el-table-column>

        <el-table-column prop="name" :label="Name1" width="230">
        </el-table-column>
        <el-table-column prop="ChannelNumber" width="150" label="通道号">
        </el-table-column>

        <el-table-column width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="changeChannelSlogan(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>

        <el-table-column width="150" :label="open_Close">
          <template slot-scope="scope">
            <el-switch
              @change="openchange"
              v-model="scope.row.open_close"
              :disabled="scope.row.disabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="label.GBID">
          <template slot-scope="scope">
            <el-input
              @blur="openchange"
              v-model="scope.row.gbid"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column width="150" :label="audio">
          <template slot-scope="scope">
            <el-switch
              @change="openchange"
              v-model="scope.row.audio"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              @change="handlechange(scope.$index, scope.row)"
              size="mini"
              placeholder="输入关键字"
            />
          </template>
          <template slot-scope="scope">
            <div class="button_edi">
              <el-button
                @click="handleEdit(scope.$index, scope.row)"
                type="text"
                class="iconfont icon-baocun"
              ></el-button>
              <el-button
                @click="handledel(scope.$index, scope.row)"
                class="iconfont icon-ashbin delete-icon"
                type="text"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="text-align: center"
        layout=" prev, pager, next,total, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 添加通道口号弹窗 -->
    <el-dialog
      title=""
      :visible.sync="AddChannelSloganDialog"
      class="addChannelSlogan"
    >
      <div slot="title">
        <div
          style="
            border-bottom: 2px solid #37bcff;
            width: 140px;
            text-alight: cnter;
          "
        >
          <span
            style="
              display: block;
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 500;
              text-align: center;
            "
            >添加通道号</span
          >
        </div>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 110px;
        "
      >
        <div>
          <span style="font-size: 16px; margin-right: 15px">通道编号</span>
          <div slot="footer" style="display: inline">
            <CButton
              class="EditChannelSloganBtn1"
              @click="addpartsCh()"
              type="submit"
              >局部更新</CButton
            >
            <CButton class="EditChannelSloganBtn" @click="addCh()" type="submit"
              >全部更新</CButton
            >
          </div>
          <el-input
            type="text"
            placeholder="(输入最小值为1)"
            style="
              width: 30%;
              margin-left: 15px;
              text-align: center;
              display: none;
            "
            v-model="chinput"
            ref="chNumber"
          ></el-input>
          <span style="margin-left: 15px; display: none">----</span>
          <el-input
            type="text"
            placeholder="(最大值为20000)"
            style="width: 30%; margin-left: 15px; display: none"
            v-model="chinput2"
            ref="chNumber2"
          ></el-input>
        </div>
      </div>
      <div style="height: 550px">
        <el-table
          class="addChannelSloganTable"
          :data="
            tableData3.slice(
              (currentPage2 - 1) * pageSize2,
              currentPage2 * pageSize2
            )
          "
          stripe
          style="
            width: 100%;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            height: 532px;
          "
        >
          <el-table-column
            label="通道号"
            width="140"
            style="background: #353535"
            prop="nCh"
          >
          </el-table-column>
          <el-table-column label="编号" prop="strToken" width="240">
          </el-table-column>
          <el-table-column
            label="国标"
            width="240"
            prop="strGbID"
          ></el-table-column>
          <el-table-column width="140" label="开启/关闭">
            <template slot-scope="scope">
              <el-switch
                @change="openchange"
                v-model="scope.row.bEnable"
                :disabled="scope.row.disabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column width="140" label="音频">
            <template slot-scope="scope">
              <el-switch
                @change="openchange"
                v-model="scope.row.bEnableAudio"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="text-align: center">
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          layout="total,  prev, pager, next, jumper"
          :page-size="10"
          :total="zongyeshu"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 通道号编辑弹窗 -->
    <el-dialog
      title=""
      :visible.sync="EditChannelSloganDialog"
      class=""
      @close="downeditdialog"
    >
      <div slot="title">
        <div style="display: flex; align-items: flex-start">
          <div>
            <span style="font-size: 16px">选择通道号模式</span>
            <el-select
              style="width: 50%; margin-left: 15px"
              placeholder="64"
              v-model="valuech"
              @change="onSelecteCh(valuech)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div>
            <span style="font-size: 16px">通道号当前值</span>
            <el-input
              style="width: 50%; margin-left: 15px"
              v-model="chNowNumber"
            ></el-input>
          </div>
        </div>
      </div>

      <div class="EditChannelSloganDialogTabs">
        <el-tabs
          :tab-position="tabPosition"
          style="height: 600px"
          @tab-click="handleClick"
          v-model="activeName"
        >
          <el-tab-pane v-for="(v, i) in editchnumer" :key="i" :label="v" :name="v">
            <div slot="label" ref="chnumermoshi" style="text-algin: center">
              <span style="font-size: 20px">{{ v }}</span>
            </div>
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
              "
            >
              <div
                style="
                  width: 12%;
                  line-height: 70px;
                  text-align: center;
                "
                v-for="(value, index) in editchnumers" :key="index"
                
              >
                <span style="font-size: 20px; cursor: pointer" :id="value" ref="nowchnumber" @click="editchanumber(value)">{{
                  value
                }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <CButton
          @click="EditChannelSloganDialog = false"
          class="EditChannelSloganBtn1"
          type="submit"
          >取 消</CButton
        >
        <CButton
          @click="editchaumbersure()"
          class="EditChannelSloganBtn"
          type="submit"
          >确 认</CButton
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Camera",
  data() {
    return {
      search: "", //搜索
      filterText: "", //搜索框
      activeNames: ["1"], //左边
      open_Close: this.$t("message.camera.open_Close"),
      Name1: this.$t("message.camera.name"),
      audio: this.$t("message.camera.audio"),
      save: this.$t("message.camera.save"),
      label: {
        Token: this.$t("message.table.Token"),
        GBID: this.$t("message.table.GBID"),
      },
      activeName: "1~64",
      //分页
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, //一页数量
      tableData: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
        token: "token",
        iconclass: "iconclass",
      },
      // editPopup:false,//编辑弹窗
      editform: {
        open_close: false,
        audio: false,
      },
      searchTableInfo: "",
      loading: false,

      tableData2: [],
      tableData3: [],
      tableData4: [],
      AddChannelSloganDialog: false,
      tabPosition: "left",
      EditChannelSloganDialog: false,
      changeNumber: [],
      chnumber: [],
      chinput: "",
      chinput2: "",

      editchnumer: [],
      editchnumers: [],

      chNowNumber: "",

      currentPage2: 1, // 当前页码
      zongyeshu: 0, // 总条数
      pageSize2: 10,
      options: [
        {
          value: "64",
        },
        {
          value: "128",
        },
        {
          value: "256",
        },
        {
          value: "512",
        },
        {
          value: "1024",
        },
      ],
      valuech: 64,
      partsUpdate: [],
      arrchannel: [],
      num1: "",
      deltetoken: "",
      addch2: [],
      edittableData: [],
      threevideo: [],
      channeledit: [],
      chedit: [],
    };
  },
  mounted() {
    this.loadtest();
    this.loadDevice();
    this.NumberDevice();
  },
  methods: {
    sortNumber(a, b) {
      return a.nCh - b.nCh;
    },
    // 打开添加通道号弹窗
    addChdialog() {
      this.AddChannelSloganDialog = true;
      var root = this.$store.state.IPPORT;
      // console.log(this.tableData3);
      // url
      var url = root + "/api/v1//GetCamera?session=" + this.$store.state.token;
      this.$http.get(url).then((result) => {
        // console.log("a", result);
        if (result.status == 200) {
          this.tableData3 = result.data.cam;
          // console.log(this.tableData3);
          this.zongyeshu = this.tableData3.length;
          this.tableData3 = result.data.cam.sort(
            (pre, cur) => pre.nCh - cur.nCh
          );
        }
      });
    },
    // 全部更新
    async addCh() {
      this.tableData2 = [];
      var root = this.$store.state.IPPORT;
      var url =
        root + "/api/v1/GetSrc?session=" + (await this.$store.state.token);
      this.$http
        .get(url)
        .then((result) => {
          console.log("a", result);
          if (result.status == 200) {
            var itme = result.data.src;
            // console.log(itme);
            var tabledata = {};
            for (var i = 0; i < itme.length; i++) {
              tabledata = {
                name: itme[i].strName,
                token: itme[i].strToken,
                open_close: true,
                gbid: "",
                audio: false,
                disabled: false,
                ChannelNumber: itme[i].nChannelNumber,
              };
              if (itme[i].nType != "H5_CH_DEV") {
                // console.log(itme[i].nType)
                tabledata["disabled"] = true;
              }
              // console.log(this.tableData2);
              this.tableData2.push(tabledata);
              // console.log(this.tableData2);
            }

            for (let key = 0; key < this.tableData2.length; key++) {
              // console.log(this.tableData2[key]);
              var url =
                root +
                "/api/v1/DelCamera?token=" +
                this.tableData2[key].token +
                "&session=" +
                this.$store.state.token;
              // console.log("-****************", url);
              this.$http
                .get(url)
                .then((result) => {
                  // console.log(result);
                  if (result.data.bStatus == true) {
                    if (
                      this.tableData2[key].gbid == "" ||
                      this.tableData2[key].gbid == "invalid"
                    ) {
                      var addChUrl = `${root}/api/v1/AddCamera?token=${
                        this.tableData2[key].token
                      }&enable=${this.tableData2[key].open_close}&audio=${
                        this.tableData2[key].audio
                      }&ch=${key + 1}&session=${this.$store.state.token}`;
                    } else {
                      var addChUrl = `${root}/api/v1/AddCamera?token=${
                        this.tableData2[key].token
                      }&enable=${this.tableData2[key].open_close}&audio=${
                        this.tableData2[key].audio
                      }&gbid=${this.tableData2[key].gbid}&ch=${
                        key + 1
                      }&session=${this.$store.state.token}`;
                    }
                    // console.log(addChUrl);
                    this.$http
                      .get(addChUrl)
                      .then((result) => {
                        // console.log(result);
                        // console.log(this.tableData2);
                        if (result.data.bStatus == true) {
                          // console.log(this.tableData);
                          for (let m = 0; m < this.tableData.length; m++) {
                            const element = this.tableData[m].token;
                            // console.log(element);
                            this.loadSrc(this.tableData[m], element);
                            //  this.$refs.chNumber.value = "";
                            this.AddChannelSloganDialog = false;
                          }
                        }
                      })
                      .catch((error2) => {
                        console.log("cuowu", error2);
                      });
                  }
                })
                .catch((error1) => {
                  console.log("cuowu-2111", error1);
                });
            }
          }
        })
        .catch((error) => {
          console.log("cuowu-111111111", error);
        });
    },

    // 局部更新
    async addpartsCh() {
      this.tableData2 = [];
      var root = this.$store.state.IPPORT;
      var url =
        root + "/api/v1/GetSrc?session=" + (await this.$store.state.token);
      this.$http
        .get(url)
        .then((result) => {
          // console.log("a", result);
          if (result.status == 200) {
            var itme = result.data.src;
            var tabledata = {};
            for (var i = 0; i < itme.length; i++) {
              tabledata = {
                name: itme[i].strName,
                token: itme[i].strToken,
                open_close: true,
                gbid: "",
                audio: false,
                disabled: false,
                ChannelNumber: itme[i].nChannelNumber,
              };
              if (itme[i].nType != "H5_CH_DEV") {
                // console.log(itme[i].nType)
                tabledata["disabled"] = true;
              }
              // console.log(this.tableData2);
              this.tableData2.push(tabledata);
              // console.log(this.tableData2);
            }
            const res = new Promise((resolve) => {
              setTimeout(() => resolve(this.addpartsChannel(), 500));
            });
            console.log(res);
          }
        })
        .catch((error) => {
          console.log("cuowu", error);
        });
    },
    addpartsChannel() {
      var root = this.$store.state.IPPORT;
      for (let key = 0; key < this.tableData2.length; key++) {
        console.log(this.tableData2[key]);
        console.log(key + 1);
        if (this.tableData2[key].ChannelNumber == 0) {
          console.log(this.tableData2[key]);
          this.tableData4.push(this.tableData2);
          console.log(this.tableData4);
        }
        if (
          this.tableData2[key].gbid == "" ||
          this.tableData2[key].gbid == "invalid"
        ) {
          var addChUrl = `${root}/api/v1/AddCamera?token=${
            this.tableData2[key].token
          }&enable=${this.tableData2[key].open_close}&audio=${
            this.tableData2[key].audio
          }&ch=${key + 1}&session=${this.$store.state.token}`;
        } else {
          var addChUrl = `${root}/api/v1/AddCamera?token=${
            this.tableData2[key].token
          }&enable=${this.tableData2[key].open_close}&audio=${
            this.tableData2[key].audio
          }&gbid=${this.tableData2[key].gbid}&ch=${key + 1}&session=${
            this.$store.state.token
          }`;
        }
        this.$http
          .get(addChUrl)
          .then((result) => {
            console.log(result);
            // console.log(this.tableData2);
            // this.$refs.chNumber.value = "";
            for (let m = 0; m < this.tableData.length; m++) {
              const element = this.tableData[m].token;
              // console.log(element);
              this.loadSrc(this.tableData[m], element);
              //  this.$refs.chNumber.value = "";
              this.AddChannelSloganDialog = false;
            }
          })
          .catch((error1) => {
            console.log("cuowu1", error1);
          });
      }
    },
    //   编辑选择通道号

    // 打开编辑选择通道号弹窗
    changeChannelSlogan(row) {
      this.addch2 = row;
      this.num1 = row.ChannelNumber;
      this.editchnumer = [];
      this.arrchannel = [];
      this.EditChannelSloganDialog = true;
      this.deltetoken = row.token;
      // 通道号当前值
      this.chNowNumber = row.ChannelNumber;

      if (row.ChannelNumber > 64 && row.ChannelNumber < 129) {
        this.valuech = 128;
      } else if (row.ChannelNumber > 128 && row.ChannelNumber < 257) {
        this.valuech = 256;
      } else if (row.ChannelNumber > 256 && row.ChannelNumber < 513) {
        this.valuech = 512;
      } else if (row.ChannelNumber > 512 && row.ChannelNumber < 1025) {
        this.valuech = 1024;
      }

      //定义外面的数组
      for (var i = 1; i <= 1024; i++) {
        //循环遍历
        if (i % 64 == 1) {
          //每当余数为1时，就重新建立数组，
          var a = [];
          this.arrchannel.push(a); //将数组存到外面的数组中
        }
        a.push(i); //将元素存到里面的数组中
      }
      for (let j = 0; j < 1 || j < row.ChannelNumber / 64; j++) {
        this.editchnumer.push(
          `${this.arrchannel[j][0]}~${this.arrchannel[j].slice(-1)}`
        );
        for (let g = 0; g < this.editchnumer.length; g++) {
          this.activeName = this.editchnumer[g];
          for (let k = 0; k < this.arrchannel.length; k++) {
            const element = this.arrchannel[g];
            this.editchnumers = element;
          }
        }
      }

      var root = this.$store.state.IPPORT;
      var url = root + "/api/v1/GetCamera?session=" + this.$store.state.token;
      this.$http.get(url).then((result) => {
        if (result.status == 200) {
          if (result.data.bStatus == false) {
          } else {
            var itme = result.data.cam;
            this.channeledit = [];
            for (var i = 0; i < itme.length; i++) {
              this.channeledit.push(itme[i].nCh);
            }

            this.$nextTick(() => {
              var numcolor = this.$refs.nowchnumber;
              for (let m = 0; m < numcolor.length; m++) {
                for (let s = 0; s < this.channeledit.length; s++) {
                  this.chedit = this.channeledit[s];
                  if (this.chedit == numcolor[m].innerText) {
                    numcolor[m].style.color = "#FFFFFF";
                    numcolor[m].style.opacity = "0.2";
                    numcolor[m].style.pointerEvents = "none";
                  }
                }
              }
            });
            this.$nextTick(() => {
              var numcolor = this.$refs.nowchnumber;
              for (let m = 0; m < numcolor.length; m++) {
                if (this.chNowNumber == numcolor[m].innerText) {
                  numcolor[m].style.color = "#FF0000";
                  numcolor[m].style.opacity = "1";
                } else {
                  numcolor[m].style.color = "";
                }
              }
            });
          }
        }
      });
    },
    // 关闭编辑通道号弹窗
    downeditdialog() {
      this.$nextTick(() => {
        var numcolor = this.$refs.nowchnumber;
        for (let m = 0; m < numcolor.length; m++) {
          numcolor[m].style.color = "";
          numcolor[m].style.opacity = "1";
          numcolor[m].style.pointerEvents = "auto";
        }
      });
      this.valuech = 64;
    },
    // 编辑确定按钮
    async editchaumbersure() {
      var num = this.chNowNumber;
      if (this.num1 == num) {
        return;
      }

      for (let m = 0; m < this.channeledit.length; m++) {
        const element = this.channeledit[m];
        if (element == num) {
          return;
        }
      }
      var root = this.$store.state.IPPORT;
      var url =
        root +
        "/api/v1/DelCamera?token=" +
        this.deltetoken +
        "&session=" +
        (await this.$store.state.token);
      // console.log("-****************", url);
      this.$http.get(url).then((result) => {
        // console.log(result);
        if (result.data.bStatus == true) {
          var num = this.chNowNumber;
          if (this.addch2.gbid == "" || this.addch2.gbid == "invalid") {
            var addChUrl = `${root}/api/v1/AddCamera?token=${this.addch2.token}&enable=${this.addch2.open_close}&audio=${this.addch2.audio}&ch=${num}&session=${this.$store.state.token}`;
          } else {
            var addChUrl = `${root}/api/v1/AddCamera?token=${this.addch2.token}&enable=${this.addch2.open_close}&audio=${this.addch2.audio}&gbid=${this.addch2.gbid}&ch=${num}&session=${this.$store.state.token}`;
          }
          this.$http
            .get(addChUrl)
            .then((result) => {
              this.EditChannelSloganDialog = false;
              this.loadSrc(this.addch2, this.addch2.token);
            })
            .catch((error) => {
              console.log("cuowu", error);
            });
        }
      });
    },
    // 选择选择通道号模式
    onSelecteCh(value) {
      this.editchnumer = [];
      for (let j = 0; j < value / 64; j++) {
        this.editchnumer.push(
          `${this.arrchannel[j][0]}~${this.arrchannel[j].slice(-1)}`
        );
      }
    },
    // 编辑通道号左侧点击事件
    handleClick(tab) {
     this.$nextTick(() => {
        var numcolor = this.$refs.nowchnumber;
        for (let m = 0; m < numcolor.length; m++) {
          numcolor[m].style.color = "";
          numcolor[m].style.opacity = "1";
          numcolor[m].style.pointerEvents = "auto";
        }
      });
      for (let k = 0; k < this.arrchannel.length; k++) {
        const element = this.arrchannel[tab.index];
        this.editchnumers = element;
      }
      this.$nextTick(() => {
        var numcolor = this.$refs.nowchnumber;
        for (let m = 0; m < numcolor.length; m++) {
          for (let t = 0; t < this.channeledit.length; t++) {
            this.chedit = this.channeledit[t];
            if (this.chedit == numcolor[m].innerText) {
              numcolor[m].style.color = "#FFFFFF";
              numcolor[m].style.opacity = "0.2";
              numcolor[m].style.pointerEvents = "none";
            }
          }
        }
      });
      this.$nextTick(() => {
        var numcolor = this.$refs.nowchnumber;
        for (let m = 0; m < numcolor.length; m++) {
          if (this.chNowNumber == numcolor[m].innerText) {
            numcolor[m].style.color = "#FF0000";
            numcolor[m].style.opacity = "1";
          } else {
            if (this.chedit == numcolor[m].innerText) {
              numcolor[m].style.color = "#FFFFFF";
              numcolor[m].style.opacity = "0.2";
              numcolor[m].style.pointerEvents = "none";
            }
          }
        }
      });
    },
    // 编辑右侧点击事件
    editchanumber(value) {
      // console.log(value);
      this.chNowNumber = value;
      var numcolor = this.$refs.nowchnumber;
      for (let m = 0; m < numcolor.length; m++) {
        // console.log(this.$refs.nowchnumber);
        // console.log(numcolor[m].innerText);
        if (this.chNowNumber == numcolor[m].innerText) {
          // console.log(11111);

          numcolor[m].style.color = "#FF0000";
        } else {
          numcolor[m].style.color = "";
        }
      }
         for (let s = 0; s < this.channeledit.length; s++) {
        this.chedit = this.channeledit[s];
        $("#" + this.chedit).css("pointerEvents", "none");
        $("#" + this.chedit).css("color", "#FFFFFF");
        $("#" + this.chedit).css("opacity", "0.2");
      }
      this.$nextTick(() => {
        var numcolor = this.$refs.nowchnumber;
        for (let m = 0; m < numcolor.length; m++) {
          if (this.chNowNumber == numcolor[m].innerText) {
            numcolor[m].style.color = "#FF0000";
            numcolor[m].style.opacity = "1";
          } else {
            for (let s = 0; s < this.channeledit.length; s++) {
              this.chedit = this.channeledit[s];
              if (this.chedit == numcolor[m].innerText) {
                numcolor[m].style.color = "#FFFFFF";
                numcolor[m].style.opacity = "0.2";
                numcolor[m].style.pointerEvents = "none";
              }
            }
          }
        }
      });
    },
    //禁用离线
    async Allpart(off) {
      // return
      var root = this.$store.state.IPPORT;
      var tableData = this.tableData;
      console.log("全部关闭", tableData);

      var open_close = off;
      for (var i = 0; i < tableData.length; i++) {
        console.log(tableData[i].bOnline);
        var numindex = tableData.length - 1;
        this.tokenflag = tableData[numindex].token;
        // return
        if (tableData[i].disabled) {
          return;
        }
        if (!tableData[i].bOnline) {
          var url1 =
            root +
            "/api/v1/DelCamera?token=" +
            tableData[i].token +
            "&session=" +
            this.$store.state.token;
          await this.$http.get(url1).then((result) => {
            console.log(result);
            if (result.status == 200) {
              if (result.data.bStatus == true) {
                var tabledata = {
                  name: tableData[i].name,
                  token: tableData[i].token,
                  open_close: open_close,
                  gbid: tableData[i].gbid,
                  audio: tableData[i].audio,
                  disabled: tableData[i].disabled,
                  ChannelNumber: tableData[i].ChannelNumber,
                };
                this.tableData.splice(i, 1, tabledata);
                this.Allpublic(
                  root,
                  tableData[i].token,
                  open_close,
                  tableData[i].gbid,
                  tableData[i].audio,
                  tableData[i].ChannelNumber
                );
              }
            }
          });
        }
      }
    },
    //全部开启
    async Allon(on) {
      console.log("全部开启", this.tableData);
      // return
      var root = this.$store.state.IPPORT;
      var tableData = this.tableData;
      var open_close = on;
      for (var i = 0; i < tableData.length; i++) {
        console.log(tableData[i].token);
        var numindex = tableData.length - 1;
        this.tokenflag = tableData[numindex].token;
        if (tableData[i].disabled) {
          return;
        }
        var url1 =
          root +
          "/api/v1/DelCamera?token=" +
          tableData[i].token +
          "&session=" +
          this.$store.state.token;
        await this.$http.get(url1).then((result) => {
          console.log(result);
          if (result.status == 200) {
            if (result.data.bStatus == true) {
              var tabledata = {
                name: tableData[i].name,
                token: tableData[i].token,
                bOnline: tableData[i].bOnline,
                open_close: open_close,
                gbid: tableData[i].gbid,
                audio: tableData[i].audio,
                disabled: tableData[i].disabled,
                ChannelNumber: tableData[i].ChannelNumber,
              };
              console.log(tabledata);
              this.tableData.splice(i, 1, tabledata);
              this.Allpublic(
                root,
                tableData[i].token,
                open_close,
                tableData[i].gbid,
                tableData[i].audio,
                tableData[i].ChannelNumber
              );
            }
          }
        });
      }
    },
    //全部关闭
    async Alloff(off) {
      console.log("全部关闭");
      // return
      var root = this.$store.state.IPPORT;
      var tableData = this.tableData;
      var open_close = off;
      for (var i = 0; i < tableData.length; i++) {
        console.log(tableData[i].token);
        var numindex = tableData.length - 1;
        this.tokenflag = tableData[numindex].token;
        if (tableData[i].disabled) {
          return;
        }
        var url1 =
          root +
          "/api/v1/DelCamera?token=" +
          tableData[i].token +
          "&session=" +
          this.$store.state.token;
        await this.$http.get(url1).then((result) => {
          console.log(result);
          if (result.status == 200) {
            if (result.data.bStatus == true) {
              var tabledata = {
                name: tableData[i].name,
                token: tableData[i].token,
                bOnline: tableData[i].bOnline,
                open_close: open_close,
                gbid: tableData[i].gbid,
                audio: tableData[i].audio,
                disabled: tableData[i].disabled,
                ChannelNumber: tableData[i].ChannelNumber,
              };
              this.tableData.splice(i, 1, tabledata);
              this.Allpublic(
                root,
                tableData[i].token,
                open_close,
                tableData[i].gbid,
                tableData[i].audio,
                tableData[i].ChannelNumber
              );
            }
          }
        });
      }
    },
    //全部保存
    async Allsave() {
      console.log("全部保存");
      // return
      var root = this.$store.state.IPPORT;
      var tableData = this.tableData;
      this.loading = true;
      for (var i = 0; i < tableData.length; i++) {
        console.log(tableData[i].token);
        var numindex = tableData.length - 1;
        this.tokenflag = tableData[numindex].token;
        var url1 =
          root +
          "/api/v1/DelCamera?token=" +
          tableData[i].token +
          "&session=" +
          this.$store.state.token;
        await this.$http.get(url1).then((result) => {
          console.log(result);
          if (result.status == 200) {
            if (result.data.bStatus == true) {
              var tabledata = {
                name: tableData[i].name,
                token: tableData[i].token,
                bOnline: tableData[i].bOnline,
                open_close: tableData[i].open_close,
                gbid: tableData[i].gbid,
                audio: tableData[i].audio,
                disabled: tableData[i].disabled,
                ChannelNumber: tableData[i].ChannelNumber,
              };
              this.tableData.splice(i, 1, tabledata);
              console.log(tabledata);
              this.Allpublic(
                root,
                tableData[i].token,
                tableData[i].open_close,
                tableData[i].gbid,
                tableData[i].audio,
                tableData[i].ChannelNumber
              );
            }
          }
        });
      }
    },
    Allpublic(root, token, open_close, gbid, audio, ChannelNumber) {
      var url = "";
      if (gbid == "") {
        url =
          root +
          "/api/v1/AddCamera?token=" +
          token +
          "&enable=" +
          open_close +
          "&audio=" +
          audio +
          "&ch=" +
          ChannelNumber +
          "&session=" +
          this.$store.state.token;
      } else if (gbid.length == 20) {
        url =
          root +
          "/api/v1/AddCamera?token=" +
          token +
          "&enable=" +
          open_close +
          "&audio=" +
          audio +
          "&ch=" +
          ChannelNumber +
          "&gbid=" +
          gbid +
          "&session=" +
          this.$store.state.token;
      } else if (gbid.length == 7) {
        url =
          root +
          "/api/v1/AddCamera?token=" +
          token +
          "&enable=" +
          open_close +
          "&audio=" +
          audio +
          "&ch=" +
          ChannelNumber +
          "&session=" +
          this.$store.state.token;
      }
      this.$nextTick(() => {
        console.log("----------------", url);
        this.$http
          .get(url)
          .then((result) => {
            console.log(result);
            if (result.status == 200 && token == this.tokenflag) {
              this.loading = false;
              this.$message({
                message: this.$t("message.camera.Save_successfully"),
                type: "success",
              });
            }
          })
          .catch((err) => {
            console.log("111111111111111111111", err);
          });
      });

      this.editform["name"] = name;
      this.editform["token"] = token;
      this.editform["open_close"] = open_close;
      this.editform["audio"] = audio;
      this.editform["gbid"] = gbid;
    },
    //修改后提示
    openchange() {
      this.$message({
        message: "修改后请保存",
        type: "warning",
        center: true,
      });
    },
    //第一个表格的数据
    GetSrc() {
      var root = this.$store.state.IPPORT;
      //url
      var url = root + "/api/v1/GetSrc?session=" + this.$store.state.token;
      this.$http.get(url).then((result) => {
        console.log("a", result);
        if (result.status == 200) {
          var itme = result.data.src;
          var tabledata = {};
          for (var i = 0; i < itme.length; i++) {
            tabledata = {
              name: itme[i].strName,
              token: itme[i].strToken,
              open_close: true,
              gbid: "",
              audio: false,
              disabled: false,
              ChannelNumber: itme[i].nChannelNumber,
            };
            if (itme[i].nType != "H5_CH_DEV") {
              // console.log(itme[i].nType)
              tabledata["disabled"] = true;
            }
            this.tableData.push(tabledata);
            console.log(this.tableData, 2222);
            this.loadSrc(tabledata, itme[i].strToken);
          }

          this.total = this.tableData.length;
        }
      });
    },
    loadSrc(tabledata, token) {
      console.log(token);
      var data = tabledata;
      console.log(data);
      var root = this.$store.state.IPPORT;
      var url =
        root +
        "/api/v1/GetCamera?token=" +
        token +
        "&session=" +
        this.$store.state.token;
      // console.log(url);
      this.$http.get(url).then((result) => {
        if (result.status == 200) {
          console.log(result);
          if (result.data.bStatus == false) {
          } else {
            var itme = result.data.cam;
            for (var i = 0; i < itme.length; i++) {
              //console.log(itme,itme[i].bEnableAudio)
              data["open_close"] = itme[i].bEnable;
              data["gbid"] = itme[i].strGbID;
              data["audio"] = itme[i].bEnableAudio;
              data["ChannelNumber"] = itme[i].nCh;
              this.tableData.push(data);
              console.log(this.tableData);
              for (var i = 0; i < this.tableData.length; i++) {
                for (var j = i + 1; j < this.tableData.length; j++) {
                  if (this.tableData[i] == this.tableData[j]) {
                    //第一个等同于第二个，splice方法删除第二个
                    this.tableData.splice(j, 1);
                    j--;
                    console.log(this.tableData, 11111);
                  }
                }
              }
            }
          }
        }
      });
    },
    //树形节点点击
    handleNodeClick(data, checked, indeterminate) {
      console.log(data);
      this.currentPage = 1;
      this.tableData = [];
      var root = this.$store.state.IPPORT;
      var data = data.children1;
      var tabledata = {};
      for (var i = 0; i < data.length; i++) {
        // return false;
        tabledata = {
          name: data[i].label,
          token: data[i].token,
          bOnline: data[i].bOnline,
          open_close: true,
          gbid: "",
          audio: false,
          disabled: false,
          ChannelNumber: data[i].ChannelNumber,
        };
        if (data[i].nType != "H5_CH_DEV") {
          // console.log(itme[i].nType)
          tabledata["disabled"] = true;
        }
        this.tableData.push(tabledata);
        console.log(this.tableData);
        this.loadSrc(tabledata, data[i].token);
      }
      this.total = this.tableData.length;
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row, row.gbid.length, row.gbid);
      var index_xlh = (this.currentPage - 1) * 10 + index;
      //return false;
      var root = this.$store.state.IPPORT;

      var url1 =
        root +
        "/api/v1/DelCamera?token=" +
        row.token +
        "&session=" +
        this.$store.state.token;
      console.log("-****************", url1);
      this.$http.get(url1).then((result) => {
        console.log(result);
        if (result.status == 200) {
          if (result.data.bStatus == true) {
            var tabledata = {
              name: row.name,
              token: row.token,
              open_close: row.open_close,
              gbid: row.gbid,
              audio: row.audio,
              disabled: row.disabled,
              ChannelNumber: row.ChannelNumber,
            };
            this.tableData.splice(index_xlh, 1, tabledata);
            console.log(row.gbid.length);
            var url = "";
            if (row.gbid == "") {
              console.log("&&row.open_close==true||row.audio==true");
              url =
                root +
                "/api/v1/AddCamera?token=" +
                row.token +
                "&enable=" +
                row.open_close +
                "&audio=" +
                row.audio +
                "&ch=" +
                row.ChannelNumber +
                "&session=" +
                this.$store.state.token;
            } else if (row.gbid.length == 20) {
              console.log("222");
              url =
                root +
                "/api/v1/AddCamera?token=" +
                row.token +
                "&enable=" +
                row.open_close +
                "&audio=" +
                row.audio +
                "&gbid=" +
                row.gbid +
                "&ch=" +
                row.ChannelNumber +
                "&session=" +
                this.$store.state.token;
            } else if (row.gbid.length == 7) {
              console.log("222");
              url =
                root +
                "/api/v1/AddCamera?token=" +
                row.token +
                "&enable=" +
                row.open_close +
                "&audio=" +
                row.audio +
                "&ch=" +
                row.ChannelNumber +
                "&session=" +
                this.$store.state.token;
            }

            console.log("----------------", url);
            this.$http.get(url).then((result) => {
              console.log(result);
              if (result.status == 200) {
                this.$message({
                  message: this.$t("message.camera.Save_successfully"),
                  type: "success",
                });
              }
            });

            this.editform["name"] = row.name;
            this.editform["token"] = row.token;
            this.editform["open_close"] = row.open_close;
            this.editform["audio"] = row.audio;
            this.editform["gbid"] = row.gbid;
          } else {
            console.log("保存失败");
            // return false;
          }
        }
      });
    },
    //删除
    handledel(index, row) {
      console.log(index, row);
      console.log("序列号", (this.currentPage - 1) * 10 + index);
      var index_xlh = (this.currentPage - 1) * 10 + index;

      var root = this.$store.state.IPPORT;
      var url =
        root +
        "/api/v1/DelCamera?token=" +
        row.token +
        "&session=" +
        this.$store.state.token;
      console.log("-****************", url);
      this.$http.get(url).then((result) => {
        console.log(result);
        if (result.status == 200) {
          if (result.data.bStatus == true) {
            var tabledata = {
              name: row.name,
              token: row.token,
              open_close: true,
              gbid: "",
              audio: false,
              ChannelNumber: 0,
            };
            // console.log(tabledata);
            this.tableData.splice(index_xlh, 1, tabledata);
            this.$message({
              message: this.$t("message.camera.Delete_successful"),
              type: "success",
            });
          } else {
            this.$message({
              message: this.$t("message.camera.Delete_failed"),
              type: "warning",
            });
            return false;
          }
        }
      });
    },
    //测试机仓
    loadtest() {
      let _this = this;
      var root = this.$store.state.IPPORT;
      //url
      var url =
        root + "/api/v1//GetSrcCamera?session=" + this.$store.state.token;
      console.log(url);
      this.$http.get(url).then((result) => {
        if (result.status == 200) {
          var data = result.data;
          this.threevideo.push(data.src);
          console.log(data);
          var srcGroup = { children1: [] };
          srcGroup.label = this.$t("message.live.camera");
          srcGroup.iconclass = "iconfont icon-shebei";
          for (var i = 0; i < data.src.length; i++) {
            var item = data.src[i];
            console.log(item, "00000000000000");
            if (item["nOriginalType"] == "H5_CH_GB") {
              continue;
            } else {
              var newItem = {
                token: item["strToken"],
                label: item["strName"],
                nType: item["nType"],
                bOnline: item["bOnline"],
                ChannelNumber: item["nChannelNumber"],
              };

              srcGroup.children1.push(newItem);
              // this.tableData3.push(newItem)
            }
          }
          this.data.push(srcGroup);
        }
      });
    },
    //sdk
    loadDevice() {
      var root = this.$store.state.IPPORT;
      //url
      var url = root + "/api/v1/GetDevice?session=" + this.$store.state.token;
      console.log("*******", url);
      //重组
      this.$http.get(url).then((result) => {
        if (result.status == 200) {
          var srcData = [];
          var data = result.data;
          this.threevideo.push(data.dev);
          console.log(data);
          for (var i = 0; i < data.dev.length; i++) {
            var item = data.dev[i];
            var srclevel = [];
            srclevel["strToken"] = item.strToken;
            srclevel["strName"] = item.strName;
            this.loadSrcdev(srclevel, srcData);
          }
        }
      });
    },
    loadSrcdev(srclevel, srcData) {
      var root = this.$store.state.IPPORT;
      var url =
        root +
        "/api/v1/GetDeviceSrc?token=" +
        srclevel.strToken +
        "&session=" +
        this.$store.state.token;
      // console.log("*******",url)
      this.$http
        .get(url)
        .then((result) => {
          if (result.status == 200) {
            var data = result.data;
            console.log(data);
            var srcGroup = { children1: [] };
            srcGroup.label = srclevel.strName;
            srcGroup.iconclass = "iconfont icon-shebei";
            for (var i = 0; i < data.src.length; i++) {
              var item = data.src[i];
              var newItem = {
                token: item["strToken"],
                label: item["strName"],
                nType: item["nType"],
                bOnline: item["bOnline"],
                ChannelNumber: item["nChannelNumber"],
              };
              console.log(newItem);
              srcGroup.children1.push(newItem);
              // this.tableData3.push(newItem);
            }
            this.data.push(srcGroup);
          }
        })
        .catch((error) => {
          console.log("GetSrc failed", error);
        });
    },
    //数字仓机
    NumberDevice() {
      var root = this.$store.state.IPPORT;
      //url
      var url = root + "/api/v1/GetGbDevice?session=" + this.$store.state.token;

      //重组
      this.$http.get(url).then((result) => {
        if (result.status == 200) {
          var srcData = [];
          var data = result.data;
          this.threevideo.push(data.dev);
          console.log(data);
          for (var i = 0; i < data.dev.length; i++) {
            var item = data.dev[i];
            var srclevel = [];
            srclevel["strToken"] = item.strToken;
            srclevel["strName"] = item.strName;
            this.NumberSrc(srclevel, srcData);
          }
        }
      });
    },
    NumberSrc(srclevel, srcData) {
      var root = this.$store.state.IPPORT;
      var url =
        root +
        "/api/v1/GetGbDeviceSrc?token=" +
        srclevel.strToken +
        "&session=" +
        this.$store.state.token;

      this.$http
        .get(url)
        .then((result) => {
          if (result.status == 200) {
            var data = result.data;
            console.log(data);
            var srcGroup = { children1: [] };
            srcGroup.label = srclevel.strName;
            srcGroup.iconclass = "iconfont icon-shebei";
            for (var i = 0; i < data.src.length; i++) {
              var item = data.src[i];

              var newItem = {
                token: item["strToken"],
                label: item["strName"],
                nType: item["nType"],
                bOnline: item["bOnline"],

                ChannelNumber: item["nChannelNumber"],
              };
              srcGroup.children1.push(newItem);
              // this.tableData3.push(newItem);
            }
            this.data.push(srcGroup);
          }
        })
        .catch((error) => {
          console.log("GetSrc failed", error);
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

    async handleSizeChange2(val) {
      await this.$nextTick();
      console.log(`每页 ${val} 条`);
      this.currentPage2 = 1;
      this.pageSize2 = val;
    },
    async handleCurrentChange2(val) {
      await this.$nextTick();
      console.log(`当前页: ${val}`);
      this.currentPage2 = val;
    },
    //搜索
    handlechange() {},
    //模糊查询
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
  //模糊查询
  watch: {
    filterText(val) {
      console.log("filter", val);
      this.$refs.tree.filter(val);
    },
  },
  computed: {
    // 根据计算属性模糊搜索
    tableData1() {
      const searchTableInfo = this.searchTableInfo;
      if (searchTableInfo) {
        return this.tableData.filter((data) => {
          console.log("success" + data);
          return Object.keys(data).some((key) => {
            console.log(data[key]);
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return String(data[key]).indexOf(searchTableInfo) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
};
</script>

<style lang="scss">
.liveview {
  padding-top: 10px;
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-between;
  /* 水印 */
  #watermarktoggle {
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
  .liveview_left {
    background: none !important;
    width: 16%;
    min-width: 290px;
    height: 90vh;
    margin: 0 5px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .liveview_left_input {
      margin: 10px 0;
    }
  }
  .liveview_right {
    width: 84%;
    .liveview_right_but {
      height: 50px;
      display: flex;

      align-items: center;
      .form_butt {
        font-size: 12px;
        background: none;
        border-radius: 5px;
        margin-right: 10px;
        opacity: 0.9;
        &:hover {
          border: 1px solid #3dabff !important;
          color: #3dabff !important;
        }
      }
      .addChannelSloganBtn {
        //   order:5;
        //   align-content:flex-end;
        //     //  margin-left: 775px;
        //      align-self:flex-end;
        margin-left: auto;
        background: #3abbfe;
        border-radius: 2px;
        padding: 2px 16px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        margin-right: 20px;
        border-color: none;
      }
    }
    .button_edi {
      margin-bottom: 0px;
      line-height: 27px;
      position: relative;
      .el-button {
        // font-size: 20px;
        padding: 0;
      }
      .el-button:nth-child(2) {
        position: absolute;
        // top: 2px;
        // left: 15px;
        font-size: 23px;
        line-height: 25px;
      }
    }
  }
}
.addChannelSlogan {
  .el-dialog {
    .el-dialog__body {
      //border-top: 1px solid #dcdfe6;
      //border-bottom: 1px solid #dcdfe6;
      max-height: 500px !important;
      min-height: 700px;
      overflow-y: hidden;
       padding-top: 0px;
    }
  }
}
.editChannelSlogan {
  .el-dialog__body {
    padding: 20px 20px;
  }
}

.EditChannelSloganBtn {
  margin-left: auto;
  background: #3abbfe;
  border-radius: 2px;
  padding: 2px 16px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  margin-right: 0px;
  border-color: none;
}
.EditChannelSloganBtn1 {
  margin-right: 20px;
  background: rgba(55, 62, 72, 1);
  border: 1px solid #3abbfe;
  padding: 2px 16px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
}
// .addChannelSlogan .el-table::before {
//   height: 0px;
// }
.EditChannelSloganDialogTabs .el-tabs__nav-wrap::after {
  background-color: transparent !important;
}
.EditChannelSloganDialogTabs .el-tabs__active-bar {
  background-color: transparent !important;
}
</style>