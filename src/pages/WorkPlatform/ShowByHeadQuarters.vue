<template>
    <div id="show_By_Head-Quarters">
      <!--区域总监、代理总监-->
        <!--上面-->
      <el-row class="top">
        <el-col :md="24" :lg="8" v-for="(item,index) in workPlatformImg" :key="index">
          <div class="card_wrapper" @click="clickCard(item)">
            <div class="card">
              <img :src="item.imgUrl" alt="">
              <div class="text">
                <span class="type">{{item.text}}</span>
                <span class="num">{{item[item.name]}}</span>
              </div>
              <div class="line"></div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--中间-->
      <el-row class="middle">
        <!--下属任务完成情况-->
        <el-col :md="24" :lg="12">
          <div class="left_wrapper calendar_wrapper">
            <div class="title">
              <span class="name">下属任务完成情况</span>
              <span class="more" @click="moreFinishStatus">更多 ></span>
            </div>
            <div class="content middle_top_desc finish_status">
              <div class="top_desc" v-if="taskProgress.length!=0">TOP 5</div>
              <ul class="wrapper" v-if="taskProgress.length!=0">
                <li class="bar_list" v-for="(item,index)  in taskProgress" :key="index">
                  <div class="name">{{item.name}}</div>
                  <div class="bar_wrapper">
                    <div class="wrapper_box">
                      <div class="bar_outer">
                        <div class="bar_inner" ref="barInner" :style="{width:item.val}"></div>
                        <!-- <div class="progress_head" ref="barHead" :style="{left:'calc('+item.val+' - 10px)'}" v-if="item.val.substring(0,item.val.indexOf('%'))!=0"></div> -->
                      </div>
                    </div>
                    <div class="bar_text">{{item.val}}</div>
                  </div>
                </li>
              </ul>
              <div class="no_data_wrapper" v-else>
                <div class="img_wrapper">
                  <img :src="noDataImgUrl"/>
                </div>
                <p class="no_data_hint">哎呀！您的数据库没有数据，快来填满它吧！</p>
              </div>
            </div>
          </div>
        </el-col>

        <!--排名情况-->
        <el-col :md="24" :lg="12" class="wrpper-height">
          <div class="right_wrapper">
            <div class="title">
              <span class="name">系统使用次数<span class="current_month_data">本月数据</span></span>
              <span class="more" @click="showMoreUseingTimes">更多 ></span>
            </div>
            <div class="content middle_top_desc bar_chart">
              <div class="top_desc">TOP 5</div>
              <div class="chart_bar_wrapper">
                <visit-time></visit-time>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="bottom_wrapper">
        <el-row class="bottom login_status_wrapper" v-show="this.$root.loginUserInfo.positionId==2||this.$root.loginUserInfo.positionId==7">
          <div class="login_status">
            <div class="title">渠道拜访次数</div>
            <!--<el-col :xs="12" :sm="12" :md="8" :lg="6"  v-for="(item,index) in loginStatus" :key="index">-->
            <!--<div class="wrapper">-->
            <!--<div class="left_wrapper">-->
            <!--<div class="inner_wrapper">-->
            <!--<div class="img_wrapper">-->
            <!--<img :src="item.attachPlace==''?defaultHeadPic:item.attachPlace"/>-->
            <!--</div>-->
            <!--<div class="name" v-text="item.userName"></div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="right_wrapper">-->
            <!--<p class="desc_wrapper">最后一次登录时间</p>-->
            <!--<p class="date_wrapper"><span class="date" v-text="item.loginSessionDate"></span><span class="time" v-text="item.loginSessionTime"></span></p>-->
            <!--<p class="login_info">拜访次数<span class="times" v-text="item.taskComNum"></span></p>-->
            <!--</div>-->
            <!--</div>-->
            <!--</el-col>-->
            <login-status-card :data="loginStatus"></login-status-card>
          </div>


        </el-row>
      </div>

      <div class="bottom_wrapper">
        <el-row class="bottom map_wrapper" v-show="this.$root.loginUserInfo.positionId!=2&&this.$root.loginUserInfo.positionId!=7">
          <el-col :md="24" :lg="24">
            <div class="left_wrapper map_wrapper">
              <div class="title">
                <span class="name">渠道拜访次数</span>
                <span class="more" @click="mapMore">更多 ></span>
              </div>
              <div class="content map_content">
                <div id="map" ref="map"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <component :is="$store.state.mutations.showLoginStatus" :params="cardParams"></component>
    </div>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";
