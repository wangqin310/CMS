<template>
    <div id="login_status">
      <div class="ls_content_wrapper">
        <el-button type="primary" size="mini" @click="back">{{btnText}}</el-button>
        <div class="lg_status_wrapper">
          <login-status-card :data="loginTimesData" :params="params"></login-status-card>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import LoginStatusCard from './../../components/LoginStatusCard.vue'
    export default {
        name: '',
        props:['params'],
        data() {
            return {
              showStatus:'',
              loginTimesData:[]
            }
        },
        components:{LoginStatusCard},
        computed:{
          btnText(){
            return this.$store.state.mutations.isFromWorkPage?'返回工作台':'返回区域中心';
          }
        },
        methods: {
          /**
           * 返回：
           */
          back(){
            if(this.$store.state.mutations.isFromWorkPage){
              this.$store.state.mutations.showLoginStatus='';
            }else{
              this.$store.state.mutations.showLoginStatus='DistrictCard';
            }
          },
          /**
           * 获取
           */
          getLoginData(val){
            //this.params = 'mapMore';//拜访次数
            if(this.params && this.params=='mapMore'){//拜访次数
              this.$axios
                .post(
                  "/api/CMM/workbench_getUserSignList",
                  this.$qs.stringify({
                    areaName: val
                  })
                )
                .then(res => {
                  if(res.data.data){
                    res.data.data.map((item,index)=>{
                      if(item.top == 0){
                        this.loginTimesData.push({
                          attachPlace: item.attachPlace, //头像地址
                          userName: item.userName, //下属名称
                          loginSessionDate: item.empId?item.empId.split(" ")[0]:'', //最后一次登录日期
                          loginSessionTime: item.empId?item.empId
                            .split(" ")[1]
                            .substring(
                              0,
                              item.empId.split(" ")[1].lastIndexOf(":")
                            ):'', //最后一次登录时间
                          taskComNum: item.taskComNum //拜访次数
                        });
                      }
                    })
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }else{//登录次数
              this.$axios
                .post(
                  "/api/CMM/page/myChannel/myChannel_getUserInfoByArea",
                  this.$qs.stringify({
                    areaName: val
                  })
                )
                .then(res => {
                  if(res.data.data){
                    res.data.data.map((item,index)=>{
                      this.loginTimesData.push({
                        attachPlace: item.attachPlace, //头像地址
                        userName: item.userName, //下属名称
                        loginSessionDate: item.loginSessionTime?item.loginSessionTime.split(" ")[0]:'', //最后一次登录日期
                        loginSessionTime: item.loginSessionTime?item.loginSessionTime
                          .split(" ")[1]
                          .substring(
                            0,
                            item.loginSessionTime.split(" ")[1].lastIndexOf(":")
                          ):'', //最后一次登录时间
                        taskComNum: item.allLoginTime //登录次数
                      });
                    })
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }

          }
        },
        created(){
          this.getLoginData(this.$store.state.mutations.loginStatusParams.userName);
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  #login_status{
    top:0;
    left:0;
    .w(100%);
    .p(42px);
    .b(@boxBg);
    position:absolute;
    min-height:calc(~"100% + 105px");
    .ls_content_wrapper{
      .w(100%);
      .h(100%);
      .b(@boxBg);
      .b-r(5px);
      .p(20px);

      .lg_status_wrapper{
        .p-t(20px);
        .h(calc(~"100% - 30px"));
      }
    }
  }
</style>
