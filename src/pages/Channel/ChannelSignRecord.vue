<template>
    <div id="channel_sign_record">
      <!-- 点击签到记录的弹出框 -->
      <el-dialog title="渠道签到记录" :visible.sync="isShow" class="signRecord"  @close="close" >
        <el-table :data="gridData" height='440' v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
          <el-table-column property="tim" label="签到时间" width="200"></el-table-column>
          <el-table-column property="channelName" label="渠道名称" width="300"></el-table-column>
          <el-table-column property="ty" label="状态"></el-table-column>
        </el-table>
        <div class="page_wrapper">
          <pagination :tableDataName="tableName"></pagination>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import Pagination from './../../components/Pagination.vue'
    export default {
        name: '',
        props:['showChannelSignRecord','gridData','tableDataName'],
        data() {
            return {
              tableData:[],
              isShow:false,
              tableName:''
            }
        },
        components:{Pagination},
        computed:{
          loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      }
        },
        methods:{
          /**
           * 关闭：
           */
          close(){
            this.isShow=false;
            this.$parent.channelSignRecordCom='';
          }
        },
        mounted(){
          this.tableName=this.tableDataName;
          this.isShow=this.showChannelSignRecord;
        }
    }
</script>

<style lang="less">
  #channel_sign_record{
  .page button, .page li{
    background: none;
  }
   .page_text{
     color: #fff;
   }
  }
</style>