import VisitTime from "./VisitTime.vue";
import MapChart from "./MapChart.vue";
import LoginStatus from "./LoginStatus.vue";
import DistrictCard from './DistrictCard.vue'
import LoginStatusCard from './../../components/LoginStatusCard.vue'
import chinaJson from "./../../assets/js/china.json";
export default {
  name: "",
  data() {
    return {
      taskProgress: [],
      workPlatformImg: [
        {
          imgUrl: require("@/assets/images/toBeDeal.png"),
          text: "当前待处理工作",
          name: "untreatedTaskTime",
          untreatedTaskTime: ""
        },
        {
          imgUrl: require("@/assets/images/warningDeal.png"),
          text: "舆情处理",
          name: "untreatedPubwarnTime",
          untreatedPubwarnTime: ""
        },
        {
          imgUrl: require("@/assets/images/reportDeal.png"),
          text: "报告处理",
          name: "untreatedReportTime",
          untreatedReportTime: ""
        }
      ],
      noDataImgUrl: require("@/assets/images/noData.png"),
      loginStatus: [],
      cardParams:'',
      mapDataList:[
        {name:'北京',value:[116.4,39.9],num:''},
        {name:'天津',value:[117.2,39.12],num:''},
        {name:'河北',value:[114.52,38.05],num:''},
        {name:'山西',value:[112.55,37.87],num:''},
        {name:'内蒙古',value:[111.73,40.83],num:''},
        {name:'辽宁',value:[123.43,41.8],num:''},
        {name:'吉林',value:[125.28,43.83],num:''},
        {name:'黑龙江',value:[126.53,45.8],num:''},
        {name:'上海',value:[121.47,31.23],num:''},
        {name:'江苏',value:[118.78,32.07],num:''},
        {name:'浙江',value:[120.15,30.28],num:''},
        {name:'安徽',value:[117.25,31.83],num:''},
        {name:'福建',value:[119.3,26.08],num:''},
        {name:'江西',value:[115.85,28.68],num:''},
        {name:'山东',value:[116.98,36.67],num:''},
        {name:'河南',value:[113.62,34.75],num:''},
        {name:'湖北',value:[114.3,30.6],num:''},
        {name:'湖南',value:[112.93,28.23],num:''},
        {name:'广东',value:[113.27,23.13],num:''},
        {name:'广西',value:[108.37,22.82],num:''},
        {name:'海南',value:[110.32,20.03],num:''},
        {name:'重庆',value:[106.55,29.57],num:''},
        {name:'四川',value:[104.07,30.67],num:''},
        {name:'贵州',value:[106.63,26.65],num:''},
        {name:'云南',value:[102.72,25.05],num:''},
        {name:'西藏',value:[91.13,29.65],num:''},
        {name:'陕西',value:[108.93,34.275],num:''},
        {name:'深圳',value:[114.05,22.55],num:''},
        {name:'苏州',value:[120.58,31.3],num:''}
      ],
      mapLabelColor:['#3B9CFF','#68B3FF','#84C1FF','#9ACCFF','#B3D9FF','#CFE7FF','#DFEFFF','#EEF7FF','#FFF','#FFF']
    };
  },
  components: {
    VisitTime,
    MapChart,
    LoginStatus,
    DistrictCard,
    LoginStatusCard
  },
  computed: {
    /**
     * 获取登录信息：
     */
    loginUserInfo() {
      var storageUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"));
      for (var i in this.$store.state.mutations.loginUserInfo) {
        if (
          this.$store.state.mutations.loginUserInfo[i].length == 0 &&
          storageUserInfo
        ) {
          this.$store.commit("getUerInfo", storageUserInfo);
        }
      }
      return this.$store.getters.loginUserInfo;
    },
    navList() {
      return this.$store.getters.filterNavs.length != 0
        ? this.$store.getters.filterNavs
        : JSON.parse(sessionStorage.getItem("filterNavList"));
    }
    
  },
  methods: {
    /**
     * 点击卡片:
     */
    clickCard(obj){
      switch(obj.name){
        case 'untreatedTaskTime':   //点击当前待处理任务
          this.$router.push({name:'navRecordingPage',params:{page:'workPlatform'}});
          this.navList.map((item,index)=>{
          if(item.name=='navRecordingPage'){
            this.$store.state.mutations.isActive=index;
            sessionStorage.setItem("activeNavIndex",index);
          }
        })
        break;

        case 'untreatedPubwarnTime':   //点击舆情处理
          this.$router.push({name:'navEarlyWarn'});
          this.navList.map((item,index)=>{
          if(item.name=='navEarlyWarn'){
            this.$store.state.mutations.isActive=index;
            sessionStorage.setItem("activeNavIndex",index);
          }
        })
        break;

        case 'untreatedReportTime':   //点击报告处理
          this.$router.push({name:'navReportPage'});
          this.navList.map((item,index)=>{
          if(item.name=='navReportPage'){
            this.$store.state.mutations.isActive=index;
            sessionStorage.setItem("activeNavIndex",index);
          }
        })
        break;
      }
    },
    /**
     * 查询待完成任务数:
     */
    taskDoneList() {
      this.$axios("/api/CMM/page/main/workbench_getAllPubwarnReportTaskTime")
        .then(res => {
          if(res.data.data){
            this.workPlatformImg.map((item, index) => {
              item[item.name] = res.data.data[item.name];
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 查询下属任务完成情况:
     */
    getTaskProgress() {
      this.$axios("/api/CMM/page/main/workbench_getUnderUserWorkRate")
        .then(res => {
          if(res.data.data){
            res.data.data.slice(0, 5).map((item, index) => {
              this.taskProgress.push({
                name: item.userName,
                val: (item.taskComRate * 100).toFixed(0) + "%"
              });
              
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 更多下属完成情况：点击按钮跳转到我的工作页面
     */
    moreFinishStatus() {
      this.$store.getters.filterNavs.map((item, index) => {
        if (item.name == "navRecordingPage") {
          this.$store.state.mutations.isActive = index;
        }
      });
      this.$store.commit("changeNav", this.$store.state.mutations.isActive);
      this.$router.push({ name: "navRecordingPage" });
    },
    /**
     * 地图：
     */
    showMap(newData,colorArr) {
      echarts.registerMap("china", chinaJson); //注册地图
      if(this.$refs.map){
        var myChart = echarts.init(this.$refs.map);
      }
      /**
       * 地图的series数据值：
       * @returns {Array}
       */
      var showSeries = function() {
        var arr = [];
        for (let i = 0; i < newData.length; i++) {
          arr.push({
            name: `${newData[i].name}     ${newData[i].num}次`,
            type: "effectScatter",
            coordinateSystem: "geo",
            data: [newData[i]],
            symbolSize: function(val) {
              return val[2] / 20;
            },
            showEffectOn: "render",
            rippleEffect: {
              //地图上光圈标记点
              period: 100,
              scale: 4,
              brushType: "fill"
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: colorArr[i], //散点光圈的颜色
                shadowBlur: 10,
                shadowColor: colorArr[i], //散点光圈的阴影颜色
                label: {
                  show: false, //隐藏标示文字
                  position: "inside",
                  color: 'red', //散点光圈的颜色
                }
              }
            },
            zlevel: 1
          });
        }
        return arr;
      };

      /**
       * 地图的legend名字：
       * @returns {Array}
       */
      var getName = function() {
        var nameList = [];
        newData.map((item, index) => {
          nameList.push(`${item.name=item.name.length==2?item.name+'  ':item.name}     ${item.num}次`);
        });
        return nameList;
      };

      var option = {
        legend: {
          orient: "vertical",
          x: "80%",
          y: "center",
          textStyle: {
            color: "#fff",
            background: "red"
          },
          itemGap: 20,
          data: getName()
        },
        backgroundColor: "#42485a", //画布的背景色
        geo: {
          map: "china",
          show: true,
          roam: false, //控制地图不缩放
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#34384d", //地图背景色
              borderColor: "#42485a" //地图边界线颜色
            },
            emphasis: {
              areaColor: "#34384d",
              borderColor: "#42485a" //地图边界线颜色
            }
          },
          regions: [
            //去掉南海诸岛区域
            {
              name: "南海诸岛",
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }
          ]
        },
        series: showSeries()
      };

      myChart.setOption(option);
      window.onresize = () => {
        myChart.resize();
      };
    },
    /**
     * 下属渠道经理使用情况：
     */
    getLoginStatus() {
      this.$axios
        .post(
          "/api/CMM/page/myChannel/workbench_getUserSignList",
          this.$qs.stringify({
            areaName: ""
          })
        )
        .then(res => {
          if(res.data.data){
            res.data.data.map(item => {
              this.loginStatus.push({
                attachPlace: item.attachPlace, //头像地址
                userName: item.userName, //下属名称
                loginSessionDate: item.empId?item.empId.split(" ")[0]:'', //最后一次登录日期
                loginSessionTime: item.empId?item.empId
                  .split(" ")[1]
                  .substring(
                    0,
                    item.empId.split(" ")[1].lastIndexOf(":")
                  ):'', //最后一次登录时间
                taskComNum: item.taskComNum //登录次数
              });
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 系统使用次数/地图营销-区域卡片展示：
     */
    getCardData(url){
      this.$axios.get(url)
        .then(res =>{
          if(res.data.data){
            this.$store.state.mutations.filterList=res.data.data;
            res.data.data.map((item,index)=>{
              this.$store.state.mutations.filterList[index].Person=item.attachPlace;
              this.$store.state.mutations.filterList[index].areaName=item.userName;
              this.$store.state.mutations.filterList[index].monthReportComNum=item.monthReportComNum;
              this.$store.state.mutations.filterList[index].orgName=item.orgName;
            })
          }
        })
        .catch(error=>{
          console.log(error);
        })
    },
    /**
     * 展示更多（系统使用次数）：
     */
    showMoreUseingTimes(){
      this.cardParams='usingTimes';
      this.getCardData('/api/CMM/page/myChannel/workbench_getAreaSignLoginTimeList');
      this.$store.state.mutations.isFromWorkPage=true;
      if(this.$root.loginUserInfo.positionId==3||this.$root.loginUserInfo.positionId==4||this.$root.loginUserInfo.positionId==5||
        this.$root.loginUserInfo.positionId==6||this.$root.loginUserInfo.positionId==8||this.$root.loginUserInfo.positionId==99){
        this.$store.state.mutations.showLoginStatus='DistrictCard';
      }else{
        this.$store.state.mutations.showLoginStatus='LoginStatus';
      }
    },
    /**
     * 获取地图数据：
     */
    getMapData(){
      /**
       * 地图标记点的值：
       * @returns {Array}
       */
      this.$axios.get("/api/CMM/page/myChannel/workbench_getAreaSignNum")
        .then(res =>{
          var dataList=res.data.data?res.data.data:[];
          var NumList=[];
          var NewMapData=[];
          var userNameList=[];
        for (let i = 0; i < dataList.length; i++) {
          for (let j = 0; j < this.mapDataList.length; j++) {
            if(dataList[i].userName==this.mapDataList[j].name){
               this.mapDataList[j].num =dataList[i].taskComNum;
               this.mapDataList[j].value.push(100+this.mapDataList[j].num);
            }
          }
        }
          this.mapDataList.sort((a,b)=>b.num-a.num);
          this.showMap(this.mapDataList.slice(0,10),this.mapLabelColor);
        })
        .catch(error=>{
          console.log(error);
        })
    },
    /**
     * 地图-更多:
     */
    mapMore(){
      this.cardParams='mapMore';
      this.getCardData('/api/CMM/page/myChannel/workbench_getAreaSignList');
      this.$store.state.mutations.showLoginStatus='DistrictCard';
    }
  },
  mounted() {
    this.taskDoneList();
    this.getTaskProgress();
    this.getLoginStatus();
    this.getMapData();
    this.$store.dispatch("getVisitTimeData", this);
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/reset";
//区域总监、代理总监：
#show_By_Head-Quarters {
  .w(100%);
  .p(21px 0 21px 42px);
  .bottom_wrapper{
    .w(100%);
    .p-r(42px);
  }
  .top,
  .middle,
  .bottom {
    .h(440px);
    &.top {
      .h(160px);
    }
    .el-col {
      .h(100%);
      .m(21px 0);
      .p-r(42px);
      .card_wrapper {
        .w(100%);
        .h(100%);
        .b(@boxBg);
        .b-r(5px);
        .p(30px);
        cursor:pointer;
        min-width: 303px;
        .card {
          .w(100%);
          .h(100%);
          min-width: 100px;
          .b(#42475b);
          .b-r(5px);
          /*img{*/
          /*margin-left:60px;*/
          /*}*/
          .text {
            float: right;
            width:70%;
            text-align: right;
            /*margin-right: 44px;*/
            .type {
              font-size: 16px;
              color: #9aa0c2;
            }
            .num {
              font-size: 47px;
              color: #fff;
            }
          }
          .line {
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: linear-gradient(to right, #70cffd, #3e7aec);
            margin: 30px auto 0;
          }
        }
      }
      .left_wrapper,
      .right_wrapper {
        .b(@boxBg);
        .w(100%);
        .h(100%);
        .b-r(5px);
        .p(35px);
        .title {
          .p-b(15px);
          overflow: hidden;
          .name {
            float: left;
          }
          .more {
            float: right;
            cursor: pointer;
          }
        }
        .current_month_data {
          .f-s(14px);
          .m-l(20px);
        }
        .middle_top_desc {
          .top_desc {
            .w(100%);
            .h(30px);
            .l-h(30px);
            color: @red;
          }
          .wrapper,
          .chart_bar_wrapper {
            .w(100%);
            .p-t(15px);
            .h(calc(~"100% - 30px"));
            li.bar_list {
              .h(60px);
              .w(100%);
              .name {
                .h(20px);
                .l-h(20px);
                .f-s(16px);
                color: @white;
              }
              .bar_wrapper {
                .h(calc(~"100% - 29px"));
                .bar_outer {
                  float: left;
                  .h(100%);
                }
                .wrapper_box {
                  // .w(90%);
                  width: 80%;
                  .h(100%);
                  float: left;
                  .bar_outer {
                    position: relative;
                    .w(100%);
                    .h(8px);
                    margin-top: 8px;
                    border-radius: 4px;
                    .b(@progressBarStart);
                    .bar_inner {
                      //.w(80%);
                      .h(100%);
                      border-radius: 4px;
                      .b(
                        linear-gradient(to right, @progressBarStart, @progressBarEnd)
                      );

                      animation: mymove 2s ease-in-out 0s 1 alternate forwards;
                    }
                    @keyframes mymove {
                      from {
                        width: 0;
                      }
                    }
                    .progress_head {
                      position: absolute;
                      top: -2px;
                      .w(10px);
                      .h(10px);
                      border-radius: 50%;
                      box-shadow: 0px 0px 6px 3px  @progressBarEnd;
                      .b(@progressBarEnd);
                      animation: headmove 2s ease-in-out 0s 1 alternate forwards;

                    }
                    @keyframes headmove {
                      from {
                        left: 0;
                      }
                    }
                    
                    
                    
                  }
                }
                .bar_text {
                  .w(10%);
                  .h(100%);
                  float: right;
                  .t-a(right);
                  color: @white;
                  .f-s(16px);
                  .f-f(@workPlatformText);
                }
              }
            }
          }
        }
        .content {
          .w(100%);
          .h(calc(~"100% - 37px"));
          &.map_content {
            #map {
              .w(100%);
              .h(100%);
            }
          }
          #calendar {
            .w(274px);
            .h(100%);
            float: left;
          }
          .schedule_info {
            float: right;
            .h(100%);
            .w(calc(~"100% - 274px"));
          }
        }
        .no_data {
          .w(100%);
          .h(calc(~"100% - 37px"));
          .no_data_wrapper {
            .w(100%);
            .h(100%);
            .m-t(72px);
            .img_wrapper {
              .w(120px);
              .h(120px);
              .m(0 auto);
              img {
                .w(100%);
                .h(100%);
              }
            }
            .no_data_hint {
              .h(70px);
              .l-h(70px);
              .t-a(center);
            }
          }
        }
        .no_data_wrapper {
          .h(100%);
          .p-t(70px);
          .img_wrapper {
            .w(150px);
            .h(150px);
            .m(0 auto);
            img {
              .w(100%);
              .h(100%);
            }
          }
          .no_data_hint {
            .p-t(30px);
            .f-s(16px);
            .t-a(center);
            color: @white;
            .f-f(@workPlatformText);
          }
        }
      }
    }
    &.login_status_wrapper {
      .w(100%);
      .h(auto);
      .p(35px);
      .b-r(5px);
      .b(@boxBg);
      .m-t(105px);
      min-height: 260px;
      // .title {
      //   // .h(30px);
      // }
    /*  .el-col {
        .m(0);
        .p-r(0);
        .b-r(0);
        .h(150px);
        .p(10px);
        .wrapper {
          .w(100%);
          .h(100%);
          .b-r(5px);
          display: flex;
          border: 1px solid #7ba3ff;
          -webkit-box-shadow: 0 0 10px #7bb0ff;
          -moz-box-shadow: 0 0 10px #7bb0ff;
          box-shadow: 0 0 10px #7bb0ff;
          .left_wrapper {
            .w(30%);
            .p(0);
            border-right: 1px solid @line;
            .inner_wrapper {
              .w(50px);
              .h(90px);
              .m(24px auto);
              .img_wrapper {
                .w(50px);
                .h(50px);
                .b-r(25px);
                border: 1px solid @white;
                img {
                  .w(100%);
                  .h(100%);
                  .b-r(50%);
                }
              }
              .name {
                .p-t(20px);
                .h(40px);
                .l-h(20px);
                color: @white;
                .f-s(12px);
                .t-a(center);
              }
            }
          }
          .right_wrapper {
            flex: 1;
            .p(15px);
            font-size: 12px;
            .desc_wrapper,
            .date_wrapper {
              .h(30px);
              .l-h(30px);
            }
            .date_wrapper {
              .time {
                float: right;
              }
            }
            .login_info {
              .h(44px);
              .p-t(16px);
              .l-h(25px);
              .times {
                float: right;
              }
            }
          }
        }
      }*/
    }
    &.map_wrapper{
      .el-col{
        .p-r(0);
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .middle {
      height: auto;
    }
    .bottom_wrapper{
      .w(100%);
      .p-r(42px);
    }
    .login_status_wrapper {
      width: 100%;
      height: auto;
      padding: 35px;
      border-radius: 5px;
      background: #43475b;
      margin-top: 30px !important;
      min-height: 260px;
    }
    .bottom .wrpper-height {
      height: 400px;
    }
    &.map_wrapper{
      .el-col{
        .p-r(0);
      }
    }
  }
}
</style>
