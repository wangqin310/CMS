<template>
    <div id="channel_allocate_table">
      <el-col class="ca_content_col" :sm="24" :md="12" v-for="(item,index) in tableCols" :key="index">
        <div class="ca_content">
          <div class="ca_title" v-text="item.text"></div>
          <div class="ca_table_wrapper">
            <!--查询-->
            <el-form class="demo-form-inline ca_search_wrapper" :inline="true">
              <el-form-item class="ca_form_item" label="渠道经理：" style="margin-right:10px">
                <el-input placeholder="请输入渠道经理名称" size="mini" v-if="item.val=='channelManager'" v-model="searchParams['channelManagerTableData'].searchParams.channelManagerName"></el-input>
                <el-input placeholder="请输入渠道经理名称" size="mini" v-if="item.val=='allChannel'" v-model="searchParams['allChannelTableData'].searchParams.userName"></el-input>
              </el-form-item>
              <el-form-item class="ca_form_item" label="渠道状态：" v-if="item.val!='channelManager'" style="margin-right:10px">
                <el-select placeholder="请选择" v-model="searchParams['allChannelTableData'].searchParams.queryTaskType" size="mini">
                  <el-option label="未分配" value="1"></el-option>
                  <el-option label="所有" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="ca_form_item">
                <el-button type="primary" @click="searchManager(item.val)" size="mini">查询</el-button>
              </el-form-item>
            </el-form>

            <!--表格-->
            <div class="table_wrapper">
              <el-table height="500"  :data="item.val=='channelManager'?resTableData.channelManagerTableData:resTableData.allChannelTableData"
                style="width: 100%" v-loading="item.val=='channelManager'?loading1:loading2" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
                <el-table-column :prop="column.prop" :label="column.label" :width="column.width" v-for="(column,index) in item.val=='channelManager'?managerColumn:allColumn" :key="index"></el-table-column>
                <el-table-column prop="action" label="操作" v-if="item.val=='channelManager'">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="allocateChannel(scope.row)" type="primary" size="small">分配渠道</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="page_wrapper">
              <pagination :tableDataName="item.val=='channelManager'?channelManagerTableData:allChannelTableData"></pagination>
            </div>
          </div>
        </div>
      </el-col>

      <!--分配渠道弹框-->
      <component :is="isChannelAllocationModalCom" :currentEmpId="currentEmpId" :currentUser="currentUser"></component>
    </div>
</template>

<script type="text/ecmascript-6">
    import Pagination from './../../components/Pagination.vue'
    import ChannelAllocateModal from './ChannelAllocateModal.vue'
    export default {
        name: '',
        data() {
            return {
              tableCols:[
                {text:'渠道经理',val:'channelManager'},
                {text:'全部渠道',val:'allChannel'}
              ],
              managerColumn:[               //渠道经理表格列数据
                {label:'员工',prop:'empId',width:100},
                {label:'电话号码',prop:'tel',width:140},
                {label:'渠道经理',prop:'userName',width:100}
              ],
              allColumn:[               //全部渠道表格列数据
                {label:'渠道编号',prop:'channelId',width:145},
                {label:'渠道名称',prop:'channelName',width:150},
                {label:'城市',prop:'cityName',width:100},
                {label:'渠道经理',prop:'channelManager'}
              ],
              channelManagerTableData:'channelManagerTableData',
              allChannelTableData:'allChannelTableData',
              isChannelAllocationModalCom:'',
              currentEmpId:'',       //当前员工Id
              currentUser:''         //当前渠道经理姓名
            }
        },
        components:{Pagination,ChannelAllocateModal},
        computed:{
          /**
           * table表格数据：
           */
          resTableData(){
            return this.$store.getters.resTableData;
          },
          loading1(){
            return this.$store.state.mutations.commonParams[this.channelManagerTableData].isLoading;
          },
          loading2(){
            return this.$store.state.mutations.commonParams[this.allChannelTableData].isLoading;
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
              case 'channelManager':
                this.$store.state.mutations.commonParams[this.channelManagerTableData].current=1;
                this.$store.dispatch("getAjaxTableData",{tableDataName:this.channelManagerTableData,vm:this});
                break;
              case 'allChannel':
                this.$store.state.mutations.commonParams[this.allChannelTableData].current=1;
                this.$store.dispatch("getAjaxTableData",{tableDataName:this.allChannelTableData,vm:this});
                break;
            }
          },
          /**
           * 分配渠道：
           */
          allocateChannel(val){
            this.currentEmpId=val.empId;
            this.currentUser=val.userName;
            this.isChannelAllocationModalCom='ChannelAllocateModal';
          }
        },
        mounted(){
          /**
           * 请求表格列表数据：
           */
          this.$store.dispatch("getAjaxTableData",{tableDataName:this.channelManagerTableData,vm:this});
          this.$store.dispatch("getAjaxTableData",{tableDataName:this.allChannelTableData,vm:this});
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
