<template>
    <div id="user">
        <div class="top">
        <button @click="changeTab('UserInformation')" >基本信息</button><button @click="changeTab('ChangePassword')">修改密码</button><button @click="changeTab('Suggestions')">意见反馈</button>
        </div>
      
      <div class="content-wrapper">
        <component :is="isActive"></component>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import ChangePassword from './ChangePassword'
import Suggestions from './Suggestions'
import UserInformation from './userInformation'
    export default {
        name: 'user',
        data() {
            return {
             isActive:'UserInformation'
            }
        },
        components:{
            ChangePassword,
            Suggestions,
            UserInformation
        },
        methods:{
            changeTab(val){
                this.isActive=val;
            }
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  @import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");  
#user{
    padding-top: 51px;
    padding-left: 31px;
    padding-right: 31px;
    padding-bottom: 31px;
    .top{
        button{
            width: 120px;
            height: 40px;
            background:rgba(250,233,186,0);
            color: #fff;
            margin-right: 30px;
            margin-bottom: 40px;
            font: 12px/26px '微软雅黑';
            border:1px solid rgba(123, 163, 255, 1);
            box-shadow:0px 0px 0px 0px rgba(99,135,254,0.3);
            }
    }
 

}
</style>
