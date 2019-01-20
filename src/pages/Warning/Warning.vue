<template>
    <div id="warning">
      <!--搜索区-->
      <div id="search_wrapper">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="舆情状态">
            <el-select v-model="warningParams.searchParams.earlyWarnStatus" placeholder="--请选择--">
              <el-option :label="item.label" :value="item.val" v-for="(item,index) in warningStatus" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="舆情信息">
            <el-input class="input_box" v-model="warningParams.searchParams.earlyWarnTitle" placeholder="请输入舆情信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn search" type="primary" @click="search">查询</el-button>
            <el-button class="btn reset" plain @click="reset">重置</el-button>
            <el-button class="btn alert" type="primary" v-if="$root.loginUserInfo.positionId != 5" @click="warningAlert">舆情预警</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--表格-->
      <div class="table_wrapper">
        <el-table :data="resTableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
          <el-table-column v-for="(item,index) in tableColumn" :key="index" :prop="item.propName" :label="item.labelName" :sortable="item.isSortable" :width="item.width"></el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button round  type="warning" size="mini" @click="warningDeal(scope.row)" >舆情处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="page_wrapper">
        <pagination :tableDataName="tableDataName"></pagination>
      </div>

      <!--舆情处理会话弹框-->
      <component :is="warningDialogModal" :resDataName="resDataName"></component>

      <!--舆情预警弹框-->
      <component :is="warningAlertModal"></component>
    </div>
</template>

