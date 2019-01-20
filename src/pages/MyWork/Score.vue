<template>
    <div id="score">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="rank" label="名次" style="width: 15%"></el-table-column>
        <el-table-column prop="manager" label="渠道经理" style="width: 18%"></el-table-column>
        <el-table-column prop="center" label="区域中心" style="width: 41%"></el-table-column>
        <el-table-column prop="ranks" label="综合评分排行"></el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "score",
        data() {
          return {
            tableData: [{
              rank: '1',
              manager: '李总',
              center: '上海',
              ranks:'88'
            }, {
              rank: '2',
              manager: '王小二',
              center: '北京',
              ranks:'78'
            }, {
              rank: '3',
              manager: '小米',
              center: '南京',
              ranks:'88'
            }, {
              rank: '4',
              manager: '大宝',
              center: '安徽',
              ranks:'98'
            },{
              rank: '5',
              manager: '李总',
              center: '上海',
              ranks:'88'
            }, {
              rank: '6',
              manager: '王小二',
              center: '北京',
              ranks:'78'
            }, {
              rank: '7',
              manager: '小米',
              center: '南京',
              ranks:'88'
            }, {
              rank: '8',
              manager: '大宝',
              center: '安徽',
              ranks:'98'
            }, {
              rank: '9',
              manager: '大宝',
              center: '安徽',
              ranks:'98'
            },{
              rank: '10',
              manager: '李总',
              center: '上海',
              ranks:'88'
            }, {
              rank: '11',
              manager: '王小二',
              center: '北京',
              ranks:'78'
            }, {
              rank: '12',
              manager: '小米',
              center: '南京',
              ranks:'88'
            }]
          }
      }
    }
</script>

<style lang="less">
  @import "./../../assets/less/common";
  #score{
    .w(100%);
    text-align: center;
    .el-table__header{
      font: 16px/50px '微软雅黑';
      border: 1px solid #7ba3ff;
      box-shadow: 0 0 10px #7bb0ff;
      .is-leaf{
        width: 15%;
      }
    }
    .el-table__body-wrapper{
      td{
        border-bottom: 1px solid #7bb0ff;
        font: 16px/50px '微软雅黑';
      }
    }
  }
</style>
