<template>
  <div id="myWork">
    <div class="filter">
      <h5>筛选条件：</h5>
      <div class="time">
        <span class="text">时间</span>
        <select name="" id="startYear">
          <option value="1">2018</option>
        </select>
        <select name="" id="startMonth">
          <option value="1">01</option>
        </select>
        <select name="" id="startDate">
          <option value="1">01</option>
        </select>

        <span class="line"></span>

        <select name="" id="endYear">
          <option value="1">2018</option>
        </select>
        <select name="" id="endMonth">
          <option value="1">03</option>
        </select>
        <select name="" id="endDate">
          <option value="1">15</option>
        </select>
      </div>

      <div class="action">
        <span class="text">行为</span>
        <select name="" id="visit">
          <option value="1">走访次数</option>
        </select>
      </div>

      <div class="condition">
        <span class="text">条限</span>
        <select name="" id="con">
          <option value="1">全部</option>
        </select>
      </div>

      <button class="firstBtn">查询</button>
      <button class="secondBtn">导出excel</button>

    </div>
    <div class="form">
      <ul>
        <li v-for="(item,index) in 2" :key="index">
          <score></score>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Score from './Score'
  export default {
    name: 'myWork',
    data() {
      return {}
    },
    components:{
      Score
    }
  }
</script>


<style lang="less">
  @import "./../../assets/less/common";
  #myWork{
    .w(100%);
    min-width: 1024px;
    overflow: hidden;
    .filter{
      h5{
        display: inline-block;
        font-weight: normal;
        margin-right: 30px;
        font: 16px/32px '微软雅黑';
      }
      margin-top: 1.6%;
      margin-bottom: 4.7%;
      padding-left: 4%;
      font: 16px/32px '微软雅黑';
      // ----------
      .el-input input,select{
        width: 100px;
        height: 28px;
        border: 1px solid #7ba3ff!important;
      }
      // ------
      select{
        background: #2f3445;
        color: #fff;
        border: 1px solid #7bb0ff;
        border-radius: 3px;
        box-shadow: 0 0 10px #7bb0ff;
        height: 30px;
        margin: 0 4px;
      }
      .time{
        display: inline-block;
        span.text{
          margin-right: 13px;
        }
        #startYear,#endYear{
          width: 86px;
        }
        #startMonth,#startDate,#endMonth,#endDate{
          width: 72px;
        }
        .line{
          display: inline-block;
          width: 30px;
          height: 0;
          border-top: 1px solid #fff;
          font: 1px/32px '微软雅黑';
        }
      }
      .action{
        display: inline-block;
        select{
          width: 120px;
        }
        span.text{
          margin-left: 50px;
        }
      }
      .condition{
        display: inline-block;
        select{
          width: 120px;
        }
        span.text{
          margin-left: 66px;
        }
      }
      button{
        background:#4a88fa ;
        color: #fff;
        width: 100px;
        height: 30px;
        border: none;
        border-radius: 3px;
      }
      .firstBtn{
        margin-left: 49px;
      }
      .secondBtn{
        margin-left: 24px;
      }
    }
    .form{
      ul{
        display: flex;
        li{
          flex: 1;
          width: 42%;
          height: 41%;
        }
        li:nth-child(1){
          margin-left: 5%;
        }
        li:nth-child(2){
          margin-left: 5.7%;
          margin-right: 5%;
        }
      }

    }
  }
</style>
