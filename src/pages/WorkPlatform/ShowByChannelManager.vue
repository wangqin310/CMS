<template>
    <div id="show_By_channel_manager">
      <!--渠道经理、渠道高级经理-->

      <!--顶部-->
      <el-row class="top">
        <!--工作计划-->
        <el-col :md="24" :lg="12">
        <div class="left_wrapper work_plan">
          <div class="title">
            <span class="name">工作计划</span>
            <span class="more button" @click="addWorkPlan" v-if="workPlanListParams.taskDate==currentDate">新增</span>
          </div>
          <div class="content calendar">
            <div id="calendar">
              <calendar @selectDate="selectDate" :range="calendar2.range" :lunar="calendar2.lunar" :value="calendar2.value" @select="calendar2.select"></calendar>
            </div>
            <div class="schedule_info" id="scroll">
              <ul class="schedule_wrapper">
                <li class="schedule_list" v-for="(item,index) in workPlanListData" :key="index">
                  <div class="schedule_time">{{item.createTime|filterTime}}</div>
                  <div class="schedule_desc">{{item.taskDesc}}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </el-col>

        <!--关注指标-->
          <el-col :md="24" :lg="12">
          <div class="right_wrapper bar_chart_wrapper">
            <div class="title">
              <span class="name">关注指标</span>
            </div>
            <div class="content bar_chart" v-if="focusIndexdata.resData.length!=0"
            >
              <div class="color_plate">
                <div class="legend_wrapper" v-for="(item,index) in focusIndexdata.resData.length" :key="index">
                  <span class="legend_color" :style="{background:focusIndexChartLegendData[index].color}"></span>
                  <span class="legend_title" v-text="focusIndexChartLegendData[index].name"></span>
                </div>
              </div>
              <div class="chart_wrapper" ref="focusIndexChart"></div>
            </div>
            <div class="no_data" v-else>
              <div class="no_data_wrapper">
                <div class="img_wrapper">
                  <img :src="noDataImgUrl"/>
                </div>
                <p class="no_data_hint">哎呀！您的数据库没有数据，快来填满它吧！</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--中间-->
      <el-row class="middle">
        <!--重要工作提醒-->
        <el-col :md="24" :lg="12">
          <div class="left_wrapper work_alert">
            <div class="title">
              <span class="name">重要工作提醒</span>
            </div>
            <div class="content work_alert" ref="workAlert" v-if="workAlertData.resData.length!=0"></div>
            <div class="no_data" v-else>
              <div class="no_data_wrapper">
                <div class="img_wrapper">
                  <img :src="noDataImgUrl"/>
                </div>
                <p class="no_data_hint">哎呀！您的数据库没有数据，快来填满它吧！</p>
              </div>
            </div>
          </div>
        </el-col>
        <!--临时任务-->
        <el-col :md="24" :lg="12">
          <div class="right_wrapper bar_chart_wrapper">
            <div class="title">
              <span class="name">临时任务</span>
              <span class="more" @click="moreTask">更多 ></span>
            </div>
            <div class="content temp_task">
              <ul v-if="tempTaskData.length!=0">
                <li class="task_list" v-for="(item,index) in tempTaskData" :key="index" @click="clickTempTask(item)">
                  <div class="times">
                    <span class="date" v-text="item.date"></span> &nbsp;                 
                    <span class="time" v-text="item.time"></span>
                  </div>
                  <div class="title_desc">
                    【{{item.name}}】：{{item.title}}
                  </div>
                </li>
              </ul>
              <div class="no_data" v-else>
                <div class="no_data_wrapper">
                  <div class="img_wrapper">
                    <img :src="noDataImgUrl"/>
                  </div>
                  <p class="no_data_hint">哎呀！您的数据库没有数据，快来填满它吧！</p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--底部-->
      <el-row class="bottom">
        <el-col :md="24" :lg="12">
          <div class="left_wrapper finish_status">
            <div class="title">
              <span class="name">工作任务完成进度</span>
            </div>
            <div class="content completed_progress">
              <ul class="wrapper" v-if="completedProgress.length!=0">
                <li class="bar_list" v-for="(item,index)  in completedProgress" :key="index">
                  <div class="name">{{item.name}}</div>
                  <div class="bar_wrapper">
                    <div class="wrapper_box">
                      <el-tooltip placement="top">
                        <div slot="content">
                          {{item.name}}<br/>
                          工作任务完成进度 : {{item.val}}<br/>
                          总任务数 : {{item.total}}<br/>
                          任务完成数 : {{item.done}}
                        </div>
                        <div class="bar_outer">
                          <div class="bar_inner" ref="barInner" :style="{width:item.val}"></div>
                          <div class="progress_head" ref="barHead" :style="{left:'calc('+item.val+' - 10px)'}" v-if="item.val.substring(0,item.val.indexOf('%'))!=0"></div>
                        </div>

                      </el-tooltip>
                    </div>
                    <div class="bar_text">{{item.val}}</div>
                  </div>
                </li>
              </ul>
              <div class="no_data" v-else>
                <div class="no_data_wrapper">
                  <div class="img_wrapper">
                    <img :src="noDataImgUrl"/>
                  </div>
                  <p class="no_data_hint">哎呀！您的数据库没有数据，快来填满它吧！</p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--新增工作计划的弹框-->
      <component :is="addWorkPlanModal" @getWorkPlanListData="getWorkPlanListData"></component>

      <!--临时任务弹框-->
      <el-dialog title="任务完成情况" :visible.sync="taskModal" width="600px" @close="taskModalClose">
        <el-form :model="taskModalParams" ref="taskModalForm">
          <el-form-item label="任务内容" label-width="120px" prop="taskType">
            <el-input v-model="taskModalParams.taskContent" autocomplete="off" disabled></el-input>
          </el-form-item>

          <el-form-item label="总结" label-width="120px" prop="taskType">
            <el-input type="textarea" :rows="2" v-model="taskModalParams.taskSummary">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="tempTaskExecute">执 行</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts'
    import laydate from 'layui-laydate'
    import AddWorkPlanModal from '../../components/AddWorkPlanTask.vue'
    import calendar from './calendar.vue'

    export default {
        name: '',
        data() {
            return {
              value1: '',
              noDataImgUrl:require('@/assets/images/noData.png'),
              tempTaskData:[],                     //临时任务展示截取的数据
              tempTaskTotalData:[],                //临时任务总数据
              focusIndexChartLegendData:[          //关注指标图表的legend数据
                {name:'',color:'#67CCFF'},
                {name:'',color:'#FF5E50'},
                {name:'',color:'#FFC21D'}
              ],
              completedProgress:[],               //工作任务完成进度
              focusIndexdata:{                    //关注指标数据
                resData:[],
                name:[],
                val:[]
              },
              workAlertData:{                 //重要工作提醒数据
                resData:[],
                name:[],
                list:[]
              },
              addWorkPlanModal:'',
              workPlanListParams:{                //获取工作计划列表数据的请求参数
                isYourSelf:1,
                staffIds:0,
                limit:99,
                start:0,
                taskDate:this.currentDate,   //获取当前日期：年-月-日
                sort:'task_planbegin',
                order:'asc'
              },
              workPlanListData:[],                 //工作计划列表返回数据
              calendar2:{
                range:true,
                value:[[new Date().getFullYear(), new Date().getMonth()+1, 1],[new Date().getFullYear()+1,new Date().getMonth()+1,1]], //默认日期
                lunar:false, //显示农历
                select(begin,end){
                  // console.log(begin.toString(),end.toString());
                }
              },
              taskModal:false,    //是否显示临时任务弹框
              taskModalParams:{   //临时任务弹框form的参数
                taskContent:'',
                taskSummary:'',
                taskId:''
              }
            }
        },
        filters:{
          filterTime:(val)=>{
            return val.split(" ")[1].substring(0,val.split(" ")[1].lastIndexOf(":"));
          }
        },
        components:{AddWorkPlanModal, calendar},
        computed:{
          currentDate(){
            var day = new Date().getDate();
            if(day < 10){
              day = '0' + day;
            }
            return `${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${(day)}`;
          },
          /**
           * 导航列表：
           * @param val
           */
          navList() {
            return this.$store.getters.filterNavs.length!=0?this.$store.getters.filterNavs:JSON.parse(sessionStorage.getItem('filterNavList'));
          },
        },
        methods:{
          openByDrop(e){
            this.calendar3.show=true;
            this.calendar3.left=e.target.offsetLeft+19;
            this.calendar3.top=e.target.offsetTop+70;

            e.stopPropagation();
            window.setTimeout(()=>{
              document.addEventListener("click",(e)=>{
                this.calendar3.show=false;
                document.removeEventListener("click",()=>{},false);
              },false);
            },1000)
          },
          openByDialog(){
            this.calendar4.show=true;
          },
          closeByDialog(){
            this.calendar4.show=false;
          },
          openMultiByDrop(e){
            this.calendar5.show=true;
            this.calendar5.left=e.target.offsetLeft+19;
            this.calendar5.top=e.target.offsetTop+70;
            e.stopPropagation();
            window.setTimeout(()=>{
              document.addEventListener("click",(e)=>{
                this.calendar5.show=false;
                document.removeEventListener("click",()=>{},false);
              },false);
            },1000)
          },
          changeEvents(){
            this.calendar1.events={
              '2017-7-20':'$'+(Math.random()*1000>>0),
              '2017-7-21':'$'+(Math.random()*1000>>0),
              '2017-7-22':'$'+(Math.random()*1000>>0),
            }
          },
          /**
           * 关注指标echart图：
           */
          showFocusIndexChart(data){
            if(this.$refs.focusIndexChart){
              var myChart = echarts.init(this.$refs.focusIndexChart);
              var option= {
                color: ['#3398DB'],
                tooltip : {
                  trigger: 'axis',
                  // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  // }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis : [
                  {
                    type : 'category',
                    data :data.name,
                    axisTick: {       //去掉刻度线
                      show: false
                    },
                    axisLabel:{       //设置坐标轴刻度值颜色
                      color:'#fff'
                    }
                  }
                ],
                yAxis : [
                  {
                    type : 'value',
                    offset:10,        //设置y轴坐标值的偏移量
                    axisLine: {       //去掉坐标轴线
                      show: false
                    },
                    axisTick: {      //去掉刻度线
                      show: false
                    },
                    axisLabel:{       //设置坐标轴刻度值颜色
                      color:'#fff'
                    },
                    splitLine: {
                      show: true,
                      lineStyle:{
                        color: ['#000'],     //设置网格线颜色
                        width: 1,
                        type: 'solid'

                      }
                    }
                  }
                ],
                series : [
                  {
                    type:'bar',
                    barWidth: '40%',
                    data:data.val,
                    itemStyle: {
                      normal: {
                        color: function (params){       //给每个柱状图设置渐变色
                          var colorList = [
                            ['rgba(103,204,255,1)','rgba(67,71,91,1)'],
                            ['rgba(255,94,80,1)','rgba(67,71,91,1)'],
                            ['rgba(255,194,29,1)','rgba(67,71,91,1)']
                          ];

                          var index=params.dataIndex;

                          return new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                            {offset: 0, color: colorList[index][0]},
                            {offset: 1, color: colorList[index][1]}
                          ]);
                        }
                      }
                    }
                  }
                ]
              };
              myChart.setOption(option);
              window.onresize = ()=>{
                myChart.resize();
              };
            }
          },
          /**
           * 重要工作提醒echart图：
           */
          showWorkAlertChart(data){
            if(this.$refs.workAlert){
              var myChart = echarts.init(this.$refs.workAlert);
              var option = {
                tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  orient: 'vertical',
                  left: 'left',
//                data: ['直接访问','邮件营销']
                  data:data.name,
                  textStyle:{
                    color:'#fff'
                  }
                },
                color:['#32BAFF', '#FFFFFF'],
                series : [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
//                  data:[
//                    {value:335, name:'直接访问'},
//                    {value:310, name:'邮件营销'}
//                  ],
                    data:data.list,
                    clickable:true,
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              };
              myChart.on('click',  (params)=>{
                this.navList.map((item,index)=>{
                  if(item.name=='navRecordingPage'){
                    this.$store.state.mutations.isActive=index;
                    sessionStorage.setItem("activeNavIndex",index);
                  }
                })
                this.$router.push({
                    name:'navRecordingPage',
                    params:{id:params.name}
                });
              });
              myChart.setOption(option);
              window.onresize = ()=>{
                myChart.resize();
              };
            }
          },
          
          /**
           * 关注指标数据调取：
           */
          getFocusIndexData(){
            this.$axios("/api/CMM/page/main/attentionIndexInfAndDetail_getAttentionIndexInfList")
              .then(res =>{
                if(res.data.data){
                  this.loading1=false;
                  this.focusIndexdata.resData=res.data.data.rows.slice(0,3);
                  this.focusIndexdata.resData.map((item,index)=>{
                    this.$set(this.focusIndexdata.name,index,item.taskName);
                    this.$set(this.focusIndexdata.val,index,item.ytotalTask);
                    this.focusIndexChartLegendData[index].name=item.taskName;
                  })
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 重要工作提醒数据调取：
           */
          getWorkAlertData(){
            this.$axios("/api/CMM/page/main/importWorkAlertInf_getImportWorkAlertInfList")
              .then(res =>{
                if(res.data.data){
                  this.workAlertData.resData=res.data.data.rows;
                  this.workAlertData.resData.map((item,index)=>{
                    this.workAlertData.name.push(item.taskName);
                    this.workAlertData.list.push({
                      value:item.ytotalTask,
                      name:item.taskName
                    });
                  })
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },

          
          /**
           * 临时任务数据调取：
           */
          getTempTaskData(){
            this.$axios.post("/api/CMM/page/main/warnAndList_getWarnAndListList",this.$qs.stringify({isPcOrMobile:1}))
              .then(res =>{
                if(res.data.data){
                  this.tempTaskTotalData=res.data.data.rows;
                  this.tempTaskData=[];
                  this.tempTaskTotalData.slice(0,5).map((item,index)=>{
                    var date=item.createTime.split(" ")[0];
                    var time=item.createTime.split(" ")[1];
                    this.tempTaskData.push({
                      taskId:item.taskId,
                      date:date.substring(date.indexOf("-")+1),
                      title:item.taskDesc,
                      time:time.substring(0,time.lastIndexOf(':')),
                      name:item.xstaffName
                    })
                  })
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 工作任务完成进度：
           */
          getCompletedProgressData(){
            this.$axios.post("/api/CMM/page/main/taskIndexPro_getTaskIndexProList")
              .then(res =>{
                if(res.data.data){
                  res.data.data.rows.map((item,index)=>{
                    this.completedProgress.push({
                      name:item.taskName,        //任务名称
                      val:(item.yfinishPer*100).toFixed(0)+'%',   //任务完成率
                      done:item.yfinishTask,     //任务完成数
                      total:item.ytotalTask      //任务总数
                    })
                  })
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * layDate日期控件：
           */
          calendar(){
            laydate.render({
              elem: "#test-n1", // 指定元素
              type: "datetime", // 组建的类型：year,month,time···
              done: value => { // 点击确认执行的回调函数，会把当前选择的时间传入进来
                // 把选择的时间赋值给先前定义好的变量，显示在页面
                this.date = value;
              }
            });
          },
          /**
           * 新增工作计划：
           */
          addWorkPlan(){
            this.$store.state.mutations.taskParams.taskType=null;
            this.$store.state.mutations.taskParams.channel='';
            this.$store.state.mutations.taskParams.taskDesc='';
            this.$store.state.mutations.taskParams.taskFrequency=0;
            this.$store.state.mutations.showAddModal = true
            this.addWorkPlanModal='AddWorkPlanModal';
            this.$store.state.mutations.workPlanTaskParams.fromPage='workPlan';
          },
          /**
           * 工作计划选择的日期：
           */
          selectDate(date){
            if(date < 10){
              date = '0' + date;
            }
            this.workPlanListParams.taskDate=`${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${date}`;
            this.getWorkPlanList();
          },
          /**
           * 查询工作计划：
           */
          getWorkPlanList(){
            this.$axios.post("/api/CMM/page/taskDistribution/taskDistribution_getTaskDistributionList",this.$qs.stringify(this.workPlanListParams))
              .then(res =>{
                  if(res.data.data){
                    this.workPlanListData=res.data.data.rows;
                  }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          getWorkPlanListData(){
            this.getWorkPlanList();
            this.getTempTaskData();
          },
          /**
           * 更多临时任务：
           * 跳转到我的工作页面，并带有参数{taskType=3，taskStatus=1}
           */
          moreTask(){
            this.navList.map((item,index)=>{
              if(item.name=='navRecordingPage'){
                this.$store.state.mutations.isActive=index;
                sessionStorage.setItem("activeNavIndex",index);
              }
            })
            this.$store.state.mutations.workPlanTaskParams.fromPage='workPlan';
            this.$router.push({name:'navRecordingPage',query:{taskTypeParam:'3',taskStatusParam:'1'}});
          },
          /**
           * 点击临时任务显示弹框：
           */
          clickTempTask(val){
            this.taskModal=true;
            this.taskModalParams.taskContent=val.title;
            this.taskModalParams.taskId=val.taskId;
          },
          /**
           * 临时任务弹框--关闭：
           */
          taskModalClose(){
            this.taskModal=false;
          },
          /**
           * 临时任务弹框--执行：
           */
          tempTaskExecute(){
            var params={
              taskId:this.taskModalParams.taskId,
              taskSummary:this.taskModalParams.taskSummary,
              xstaffIdV:'',
              status:'0'
            }
            this.$axios.post("/api/CMM/page/taskDistribution/taskDistribution_saveOrUpdateTask", this.$qs.stringify(params))
              .then(res => {
                if(res.data.success){
                  this.taskModal=false;
                  this.taskModalParams.taskSummary='';
                  this.getTempTaskData();
                  this.$message({
                    message: '执行成功！',
                    type: 'success'
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        created(){
          this.getFocusIndexData();
          this.getWorkAlertData();
          this.getTempTaskData();
          this.getCompletedProgressData();
        },
        updated(){
          this.showFocusIndexChart(this.focusIndexdata);
          this.showWorkAlertChart(this.workAlertData);
        },
        mounted(){
          this.workPlanListParams.taskDate=this.currentDate;
          this.getWorkPlanList();
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  @import "../../assets/less/common";

  //渠道经理、渠道高级经理:
  #show_By_channel_manager{
    .w(100%);
    .h(100%);
    .p(21px 0 21px 42px);

    /**
      顶部：
     */
    .top,.middle,.bottom{
      .h(440px);
      .el-col{
        .h(100%);
        .m(21px 0);
        .p-r(42px);
        .left_wrapper,.right_wrapper{
          .b(@boxBg);
          .w(100%);
          .h(100%);
          .b-r(5px);
          .p(35px);
          min-width: 440px;
          .title{
            .p-b(15px);
            overflow:hidden;
            .name{
              float:left;
            }
            .more{
              float:right;
              cursor:pointer;
              &.button{
                .w(50px);
                .h(26px);
                .b-r(3px);
                .l-h(26px);
                .b(@green);
                .t-a(center);
                cursor:pointer;
                .d-i(inline-block);
              }
            }
          }
          .content{
              .w(100%);
              .h(calc(~"100% - 37px"));
              min-width: 395px;
            #calendar{
              .w(300px);
              .h(100%);
              float:left;
              .layui-laydate-static{
                .b(@boxBg);
                .layui-laydate-content {
                  thead{
                    .b(@calendarHeadBg);
                    th{
                      &:first-child,&:last-child{
                        color:red;
                      }
                      color:@white;
                    }
                  }
                  tbody{
                    td{
                      .t-a(left);
                      border-right:1px solid #9ea0aa;
                      border-bottom:1px solid #9ea0aa;
                      border-bottom-right-radius: 3px;
                    }
                  }
                }
              }
            }
            .schedule_info{
              float:right;
              .h(100%);
              overflow:auto;
              min-width: 80px;
              .w(calc(~"100% - 300px"));
              .schedule_wrapper{
                .w(100%);
                .h(100%);
                .p(0 0 0 5px);
                .schedule_list{
                  .p(8px 0 8px 0);
                  width: 135%;
                  border-bottom:1px solid #34374D;
                  .schedule_time,.schedule_desc{
                    .f-s(16px);
                    .t-a(left);
                  }
                  .schedule_desc{
                    .f-s(12px);
                  }
                }
              }
    
            }
    //设置滚动条的样式
    .schedule_info::-webkit-scrollbar {
      width: 6px;/*高宽分别对应横竖滚动条的尺寸*/
      height: 6px;
    }
    //滚动条的滑块
    .schedule_info::-webkit-scrollbar-thumb {
      display: inline-block;
      background-color: #4a88fa;
      border-radius: 3px;
      box-shadow: inset 0 0 5px #4a88fa;
    }
    //滚动条里面轨道
    .schedule_info::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #43475b;
      border-radius: 10px;
      border: 1px solid #34374D;
      background: #43475b;
    }
    //定义右下角拖动块的样式
    .schedule_info::-webkit-scrollbar-corner {
      background-color: #43475b;
    }
          }
          .no_data{
            .w(100%);
            .h(calc(~"100% - 37px"));
            .no_data_wrapper{
              .w(100%);
              .h(100%);
              .m-t(72px);
              .img_wrapper{
                .w(120px);
                .h(120px);
                .m(0 auto);
                img{
                  .w(100%);
                  .h(100%);
                }
              }
              .no_data_hint{
                .h(70px);
                .l-h(70px);
                .t-a(center);
              }
            }
          }
          .bar_chart{
            position:relative;
            .color_plate{
              .w(100%);
              .h(30px);
              .l-h(30px);
              .f-s(0);
              top:5px;
              left:0;
              position:absolute;
              .legend_wrapper{
                .h(100%);
                .m-r(5%);
                .d-i(inline-block);
                .legend_color{
                  .d-i(inline-block);
                  .w(24px);
                  .h(12px);
                  .b-r(2px);
                }
                .legend_title{
                  .m-l(10px);
                  .f-s(14px);
                }
              }
            }
            .chart_wrapper{
              .h(calc(~"100% - 30px"));
            }
          }
          .temp_task{
            ul{
              .h(100%);
              .p-t(30px);
              li.task_list{
                border-bottom:1px solid #34374D;
                    display: table;
                    width: 98%;
                    padding-bottom: 13px;
                    margin-bottom: 7px;
                    .times{
                      font-size: 14px;
                    }
                    .title_desc{
                      color: #409EFF;
                      cursor: pointer;
                    }
                    .title_desc:hover{
                      color: #fff;
                      cursor: pointer;
                    }
              }
              // li.task_list{
              //  // .f-s(0);
              //   .h(50px);
              //   .l-h(50px);
              //   .p(0 10px);
              //   cursor:pointer;
              //   /*overflow:hidden;*/
              //   border-bottom:1px solid #34374D;
              //   &:last-child{
              //     border-bottom:none;
              //   }
              //   &:hover{
              //     .time,.title_desc,.date{
              //       color:#79D2FF;
              //     }
              //   }
              //   .time,.title_desc,.date{
              //     .f-s(16px);
              //     .f-f(@workPlatformText);
              //     color:#fff;
              //     .t-a(left);
              //    // .d-i(inline-block);
              //   }
              //   .time{
              //     .w(90px);
              //     float:left;
              //   }
              //   .title_desc{
              //     position:relative;
              //     .p-r(50px);
              //     float:right;
              //     overflow:hidden;
              //     white-space:nowrap;
              //     text-overflow:ellipsis;
              //     .w(calc(~"100% - 90px"));
              //     .date{
              //       position:absolute;
              //       .w(50px);
              //       .h(50px);
              //       top:0;
              //       right:0;
              //       //   .m-l(-50px);
              //       .t-a(right);
              //     }
              //   }
              // }
            }
          }
          .completed_progress{
            ul.wrapper{
              .p-t(40px);
              li.bar_list{
                .h(85px);
                .w(100%);
                .name{
                  .h(20px);
                  .l-h(20px);
                  .f-s(16px);
                  color:@white;
                }
                .bar_wrapper{
                  .h(calc(~"100% - 29px"));
                  .bar_outer{
                    float:left;
                    .h(100%);
                    cursor:pointer;
                  }
                  .wrapper_box{
                    .w(90%);
                    .h(100%);
                    float:left;
                    .bar_outer{
                      position:relative;
                      .w(100%);
                      .h(8px);
                      margin-top:8px;
                      border-radius: 4px;
                      .b(@progressBarStart);
                      .bar_inner{
                        //.w(80%);
                        .h(100%);
                        border-radius:4px;
                        .b(-webkit-linear-gradient(left, @progressBarStart, @progressBarEnd));
                        animation: mymove 2s ease-in-out 0s 1 alternate forwards;
                        -webkit-animation: mymove 2s ease-in-out 0s 1 alternate forwards;
                      }
                      @keyframes mymove
                      {
                        from {width:0}
                      }
                      .progress_head{
                        position:absolute;
                        top:-2px;
                        .w(12px);
                        .h(12px);
                        .b(@progressBarEnd);
                        filter: blur(4px);
                        animation: headmove 2s ease-in-out 0s 1 alternate forwards;
                        -webkit-animation: headmove 2s ease-in-out 0s 1 alternate forwards;
                      }
                      @keyframes headmove
                      {
                        from {left:0}
                      }
                    }
                  }
                  .bar_text{
                    .w(10%);
                    .h(100%);
                    float:right;
                    .t-a(right);
                    color:@white;
                    .f-s(16px);
                    .f-f(@workPlatformText);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
