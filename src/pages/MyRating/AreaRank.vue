<template>
    <div id="areaRank">
      <div class="sections">
          <div class="rank">
            <div class="top">
              <div class="tittle">贷余排行榜</div>
              <img class="top3" :src="top3Url" alt="">
              <div class="score">
                <ul class="excellent">
                  <li v-for="(item,index) in daiyuTop3List" :key="index">
                    <img :src="houseUrl" alt="" width="90px"><br>
                    <div class="introduce">
                      <img v-show="index==0" :src="num1Url" alt="">
                      <img v-show="index==1" :src="num2Url" alt="">
                      <img v-show="index==2" :src="num3Url" alt="">
                      <span class="name">{{item.areaName}}</span><br>
                      <span class="job">{{item.rankMsg}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="cont">
              <ul>
                <li v-for ="(item,index) in areaRankDaiyuList" :key="index">
                  <span class="num">{{index+1}}</span>
                  <span class="name">{{item.areaName}}</span>
                  <span class="place">{{item.rankMsg}}</span>
                </li>
              </ul>
            </div>
            <div class="page_wrapper">
              <pagination :tableDataName="areaRankDaiyuDataName"/>
            </div>
          </div>   
          <div class="rank">
            <div class="top">
              <div class="tittle">发放量排行榜</div>
              <img class="top3" :src="top3Url" alt="">
              <div class="score">
                <ul class="excellent">
                  <li v-for="(item,index) in faTop3List" :key="index">
                    <img :src="houseUrl" alt="" width="90px"><br>
                    <div class="introduce">
                      <img v-show="index==0" :src="num1Url" alt="">
                      <img v-show="index==1" :src="num2Url" alt="">
                      <img v-show="index==2" :src="num3Url" alt="">
                      <span class="name">{{item.areaName}}</span><br>
                      <span class="job">{{item.rankMsg}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="cont">
              <ul>
                <li v-for ="(item,index) in areaRankFaList" :key="index">
                  <span class="num">{{index+1}}</span>
                  <span class="name">{{item.areaName}}</span>
                  <span class="place">{{item.rankMsg}}</span>
                </li>
              </ul>
            </div>
            <div class="page_wrapper">
              <pagination :tableDataName="areaRankFaDataName"/>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
    import Pagination from './../../components/Pagination.vue'
    export default {
        name: "area-rank",
        data(){
          return{
            num1Url:require('@/assets/images/schedule_num1.png'),
            num2Url:require('@/assets/images/schedule_num2.png'),
            num3Url:require('@/assets/images/schedule_num3.png'),
            top3Url:require('@/assets/images/schedule_top3.png'),
            houseUrl:require('@/assets/images/schedule_house.png'),
            areaRankFaDataName:'areaRankFaList',    //接口返回的数据名称
            areaRankDaiyuDataName: 'areaRankDaiyuList',
            daiyuTop3List: [],
            faTop3List: []
          }
        },
        components:{Pagination},
        methods:{

        },
        computed: {
          areaRankFaList() {
            var faParam = this.$store.state.mutations.commonParams[this.areaRankFaDataName];
            if(faParam.current == 1) {
              this.faTop3List = this.$store.getters.resTableData[this.areaRankFaDataName].slice(0,3);
              return this.$store.getters.resTableData[this.areaRankFaDataName].slice(3);
            } else {
              return this.$store.getters.resTableData[this.areaRankFaDataName];
            }
          },
          loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
          areaRankDaiyuList() {
            var daiyuParam = this.$store.state.mutations.commonParams[this.areaRankDaiyuDataName];
            if(daiyuParam.current == 1) {
              this.daiyuTop3List = this.$store.getters.resTableData[this.areaRankDaiyuDataName].slice(0,3);
              return this.$store.getters.resTableData[this.areaRankDaiyuDataName].slice(3);
            } else {
              return this.$store.getters.resTableData[this.areaRankDaiyuDataName];
            }
          }
        },
        mounted() {
          this.$store.dispatch("getAjaxTableData",{tableDataName:this.areaRankFaDataName,vm:this,isSearch:this.isSearch});
          this.$store.dispatch("getAjaxTableData",{tableDataName:this.areaRankDaiyuDataName,vm:this,isSearch:this.isSearch});
        }
    }
</script>

<style lang="less">
  #areaRank{
    width: 100%;
    .sections{
      display: flex;
      .rank{
        margin-left: 40px;
        padding-right: 40px;
        .top{
          .tittle{
            font: 18px/46px '微软雅黑';
          }
          .top3{
            margin-bottom: 15px;
            width: 80%;
          }
          .score{
            height: 166px;
            margin: 0 auto;
            .excellent{
              display: flex;
              flex-direction: row ;
              justify-content: center;
              li{
                width: 150px;
                font: 13px/20px '微软雅黑';
                .introduce{
                  height: 50px;
                  text-align: left;
                  margin-left: 15px;
                  img{
                    float: left;
                    width: 30px;
                    margin-right: 10px;
                  }
                  .name{
                    font: 14px/30px '微软雅黑';
                  }
                }
              }
            }
          }
        }
        .cont{
          width: 100%;
          text-align: left;
          border-top: 1px solid #7bb0ff;
          margin-top: 10px;
          margin-bottom: 20px;
          li{
            font: 16px/45px '微软雅黑';
            border-bottom: 1px solid #7bb0ff;
            .num{
              display: inline-block;
              width: 55px;
              margin: 0 30px;
            }
            .place{
              color: #a5a5a6;
              font: 14px/45px '微软雅黑';
              float: right;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
</style>
