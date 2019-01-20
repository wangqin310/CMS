<template>
  <div id="main_wrapper" class="main_wrapper">
    <!--侧边栏导航-->
    <section class="nav_wrapper">
      <!--logo-->
      <div class="logo_wrapper">
        <img class="logo_img" :src="imgUrl"/>
        <div class="logo_name" v-text="logoName"></div>
      </div>
      <!--导航-->
      <ul class="navs" >
        <router-link tag="li" :to="{name:item.name}" v-for="(item,index) in navList"
                     :key="index" @click.native="changeNav(index)" >
          <img class="nav_img_url" :src="isActive==index?item.activeUrl:item.defaultUrl">
          <span>{{item.text}}</span>
        </router-link>
      </ul>
    </section>
    <!--内容展示区-->
    <section class="content_container">
      <!--header-->
      <div class="header_wrapper">
        <div class="header_info">
          <img class="clock_img" @click="open" :src="clockUrl"/>
          <span class="date" v-text="getDate()"></span>
          <span class="time" ref="time"></span>
          <span class="welcome_text">欢迎您，<span v-text="$root.loginUserInfo.userName"></span><span v-if="$root.loginUserInfo.description">（{{$root.loginUserInfo.description}}）</span></span>

          <!-- 查看最新消息 -->
          <el-popover   placement="bottom"  width="400"  trigger="click"  v-model="visible2">
            <div class="container" >
              <div class="tittle" v-text='NewsTittle'></div>
              <div class="cont">
                <ul>
                  <li v-for="(news,index) in hotNewsList" :key='index'>{{news.message}}</li>
                </ul>
              </div>
              <div class="more">
                <span @click="moreNews">查看所有消息</span>
              </div>
            </div>
            <el-badge  :value="len" class="bell" slot="reference" :hidden='isHidden'>
              <img class="bell_img" :src="bellUrl" />
            </el-badge>
          </el-popover>
          <!-- 设置 -->
          <img v-if="$root.loginUserInfo.positionId=='99'" class="setting_img" :src="settingUrl" @click="setting"/>
          <!-- 小人 -->
          <router-link :to="{name:'User'}">
            <img class="user_img" :src="userUrl"/>
          </router-link>

          <!-- 退出 -->
          <span class="login_out" @click="loginOut">
            <img class="button_img" :src="buttonUrl"/>
          <span class="out">退出</span>
          </span>
        </div>
      </div>
      <!--导航内容区-->
      <div class="content_wrapper" v-loading="loading2"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="#2f3445">
        <router-view></router-view>
      </div>

    </section>
    <!-- 机器人 -->
    <Robot></Robot>
    <!-- 弹框 -->
    <transition  enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="alert" v-show="alertShow">
        <div class="header">温馨提示：<i class="el-icon-close delete" @click="closeAlert"></i></div>
        <div class="cont">{{cont}}</div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Robot from './../components/Robot.vue';
  export default {
    name: 'main_wrapper',
    data() {
      return {
        imgUrl:require('@/assets/images/logo.png'),
        clockUrl:require('@/assets/images/clock.png'),
        bellUrl:require('@/assets/images/bell.png'),
        userUrl:require('@/assets/images/user.png'),
        settingUrl:require('@/assets/images/setting.png'),
        buttonUrl:require('@/assets/images/circle_button.png'),
        logoName:'渠道管理系统',
        newsList:[],
        visible2:false,
        loading2: false,
        timeDialogVisible:false,
        alertShow:false,
        cont:'',
      }
    },
    components:{
      Robot
    },
    computed: {
      /**
       * 导航列表：
       * @param val
       */
      navList() {
        return this.$store.getters.filterNavs.length!=0?this.$store.getters.filterNavs:JSON.parse(sessionStorage.getItem('filterNavList'));
      },
      /**
       * 点击导航记录激活状态：
       * @param val
       */
      isActive(){
        let storageIsActive=JSON.parse(sessionStorage.getItem("activeNavIndex"));
        if(this.$store.state.mutations.isActive==0&&storageIsActive){
          this.$store.commit('changeNav',storageIsActive);
        }
        return this.$store.getters.isActive;
      },
      // 小铃铛的最新消息
      hotNewsList(){
        return this.$store.state.mutations.hotNewsList;
      },
      //小铃铛的标题显示
      NewsTittle(){
        return (this.hotNewsList.length==0)?'您目前没有最新消息':'您的最新消息有'+this.hotNewsList.length+'条';
      },
      // 小铃铛是否显示
      isHidden(){
        return this.hotNewsList.length>0?false:true;
      },
      //小铃铛上显示的数字
      len(){
        return this.hotNewsList.length;
      }
    },
    methods: {
      open(){
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({name:'login'});
          }
        });
      },
      closeAlert(){
        this.alertShow=false;
      },
      /**
       * 导航切换：
       */
      changeNav(index) {
        this.$store.commit("changeNav", index);
        this.fullscreenLoading = true;
        //全局加载
        this.loading2=true;
        setTimeout(() => {
          this.loading2 = false;
        }, 500);

      },
      // },
      /**
       * 获取日期：
       */
      getDate(){
        var date=new Date();
        var y=date.getFullYear();
        var m=date.getMonth()+1;
        var d=date.getDate();
        return `${y}/${m}/${d}`;
      },
      /**
       * 获取时间：
       */
      getTime(){
        var date=new Date();
        var h=date.getHours();
        var m=date.getMinutes();
        var s=date.getSeconds();
        return `${this.toDouble(h)}:${this.toDouble(m)}:${this.toDouble(s)}`;
      },
      /**
       * 转换2位数：
       */
      toDouble(val){
        return val=val<10?'0'+val:val;
      },
      /**
       * 退出：
       */
      loginOut(){
        this.$axios("/api/CMM/login/login_cleanSession")
          .then(res =>{
            this.$store.state.mutations.loginUserInfo.isLogin=false;
            sessionStorage.setItem("loginUserInfo",JSON.stringify(this.$store.state.mutations.loginUserInfo));
            this.$router.push({name:'login'});
            this.$store.state.mutations.showLoginStatus='';
          })
          .catch(error=>{
            console.log(error);
          })
      },
      //点击小铃铛显示的数据
      newsLists(){
        this.$axios("/api/CMM/notify_fetch",{
          params:{
            device: 'web',
            timeoutms: 0
          }
        })
          .then(res =>{
            this.newsList=res.data.data;
            this.$store.state.mutations.hotNewsList=this.newsList;
          })
          .catch(error=>{
            console.log(error);
          })
      },
      //点击小铃铛的查看详情
      moreNews(){
        this.navList.map((item,index)=>{
          if(item.name=='navSysMsg'){
            this.$store.state.mutations.isActive=index;
            sessionStorage.setItem("activeNavIndex",index);
          }
        })
        this.$router.push({name:'navSysMsg'});
        this.hotNewsList.length=0;    //  点击后数字变为0
        this.visible2 = false;    //弹出框消失
      },
      /**
       * 设置：
       */
      setting(){
        this.$store.state.mutations.isActive=-1;
        sessionStorage.setItem("activeNavIndex",-1);
        this.$router.push({name:'Setting'});
      },
      aletMessage(){
        // setTimeout(()=>{
        //   this.alertShow=true;
        // },500)
        this.alertShow=true;
        // setTimeout(()=>{
        //   this.alertShow=false;
        // },5000)

        this.$axios("/api/CMM/pages/main/everyTask_getEveryTaskCompleteTime")
          .then(res =>{
            console.log(res);
            console.log(res.data.data.completeTime-res.data.data.everyTaskStandard);
            if(res.data.data.everyTaskStandard-res.data.data.completeTime<=0){
              this.cont='亲，这个月的拜访任务你都完成了，很棒哦！！！'
            }else{
              this.cont='亲，你这个月的拜访任务已完成'+res.data.data.completeTime+'个任务，还有'+(res.data.data.everyTaskStandard-res.data.data.completeTime)+'个任务未完成呢，赶紧去完成吧！'
            }
          })
          .catch(error=>{
            console.log(error);
          })
      }

    },
    mounted(){
      setInterval(()=>{
        this.$refs.time?this.$refs.time.innerHTML=this.getTime():false;
      },1000);
      this.$axios("/api/CMM/pages/login/login_getLoginUserInfo")
        .then(res =>{
          if(res.data.data.positionId == '0'){
            this.aletMessage();
          }
        })
        .catch(error=>{
          console.log(error);
        })
    },
    created(){
      this.newsLists();
    }
  }

