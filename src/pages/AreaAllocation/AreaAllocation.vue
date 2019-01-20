<template>
  <div id="channel_allocation">
    <el-row class="ca_content_row" :gutter="50">
      <area-allocate-table></area-allocate-table>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import AreaAllocateTable from './AreaAllocateTable.vue'
  export default {
    name: '',
    data() {
      return {}
    },
    components:{AreaAllocateTable}
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  #channel_allocation{
    .w(100%);
    .h(100%);
    .p(42px);
    .el-dialog__header{
      border-bottom:1px solid #2a2d41;
    }
    .el-dialog__body{
      .ca_content_row{
        .w(100%);
        .p(20px 0);
      }
    }
  }
</style>
