<template>
    <div id="mywork">
      <div class="search">
        <span class="text">任务类型:</span>
        <el-select name="" v-model="myWorkParams.searchParams.taskTypeParam">
          <el-option value="" label="请选择"></el-option>
          <el-option value="1" label="渠道拜访"></el-option>
          <el-option value="2" label="例会/培训"></el-option>
          <el-option value="3" label="临时任务"></el-option>
        </el-select>
        <span class="text">任务状态:</span>
        <el-select name="" v-model="myWorkParams.searchParams.taskStatusParam">
          <el-option value="" label="请选择"></el-option>
          <el-option value="0" label="已完成"></el-option>
          <el-option value="1" label="未完成"></el-option>
          <el-option value="2" label="进行中"></el-option>
          <el-option value="x[0]" label="待审批"></el-option>
          <el-option value="x[-1]" label="审批不通过"></el-option>
        </el-select>
        <span class="text">执行人:</span>
        <el-select name="" v-model="myWorkParams.searchParams.staffIdParam">
          <el-option value="" label="请选择"></el-option>
          <el-option value="0" label="本人"></el-option>
          <el-option value="1" label="其他"></el-option>
        </el-select>
        <span class="text">任务描述:</span>
        <input type="text" placeholder="请输入任务描述" v-model="myWorkParams.searchParams.taskTitle">
        <button class="inquire" @click="search">查询</button>
        <button class="Reset" @click="reset">重置</button>
        <button class="task" v-if="(positionId !== '0')&&(positionId !== '1')" @click="addTask('','')">安排任务</button>
      </div>
      <div class="table_wrapper">
        <el-table :data="resTableData" size="small" >
          <el-table-column v-for="(item,index) in tableColumn" :formatter="item.header" :key="index" :prop="item.propName" :label="item.labelName" :sortable="item.isSortable" :width="item.width"></el-table-column>
          <el-table-column label="操作" width="80px" prop="oprButton" >
              <template slot-scope="scope" >
              <el-button round type="warning" size="mini" v-if="scope.row.oprButton=='0'" @click="check(scope.row.taskId,scope.row.taskType,scope.row.oprButton,scope.row.status,scope.row.xstaffId,scope.row.zstaffId)">查看</el-button>
              <el-button round type="warning" size="mini" v-if="scope.row.oprButton=='1'" @click="check(scope.row.taskId,scope.row.taskType,scope.row.oprButton,scope.row.status,scope.row.xstaffId,scope.row.zstaffId)">执行</el-button>
              <el-button round type="warning" size="mini" v-if="scope.row.oprButton=='2'" @click="check(scope.row.taskId,scope.row.taskType,scope.row.oprButton,scope.row.status,scope.row.xstaffId,scope.row.zstaffId)">审批</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="page_wrapper">
        <pagination :tableDataName="tableDataName"></pagination>
      </div>
      <component :is="addWorkPlanModal"></component>
      <!--查看-->
      <el-dialog title="任务完成情况" :visible.sync="showCheckDialog" @close="close">
          <!--多张图片问题-->
          <el-form label-width="80px">
            <el-dialog
              width="40%"
              title="展示图片"
              :visible.sync="checkPhoto"
              append-to-body>
                <img v-if="photoArray.length==0" style="width:100%" :src="'/api/'+checkContent.taskAttach"  alt="图片" />
                <el-carousel  v-if="photoArray.length!==0" :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in photoArray" :key="item">
                    <img style="width:100%" :src="'/api/'+item"  alt="图片" />
                  </el-carousel-item>
                </el-carousel>
              </el-dialog>
            <el-form-item label="任务描述" size="small" >
              <el-input autocomplete="off"  v-model="checkContent.taskDesc" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="签到地址" size="small" v-if="buttonType !=='1'&&checkContent.taskType=='1'">
              <el-input autocomplete="off" v-model="checkContent.channelAdd" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="签退地址" size="small" v-if="buttonType !=='1'&&checkContent.taskType=='1'">
              <el-input autocomplete="off" v-model="checkContent.channelAdd" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item  v-if="buttonType !=='1'" :label="checkContent.taskType=='1'?'拜访照片':'例会/培训照片'" label-width="110px">
              <span v-if="checkContent.taskAttach =='' " style="color:white">无照片</span>
              <el-button type="text" v-if="checkContent.taskAttach !== ''" @click="checkPhoto = true">查看照片</el-button>
            </el-form-item>
            <el-form-item label="参会人" size="small" v-if="buttonType !=='1'&&checkContent.taskType=='2'">
              <el-input autocomplete="off" v-model="checkContent.mstaff" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="总结">
              <el-input autocomplete="off" type="textarea" :autosize="{ minRows: 2}" v-model="checkContent.taskSummary" :disabled="true"  v-if="buttonType !=='1'"></el-input>
              <el-input autocomplete="off" type="textarea" :autosize="{ minRows: 2}" v-model="executeParams.taskSummary" v-if="buttonType=='1'"></el-input>
            </el-form-item>
            <!---->
            <el-form-item label="审批" v-if="buttonType=='2'">
              <el-radio-group v-model="approveParams.flowStatus" @change="radioChange">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="-1">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--status不同接口返回值不一样??????????-->
            <el-form-item label="审批意见" v-if="buttonType !=='1'&&status=='x[-1]'">
              <el-input autocomplete="off" type="textarea" :autosize="{ minRows: 2}"  v-model="checkContent.rejectReason" :disabled="true"></el-input>
            </el-form-item>
            <!--审批时当点击不通过时需要输入审批意见-->
            <el-form-item label="审批意见" v-if="buttonType !=='1'&&approveParams.flowStatus=='-1'">
              <el-input autocomplete="off" type="textarea" :autosize="{ minRows: 2}"  v-model="approveParams.rejectReason"></el-input>
              <span v-if="isNull" style="color: red">审批意见不能为空</span>
            </el-form-item>
          </el-form>
          <!---->
          <div slot="footer" class="dialog-footer" v-if="buttonType!=='0'||(buttonType=='0'&&relayButton==true)">
            <el-button type="primary" size="mini" v-if="relayButton==true" @click="relay(checkContent.taskId,checkContent.taskDesc)">转发</el-button>
            <el-button type="primary" size="mini" v-if="executeButton==true" @click="execute">执行</el-button>
            <el-button type="primary" size="mini" v-if="buttonType=='2'" @click="approve(approveParams.flowStatus)">审批</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from './../../components/Pagination.vue'
    import AddWorkPlanModal from './../../components/AddWorkPlanTask.vue'
    let codeList={
        "taskType":{
          "1":"渠道拜访",
          "2":"例会/培训",
          "3":"临时任务",
        },
        "status":{
          "0":"已完成",
          "1":"未完成",
          "2":"进行中",
          "3":"已过期",
          "x[0]":"待审批",
          "x[-1]":"审批不通过",
        }
      };
    export default {
      //表格转译
        name: "mywork",
        data() {
          return {
            tableColumn:[
                  {propName:'xstaffName',labelName:'下发人',isSortable:true,width:100},
                  {propName:'taskType',labelName:'任务类型',isSortable:true,width:100, header: (row, column, cellValue, index) =>{
                    return codeList['taskType'][row.taskType]
                  } },
                  {propName:'taskDesc',labelName:'任务描述',isSortable:true},
                  {propName:'createTime',labelName:'创建时间',isSortable:true,width:140},
                  {propName:'zstaffName',labelName:'执行人',isSortable:true,width:80},
                  {propName:'channelName',labelName:'拜访渠道',isSortable:true,width:140},
                  {propName:'isPhoto',labelName:'是否拍照',isSortable:true,width:100},
                  {propName:'status',labelName:'状态',isSortable:true,width:80,header:(row, column, cellValue, index) => {
                    return codeList['status'][row.status];
                  }}
                ],


            //操作按钮（查看：0；执行：1；审批：2；）
            oprButton:'',
            //查询参数

            oprButtonList:[],
            //查看对话框
            // checkModal:false,
            showCheckDialog:false,
            //查看照片
            checkPhoto:false,
            positionId:'',
            checkContent:{},
            //操作按钮类型
            buttonType:'',
            //审批参数
            approveParams:{
              taskId:'',
              rejectReason:'',
              flowStatus:'',
              status:'x[0]',
            },
            executeParams:{
              taskId:'',
              taskSummary:'',
              xstaffIdV:'',
              status:'0',
            },
            status:'',
            executeButton:false,
            relayButton:false,
            //安排任务对话框
            taskParams:{
              taskType:'',
              channel:'',
              channelId:'',
              isPhoto:'',
              flow:true,
              taskDesc:'',
              taskFrequency:'',
              forwardTaskId:'',
              forwardTaskSummary:'',
              zstaffName:'',
              zstaffId:'',
              zstaffIdGroupVal:'',
            },
            UnderlingUser:[],
            addChannelList:[],
            addUnderlingUser:false,
            currentRow:null,
            choosePerson:null,
            choosePerson1:null,
            groupList:[],
            channelList:[],
            addChannel:false,
            chooseChannelArray:[],
            removeChannelList:[],
            WorkTableData:[],
            tableDataName:'myWorkTableData',    //接口返回的数据名称
            addWorkPlanModal:'',
            photoArray:[],
            isNull: false,
          }
      },
      components:{Pagination,AddWorkPlanModal},
      computed:{
        resTableData(){
            this.positionId=this.$root.loginUserInfo.positionId;
            this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
              var status = item.status;
              var doFlow = item.doFlow;
              var taskType = item.taskType;
              var zstaffId = item.zstaffId;
              var xstaffId = item.xstaffId;
              var currentEmpId = this.$root.loginUserInfo.empId;
              //操作按钮的显示
              var doFolw2 = ('x[0]' == status && '1' == doFlow) ? '1' : '0';
              if (taskType == "3" && status == "1" && zstaffId == currentEmpId) {

                //显示执行按钮;
                this.oprButton='1';

              } else if (taskType == "3" && status == "1" && xstaffId == zstaffId) {
                if(doFolw2 == '0'){

                  //显示执行按钮;
                  this.oprButton='1';

                }
              } else {
                if(doFolw2 == '1'){

                  //显示审批按钮;
                  this.oprButton='2';

                }else{

                  //显示查看按钮;
                  this.oprButton='0';

                }
              }
              item.oprButton=this.oprButton;
            });
            return this.$store.getters.resTableData[this.tableDataName];
          },
          myWorkParams(){
            return this.$store.state.mutations.commonParams.myWorkTableData;
          }

      },
      methods:{
        search() {
            this.$store.state.mutations.commonParams[this.tableDataName].current=1;
            this.$store.state.mutations.tableLimit.params.start=0;
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
        },
        //重置
        reset(){
            this.$store.state.mutations.commonParams[this.tableDataName].current=1;
            this.myWorkParams.searchParams.taskTitle='';
            this.myWorkParams.searchParams.taskTypeParam='';
            this.myWorkParams.searchParams.taskStatusParam='';
            this.myWorkParams.searchParams.staffIdParam='';
            this.$store.state.mutations.tableLimit.params.start=0;
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
          },
        //点击查看按钮，参数（任务编号，任务类型），存下按钮类型
        check(taskId,taskType,buttonType,status,xstaffId,zstaffId){
          this.showCheckDialog=true;
          var params={
            taskId: taskId,
            taskType: taskType,
          }
          this.$axios('/api/CMM/pages/taskDistribution/taskDistribution_getTaskexeListForMore',
             {
               params
             }
           )
           .then(res=>{
             this.checkContent=res.data.data[0];
             //如果有多张照片
             var str = this.checkContent.taskAttach.toString();
              if(str!==''&&str.indexOf(",")!==-1){
                this.photoArray=str.split(",");
              }
             //存下按钮类型
             this.buttonType=buttonType;
             //存下状态
             this.status=status;
             //存下下发人工号，执行时
             this.executeParams.xstaffIdV=xstaffId;

             //查看和执行是否显示转发按钮
             this.relayButton=false;//重置转发按钮的显示状态
             this.executeButton=false;//重置执行按钮的显示状态
             var loginEmpId = this.$root.loginUserInfo.empId;
             var positionId = this.positionId;
             if((status == 1 && taskType == 3 && xstaffId ==zstaffId) || (status == 1 && taskType == 3) ){
                //显示执行按钮;
                this.executeButton=true;
                if(positionId != '0' && status == "1"){
                  //显示转发按钮
                  this.relayButton=true;
                  if(loginEmpId == xstaffId){
                    //隐藏执行按钮;
                    this.executeButton=false;
                  }
                }
              }
           })
        },
        //radio change
        radioChange(val){
          this.isNull = false;
        },
        /**
         * 关闭查看弹窗
         */
        close(){
            this.showCheckDialog=false;
          },
        //审批
        approve(flowStatus){
          var url='';
          //不通过
          this.approveParams.taskId=this.checkContent.taskId;
          if(flowStatus=='-1'){
            url='/api/CMM/pages/taskDistribution/taskDistribution_rejectTask';
          }else if(flowStatus=='1'){//通过
            url='/api/CMM/pages/taskDistribution/taskDistribution_saveOrUpdateTask';
            this.approveParams.rejectReason='';
          }
          var params=this.approveParams;
          if(flowStatus=='-1' && this.approveParams.rejectReason==''){
            this.isNull = true;
            return;
          }
          this.$axios(url,
             {
               params
             }
           )
           .then(res=>{
             //关闭弹出框
             this.showCheckDialog=false;
             //给出提示
             this.$message({
               message: '操作成功！',
               type: 'success'
             });
             //刷新表格
             this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
           })
        },
        //执行
        execute(){
          this.executeParams.taskId=this.checkContent.taskId;
          var params=this.executeParams;
          this.$axios('/api/CMM/pages/taskDistribution/taskDistribution_saveOrUpdateTask',
             {
               params
             }
           )
           .then(res=>{
             //关闭弹出框
             this.showCheckDialog=false;
             //给出提示
             this.$message({
               message: '操作成功！',
               type: 'success'
             });
             //刷新表格
             this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
           })
        },
        //转发
        relay(taskId,taskDesc){
          this.addTask(taskId,taskDesc);
        },

        //点击安排任务按钮
        addTask(taskId,taskDesc){

          this.addWorkPlanModal='AddWorkPlanModal';
          this.$store.state.mutations.showAddModal=true;

          this.$store.state.mutations.taskParams.taskType=null;
          this.$store.state.mutations.taskParams.channel='';
          this.$store.state.mutations.taskParams.taskDesc='';
          this.$store.state.mutations.taskParams.taskFrequency=0;
          this.$store.state.mutations.taskParams.isPhoto=0;
          this.$store.state.mutations.taskParams.zstaffName='';
          //清空转发参数
          this.$store.state.mutations.taskParams.forwardTaskId = '';
          this.$store.state.mutations.taskParams.forwardTaskSummary='';
          if(taskId!=''){
            this.$store.state.mutations.taskParams.forwardTaskId=taskId;
            this.$store.state.mutations.taskParams.forwardTaskSummary=taskDesc;
          }
          this.groupList=[];
          this.getGroupList();
          this.$store.state.mutations.workPlanTaskParams.fromPage='myWork';
        },
        //查询任务执行组
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
             for(var item of res.data.data.rows){
               this.groupList.push(item.groupName,item.groupId);
             }
           })
        },

        taskSave(){
          var params={};
          params=this.taskParams;
          this.$axios('/api/CMM/page/taskDistribution/taskDistribution_saveOrUpdateTask',
             {
               params
             }
           )
           .then(res=>{
            //  this.arrangeTask=false;
           })
        },
      },

      mounted() {
        this.reset();
        /**
           * 请求表格列表数据：
           */
        if(this.$route.params.page=='workPlatform'){
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.taskStatusParam='1';
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.staffIdParam='0';
        }else{
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.taskStatusParam='';
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.staffIdParam='';
        }
        
        if(this.$route.params.id=='渠道拜访'){
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.taskTypeParam='1';
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.taskStatusParam='1';
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.staffIdParam='0';
        }else if(this.$route.params.id=='内部例会'){
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.taskTypeParam='2';
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.taskStatusParam='1';
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.staffIdParam='0';
        }else if(this.$route.params.id=='临时任务'){
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.taskTypeParam='3';
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.taskStatusParam='1';
          this.$store.state.mutations.commonParams.myWorkTableData.searchParams.staffIdParam='0';
        }




          this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      }
    }
