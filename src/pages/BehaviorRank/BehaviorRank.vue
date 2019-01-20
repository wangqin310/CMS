<template>
  <div id="BehaviorRank">
    <div class="filter">
      <div class="time">
         <div class="block">
           <span class="">时间：</span>
           <el-date-picker
             v-model="behaviorRankTableData.searchParams.dateFrom"
             value-format="yyyy-MM-dd"
             format="yyyy-MM-dd"
             type="datetime"
             placeholder="2018-01-01"
             :clearable="false">
           </el-date-picker>
           <span>-</span>
           <el-date-picker
             v-model="behaviorRankTableData.searchParams.dateEnd"
             value-format="yyyy-MM-dd"
             format="yyyy-MM-dd"
             type="datetime"
             
             :clearable="false">
           </el-date-picker>
         </div>

      </div>
      <div class="action">
        <span class="text">行为：</span>
        <el-select size="mini" v-model="behaviorRankTableData.searchParams.sortType">
           <el-option
          v-for="sortType in sortTypeList" :label="sortType.label" :key="sortType.value" :value="sortType.value">
        </el-option>
        </el-select>
      </div>

      <div class="action" v-if="changePosition($root.loginUserInfo.positionId)">
        <span class="text">区域：</span>
        <el-select size="mini" v-model="behaviorRankTableData.searchParams.area" >
        <el-option value="" label="全部"></el-option>
        <el-option
          v-for="city in cityList" :label="city.orgName" :key="city.orgName" :value="city.orgName">
        </el-option>
      </el-select>

      </div>

      <div class="action" v-if="$root.loginUserInfo.positionId != '3'">
        <span class="text">条线：</span>
        <el-select name="" size="mini" v-model="behaviorRankTableData.searchParams.assId">
          <el-option
          v-for="assId in assIdList" :label="assId.label" :key="assId.value" :value="assId.value">
        </el-option>
        </el-select>
      </div>
      <div style="float: right">
        <el-button size="mini" class="firstBtn" type="primary" @click="search">查询</el-button>
        <el-button size="mini" @click="exportExcel">导出所有</el-button>
      </div>
      <div style="margin-bottom: 15px">
        筛选：
        <el-radio-group size="mini" v-model="status" @change="changeStatus">
          <el-radio-button label="2">在职</el-radio-button>
          <el-radio-button label="0">离职</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!--{{resTableData}}-->
    <div class="table_wrapper">
      <el-table :data="resTableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中"
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
    name: 'BehaviorRank',
    data() {
      return {
        cityList:[],
        dateFrom:'',
        dateEnd:'',
        tableData:{},
        thisClass:'CityStyle',
        channelCoverRate:'',
        tableColumn:[
          {propName:'top',labelName:'名次',isSortable:true},
          {propName:'userName',labelName:'用户名',isSortable:true},
          {propName:'orgName',labelName:'区域',isSortable:true},
          {propName:'channelVisitNum',labelName:'渠道拜访量',isSortable:true},
        ],
        tableDataName:'behaviorRankTableData',    //接口返回的数据名称
       sortTypeList:[
         {value:'channelVisitNum',label:'渠道拜访量'},
         {value:'channelCoverRate',label:'渠道覆盖率'},
         {value:'taskComNum',label:'任务完成数'},
         {value:'weekReportComNum',label:'周报'},
         {value:'monthReportComNum',label:'月报'}
       ],
       assIdList:[
         {value:'A',label:'渠道'},
         {value:'M',label:'场景'}
       ],
       status:'2'
      }
    },
    components:{Pagination},
    computed:{
      resTableData(){
        this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
          item.channelCoverRate=Math.floor((item.channelCoverRate*10000)/100)+'%';
          item.taskComRate=Math.floor((item.taskComRate*10000)/100)+'%';
          item.weekReportComRate=Math.floor((item.weekReportComRate*10000)/100)+'%';
          item.monthReportComRate=Math.floor((item.monthReportComRate*10000)/100)+'%';
        });
        return this.$store.getters.resTableData[this.tableDataName];
      },
      loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
      behaviorRankTableData(){
        return this.$store.state.mutations.commonParams.behaviorRankTableData;
      },
      //根据“行为”值的不同，activeTitleList的值也会变化
      activeTitleList(){
        switch(this.behaviorRankTableData.searchParams.sortType){
          case 'channelVisitNum':
            return 'top:名次;userName:用户名;orgName:区域;channelVisitNum:渠道拜访量';
            break;
          case 'channelCoverRate':
            return 'top:名次;userName:用户名;orgName:区域;channelCoverRate:渠道覆盖率';
            break;
          case 'taskComNum':
            return 'top:名次;userName:用户名;orgName:区域;taskComNum:任务完成数;taskComRate:任务完成率';
            break;
          case 'weekReportComNum':
            return 'top:名次;userName:用户名;orgName:区域;weekReportComNum:周报完成数;weekReportComRate:周报完成率';
            break;
          case 'monthReportComNum':
            return 'top:名次;userName:用户名;orgName:区域;monthReportComNum:月报完成数;monthReportComRate:月报完成率';
            break;
        }
      }
    },
    methods:{
      changePosition(positionId){
        if(positionId != '0' && positionId != '1' && positionId != '2' && positionId != '7'){
          return true;
        }else{
          return false;
        }
      },
      changeStatus(){
        //重置页码
        this.$store.state.mutations.commonParams[this.tableDataName].current = 1;
        this.$store.state.mutations.tableLimit.params.start = 0;
        //更改参数
        this.$store.state.mutations.commonParams[this.tableDataName].searchParams.status=this.status;
        //刷新页面数据
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      init(){
        this.behaviorRankTableData.searchParams.dateFrom = '2018-01-01';
        var de = new Date();
        var dateEnd = de.getFullYear() + '-' + ((de.getMonth() + 1) < 10 ? '0'+(de.getMonth() + 1):(de.getMonth() + 1)) + '-' + (de.getDate() < 10 ? ('0'+de.getDate()):de.getDate());
        this.behaviorRankTableData.searchParams.dateEnd = dateEnd;
      },
      //到处excel
      exportExcel(){
        this.$axios.get("/api/CMM/page/main/rankList_exportRankListExcel",{
          params:{
            dateFrom:this.behaviorRankTableData.searchParams.dateFrom,    //开始时间
            dateEnd:this.behaviorRankTableData.searchParams.dateEnd,                   //结束时间
            assId:this.behaviorRankTableData.searchParams.assId,                       //条线
            type:'all',                    //固定值（all）
            sortType:this.behaviorRankTableData.searchParams.sortType,                //行为（周报）
            status:this.status,
            titleList:this.activeTitleList             
          }
        }
        )
          .then(res =>{
            window.open('/api' + res.data.msg);
          })
          .catch(error=>{
            console.log(error);
          })
      },
      /**
       * 搜索：
       */
      search() {
        switch(this.behaviorRankTableData.searchParams.sortType){
          case 'channelVisitNum':   //渠道拜访量
            this.tableColumn=[
              {propName:'top',labelName:'名次',isSortable:true},
              {propName:'userName',labelName:'用户名',isSortable:true},
              {propName:'orgName',labelName:'区域',isSortable:true},
              {propName:'channelVisitNum',labelName:'渠道拜访量',isSortable:true},
            ];
            break;
          case 'channelCoverRate':    //渠道覆盖率
            this.tableColumn=[
              {propName:'top',labelName:'名次',isSortable:true},
              {propName:'userName',labelName:'用户名',isSortable:true},
              {propName:'orgName',labelName:'区域',isSortable:true},
              {propName:'channelCoverRate',labelName:'覆盖率',isSortable:true},
            ];
            break;
          case 'taskComNum':          //任务完成后数
            this.tableColumn=[
              {propName:'top',labelName:'名次',isSortable:true},
              {propName:'userName',labelName:'用户名',isSortable:true},
              {propName:'orgName',labelName:'区域',isSortable:true},
              {propName:'taskComNum',labelName:'任务完成数',isSortable:true},
              {propName:'taskComRate',labelName:'任务完成率',isSortable:true},
            ];
            break;
          case 'weekReportComNum':        //周报
            this.tableColumn=[
              {propName:'top',labelName:'名次',isSortable:true},
              {propName:'userName',labelName:'用户名',isSortable:true},
              {propName:'orgName',labelName:'区域',isSortable:true},
              {propName:'weekReportComNum',labelName:'周报完成数',isSortable:true},
              {propName:'weekReportComRate',labelName:'周报完成率',isSortable:true},
            ];
            break;
          case 'monthReportComNum':         //月报
            this.tableColumn=[
              {propName:'top',labelName:'名次',isSortable:true},
              {propName:'userName',labelName:'用户名',isSortable:true},
              {propName:'orgName',labelName:'区域',isSortable:true},
              {propName:'monthReportComNum',labelName:'月报完成数',isSortable:true},
              {propName:'monthReportComRate',labelName:'月报完成率',isSortable:true},
            ];
            break;
        }
        this.$store.getters.tableLimit.current=1;
        this.$store.state.mutations.tableLimit.params.start=0;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      /*城市名称*/
      getCity(){
        this.$axios.get("/api/CMM/report_getDepByPostion"
        )
          .then(res =>{
            this.cityList=res.data.data;
          })
          .catch(error=>{
            console.log(error);
          })
      },

      onSubmit() {
        console.log('submit!');
      },
      formatter(row, column) {
        return row.address;
      },
      handleClick(row) {
        console.log(row);
      },
    },
    mounted(){
      //重置搜索条件
      this.$store.state.mutations.commonParams[this.tableDataName].searchParams.status='2';
      this.$store.state.mutations.commonParams[this.tableDataName].searchParamssortType = 'channelVisitNum';
      this.$store.state.mutations.commonParams[this.tableDataName].searchParamsarea = '';
      this.$store.state.mutations.commonParams[this.tableDataName].searchParamsassId = 'A',
      this.init();
      this.getCity();
      /**
       * 请求表格列表数据：
       */
      this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
    },
  }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  @import "../../assets/less/common";
  #BehaviorRank{
    .w(100%);
    // .p(42px);
    padding-left: 40px;
    padding-top: 0px;
    padding-right: 48px;
    min-width: 1024px;
    overflow: hidden;
    .filter{
      h5{
        display: inline-block;
        font-weight: normal;
        margin-right: 30px;
        font: 16px/32px '微软雅黑';
      }
      margin-top: 1.6%;
      margin-bottom: 1.6%;
      font: 16px/32px '微软雅黑';
      .time{
        display: inline-block;
        .el-input{
          width: 140px;
        }
        .el-input__inner{
          height: 28px;
          background-color: #2f3445;
          border: 1px solid #7ba3ff;
          color: #f5f5f6;
          width: 140px;
        }
        .el-input__icon {
          height: 100%;
          width: 25px;
          text-align: center;
          -webkit-transition: all .3s;
          transition: all .3s;
          line-height: 20px;
        }
        span.text{
          margin-right: 13px;
        }
        #startYear,#endYear{
          width: 86px;
        }
        #startMonth,#startDate,#endMonth,#endDate{
          width: 72px;
        }
        .line{
          display: inline-block;
          width: 30px;
          height: 0;
          border-top: 1px solid #fff;
          font: 1px/32px '微软雅黑';
        }

      }
      .action{
        display: inline-block;
        // select{
        //   width: 100px;
        // }
        // span.text{
          // margin-left: 30px;
        // }
        .el-input__inner {
          cursor: pointer;
          width: 106px;
          background-color: #2f3445;
          padding-right: 35px;
          color: #f5f5f6;
          border: 1px solid #7ba3ff;
        }
      }
      // .condition{
      //   display: inline-block;
      //   // select{
      //   //   width: 100px;
      //   // }
      //   span.text{
      //     margin-left: 66px;
      //   }
      // }
      // .firstBtn{
        // margin-left: 50px;
      // }
      // .secondBtn{
        // margin-left: 24px;
      // }
    }
    .form{
      ul{
        display: flex;
        li{
          flex: 1;
          width: 42%;
          height: 41%;
        }
        li:nth-child(1){
          margin-left: 5%;
        }
        li:nth-child(2){
          margin-left: 5.7%;
          margin-right: 5%;
        }
      }

    }

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
    //   .el-table__header{
    //     .b(red);
    //   }
    //   .el-table__header-wrapper{
    //     border-top-left-radius:5px;
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
  //时间下拉框
  .el-picker-panel{
      border:1px solid #7ba3ff;
     box-shadow: 0 0 10px #7bb0ff;
     border-radius: 10px;
     //头部
    .el-picker-panel__body-wrapper{
        background: #43475b;      
        //两个input框  
      .el-date-picker__time-header{
        background: #43475b; 
        border-bottom:1px solid #2a2d41;
        input{
          box-shadow:0 0 0 #7bb0ff;
          border:1px solid #2a2d41;
        }      
        //时间选择框
        .el-time-panel{
          .el-time-spinner{
            background: #43475b; 
            li{
              color: #fff;
              background: #43475b; 
            }
            .el-time-spinner__item.active:not(.disabled){
              color: #7bb0ff;
            }
          }
        }
        .el-time-panel__footer{
            background: #43475b; 
            .el-time-panel__btn.cancel{
              color: #fff;
            }
        }




      }
      //年标题
      .el-date-picker__header{
          button{
            color: #fff;
          }
          .el-date-picker__header-label{
              color: #fff!important;
            }
      }
      .el-picker-panel__content{
        color: #fff;
        th{
          color: #fff!important;
        }
      }
    }
    //脚部
    .el-picker-panel__footer{
        background: #43475b; 

    }
  }
</style>
