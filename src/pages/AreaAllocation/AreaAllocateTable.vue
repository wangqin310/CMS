<template>
  <div id="channel_allocate_table">
    <el-col class="ca_content_col" :sm="24" :md="12" v-for="(item,index) in tableCols" :key="index">
      <div class="ca_content">
        <div class="ca_title" v-text="item.text"></div>
        <div class="ca_table_wrapper">
          <!--查询-->
          <el-form class="demo-form-inline ca_search_wrapper" :inline="true">
            <el-form-item class="ca_form_item" :label="item.val=='areaManager'?'大区经理：':'区域名称：'" style="margin-right:10px">
              <el-input placeholder="请输入大区经理名称" size="mini" v-if="item.val=='areaManager'" v-model="searchParams['areaManagerTableData'].searchParams.userName"></el-input>
              <el-input placeholder="请输入区域名称" size="mini" v-if="item.val=='allArea'" v-model="searchParams['allAreaTableData'].searchParams.roleName"></el-input>
            </el-form-item>
            <el-form-item class="ca_form_item">
              <el-button type="primary" @click="searchManager(item.val)" size="mini">查询</el-button>
            </el-form-item>
          </el-form>

          <!--表格-->
          <div class="table_wrapper">
            <el-table height="500"  :data="item.val=='areaManager'?resTableData.areaManagerTableData:resTableData.allAreaTableData"
                      style="width: 100%" v-loading="item.val=='areaManager'?loading1:loading2" element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="#2f3445">
              <el-table-column :prop="column.prop" :label="column.label" :width="column.width" v-for="(column,index) in item.val=='areaManager'?managerColumn:allColumn" :key="index"></el-table-column>
              <el-table-column prop="action" label="操作" v-if="item.val=='areaManager'">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="allocateArea(scope.row)" type="primary" size="small">分配区域</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="page_wrapper">
            <pagination :tableDataName="item.val=='areaManager'?areaManagerTableData:allAreaTableData"></pagination>
          </div>
        </div>
      </div>
    </el-col>

    <!--分配渠道弹框-->
    <component :is="isAreaAllocationModalCom" :currentEmpId="currentEmpId" :currentUser="currentUser" :currentUserId="currentUserId"></component>
  </div>
</template>

<script type="text/ecmascript-6">
  import Pagination from './../../components/Pagination.vue'
  import AreaAllocateModal from './AreaAllocateModal.vue'
  export default {
    name: '',
    data() {
      return {
        tableCols:[
          {text:'大区经理',val:'areaManager'},
          {text:'全部区域',val:'allArea'}
        ],
        managerColumn:[               //渠道经理表格列数据
          {label:'员工',prop:'empId',width:100},
          {label:'电话号码',prop:'tel',width:140},
          {label:'大区经理',prop:'userName',width:100}
        ],
        allColumn:[               //全部渠道表格列数据
          {label:'区域编号',prop:'roleId',width:145},
          {label:'区域名称',prop:'roleName',width:150},
          {label:'区域描述',prop:'description'}
        ],
        areaManagerTableData:'areaManagerTableData',
        allAreaTableData:'allAreaTableData',
        isAreaAllocationModalCom:'',
        currentUserId:'',             //当前员工的用户ID
        currentEmpId:'',       //当前员工Id
        currentUser:''         //当前渠道经理姓名
      }
    },
    components:{Pagination,AreaAllocateModal},
    computed:{
      /**
       * table表格数据：
       */
      resTableData(){
        return this.$store.getters.resTableData;
      },
      loading1(){
        return this.$store.state.mutations.commonParams[this.areaManagerTableData].isLoading;
      },
      loading2(){
        return this.$store.state.mutations.commonParams[this.allAreaTableData].isLoading;
      },
      searchParams(){
        return this.$store.state.mutations.commonParams;
      }
    },
    methods:{
      /**
       * 查询渠道经理：
       */
      searchManager(val){
        this.$store.state.mutations.tableLimit.params.start=0;
        switch(val){
          case 'areaManager':
            this.$store.state.mutations.commonParams[this.areaManagerTableData].current=1;
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.areaManagerTableData,vm:this});
            break;
          case 'allArea':
            this.$store.state.mutations.commonParams[this.allAreaTableData].current=1;
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.allAreaTableData,vm:this});
            break;
        }
      },
      /**
       * 分配渠道：
       */
      allocateArea(val){
        this.currentEmpId=val.empId;
        this.currentUser=val.userName;
        this.currentUserId = val.userId;
        this.isAreaAllocationModalCom='AreaAllocateModal';
      }
    },
    mounted(){
      /**
       * 请求表格列表数据：
       */
      this.$store.dispatch("getAjaxTableData",{tableDataName:this.areaManagerTableData,vm:this});
      this.$store.dispatch("getAjaxTableData",{tableDataName:this.allAreaTableData,vm:this});
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";

  #channel_allocate_table{
    .h(100%);
    .ca_content_col{
      .h(100%);
      padding-right: 10px !important;
      margin-bottom:20px;
      .ca_content{
        .w(100%);
        .h(100%);
        .b-r(5px);
        .b(@boxBg);
        .ca_title{
          .p-t(15px);
          .h(40px);
          .l-h(40px);
          .p-l(15px);
          .f-s(16px);
        }
        .ca_table_wrapper{
          .h(calc(~"100% - 40px"));
          .p(15px);
          .ca_search_wrapper{
            margin-bottom: 10px;
            .ca_form_item{
              .m(0);
              .el-form-item__label{
                .p-r(5px);
                color:@white;
              }
              input{
                .w(100px);
              }
            }
          }
          .table_wrapper {
            .cell button{
              width:70px;
              text-align:center;
              padding-left:0px;
              padding-right: 0px;
            }
            .el-table tr{
              background: #43475b;
            }
            .el-table__header-wrapper{
              border-top-left-radius:5px;
              th{
                background: #43475b;
              }
              .cell{
                text-align: center;
              }

            }
            .el-table__body-wrapper{
              .b(#43475b);
              td{
                background: #43475b!important;
              }
              .el-table__empty-block{
                background: #43475b!important;
              }
            }
          }
          .page_wrapper{
            .h(30px);
            .m-t(20px);
            .page button, .page li{
              background: none;
            }
          }
        }
      }
    }
  }
</style>
