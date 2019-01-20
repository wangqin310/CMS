<template>
    <div id="districtCard">
      <el-button type="primary" size="mini" @click="back">返回工作台</el-button>
      <card-com :isLoginTime="isLoginTime" :params="params"></card-com>
    </div>
</template>

<script type="text/ecmascript-6">
    import CardCom from './../../components/Card.vue'
    export default {
        name: '',
        props:['params'],
        data() {
            return {
              isLoginTime:true
            }
        },
        components:{CardCom},
        methods:{
          /**
           * 返回：
           */
          back(){
            this.$store.state.mutations.showLoginStatus='';
          }
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  #districtCard{
    top:0;
    left:0;
    .w(100%);
    .p(42px);
    .b(@boxBg);
    min-height:calc(~"100% + 105px");
    position:absolute;
  }
</style>
