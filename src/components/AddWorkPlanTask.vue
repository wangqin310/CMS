<template>
    <div id="add_work_plan">
      <el-dialog :title="getWorkPlanTaskParams.fromPage=='workPlan'?'新增日程':'添加任务'" :visible.sync="$store.state.mutations.showAddModal" width="600px" @close="close">
        <el-form :model="taskParams" ref="taskForm" :rules="formRule" >
          <el-form-item label="任务类型" :label-width="formLabelWidth" prop="taskType">
            <el-select @change="resetGroup" size="small" v-model="taskParams.taskType">
              <el-option v-for="item in taskType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="getWorkPlanTaskParams.fromPage!='workPlan'&&taskParams.taskType=='3'"
                        label="任务执行组"
                        size="small"
                        :label-width="formLabelWidth"
                        :prop="taskParams.zstaffName==''?'zstaffIdGroupVal':''">
            <el-select  v-model="taskParams.zstaffIdGroupVal">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(item,index) in groupList" :label="item.groupName" :key="index" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="getWorkPlanTaskParams.fromPage!='workPlan' && taskParams.zstaffIdGroupVal==''" class="task_executor" label="任务执行人" :label-width="formLabelWidth" prop="zstaffName">
            <el-input size="small" v-model="taskParams.zstaffName" autocomplete="off" :disabled="true"></el-input>
            <span class="choose_executor" @click="chooseExecutor">选择执行人</span>
          </el-form-item>

          <el-form-item v-if="taskParams.taskType==1||taskParams.taskType==2" class="visit_channel" label="拜访渠道" :label-width="formLabelWidth" prop="channel">
            <el-input size="small" v-model="taskParams.channel" autocomplete="off" :disabled="true"></el-input>
            <span class="choose_channel" @click="chooseChannel">选择渠道</span>
          </el-form-item>

          <el-form-item v-if="getWorkPlanTaskParams.fromPage!='workPlan'&&(taskParams.taskType =='1'||taskParams.taskType =='2')" label="是否照片" :label-width="formLabelWidth" prop="isPhoto">
            <el-select size="small" v-model="taskParams.isPhoto">
              <el-option v-for="item in isPhoto" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="任务描述" :label-width="formLabelWidth" prop="taskDesc">
            <el-input size="small" type="textarea" v-model="taskParams.taskDesc"></el-input>
          </el-form-item>

          <el-form-item label="拜访频率" :label-width="formLabelWidth">
            <el-radio-group v-model="taskParams.taskFrequency">
              <el-radio v-for="(item,index) in radioArr" :key="index" :label="item.label">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="save('taskForm')">保 存</el-button>
        </div>
      </el-dialog>
      <!--选择渠道-->
      <component :is="showChooseChannelModal" :showChannel="showChannel"></component>
      <!--选择执行人-->
      <component :is="showChooseExecutorModal" :showExecutor="showExecutor"></component>,
    </div>
</template>

