<template>
    <div id="systemNews">
     <!--表格-->
      <div class="table_wrapper">
        <el-table :data="resTableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}"  v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
          <el-table-column v-for="(item,index) in tableColumn" :key="index" :prop="item.propName" :label="item.labelName" :sortable="item.isSortable" :width="item.width"></el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="page_wrapper">
        <pagination :tableDataName="tableDataName"></pagination>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Pagination from './../../components/Pagination.vue'
    export default {
        name: 'systemNews',
        data() {
            return {
              tableDataName:'SystemNewsTableData',    //接口返回的数据名称
              tableColumn:[
                {propName:'releaseTime',labelName:'发布时间',width:180},
                {propName:'message',labelName:'内容'}
              ]
            }
        },
        components:{Pagination},
        computed:{
          /**
           * table表格数据：
           */
          resTableData(){
            return this.$store.getters.resTableData[this.tableDataName];
          },
          loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
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
  @import "../../assets/less/reset";
  @import "../../assets/less/common";
#systemNews{
    padding-left: 40px;
    padding-top: 20px;
    padding-right: 48px;
  /**
      表格：
     */
    // .table_wrapper{
    //   border-radius:5px;
    //   border:1px solid #7ba3ff;
    //   -webkit-box-shadow: 0 0 10px #7bb0ff;
    //   -moz-box-shadow: 0 0 10px #7bb0ff;
    //   box-shadow: 0 0 10px #7bb0ff;
    //   .el-table td,.el-table th.is-leaf{
    //     border-bottom:1px solid #7ba3ff;
    //   }
    //   .el-table__header-wrapper{
    //     border-top-left-radius:5px;
    //     th{
    //       .cell{
    //         text-align: center;
    //       }
    //     }
    //   }
    //   .el-table .ascending .sort-caret.ascending{
    //     border-bottom-color:#7bb0ff;
    //   }
    //   .el-table .descending .sort-caret.descending{
    //     border-top-color:#7bb0ff;
    //   }
    //   .el-table__empty-block{
    //     .b(#2a2d41);
    //     .el-table__empty-text{
    //       color:@white;
    //     }
    //   }
    //   .cell{
    //     button{
    //       .m(0);
    //       .w(70px);
    //       .b(@orange);
    //       border-radius:12px;
    //       span{
    //         color:@white;
    //       }
    //     }
    //   }
    // }

    /**
      分页
     */
    .page_wrapper{
      .m-t(20px);

    }
  
  
}
</style>