</script>

<style lang="less">
  @import "../../assets/less/common";
  #mywork{
    width: 100%;
      // padding-left: 4%;
      // padding-right: 4%;
      // padding-bottom: 2%;
      padding-left: 40px;
    padding-top: 20px;
    padding-right: 48px;
      // font: 16px/32px '微软雅黑';
    .search{
        padding-top: 10px;
        padding-bottom: 15px;
        display: inline-block;
        .text{
          font: 14px/30px '微软雅黑';
        }
        select{
          background: #2f3445;
          color: #fff;
          border: 1px solid #7bb0ff;
          border-radius: 3px;
          box-shadow: 0 0 10px #7bb0ff;
          height: 30px;
          margin: 0 4px;
          width: 100px;
        }
        input{
          width: 120px;
          height: 30px;
          border: 1px solid #7ba3ff;
          border-radius: 3px;
          background: #2f3445;
          color: #d2d2d2;
          box-shadow: 0 0 10px #7bb0ff;
          font: 14px/30px '微软雅黑';
          padding-left: 13px;
        }
        .inquire,.Reset,.task{
          width: 50px;
          height: 30px;
          border: none;
          border-radius: 3px;
        }
        .inquire{
          margin: 0 15px;
          background: #4a88fa;
          color: #ecf1fe;
          font: 14px/30px '微软雅黑';

        }
        .Reset{
          color: #666666;
          font: 14px/30px '微软雅黑';
        }
        .task{
          width: 80px;
          margin-left: 15px;
          font: 14px/30px '微软雅黑';
        }
      }
      // .table {
      //   border: 1px solid #7ba3ff;
      //   border-radius: 3px;
      //   box-shadow: 0 0 10px #7bb0ff;
      //   margin-bottom: 10px;
      //   width: 100%;
      //   .el-table{
      //   text-align: center;
      //   td {
      //     text-align: center;
      //   }
      //   .el-table__header-wrapper {
      //     thead tr th {
      //       text-align: center;
      //       border-bottom: none;
      //     }
      //     .el-table__header{
      //       font: 12px/45px '微软雅黑';
      //       border: 1px solid #7ba3ff;
      //       // border-left: none;
      //     }

      //   }
      //   .el-table__body-wrapper{
      //     td{
      //       border-bottom: 1px solid #7bb0ff;
      //       font: 12px/45px '微软雅黑';
      //     }
      //     .el-button{
      //       background: #4a88fa;
      //       color: #ecf1fe;
      //       font: 12px '微软雅黑';
      //       width: 55px;
      //       height: 28px;
      //       border: none;
      //       border-radius: 10px;
      //     }
      //   }
      // }
      // }
      .page_wrapper{
        margin-top: 10px;
      }
      .modal{
        width:40%;
        .el-dialog{
          background:#43475b;
          color: #fff;
          width: 600px;
          border-radius:10px;
          border:1px solid #7ba3ff;
          .el-dialog__title{
            color: #fff;
          }
          .el-form{
            .el-form-item{
              .el-input{
                background:#43475b;
              }
              .el-textarea__inner{
                box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
                background:#43475b;
                color: #fff;
                border:1px solid #7ba3ff;
              }
              .el-input__inner{
                box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
                background:#43475b;
                color: #fff;
                border:1px solid #7ba3ff;
                width: none;
              }
              .el-form-item__label{
                color: #fff;
              }
            }
          }
        }
      }
      .el-radio__inner{
        box-shadow: 0 0 10px #7bb0ff;
      }
  }

</style>
