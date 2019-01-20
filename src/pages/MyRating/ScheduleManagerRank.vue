<template>
    <div id="scheduleManagerRank">
      <div class="sections">
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
      </div>
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
    width: 100%;
    .sections{
      display: flex;
      .rank{
        margin: 0 40px;
        .top{
          .tittle{
            font: 18px/46px '微软雅黑';
          }
          .box{
            margin: 15px auto;
            width: 100%;
            height: 95px;
            background: #43475b;
            border: 1px solid #7ba3ff;
            box-shadow: 0 0 10px #7bb0ff;
            border-radius: 8px;
            img{
              float: left;
              margin: 15px 20px 0 25px;
            }
            .message{
              text-align: left;
              font: 14px/25px '微软雅黑';
              margin-top: 5px;
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
            margin-bottom: 10px;
            width: 85%;
          }
          .score{
            height: 140px;
            text-align: center;
            .excellent{
              width: 480px;
              margin: 0 auto;
              li{
                float: left;
                width: 33.3%;
                font: 13px/20px '微软雅黑';
                img{
                  height: 110px;
                  width: 100px;
                }
                .introduce{
                  height: 50px;
                  width: 110px;
                  margin: 5px auto;
                  img{
                    float: left;
                    width: 30px;
                    height: 37px;
                  }
                  .name{
                    font: 16px/30px '微软雅黑';
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
          margin-top: 30px;
          li{
            font: 14px/45px '微软雅黑';
            border-bottom: 1px solid #7bb0ff;
            .num{
              padding: 0 43px;
            }
            .name{
              padding: 0 33px 0 15px;
            }
            .job{
              color: #a5a5a6;
              font: 14px/45px '微软雅黑';
            }
          }
        }
      }
    }

  }
</style>
