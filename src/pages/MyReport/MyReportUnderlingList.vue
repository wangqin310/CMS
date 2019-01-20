<template>
  <div id="myReportUnderlingList">
    <div style="margin-bottom: 15px">
      <span v-if="$root.loginUserInfo.positionId == 2 || $root.loginUserInfo.positionId == 7"><a @click="returnMyReportList" class="astyle">我的报告</a>&nbsp;&nbsp;&nbsp;</span>
      <a @click="returnAreaList" v-if="checkPosition" class="astyle">返回区域中心</a>
      <div style="float: right">
        <el-switch
          @change="changeStatus"
          v-model="flag"
          active-text="在职"
          inactive-text="离职">
        </el-switch>
      </div>
    </div>
    <div style="margin-bottom: 15px">
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="4">
              人员名称：
            </el-col>
            <el-col :span="6">
              <el-input v-if="$root.loginUserInfo.positionId == 2 || $root.loginUserInfo.positionId == 7"
                        placeholder="请输入人员名称"
                        v-model="myReportUnderlingParams.searchParams.channelManagerName"
                        size="mini"></el-input>
              <el-input v-else
                        placeholder="请输入人员名称"
                        v-model="myReportUnderlingParams.searchParams.userName"
                        size="mini"></el-input>
            </el-col>
            <el-col :span="8" style="padding-left:10px">
              <el-button size="mini" type="primary" @click="search">查询</el-button>
              <el-button size="mini" @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="table_wrapper">
      <el-table :data="resTableData" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
        <el-table-column v-for="(item,index) in columnList" :class-name="item.className" :key="index" :label="item.labelName" :prop="item.propName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning"
                       @click="showUnderlingReport(scope.row.empId,scope.row.positionId)"
                       round size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <Pagination :tableDataName="tableDataName"></Pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from '../../components/Pagination';
  export default {
    name: "myReportUnderlingList",
    data(){
      return {
        columnList:[
          {labelName:'人员名称',propName:'userName'},
          {labelName:'职位名称',propName:'positionName'},
          {labelName:'报告总数',propName:'repNum'}
        ],
        tableDataName:'myReportUnderlingTableData',
        empReport:'',
        flag:true,
      }
    },
    components:{
      Pagination
    },
    computed:{
      resTableData(){
        return this.$store.getters.resTableData[this.tableDataName];
      },
      myReportUnderlingParams(){
        return this.$store.state.mutations.commonParams[this.tableDataName];
      },
      loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
      checkPosition(){
        var positionId = this.$root.loginUserInfo.positionId;
        if(positionId == '3' || positionId == '4' || positionId == '5' || positionId == '8'){
          return true;
        }else{
          return false;
        }
      }
    },
    methods:{
      changeStatus(){
        //重置页码
        this.$store.state.mutations.commonParams[this.tableDataName].current=1;
        this.$store.state.mutations.tableLimit.params.start=0;
        if(this.flag){
          this.$store.state.mutations.commonParams[this.tableDataName].searchParams.status='2';
        }else{
          this.$store.state.mutations.commonParams[this.tableDataName].searchParams.status='0';
        }
        //刷新页面数据
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      returnMyReportList(){
        this.$store.state.mutations.isMyReportParams.positionId = '';
        this.$store.state.mutations.isMyReportParams.flag = true;
        //页面重置
        this.$store.state.mutations.commonParams['myReportTableData'].current=1;
        this.$store.state.mutations.tableLimit.params.start=0;
        //更改查询参数
        this.$store.state.mutations.commonParams['myReportTableData'].searchParams.empId = '';
        this.$store.state.mutations.commonParams['myReportTableData'].searchParams.isMyReport = 0;
        //组件跳转
        this.$store.state.mutations.isMyReportList='MyReportList';
      },
      returnAreaList(){
        this.$store.state.mutations.commonParams['myReportAreaTableData'].current=1;
        this.$store.state.mutations.tableLimit.params.start=0;
        this.$store.state.mutations.isMyReportList='myReportAreaList';
      },
      showUnderlingReport(empId,positionId){//显示下属报告列表
        this.$store.state.mutations.isMyReportParams.positionId = positionId;
        this.$store.state.mutations.isMyReportParams.flag = false;
        this.$store.state.mutations.tableLimit.params.start = 0;
        this.$store.state.mutations.commonParams['myReportTableData'].searchParams.empId = empId;
        this.$store.state.mutations.commonParams['myReportTableData'].searchParams.isMyReport = '';
        this.$store.state.mutations.isMyReportList='MyReportList';
      },
      search(){
        this.myReportUnderlingParams.current = 1;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      reset(){
        this.myReportUnderlingParams.searchParams.userName = '';
        this.myReportUnderlingParams.searchParams.channelManagerName = '';
      },
      resetUrl(){
        this.$store.state.mutations.commonParams['myReportUnderlingTableData'].tableUrl = '/api/CMM/login_getAllUnderlingUserForPage';
        this.$store.state.mutations.commonParams['myReportUnderlingTableData'].searchParams.orgId = '';
      }
    },
    mounted(){
      /**
       * 重置搜索条件，页码还原
       */
      if(this.$root.loginUserInfo.positionId == '2' || this.$root.loginUserInfo.positionId == '7'){
        this.resetUrl();
      }
      this.$store.state.mutations.commonParams[this.tableDataName].searchParams.status='2';
      this.reset();
      this.myReportUnderlingParams.current = 1;
      this.myReportUnderlingParams.searchParams.userId = this.$root.loginUserInfo.empId;
      /**
       * 请求表格列表数据：
       */
      this.$store.dispatch("getAjaxTableData",{tableDataName:['myReportUnderlingTableData'],vm:this});
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";

  .el-button--warning{
    padding: 4px 11px!important;
  }
</style>
