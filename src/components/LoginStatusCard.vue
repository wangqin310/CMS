<template>
    <div id="login_status_card">
      <el-col :xs="12" :sm="12" :md="8" :lg="6"  v-for="(item,index) in data" :key="index">
        <div class="wrapper">
          <div class="left_wrapper">
            <div class="inner_wrapper">
              <div class="img_wrapper">
                <img :src="item.attachPlace==''?defaultHeadPic:'/api/'+item.attachPlace"/>
              </div>
              <div class="name" v-text="item.userName"></div>
            </div>
          </div>
          <div class="right_wrapper">
            <p class="desc_wrapper">最后一次登录时间</p>
            <p class="date_wrapper"><span class="date" v-text="item.loginSessionDate"></span><span class="time" v-text="item.loginSessionTime"></span></p>
            <p class="login_info"><span v-text="params&&params=='mapMore'?'拜访次数':'登录次数'"></span><span class="times" v-text="item.taskComNum"></span></p>
          </div>
        </div>
      </el-col>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        props:['data','params'],
        data() {
            return {
              defaultHeadPic: require("@/assets/images/defaultHeadPic.jpg"),
            }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/reset";
  #login_status_card{
    .el-col {
      .m(0);
      .p-r(0);
      .b-r(0);
      .h(150px);
      .p(10px);
      .wrapper {
        .w(100%);
        .h(100%);
        .b-r(5px);
        display: flex;
        border: 1px solid #7ba3ff;
        -webkit-box-shadow: 0 0 10px #7bb0ff;
        -moz-box-shadow: 0 0 10px #7bb0ff;
        box-shadow: 0 0 10px #7bb0ff;
        .left_wrapper {
          .w(30%);
          .p(0);
          border-right: 1px solid @line;
          .inner_wrapper {
            .w(50px);
            .h(90px);
            .m(24px auto);
            .img_wrapper {
              .w(50px);
              .h(50px);
              .b-r(25px);
              border: 1px solid @white;
              img {
                .w(100%);
                .h(100%);
                .b-r(50%);
              }
            }
            .name {
              .p-t(20px);
              .h(40px);
              .l-h(20px);
              color: @white;
              .f-s(12px);
              .t-a(center);
            }
          }
        }
        .right_wrapper {
          flex: 1;
          .p(15px);
          font-size: 12px;
          .desc_wrapper,
          .date_wrapper {
            .h(30px);
            .l-h(30px);
          }
          .date_wrapper {
            .time {
              float: right;
            }
          }
          .login_info {
            .h(44px);
            .p-t(16px);
            .l-h(25px);
            .times {
              float: right;
            }
          }
        }
      }
    }
  }
</style>
