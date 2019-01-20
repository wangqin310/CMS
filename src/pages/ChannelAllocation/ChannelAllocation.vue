<template>
    <div id="channel_allocation">
        <el-row class="ca_content_row" :gutter="50">
          <channel-allocate-table></channel-allocate-table>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import ChannelAllocateTable from './ChannelAllocateTable.vue'
    export default {
        name: '',
        data() {
            return {}
        },
        components:{ChannelAllocateTable}
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
