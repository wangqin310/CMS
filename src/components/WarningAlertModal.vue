<template>
    <div id="warning_alert_modal">
      <el-dialog title="舆情预警" width="600px" :visible.sync="$store.state.mutations.warningParams.showWarningAlertModal">
        <el-form :model="formData"  ref="warningForm" :rules="warningFormRule">
          <el-form-item label="舆情标题" :label-width="formLabelWidth" prop="commentTitle">
            <el-input v-model="formData.commentTitle" autocomplete="off" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="业务条线" :label-width="formLabelWidth">
            <el-select :disabled="isDisabled" v-model="formData.channelType">
              <el-option :label="item.label" :value="item.val" v-for="(item,index) in businessLineSelect" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上报人员" :label-width="formLabelWidth" prop="dstaffId">
            <el-select v-model="formData.dstaffId">
              <el-option :label="item.userName" :value="item.empId" v-for="(item,index) in reportPersonSelect" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="舆情信息" :label-width="formLabelWidth" prop="commentMess">
            <el-input type="textarea" :rows="2" placeholder="请输入舆情信息" v-model="formData.commentMess">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createWarning" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        data() {
            return {
              formData:{
                commentTitle:'',
                commentMess:'',
                channelType:'M',
                dstaffId:'',
                id:'',
                publicId:''
              },
              businessLineSelect:[
                {label:'场景',val:'M'},
                {label:'渠道',val:'A'}
              ],
              reportPersonSelect:[
                {label:'李欣',val:0}
              ],
              formLabelWidth: '120px',       //弹框中form表单里各项的宽度
              isDisabled: false,
              warningFormRule:{                     //表单的验证规则
                commentTitle: [
                  { required: true, message: '舆情标题不能为空！', trigger: 'blur' }
                ],
                commentMess: [
                  { required: true, message: '舆情信息不能为空！', trigger: 'blur' }
                ],
                dstaffId: [
                  { required: true, message: '请选择上报人员！', trigger: 'blur' }
                ]
              }
            }
        },
        methods:{
          /**
           * 创建舆情：
           */
          createWarning(){
            this.$refs['warningForm'].validate((valid) => {
              if(valid){
                this.$axios.post("/api/CMM/earlyWarn_saveOrUpdateEarlyWarn",
                  this.$qs.stringify(
                    this.formData
                  ))
                    .then(res =>{
                      //关闭组件
                      this.$store.state.mutations.warningParams.showWarningAlertModal = false;
                      //给出提示
                      this.$message({
                        message: '添加成功！',
                        type: 'success'
                      });
                      //页面归一
                      this.$store.state.mutations.tableLimit.params.start=0;
                      this.$store.state.mutations.commonParams['warningTableData'].current = 1;
                      //刷新页面
                      this.$store.dispatch("getAjaxTableData",{tableDataName:'warningTableData',vm:this});
                    })
                    .catch(error=>{
                        console.log(error);
                      }
                    );
              }
            })
          },
          loadReportPerson(){
            this.$axios.get("/api/CMM/login_getCurrentUperUserAll",
              {
                params:{}
              }
            )
              .then(res =>{
                this.reportPersonSelect = res.data.data;
              })
              .catch(error=>{
                  console.log(error);
                }
              );
            var assId = this.$root.loginUserInfo.assId;
            if(assId == 'A' || assId == 'M'){
              this.formData.channelType = assId;
              this.isDisabled = true;
            }
          }
        },
        mounted(){
          this.loadReportPerson();
        }
    }
</script>

<style lang="less">
  @import "../assets/less/reset";
  #warning_alert_modal{
    .el-dialog{
      border-radius:10px;
      border:1px solid @border;
      box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
      .b(@boxBg);
      input,select{
        background: none;
      }
      .el-input input{
        width: 100%;
      }
      .el-select{
        width: 100%;
      }
      .el-textarea__inner{
        color: #fff;        
      }
      .el-dialog__title{
        color: #fff;
      }
    }
  }
</style>
