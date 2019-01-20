<template>
    <div id="userInformation">
        <el-row :gutter="10" style="overflow:hidden;">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="ui_form_wrapper">
                <div class="leftForm form">
                    <el-form :label-position="labelPosition" label-width="130px" :model="formLabelLeft">
                        <el-form-item label="姓名">
                            <el-input v-model="formLabelLeft.userName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="工号">
                            <el-input v-model="formLabelLeft.empId" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="职务">
                            <el-select v-model="formLabelLeft.positionId" :disabled="true" style="width:100%">
                                <el-option v-for="job in jobList" :label="job.valDesc" :value="job.paraVal" :key="job.paraVal"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="formLabelLeft.mobile" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="办公电话">
                            <el-input v-model="formLabelLeft.officeTel"></el-input>
                        </el-form-item>
                        <el-form-item label="传真">
                            <el-input v-model="formLabelLeft.fax"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
        </el-col>
        
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="ui_form_wrapper">
                <div class="rightForm form">
                    <el-form :label-position="labelPosition" label-width="130px" :model="formLabelRight">
                        <el-form-item label="性别">
                            <el-select v-model="formLabelRight.sex"  style="width:100%">
                                <el-option v-for="gender in genderList" :label="gender.label" :value="gender.value" :key="gender.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <el-date-picker format="yyyy-MM-dd" v-model="formLabelRight.birthDt" type="date" style="width:100%"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="证件类型">
                            <el-select v-model="formLabelRight.cardType"  style="width:100%">
                                <el-option v-for="card in CardList" :label="card.valDesc" :value="card.paraVal" :key="card.paraVal"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号码">
                            <el-input v-model="formLabelRight.cardNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="学历">
                            <el-select v-model="formLabelRight.diplomaCd"  style="width:100%">
                                <el-option v-for="diplomaCd in diplomaCdList" :label="diplomaCd.label" :value="diplomaCd.value" :key="diplomaCd.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="电子邮箱">
                            <el-input v-model="formLabelRight.email"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
        </el-col>
        <div class="bottom">
            <el-button type="primary" @click="changePic">修改头像</el-button><el-button type="primary" @click="save">保存</el-button>
        </div>
        

        <!-- 修改头像对话框 -->
        <el-dialog title="头像上传" :visible.sync="dialogVisible" width="30%" >
            <el-form :label-position="labelPosition2" label-width="120px">
                <el-form-item label="我的头像：">
                    <img :src='userImg' alt="" style="width；80px">
                </el-form-item>
                <el-form-item label="上传新头像：">
                    <el-upload class="upload-demo"  ref="upload" :action="uploadAction"
                                :on-preview="handlePreview" :on-remove="handleRemove"
                           :file-list="fileList"  :auto-upload="false" name="upfile">
                        <el-button size="small" slot="trigger" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="success"  @click="submitUpload" >更新头像</el-button>
            </span>
        </el-dialog>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'userInformation',
        data() {
            return {
                labelPosition: 'right',
                labelPosition2:'left',
                // formLabelLeft:'',
                // formLabelRight:'',
                formLabelLeft: {
                    userName: '',
                    empId: '',
                    positionId: '',
                    mobile:'',
                    officeTel:'',
                    fax:''
                },
                formLabelRight:{
                    email:'',
                    birthDt:'',
                    cardType:'',
                    cardNumber:'',
                    sex:'',
                    diplomaCd:''
                },
                jobList:[],
                job:'',
                paraVal:'',
                valDesc:'',
                jobList:[],
                CardList:[],
                valDesc:'',
                paraVal:'',
                genderList:[
                    {value:'0',label:'女'},
                    {value:'1',label:'男'}
                ],
                diplomaCdList:[
                    {value:'01',label:'博士'},
                    {value:'02',label:'研究生'},
                    {value:'03',label:'本科生'},
                    {value:'04',label:'专科生'},
                ],
                msg:'',
                value1:'',
                dialogVisible:false,
                userHeadPortraitId:'',
                fileList: [],
                val:'用户基本信息修改成功',
                // genderValue:'0',
                // cardParaVal:'01'
        }
    },
    computed:{
        userImg(){
            return `/api/${this.userHeadPortraitId}`;
            // return `${this.HOST}/CMM${this.userHeadPortraitId}`;
            // return `http://192.169.2.250:8081/CMM${this.userHeadPortraitId}`;
            
        },
        uploadAction(){
            return `/api/+attachSave_uploadUserHead`;
            // return `${this.HOST}/CMM/attachSave_uploadUserHead`;
            // return `http://192.169.2.250:8081/CMM/attachSave_uploadUserHead`;
        }
    },
    methods:{
        submitUpload() {
            this.$refs.upload.submit();
            this.dialogVisible = false;
        },
        handleRemove(file, fileList) {
        },
        handlePreview(file) {
        },
        //基本信息的数据
        getFormData(){
            this.$axios.get("/api/CMM/pages/login/login_getLoginUserInfo")
              .then(res =>{
                var data=res.data.data;    
                // 左边信息         
                this.formLabelLeft.userName=data.userName;//姓名
                this.formLabelLeft.empId=data.empId;//工号
                this.formLabelLeft.positionId=data.positionId;//职位
                this.formLabelLeft.mobile=data.mobile;//手机号
                this.formLabelLeft.officeTel=data.tel;//办公电话
                this.formLabelLeft.fax=data.fax;//传真

                this.formLabelRight.email=data.email;//电子邮箱
                this.formLabelRight.birthDt=data.birthDt;//生日
                this.formLabelRight.cardType=data.idenTypeCd;//证件类型
                this.formLabelRight.cardNumber=data.idenNo;//证件号
                this.formLabelRight.sex=data.genderCd;//性别
                this.formLabelRight.diplomaCd=data.diplomaCd;//学历
                
                
   
              })
              .catch(error=>{
                console.log(error);
              })
          },
          //获取职位的下拉框的数据
        getJobData(){
            this.$axios.get("/api/CMM/pages/login/login_getPositionDic")
              .then(res =>{
                // console.log(res.data.data);
                this.jobList=res.data.data;
              })
              .catch(error=>{
                console.log(error);
              })
          },
          //证件类型的下拉框数据
          getCardData(){
            this.$axios.get("/api/CMM/pages/login/login_getIdentityDic")
              .then(res =>{
                // console.log(res.data.data);
                this.CardList=res.data.data;
              })
              .catch(error=>{
                console.log(error);
              })
          },
          //点击保存
          save(){
            let newValue = '';
            if(typeof(this.formLabelRight.birthDt) == "object"){
              var d = new Date(this.formLabelRight.birthDt);
              newValue = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1):(d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? ('0'+d.getDate()):d.getDate());//月份得+1，且只有个位数时在前面+0
            }else{
              newValue = this.formLabelRight.birthDt;
            }
            this.$axios.get("/api/CMM/pages/login/login_updateUserInfo",{
                params:{
                    userName:this.formLabelLeft.userName,
                    empId:this.formLabelLeft.empId,
                    positionId:this.formLabelLeft.positionId,
                    officeTel:this.formLabelLeft.officeTel,
                    mobile:this.formLabelLeft.mobile,
                    email:this.formLabelRight.email,
                    birthDay:newValue,
                    cardType:this.formLabelRight.cardType,
                    cardNumber:this.formLabelRight.cardNumber,
                    fax:this.formLabelLeft.fax,
                    sex:this.formLabelRight.sex,
                    diplomaCd:this.formLabelRight.diplomaCd

                }
            })
              .then(res =>{
                // console.log(res);
                this.success();
              })
              .catch(error=>{
                console.log(error);
              })
          },
          //点击保存，保存成功以后的弹出框
          success(val) {
            this.$message({
            message: this.val,
            type: 'success'
        });
      },
      //点击修改头像以后显示本地图片
      changePic(){
          this.dialogVisible = true;
          this.fileList = [];
          this.$axios.get("/api/CMM/pages/login/login_getLoginUserInfo")
              .then(res =>{
                  this.userHeadPortraitId=res.data.data.userHeadPortraitId;
              })
              .catch(error=>{
                console.log(error);
              })
      }

    },
    created(){
        this.getFormData();
        this.getJobData();
        this.getCardData();
    }
}
</script>

