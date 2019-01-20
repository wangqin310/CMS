<template>
    <div id="scheduleManagerRank">
      <ul class="sections">
        <li class="section" v-for="(item,index) in 2" :key="index">
          <div class="rank">
            <div class="top">
              <div class="tittle">贷余排行榜</div>
              <div class="box">
                <img :src="picUrl1" alt="">
                <div class="message">
                  <span class="name">李四</span>
                  <p>
                    <span class="today_rank">今日排名：136名</span>
                    <span class="beat">打败了86%的人</span>
                  </p>
                  <span class="forward">比上一次提前了19名</span>
                </div>
              </div>
              <img class="top3" :src="top3Url" alt="">
              <div class="score">
                <ul class="excellent">
                  <li>
                    <img :src="picUrl2" alt=""><br>
                    <div class="introduce">
                      <img :src="num1Url" alt="">
                      <span class="name">王菲菲</span><br>
                      <span class="job">渠道经理</span>
                    </div>
                  </li>
                  <li>
                    <img :src="picUrl3" alt=""><br>
                    <div class="introduce">
                      <img :src="num2Url" alt="">
                      <span class="name">李鑫</span><br>
                      <span class="job">渠道经理</span>
                    </div>
                  </li>
                  <li>
                    <img :src="picUrl4" alt=""><br>
                    <div class="introduce">
                      <img :src="num3Url" alt="">
                      <span class="name">高峰</span><br>
                      <span class="job">渠道经理</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="cont">
              <ul>
                <li>
                  <span class="num">4</span>
                  <img :src="picUrl5" alt="">
                  <span class="name">张三</span>
                  <span class="job">渠道经理</span>
                </li>
                <li>
                  <span class="num">5</span>
                  <img :src="picUrl5" alt="">
                  <span class="name">张三</span>
                  <span class="job">渠道经理</span>
                </li>
                <li>
                  <span class="num">6</span>
                  <img :src="picUrl5" alt="">
                  <span class="name">张三</span>
                  <span class="job">渠道经理</span>
                </li>
                <li>
                  <span class="num">7</span>
                  <img :src="picUrl5" alt="">
                  <span class="name">张三</span>
                  <span class="job">渠道经理</span>
                </li>
                <li>
                  <span class="num">8</span>
                  <img :src="picUrl5" alt="">
                  <span class="name">张三</span>
                  <span class="job">渠道经理</span>
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
        name: "scheduleManagerRank",
        data(){
          return{
            picUrl1:require('./../../assets/images/schedule_pic.png'),
            picUrl2:require('./../../assets/images/schedule_pic2.png'),
            picUrl3:require('./../../assets/images/schedule_pic3.png'),
            picUrl4:require('./../../assets/images/schedule_pic4.png'),
            picUrl5:require('./../../assets/images/schedule_pic5.png'),
            num1Url:require('./../../assets/images/schedule_num1.png'),
            num2Url:require('./../../assets/images/schedule_num2.png'),
            num3Url:require('./../../assets/images/schedule_num3.png'),
            top3Url:require('./../../assets/images/schedule_top3.png')
          }
        }
    }
</script>

<style lang="less">
  #scheduleManagerRank{
    padding-top: 70px;
    margin-left: 75px;
    text-align: center;
    ul.sections{
      display: flex;
      width: 100%;
      li.section{
        flex: 1;
        float: left;
        margin-right: 5.4%;
        width: 42%;
        .top{
          .tittle{
            font: 18px/46px '微软雅黑';
          }
          .box{
            margin: 19px auto;
            width: 85.7%;
            height: 120px;
            background: #43475b;
            border: 1px solid #7ba3ff;
            box-shadow: 0 0 10px #7bb0ff;
            border-radius: 8px;
            img{
              float: left;
              margin: 30px 30px 0 48px;
            }
            .message{
              text-align: left;
              font: 16px/32px '微软雅黑';
              margin-top: 17px;
            }
            .score{
              .excellent{
                li:nth-child(2){
                  float: left;
                }
              }
            }
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
                width: 33.3%;
                font: 13px/20px '微软雅黑';
                .introduce{
                  height: 50px;
                  width: 110px;
                  margin: 9px auto;
                  img{
                    float: left;
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
          width: 100%;
          margin-top: 40px;
          li{
            font: 16px/59px '微软雅黑';
            border-bottom: 1px solid #7bb0ff;
            .num{
              padding: 0 43px;
            }
            .name{
              padding: 0 33px 0 15px;
            }
            .job{
              color: #a5a5a6;
              font: 14px/59px '微软雅黑';
            }
          }
        }
      }
    }

  }
</style>
