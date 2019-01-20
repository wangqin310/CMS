<template>
    <div id="warning">
      <div class="top">
       <span class="back">返回</span>
        报告标题：
        <input type="text" placeholder="请输入报告标题">
        <button class="inquire">查询</button>
        <button class="Reset">重置</button>
        <div class="export">
          <button class="export_all">导出所有</button>
          <button class="export_see">导出所见</button>
          <button class="submit_report">提交报告</button>
        </div>
      </div>
      <div class="container">
        <div class="filter">
          筛选：
          <span class="all">全部</span>
          <span class="week">周报</span>
          <span class="month">月报</span>
          <span class="quarter">季报</span>
          <span class="half_year">半年报</span>
          <span class="year">年报</span>
        </div>
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="reporter" label="报告人" width='100px'></el-table-column>
            <el-table-column prop="report_tittle" label="报告标题" width='220px'></el-table-column>
            <el-table-column prop="report_message" label="附件信息" width='120px'></el-table-column>
            <el-table-column prop="report_time" label="报告时间" width='190px'></el-table-column>
            <el-table-column prop="work_summary" label="本周工作总结" width='642px'></el-table-column>
            <el-table-column prop="help" label="需协调和帮助" width='195px'></el-table-column>
            <el-table-column prop="action" label="操作" width='114px'></el-table-column>
          </el-table>
        </div>
        <p>显示第 1 到 5 条记录，共 5 条记录</p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'warning',
        data() {
            return {
              tableData: [{
                reporter: '徐世民',
                report_tittle: '阜阳、六安、安庆、 宣城渠道走访',
                report_message: '暂无',
                report_time: '2018-01-12   17:23',
                work_summary: '1月2日至1月5日对四个地市的渠道进行了走访检查和宣导，经走访了解目前四个地市的渠道对于 我司渠道不收费政策，贷款用途和渠道不得搭售其他产品的相关规定都已知晓，并积极配合区域\n' +
                '中心做好获客筛选等工作！同时鼓励渠道做一手客户，对于二三级渠道的客户要严加审核。……',
                help: '当过期时没有留有总监登 录说明的余地 ',
                action: '查看详情',
              },
                {
                  reporter: '徐世民',
                  report_tittle: '阜阳、六安、安庆、 宣城渠道走访',
                  report_message: '暂无',
                  report_time: '2018-01-12   17:23',
                  work_summary: '1月2日至1月5日对四个地市的渠道进行了走访检查和宣导，经走访了解目前四个地市的渠道对于 我司渠道不收费政策，贷款用途和渠道不得搭售其他产品的相关规定都已知晓，并积极配合区域\n' +
                  '中心做好获客筛选等工作！同时鼓励渠道做一手客户，对于二三级渠道的客户要严加审核。……',
                  help: '当过期时没有留有总监登 录说明的余地 ',
                  action: '查看详情',
                },{
                  reporter: '徐世民',
                  report_tittle: '阜阳、六安、安庆、 宣城渠道走访',
                  report_message: '暂无',
                  report_time: '2018-01-12   17:23',
                  work_summary: '1月2日至1月5日对四个地市的渠道进行了走访检查和宣导，经走访了解目前四个地市的渠道对于 我司渠道不收费政策，贷款用途和渠道不得搭售其他产品的相关规定都已知晓，并积极配合区域\n' +
                  '中心做好获客筛选等工作！同时鼓励渠道做一手客户，对于二三级渠道的客户要严加审核。……',
                  help: '当过期时没有留有总监登 录说明的余地 ',
                  action: '查看详情',
                },{
                  reporter: '徐世民',
                  report_tittle: '阜阳、六安、安庆、 宣城渠道走访',
                  report_message: '暂无',
                  report_time: '2018-01-12   17:23',
                  work_summary: '1月2日至1月5日对四个地市的渠道进行了走访检查和宣导，经走访了解目前四个地市的渠道对于 我司渠道不收费政策，贷款用途和渠道不得搭售其他产品的相关规定都已知晓，并积极配合区域\n' +
                  '中心做好获客筛选等工作！同时鼓励渠道做一手客户，对于二三级渠道的客户要严加审核。……',
                  help: '当过期时没有留有总监登 录说明的余地 ',
                  action: '查看详情',
                }]
            }
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
#warning{
  padding-left: 40px;
  padding-top: 20px;
  padding-right: 48px;
  .top{
    .back{
      color: #479df1;
      text-decoration: underline;
      margin-right: 60px;
    }
    input{
      width: 240px;
      height: 30px;
      border: 1px solid #7ba3ff;
      border-radius: 3px;
      background: #2f3445;
      color: #d2d2d2;
      box-shadow: 0 0 10px #7bb0ff;
      font: 14px/30px '微软雅黑';
      padding-left: 13px;
    }
    button{
      width: 100px;
      height: 30px;
      border: none;
      border-radius: 3px;
    }
    .inquire,.export_all,.export_see,.submit_report{
      background: #4a88fa;
      color: #ecf1fe;
      font: 14px/30px '微软雅黑';
    }
    .inquire{
      margin: 0 30px;
    }
    .Reset{
      color: #666666;
    }
    .export{
      float: right;
      .export_see{
        margin: 0 33px;
      }
    }
  }
  .container{
    .filter{
      span{
        padding: 0 16px;
        font: 14px/100px '微软雅黑';
      }
      .all{
        color: #479df1;
      }
    }
    .table{
      border: 1px solid #7ba3ff;
      border-radius: 3px;
      box-shadow: 0 0 10px #7bb0ff;
      .el-table{
        .el-table__header-wrapper{
          .cell{
            height: 59px;
            font: 14px/59px '微软雅黑';
            border-bottom:  1px solid #7bb0ff;
          }
        }
        .el-table__body-wrapper{
            td{
              text-align: center;
              height: 119px;
              padding: 0 20px;
              border-bottom:  1px solid #7bb0ff;
              .cell{
                font: 14px/20px '微软雅黑';
                display: inline;
                vertical-align: middle;
              }
            }
            td:nth-child(7){
              .cell{
                display: inline-block;
                width: 70px;
                height: 24px;
                background: #ffac1b;
                border-radius: 9px;
                font: 14px/24px '微软雅黑';
              }
            }

        }
      }
    }
    p{
      font: 14px/86px '微软雅黑';
    }
  }
}
</style>
