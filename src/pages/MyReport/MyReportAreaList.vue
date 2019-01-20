<template>
  <div id="myReportAreaList">
    <div style="margin-bottom: 15px">
      <a @click="returnMyReportList" class="astyle">我的报告</a>
      <div style="float: right">
        <el-switch
          @change="changeStatus"
          v-model="flag"
          active-text="在职"
          inactive-text="离职">
        </el-switch>
      </div>
    </div>
    <div class="table_wrapper">
      <el-table :data="resTableData" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
        <el-table-column v-for="(item,index) in columnList" :class-name="item.className" :key="index" :label="item.labelName" :prop="item.propName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning"
                       @click="showUnderlingList(scope.row.orgId)"
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
    name: "myReportAreaList",
    data(){
      return {
        columnList:[
          {labelName:'区域名称',propName:'orgName'},
          {labelName:'报告总数',propName:'repNum'}
        ],
        tableDataName:'myReportAreaTableData',
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
      myReportAreaParams(){
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
      showUnderlingList(orgId){//显示区域下属列表
        this.$store.state.mutations.commonParams['myReportUnderlingTableData'].tableUrl = '/api/CMM/report_getUserByDep';
        this.$store.state.mutations.commonParams['myReportUnderlingTableData'].searchParams.orgId = orgId;
        this.$store.state.mutations.commonParams['myReportUnderlingTableData'].current=1;
        this.$store.state.mutations.tableLimit.params.start=0;
        this.$store.state.mutations.isMyReportList='myReportUnderlingList';
      },
      search(){
        this.myReportUnderlingParams.current = 1;
        this.myReportUnderlingParams.current = 1;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      }
    },
    mounted(){
      /**
       * 页码还原
       */
      this.myReportAreaParams.current = 1;
      this.$store.state.mutations.commonParams[this.tableDataName].searchParams.status='2';
      /**
       * 请求表格列表数据：
       */
      this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
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
