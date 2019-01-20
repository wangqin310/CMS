<template>
  <div id="myReportList">
    <div style="margin-bottom: 15px">
      <el-row>
        <el-col :span="2">
          报告标题：
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入报告标题" v-model="myReportParams.searchParams.reportTitle" size="mini"></el-input>
        </el-col>
        <el-col :span="4" style="padding-left:5px">
          <el-select size="mini" v-model="myReportParams.searchParams.isDelete">
            <el-option v-for="(item,index) in empReportStatus" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" style="padding-left:5px">
          <div style="float: left;padding-left: 10px ">人员：</div>
          <el-select filterable placeholder="请选择报告人" size="mini" style="float:right" v-model="myReportParams.searchParams.empId">
            <el-option v-for="(item,index) in empList" :key="index" :label="item.userName" :value="item.empId"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" style="padding-left:10px">
          <el-button size="mini" type="primary" @click="search">查询</el-button>
          <el-button size="mini" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 15px">
      筛选：
      <el-radio-group size="mini" v-model="empReport" @change="changeReportType">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button v-for="(item,index) in $store.state.mutations.reprotTypeArray" :key="index" :label="item.paraVal">{{item.valDesc}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="table_wrapper">
      <el-table :data="resTableData" :default-sort = "{prop: 'reportTime', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="#2f3445">
        <el-table-column sortable v-for="(item,index) in columnList" :key="index" :label="item.labelName" :prop="item.propName" width="130"></el-table-column>
        <el-table-column sortable label="本周工作总结" prop="finishSumm" width="120px">
          <template slot-scope="scope">
            <span class="spanWords">
              {{scope.row.finishSumm}}
            </span>
          </template>
        </el-table-column>
        <el-table-column sortable label="需协调和帮助" prop="isHelp" width="120px">
          <template slot-scope="scope">
            <span class="spanWords">
              {{scope.row.isHelp}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.identiStatus == '1'"
                       type="warning"
                       @click="deleteReport({id:scope.row.id,isDelete:'1'})"
                       round size="mini">删除</el-button>
            <el-button v-if="scope.row.identiStatus == '0'"
                       type="warning"
                       @click="deleteReport({id:scope.row.id,isDelete:'0'})"
                       round size="mini">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <Pagination :tableDataName="tableDataName"></Pagination>
    </div>
    <!-- 编写报告/查看详情弹框 -->
    <component :is="$store.state.mutations.EditReportCom"></component>
  </div>
</template>

<script>
  import Pagination from '../../components/Pagination';
  import EditReport from './EditReportModal';
  export default {
    name: "AdminReportList",
    data(){
      return {
        columnList:[
          {labelName:'报告人',propName:'rstaffName'},
          {labelName:'报告标题',propName:'reportTitle'},
          {labelName:'报告类型',propName:'reportTypeName'},
          {labelName:'业务线条',propName:'channelType'},
          {labelName:'附件信息',propName:'reportAttach'},
          {labelName:'报告时间',propName:'reportTime'}
        ],
        tableDataName:'adminReportTableData',
        reportDetailVisible:false,
        empList:[],
        empReportStatus:[{label:'显示所有',value:''},{label:'未删除',value:'0'},{label:'已删除',value:'1'}],
        empReport:''
      }
    },
    components:{
      Pagination,EditReport
    },
    computed:{
      resTableData(){
        this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
          item.channelType = (item.channelType == 'M') ? '场景' : ((item.channelType == 'A') ?'渠道':'兼有');
        });
        return this.$store.getters.resTableData[this.tableDataName];
      },
      loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
      myReportParams(){
        return this.$store.state.mutations.commonParams[this.tableDataName];
      },
    },
    methods:{
      getEmpList(){
        this.$axios.get("/api/CMM/login_getUserListByPosition",
          {
            params:{}
          }
        )
          .then(res =>{
            this.empList = res.data.data;
          })
          .catch(error=>{
              console.log(error);
            }
          );
      },
      deleteReport(obj){
        this.$axios.post("/api/CMM/report_delOrRecoveryReport",this.$qs.stringify(obj))
          .then(res =>{
            if(res.data.success){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
            }else{
              this.$message({
                message: '操作失败！',
                type: 'warning'
              });
            }

          })
          .catch(error=>{
            console.log(error);
          });
      },
      getReportTypeArray(){
        this.$axios.get("/api/CMM/report_getReportType",
          {
            params:{}
          }
        )
          .then(res =>{
            this.$store.state.mutations.reprotTypeArray = res.data.data;
            var obj = {
              paraStat: "2",
              paraTypeId: "3600003002",
              paraTypeName: "报告类型",
              paraVal: "6",
              pareParaTypeId: "",
              remark: "",
              systemId: "29",
              valDesc: "渠道评价"
            }
            this.$store.state.mutations.reprotTypeArray.push(obj);
          })
          .catch(error=>{
              console.log(error);
            }
          );
      },
      changeReportType(){
        this.$store.state.mutations.tableLimit.params.start=0;
        this.myReportParams.current = 1;
        this.myReportParams.searchParams.reportType = this.empReport;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      search(){
        this.$store.state.mutations.tableLimit.params.start=0;
        this.myReportParams.current = 1;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      reset(){
        this.myReportParams.searchParams.empId = '';
        this.myReportParams.searchParams.reportTitle = '';
        this.myReportParams.searchParams.reportType = '';
        this.myReportParams.searchParams.isDelete = '0';
      }
    },
    mounted(){
      /**
       * 重置搜索条件，页码还原
       */
      this.reset();
      /**
       * 请求表格列表数据：
       */
      this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      /**
       * 加载报告类型
       */
      this.getReportTypeArray();
      /**
       * 加载人员列表
       */
      this.getEmpList();
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";
  .spanWords{
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;
  }
  .font-border{
    color:#409EFF;
  }
</style>
