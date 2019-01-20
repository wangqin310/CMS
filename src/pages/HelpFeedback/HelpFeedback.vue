<template>
    <div id="help_feedback">
      <div class="table_wrapper">
        <el-table :data="resTableData" style="width: 100%">
          <el-table-column sortable prop="rstaffName" label="反馈人" width="180"></el-table-column>
          <el-table-column sortable prop="opinionModule" label="反馈模块" width="180"></el-table-column>
          <el-table-column sortable prop="opinionMess" label="反馈内容"></el-table-column>
          <el-table-column sortable prop="opinionTime" label="反馈时间" width="180"></el-table-column>
        </el-table>
      </div>
      <div class="page">
        <Pagination :tableDataName="tableDataName"></Pagination>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Pagination from '../../components/Pagination';
    export default {
        name: '',
        data() {
            return {
              tableDataName:'helpFeedbackTableData'
            }
        },
        components:{Pagination},
        computed:{
          /**
           * table表格数据：
           */
          resTableData(){
            return this.$store.getters.resTableData[this.tableDataName];
          }
        },
        mounted(){
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
  #help_feedback{
    .w(100%);
    .h(100%);
    .p(42px);
    .cell{
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .page{
      .h(35px);
    }
  }
</style>
