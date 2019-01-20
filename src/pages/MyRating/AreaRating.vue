<template>
    <div id="areaRating">
        <div class="card">
          <div class="top">
            <img :src="houseUrl" alt="">
            <span class="zone">上海</span>
            区域名称
            <div class="sum">
              渠道总数
              <span class="num">18</span>
            </div>
            <div class="line"></div>
          </div>
          <div class="cont">
            第<span class="num">6</span>名，比上一次提高了<span class="num">2</span>名 <img :src="upUrl" alt=""><br>
            渠道排名
            <br>
            <span class="director">
              宋湘萍
            </span>
            区域负责人
          </div>
          <div class="bottom">
            查看更多
            <img :src="moreUrl" alt="">
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "area-rating",
      data(){
          return{
            houseUrl:require('@/assets/images/myrating_house.png'),
            upUrl:require('@/assets/images/myrating_up.png'),
            downUrl:require('@/assets/images/myrating_down.png'),
            equalUrl:require('@/assets/images/myrating_equal.png'),
            moreUrl:require('@/assets/images/myrating_more.png'),
        }
      }
    }
</script>

<style scoped lang="less">
  @import "./../../assets/less/common";
#areaRating{
  .card{
    border: 1px solid #7ba3ff;
    box-shadow: 0 0 10px #7bb0ff;
    border-radius: 8px;
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;
    .top{
      height: 100px;
      font-size: 16px;
      overflow: hidden;
      img{
        padding:19px 23px 29px 30px;
      }
      .zone{
        font: 28px/88px '微软雅黑';
      }
      .sum{
        float: right;
        margin-right: 30px;
        .num{
          font: 28px/88px '微软雅黑';
        }
      }
      .line{
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #2380db , #67b2fb,#085eb1);
      }
    }
    .cont{
      height: 147px;
      padding-left: 32px;
      padding-top: 20px;
      border-bottom: 1px dashed #7d7d7d;
      font: 17px/29px '微软雅黑';
      .num{
        font-size:23px ;
      }
      .director{
        font: 23px/68px '微软雅黑';
      }
    }
    .bottom{
      padding-left: 30px;
      font: 19px/52px '微软雅黑';
      img{
        float: right;
        margin-right: 30px;
        margin-top: 16px;
      }
    }
  }
}
</style>
