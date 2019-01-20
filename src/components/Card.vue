<template>
    <div id="card" :style="{paddingTop:isLoginTime?'15px':'50px'}">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="8" class="card_wrapper" v-for="(item,index) in filterList" :key='index' @click='moreData(item)'>
            <div class="card">
              <div class="top">
                <div class="left">
                  <img :src="houseUrl" alt="">
                  <span class="zone" @click='moreData(item)'>{{item.areaName}}</span>区域名称
                  <br> <span class="pingyin" @click='moreData(item)' v-text="isLoginTime?item.orgName:item.pinYin"></span>
                </div>
                <div class="sum">
                  <span v-if="isLoginTime" v-text="params&&params=='mapMore'?'拜访总数':'登录次数'"></span>
                  <span v-else>渠道总数</span>
                  <span v-if="isLoginTime" class="num" @click='moreData(item)'>{{item.monthReportComNum}}</span>
                  <span v-else class="num" @click='moreData(item)'>{{item.channelNum}}</span>
                </div>
                <div class="line"></div>
              </div>
              <div class="cont">
              <span class="director" @click='moreData(item)'>
                {{item.Person}}
              </span>
                区域负责人
              </div>
              <div class="bottom" @click='moreData(item)'>
                查看更多
                <img :src="moreUrl" alt="">
              </div>
            </div>
          </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
      name: "card",
      props:['isLoginTime','params'],
      data(){
          return{
            houseUrl:require('@/assets/images/myrating_house.png'),
            upUrl:require('@/assets/images/myrating_up.png'),
            downUrl:require('@/assets/images/myrating_down.png'),
            equalUrl:require('@/assets/images/myrating_equal.png'),
            moreUrl:require('@/assets/images/myrating_more.png')
        }
      },
      computed:{
        tableData(){
          return this.$store.state.mutations.districtList;
        },
        filterList(){
          this.$store.state.mutations.filterList.map((item)=>{
          if(item.Person=='&nbsp;&nbsp;'){
              item.Person='   '
          }
          })
            return this.$store.state.mutations.filterList;
          }
      },
      methods:{
        moreData(val){
          this.$store.state.mutations.isFromWorkPage=false;
          if(val.userName){
            this.$store.state.mutations.loginStatusParams.userName=val.userName;
          }else{
            this.$store.state.mutations.loginStatusParams.userName='';
          }
          if(this.isLoginTime){
            this.$store.state.mutations.showLoginStatus='LoginStatus';
          }else{
            this.$store.state.mutations.rowList=val.areaName;
            this.$store.state.mutations.isDisplayList='ChannelList';
          }
        }
      }
    }
</script>

<style lang="less">
  @import "../assets/less/common";
#card{
  .card_wrapper{
    .h(100%);
    .m(20px 0);
    .card{
      border: 1px solid #7ba3ff;
      box-shadow: 0 0 10px #7bb0ff;
      border-radius: 8px;
      padding-top: 1px;
      .top{
        padding: 10px 15px 8px 15px;
        overflow: hidden;
        .left{
          float: left;
          width: 185px;
          img{
            height: 28px;
            vertical-align: middle;
            margin-top: 8px;
            margin-right: 20px;
            float: left;
          }
          .zone{
            font-size: 22px;
            margin-right: 10px;
            cursor: pointer;
          }
          .pingyin{
            margin-top: -2px;
            font-size: 13px;
            color: #dfdfdf;
            cursor: pointer;
          }
        }
        .sum{
          float: right;
          margin-top: 10px;
          width: 145px;
          cursor: pointer;
          .num{
            font-size: 30px;
          }
        }

      }
      .cont{
        padding: 15px 20px;
        .director{
          cursor: pointer;
          color: #7ba3ff;
        }
        .director:hover{
          color: #fff;
        }

      }
      .bottom{
        display: block;
        color: #fff;
        padding: 10px 20px;
        font-size: 14px;
        border-top: 1px dashed #898989;
        cursor: pointer;
        img{
          float: right;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
