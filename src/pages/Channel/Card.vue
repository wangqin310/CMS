<template>
    <div id="card">
      
      <div class="card" v-for="(item,index) in filterList" :key='index'>
          <div class="top">
            <div class="left">
              <img :src="houseUrl" alt="">
              <span class="zone" @click='moreData(item)'>{{item.areaName}}</span>区域名称
              <br> <span class="pingyin" @click='moreData(item)'>{{item.pinYin}}</span>
              
            </div>
              
              <div class="sum">
                渠道总数
                <span class="num" @click='moreData(item)'>{{item.channelNum}}</span>
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
    </div>
</template>

<script>
    export default {
      name: "card",
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
            return this.$store.state.mutations.filterList;
          }
      },
      methods:{
        moreData(val){
          this.$store.state.mutations.rowList = val.areaName;
          this.$store.state.mutations.commonParams.myChannelTableData.searchParams.areaName = this.$store.state.mutations.rowList;
          this.$store.state.mutations.isDisplayList = 'ChannelList';
        }
      }
    }
</script>

<style lang="less">
  @import "./../../assets/less/common";
#card{
  padding-top: 60px;
  .card{
    width: 450px;
    border: 1px solid #7ba3ff;
    box-shadow: 0 0 10px #7bb0ff;
    border-radius: 8px;
    margin: 0 3% 10px 3%;
    float: left;
    padding-top: 1px;
    .top{
      padding: 10px 20px 8px 20px;
      overflow: hidden;
      .left{
        float: left;
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
</style>
