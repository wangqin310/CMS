<template>
    <div id="my_rating">
      <el-row :gutter="30" class="sections">
        <el-col :xs="24" :sm="24" :md="24" :lg="12">
          <div class="rank">
            <div class="top">
              <div class="tittle">贷余排行榜</div>
              <img class="top3" :src="top3Url" alt="">
              <div class="score">
                <ul class="excellent">
                  <li v-for="(item,index) in Top3AreaRankDaiyuList" :key="index">
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
                  <span class="num">{{(index+1)+($store.state.mutations.commonParams.areaRankDaiyuList.current-1)*10}}</span>
                  <span class="name">{{item.areaName}}</span>
                  <span class="place">{{item.rankMsg}}</span>
                </li>
              </ul>
            </div>
            <div class="page_wrapper">
              <pagination :tableDataName="areaRankDaiyuDataName"/>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12">
          <div class="rank">
            <div class="top">
              <div class="tittle">发放量排行榜</div>
              <img class="top3" :src="top3Url" alt="">
              <div class="score">
                <ul class="excellent">
                  <li v-for="(item,index) in Top3AreaRankFaList" :key="index">
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
                  <span class="num">{{(index+1)+($store.state.mutations.commonParams.areaRankFaList.current-1)*10}}</span>
                  <span class="name">{{item.areaName}}</span>
                  <span class="place">{{item.rankMsg}}</span>
                </li>
              </ul>
            </div>
            <div class="page_wrapper">
              <pagination :tableDataName="areaRankFaDataName"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
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
      top3daiYu:'Top3AreaRankDaiyuList',
      top3Fa:'Top3AreaRankFaList',
    }
  },
  components:{Pagination},
  methods:{
    /**
     *获取贷余排行榜、发放量排行榜前三名数据：
     */
    getTop3Data(obj){
      this.$axios.post('/api/CMM/page/ranking_getAllAreaRank',
        this.$qs.stringify({
          start:0,
          limit:3,
          order:'asc',
          rankType:obj.rankType
        })
      )
        .then(res=>{
          this.$store.commit("getTop3Data",{tableDataName:obj.tableDataName,resData:res.data.data.rows});
        })
        .catch(error=>{
          console.log(error);
        })
    }
  },
  computed: {
    /**
     * 贷余排行榜前三名：
     * @constructor
     */
    Top3AreaRankDaiyuList(){
      return this.$store.state.mutations.resTableData[this.top3daiYu];
    },
    /**
     * 发放量排行榜前三名：
     * @constructor
     */
    Top3AreaRankFaList(){
      return this.$store.state.mutations.resTableData[this.top3Fa];
    },
    /**
     * 贷余排行榜：
     * @constructor
     */
    areaRankDaiyuList() {
      return this.$store.getters.resTableData[this.areaRankDaiyuDataName];
    },
    /**
     * 发放量排行榜：
     * @constructor
     */
    areaRankFaList() {
      return this.$store.getters.resTableData[this.areaRankFaDataName];
    }
  },
  mounted() {
    this.getTop3Data({tableDataName:this.top3daiYu,rankType:'1'});   //贷余排行榜
    this.getTop3Data({tableDataName:this.top3Fa,rankType:'0'});      //发放量排行榜
    this.$store.state.mutations.tableLimit.params.start=3;
    this.$store.dispatch("getAjaxTableData",{tableDataName:this.areaRankDaiyuDataName,vm:this});
    this.$store.dispatch("getAjaxTableData",{tableDataName:this.areaRankFaDataName,vm:this});

  }
}
</script>

<style lang="less">
  @import "./../../assets/less/common";
  #my_rating{
    width: 100%;
    .p(42px);
    .sections{
      .rank{
        .top{
          .tittle{
            text-align:center;
            font: 18px/46px '微软雅黑';
          }
          .top3{
            width: 80%;
            margin-left: 10%;
            margin-bottom: 15px;
          }
          .score{
            height: 166px;
            margin: 0 auto;
            .excellent{
              display: flex;
              flex-direction: row ;
              justify-content: center;
              li{
                flex:1;
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
                  .job{
                    color:#a5a5a6;
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
