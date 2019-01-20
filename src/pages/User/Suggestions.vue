<template>
    <div id="suggestion">
      <div class="container">

        <div class="tittle">
          <h5>意见反馈</h5>
          <img :src="feedbackUrl" alt=""><br>
        </div>

        <div class="cont">
          <div>
            <el-select v-model="feedback" class="status">
              <el-option
                v-for="feedback in feedbackList" :label="feedback.label" :key="feedback.value" :value="feedback.value">
              </el-option>
            </el-select>
          </div>
          
          <textarea name="" id="advise" placeholder="请在此写下您的宝贵意见" maxlength="200" @input="descInput" v-model.trim="desc"></textarea><br>
          <span class="textNum">{{remnant}}/200</span><br>
          <div class="btn">
            <el-button type="primary" class="submit" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
      <!-- textera内容为空时的弹出框 -->
      <el-dialog title="系统消息" :visible.sync="dialogTableVisible">
        <p>提交不能为空</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'suggestion',
        data() {
            return {
              feedbackUrl:require('@/assets/images/systemNews_feedback.png'),
              feedbackList:[
                {value:'我的渠道',label:'我的渠道'},
                {value:'我的工作',label:'我的工作'},
                {value:'我的排名',label:'我的排名'},
                {value:'我的报告',label:'我的报告'},
                {value:'舆情预警',label:'舆情预警'},
                {value:'渠道审批',label:'渠道审批'},
                {value:'渠道分配',label:'渠道分配'},
                {value:'区域分配',label:'区域分配'},
                {value:'用户新增',label:'用户新增'},
                {value:'工作计划',label:'工作计划'},
                {value:'用户修改',label:'用户修改'},
              ],
              feedback:'我的渠道',
              desc:'',
              remnant: 200,
              val:'添加反馈成功',
              dialogTableVisible:false
            }
        },
        methods:{
          //控制textera文本框汉字的个数
            descInput(){
              var txtVal = this.desc.length;
              this.remnant = 200 - txtVal;
            },
            //提交
            submit(){
              if(this.desc==''){
                this.dialogTableVisible=true;
                return;
              }
              this.$axios.get("/api/CMM/page/login/login_saveUserOpinionAction",{
              params:{
                opinionModule:this.feedback,
                opinionMessage:this.desc
              }
            })
              .then(res =>{
                this.success();
                
              })
              .catch(error=>{
                console.log(error);
              })
            },
            //提交成功的弹出框
            success(){
              this.$message({
              message: this.val,
              type: 'success'});
              this.desc='';
              }
          }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
#suggestion{
  // padding-left: 42px;
  padding: 0 10%;
  .top{
    font: 13px/69px '微软雅黑';
    margin-bottom: 47px;
    span{
      color: #479df1;
    }
  }
  .container{
    .tittle{
      text-align:center ;
      h5{
        font: 34px/62px '微软雅黑';
      }
      img{
        margin-bottom: 53px;
      }
    }
    .cont{
      // width: 790px;
      margin: 0 auto;
       .el-input__inner{
        // width: 120px;
        // height: 30px;
        background: #2f3445;
        color: #fff;
        border: 1px solid #7bb0ff;
        border-radius: 3px;
        box-shadow: 0 0 10px #7bb0ff;
       }
      textarea{
        // margin: 21px 0 15px  0;
        margin: 21px auto;
        resize: none;
        width: 100%;
        height: 340px;
        border: 1px solid #d2d2d2;
        border-radius: 7px;
        text-indent: 26px;
        color: #898989;
        font: 14px/60px '微软雅黑';
        outline: none;
      }
      .textNum{
          float: right;
          color: #ababab;
      }
      .btn{
        text-align: center;
        .submit{
          width: 98px;
        }

      }
    }

  }
  .el-dialog{
        .b(@boxBg);
        // border-radius:10px;
        border:1px solid @border;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
        .el-dialog__header{
            .b(@boxBg);
            border-bottom:1px solid #34374D;
            .el-dialog__title{
              font-weight: bolder;
              color: #fff;
            }
        }
        .el-dialog__footer{
            .b(@boxBg);
            border-top:1px solid #34374D;

        }
        .el-dialog__body{
            .b(@boxBg);
            color: #fff;
        }
    }
}
</style>
