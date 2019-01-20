<template>
    <div id="areaRank">
      <ul class="sections">
        <li class="section" v-for="item in 2" :key="item">
          <div class="rank">
            <div class="top">
              <div class="tittle">贷余排行榜</div>
              <img class="top3" :src="top3Url" alt="">
              <div class="score">
                <ul class="excellent">
                  <li>
                    <img :src="houseUrl" alt=""><br>
                    <div class="introduce">
                      <img :src="num1Url" alt="">
                      <span class="name">上海</span><br>
                      <span class="job">跟上次排名持平</span>
                    </div>
                  </li>
                  <li>
                    <img :src="houseUrl" alt=""><br>
                    <div class="introduce">
                      <img :src="num2Url" alt="">
                      <span class="name">南京</span><br>
                      <span class="job">跟上次排名提高1</span>
                    </div>
                  </li>
                  <li>
                    <img :src="houseUrl" alt=""><br>
                    <div class="introduce">
                      <img :src="num3Url" alt="">
                      <span class="name">北京</span><br>
                      <span class="job">跟上次排名降低1</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="cont">
              <ul>
                <li>
                  <span class="num">4</span>
                  <span class="name">湖北</span>
                  <span class="place">比上次排名提高了1</span>
                </li>
                <li>
                  <span class="num">5</span>
                  <span class="name">福建</span>
                  <span class="place">比上次排名下降了3</span>
                </li>
                <li>
                  <span class="num">6</span>
                  <span class="name">安徽</span>
                  <span class="place">比上次排名下降了2</span>
                </li>
                <li>
                  <span class="num">7</span>
                  <span class="name">上海</span>
                  <span class="place">比上次排名提高了1</span>
                </li>
                <li>
                  <span class="num">8</span>
                  <span class="name">合肥</span>
                  <span class="place">比上次排名下降了3</span>
                </li>
                <li>
                  <span class="num">9</span>
                  <span class="name">广东</span>
                  <span class="place">比上次排名下降了2</span>
                </li>
                <li>
                  <span class="num">10</span>
                  <span class="name">湖南</span>
                  <span class="place">比上次排名下降了3</span>
                </li>
              </ul>
            </div>
            <div class="page">
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "area-rank",
        data(){
          return{
            num1Url:require('@/assets/images/schedule_num1.png'),
            num2Url:require('@/assets/images/schedule_num2.png'),
            num3Url:require('@/assets/images/schedule_num3.png'),
            top3Url:require('@/assets/images/schedule_top3.png'),
            houseUrl:require('@/assets/images/schedule_house.png')
          }
        }
    }
</script>

<style lang="less">
  #areaRank{
    padding-top: 70px;
    margin-left: 75px;
    text-align: center;
    ul.sections{
      display: flex;
      li.section{
        flex: 1;
        margin-right: 6%;
        width: 48%;
        .top{
          .tittle{
            font: 18px/46px '微软雅黑';
          }
          .top3{
            margin-bottom: 27px;
            width: 85%;
          }
          .score{
            height: 166px;
            text-align: center;
            .excellent{
              width: 600px;
              margin: 0 auto;
              li{
                float: left;
                width: 200px;
                font: 13px/20px '微软雅黑';
                .introduce{
                  height: 50px;
                  text-align: left;
                  margin-left: 50px;
                  img{
                    float: left;
                    margin-right: 10px;
                  }
                  .name{
                    font: 18px/30px '微软雅黑';
                  }
                }
              }
            }
          }
        }
        .cont{
          text-align: left;
          border-top: 1px solid #7bb0ff;
          color: #fff;
          margin-top: 40px;
          li{
            font: 16px/59px '微软雅黑';
            border-bottom: 1px solid #7bb0ff;
            .num{
              padding: 0 43px;
            }
            .place{
              color: #a5a5a6;
              font: 14px/59px '微软雅黑';
              float: right;
              margin-right: 40px;
            }
          }
        }
      }
    }
  }
</style>