</script>

<style lang="less">
  @import "../assets/less/reset.less";
  #smartnlp-showBtn{
    display: block;
  }
  .main_wrapper {
    .w(100%);
    .h(100%);
    display: flex;
    overflow:hidden;
    position: relative;
    .alert{
      background: #43475B;
      border: 1px solid #7ba3ff;
      border-radius: 3px;
      box-shadow: 0 0 10px #7bb0ff;
      width: 22%;
      height: 30%;
      position: absolute;
      bottom:0;
      left: 0;
      z-index: 300;
      padding: 20px;

      .header{
        font: 24px/36px '微软雅黑';
        color: #fff;
        border-bottom:1px solid #2a2d41;
        padding-bottom: 10px;
        .delete{
          float: right;
          font-size: 14px;
          margin-top: -9px;
          margin-right: -10px;
          cursor: pointer;
        }
      }
      .cont{
        //  padding-top: 30px;
        text-indent: 2em;
        padding: 20px 10px 10px 10px ;
        font: 16px/24px '微软雅黑';
        color: #fff;

      }
    }

    .nav_wrapper {
      .w(250px);
      background:linear-gradient(to top, @bottomNav, @topNav);
      background:-moz-linear-gradient(to top, @bottomNav, @topNav);
      background:-o-linear-gradient(to top, @bottomNav, @topNav);
      background:-webkit-linear-gradient(to top, @bottomNav, @topNav);
      background:-ms-linear-gradient(to top, @bottomNav, @topNav);
      .logo_wrapper{
        color:@white;
        .t-a(center);
        .p-t(30px);
        .logo_img{
          .w(36px);
          .h(36px);
        }
        .logo_name{
          .f-f(@navTextFont);
          .f-s(20px);
          .l-h(20px);
          .p(20px 0 38px 0);
        }
      }
      ul.navs{
        // .h(calc(~"100% - 144px"));
        max-height: calc(~"100% - 144px");
        overflow: auto;
        .p-l(20px);
        width: 250px;
        li {
          .w(100%);
          .h(56px);
          .l-h(56px);
          .f-s(16px);
          .p-l(43px);
          cursor:pointer;
          vertical-align:middle;
          border-top-left-radius:28px;
          border-bottom-left-radius: 28px;
          color:@navTextColor;
          .nav_img_url{
            .w(20px);
            .h(20px);
            .m-r(19px);
          }
          &.navActive{
            .b(@activeNavColor);
            color:@white;
          }
        }
      }
    }
    //侧边栏ie滚动条消失
    .navs{
      -ms-overflow-style:none;
      // scrollbar-base-color:#2a2d41;//滚动条的基本颜色
      //  scrollbar-arrow-color:#2a2d41;//上下按钮上三角箭头的颜色
    }
    //侧边栏chrome滚动条消失
    .navs::-webkit-scrollbar{width:0px}

    /* .navs::-webkit-scrollbar{
      background: #7ba3ff;
      width: 2px;
    }
    .navs::-webkit-scrollbar-thumb{
      background: rgba(67,71,91,1);
    } */
    .content_container {
      flex: 1;
      color:@white;
      // overflow:auto;
      min-width:780px;
      .header_wrapper, .content_wrapper {
        .w(100%);
      }
      .header_wrapper {
        .h(68px);
        .p-r(42px);
        .b(@headerBg);
        .b-s(border-box);
        font: 14px/66px '微软雅黑';

        .header_info{
          float:right;
          img{
            padding: 0 13px;
            cursor: pointer;
            &.button_img{
              padding: 0 5px;
            }
          }
          .login_out{
            cursor:pointer;
          }
          .welcome_text{
            padding: 0 19px 0 45px;
          }
          .time{
            padding: 0 12px;
          }
          .el-badge__content.is-fixed{
            top: 20px;
            right: 22px;
          }
        }
      }
      .content_wrapper {
        overflow:auto;
        .b-s(border-box);
        .b(@contentBodyBg);
        height: calc(100% - 66px);
      }
      //兼容ie滚动条消失
      /* .content_wrapper{
      -ms-overflow-style:none;
      } */
      .content_wrapper{
        scrollbar-arrow-color: #4a88fa; /**//*三角箭头的颜色*/
        scrollbar-face-color: #4a88fa; /**//*立体滚动条的颜色*/
        scrollbar-track-color: #43475B; /**//*立体滚动条背景颜色*/
      }
      //兼容chrome滚动条消失
      .content_wrapper::-webkit-scrollbar{width:0px}

    }

  }
  div.el-popover.el-popper{
    width: 25px;
    // height: 250px;
    top: 45px;
    border: 1px solid #7ba3ff;
    border-radius: 3px;
    background: rgba(67,71,91,1);
    color: #f5f5f6;
    box-shadow: 0 0 10px #7bb0ff;
    .container{
      background: rgba(67,71,91,1);
      .tittle{
        font: 16px/35px '微软雅黑';
        font-weight: bolder;
        border-bottom:1px solid #34374D;
      }
      .cont{
        height: 150px;
        overflow: auto;
        border-bottom:1px solid #34374D;
        li{
          font: 12px/35px '微软雅黑';
        }
      }
      .more{
        text-align: center;
        span{
          color: #fff;
          font: 14px/35px '微软雅黑';
        }
        span:hover{
          color:#7ba3ff;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    div.popper__arrow::after,div.popper__arrow{
      border-bottom-color: #7ba3ff;
    }
  }
</style>
