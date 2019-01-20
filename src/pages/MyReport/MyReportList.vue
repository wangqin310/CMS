<template>
  <div id="myReportList">
    <div style="margin-bottom: 15px">
      <el-row>
        <el-col :span="14">
          <el-row>
            <el-col :span="2">
              <a v-if="$root.loginUserInfo.positionId != 0 && $root.loginUserInfo.positionId != 1" @click="returnUnderlingList" class="astyle">返回</a>
            </el-col>
            <el-col :span="4">
              报告标题：
            </el-col>
            <el-col :span="6">
              <el-input placeholder="请输入报告标题" v-model="myReportParams.searchParams.myReportTitle" size="mini"></el-input>
            </el-col>
            <el-col :span="6" style="padding-left:5px">
              <el-select size="mini" v-model="myReportParams.searchParams.empReportStatus">
                <el-option v-for="(item,index) in empReportStatus" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" style="padding-left:10px">
              <el-button size="mini" type="primary" @click="search">查询</el-button>
              <el-button size="mini" @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-button v-if="$store.state.mutations.isMyReportParams.flag" style="float:right" size="mini" @click="showAddReport({type:'editReport',isEditor:true})" type="primary">编写报告</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 15px">
      筛选：
        <el-radio-group size="mini" v-model="empReport" @change="changeReportType">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button v-for="(item,index) in $store.state.mutations.reprotTypeArray" :key="index" :label="item.paraVal">{{item.valDesc}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="table_wrapper">
      <el-table :data="resTableData" :default-sort = "{prop: 'reportTime', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
        <el-table-column sortable v-for="(item,index) in columnList" :key="index" :label="item.labelName" :prop="item.propName" width="130"></el-table-column>
        <el-table-column sortable label="本周工作总结" prop="finishSumm" width="120px">
          <template slot-scope="scope">
            <span class="spanWords">
              {{scope.row.finishSumm}}
            </span>
          </template>
        </el-table-column>
        <el-table-column sortable label="需协调和帮助" prop="isHelp" width="120px">
          <template slot-scope="scope">
            <span class="spanWords">
              {{scope.row.isHelp}}
            </span>
          </template>
        </el-table-column>
        <el-table-column sortable label="状态" v-if="!$store.state.mutations.isMyReportParams.flag" prop="reportStatus" width="120px">
          <template slot-scope="scope">
            <span :class="scope.row.reportStatus=='未读'?'font-border':''">
              {{scope.row.reportStatus}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning"
                       @click="showAddReport({type:'showDetail',id:scope.row.id,isEditor:false})"
                       round size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <Pagination :tableDataName="tableDataName"></Pagination>
    </div>
    <!-- 编写报告/查看详情弹框 -->
    <component :is="$store.state.mutations.EditReportCom"></component>
  </div>
</template>

<script>
  import Pagination from '../../components/Pagination';
  import EditReport from './EditReportModal';
  export default {
    name: "MyReportList",
    data(){
      return {
        columnList:[
          {labelName:'报告人',propName:'rstaffName'},
          {labelName:'报告标题',propName:'reportTitle'},
          {labelName:'报告类型',propName:'reportTypeName'},
          {labelName:'业务线条',propName:'channelType'},
          {labelName:'附件信息',propName:'reportAttach'},
          {labelName:'报告时间',propName:'reportTime'}
        ],
        tableDataName:'myReportTableData',
        reportDetailVisible:false,
        empReportStatus:[{label:'显示所有',value:''},{label:'未读',value:'1'},{label:'已读',value:'2'}],
        empReport:''
      }
    },
    components:{
      Pagination,EditReport
    },
    computed:{
      resTableData(){
        this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
          item.reportStatus = item.reportStatus == '1' ? '未读' : '已读';
          item.channelType = (item.channelType == 'M') ? '场景' : ((item.channelType == 'A') ?'渠道':'兼有');
        });
        return this.$store.getters.resTableData[this.tableDataName];
      },
      loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
      myReportParams(){
        return this.$store.state.mutations.commonParams[this.tableDataName];
      },
      actionUrl(){
        return `/api/CMM/attachSave_uploadUserHead`;
      },
    },
    methods:{
      returnUnderlingList(){
        if(this.$root.loginUserInfo.positionId != '2' && this.$root.loginUserInfo.positionId != '7' && this.$store.state.mutations.isMyReportParams.flag){//不是区域总监和代理总监(返回区域列表)
          this.$store.state.mutations.commonParams['myReportAreaTableData'].current=1;
          this.$store.state.mutations.tableLimit.params.start=0;
          this.$store.state.mutations.isMyReportList='myReportAreaList';
        }else{//返回下属列表
          this.$store.state.mutations.commonParams['myReportUnderlingTableData'].current=1;
          this.$store.state.mutations.tableLimit.params.start=0;
          this.$store.state.mutations.isMyReportList='myReportUnderlingList';
        }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      showAddReport(obj){
        this.$store.state.mutations.EditReportCom='EditReport';
        this.$store.state.mutations.EditReportModalParams=obj;
      },
      getReportTypeArray(){
        this.$axios.get("/api/CMM/report_getReportType",
          {
            params:{}
          }
        )
          .then(res =>{
            this.$store.state.mutations.reprotTypeArray = res.data.data;
            if(this.$store.state.mutations.isMyReportParams.positionId == '3' && this.$root.loginUserInfo.positionId != '3'){
              var obj = {
                paraStat: "2",
                paraTypeId: "3600003002",
                paraTypeName: "报告类型",
                paraVal: "6",
                pareParaTypeId: "",
                remark: "",
                systemId: "29",
                valDesc: "渠道评价"
              }
              this.$store.state.mutations.reprotTypeArray.push(obj);
            }
            if((this.$store.state.mutations.isMyReportParams.positionId != '3' && this.$store.state.mutations.isMyReportParams.positionId != '') && this.$root.loginUserInfo.positionId == '3'){
              this.$store.state.mutations.reprotTypeArray = [];
              res.data.data.map((item,index)=>{
                if(item.paraVal != '6'){
                  this.$store.state.mutations.reprotTypeArray.push(item);
                }
              })
            }
          })
          .catch(error=>{
              console.log(error);
            }
          );
      },
      changeReportType(){
        this.$store.state.mutations.tableLimit.params.start=0;
        this.myReportParams.current = 1;
        this.myReportParams.searchParams.empReport = this.empReport;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      search(){
        this.$store.state.mutations.tableLimit.params.start=0;
        this.myReportParams.current = 1;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      reset(){
        this.myReportParams.searchParams.myReportTitle = '';
        this.myReportParams.searchParams.empReportStatus = '';
        this.myReportParams.searchParams.empReport = '';
      }
    },
    mounted(){
      /**
       * 重置搜索条件，页码还原
       */
      this.reset();
      if(this.$root.loginUserInfo.positionId == 0 || this.$root.loginUserInfo.positionId == 1){
        this.$store.state.mutations.isMyReportParams.flag = true;
      }
      if(this.$store.state.mutations.isMyReportParams.flag){
        this.myReportParams.current = 1;
        this.myReportParams.searchParams.isMyReport = 0;
        this.myReportParams.searchParams.empId = '';
      }
      /**
       * 请求表格列表数据：
       */
      this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      /**
       * 加载报告类型
       */
      this.getReportTypeArray();
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";
  .spanWords{
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;
  }
  .font-border{
    color:#409EFF;
  }
</style>
