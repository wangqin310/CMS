<template>
   <div id="channelList" >
     <div class="back" @click='back()' v-if="checkTwo($root.loginUserInfo.positionId)">
       返回区域中心
     </div>
      <div class="top">
        <div class="right" v-if="check($root.loginUserInfo.positionId)">

          <div class="switch">
            切换：
            <span class="myChannel" @click="changeTab('MyChannel')" :class="{isActiveClass:isActive=='MyChannel'}">我的渠道</span>
            <span class="divide">|</span>
            <span class="channel_manager" @click="changeTab('ChannelManagers')" :class="{isActiveClass:isActive=='ChannelManagers'}">渠道经理</span>
          </div>
        </div>
        <div class="left" v-if="isActive=='MyChannel'">
          渠道名称：<input type="text" v-model.trim="myChannelParams.searchParams.myChannelName" placeholder="请输入渠道名称" class="channelName">

          合作机构：<el-select v-model="myChannelParams.searchParams.stdName" placeholder="全部" class="cooperation">
          <el-option label="全部" value=""></el-option>
            <el-option v-for="coop in cooperationList" :label="coop" :key="coop"  :value="coop"></el-option>
          </el-select>

          城市名称：<el-select v-model="myChannelParams.searchParams.cityName" placeholder="全部" class="city">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(city,index) in cityList" :label="city" :key="index" :value="city"></el-option>
          </el-select>

          <div class="channelManager" style="display:inline-block" v-if="$root.loginUserInfo.positionId==2||$root.loginUserInfo.positionId==3||$root.loginUserInfo.positionId==4||$root.loginUserInfo.positionId==5||$root.loginUserInfo.positionId==7||$root.loginUserInfo.positionId==8">
            渠道经理：<el-select v-model="myChannelParams.searchParams.empId" placeholder="全部" class="userName">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(manager,index) in managerList" :label="manager.userName" :key="index" :value="manager.empId"></el-option>
          </el-select>
          </div>


          状态：<el-select v-model="myChannelParams.searchParams.status" class="status">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item,index) in statusList" :label="item.valDesc" :key="index" :value="item.paraVal"></el-option>
          </el-select>

          <button class="inquiry" @click="search">查询</button>
          <button class="reset" @click="reset">重置</button>
        </div>

      </div>
      <div class="cl_table">
        <component :is="isActive" :tableDataName="tableDataName"></component>
      </div>
    </div>
</template>

<script>
  import MyChannel from './MyChannel';
  import ChannelManagers from './ChannelManagers';
  import MyRanking from './../MyRanking/MyRanking.vue';

    export default {
        name: "channelList",
        data(){
            return{
              cooperationList:[],
              cityList:[],
              statusList:[],
              managerList:[],
              isMyChannel:true,
              channelManager:'',
              tableDataName:'myChannelTableData'    //接口返回的数据名称
            }
        },
        components:{
          MyChannel,
          ChannelManagers,
          MyRanking
        },
        computed:{
          myChannelParams(){
            return this.$store.state.mutations.commonParams.myChannelTableData;
          },
          isActive(){
            return this.$store.state.mutations.channelListIsActive;
          }
        },
        methods:{
          check(position){
            if((position==2||position==3||position==4||position==5||position==7||position==8)&&(this.isActive != 'MyRanking')){
              return true;
            }else{
              return false;
            }
          },
          checkTwo(position){
            if((position==3||position==4||position==5||position==7||position==8)&&(this.isActive != 'MyRanking')){
              return true;
            }else{
              return false;
            }
          },
          changeTab(val){
            this.$store.state.mutations.channelListIsActive=val;
          },
          /**
           * 查询：
           */
          search(){
            this.$store.state.mutations.commonParams[this.tableDataName].current=1;
            this.$store.state.mutations.tableLimit.params.start=0;
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
          },
          /**
           * 重置：
           */
          reset(){
            this.myChannelParams.searchParams.myChannelName='';
            this.myChannelParams.searchParams.stdName='';
            this.myChannelParams.searchParams.cityName='';
            this.myChannelParams.searchParams.empId='';
            this.myChannelParams.searchParams.status='1';
            this.$store.state.mutations.commonParams[this.tableDataName].current=1;
            this.$store.state.mutations.tableLimit.params.start=0;
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
          },
          /**
           * 获取渠道状态：
           */
          getChannelStatus(){
            this.$axios.post("/api/CMM/login_getChannelStatus")
              .then(res =>{
                res.data.data.map((item,index)=>{
                  this.statusList.push({
                    paraVal:item.paraVal,
                    valDesc:item.valDesc
                  })
                })
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 获取城市名称：
           */
          getCityName(){
            this.$axios.post("/api/CMM/page/myChannel/myChannel_getCityListInChannel",
            this.$qs.stringify({
              areaName:''
            }))
              .then(res =>{
                if(res.data.data){
                  res.data.data.map((item,index)=>{
                    this.cityList.push(item[0]);
                  })
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 获取合作机构：
           */
          getCooperateOrg(){
            this.$axios.post("/api/CMM/page/myChannel/myChannel_getOrganizationInChannel",
              this.$qs.stringify({
                areaName:''
              }))
              .then(res =>{
                if(res.data.data){
                  res.data.data.map((item,index)=>{
                    this.cooperationList.push(item[0]);
                  })
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 获取渠道经理：
           */
          getChannelManager(){
            this.$axios.post("/api/CMM/page/login/login_getAllUnderlingUser")
              .then(res =>{
                if(res.data.data){
                  res.data.data.map((item,index)=>{
                    this.managerList.push({
                      empId:item.empId,
                      userName:item.userName
                    })
                  })
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
         back(){
          this.$store.state.mutations.isDisplayList='DistrictManager';
          this.$store.getters.resTableData.myChannelTableData=[];
         }
        },
        mounted(){
        },
        created(){
          this.reset();
          this.getChannelStatus();
          this.getCityName();
          this.getCooperateOrg();
          this.getChannelManager();
        },

    }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";
  @import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");
  #channelList{
    .w(100%);
    .h(100%);
    // padding-right: 2%;

    font: 14px/32px '微软雅黑';
    .back{
      color: #4697e8;
      text-decoration: underline;
      cursor: pointer;
    }
    .back:hover{
      color: #fff;

    }
    .top{
      overflow: hidden;
      input,select{
        width: 100px;
        height: 28px;
        border: 1px solid #7ba3ff;
        border-radius: 3px;
        box-shadow: 0 0 10px #7bb0ff;
        padding-left: 8px;
        font: 12px/28px '微软雅黑';
        margin-right: 0;
      }
      input{
        background: #2f3445;
        color: #f5f5f6;
      }
      .el-input{
        width: 100px;
      }
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
        padding-top: 10px;
        float: left;
        .el-input--suffix{
          display: inline-block;
        }
        .el-input__inner{
        background: #2f3445;
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
          .m-t(5px);
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
    .cl_table{
      .h(calc(~"100% - 84px"));
    }
  }
  .el-select-dropdown.el-popper{
    .el-scrollbar__view.el-select-dropdown__list{
      background: #fff;
      font-size: 12px;
      li:hover{
        background: #4697e8;
      }
    }
  }
</style>