<style lang="less">
  @import "../../assets/less/reset";
  @import "../../assets/less/common";
#userInformation{
    .ui_form_wrapper{
        .m-t(20px);
    }
    .form{
        padding-top: 30px;
        padding-right: 10%;
        padding-bottom: 30px;
        background:rgba(67,71,91,1);
        border: 1px solid #6387FE;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
        .el-form-item{
            .el-form-item__label{
                color: #fff;
            }
            .el-input__inner{
                // width: 80%;
                background:rgba(67,71,91,1);
                color: #fff;
                 
            }
        }
    }
    .bottom{
        text-align: center;
        margin-right: 10%;
        button{
            width: 98px;
            margin-top: 3%;
            
        }
    }
    //选择头像对话框
    .el-dialog{
        .b(@boxBg);
        // border-radius:10px;
        border:1px solid @border;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
        .el-dialog__header{
            .b(@boxBg);
            border-bottom:1px solid #34374D;
            .el-dialog__title{
            color: #fff;
            }
        }
        .el-dialog__footer{
            .b(@boxBg);
            border-top:1px solid #34374D;

        }
        .el-dialog__body{
            .el-form-item__label{
            color: #fff;
            }
            .b(@boxBg);
            .el-form-item__content{
               a{
                   color: #fff;
               }
            }
            img{
                width: 100px;
            }
        }
    }

}
</style>
