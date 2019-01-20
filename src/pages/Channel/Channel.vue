<template>
  <div id="channel">
    <component :is="isDisplayList"></component>
  </div>
</template>

<script>
  import ChannelList from './ChannelList.vue'
  import DistrictManager from './DistrictManager.vue'
  export default {
    name: "channel",
    data(){
      return {}
    },
    components:{
      ChannelList,
      DistrictManager
    },
    computed:{
      /**
       * 根据权限展示我的渠道不同的页面：
       * @returns {string}
       */
      isDisplayList(){
        return this.$store.getters.isDisplayList;
      }
    },
    mounted(){
      //mutations修改通过commit调用
      this.$store.commit("getShow");
      this.$store.state.mutations.channelListIsActive = 'MyChannel';
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/common";
  @import "./../../assets/less/reset";
  #channel{
    .w(100%);
    // padding-left: 20px;
    // padding-right: 28px;
    padding-left: 40px;
    padding-top: 20px;
    padding-right: 48px;
    font: 14px/32px '微软雅黑';
    .top{
      overflow: hidden;

       .el-input__icon{
          line-height: 30px;
        }
      .reset,.inquiry{
        width: 46px;
        height: 28px;
        font: 12px/28px '微软雅黑';
        border: none;
        border-radius: 3px;
      }
      .inquiry{
        background: #4a88fa;
        color: #fff;
        margin: 0 30px;
      }
      .left{
        float: left;
        .el-input--suffix{
          display: inline-block;

        }
        .cooperation{
          display: inline-block;
        }
        .city{
          display: inline-block;
        }
        .status{
          display: inline-block;
        }
      }
      .right{
        float: right;
        .set{
          width: 100px;
          height: 30px;
          font: 14px/30px '微软雅黑';
          border: none;
          border-radius: 3px;
          background: #4a88fa;
          color: #fff;
          margin-right: 42px;
        }
        .switch{
          float: right;
          .myChannel,.channel_manager{
            cursor:pointer;
          }
          .isActiveClass{
            color: #4697e8;
            text-decoration: underline;
          }
          .divide{
            padding: 0 10px;
          }
        }
      }
    }
  }
</style>
