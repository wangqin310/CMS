<template>
    <div id="edit_report">
      <el-dialog :title="EditReportModalParams.type=='editReport'?'提交报告':'查看报告'" width="600px" :visible.sync="addReportVisible" @close="close">
        <el-form ref="reportForm" :model="reportFormData" :rules="reportFormRule">
          <el-form-item label="报告标题：" label-width="130px" :prop="EditReportModalParams.type=='editReport'?'reportTitle':''">
            <el-input :disabled="!isAddReport" v-model="reportFormData.reportTitle"></el-input>
          </el-form-item>
          <el-form-item label="报告类型：" label-width="130px">
            <el-select @change="changeReportType" :disabled="!isAddReport" v-model="reportFormData.reportType">
              <el-option v-for="(item,index) in $store.state.mutations.reprotTypeArray" :key="index" :value="item.paraVal" :label="item.valDesc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务线条：" label-width="130px" v-if="EditReportModalParams.type=='showDetail'">
            <el-select :disabled="!isAddReport" v-model="reportFormData.channelType">
              <el-option v-for="(item,index) in assArray" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isOther" label="本周工作总结：" label-width="130px" :prop="EditReportModalParams.type=='editReport'?'finishSumm':''">
            <el-input :disabled="!isAddReport" type="textarea" v-model="reportFormData.finishSumm"></el-input>
          </el-form-item>
          <el-form-item v-if="isOther" label="下周工作计划：" label-width="130px" :prop="EditReportModalParams.type=='editReport'?'planTask':''">
            <el-input :disabled="!isAddReport" v-model="reportFormData.planTask"></el-input>
          </el-form-item>
          <el-form-item v-if="isOther" label="需协调和帮助：" label-width="130px" :prop="EditReportModalParams.type=='editReport'?'isHelp':''">
            <el-input :disabled="!isAddReport" v-model="reportFormData.isHelp"></el-input>
          </el-form-item>
          <el-form-item label="报告内容：" label-width="130px" v-if="EditReportModalParams.type=='editReport'&&isOther">
            <span class="online_edit" @click="onlineEdit">在线编辑</span>
          </el-form-item>
          <el-form-item label="渠道：" prop="channel" label-width="130px" v-if="isChannel">
            <el-select v-model="reportFormData.channel">
              <el-option v-for="(item,index) in channelList" :key="index" :value="item.channelId" :label="item.channelName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道评价：" prop="channelEvaluate" label-width="130px" v-if="isChannel">
            <el-input type="textarea" v-model="reportFormData.channelEvaluate"></el-input>
          </el-form-item>
          <el-form-item label="渠道：" label-width="130px" v-if="isChannelShow">
            <el-input disabled="true" v-model="reportFormData.channelName"></el-input>
          </el-form-item>
          <el-form-item label="渠道评价：" label-width="130px" v-if="isChannelShow">
            <el-input type="textarea" disabled="true" v-model="reportFormData.channelEvaluate"></el-input>
          </el-form-item>
          <el-form-item  v-if="EditReportModalParams.type=='editReport'" label="附件信息：" label-width="120px">
            <el-upload
              ref="upload"
              name="upfile"
              class="upload-demo"
              :auto-upload="true"
              :action="actionUrl"
              :on-preview="handlePreview"
              :on-remove="handleChange"
              :before-remove="beforeRemove"
              :on-success="uploadSuccess"
              :multiple="false"
              :on-change="handleChange"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="报告内容：" label-width="120px" v-if="checkContent()">
            <span class="online_edit" @click="showReportContent">查看</span>
          </el-form-item>
          <el-form-item label="附件信息：" label-width="120px" v-if="haveEnclosure">
            <p class="online_edit" v-for="(item,index) in enclosureList" :key="index" @click="showEnclosure(item)" size="mini">{{item.label}}</p>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left:48%;" v-if="isAddReport" type="primary" size="mini" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="报告图片" width="600px" :visible.sync="reportImgVisible">
        <img :src="imageUrl" style="width:530px"/>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        data() {
            return {
              addReportVisible:true,
              assArray:[{label:'渠道',value:'A'},{label:'场景',value:'M'},{label:'兼有',value:'O'}],
              fileList:[],
              isAddReport: true,
              haveEnclosure: false,
              enclosureList:[],
              returnImgUrl:'',
              reportImgVisible:false,
              isOther:true,
              isChannel:false,
              isChannelShow:false,
              channelList:[],
              reportFormRule:{                     //表单的验证规则
                reportTitle: [
                  { required: true, message: '报告标题不能为空！', trigger: 'blur' }
                ],
                finishSumm: [
                  { required: true, message: '本周工作总结不能为空！', trigger: 'blur' }
                ],
                planTask: [
                  { required: true, message: '下周工作计划不能为空！', trigger: 'blur' }
                ],
                isHelp:[
                  { required: true, message: '需协调和帮助不能为空！', trigger: 'blur' }
                ],
                channelEvaluate:[
                  { required: true, message: '渠道评价不能为空！', trigger: 'blur' }
                ],
                channel:[
                  { required: true, message: '请选择渠道！', trigger: 'blur' }
                ]
              }
            }
        },
        computed:{
          actionUrl() {
            return `/api/CMM/report_addReportItemImageC`;
          },
          imageUrl(){
            return `/api/` + this.returnImgUrl;
          },
          EditReportModalParams(){
            return this.$store.state.mutations.EditReportModalParams;
          },
          reportFormData(){
            if(this.$store.state.mutations.EditReportModalParams.type == 'editReport' && this.$store.state.mutations.EditReportModalParams.isEditor){
              this.$store.state.mutations.reportFormData = {
                reportTitle:'',     //报告标题
                reportType:'1',     //报告类型
                channelType:'A',    //
                finishTask:'',      //本周完成工作
                finishSumm:'',      //本周工作总结
                planTask:'',        //下周工作计划
                reportMess:'',      //报告内容
                isHelp:'',           //需协调与帮助
                fileIds:'',
                flag:'2',
                channelEvaluate:'', //渠道评价
                channel:'',         //渠道
                upfile1:[]           //附件信息
              }
            }
            return this.$store.state.mutations.reportFormData;
          }
        },
        methods:{
          changeReportType(val){
            if(val == '6'){//渠道评价
              this.isOther = false;
              this.isChannel = true;
              if(this.channelList.length == 0){
                this.$axios.get("/api/CMM/myChannel_getUserPeoChannel",
                  {
                    params:{
                      empId:this.$root.loginUserInfo.empId,
                      isPage:0
                    }
                  }
                )
                  .then(res =>{
                    this.channelList = res.data.data;
                  })
                  .catch(error=>{
                      console.log(error);
                    }
                  );
              }
            }else{
              this.isChannel = false;
              this.isOther = true;
            }
          },
          showReportContent(){
            this.$store.state.mutations.isMyReportList='OnlineEditor';
          },
          showEnclosure(item){
            if(item.label == '附件预览'){
              this.$store.state.mutations.enclosureUrl = item.value;
              this.$axios.post("/api/CMM/page/main/report_showReportItem",this.$qs.stringify({fileUrl:item.value}))
            .then(res =>{
              window.open(`/api/outDoc/${res.data.msg}`);
            })
            .catch(error=>{
                console.log(error);
              }
            );
            }else{
              this.returnImgUrl = item.value;
              this.reportImgVisible = true;
            }
          },
          checkContent(){
            if(this.EditReportModalParams.type == 'showDetail' && (this.$store.state.mutations.reportFormData.reportMess&&this.$store.state.mutations.reportFormData.reportMess.length > 0)){
              return true;
            }else{
              return false;
            }
          },
          /**
           * 文件框文件改变方法
           */
          handleChange(file, fileList){
            this.$store.state.mutations.reportFormData.upfile1 = fileList;
          },
          /**
           * 关闭：
           */
          close(){
            this.$store.state.mutations.EditReportCom='';
            this.$store.dispatch("getAjaxTableData",{tableDataName:'myReportTableData',vm:this});
          },
          showReportDetail(id){
            this.$axios.get("/api/CMM/report_getReportDetail",
              {
                params:{
                  'id':id,
                }
              }
            )
              .then(res =>{
                if(res.data.data.reportType == '6'){
                  this.isChannelShow = true;
                  this.isOther = false;
                }else{
                  this.isChannelShow = false;
                  this.isOther = true;
                }
                this.$store.state.mutations.reportFormData = res.data.data;
                if(res.data.data.attachPlace.length > 0){
                  this.haveEnclosure = true;
                  var attachPlaces = res.data.data.attachPlace.split(',');
                  for (var i = 0; i < attachPlaces.length; i++) {
                    if(attachPlaces != null && attachPlaces != ""){
                      var obj = {label:'',value:''};
                      //xls xlsx doc docx
                      var attachPlace = attachPlaces[i];
                      var suffix = attachPlace.substring(attachPlace.lastIndexOf('.') + 1);
                      obj.value = attachPlace;
                      if(suffix=="xls" || suffix=="xlsx" || suffix=="doc" || suffix=="docx"){
                        obj.label = '附件预览';
                      } else {
                        obj.label = '查看图片';
                      }
                      this.enclosureList.push(obj);
                    }
                  }
                }
              })
              .catch(error=>{
                  console.log(error);
                }
              );
          },
          /**
           * 在线编辑：
           */
          onlineEdit(){
            this.$store.state.mutations.EditReportModalParams.isEditor = false;
            this.$store.state.mutations.isMyReportList='OnlineEditor';
          },
          handlePreview(){

          },
          handleRemove(){},
          beforeRemove(){},
          handleExceed(){},
          /**
           * 提交：
           */
          submit(){
            this.$refs['reportForm'].validate((valid) => {
              if (valid) {
                this.$store.state.mutations.reportFormData.reportMess = this.$store.state.mutations.onlineReportEditConten;
                var str = this.$store.state.mutations.reportFormData.fileIds;
                if(str.length > 0) {
                  this.$store.state.mutations.reportFormData.fileIds = str.substring(0, str.length - 1);
                }
                this.$axios.post("/api/CMM/page/main/report_addReportItem",
                  this.$qs.stringify(
                    this.$store.state.mutations.reportFormData
                  ))
                  .then(res =>{
                    this.addReportVisible = false;
                    this.$message({
                      message: '添加成功！',
                      type: 'success'
                    });
                    //刷新表格数据
                    this.$store.state.mutations.tableLimit.params.start=0;
                    this.$store.state.mutations.commonParams['myReportTableData'].current = 1;
                    this.$store.dispatch("getAjaxTableData",{tableDataName:'myReportTableData',vm:this});
                  })
                  .catch(error=>{
                      console.log(error);
                    }
                  );
              } else {
                return false;
              }
            });
          },
          uploadSuccess(response, file, fileList){
            if(!response.success){
              this.$store.state.mutations.reportFormData.fileIds = '';
              this.$refs.upload.clearFiles();
              this.$message({
                message: response.msg,
                type: 'warning'
              });
            }else{
              this.$store.state.mutations.reportFormData.fileIds += response.msg + ",";
              this.$message({
                message: '附件添加成功！',
                type: 'success'
              });
            }
          }
        },
        mounted(){
          switch(this.EditReportModalParams.type){
            case 'editReport':
              this.isAddReport = true;
              this.reportFormData.upfile1.map((item)=>{
                var file = {
                  name: item.name,
                  url: ''
                };
                this.fileList.push(file);
              });
              break;
            case 'showDetail':
              this.isAddReport = false;
              this.showReportDetail(this.EditReportModalParams.id);
              break;
          }
        }
    }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  #edit_report{
    .el-dialog__body{
      padding-left:30px;
      padding-right:40px;
      .online_edit{
        color:@border;
        cursor:pointer;

      }
      .el-textarea{
        textarea{
          color: #fff;
        }
      }

    }
  }
</style>