<script type="text/ecmascript-6">
    import ChooseChannelModal from './ChooseChannelModal.vue'
    import ChooseExectorlModal from './ChooseExecutor.vue'
    export default {
        props:['tableDataName'],
        name: '',
        data() {
            return {
              formLabelWidth: '120px',       //弹框中form表单里各项的宽度
              taskType:[                     //任务类型
                {value:'',label:'--请选择--'},
                {value:1,label:'渠道拜访'},
                {value:2,label:'例会/培训'},
                {value:3,label:'临时任务'}
              ],
              radioArr:[                     //拜访频率
                {label:0,text:'无'},
                {label:1,text:'周'},
                {label:2,text:'月'}
              ],
              isPhoto:[
                {value:0,label:'否'},
                {value:1,label:'是'},
              ],
              showChooseChannelModal:'',     //展示选择渠道弹框
              showChooseExecutorModal:'',    //展示选择执行人弹框
              showChannel:false,             //是否展示选择渠道弹框
              showExecutor:false,            //是否展示选择执行人弹框
              formRule:{                     //表单的验证规则
                taskType: [
                  { required: true, message: '请选择任务类型', trigger: 'blur' }
                ],
                channel: [
                  { required: true, message: '请选择拜访渠道', trigger: 'blur' }
                ],
                taskDesc: [
                  { required: true, message: '请输入任务描述', trigger: 'blur' }
                ],
                zstaffName:[
                  { required: true, message: '请选择任务执行人', trigger: 'blur' }
                ],
                zstaffIdGroupVal:[
                  { required: true, message: '请选择任务执行组', trigger: 'blur' }
                ],
                isPhoto :[
                  { required: true, message: '请选择是否照片', trigger: 'blur' }
                ],
              },
              groupList:[],
            }
        },
        computed:{
          getWorkPlanTaskParams(){
            return this.$store.state.mutations.workPlanTaskParams;
          },
          taskParams(){
            return this.$store.getters.taskParams;
          }
        },
        components:{
          ChooseChannelModal,
          ChooseExectorlModal,
        },
        methods:{
          resetGroup(){
            this.taskParams.zstaffIdGroupVal = '';
          },
          /**
           * 取消：
           */
          cancel(){
            this.$store.state.mutations.showAddModal = false;
            this.$parent.addWorkPlanModal='';
          },
          /**
           * 新增日程保存接口调用：
           */
          saveNewSchedule(){
            var params={};
            params=this.taskParams;
            params.flow=false;
            params.isYourSelf = 1;
            this.$axios.post("/api/CMM/page/taskDistribution/taskDistribution_saveOrUpdateTask",
              this.$qs.stringify(params))
              .then(res =>{
                this.$store.state.mutations.showAddModal = false;
                this.$parent.addWorkPlanModal='';
                this.$emit("getWorkPlanListData");
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 查询任务执行组
           */
          getGroupList(){
          var params={
            limit:0
          }
          this.$axios('/api/CMM/taskDistribution/staffgroup_getStaffgroupList',
             {
               params
             }
           )
           .then(res=>{
             if(res.data.data){
               for(var item of res.data.data.rows){
                 this.groupList.push({
                   groupName:item.groupName,groupId:item.groupId
                 });
               }
             }
           })
        },
        /**
         * 保存我的工作安排任务
         */
        taskSave(){
          var params={};
          params=this.taskParams;
          params.flow=true;
          params.isYourSelf = 0;
          this.$axios('/api/CMM/page/taskDistribution/taskDistribution_saveOrUpdateTask',
             {
               params
             }
           )
           .then(res=>{
              this.$store.state.mutations.showAddModal = false;
              this.$parent.addWorkPlanModal='';
              this.$store.state.mutations.showCheckDialog=false;
              var msg = '保存成功！'
              if(params.forwardTaskId!=''){
                msg = '转发成功！'
              }
               this.$message({
                 message: msg,
                 type: 'success'
               });
              this.$store.dispatch("getAjaxTableData",{tableDataName:'myWorkTableData',vm:this});
           })
          //  .catch(error=>{
          //    this.$confirm('审批失败', '失败提示', {
          //       confirmButtonText: '确定',
          //       showCancelButton:false,
          //       type: 'error'
          //     })
          //   })
        },
          /**
           * 保存：
           */
          save(taskForm){
            this.$refs[taskForm].validate((valid) => {
              if (valid) {
                switch(this.getWorkPlanTaskParams.fromPage){
                  case 'workPlan':
                    this.saveNewSchedule();
                    break;
                  case 'myWork':
                    this.taskSave();
                    break;
                }
              } else {
                return false;
              }
            });
          },
          /**
           * 关闭：
           */
          close(){
            this.$parent.addWorkPlanModal='';
          },
          /**
           * 选择执行人：
           */
          chooseExecutor(){
              this.showChooseExecutorModal='ChooseExectorlModal';
              this.showExecutor=true;
          },
          /**
           * 选择渠道：
           */
          chooseChannel(){
            if(this.getWorkPlanTaskParams.fromPage!=='workPlan'){
              if(this.$store.getters.taskParams.zstaffId==undefined){
                this.$confirm('请选择执行人', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton:false,
                  type: 'warning'
                })
              }else{
                this.$store.state.mutations.chooseChannel.params.empId=this.$store.getters.taskParams.zstaffId;
                this.showChooseChannelModal='ChooseChannelModal';
                this.showChannel=true;
                this.$store.dispatch("chooseChannel",this)
              }
            }else{
              this.showChooseChannelModal='ChooseChannelModal';
              this.showChannel=true;
              this.$store.dispatch("chooseChannel",this)
            }
          },
        },
        mounted(){
          this.getGroupList();
        }
    }
</script>

<style lang="less">
  @import "../assets/less/reset";
  @import "../assets/less/common";
  #add_work_plan{
    .el-dialog{
      .b(@boxBg);
      border-radius:10px;
      border:1px solid @border;
      box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);

      .el-dialog__header{
        border-bottom:1px solid #34374D;
        .el-dialog__title{
          color: #fff;
        }
      }
      .el-dialog__body{
        .el-form{
          .p-r(20px);
          .visit_channel,.task_executor{
            .el-form-item__content{
              position:relative;
              .el-input{
                  background: #43475B;
                .el-input--small.el-input__inner{
                  .w(70%);
                }
              }
              // ----------
              .el-input input,select{
                width: 171px;
                height: 28px;
                border: 1px solid #7ba3ff!important;
              }
              // ------
              .choose_channel,.choose_executor{
                top:0;
                right:0;
                .w(88px);
                .h(32px);
                .l-h(32px);
                .b-r(3px);
                .b(@green);
                .t-a(center);
                color:@white;
                cursor:pointer;
                .d-i(inline-block);
                position:absolute;
              }

            }
          }
          .el-form-item__content{
            .el-input{
                  background: #43475B;
                  .el-input__inner{
                  background: #43475B;
                }
              }
              .el-textarea__inner{
                color: #fff;
                background: #43475B;
                border: 1px solid #6387FE;
                box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
               }
               .el-radio-group{
                 .el-radio__input{
                    background: #43475B;
                 }
                 .el-radio__label{
                    color: #fff;
                 }
               }

          }
          .el-form-item__label{
                color: #fff;
              }
        }

      }
    }
  }
</style>
