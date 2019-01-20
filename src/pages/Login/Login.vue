<template>
    <div id="login">
      <img class="bg" :src="bgurl" alt="">
      <div class="sign">
        <div class="form_wrapper" ref="formWrapper">
          <img class="tittle" :src="tittleurl" alt="">
          <form action="">
            <!--手机号输入框-->
            <div class="input_phone" v-if="isForgetPwd||!isLogin"><!--忘记密码时显示-->
              <h5>Mobile</h5>
              <div class="box">
                <img :src="phoneurl" alt="">
                <input type="text" class="mobile" v-model.trim="formData.mobileNo"  placeholder="手机号"  value="" >
              </div>
              <span class="textTip tip"  v-text="phoneErrText"></span>
            </div>
            <!--短信验证码输入框-->
            <div class="Verification_code" ref="Verification_code" v-if="isForgetPwd||!isLogin"><!--忘记密码时显示-->
              <h5>Code</h5>
              <div class="box">
                <img :src="messageurl" alt="">
                <input  class="code" v-model.trim="formData.msgCode"  placeholder="短信验证码"  value="" >
                <div class="get" v-text="codeMsg" @click="getCode" :class="{disabled:codeDisabled}"></div>
              </div>
              <span class="passwordTip tip"  v-text="codeErrText"></span>
            </div>
            <!--用户名输入框-->
            <div class="accountInput" v-if="isLogin&&!isForgetPwd"><!--没有忘记密码时显示-->
              <h5>Account</h5>
              <div class="box">
                <img :src="peopleurl" alt="">
                <input type="text" class="user" @keyup.enter="login" autofocus="autofocus" v-model.trim="formData.account"  placeholder="用户名" value="">
              </div>
              <span class="textTip tip" v-text="userErrText"></span>
            </div>
            <!--密码输入框-->
            <div class="pwdInput" v-if="!isForgetPwd"><!--没有忘记密码时显示-->
              <h5>Password</h5>
              <div class="box">
                <img :src="lockurl" alt="">
                <input type="password" class="pwd" @keyup.enter="login" v-model.trim="formData.password" autocomplete="off"  placeholder="密码"  value="">
              </div>
              <span class="passwordTip tip" v-text="pwdErrText"></span>
            </div>

            <p>
              <span class="forget_pwd" @click="forgetPwdClick" v-if="isLogin" v-text="isLogin&&!isForgetPwd?'忘记密码':'<返回'"></span><!--没有忘记密码时显示-->
              <span class="register" @click="registerClick" v-if="!isForgetPwd" v-text="!isLogin?'登录':'注册'"></span><!--没有忘记密码时显示-->
            </p>
            <div class="btn" v-text="btnText" @click="btnClick(btnText)"></div><!--忘记密码显示'确定'-->
          </form>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'Login',
        data() {
          return {
            bgurl:require('@/assets/images/login_bg.png'),
            tittleurl:require('@/assets/images/login_tittle.png'),
            peopleurl:require('@/assets/images/login_people.png'),
            lockurl:require('@/assets/images/login_lock.png'),
            messageurl:require('@/assets/images/login_message.png'),
            phoneurl:require('@/assets/images/login_phone.png'),
            isLogin:true,     //true是登录，false是注册
            isForgetPwd:false,     //false是没有忘记密码，是起初状态，true是忘记密码
            formData:{
              account:'',
              password:'',
              mobileNo:'',
              msgCode:''
            },
            userErrText:'',
            pwdErrText:'',
            phoneErrText:'',
            codeErrText:'',
            // 是否禁用按钮
            codeDisabled: true,
            // 倒计时秒数
            countdown: 60,
            // 按钮上的文字
            codeMsg: '获取验证码',
            // 定时器
            timer: null,
            sessionId:'',
            navs:[],
            a: '',
          };
        },
        computed:{
          btnText(){
            return this.isForgetPwd?'确定':(this.isLogin?'登录':'注册');
          }
        },
        methods:{
          /**
           * 获取手机验证码：
           */
          getCode() {// 获取验证码
            if(this.formData.mobileNo==''){
              this.phoneErrText='请先输入手机号'
              return;
            }else if(!(/^1[34578][0-9]{9}$/.test(this.formData.mobileNo))){
              this.phoneErrText='请输入正确的手机号';
              return;
            }else{
              this.phoneErrText=''
              this.$axios("/api/CMM/login_getCheckCode",{
                  params:{
                    phoneNum:this.formData.mobileNo
                  }
              })
                .then(res =>{
                  this.sessionId=res.data.msg;
                  document.cookie=`JSESSIONID=${this.sessionId}`;
                })
                .catch(error=>{
                  console.log(error);
                })





            }
            // 验证码60秒倒计时
            if (!this.timer) {
              this.timer = setInterval(() => {
                if (this.countdown > 0 && this.countdown <= 60) {
                  this.countdown--;
                  if (this.countdown !== 0) {
                    this.codeMsg = "" + this.countdown + "s";
                  } else {
                    clearInterval(this.timer);
                    this.codeMsg = "获取验证码";
                    this.countdown = 60;
                    this.timer = null;
                    this.codeDisabled = false;
                  }
                }
              }, 1000)
            }
          },
          /**
           * 获取导航列表：
           */
          getNav(){
            this.$axios("/api/CMM/pages/login/login_getUserAuthorityItmesCRM",{
                params:{
                  flag:'cmm1.0-menu'
                }
            })
              .then(res =>{
                this.$store.commit("filterNavs",res.data);
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 忘记密码：
           */
          forgetPwdClick(){
            this.isForgetPwd=!this.isForgetPwd;
            this.userErrText='';   //用户名的提示
            this.pwdErrText='';     //密码的提示
            this.phoneErrText='';     //密码的提示
            this.codeErrText='';     //密码的提示
            this.formData.account='';       //用户名的输入框
            this.formData.password='';      //密码的输入框
            this.formData.mobileNo='';      //密码的输入框
            this.formData.msgCode='';      //密码的输入框
          },
          /**
           * 注册：
           */
          registerClick(){
            this.userErrText='';   //用户名的提示
            this.pwdErrText='';     //密码的提示
            this.phoneErrText='';     //密码的提示
            this.codeErrText='';     //密码的提示
            this.formData.account='';       //用户名的输入框
            this.formData.password='';      //密码的输入框
            this.formData.mobileNo='';      //密码的输入框
            this.formData.msgCode='';      //密码的输入框
            this.$nextTick(()=>{
              this.centerForm();
            })
            this.isLogin=!this.isLogin;
          },
          /**
           * 查询职位信息：
           */
          getUserInfo(){
            this.$axios("/api/CMM/pages/login/login_getLoginUserInfo")
              .then(res =>{
                var obj1={
                  userName:res.data.data.userName,
                  positionId:res.data.data.positionId,
                  empId:res.data.data.empId,
                  assId:res.data.data.assId
                }
                this.$store.commit("getUerInfo",obj1);
                this.getPositionInfo();
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 查询职位信息：
           */
          getPositionInfo(){
            this.$axios("/api/CMM/pages/login/login_getPositionDic")
              .then(res =>{
                res.data.data.map((item)=>{
                  if(this.$store.state.mutations.loginUserInfo.positionId==item.paraVal){
                    var obj2={
                      description:item.valDesc
                    }
                    this.$store.commit("getUerInfo",obj2);
                  }
                })
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 登录：
           */
          login(){    //登录请求
            //用户名不能为空
            if(this.formData.account==''){
              this.pwdErrText='';
              this.userErrText='您未输入用户名，请输入！';
              return;
            }
            //密码不能为空
            if(this.formData.password==''){
              this.userErrText='';
              this.pwdErrText='您未输入密码，请输入！';
              return;
            }
            //发送ajax
            this.$axios.post('/api/CMM/admin/login/login_userLogin',
              this.$qs.stringify({
                username:this.formData.account,
                password:this.formData.password
              })
            )
              .then(res=>{
                if(res.data){
                    this.sessionId=res.data.data&&res.data.data.sessionId?res.data.data.sessionId:'';
                    this.$store.state.mutations.loginUserInfo.isLogin=true;
                    sessionStorage.setItem("loginUserInfo",JSON.stringify(this.$store.state.mutations.loginUserInfo));
                    if(res.data.msg=="PASSWORD_IS_NOT_RIGHT"){
                      this.userErrText='';
                      this.pwdErrText='您输入的密码不正确，请重新输入！'
                      return;
                    }
                    if(res.data.msg=='EMPID_IS_NOT_EXIST'){
                      this.pwdErrText='';
                      this.userErrText='您输入的用户名不存在，请重新输入！'
                      return;
                    }
                   if(res.data.msg=='LOGIN_SUCCESS'){
                    this.userErrText='';
                    this.pwdErrText='';
                    document.cookie=`JSESSIONID=${this.sessionId}`;
                    this.$store.state.mutations.isActive=0;
                    sessionStorage.setItem("activeNavIndex",0);
                    this.getNav();
                    this.getUserInfo();
                    this.$router.push({name:'navMainPage'});
                  }
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 注册：
           */
          register(){   //注册请求
            if(this.formData.mobileNo==''){
              this.phoneErrText='请先输入手机号'
            }else if(!(/^1[34578][0-9]{9}$/.test(this.formData.mobileNo))){
              this.phoneErrText='请输入正确的手机号';
            }else{
              this.phoneErrText=''
            }
            if(this.formData.msgCode==''){
              this.codeErrText='请先输入验证码'
            }
            if(this.formData.password==''){
              this.pwdErrText='请输入密码'
            }
            this.$axios.post('/api/CMM/admin/login/login_registerUser',this.$qs.stringify({
              phoneNum:this.formData.mobileNo,
              checkCode:this.formData.msgCode,
              password:this.formData.password
            }))
              .then(res=>{
                this.$router.push({name:'login'});
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 忘记密码：
           */
          forgetPassword(){    //忘记密码请求
            this.$axios.post('/api/CMM/admin/login/login_getPsw',this.$qs.stringify({
              phoneNum:this.formData.mobileNo,
              checkCode:this.formData.msgCode
            }))
              .then(res=>{
                if(res.data.msg=='USER_IS_NOT_EXIST'){
                  this.codeErrText='用户不存在'
                  return;

                }else if(res.data.msg=='CHECK_CODE_IS_EMPTY'){
                  this.codeErrText='验证码为空'
                  return;

                }else if(res.data.msg=='PHONE_NUM_IS_EMPTY'){
                  this.codeErrText='手机号码为空'
                  return;

                }else if(res.data.msg=='CHECK_CODE_IS_NOT_RIGHT'){
                  this.codeErrText='验证码错误'
                  return;

                }else if(res.data.msg=='EMAIL_IS_NOT_RIGHT'){
                  this.codeErrText='邮箱错误'
                  return;

                }else if(res.data.msg=='GET_PASSWORD_SUCCESS'){
                  this.$message({
                    message: '获取新密码成功！',
                    type: 'success'
                  });
                  this.forgetPwdClick();
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          /**
           * 注册、确定按钮：
           * @param val
           */
          btnClick(val){
            switch(val){
              case '登录':
                this.login();
                break;
              case '注册':
                this.register();
                break;
              case '确定':
                this.forgetPassword();
                break;
            }
          },
          /**
           * 登录框处于居中位置：
           */
          centerForm(){
            this.$nextTick(()=>{
              var topHeight=this.$refs.formWrapper.offsetHeight/2;
              this.$refs.formWrapper.style.top=`calc(50% - ${topHeight}px)`;
            })
          }
        },
        mounted(){
          this.centerForm();
          // window.onresize=()=>{
          //   return(()=>{
          //     this.centerForm();
          //   })()
          // }
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  #smartnlp-showBtn{
    display: block;
  }
  #login{
    .w(100%);
    .h(100%);
    min-height:540px;
    position: relative;
    input{
        height: 40px;
        width: 80%;
        border: none;
        font: 15px/40px '微软雅黑';
        outline: none;
        color: #b8b8b8!important;
      }
      // 去除input框的黄背景
      input:-webkit-autofill {
        -webkit-text-fill-color: #b8b8b8 !important;
        -webkit-box-shadow: 0 0 0px 1000px white inset!important;
        transition: background 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
        background: transparent;
      }
    img.bg{
      .w(100%);
      .h(100%);
      z-index: 0;
    }
    .sign{
      .w(27.3%);
      .h(88%);
      z-index: 1;
      border-radius: 0 10px 10px 0;
      position: absolute;
      top: 6%;
      left: 69%;
      .form_wrapper{
        .w(100%);
        .p-b(20px);
        position:absolute;
        .Verification_code{
          .box{
            position:relative;
            .get{
              position:absolute;
            }
          }
        }
        img.tittle{
          display: block;
          margin:0 auto;
        }
        form{
          display: block;
          width: 76%;
          margin: 10% 12% 0 12%;
          h5{
            font: 14px/19px '微软雅黑';
            color: #d5d5d5;
          }
          .box{
            height: 44px;
            border-bottom: 1px solid #b2b2b2;
            i{
              color:#4582ff ;
            }
            
            .code{
              width: 70%;
            }
            .disabled{
              background-color: #fff;
              border-color:red;
              color:#57a3f3;
              cursor: not-allowed; // 鼠标变化
            }
            .get{
              .p(0 3px);
              cursor: pointer;
              display: inline-block;
              text-align: center;
              width: 28%;
              height: 40px;
              background: #4582ff;
              color: #fff;
              font: 14px/40px '微软雅黑';
              border-radius: 5px;
              border: none;
            }
          }
          .tip{
              padding-left: 23px;
              font-size: 12px;
              color: red;
            }
          img{
            width: 19px;
          }
          p{
            font-size:13px;
            color: #898989;
            .forget_pwd{
              float: left;
              cursor: pointer;
            }
            .forget_pwd:hover{
              text-decoration: underline;
            }
            .register{
              float: right;
              cursor: pointer;
            }
            .register:hover{
              text-decoration: underline;
            }
          }
          .btn{
            width: 100%;
            height: 50px;
            text-align: center;
            font: 17px/50px '微软雅黑';
            background: #4582ff;
            color: #fefffd;
            cursor:pointer;
            border-radius: 2px;
            margin-top: 9.5%;
            box-shadow: 0 10px 20px #afc7f7;
          }
        }
      }
    }
  }
</style>
