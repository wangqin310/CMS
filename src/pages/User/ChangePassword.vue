<template>
    <div id="changePassword">
      <div class="changePwdForm">
            <el-form :model="changePwdForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="130px">
                <el-form-item label="旧密码"  prop="oldpwd" :error='errorMsg1'>
                    <el-input type="password" v-model="changePwdForm.oldpwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码"  prop="newpwd" :error='errorMsg2'>
                    <el-input type="password" v-model="changePwdForm.newpwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="再输一次"  prop="again" :error='errorMsg3'>
                    <el-input type="password" v-model="changePwdForm.again" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom">
            <el-button type="primary" @click="save('ruleForm')">保存</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'changePassword',
        data() {
            return {
                labelPosition:'right',
                value1:'',
                val:'密码修改成功~',
                changePwdForm:{
                    oldpwd:'',
                    newpwd:'',
                    again:''
                },
                msg1:false,
                msg2:false,
                msg3:false,
                //校验规则
                 rules: {
                    oldpwd: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' }
                    ],
                    newpwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ],
                    again: [
                        { required: true, message: '请再次输入新密码', trigger: 'blur' }
                    ]
                 },
                 errorMsg1:'',
                 errorMsg2:'',
                 errorMsg3:'',
            }
        },
        methods:{
            save(formName){
                this.errorMsg1='';
                this.errorMsg2='';
                this.errorMsg3='';
                //开始校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         this.$axios.get("/api/CMM/pages/login/login_editPassWord",{
                            params:{
                                TextFieldPasswordOld:this.changePwdForm.oldpwd,
                                TextFieldPasswordNew:this.changePwdForm.newpwd
                            }
                        })
                        .then(res =>{
                            console.log(res.data.msg);
                            if(res.data.msg=='PASSWORD_IS_NOT_RIGHT'){
                                this.errorMsg1='原密码不匹配，请重新输入！'
                                return;
                            }
                            if(this.changePwdForm.oldpwd==this.changePwdForm.newpwd){
                                this.errorMsg2='新密码与旧密码相同，请重新设置新密码！'
                                return;
                            }
                            if(this.changePwdForm.newpwd!=this.changePwdForm.again){
                                this.errorMsg3='两次新密码输入不一致，请重新输入！' 
                                return;   
                            }
                            this.success();
                            
                        })
                        .catch(error=>{
                            console.log(error);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                  });
            },
            //点击保存，保存成功以后的弹出框
                success(val) {
                    this.$message({
                    message: this.val,
                    type: 'success'
                });
                this.changePwdForm.oldpwd='',
                this.changePwdForm.newpwd='',
                this.changePwdForm.again=''
            }
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  @import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");  
#changePassword{
    padding-right: 30px;
    .changePwdForm{
        background:rgba(67,71,91,1);
        padding: 30px 0;
        border: 1px solid #6387FE;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
        .el-form-item{
                margin-bottom: 0;
                height: 80px;
                .el-form-item__label{
                    color: #fff;
                }
                .el-input__inner{
                    width: 32%;
                    background:rgba(67,71,91,1);
                    color: #fff;
                    
                }
                // 去除input框的黄背景
                    input:-webkit-autofill {
                        -webkit-text-fill-color: #fff !important;
                        -webkit-box-shadow: 0 0 0px 1000px rgba(67,71,91,1) inset!important;
                        transition: background 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
                        background: transparent;
                    }
                span{
                    color: red;
                }
            }
    }
    .bottom{
        .el-button--primary{
            margin-left: 280px;
            margin-top: 50px;
            margin-bottom: 150px;
        }
        button{
            width: 98px;
        }
    }
}
</style>
