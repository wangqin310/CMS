<template>
    <div id="parameterSet">

      <div class="box box1">
          <span> 日常任务生成频次</span>
          <el-row>
            <el-col :span="3">
              <div class="content">
                次数
              </div>
            </el-col>
            <el-col :span="17">
              <el-slider v-model="taskfrequency" :max="30"></el-slider>
            </el-col>
            <el-col :span="4">
              <div class="value">
                {{taskfrequency}}
              </div>
            </el-col>
          </el-row>
      </div>

      <div class="box box2">
          <span> 日常任务和报告所占分数</span>
          <el-row>
            <el-col :span="3">
              <div class="content">
                任务
              </div>
            </el-col>
            <el-col :span="17">
              <el-slider v-model="taskFraction" :max="100"></el-slider>
            </el-col>
            <el-col :span="4">
              <div class="value">
                {{taskFraction}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="content">
                报告
              </div>
            </el-col>
            <el-col :span="17">
              <el-slider v-model="reportFraction" :max="100-taskFraction"></el-slider>
            </el-col>
            <el-col :span="4">
              <div class="value">
                {{reportFraction}}
              </div>
            </el-col>
          </el-row>
      </div>

      <div class="box box3">
          <span>等级对应分数区间</span>
          <el-row>
            <el-col :span="3">
              <div class="content">
                A级
              </div>
            </el-col>
            <el-col :span="17">
              <el-slider v-model="aFraction"  range :min="bFraction[1]+1" :max="100"></el-slider>
            </el-col>
            <el-col :span="4">
              <div class="value">
                {{aFraction[0]}}~{{aFraction[1]}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="content">
                B级
              </div>
            </el-col>
            <el-col :span="17">
              <el-slider v-model="bFraction"  range :min="cFraction[1]+1" :max="aFraction[0]-1"></el-slider>
            </el-col>
            <el-col :span="4">
              <div class="value">
                {{bFraction[0]}}~{{bFraction[1]}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="content">
                C级
              </div>
            </el-col>
            <el-col :span="17">
              <el-slider v-model="cFraction"  range :min="dFraction[1]+1" :max="bFraction[0]-1"></el-slider>
            </el-col>
            <el-col :span="4">
              <div class="value">
                {{cFraction[0]}}~{{cFraction[1]}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="content">
                D级
              </div>
            </el-col>
            <el-col :span="17">
              <el-slider v-model="dFraction"  range show-stops :min="0" :max="cFraction[0]-1"></el-slider>
            </el-col>
            <el-col :span="4">
              <div class="value">
                {{dFraction[0]}}~{{dFraction[1]}}
              </div>
            </el-col>
          </el-row>
      </div>
      <div class="foolt">
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "ParameterSet",
      data() {
        return {
          taskfrequency: 0,//任务次数
          taskFraction: 0,//任务分数
          reportFraction: 0,//报告分数
          aFraction: [80, 120],//A级分数区间
          bFraction: [50, 79],//B级分数区间
          cFraction: [20, 49],//C级分数区间
          dFraction: [0, 19],//D级分数区间
        }
      },
      methods:{
        getParaList(){
          this.$axios.get("/api/CMM/taskDistribution_getParameterList",
            {
              params:{}
            }
          )
            .then(res =>{
              var strs = [];
              res.data.data.map((item)=>{
                switch (item.paraVal) {
                  case '2':
                    this.taskfrequency = parseInt(item.remark);
                    break;
                  case '3':
                    this.taskFraction = parseInt(item.remark);
                    break;
                  case '4':
                    this.reportFraction = parseInt(item.remark);
                    break;
                  case '5':
                    strs = item.remark.split(',');
                    this.aFraction[0] = parseInt(strs[0]);
                    this.aFraction[1] = parseInt(strs[1]);
                    break;
                  case '6':
                    strs = item.remark.split(',');
                    this.bFraction[0] = parseInt(strs[0]);
                    this.bFraction[1] = parseInt(strs[1]);
                    break;
                  case '7':
                    strs = item.remark.split(',');
                    this.cFraction[0] = parseInt(strs[0]);
                    this.cFraction[1] = parseInt(strs[1]);
                    break;
                  case '8':
                    strs = item.remark.split(',');
                    this.dFraction[0] = parseInt(strs[0]);
                    this.dFraction[1] = parseInt(strs[1]);
                    break;
                }
              })
            })
            .catch(error=>{
                console.log(error);
              }
            );
        },
        save(){
          this.$axios.post("/api/CMM/taskDistribution_alterEveryTaskTime",
            this.$qs.stringify(
              {
                taskfrequency: this.taskfrequency,
                taskFraction: this.taskFraction,
                reportFraction: this.reportFraction,
                aFraction: this.aFraction[0] + ',' + this.aFraction[1],
                bFraction: this.bFraction[0] + ',' + this.bFraction[1],
                cFraction: this.cFraction[0] + ',' + this.cFraction[1],
                dFraction: this.dFraction[0] + ',' + this.dFraction[1]
              }
            ))
            .then(res =>{
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
            })
            .catch(error=>{
                console.log(error);
              }
            );
        }
      },
      mounted(){
        this.getParaList();
      }
    }
</script>

<style lang='less'>
  #parameterSet{
    .box{
      width: 50%;
      // background:#43475b;
      padding: 20px 50px;
      border: 1px solid #7ba3ff;
      box-shadow: 0 0 10px #7bb0ff;
      border-radius: 8px;
      position: relative;
      margin: 50px auto;
      span{
        position: absolute;
        top: -20px;
        left: 18px;
        font-size: 22px;
        display: inline-block;
        background: #2f3445;
      }
    }
    .foolt{
      text-align:center;
      margin-bottom: 20px;
    }
    .content{
      padding-top: 7px;
    }
    .value{
      padding-top: 7px;
      float: right;
    }
  }
</style>
