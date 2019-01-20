<template>
    <div id="add_user">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="工号" prop="empId">
          <el-input v-model="addForm.empId" placeholder="请输入工号"></el-input>
        </el-form-item>

        <el-form-item label="用户类型" prop="userType">
          <el-select v-model="addForm.userType" placeholder="请选择用户类型">
            <el-option label="请选择" value=""></el-option>
            <el-option :label="item.valDesc" :value="item.paraVal" v-for="(item,index) in userTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户职位" prop="userPosition">
          <el-select v-model="addForm.userPosition" placeholder="请选择职位" @change="changePosition">
            <el-option label="请选择" value=""></el-option>
            <el-option v-if="userPositionList" :label="item.valDesc" :value="item.paraVal?item.paraVal:''" v-for="(item,index) in userPositionList" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系电话" prop="contactNumber">
          <el-input v-model="addForm.contactNumber" placeholder="请输入联系电话"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="addForm.cellphone" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item label="电子邮箱" prop="email">
          <el-input class="email" v-model="addForm.email" placeholder="请输入电子邮箱"></el-input>&nbsp;&nbsp;&nbsp;@boccfc.cn
        </el-form-item>

        <el-form-item label="所属区域" prop="area" v-if="addForm.userPosition==7||addForm.userPosition==3||addForm.userPosition==2||addForm.userPosition==1||addForm.userPosition==0||addForm.userPosition==''">
          <el-select v-model="addForm.area" :placeholder="addForm.userPosition!=''&&addForm.userPosition==3?'请选择区域(多选)':'请选择区域'" :multiple="addForm.userPosition!=''&&addForm.userPosition==3?true:false">
            <el-option label="请选择" value=""></el-option>
            <el-option :label="item.orgName" :value="item.orgName" v-for="(item,index) in areaList" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" type="default" @click="reset('addForm')">重置</el-button>
          <el-button size="mini" type="primary" @click="add('addForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        data() {
          /**
           * 校验电话号码：
           * @param rule
           * @param value
           * @param callback
           */
            var validateContactNumber = (rule, value, callback) => {
            var reg=/^([0-9]{3,4}-)?[0-9]{7,8}$/;
              if(value!=''&&!reg.test(value)){
                callback(new Error('电话号码格式不正确！'));
              }else{
                callback();
              }
            };
          /**
           * 校验手机号码：
           * @param rule
           * @param value
           * @param callback
           */
          var validateCellphone = (rule, value, callback) => {
            var reg=/^0?1[3|4|5|8][0-9]\d{8}$/;
            if(value!=''&&!reg.test(value)){
              callback(new Error('手机号码格式不正确！'));
            }else{
              callback();
            }
          };
          /**
           * 校验邮箱：
           * @param rule
           * @param value
           * @param callback
           */
          var validateEmail = (rule, value, callback) => {
            if(value.indexOf("@")>0){
              callback(new Error('邮箱格式不正确！'));
            }else{
              callback();
            }
          };
            return {
              addForm: {
                name: '',          //姓名
                empId: '',         //工号
                userType: '',      //用户类型
                userPosition: '',  //用户职位
                contactNumber:'',  //联系电话
                cellphone: '',     //手机号码
                email: '',         //电子邮箱
                area:  ''        //所属区域
              },
              rules: {
                name: [
                  { required: true, message: '姓名不能为空！', trigger: 'blur' },
                  { min: 2, max: 4, message: '用户名必须为2到4位的汉字！', trigger: 'blur' }
                ],
                empId: [
                  { required: true, message: '工号不能为空！', trigger: 'blur' }
                ],
                userType: [
                  { required: true, message: '用户类型不能为空！', trigger: 'change' }
                ],
                contactNumber: [
//                  { required: true, message: '电话号码不能为空！', trigger: 'blur' },
                  { validator:validateContactNumber, trigger: 'blur' }
                ],
                cellphone: [
//                  { required: true, message: '手机号码不能为空！', trigger: 'blur' },
                  { validator:validateCellphone, trigger: 'blur' }
                ],
                email: [
                  { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                  { validator:validateEmail, trigger: 'blur' }
                ],
                area: [
                  { required: true, message: '所属区域不能为空！', trigger: 'change' }
                ]
              },
              userTypeList:[],        //用户类型
              userPositionList:[],    //用户职位
              areaList:[]             //所属区域
            }
        },
        methods:{
          /**
           * 用户职位切换：
           * @param formName
           */
          changePosition(val){
            this.addForm.area=val==3?[]:'';
          },
          /**
           * 获取用户类型：
           * @param formName
           */
          getUserType(){
              this.$axios.post("/api/CMM/pages/login_getUserTypeDic")
                .then(res =>{
                  if(res.data.data){
                    this.userTypeList=res.data.data;
                  }
                })
                .catch(error=>{
                  console.log(error);
                })
          },
          /**
           * 获取用户职位：
           * @param formName
           */
          getUserPosition(){
            this.$axios.get("/api/CMM/pages/login_getPositionDic")
              .then(res =>{
                if(res.data.data){
                  this.userPositionList=res.data.data.filter((item)=>item.paraVal!=99&&item.paraVal!=6);
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 获取所属区域：
           * @param formName
           */
          getArea(){
            this.$axios.get("/api/CMM/page/main/report_getAllDepNoPage")
              .then(res =>{
                if(res.data.data){
                  this.areaList=res.data.data;
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 添加按钮的请求：
           * @param formName
           */
          addPost(){
            var params=Object.assign({},this.addForm,{email:this.addForm.email+'@boccfc.cn',area:this.addForm.area.toString()})
            this.$axios.post("/api/CMM/pages/login_simpleAddUser",this.$qs.stringify(params))
              .then(res =>{
                if(res.data.success){
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  this.reset('addForm');
                }else{
                  this.$message({
                    message: '添加失败！',
                    type: 'error'
                  });
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 重置：
           * @param formName
           */
          reset(formName) {
            this.$refs[formName].resetFields();
            this.addForm.area=null;
          },
          /**
           * 添加：
           * @param formName
           */
          add(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.addPost();
              } else {
                return false;
              }
            });
          }
        },
        mounted(){
          this.getArea();
          this.getUserType();
          this.getUserPosition();
        }
    }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";
  #add_user{
    .w(100%);
    .h(100%);
    .p(80px 20%);
    .el-form-item__label{
      color:@white;
    }
    .el-select{
      .w(100%);
    }
    .email{
      .w(73%);
    }
  }
</style>
