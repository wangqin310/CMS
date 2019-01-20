<template>
  <div id="choose_executor_modal">
    <el-dialog :title="'选择执行人'" class="ji_dialog" :visible.sync="showPerson" width="660px" @close="close">
      <el-row class="row_wrapper">
        <el-col :span="10" class="channel_wrapper">
          <p class="title">执行人</p>
          <div class="col_content_wrapper">
            <el-table :data="UnderlingUser" ref="singleTable" class="addUserTable" style="overflow: auto;textAlign: center;over-foll" highlight-current-row @current-change="handleCurrentChange">
              <el-table-column label="序号" width="80px"  align="center" type="index"></el-table-column>
              <el-table-column property="userName" label="姓名" width="70px" align="center"></el-table-column>
              <el-table-column property="positionName" label="职位"  align="center"></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="4" class="button_executor_wrapper">
          <div class="button_wrapper">
            <div class="btn" @click="choose">&gt;&gt;选择</div>
            <div class="btn remove_btn" @click="remove">&lt;&lt;移除 </div>
          </div>
        </el-col>
        <el-col :span="10" class="choosed_channel_wrapper">
          <p class="title">已选执行人</p>
          <div class="col_content_wrapper choosed_channel_content">
            <el-table  class="addUserTable" :data="chooseList"  style="overflow: auto;textAlign: center;" highlight-current-row @current-change="handleCurrentChange1">
              <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
              <el-table-column property="userName" label="姓名" width="70px" align="center"></el-table-column>
              <el-table-column property="positionName" label="职位"  align="center"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="makeSurePerson" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    props:['showExecutor'],
    data() {
      return {
        showPerson:false,          //是否展示选择执行让你弹框
        UnderlingUser:[],
        chooseList:[],
      }
    },
    computed:{
      chooseChannelResData(){
        return this.$store.getters.chooseChannelResData;
      }
    },
    methods:{
      /**
       * 关闭弹框：
       */
      close(){
        this.showPerson=false;
        this.$parent.showChooseExecutorModal='';
        console.log(this.showPerson);
      },
      //查询执行人列表
      getAllUnderlingUser(){
        this.choosePerson=null;
        this.choosePerson1=null;
        var params={
          isTask:1,
          limit:0,
          page:1,
          start:0,
          sort:'userName',
          dir:'DESC',
        }
        this.$axios('/api/CMM/login/login_getAllUnderlingUser',
          {
            params
          }
        )
          .then(res=>{
            this.UnderlingUser=res.data.data;
          })
      },
      //执行人列表选中
      handleCurrentChange(val) {
        if(!val) return;
        console.log(val);
        this.currentRow = val;
        this.$refs.singleTable.setCurrentRow(val);
        this.choosePerson=val;
      },
      handleCurrentChange1(val){
        this.currentRow = val;
        this.$refs.singleTable.setCurrentRow(val);
        this.choosePerson1=val;
      },
      //选择执行人（只能选一个）
      choose(){
        if(!this.choosePerson){
          alert("请选择需要选择的执行人");
        }else{
          this.chooseList=[];
          this.chooseList.push(this.choosePerson);
        }
      },
      //移除执行人
      remove(){
        if(!this.choosePerson1){
          alert("请选择需要移除的执行人");
        }else{
          this.chooseList=[];
        }
      },
      //选择执行人后确定按钮
      makeSurePerson(){
        if(!this.chooseList[0]){
          alert("请选择执行人");
        }else{
          this.$store.getters.taskParams.zstaffName=this.chooseList[0].userName;
          this.$store.getters.taskParams.zstaffId=this.chooseList[0].empId;
          this.showPerson=false;
        }
        this.$store.getters.taskParams.channel='';
        this.$parent.showChooseExecutorModal='';
      },
    },
    mounted(){
      this.showPerson=this.showExecutor;
      this.getAllUnderlingUser();
    }
  }
</script>

<style lang="less">
  @import "../assets/less/reset";
  #choose_executor_modal{
    .ji_dialog{
      .row_wrapper{
        .h(398px);
        .b-r(3px);
        background: #43475B;
        border: 1px solid #6387FE;
        border-right: none;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
          //滚动条的宽度
      .channel_wrapper::-webkit-scrollbar {
        width: 6px;/*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
      }
      //滚动条的滑块
      .channel_wrapper::-webkit-scrollbar-thumb {
        display: inline-block;
        background-color: #4a88fa;
        border-radius: 3px;
        box-shadow: inset 0 0 5px #4a88fa;
      }
      //滚动条里面轨道
      .channel_wrapper::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #43475B;
        border-radius: 0;
        background: #43475B;
        border-left:1px solid #4a88fa;
      }
      //定义右下角拖动块的样式
      .channel_wrapper::-webkit-scrollbar-corner {
        background-color: #43475B;
      }
        .title{
          .h(30px);
          .l-h(30px);
          .b( #43475B);
          .p-l(10px);
          color: #fff;
          border-left: 1px solid #6387FE;

        }
        .el-col{
          .h(396px);
          &.channel_wrapper{
            border-right: 1px solid #6387FE;
            overflow:auto;
          }

          .col_content_wrapper{
            .h(366px);
            .b(#43475B);
            color: #fff;
            .el-table__header-wrapper{
              th{
                background: #43475B;
                border-bottom: 1px solid #6387FE;
                border-top: 1px solid #6387FE;

              }
            }
            .el-table__body-wrapper{
              background: #43475B;
              td{
                background: #43475B;
                border-bottom: 1px solid #6387FE;
              }
              tr:hover > td,tr.current-row > td{
                background: #7bb0ff!important;
              }
            }
     
          }
          
          &.button_executor_wrapper{
            .button_wrapper{
              margin-left: 15px;
              .w(60px);
              .p-t(168px);
              position:absolute;
              .btn{
                .h(22px);
                .w(100%);
                .l-h(20px);
                .b-r(3px);
                .b(#43475B);
                .t-a(center);
                cursor:pointer;
                display:block;
                color:#fff;
                border:1px solid #6387FE;
                &.remove_btn{
                  .m-t(20px);
                }
              }
            }
          }
          &.choosed_channel_wrapper{
            border-right: 1px solid #6387FE;
            position:relative;
            background: #43475B;
            .el-table__body-wrapper{
              background: #43475B;

            }
            .choosed_channel_content{
              .b(#43475B);
              border-left: 1px solid #6387FE;

            }

          }
        
        }
      }
      .el-dialog__body .el-table,.el-table--fit  {
        .el-table__body{
          tr:hover > td, tr.current-row > td{
            background: #7bb0ff;
          }
        }
      }

    }
  }
</style>
