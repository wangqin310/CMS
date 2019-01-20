<template>
    <div id="warning_modal">
      <el-dialog :title="$store.state.mutations.warningParams.showTitle" width="600px" :visible.sync="$store.state.mutations.warningParams.showWarningDialogModal" @close="closeDialog">
        <div class="wm_content_wrapper">
          <ul class="wm_list_wrapper" id="wm_list_wrapper" ref="wmListWrapper" :scrollTop="'300'">
            <li class="wm_list" :class="item.staffId==$root.loginUserInfo.empId?'wm_list_right':'wm_list_left'" v-for="(item,index) in resData" :key="index">
              <div class="wm_img_wrapper">
                <img :src="item.attachPlace!=''?`/api/CMM/${item.attachPlace}`:defaultHeadPic"/>
              </div>
              <div class="wm_dialog">
                <div class="wm_user_info">
                  <span class="wm_user_name" v-text="item.staffName"></span>
                  <span class="wm_time" v-text="item.dealTime"></span>
                </div>
                <div class="wm_dialog_content" v-text="item.commentMess"></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="textarea_wrapper">
          <el-input type="textarea"
                    :rows="5"
                    placeholder="请输入处理内容"
                    v-model="commentMess"
                    :disabled="$store.state.mutations.warningParams.status=='已处理'"
                    prop="commentMess"></el-input>
        </div>
        <div slot="footer" class="dialog_footer">
          <el-row>
            <el-col :span="24">
              <div class="error_tip" v-show="isEmpty">处理内容不能为空！</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-button type="primary"
                         size="mini"
                         class="wm_btn close_btn"
                         v-if="$store.state.mutations.warningParams.isShowButton!=0&&$store.state.mutations.warningParams.status=='已处理'"
                         @click="closeWarning(1)">
                打开舆情
              </el-button>
              <el-button type="primary"
                         size="mini"
                         class="wm_btn close_btn"
                         v-if="$store.state.mutations.warningParams.isShowButton!=0&&$store.state.mutations.warningParams.status=='未处理'"
                         @click="closeWarning(0)">
                关闭舆情
              </el-button>
              <el-button type="primary"
                         size="mini"
                         class="wm_btn report_btn"
                         v-if="$root.loginUserInfo.positionId!=5&&$store.state.mutations.warningParams.isShowTransfer==1"
                         @click="reportSuperior=true">
                报告上级
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary"
                         :disabled="$store.state.mutations.warningParams.status=='已处理'"
                         class="wm_btn report_btn"
                         @click="toDeal"
                         size="mini">
                处理
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog title="报告上级" width="300px" :visible.sync="reportSuperior">
        <div class="textarea_wrapper">
          <el-input type="textarea"
                    rows="3"
                    v-model="summary"
                    placeholder="请输入报告说明"></el-input>
        </div>
        <div slot="footer" class="dialog_footer">
          <el-button @click="reportSuperior=false" type="primary" size="mini">关闭</el-button>
          <el-button type="primary" size="mini" @click="reportWarning">提交</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        props:['resDataName'],
        data() {
            return {
              defaultHeadPic:require('@/assets/images/defaultHeadPic.jpg'),
              commentMess:'',      //处理内容
              isEmpty:false,        //处理内容是否为空
              reportSuperior:false,
              summary:''
            }
        },
        computed:{
          resData(){
            return this.$store.state.mutations.ajaxResData[this.resDataName];
          }
        },
        methods:{
          /**
           * 关闭或打开舆情：
           */
          closeWarning(closeStatus){
            var isCloseStatus = "2"//关闭舆情
            if(closeStatus == 1){//打开舆情
              isCloseStatus = "0";
            }
            this.$axios.post("/api/CMM/earlyWarn_isCloseEarlyWarn",
              this.$qs.stringify({
                publicId:this.$store.state.mutations.warningParams.publicId,
                status:isCloseStatus
              }))
              .then(res =>{
                if(res.data.success == true) {
                  //关闭弹框
                  this.$store.state.mutations.warningParams.showWarningDialogModal = false;
                  //页面归一
                  this.$store.state.mutations.tableLimit.params.start=0;
                  this.$store.state.mutations.commonParams['warningTableData'].current = 1;
                  //刷新页面
                  this.$store.dispatch("getAjaxTableData",{tableDataName:'warningTableData',vm:this});
                }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
                }
              })
              .catch(error=>{
                console.log(error);
              });
          },
          /**
           * 报告上级：
           */
          reportWarning(){
            this.$axios.post("/api/CMM/earlyWarn_transferEarlyWarn",
              this.$qs.stringify({
                publicId:this.$store.state.mutations.warningParams.publicId,
                summary:this.summary
              }))
              .then(res =>{
                if(res.data.success == true) {
                  //关闭弹窗
                  this.reportSuperior = false;
                  this.$store.state.mutations.warningParams.showWarningDialogModal = false;
                  //页面归一
                  this.$store.state.mutations.tableLimit.params.start=0;
                  this.$store.state.mutations.commonParams['warningTableData'].current = 1;
                  //刷新页面
                  this.$store.dispatch("getAjaxTableData",{tableDataName:'warningTableData',vm:this});
                }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
                }
              })
              .catch(error=>{
                console.log(error);
              });
          },
          /**
           * 处理舆情：
           * @param commentMessForm
           */
          toDeal(commentMessForm){
            if(this.isEmpty=this.commentMess==''?true:false)return;
            var params={
              publicId:this.$store.state.mutations.warningParams.publicId,
              commentMess:this.commentMess
            };
            /**
             * 提交舆情处理内容：
             */
            this.$axios.post("/api/CMM/page/earnWarn/earlyWarn_inserEarlyWarnComment",
              this.$qs.stringify(params))
              .then(res =>{
                this.commentMess='';

                /**
                 * 重新请求舆情处理会话内容：
                 * @type {{vm: methods, url: string, params: {publicId: string}}}
                 */
                var obj={
                  vm:this,
                  resDataName:this.resDataName,
                  url:'/CMM/page/earnWarn/earlyWarn_getEarlyWarnDetailList',
                  params:{
                    publicId:this.$store.state.mutations.warningParams.publicId
                  }
                }
                this.$store.dispatch("getResData",obj);
              })
              .catch(error=>{
                console.log(error);
              });
          },
          /**
           * 关闭弹框：
           */
          closeDialog(){
            this.$destroy();
            this.$parent.warningDialogModal='';
          }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/reset";
  /*@import "../assets/less/common";*/
  #warning_modal{
    .el-dialog__header{
      border-bottom:1px solid #000;
    }
    .el-dialog__body{
      .p(0);
      .wm_content_wrapper{
        .h(250px);
        .p(10px 0);
        overflow:auto;
        .wm_list_wrapper{
          .wm_list{
            .p(10px);
            overflow:hidden;
            &.wm_list_left{
              .wm_img_wrapper,.wm_dialog{
                float:left;
                &.wm_dialog{
                  .m-l(30px);
                  max-width:calc(~"100% - 55px");
                }
              }
            }
            &.wm_list_right{
              .wm_img_wrapper,.wm_dialog{
                float:right;
                &.wm_dialog{
                  .m-r(30px);
                  max-width:calc(~"100% - 55px");
                }
              }
            }
            .wm_img_wrapper{
              .w(25px);
              .h(25px);
              vertical-align: top;
              img{
                .w(100%);
                .h(100%);
                .b-r(50%);
              }
            }
            .wm_dialog{
              .f-s(14px);
              .p(10px);
              .b-r(3px);
              border:1px solid #7ba3ff;
              box-shadow: 0 0 10px #7bb0ff;
              .wm_user_info{
                .p-b(5px);
                border-bottom:1px solid #7ba3ff;
                .wm_user_name{

                }
                .wm_time{

                }
              }
              .wm_dialog_content{
                .p-t(5px);
              }
            }
          }
        }
      }
      .el-textarea__inner{
        background: none;
        border-radius:3px;
        border-left:none!important;
        border-right:none!important;
      }
    }
    .el-dialog__footer{
      .dialog_footer{
        position:relative;
        .error_tip{
          top:0;
          left:0;
          margin-bottom: 10px;
          .p-t(10px);
          color:red;
          .f-s(14px);
          float: left;
        }
        .wm_btn{
          &.close_btn,&.report_btn{
            float: left;
          }
        }
      }
    }
  }
</style>