<script type="text/ecmascript-6">
    import Pagination from './../../components/Pagination.vue'
    import warningDialogModal from '../../components/WarningDialogModal.vue'
    import warningAlertModal from '../../components/WarningAlertModal.vue'
    export default {
        name: 'warning',
        data() {
            return {
                warningStatus:[
                  {label:'--请选择--',val:''},
                  {label:'未处理',val:0},
                  {label:'已处理',val:2}
                ],
                tableColumn:[
                  {propName:'commentTitle',labelName:'舆情标题',isSortable:true,width:180},
                  {propName:'pubTime',labelName:'发布时间',isSortable:true,width:180},
                  {propName:'dealTime',labelName:'最后处理时间',isSortable:true,width:180},
                  {propName:'pstaffName',labelName:'上报人员',isSortable:true,width:180},
                  {propName:'pstaffTel',labelName:'上报人员电话',isSortable:true,width:180},
                  {propName:'commentMess',labelName:'舆情信息',isSortable:true,width:180},
                  {propName:'dstaffName',labelName:'直接处理人',isSortable:true,width:180},
                  {propName:'dstaffTel',labelName:'直接处理人电话',isSortable:true,width:180},
                  {propName:'status',labelName:'状态',isSortable:true,width:180}
                ],
                warningDialogModal:'',              //舆情处理会话弹框
                warningAlertModal:'',               //舆情预警弹框
                tableDataName:'warningTableData',    //接口返回的数据名称
                resDataName:'warningDealResData'
            }
        },
        components:{Pagination,warningDialogModal,warningAlertModal},
        computed:{
          /**
           * table表格数据：
           */
          resTableData(){
            this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
              switch(item.status){
                case '0':
                  item.status='未处理';
                  break;
                case '1':
                  item.status='处理中';
                  break;
                case '2':
                  item.status='已处理';
                  break;
              }
            });
            return this.$store.getters.resTableData[this.tableDataName];
          },
          //加载
          loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
          warningParams(){
            return this.$store.state.mutations.commonParams[this.tableDataName];
          }
        },
        methods:{
          /**
           * 搜索：
           */
          search() {
            this.$store.state.mutations.commonParams[this.tableDataName].current=1;
            this.$store.state.mutations.tableLimit.params.start=0;
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
          },
          /**
           * 重置：
           */
          reset(){
            this.$store.state.mutations.commonParams[this.tableDataName].current=1;
            this.warningParams.searchParams.earlyWarnStatus='';
            this.warningParams.searchParams.earlyWarnTitle='';
            this.$store.state.mutations.tableLimit.params.start=0;
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
          },
          /**
           * 舆情预警：
           */
          warningAlert(){
            this.warningAlertModal='warningAlertModal';
            this.$store.state.mutations.warningParams.showWarningAlertModal=true;
          },
          /**
           * 舆情处理：
           */
          warningDeal(row){
            this.$store.state.mutations.warningParams.showWarningDialogModal=true;
            this.$store.state.mutations.warningParams.publicId=row.publicId;
            this.$store.state.mutations.warningParams.dstaffId=row.dstaffId;
            this.$store.state.mutations.warningParams.status=row.status;
            this.$store.state.mutations.warningParams.isShowButton=row.isShowButton;
            this.$store.state.mutations.warningParams.isShowTransfer=row.isShowTransfer;
            this.warningDialogModal='warningDialogModal';
            if(row.status=="已处理"){
              this.$store.state.mutations.warningParams.showTitle = '舆情处理(该舆情已关闭)';
            }else {
              this.$store.state.mutations.warningParams.showTitle = '舆情处理';
            }
            var obj={
              vm:this,
              resDataName:this.resDataName,
              url:'CMM/page/earnWarn/earlyWarn_getEarlyWarnDetailList',
              params:{
                publicId:row.publicId||10
              }
            }
            this.$store.dispatch("getResData",obj);
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
  #warning{
    padding-left: 40px;
    padding-top: 20px;
    padding-right: 48px;

    /**
      搜索框：
    */
    .el-form-item__label{
      color:@white;
    }
    input,select{
      background: #2a2d41;
      width: 100px;
      height: 28px;
      border: 1px solid #7ba3ff;
      border-radius: 3px;
      color: #f5f5f6;
      box-shadow: 0 0 10px #7bb0ff;
      padding-left: 8px;
      font: 12px/28px '微软雅黑';
      margin-right: 0;
    }
    .el-textarea__inner{
      .b(@boxBg);
      border: 1px solid #7ba3ff;
    }
    .input_box input{
      .w(150px);
    }
    .btn{
      position:relative;
      width: 60px;
      height: 28px;
      .t-a(center);
      .f-s(12px);
      .f-f('微软雅黑');
      .m-t(5px);
      border: none;
      border-radius: 3px;
      margin: 0 15px;
      span{
        .w(100%);
        .h(100%);
        top:0;
        left:0;
        .l-h(28px);
        position:absolute;
        display:inline-block;
      }
      // .search,.alert{
      //   .b(#4a88fa);
      //   color: #fff;
      // }
      .reset{
        .b(#f4f4f5);
        span{
          color:#909399!important;
        }
        &:hover{
          color:#909399!important;
        }
      }
    }

    /**
      表格：
     */
    /* .table_wrapper{
      border-radius:5px;
      border:1px solid #7ba3ff;
      -webkit-box-shadow: 0 0 10px #7bb0ff;
      -moz-box-shadow: 0 0 10px #7bb0ff;
      box-shadow: 0 0 10px #7bb0ff;
      .el-table td,.el-table th.is-leaf{
        border-bottom:1px solid #7ba3ff;
      }
      .el-table__header{
        .b(red);
      }
      .el-table__header-wrapper{
        border-top-left-radius:5px;
      }
      .el-table .ascending .sort-caret.ascending{
        border-bottom-color:#7bb0ff;
      }
      .el-table .descending .sort-caret.descending{
        border-top-color:#7bb0ff;
      }
      .el-table__empty-block{
        .b(#2a2d41);
        .el-table__empty-text{
          color:@white;
        }
      }
      .cell{
        button{
          .m(0);
          .w(70px);
          .b(@orange);
          border-radius:12px;
          span{
            color:@white;
          }
        }
      }
    } */

    /**
      分页
     */
    .page_wrapper{
      .m-t(20px);

    }
}
</style>
