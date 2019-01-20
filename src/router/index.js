import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/Main'
import Login from '@/pages/Login/Login';      //登录
import WorkPlatform from '@/pages/WorkPlatform/WorkPlatform';                     //工作台
import Channel from '@/pages/Channel/Channel';                                    //我的渠道
import MyRating from '@/pages/MyRating/MyRating';                                 //我的排名
import MyWork from '@/pages/MyWork/MyWork';                                       //我的工作
import ChannelAllocation from '@/pages/ChannelAllocation/ChannelAllocation';      //渠道分配
import Warning from '@/pages/Warning/Warning';                                    //舆情预警
import SystemNews from '@/pages/SystemNews/SystemNews';                           //系统消息
import MyReport from '@/pages/MyReport/MyReport';                                 //系统消息
import ChannelExamination from '@/pages/ChannelExamination/ChannelExamination';   //渠道审批
import BehaviorRank from '@/pages/BehaviorRank/BehaviorRank';                     //行为排行榜
import User from '@/pages/user/User';                                             //小人图标
import UserAdd from '@/pages/UserAdd/UserAdd';                                    //用户新增
import UserEdit from '@/pages/UserEdit/UserEdit';                                 //用户修改
import HelpFeedback from '@/pages/HelpFeedback/HelpFeedback';                     //帮助与反馈
import Setting from '@/pages/Setting/Setting';                                    //设置图标
import AreaAllocation from '@/pages/AreaAllocation/AreaAllocation';               //区域分配
import MyRanking from '@/pages/MyRanking/MyRanking';               //区域分配
import ParameterSet from '@/pages/Admin/ParameterSet';               //区域分配

Vue.use(Router)
const VueRouter=new Router({
  mode:'history',
  base:__dirname,
  linkActiveClass:'navActive',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path:'/CMM/workPlatform',name:'navMainPage',component:WorkPlatform},                   //工作台
        {path:'/CMM/channel',name:'navCustomerPage',component:Channel},                         //我的渠道
        {path:'/CMM/myRating',name:'navMarketingPage',component:MyRating},                      //业绩排行榜
        {path:'/CMM/myWork',name:'navRecordingPage',component:MyWork},                          //我的工作
        {path:'/CMM/warning',name:'navEarlyWarn',component:Warning},                            //舆情预警
        {path:'/CMM/systemNews',name:'navSysMsg',component:SystemNews},                         //系统消息
        {path:'/CMM/myReport',name:'navReportPage',component:MyReport},                         //我的报告
        {path:'/CMM/channelApproval',name:'navChannelApproval',component:ChannelExamination},   //渠道审批
        {path:'/CMM/channelAllocation',name:'navChannelAllocation',component:ChannelAllocation},//渠道分配
        {path:'/CMM/behaviorRank',name:'navBehaviorRank',component:BehaviorRank},               //行为排行榜
        {path:'/CMM/userAdd',name:'navAddUser',component:UserAdd},                              //用户新增
        {path:'/CMM/userEdit',name:'navUpdateUser',component:UserEdit},                         //用户修改
        {path:'/CMM/helpFeedback',name:'navUserOpinion',component:HelpFeedback},                //帮助与反馈
        {path:'/CMM/user',name:'User',component:User},                                          //小人图标
        {path:'/CMM/setting',name:'Setting',component:Setting},                                 //设置图标
        {path:'/CMM/areaAllocation',name:'navAreaAllocation',component:AreaAllocation},            //区域分配
        {path:'/CMM/MyRanking',name:'navMyRankList',component:MyRanking},            //区域分配
        {path:'/CMM/ParameterSet',name:'navParameterSet',component:ParameterSet},            //区域分配
      ]
    },
    {path:'/CMM/index',name:'login',component:Login},                                           //登录
    {path:'*',redirect:'/CMM/index'},
    /* { 
      path: '*', 
      component: (resolve) => require(['./views/error404.vue'], resolve) 
    } */
  ]
});


export default VueRouter;
