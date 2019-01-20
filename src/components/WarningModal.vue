<template>
    <div id="warning_modal">
      <el-dialog title="舆情处理" width="600px" :visible.sync="$store.state.mutations.showWarningModal">
        <div class="wm_content_wrapper">
          <ul class="wm_list_wrapper">
            <li class="wm_list wm_list_left">
              <div class="wm_img_wrapper">
                <img :src="defaultHeadPic"/>
              </div>
              <div class="wm_dialog">
                <div class="wm_user_info">
                  <span class="wm_user_name">赵长青</span>
                  <span class="wm_time">2018-10-12 14:41:26</span>
                </div>
                <div class="wm_dialog_content">撒服务费撒的</div>
              </div>
            </li>
            <li class="wm_list wm_list_right">
              <div class="wm_img_wrapper">
                <img :src="defaultHeadPic"/>
              </div>
              <div class="wm_dialog">
                <div class="wm_user_info">
                  <span class="wm_user_name">赵长青</span>
                  <span class="wm_time">2018-10-12 14:41:26</span>
                </div>
                <div class="wm_dialog_content">撒服务费撒的</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="textarea_wrapper">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textareaInfo"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="$store.state.mutations.showWarningModal = false">处理</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        data() {
            return {
              defaultHeadPic:require('@/assets/images/defaultHeadPic.jpg'),
              textareaInfo:''
            }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/reset";
  @import "../assets/less/common";
  #warning_modal{
    .el-dialog__header{
      border-bottom:1px solid #000;
    }
    .el-dialog__body{
      .p(0);
      .h(400px);
      .wm_content_wrapper{
        .h(250px);
        .p(10px 0);
        overflow:auto;
        .wm_list_wrapper{
          .h(100px);
          .wm_list{
            .p(10px);
            overflow:hidden;
            &.wm_list_left{
              .wm_img_wrapper,.wm_dialog{
                float:left;
                &.wm_dialog{
                  .m-l(30px);
                }
              }
            }
            &.wm_list_right{
              .wm_img_wrapper,.wm_dialog{
                float:right;
                &.wm_dialog{
                  .m-r(30px);
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
                .el-input input,select{
                  width: 100px;
                  height: 28px;
                  border: 1px solid #7ba3ff!important;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
