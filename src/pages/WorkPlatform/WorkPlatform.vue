<template>
  <div id="workPlatform">
    <component :is="isHeadQuarters"></component>
  </div>
</template>

<script>
  import ShowByHeadQuarters from './ShowByHeadQuarters.vue'
  import ShowByChannelManager from './ShowByChannelManager.vue'
  export default {
    name: "workPlatform",
    data(){
      return {
        jsonArr:[
          {
            type:'A',
            value:'我是A'
          },
          {
            type:'B',
            value:'我是B'
          },
        ]
      }
    },
    components:{
      ShowByHeadQuarters,
      ShowByChannelManager
    },
    computed:{
      /**
       * 根据权限展示工作台不同的页面：
       * @returns {string}
       */
      isHeadQuarters(){
        return this.$root.loginUserInfo.positionId==1||this.$root.loginUserInfo.positionId==0||this.$root.loginUserInfo.positionId==99?'ShowByChannelManager':'ShowByHeadQuarters';
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  #workPlatform{
    .w(100%);
    position:relative;
  }
</style>

